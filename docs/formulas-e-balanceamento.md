# Fórmulas e balanceamento

> **Estado do documento:** este arquivo registra o modelo de balanceamento atualmente adotado e os números que ainda estão em experimentação. Resultados de simulações feitas com modelos anteriores não são usados como evidência do balanceamento atual; esse material pertence ao histórico.

Todas as constantes vivem em `data/shared/balance/` (`combat.json`, `economy.json`, `progression.json`). **Nenhum número de balanceamento deve ficar hardcoded no servidor.** O simulador, quando reescrito, deve carregar os mesmos dados usados pelo servidor.

---

## 1. Princípio

Num jogo de ação você balanceia dano e deriva o tempo. **Num idle é o contrário: fixa-se o tempo desejado e deriva-se o dano.**

A âncora mestra é o tempo de jogo ativo necessário para progredir entre tiers. Os números devem ser tratados como parâmetros do modelo, não como regras imutáveis.

A referência conceitual do Albion é a estrutura de progressão, não a cópia dos valores. O Eras usa uma curva própria para IP, combate, progressão e economia.

---

## 2. Poder de Item

O Poder de Item é o escalar central. Vida, dano e mitigação derivam dele.

```text
IP(peça) = base(tier) + encantamento + qualidade
```

### Base por tier

| Tier |    1 |    2 |    3 |    4 |    5 |    6 |
| ---- | ---: | ---: | ---: | ---: | ---: | ---: |
| base |  100 |  200 |  350 |  550 |  800 | 1100 |

### Encantamento

| Encantamento |   +0 |   +1 |   +2 |   +3 |   +4 |
| ------------ | ---: | ---: | ---: | ---: | ---: |
| bônus        |    0 |   80 |  170 |  270 |  380 |

### Qualidade

| Qualidade | normal |  bom | excepcional | excelente | obra-prima |
| --------- | -----: | ---: | ----------: | --------: | ---------: |
| bônus     |      0 |   20 |          50 |        90 |        140 |

**Exemplo:** um T4+3 tem 820 de IP, enquanto um T5 limpo tem 800. A sobreposição entre tiers e encantamentos é intencional.

### IP do loadout

Média ponderada por slot:

```text
IP = 0.35·arma + 0.10·offhand + 0.15·cabeça + 0.25·torso + 0.15·botas
```

Arma de duas mãos absorve o peso do off-hand e vale `0.45`.

---

## 3. Curva de escala

Tudo desemboca no Poder de Item, que passa por uma curva multiplicativa.

```text
multiplicadorIP = 1.0918 ^ ((IP − 100) / 100)
```

A curva é normalizada em IP 100: o T1 vale exatamente `1,00×`.

| Tier |   IP | multiplicador |
| ---- | ---: | ------------: |
| T1   |  100 |         1,00× |
| T2   |  200 |         1,09× |
| T3   |  350 |         1,25× |
| T4   |  550 |         1,48× |
| T5   |  800 |         1,85× |
| T6   | 1100 |     **2,41×** |

A intenção é evitar que o tier domine tudo e torne encantamento irrelevante.

**O conceito de AP não existe mais.** O modelo atual usa o multiplicador de IP.

---

## 4. Atributos e dano

```text
hp        = 600 × multiplicadorIP
armadura  = 240 × multiplicadorIP_médio(cabeça, torso, botas)

mitigação = ARM / (ARM + 200 + 2.0 × IP_atacante)
            teto de 75%

fatorRelativo = clamp(
    1 + (IP_atacante − IP_alvo) / 2000,
    0.5,
    1.8
)

dano = poderSkill
       × multiplicadorIP
       × (1 − mitigação)
       × fatorRelativo
```

Vida e armadura usam a mesma curva de IP do dano.

O fator relativo foi estreitado para `/2000` e `0,5–1,8`. Essa regra faz parte do modelo atual; a calibração quantitativa ainda depende do novo simulador.

---

## 5. Mobs e grupos

Os atributos dos mobs derivam de um loadout equivalente ao tier deles.

| Tipo            |    HP |  dano | anti-fuga |
| --------------- | ----: | ----: | --------: |
| normal (fauna)  | 0.35× | 0.45× |       0.5 |
| normal (humano) | 0.35× | 0.45× |       1.5 |
| elite           |  1.5× | 0.85× |       2.5 |
| chefe           |  5.0× | 1.15× |       4.0 |

A zona oferece grupos nomeados. A composição do grupo é definida pelos dados da zona.

