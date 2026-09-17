#!/usr/bin/env python3
"""
Simulador de balanceamento — Eras do Brasil (idle).

Lê balance.json e responde três perguntas:
  1. Quantos segundos para matar cada tipo de mob, em cada tier?
  2. Quantas horas de jogo ativo para subir cada tier?
  3. Alguma build está fora da curva?

Nenhuma constante mora aqui. Tudo vem do JSON — o servidor Go deve ler
o mesmo arquivo. Se um número precisa mudar, muda no JSON.

Uso:
    python3 sim.py [caminho/para/balance.json]
"""

import json
import random
import sys
from dataclasses import dataclass, field

# ---------------------------------------------------------------- carregamento

def carregar(caminho="balance.json"):
    with open(caminho, encoding="utf-8") as f:
        return json.load(f)


# ---------------------------------------------------------------- poder de item

def ip_peca(B, tier, encantamento=0, qualidade="normal"):
    """Poder de Item de uma peça: base do tier + encantamento + qualidade."""
    ip = B["item_power"]
    return (
        ip["base_por_tier"][str(tier)]
        + ip["encantamento"][str(encantamento)]
        + ip["qualidade"][qualidade]
    )


@dataclass
class Loadout:
    """Um conjunto equipado. Slots ausentes contam como tier 0 (IP zero)."""
    arma_tier: int
    arma_duas_maos: bool = False
    offhand_tier: int = 0
    cabeca_tier: int = 0
    torso_tier: int = 0
    botas_tier: int = 0
    encantamentos: dict = field(default_factory=dict)
    qualidades: dict = field(default_factory=dict)
    nome: str = "sem nome"

    def _ip(self, B, slot, tier):
        if tier <= 0:
            return 0.0
        return ip_peca(
            B, tier,
            self.encantamentos.get(slot, 0),
            self.qualidades.get(slot, "normal"),
        )

    def ip_maestria(self, B, nivel_maestria=0):
        m = B["arvore_do_destino"]["maestria_combate"]
        return nivel_maestria * m["ip_por_nivel"]

    def ip_total(self, B):
        """Média ponderada por slot. Arma de duas mãos absorve o peso do off-hand."""
        p = B["item_power"]["peso_slot"]
        chave_arma = "arma_duas_maos" if self.arma_duas_maos else "arma_uma_mao"
        total = self._ip(B, "arma", self.arma_tier) * p[chave_arma]
        if not self.arma_duas_maos:
            total += self._ip(B, "offhand", self.offhand_tier) * p["offhand"]
        for slot in ("cabeca", "torso", "botas"):
            total += self._ip(B, slot, getattr(self, f"{slot}_tier")) * p[slot]
        return total

    def ip_armadura(self, B):
        return sum(
            self._ip(B, s, getattr(self, f"{s}_tier"))
            for s in ("cabeca", "torso", "botas")
        )


# ---------------------------------------------------------------- estatísticas

def stats(B, loadout, nivel_maestria=0):
    c = B["combate"]
    ip = loadout.ip_total(B) + loadout.ip_maestria(B, nivel_maestria)
    return {
        "ip": ip,
        "ap": ip * c["ap_por_ip"],
        "hp": c["hp_base"] + ip * c["hp_por_ip"],
        "armadura": loadout.ip_armadura(B) * c["armadura_por_ip"],
    }


def mitigacao(B, armadura, ip_atacante=0.0):
    """A penetração por IP do atacante impede que tier alto fique sempre mais seguro."""
    c = B["combate"]
    denom = armadura + c["constante_mitigacao"] + c["penetracao_por_ip_atacante"] * ip_atacante
    return min(armadura / denom, c["mitigacao_maxima"])


def fator_relativo(B, ip_atacante, ip_alvo):
    f = B["combate"]["fator_relativo"]
    v = 1.0 + (ip_atacante - ip_alvo) / f["divisor"]
    return max(f["min"], min(f["max"], v))


def dano(B, poder_skill, ap_atacante, ip_atacante, ip_alvo, armadura_alvo):
    """Fórmula central de dano."""
    return (
        poder_skill
        * (ap_atacante / 100.0)
        * (1.0 - mitigacao(B, armadura_alvo, ip_atacante))
        * fator_relativo(B, ip_atacante, ip_alvo)
    )


# ---------------------------------------------------------------- mob

def mob_de_referencia(B, tier, tipo="normal"):
    """Mob padrão de um tier: usa um loadout equivalente ao tier todo."""
    lo = Loadout(arma_tier=tier, cabeca_tier=tier, torso_tier=tier,
                 botas_tier=tier, offhand_tier=tier, nome=f"mob T{tier}")
    s = stats(B, lo)
    return {
        "ip": s["ip"],
        "hp": s["hp"] * B["mobs"]["multiplicador_hp"][tipo],
        "ap": s["ap"] * B["mobs"]["multiplicador_ap"][tipo],
        "armadura": s["armadura"],
    }


# ---------------------------------------------------------------- fuga