O grupo nasce como **onda fechada**: a próxima onda só nasce quando a anterior termina.

O jogador foca um alvo por vez; os inimigos vivos atacam conforme as regras do combate.

**Teto de 50 rodadas por onda.** Se o limite for atingido, o combate entra em impasse conforme as regras do sistema.

---

## 6. Fama e progressão

A progressão usa:

```text
Fama(N → N+1) = 3000 × 6^(N−1)
```

| Faixa |      Fama |
| ----- | --------: |
| T1→T2 |     3.000 |
| T2→T3 |    18.000 |
| T3→T4 |   108.000 |
| T4→T5 |   648.000 |
| T5→T6 | 3.888.000 |

Fama por ação, por tier:

```text
mob      = 20 × 2.5^(N−1)
coleta   = 15 × 2.5^(N−1)
refino   = 10 × 2.5^(N−1)
```

### Afinidade

A Afinidade multiplica a fama, de `1,0` a `1,5`, ao longo de 60 ações com a mesma arma.

- congela offline;
- reseta somente na troca;
- funciona como custo de oportunidade, não como punição.

### Árvore do Destino

São quatro ramos independentes:

| Ramo    | Um nó por                   | O que a maestria dá         |
| ------- | --------------------------- | --------------------------- |
| Combate | linha de arma e de armadura | Poder de Item               |
| Coleta  | tipo de recurso             | acesso a tier e rendimento  |
| Refino  | tipo de refinado            | taxa de retorno de material |
| Craft   | família de item             | chance de qualidade         |

A maestria de combate contribuir para o Poder de Item é parte do modelo atual: dois personagens podem ter o mesmo tier desbloqueado e desempenho diferente pela especialização.

As curvas de fama dos ramos não são iguais. Coleta, refino e craft usam, respectivamente, multiplicadores de `0,35`, `0,15` e `0,20` sobre a curva base.

### Ferramentas

A ferramenta pode estar no máximo um tier abaixo do recurso.

Para obter recurso acima de qualidade normal, a ferramenta precisa ser do mesmo tier do nó.

---

## 7. Combate: modelo orientado a eventos

**O modelo atual não usa tick de combate.**

A luta é resolvida como uma sequência de eventos. O próximo evento é o menor entre:

- próximo ataque básico;
- próxima habilidade pronta.

A luta inteira é resolvida no servidor e enviada ao cliente como uma linha do tempo.

### Ataque básico

```text
intervalo = 1 / velocidadeDeAtaque

dano =
    poderAtaqueBasico
    × multiplicadorIP
    × (1 − mitigação)
    × fatorRelativo
```

O `poderAtaqueBasico` atualmente proposto é `20`.

O ataque básico:

- está sempre ativo;
- não ocupa slot;
- não custa energia;
- é mais fraco por golpe que uma habilidade;
- depende da velocidade da arma.

### Habilidades

Cada habilidade possui recarga e custo de energia.

| Slot          | Recarga base | Custo base |
| ------------- | -----------: | ---------: |
| Ataque (Q)    |          5 s |          8 |
| Utilidade (W) |         15 s |         15 |
| Especial (E)  |         25 s |         25 |
| Armadura      |         35 s |         20 |

Tags ajustam esses valores. Área e cura aumentam custo/recarga; controle e fuga têm ajustes próprios.

### Energia

```text
máxima      = 100 × multiplicadorIP
regeneração = 3.5 × multiplicadorIP por segundo
```

A barra e a regeneração acompanham a mesma curva de IP.

### Prioridade

Existem seis slots ativos ordenados pelo jogador.

Quando mais de uma habilidade está pronta e há energia suficiente, dispara a habilidade de maior prioridade.

Não existe uma lista separada de habilidades desabilitadas: **o próprio slot é a restrição.**

### Ordem de verificação

A cada evento, o servidor verifica:

1. condição de parada;
2. limiar de retirada;
3. limiar de cura;
4. habilidade que deve disparar.

A poção é acionada pelo limiar de vida e fica fora da prioridade das habilidades.

---

## 8. Status dos números de combate

Nem todo número acima tem o mesmo grau de validação.

### Modelo adotado

As seguintes estruturas pertencem ao modelo atual:

- Poder de Item e sua composição;
- curva multiplicativa de IP;
- fórmula de vida;
- fórmula de armadura;
- mitigação;
- fator relativo;
- multiplicadores básicos de mobs;
- progressão de Fama;
- Afinidade;
- quatro ramos da Árvore do Destino;
- combate orientado a eventos;
- slots e prioridade;
- energia.