def chance_de_fuga(B, pontos_fuga, arquetipo, inimigos_vivos=1):
    """Mesma fórmula em PvE e PvP. Fugir de vários é mais difícil que de um."""
    f = B["fuga"]
    anti = (B["mobs"]["anti_fuga_por_arquetipo"][arquetipo]
            + f["anti_fuga_por_inimigo_extra"] * (inimigos_vivos - 1))
    c = f["base"] + pontos_fuga * f["por_ponto_de_fuga"] - anti * f["peso_anti_fuga"]
    return max(f["min"], min(f["max"], c))


# ---------------------------------------------------------------- combate

def simular_grupo(B, loadout, tier, tamanho=3, com_elite=False,
                  pontos_fuga=0, usar_regras=True, largar_carga=False,
                  max_ticks=None):
    """
    Combate contra um GRUPO. O jogador foca um alvo por vez; todos os mobs
    vivos atacam a cada tick. Aplica a regras de combate na ordem: retirar, curar, atacar.
    """
    c = B["combate"]
    s = stats(B, loadout)
    ciclo, poder = c["ciclo_padrao"], c["poder_skill"]
    reg = B["regras de combate"]["configuravel"]
    pot = B["pocao"]

    if max_ticks is None:
        max_ticks = B["grupos"]["rodadas_maximas"]
    inimigos = [dict(mob_de_referencia(B, tier, "normal")) for _ in range(tamanho)]
    if com_elite:
        inimigos.append(dict(mob_de_referencia(B, tier, "elite")))

    hp = s["hp"]
    pocoes = pot["quantidade_padrao"]
    cd_pocao = 0
    ticks = 0
    tentativas_fuga = 0
    durabilidade_perdida = 0.0
    carga_largada = False
    resultado = "vitoria"

    while any(m["hp"] > 0 for m in inimigos) and ticks < max_ticks:
        vivos = [m for m in inimigos if m["hp"] > 0]
        arquetipo = "elite" if (com_elite and len(vivos) == 1
                                and vivos[0]["hp"] > inimigos[0]["hp"]) else "fauna"

        # 1. retirada
        if usar_regras and hp <= s["hp"] * reg["limiar_retirada_pct"] / 100:
            tentativas_fuga += 1
            bonus = 0
            if largar_carga and not carga_largada and tentativas_fuga >= 2:
                bonus = B["fuga"]["largar_carga"]["pontos"]
                carga_largada = True
            if random.random() < chance_de_fuga(B, pontos_fuga + bonus,
                                                arquetipo, len(vivos)):
                hp -= dano(B, poder["Q"], vivos[0]["ap"], vivos[0]["ip"],
                           s["ip"], s["armadura"])  # golpe de despedida
                resultado = "morte" if hp <= 0 else "retirada"
                break
            durabilidade_perdida += B["retirada"]["custo_durabilidade_por_falha"]
            for m in vivos:
                hp -= dano(B, poder["Q"], m["ap"], m["ip"], s["ip"], s["armadura"])
            ticks += 1
            if hp <= 0:
                resultado = "morte"
                break
            continue

        # 2. cura
        if (usar_regras and hp <= s["hp"] * reg["limiar_cura_pct"] / 100
                and pocoes > 0 and cd_pocao == 0):
            hp = min(s["hp"], hp + s["hp"] * pot["cura_pct"] / 100)
            pocoes -= 1
            cd_pocao = pot["cooldown_ticks"]
        else:
            # 3. atacar
            alvo = vivos[0]
            skill = ciclo[ticks % len(ciclo)]
            alvo["hp"] -= dano(B, poder[skill], s["ap"], s["ip"],
                               alvo["ip"], alvo["armadura"])

        for m in [x for x in inimigos if x["hp"] > 0]:
            hp -= dano(B, poder["Q"], m["ap"], m["ip"], s["ip"], s["armadura"])
        cd_pocao = max(0, cd_pocao - 1)
        ticks += 1
        if hp <= 0:
            resultado = "morte"
            break

    if resultado == "vitoria" and any(m["hp"] > 0 for m in inimigos):
        resultado = "impasse"
    return {
        "resultado": resultado,
        "ticks": ticks,
        "segundos": ticks * B["tick_segundos"],
        "hp_restante_pct": max(0.0, 100.0 * hp / s["hp"]),
        "pocoes_usadas": pot["quantidade_padrao"] - pocoes,
        "tentativas_fuga": tentativas_fuga,
        "durabilidade_perdida": durabilidade_perdida,
        "carga_largada": carga_largada,
        "mobs": tamanho + (1 if com_elite else 0),
    }


def simular_luta(B, loadout, mob, afinidade=1.0, max_ticks=2000):
    """Luta contra um único mob, sem regras de combate. Usado nos relatórios de TTK."""
    c = B["combate"]
    s = stats(B, loadout)
    ciclo, poder = c["ciclo_padrao"], c["poder_skill"]
    hp_mob, dano_sofrido, ticks = mob["hp"], 0.0, 0
    while hp_mob > 0 and ticks < max_ticks:
        hp_mob -= dano(B, poder[ciclo[ticks % len(ciclo)]], s["ap"], s["ip"],
                       mob["ip"], mob["armadura"])
        dano_sofrido += dano(B, poder["Q"], mob["ap"], mob["ip"],
                             s["ip"], s["armadura"])
        ticks += 1
    return {
        "ticks": ticks,
        "segundos": ticks * B["tick_segundos"],
        "dano_sofrido": dano_sofrido,
        "pct_vida_perdida": 100.0 * dano_sofrido / s["hp"],
        "morreu": dano_sofrido >= s["hp"],
    }


# ---------------------------------------------------------------- progressão

def fama_por_hora(B, tier):
    """Fama por hora de jogo ativo na faixa de um tier."""
    lo = Loadout(arma_tier=tier, cabeca_tier=tier, torso_tier=tier,
                 botas_tier=tier, offhand_tier=tier)
    mob = mob_de_referencia(B, tier, "normal")

    g = B["grupos"]
    tamanho = (g["tamanho_min"] + g["tamanho_max"]) / 2.0
    luta = simular_grupo(B, lo, tier, tamanho=int(round(tamanho)),
                         pontos_fuga=3, usar_regras=True)
    seg_por_grupo = luta["segundos"] + B["grupos"]["segundos_entre_ondas"]
    grupos_por_hora = 3600.0 / seg_por_grupo

    frac = B["fama"]["fracao_tempo_em_combate"]
    fama_mob = B["fama"]["por_mob_tier"][str(tier)]
    fama_combate = grupos_por_hora * fama_mob * tamanho * frac
    kills_por_hora = grupos_por_hora * tamanho
    seg_por_kill = seg_por_grupo

    seg_coleta = (B["coleta"]["segundos_por_no_tier"][str(tier)]
                  + B["coleta"]["segundos_entre_nos_por_tier"][str(tier)])
    nos_por_hora = 3600.0 / seg_coleta
    fama_coleta = nos_por_hora * B["fama"]["por_coleta_tier"][str(tier)] * (1 - frac)

    total = (fama_combate + fama_coleta) * B["afinidade"]["max"]
    return {
        "total": total,
        "combate": fama_combate * B["afinidade"]["max"],
        "coleta": fama_coleta * B["afinidade"]["max"],
        "seg_por_kill": seg_por_kill,
        "kills_por_hora": kills_por_hora,
    }


def curva_de_progressao(B):
    linhas, acumulado = [], 0.0
    for tier in range(1, 6):
        precisa = B["fama"]["por_nivel"][str(tier)]
        taxa = fama_por_hora(B, tier)
        horas = precisa / taxa["total"]
        acumulado += horas
        linhas.append({
            "de": tier, "para": tier + 1,
            "fama": precisa,
            "fama_por_hora": taxa["total"],
            "horas": horas,
            "horas_acumuladas": acumulado,
        })
    return linhas


# ---------------------------------------------------------------- relatórios

def tabela(titulo, cabecalho, linhas):
    print(f"\n{titulo}")
    print("-" * 78)
    print("  ".join(f"{h:>14}" if i else f"{h:<20}" for i, h in enumerate(cabecalho)))
    print("-" * 78)
    for l in linhas:
        print("  ".join(f"{c:>14}" if i else f"{c:<20}" for i, c in enumerate(l)))


def relatorio_ttk(B):
    linhas = []
    for tier in range(1, 7):
        lo = Loadout(arma_tier=tier, cabeca_tier=tier, torso_tier=tier,
                     botas_tier=tier, offhand_tier=tier)
        col = [f"T{tier}"]
        for tipo in ("normal", "elite", "chefe"):
            r = simular_luta(B, lo, mob_de_referencia(B, tier, tipo))
            col.append(f"{r['segundos']:.0f}s")
        r = simular_luta(B, lo, mob_de_referencia(B, tier, "normal"))
        col.append(f"{r['pct_vida_perdida']:.0f}%")
        linhas.append(col)
    tabela("TEMPO PARA MATAR (equipamento do mesmo tier)",
           ["Tier", "normal", "elite", "chefe", "vida perdida"], linhas)


def relatorio_progressao(B):
    linhas = []
    for l in curva_de_progressao(B):
        linhas.append([
            f"T{l['de']} -> T{l['para']}",
            f"{l['fama']:,}".replace(",", "."),
            f"{l['fama_por_hora']:,.0f}".replace(",", "."),
            f"{l['horas']:.1f} h",
            f"{l['horas_acumuladas']:.1f} h",
        ])
    tabela("PROGRESSÃO (horas de jogo ativo)",
           ["Faixa", "fama", "fama/hora", "horas", "acumulado"], linhas)


def relatorio_desnivel(B):
    """Um jogador de tier N contra um mob de outro tier."""
    linhas = []
    for meu in range(2, 7):
        lo = Loadout(arma_tier=meu, cabeca_tier=meu, torso_tier=meu,
                     botas_tier=meu, offhand_tier=meu)
        col = [f"jogador T{meu}"]
        for alvo in (meu - 1, meu, meu + 1, meu + 2):
            if alvo < 1 or alvo > 6:
                col.append("-")
                continue
            r = simular_luta(B, lo, mob_de_referencia(B, alvo, "normal"))
            marca = "MORRE" if r["morreu"] else f"{r['segundos']:.0f}s"
            col.append(marca)
        linhas.append(col)
    tabela("DESNÍVEL DE TIER (mob normal)",
           ["", "-1 tier", "mesmo", "+1 tier", "+2 tiers"], linhas)