### Ainda experimental

Os valores abaixo estão registrados como `guessedValues` nos dados de balanceamento e **não foram validados por uma simulação atual**:

- velocidade de ataque;
- recargas;
- custos de energia;
- regeneração de energia;
- valores de habilidades individuais;
- números das habilidades W;
- números das passivas;
- demais parâmetros de combate que dependam do catálogo de habilidades.

Portanto, as fórmulas acima representam o **formato do modelo**, enquanto vários parâmetros ainda são hipóteses de balanceamento.

---

## 9. Economia

### Cadeia de refino

```text
1 refinado T(N) = 3 brutos T(N) + 1 refinado T(N−1)
```

A cadeia desce até o T1.

A intenção é manter utilidade para recursos de tiers baixos mesmo quando o jogador estiver produzindo equipamento de tier alto.

### Equipamento

O conjunto completo considerado para a cadeia de equipamento é:

```text
arma + off-hand + cabeça + torso + botas
```

O custo exato por item e tier pertence aos dados de economia, não a constantes hardcoded no servidor.

### Estações

Estações de produção têm tier próprio.

Refino:

- Fundição;
- Curtume;
- Tecelagem;
- Serraria;
- Canteiro.

Craft:

- Forja;
- Posto de Caça;
- Terreiro;
- Ferramentaria.

A estação limita o tier que pode ser produzido. Taxas e bônus econômicos pertencem aos dados de balanceamento.

---

## 10. Durabilidade e prata

### Durabilidade

A durabilidade é afetada por:

- uso;
- morte;
- tentativa de fuga fracassada.

A morte é uma fonte importante de desgaste. O uso desgasta mais lentamente.

A durabilidade também possui efeito mecânico:

| Faixa         | Efeito                     |
| ------------- | -------------------------- |
| 100% a 50%    | nenhum                     |
| 49% a 25%     | perde 100 de Poder de Item |
| 24% a 10%     | perde 200 de Poder de Item |
| abaixo de 10% | item não pode ser usado    |

Ferramentas de coleta são exceção e não perdem Poder de Item.

### Prata

A prata obtida e gasta deve ser calibrada junto com:

- recompensas dos mobs;
- custo de conserto;
- custos de refino;
- custos de craft;
- demais entradas e saídas econômicas.

Os valores quantitativos precisam ser recalculados quando o simulador estiver atualizado.

---

## 11. O que ainda não está balanceado

O principal bloco em aberto é o catálogo completo de habilidades:

- valores de W;
- valores das passivas;
- custos específicos;
- recargas específicas;
- interações entre habilidades;
- calibração final do combate em grupos.

Também permanecem dependentes de simulação atualizada:

- tempos de morte;
- progressão em horas;
- custo efetivo para vestir cada tier;
- consumo de durabilidade;
- fluxo de prata;
- impacto econômico da maestria;
- comportamento em desnível de tier.

Esses resultados não devem ser tratados como números válidos enquanto o simulador antigo não for substituído.

---

## 12. MVP

A MVP vai do T1 ao T2.

O objetivo da MVP é validar o formato do loop:

```text
coletar → produzir → equipar → combater → progredir
```

O balanceamento quantitativo de tiers mais altos não precisa estar fechado para validar esse fluxo.

A arquitetura dos dados deve, entretanto, permitir que os números sejam alterados posteriormente sem reescrever as regras do servidor.

---

## 13. Simulador

O `tools/sim.py` existente está desatualizado em relação ao modelo atual.

Ele ainda representa o modelo antigo de:

- escala linear;
- combate por tick;
- ciclo fixo de habilidades;
- arquivo de balanceamento antigo.

Por isso, os resultados produzidos por essa versão não devem ser usados para validar o modelo atual.

O simulador precisa ser reescrito para:

1. carregar `data/shared/balance/`;
2. usar a curva multiplicativa de IP;
3. resolver combate por eventos;
4. respeitar slots e prioridade;
5. usar as recargas e custos definidos nos dados;
6. produzir novamente os relatórios de calibração.

O objetivo continua sendo simples:

```text
alterar um número no JSON
        ↓
rodar o simulador
        ↓
observar as âncoras
        ↓
ajustar
```

Quando o servidor Go existir, **servidor e simulador devem consumir a mesma fonte de dados**. Se cada um usar números diferentes, o simulador deixa de ser uma referência confiável para o jogo.