def relatorio_builds(B):
    """Compara builds do mesmo tier para achar quem está fora da curva."""
    t = 4
    builds = [
        Loadout(arma_tier=t, cabeca_tier=t, torso_tier=t, botas_tier=t,
                offhand_tier=t, nome="T4 limpo, uma mao"),
        Loadout(arma_tier=t, arma_duas_maos=True, cabeca_tier=t, torso_tier=t,
                botas_tier=t, nome="T4 limpo, duas maos"),
        Loadout(arma_tier=t, cabeca_tier=t, torso_tier=t, botas_tier=t, offhand_tier=t,
                encantamentos={"arma": 2}, nome="T4 arma +2"),
        Loadout(arma_tier=t, cabeca_tier=t, torso_tier=t, botas_tier=t, offhand_tier=t,
                encantamentos={"arma": 4, "torso": 4, "cabeca": 4, "botas": 4, "offhand": 4},
                nome="T4 tudo +4"),
        Loadout(arma_tier=t + 1, cabeca_tier=t + 1, torso_tier=t + 1,
                botas_tier=t + 1, offhand_tier=t + 1, nome="T5 limpo"),
        Loadout(arma_tier=t + 1, cabeca_tier=t - 1, torso_tier=t - 1,
                botas_tier=t - 1, offhand_tier=t - 1, nome="T5 arma, T3 resto"),
    ]
    alvo = mob_de_referencia(B, t, "normal")
    linhas = []
    for b in builds:
        s = stats(B, b)
        r = simular_luta(B, b, alvo)
        linhas.append([
            b.nome,
            f"{s['ip']:.0f}",
            f"{s['hp']:.0f}",
            f"{100 * mitigacao(B, s['armadura'], s['ip']):.0f}%",
            f"{r['segundos']:.0f}s",
        ])
    tabela("COMPARAÇÃO DE BUILDS (contra mob normal T4)",
           ["Build", "IP", "HP", "mitigacao", "tempo"], linhas)


def relatorio_encantamento(B):
    """Quanto encantamento vale em tiers."""
    linhas = []
    for tier in range(2, 6):
        col = [f"T{tier}"]
        for enc in range(0, 5):
            col.append(f"{ip_peca(B, tier, enc):.0f}")
        linhas.append(col)
    tabela("PODER DE ITEM POR ENCANTAMENTO (peça isolada)",
           ["Tier", "+0", "+1", "+2", "+3", "+4"], linhas)


def relatorio_grupos(B, amostras=400):
    """Combate contra grupos, com regras de combate ligada."""
    linhas = []
    for tier in range(2, 7):
        lo = Loadout(arma_tier=tier, cabeca_tier=tier, torso_tier=tier,
                     botas_tier=tier, offhand_tier=tier)
        for tamanho, elite in ((2, False), (3, False), (4, False), (3, True)):
            rs = [simular_grupo(B, lo, tier, tamanho, elite, pontos_fuga=3)
                  for _ in range(amostras)]
            mortes = sum(1 for r in rs if r["resultado"] == "morte")
            fugas = sum(1 for r in rs if r["resultado"] == "retirada")
            seg = sum(r["segundos"] for r in rs) / len(rs)
            pot = sum(r["pocoes_usadas"] for r in rs) / len(rs)
            rot = f"{tamanho}" + ("+elite" if elite else "")
            linhas.append([f"T{tier} grupo {rot}", f"{seg:.0f}s", f"{pot:.1f}",
                           f"{100*fugas/len(rs):.0f}%", f"{100*mortes/len(rs):.0f}%"])
    tabela("COMBATE EM GRUPO (regras de combate ligada, 3 pontos de fuga)",
           ["Cenário", "tempo", "poções", "retirada", "morte"], linhas)


def relatorio_fuga(B):
    linhas = []
    for pontos in (0, 1, 3, 5):
        col = [f"{pontos} pontos de fuga"]
        for arq in ("fauna", "humano", "elite", "chefe"):
            c = chance_de_fuga(B, pontos, arq)
            tent = 1.0 / c
            dur = (tent - 1) * B["retirada"]["custo_durabilidade_por_falha"]
            col.append(f"{100*c:.0f}% · {tent:.1f}t · {dur:.0f}dur")
        linhas.append(col)
    tabela("RETIRADA (chance · tentativas esperadas · durabilidade perdida)",
           ["", "fauna", "humano", "elite", "chefe"], linhas)


# ---------------------------------------------------------------- módulo de fuga

BUILDS_DE_REFERENCIA = [
    ("Físico pesado, a pé", []),
    ("Físico pesado + cavalo", ["mskill-meia-volta"]),
    ("Mágico leve + cavalo", ["askill-sumir-no-mato", "mskill-meia-volta"]),
    ("Projétil média completo", ["skill-recuar", "skill-pe-leve",
                                 "askill-pe-solto", "apass-ligeireza",
                                 "mskill-meia-volta"]),
    ("Projétil otimizado T6", ["skill-rastro-falso", "skill-pe-leve",
                               "askill-sumir-no-mato", "apass-sem-rastro",
                               "mskill-meia-volta"]),
]


def pontos_de_fuga(B, habilidades):
    """Soma os pontos, validando exclusividade de slot."""
    tabela_pontos = B["fuga"]["pontos_por_habilidade"]
    for grupo in B["fuga"]["exclusividade"]["grupos"]:
        escolhidas = [h for h in habilidades if h in grupo]
        if len(escolhidas) > 1:
            raise ValueError(f"habilidades no mesmo slot: {escolhidas}")
    return sum(tabela_pontos.get(h, 0) for h in habilidades)


def pontos_anti_fuga(B, habilidades):
    t = B["fuga"]["pontos_anti_fuga_por_habilidade"]
    return sum(t.get(h, 0) for h in habilidades)


def relatorio_pontos_de_fuga(B):
    linhas = []
    for nome, habs in BUILDS_DE_REFERENCIA:
        p = pontos_de_fuga(B, habs)
        col = [f"{nome} ({p}p)"]
        for arq in ("fauna", "humano", "elite", "chefe"):
            c = chance_de_fuga(B, p, arq)
            tent = 1.0 / c
            dur = (tent - 1) * B["retirada"]["custo_durabilidade_por_falha"]
            col.append(f"{100*c:.0f}% · {dur:.0f}dur")
        linhas.append(col)
    tabela("BUILDS REAIS — chance de retirada e durabilidade gasta",
           ["Build", "fauna", "humano", "elite", "chefe"], linhas)


def relatorio_sobrevivencia(B, tier=4, amostras=500):
    """Grupo de 3 + elite: quem sai vivo, com qual build."""
    lo = Loadout(arma_tier=tier, cabeca_tier=tier, torso_tier=tier,
                 botas_tier=tier, offhand_tier=tier)
    linhas = []
    for nome, habs in BUILDS_DE_REFERENCIA:
        p = pontos_de_fuga(B, habs)
        rs = [simular_grupo(B, lo, tier, 3, True, pontos_fuga=p)
              for _ in range(amostras)]
        rl = [simular_grupo(B, lo, tier, 3, True, pontos_fuga=p, largar_carga=True)
              for _ in range(amostras)]
        m1 = 100.0 * sum(1 for r in rs if r["resultado"] == "morte") / len(rs)
        m2 = 100.0 * sum(1 for r in rl if r["resultado"] == "morte") / len(rl)
        larg = 100.0 * sum(1 for r in rl if r["carga_largada"]) / len(rl)
        dur = sum(r["durabilidade_perdida"] for r in rs) / len(rs)
        linhas.append([f"{nome} ({p}p)", f"{m1:.0f}%", f"{m2:.0f}%",
                       f"{larg:.0f}%", f"{dur:.0f}"])
    tabela(f"EMERGÊNCIA T{tier} — grupo de 3 com elite",
           ["Build", "morte sem largar", "morte largando", "largou", "durab."], linhas)


def relatorio_largar_carga(B):
    lc = B["fuga"]["largar_carga"]
    linhas = []
    for nome, habs in BUILDS_DE_REFERENCIA:
        p = pontos_de_fuga(B, habs)
        col = [f"{nome} ({p}p)"]
        for arq in ("elite", "chefe"):
            sem = chance_de_fuga(B, p, arq)
            com = chance_de_fuga(B, p + lc["pontos"], arq)
            col.append(f"{100*sem:.0f}% -> {100*com:.0f}%")
        linhas.append(col)
    tabela("LARGAR CARGA (+4 pontos, uma vez, descarta tudo)",
           ["Build", "elite", "chefe"], linhas)


# ---------------------------------------------------------------- módulo de economia

def brutos_por_refinado(B, tier):
    """
    Um refinado de tier N custa K brutos de N mais um refinado de N-1.
    A cadeia desce até o T1, e é por isso que zona de tier baixo nunca morre.
    Devolve {tier: quantidade de bruto}.
    """
    k = B["refino"]["brutos_por_refinado"]
    custo = {}
    t = tier
    while t >= 1:
        custo[t] = custo.get(t, 0) + k
        t -= 1
    return custo


def custo_de_peca(B, slot, tier):
    """Brutos de cada tier para fabricar uma peça."""
    refinados = B["craft"]["refinados_por_peca"][slot]
    base = brutos_por_refinado(B, tier)
    return {t: q * refinados for t, q in base.items()}


def custo_de_conjunto(B, tier, duas_maos=False):
    """Conjunto completo: arma, off-hand, cabeça, torso, botas."""
    slots = (["arma_duas_maos"] if duas_maos
             else ["arma_uma_mao", "offhand"]) + ["cabeca", "torso", "botas"]
    total = {}
    for s in slots:
        for t, q in custo_de_peca(B, s, tier).items():
            total[t] = total.get(t, 0) + q
    return total


def segundos_por_bruto(B, tier):
    c = B["coleta"]
    ciclo = (c["segundos_por_no_tier"][str(tier)]
             + c["segundos_entre_nos_por_tier"][str(tier)])
    return ciclo / c["unidades_por_no"]


def taxa_de_retorno(B, nivel_refino=0):
    m = B["arvore_do_destino"]["maestria_refino"]
    return (m["taxa_retorno_base_pct"]
            + nivel_refino * m["taxa_retorno_por_nivel_pct"]) / 100.0


def rendimento_coleta(B, nivel_coleta=0):
    m = B["arvore_do_destino"]["maestria_coleta"]
    return 1.0 + nivel_coleta * m["rendimento_por_nivel_pct"] / 100.0


def horas_para_vestir(B, tier, duas_maos=False, estado_zona="normal",
                      nivel_coleta=0, nivel_refino=0):
    custo = custo_de_conjunto(B, tier, duas_maos)
    fator = (1.0 - taxa_de_retorno(B, nivel_refino)) / rendimento_coleta(B, nivel_coleta)
    custo = {t: q * fator for t, q in custo.items()}
    mult = B["coleta"]["multiplicador_estado_zona"][estado_zona]
    seg_coleta = sum(q * segundos_por_bruto(B, t) / mult for t, q in custo.items())

    refinados = sum(B["craft"]["refinados_por_peca"][s]
                    for s in (["arma_duas_maos"] if duas_maos
                              else ["arma_uma_mao", "offhand"])
                    + ["cabeca", "torso", "botas"])
    seg_refino = refinados * B["refino"]["segundos_por_refinado"]

    seg = (seg_coleta + seg_refino) * (1 + B["economia"]["overhead_viagem_pct"] / 100)
    return {
        "horas": seg / 3600.0,
        "horas_coleta": seg_coleta / 3600.0,
        "brutos_total": int(round(sum(custo.values()))),
        "custo": custo,
    }


def relatorio_economia(B):
    linhas = []
    prog = {l["para"]: l for l in curva_de_progressao(B)}
    for tier in range(2, 7):
        v = horas_para_vestir(B, tier)
        subir = prog[tier]["horas"] if tier in prog else 0.0
        razao = v["horas"] / subir if subir else 0.0
        linhas.append([
            f"conjunto T{tier}",
            f"{v['brutos_total']:,}".replace(",", "."),
            f"{v['horas']:.1f} h",
            f"{subir:.1f} h",
            f"{razao:.1f}x",
        ])
    tabela("ECONOMIA — vestir um conjunto completo",
           ["Conjunto", "brutos", "coletar", "subir tier", "razão"], linhas)


def relatorio_cadeia(B, tier=4):
    custo = custo_de_conjunto(B, tier)
    linhas = []
    for t in sorted(custo):
        q = custo[t]
        h = q * segundos_por_bruto(B, t) / 3600.0
        linhas.append([f"bruto T{t}", f"{q:,}".replace(",", "."),
                       f"{segundos_por_bruto(B, t):.0f}s", f"{h:.1f} h"])
    tabela(f"CADEIA DE REFINO — de onde vem um conjunto T{tier}",
           ["Material", "unidades", "por unidade", "horas"], linhas)


def relatorio_estado_zona(B, tier=4):
    linhas = []
    for estado in ("abundante", "normal", "escassa"):
        v = horas_para_vestir(B, tier, estado_zona=estado)
        linhas.append([f"zona {estado}", f"{v['horas']:.1f} h",
                       f"{100 * v['horas'] / horas_para_vestir(B, tier)['horas']:.0f}%"])
    tabela(f"ESTADO DE ZONA — impacto no tempo de vestir um T{tier}",
           ["Estado", "horas", "relativo"], linhas)


def relatorio_maestria(B):
    """Quanto a maestria vale, comparada a subir de tier."""
    linhas = []
    m = B["arvore_do_destino"]["maestria_combate"]
    for tier in (3, 4, 5):
        lo = Loadout(arma_tier=tier, cabeca_tier=tier, torso_tier=tier,
                     botas_tier=tier, offhand_tier=tier)
        alvo = mob_de_referencia(B, tier + 1, "normal")
        col = [f"T{tier} vs mob T{tier+1}"]
        for nivel in (0, 10, 20, 30):
            s = stats(B, lo, nivel)
            r = simular_luta(B, lo, alvo) if nivel == 0 else None
            # recalcula manualmente com maestria
            hp_mob, ticks = alvo["hp"], 0
            ciclo, poder = B["combate"]["ciclo_padrao"], B["combate"]["poder_skill"]
            while hp_mob > 0 and ticks < 3000:
                hp_mob -= dano(B, poder[ciclo[ticks % len(ciclo)]], s["ap"], s["ip"],
                               alvo["ip"], alvo["armadura"])
                ticks += 1
            col.append(f"{ticks * B['tick_segundos']:.0f}s")
        linhas.append(col)
    tabela("MAESTRIA DE COMBATE (Poder de Item por nível)",
           ["Cenário", "nível 0", "nível 10", "nível 20", "nível 30"], linhas)


def relatorio_maestria_economia(B):
    linhas = []
    for nivel in (0, 10, 20, 30):
        v = horas_para_vestir(B, 4, nivel_coleta=nivel, nivel_refino=nivel)
        linhas.append([
            f"maestria nível {nivel}",
            f"{v['brutos_total']:,}".replace(",", "."),
            f"{100*taxa_de_retorno(B, nivel):.0f}%",
            f"{100*(rendimento_coleta(B, nivel)-1):.0f}%",
            f"{v['horas']:.1f} h",
        ])
    tabela("MAESTRIA DE COLETA E REFINO (conjunto T4)",
           ["Nível", "brutos", "retorno", "rendimento", "horas"], linhas)


# ---------------------------------------------------------------- módulo de prata e durabilidade

def durabilidade_por_hora(B, tier, pontos_fuga=3, amostras=200):
    """Quanto de durabilidade uma hora de farm consome, e quanto custa consertar."""
    lo = Loadout(arma_tier=tier, cabeca_tier=tier, torso_tier=tier,
                 botas_tier=tier, offhand_tier=tier)
    dur = B["durabilidade"]

    normais = [simular_grupo(B, lo, tier, 3, False, pontos_fuga=pontos_fuga)
               for _ in range(amostras)]
    elites = [simular_grupo(B, lo, tier, 3, True, pontos_fuga=pontos_fuga,
                            largar_carga=True) for _ in range(amostras)]

    p_elite = B["grupos"]["chance_elite"]
    seg = ((1 - p_elite) * sum(r["segundos"] for r in normais) / len(normais)
           + p_elite * sum(r["segundos"] for r in elites) / len(elites)
           + B["grupos"]["segundos_entre_ondas"])
    grupos_h = 3600.0 / seg

    acoes_por_grupo = seg / B["tick_segundos"]
    d_uso = grupos_h * acoes_por_grupo / dur["acoes_por_ponto_perdido"]

    mortes = p_elite * sum(1 for r in elites if r["resultado"] == "morte") / len(elites)
    d_morte = grupos_h * mortes * dur["perda_por_morte_pct"]

    d_fuga = grupos_h * dur["perda_por_falha_de_fuga"] / 3.0 * (
        (1 - p_elite) * sum(r["durabilidade_perdida"] for r in normais) / len(normais)
        + p_elite * sum(r["durabilidade_perdida"] for r in elites) / len(elites))

    total = d_uso + d_morte + d_fuga
    horas_ate_amarelo = 50.0 / total if total else 0
    # 5 peças equipadas
    custo = total * 5 * dur["custo_conserto_por_ponto"][str(tier)]

    prata = (grupos_h * (B["grupos"]["tamanho_min"] + B["grupos"]["tamanho_max"]) / 2
             * B["prata"]["por_mob_tier"][str(tier)]
             * B["fama"]["fracao_tempo_em_combate"])

    return {"uso": d_uso, "morte": d_morte, "fuga": d_fuga, "total": total,
            "horas_ate_amarelo": horas_ate_amarelo,
            "custo_conserto": custo, "prata": prata,
            "mortes_por_hora": grupos_h * mortes}


def prata_para_vestir(B, tier):
    """Prata gasta em refino e craft para montar um conjunto."""
    slots = ["arma_uma_mao", "offhand", "cabeca", "torso", "botas"]
    refinados = sum(B["craft"]["refinados_por_peca"][s] for s in slots)
    custo_ref = 0.0
    for t in range(1, tier + 1):
        por_tier = refinados if t == tier else refinados
        custo_ref += por_tier * B["prata"]["custo_refino_por_refinado_tier"][str(t)]
    custo_craft = 5 * B["prata"]["custo_craft_por_peca_tier"][str(tier)]
    taxa = (custo_ref + custo_craft) * B["estacoes"]["taxa_padrao_pct"] / 100.0
    return {"refino": custo_ref, "craft": custo_craft, "taxa": taxa,
            "total": custo_ref + custo_craft + taxa}


def relatorio_prata(B):
    linhas = []
    for tier in range(2, 7):
        v = durabilidade_por_hora(B, tier)
        saldo = v["prata"] - v["custo_conserto"]
        pct = 100.0 * v["custo_conserto"] / v["prata"] if v["prata"] else 0
        linhas.append([
            f"T{tier}",
            f"{v['prata']:,.0f}".replace(",", "."),
            f"{v['custo_conserto']:,.0f}".replace(",", "."),
            f"{pct:.0f}%",
            f"{saldo:,.0f}".replace(",", "."),
        ])
    tabela("PRATA POR HORA DE FARM",
           ["Tier", "ganha", "conserto", "% do ganho", "saldo"], linhas)


def relatorio_durabilidade(B):
    linhas = []
    for tier in range(2, 7):
        v = durabilidade_por_hora(B, tier)
        linhas.append([
            f"T{tier}",
            f"{v['uso']:.0f}",
            f"{v['morte']:.0f}",
            f"{v['fuga']:.0f}",
            f"{v['total']:.0f}",
            f"{v['horas_ate_amarelo']:.1f} h",
        ])
    tabela("DURABILIDADE PERDIDA POR HORA (pontos, por peça)",
           ["Tier", "uso", "morte", "fuga falha", "total", "até 50%"], linhas)


def relatorio_custo_vestir(B):
    linhas = []
    for tier in range(2, 7):
        c = prata_para_vestir(B, tier)
        v = durabilidade_por_hora(B, tier)
        horas = c["total"] / v["prata"] if v["prata"] else 0
        linhas.append([
            f"conjunto T{tier}",
            f"{c['refino']:,.0f}".replace(",", "."),
            f"{c['craft']:,.0f}".replace(",", "."),
            f"{c['total']:,.0f}".replace(",", "."),
            f"{horas:.1f} h",
        ])
    tabela("PRATA PARA VESTIR (além do material coletado)",
           ["Conjunto", "refino", "craft+taxa", "total", "horas de farm"], linhas)


def alertas(B):
    print("\nALERTAS")
    print("-" * 78)
    achou = False
    for l in curva_de_progressao(B):
        if l["horas"] < 0.3:
            print(f"  T{l['de']}->T{l['para']} rápido demais: {l['horas']:.2f} h")
            achou = True
        if l["horas"] > 60:
            print(f"  T{l['de']}->T{l['para']} lento demais: {l['horas']:.0f} h")
            achou = True
    for tier in range(1, 7):
        lo = Loadout(arma_tier=tier, cabeca_tier=tier, torso_tier=tier,
                     botas_tier=tier, offhand_tier=tier)
        r = simular_luta(B, lo, mob_de_referencia(B, tier, "normal"))
        if r["segundos"] < 5:
            print(f"  Mob normal T{tier} morre em {r['segundos']:.0f}s — sem tensão")
            achou = True
        if r["segundos"] > 45:
            print(f"  Mob normal T{tier} leva {r['segundos']:.0f}s — arrastado")
            achou = True
        if r["morreu"]:
            print(f"  Jogador T{tier} morre para o mob normal do próprio tier")
            achou = True
    for tier in range(2, 7):
        lo = Loadout(arma_tier=tier, cabeca_tier=tier, torso_tier=tier,
                     botas_tier=tier, offhand_tier=tier)
        rs = [simular_grupo(B, lo, tier, 3, False, pontos_fuga=3) for _ in range(300)]
        mortes = 100.0 * sum(1 for r in rs if r["resultado"] == "morte") / len(rs)
        if mortes > 5:
            print(f"  Grupo de 3 no T{tier} mata em {mortes:.0f}% das vezes")
            achou = True
    lo = Loadout(arma_tier=4, cabeca_tier=4, torso_tier=4, botas_tier=4, offhand_tier=4)
    for nome, habs in BUILDS_DE_REFERENCIA:
        p = pontos_de_fuga(B, habs)
        rs = [simular_grupo(B, lo, 4, 3, True, pontos_fuga=p, largar_carga=True)
              for _ in range(300)]
        m = 100.0 * sum(1 for r in rs if r["resultado"] == "morte") / len(rs)
        if m > 60:
            print(f"  '{nome}' morre em {m:.0f}% das emergências — sem saída")
            achou = True
        if m < 2 and p >= 5:
            print(f"  '{nome}' nunca morre — fuga alta sem risco")
            achou = True
    prog = {l["para"]: l for l in curva_de_progressao(B)}
    for tier in range(2, 7):
        v = horas_para_vestir(B, tier)
        subir = prog[tier]["horas"]
        r = v["horas"] / subir
        if r > 3.0:
            print(f"  Vestir T{tier} custa {r:.1f}x o tempo de subir o tier — coleta domina")
            achou = True
        if r < 0.4:
            print(f"  Vestir T{tier} custa só {r:.1f}x o tempo de subir — gear de graça")
            achou = True
    for tier in range(2, 7):
        v = durabilidade_por_hora(B, tier)
        pct = 100.0 * v["custo_conserto"] / v["prata"] if v["prata"] else 0
        if pct > 60:
            print(f"  Conserto no T{tier} come {pct:.0f}% da prata — farm não paga o próprio desgaste")
            achou = True
        if pct < 8:
            print(f"  Conserto no T{tier} é só {pct:.0f}% da prata — sumidouro fraco demais")
            achou = True
    if not achou:
        print("  Nenhum. Todas as âncoras dentro da faixa esperada.")


def main():
    caminho = sys.argv[1] if len(sys.argv) > 1 else "balance.json"
    B = carregar(caminho)
    print("=" * 78)
    print(f"SIMULADOR DE BALANCEAMENTO — {B['id']}")
    print("=" * 78)
    relatorio_encantamento(B)
    relatorio_ttk(B)
    relatorio_desnivel(B)
    relatorio_builds(B)
    relatorio_grupos(B)
    relatorio_fuga(B)
    relatorio_pontos_de_fuga(B)
    relatorio_sobrevivencia(B)
    relatorio_largar_carga(B)
    relatorio_progressao(B)
    relatorio_cadeia(B)
    relatorio_economia(B)
    relatorio_maestria(B)
    relatorio_maestria_economia(B)
    relatorio_estado_zona(B)
    relatorio_durabilidade(B)
    relatorio_prata(B)
    relatorio_custo_vestir(B)
    alertas(B)
    print()


if __name__ == "__main__":
    main()
