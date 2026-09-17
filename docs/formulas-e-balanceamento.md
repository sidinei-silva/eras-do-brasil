# Fórmulas e balanceamento

Todas as constantes vivem em `balance.json`. **Nenhum número em código** — servidor e simulador leem o mesmo arquivo. `sim.py` valida as âncoras sem precisar jogar.

---

## 1. O princípio

Num jogo de ação você balanceia dano e deriva o tempo. **Num idle é o contrário: fixa-se o tempo e deriva-se o dano.**

A âncora mestra é *quantas horas de jogo ativo levam do T1 ao T6*. Tudo o mais é aritmética para trás.

Nem os números do Eras nem os do Albion servem como estão. Os do Eras são de mesa — CD 12, +1 de Defesa — feitos para uma rolagem por turno e um mestre humano ajustando. Os do Albion assumem posicionamento e APM. **O que se aproveita do Albion é a estrutura, não os valores:** um escalar único que colapsa tier, qualidade e encantamento.

---

## 2. Poder de Item

O escalar único. Vida, dano e mitigação derivam dele.

```
IP(peça) = base(tier) + encantamento + qualidade
```

| Tier | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| base | 100 | 200 | 350 | 550 | 800 | 1100 |

| Encantamento | +0 | +1 | +2 | +3 | +4 |
|---|---|---|---|---|---|
| bônus | 0 | 80 | 170 | 270 | 380 |

| Qualidade | normal | bom | excepcional | excelente | obra-prima |
|---|---|---|---|---|---|
| bônus | 0 | 20 | 50 | 90 | 140 |

**Consequência desenhada:** um T4+3 tem 820 de IP e supera um T5 limpo, que tem 800. É essa sobreposição que faz o mercado de encantados existir — sem ela, encantamento é enfeite.

### IP do loadout

Média ponderada por slot:

```
IP = 0.35·arma + 0.10·offhand + 0.15·cabeça + 0.25·torso + 0.15·botas
```

Arma de duas mãos absorve o peso do off-hand e vale 0.45. **Torso é o slot de maior peso**, coerente com ele ser quem declara a linha de armadura.

---

## 3. Atributos derivados

```
AP        = IP × 0.5
HP        = 300 + IP × 2
Armadura  = (IP_cabeça + IP_torso + IP_botas) × 0.4
```

Só as três peças de armadura contribuem para a Armadura. Arma e off-hand contribuem para o IP total, e portanto para HP e AP, mas não para mitigação.

---

## 4. Dano

```
mitigação      = ARM / (ARM + 200 + 2.0 × IP_atacante),  teto 75%
fator_relativo = clamp(1 + (IP_atacante − IP_alvo) / 1000, 0.4, 2.5)

dano = poder_skill × (AP/100) × (1 − mitigação) × fator_relativo
```

**A penetração por IP do atacante não é enfeite.** Sem ela a mitigação sobe de 45% no T2 para 58% no T6, e tier alto fica estritamente mais seguro — o simulador mostrou T5 e T6 aguentando grupos com elite que matavam um T4. Com a penetração, a mitigação fica praticamente plana entre tiers e o perigo escala junto com o poder.

**O `fator_relativo` é a peça política do sistema.** Escalar pela *diferença* de IP, e não pelo valor absoluto, é o que faz um T6 esmagar um T4 e o que dá sentido à zona de risco. Sem ele, gear vira só um número maior.

Os limites de 0.4 e 2.5 impedem que a diferença chegue a zero ou ao infinito: mesmo muito abaixo, você ainda arranha; mesmo muito acima, você ainda leva tempo.

### Poder de skill

| Slot | Poder |
|---|---|
| Q | 35 |
| W de dano | 45 |
| E | 90 |

Ciclo padrão do auto-battler: `Q Q Q Q E`. Tick de 2 segundos.

---

## 5. Mobs e grupos

Derivam do loadout equivalente ao tier deles.

| Tipo | HP | AP | anti-fuga |
|---|---|---|---|
| normal (fauna) | 0.35× | 0.45× | 0.5 |
| normal (humano) | 0.35× | 0.45× | 1.5 |
| elite | 1.5× | 0.85× | 2.5 |
| chefe | 5.0× | 1.15× | 4.0 |

**O jogador escolhe o grupo, como escolhe um nó de coleta.** A zona oferece grupos nomeados; o sorteio fica na composição — 2 a 4 inimigos, com 12% de chance de um elite se juntar. Estado de zona multiplica essa chance.

**O grupo nasce como onda fechada** — só nasce a próxima quando a onda inteira morre. O jogador foca um alvo por vez; todos os vivos atacam a cada tick, e por isso um grupo de 4 é muito mais perigoso que quatro lutas seguidas de 1.

**Teto de 50 rodadas por onda**, com impasse se estourar. O pior caso medido é 39 rodadas, então é margem e não restrição.

---

## 6. Fama e progressão

```
Fama(N → N+1) = 3000 × 6^(N−1)
```

| Faixa | Fama |
|---|---|
| T1→T2 | 3.000 |
| T2→T3 | 18.000 |
| T3→T4 | 108.000 |
| T4→T5 | 648.000 |
| T5→T6 | 3.888.000 |

Fama por ação, por tier — mob `20 × 2.5^(N−1)`, coleta `15 × 2.5^(N−1)`, refino `10 × 2.5^(N−1)`.

**A Afinidade multiplica tudo**, de 1.0 a 1.5 ao longo de 60 ações com a mesma arma. Congela offline, reseta só na troca. Custo de oportunidade, nunca punição.

---

## 7. A Árvore do Destino — quatro ramos

No Albion a Árvore do Destino tem quatro ramos independentes, e cada ação alimenta o nó correspondente. Matar com espada dá fama de espada; coletar minério dá fama de minério; forjar uma peça de pano dá fama daquela família de craft.

| Ramo | Um nó por | O que a maestria dá |
|---|---|---|
| Combate | linha de arma e de armadura | **Poder de Item** |
| Coleta | tipo de recurso | acesso a tier e rendimento |
| Refino | tipo de refinado | taxa de retorno de material |
| Craft | família de item | chance de qualidade |

**Maestria de combate dando Poder de Item é a peça que faltava no modelo.** É o que faz o T6 de quem grindou bater mais forte que o T6 de quem acabou de destravar, e é o motivo de o grind continuar valendo depois que o tier abriu.

| Cenário | nível 0 | nível 10 | nível 20 | nível 30 |
|---|---|---|---|---|
| T3 contra mob T4 | 30s | 18s | 12s | 10s |
| T4 contra mob T5 | 26s | 20s | 12s | 10s |
| T5 contra mob T6 | 26s | 20s | 14s | 10s |

Trinta níveis de maestria valem quase um tier inteiro contra um alvo acima do seu. É o que permite um veterano bem especializado enfrentar conteúdo que, no papel, é grande demais para o equipamento dele.

**As curvas de fama são diferentes por ramo.** Coleta, refino e craft sobem mais rápido que combate — multiplicadores de 0,35, 0,15 e 0,20 sobre a curva base — porque cada ação individual rende menos fama.

### Ferramentas travam o tier

A ferramenta pode estar no máximo um tier abaixo do recurso: para T5, é preciso ferramenta T4 ou melhor. E **para tirar recurso acima de qualidade normal, a ferramenta precisa ser do mesmo tier do nó.** É o que dá função permanente à linha de ferramentas do tutorial.

---

## 8. Regras de combate

Num idle o jogador configura antes e o servidor executa sem ele. A cada tick, nesta ordem:

1. **Condições de parada** — carga cheia, poções acabaram, durabilidade abaixo do mínimo.
2. **Limiar de retirada** — rola fuga contra a anti-fuga do inimigo.
3. **Limiar de cura** — poção ou habilidade.
4. **Atacar.**

**Parar significa parar no lugar, nunca voltar para a cidade.** Se parar teleportasse, encher a bolsa viraria transporte grátis e toda a economia de montaria, teto de peso e taxa desabaria. O personagem fica onde está aguardando ordem, e voltar continua custando.

**Paradas são fixas e não se desligam**; o valor delas é ajustável. **Limiares de cura e retirada são configuração de verdade** — a diferença entre retirar aos 30% ou aos 15% é estratégia, e um conjunto pesado quer números diferentes de um leve.

### Retirada

```
anti_fuga_efetiva = anti_fuga_do_mais_forte + 0.5 × (inimigos_vivos − 1)
chance = clamp(0.30 + pontos_fuga × 0.10 − anti_fuga_efetiva × 0.08, 0.05, 0.75)
```

**A anti-fuga cresce com o número de inimigos vivos.** Fugir de quatro é mais difícil que fugir de um, e foi essa regra que consertou o desbalanceamento — antes, sete pontos de fuga tornavam o jogador praticamente imune a emergências.

Mesma fórmula em PvE e PvP — o que conserta um problema que a fuga tinha: só servia para PvP, e a maioria dos jogadores nunca vai fazer PvP. Com retirada em PvE, botas, montaria e a árvore Projétil passam a valer em qualquer estilo.

**A chance não sobe a cada tentativa.** Cada falha custa um turno inteiro — você não ataca e todos atacam você — mais durabilidade. Fuga alta sai barato; fuga baixa sai caro ou não sai. Morrer continua possível.

Isso faz o atributo significar a coisa certa: não é *eu escapo*, é **eu escapo barato**.

---

## 9. Resultado da simulação

Rodando `sim.py` com as âncoras atuais:

### Tempo para matar, com equipamento do mesmo tier

| Tier | normal | elite | chefe | vida perdida |
|---|---|---|---|---|
| T1 | 20s | 78s | 250s | 15% |
| T2 | 16s | 60s | 200s | 15% |
| T3 | 16s | 60s | 190s | 16% |
| T4 | 16s | 62s | 204s | 15% |
| T5 | 18s | 70s | 230s | 15% |
| T6 | 20s | 80s | 264s | 15% |

Curva plana de propósito: **subir de tier não deixa o jogo mais rápido, deixa o jogo maior.** Você mata na mesma velocidade, mas mata coisas que dão mais.

Perder 15% de vida por mob normal significa cerca de sete lutas antes de precisar recuperar. É o que dá ritmo à sessão.

### Desnível de tier, contra mob normal

| | −1 tier | mesmo | +1 tier | +2 tiers |
|---|---|---|---|---|
| jogador T4 | 10s | 16s | 32s | **morre** |

Um tier acima é o dobro do tempo. Dois tiers acima mata você. É a régua que define até onde vale se aventurar, e é o que torna a banda de risco significativa.

### Combate em grupo, com regras de combate ligada e 3 pontos de fuga

| Cenário | tempo | poções | retirada | morte |
|---|---|---|---|---|
| grupo de 2 | 24–32s | 0 | 0% | 0% |
| grupo de 3 | 38–52s | 1 | 0% | 0% |
| grupo de 4 | 54–78s | 3 | 0% | 0% |
| grupo de 3 + elite | 25–48s | 1–2 | 82–96% | 4–18% |

**Grupo de 2 a 4 é rotina; grupo com elite é emergência.** Em quase todos os casos com elite a regras de combate manda retirar, e em 4 a 18% das vezes o jogador não consegue e morre. É exatamente a curva que se quer: o farm normal é seguro, e a surpresa é o que cobra.

### Retirada — chance, tentativas esperadas e durabilidade perdida

| pontos de fuga | fauna | humano | elite | chefe |
|---|---|---|---|---|
| 0 | 26% · 3,8t · 9 dur | 18% · 5,6t · 14 dur | 10% · 10t · 27 dur | 5% · 20t · 57 dur |
| 3 | 56% · 1,8t · 2 dur | 48% · 2,1t · 3 dur | 40% · 2,5t · 4 dur | 28% · 3,6t · 8 dur |
| 5 | 76% · 1,3t · 1 dur | 68% · 1,5t · 1 dur | 60% · 1,7t · 2 dur | 48% · 2,1t · 3 dur |

Sem nenhum ponto de fuga, escapar de um elite custa 27 de durabilidade e dez turnos apanhando — na prática, você morre. Com cinco pontos, sai em uma ou duas tentativas quase ileso.

### Pontos de fuga por habilidade

| Habilidade | Fonte | Pontos |
|---|---|---|
| Recuar | W, árvore Projétil, T2 | 1 |
| Rastro Falso | W, árvore Projétil, T6 | 2 |
| Pé Leve | passiva de arma, Projétil, T3 | 1 |
| Pé Solto | botas média, T3 | 1 |
| Sumir no Mato | botas leve, T5 | 2 |
| Ligeireza | torso média, T4 | 1 |
| Sem Rastro | torso média, T6 | 1 |
| Meia Volta | cavalo de sela | 1 |

**Um slot, uma escolha.** Recuar e Rastro Falso disputam o mesmo W; Pé Solto e Sumir no Mato são botas diferentes; Ligeireza e Sem Rastro são o mesmo torso. Isso é o que impede empilhar tudo — o simulador rejeita builds inválidas.

Anti-fuga: Encurralar, Amarração e Fincar valem 2 pontos cada.

**Largar Carga vale +4, mas fica fora da soma passiva.** É uma ação com preço: você troca tudo que juntou por sair vivo, uma vez por combate.

### Builds reais — chance de retirada e durabilidade gasta

| Build | fauna | humano | elite | chefe |
|---|---|---|---|---|
| Físico pesado, a pé (0p) | 26% · 9 dur | 18% · 14 dur | 10% · 27 dur | 5% · 57 dur |
| Físico pesado + cavalo (1p) | 36% · 5 dur | 28% · 8 dur | 20% · 12 dur | 8% · 34 dur |
| Mágico leve + cavalo (3p) | 56% · 2 dur | 48% · 3 dur | 40% · 4 dur | 28% · 8 dur |
| Projétil média completo (5p) | 76% · 1 dur | 68% · 1 dur | 60% · 2 dur | 48% · 3 dur |
| Projétil otimizado T6 (7p) | 85% · 1 dur | 85% · 1 dur | 80% · 1 dur | 68% · 1 dur |

**Só o cavalo já dobra a chance de escapar de fauna.** É a decisão mais barata do jogo e a que mais paga para quem não montou fuga.

### Emergência — grupo de 3 com elite, no T4

| Build | morte sem largar | morte largando a carga | largou | durabilidade |
|---|---|---|---|---|
| Físico pesado, a pé (0p) | 67% | 33% | 82% | 6 |
| Físico pesado + cavalo (1p) | 54% | 24% | 70% | 5 |
| Mágico leve + cavalo (3p) | 28% | 13% | 52% | 3 |
| Projétil média completo (5p) | 11% | 8% | 31% | 1 |
| Projétil otimizado T6 (7p) | 7% | 6% | 27% | 1 |

**A amplitude vai de 67% a 7% de morte, e nenhuma ponta é absoluta.** A build otimizada para fugir ainda morre em 7% das emergências — o teto de 75% na chance e o fato de a anti-fuga crescer com o número de inimigos vivos impedem que fuga alta vire imunidade.

**E a coluna de Largar Carga mostra para quem ela serve.** O pesado sai de 67% para 33% de morte e larga a carga em 82% das emergências; o Projétil otimizado quase não precisa dela. A saída de emergência socorre exatamente quem não investiu em saída, e cobra em material — que é o que o pesado tinha de sobra, porque carrega mais.

### Largar Carga como último recurso

| Build | elite | chefe |
|---|---|---|
| Físico pesado, a pé (0p) | 10% → 50% | 5% → 38% |
| Físico pesado + cavalo (1p) | 20% → 60% | 8% → 48% |
| Projétil otimizado T6 (7p) | 80% → 85% | 68% → 85% |

**Quem menos tem fuga é quem mais ganha ao largar a carga.** O pesado sai de 10% para 50% contra um elite; o Projétil já estava em 80% e ganha pouco. Isso é exatamente o desenho certo: a saída de emergência serve quem não investiu em saída, e cobra o preço em material — que é o que o pesado tinha de sobra, porque carrega mais.

### Comparação de builds, contra mob normal T4

| Build | IP | HP | mitigação | tempo |
|---|---|---|---|---|
| T4 limpo | 550 | 1400 | 33% | 16s |
| T4 arma +2 | 610 | 1519 | 33% | 14s |
| T4 tudo +4 | 930 | 2160 | 41% | 8s |
| T5 limpo | 800 | 1900 | 36% | 10s |
| T5 arma, T3 no resto | 508 | 1315 | 27% | 18s |

**A última linha é a mais importante.** Arma de tier alto com armadura ruim performa *pior* que um conjunto T4 inteiro. Isso mata a build de "arma cara e resto barato", que é o vício natural de todo jogo gear-based.

E um T4 totalmente encantado bate um T5 limpo — a sobreposição funcionando na prática.

### Progressão

| Faixa | Fama/hora | Horas | Acumulado |
|---|---|---|---|
| T1→T2 | 4.584 | 0,8 h | 0,8 h |
| T2→T3 | 11.912 | 1,8 h | 2,6 h |
| T3→T4 | 30.885 | 4,3 h | 6,9 h |
| T4→T5 | 73.451 | 10,9 h | 17,8 h |
| T5→T6 | 199.725 | 24,0 h | 41,8 h |

**Trinta e nove horas de jogo ativo para levar uma linha de arma do zero ao T6.** A oito horas por semana, cerca de cinco semanas.

Isso é só a linha da arma. O tempo real até estar *vestido* de T6 é bem maior, porque exige juntar material, subir a linha de coleta e a de refino, e viajar. Estimativa grosseira: de duas a três vezes isso, ou seja **algo entre 80 e 120 horas para dominar a Era 1** — que é um arco de MVP de uns três meses no seu ritmo.

---

## 10. Economia — quanto custa se vestir

### A cadeia de refino

```
1 refinado T(N) = 3 brutos T(N) + 1 refinado T(N−1)
```

A cadeia desce até o T1, e **é por isso que zona de tier baixo nunca morre**: um conjunto T4 consome tanto bruto de T1 quanto de T4.

Conjunto completo = arma, off-hand, cabeça, torso, botas — 56 refinados.

### De onde vem um conjunto T4

| Material | unidades | por unidade | horas |
|---|---|---|---|
| bruto T1 | 168 | 8s | 0,4 h |
| bruto T2 | 168 | 12s | 0,6 h |
| bruto T3 | 168 | 21s | 1,0 h |
| bruto T4 | 168 | 36s | 1,7 h |

O tempo por unidade tem duas partes que **escalam por tier**: extrair o nó e achar o próximo. Nó de T6 leva 78 segundos para extrair e 160 para encontrar o seguinte. Sem essa escala, equipamento de tier alto sai de graça — foi o primeiro alerta que o simulador disparou neste módulo.

### Vestir contra subir

| Conjunto | brutos | coletar | subir o tier | razão |
|---|---|---|---|---|
| T2 | 336 | 1,3 h | 0,8 h | 1,6× |
| T3 | 504 | 2,5 h | 1,8 h | 1,3× |
| T4 | 672 | 4,6 h | 4,3 h | 1,1× |
| T5 | 840 | 8,5 h | 10,9 h | 0,8× |
| T6 | 1.008 | 15,4 h | 24,0 h | 0,6× |

**A razão inverte ao longo do jogo, e isso é desenho, não acidente.**

No começo, se vestir custa mais que subir — o jogador novo passa mais tempo juntando material do que ganhando Fama, e é isso que ensina o loop de coleta e forja.

No fim, subir custa o dobro de vestir. O veterano tem material de sobra e o gargalo vira a Fama, ou seja, o tempo em combate. **É o que empurra o jogo de tier alto para o mercado:** comprar equipamento pronto passa a ser mais racional que coletar, e é aí que a economia entre jogadores nasce.

### Maestria de coleta e refino

| Nível | brutos necessários | retorno de refino | rendimento de coleta | horas |
|---|---|---|---|---|
| 0 | 571 | 15% | 0% | 3,9 h |
| 10 | 450 | 23% | +15% | 3,1 h |
| 20 | 357 | 31% | +30% | 2,5 h |
| 30 | 283 | 39% | +45% | 2,0 h |

**A maestria de coleta e refino corta o tempo de se vestir pela metade.** Parte do material volta ao refinar e cada nó rende mais — os dois se multiplicam. É o que torna o coletor e o refinador especializados prestadores de serviço com valor real, e o que dá sentido econômico a se dedicar a um ramo em vez de espalhar.

### Estado de zona

| Estado | horas para vestir T4 | relativo |
|---|---|---|
| abundante | 3,1 h | 67% |
| normal | 4,6 h | 100% |
| escassa | 7,6 h | 166% |

Uma zona abundante economiza uma hora e meia num conjunto T4. É o que dá peso real ao boletim público — não é enfeite informativo, é 33% do seu tempo.

### Tempo total para dominar a Era 1

Somando as duas curvas até o T6: cerca de **42 horas de Fama mais 15 de coleta**, e a coleta gera Fama junto, então há sobreposição. Estimativa realista: **de 50 a 60 horas de jogo ativo** para chegar ao topo do continente 1 numa linha de arma, com o conjunto completo.

A oito horas por semana, cerca de dois meses. É o arco de MVP.

---

## 11. Estações, durabilidade e prata

### As estações

Estações de produção com tier próprio: uma estação T4 produz até o T4. O dono cobra taxa, e a cidade dá bônus de produção que aumenta a taxa de retorno de material.

**Refino — cinco, uma por material:** Fundição (minério → barra), Curtume (couro → couro curtido), Tecelagem (fibra → pano), Serraria (madeira → tábua), Canteiro (pedra → bloco).

**Craft — quatro:** A Forja (Físico + placa), Posto de Caça (Projétil + couro), Terreiro (Mágico + pano), Ferramentaria.

O encaixe com o Albion é exato: lá cada oficina produz a arma **e** a armadura do arquétipo — placa na forja, couro no posto, pano na torre. **São as suas três árvores e as suas três linhas de armadura**, e as três bancadas do passo 12 do tutorial já são essas.

### Durabilidade

Perde por três vias: uso, morte e tentativa de fuga fracassada. **Ser derrubado é a via mais rápida**, como no Albion — lá cada queda tira 5% e vale também para o que está na mochila. Uso desgasta, só que devagar.

| Tier | uso | morte | fuga falha | total | até chegar a 50% |
|---|---|---|---|---|---|
| T2 | 4 | 2 | 6 | 12 | 4,0 h |
| T4 | 5 | 5 | 6 | 16 | 3,1 h |
| T6 | 4 | 5 | 7 | 17 | 3,0 h |

**Cerca de três horas de farm até a peça chegar a 50%.** É o ritmo certo: o jogador volta à cidade por causa da carga antes de voltar por causa do conserto, e o conserto vira rotina de fim de sessão em vez de interrupção.

**A perda por fuga fracassada é a maior das três.** Isso não foi planejado, e é bom: uma build sem escape paga o preço mesmo quando sobrevive. Fugir mal custa mais que morrer.

### Penalidade por durabilidade baixa

| Faixa | Efeito |
|---|---|
| 100% a 50% | nenhum |
| 49% a 25% | perde 100 de Poder de Item |
| 24% a 10% | perde 200 de Poder de Item |
| abaixo de 10% | o item não pode ser usado |

**Ferramentas de coleta são a exceção e não perdem poder.**

Isso faz a durabilidade importar mecanicamente, e não só como sumidouro de prata: o jogador que ignora o conserto vira, na prática, um tier abaixo. E dá função concreta à condição de parada por durabilidade da regras de combate — parar em 30% é parar antes da faixa vermelha.

### Prata

| Tier | ganha/hora | conserto | % do ganho | saldo |
|---|---|---|---|---|
| T2 | 4.579 | 1.249 | 27% | 3.331 |
| T3 | 12.939 | 4.264 | 33% | 8.674 |
| T4 | 31.289 | 11.591 | 37% | 19.698 |
| T5 | 84.020 | 22.921 | 27% | 61.099 |
| T6 | 202.873 | 75.990 | 37% | 126.883 |

**O conserto come cerca de um terço do ganho em todos os tiers**, e mantê-lo plano exige que a curva de conserto escale na mesma taxa da prata que os mobs soltam. Na primeira versão o conserto escalava mais rápido e no T6 consumia 94% do ganho — farm de tier alto deixava de pagar o próprio desgaste.

### Prata para se vestir, além do material

| Conjunto | refino | craft e taxa | total | horas de farm |
|---|---|---|---|---|
| T2 | 1.344 | 1.200 | 2.798 | 0,6 h |
| T3 | 6.048 | 4.500 | 11.603 | 0,9 h |
| T4 | 22.176 | 16.200 | 42.214 | 1,3 h |
| T5 | 75.936 | 57.000 | 146.230 | 1,7 h |
| T6 | 257.376 | 198.000 | 500.914 | 2,5 h |

Refino T1 é de graça, como no Albion.

**Vestir custa material e prata, e as duas contas correm em paralelo.** Um conjunto T4 exige 4,6 horas de coleta mais 1,3 hora de farm de prata. É isso que faz o jogador escolher entre juntar tudo sozinho ou vender material bruto e comprar pronto — e é de onde nasce a divisão entre coletor, refinador, crafter e combatente.

---

## 12. O que ainda não está balanceado

**Números de W e passivas.** Só Q e E entram no ciclo simulado. Cada W e cada passiva precisa do seu valor, e é aí que o balanceamento fica realmente trabalhoso.

---

## 13. O que a MVP precisa

Quase nada disto. A MVP vai do T1 ao T2 — a faixa de IP é minúscula e não existe decisão de build.

**Implemente o formato, chute os valores.** O que a MVP valida é o loop: coletar rende, forjar melhora, o melhor mata mais rápido. Balanceamento de verdade só faz sentido quando houver T4 e escolha real.

O que importa é que o formato esteja certo agora, para os números se moverem depois sem reescrever nada.

---

## 14. Como usar o simulador

```bash
python3 sim.py                      # usa balance.json
python3 sim.py outro-balance.json   # testa uma variação
```

Ele imprime cinco relatórios e uma seção de alertas que avisa quando uma âncora sai da faixa — tier rápido demais, mob arrastado, jogador que morre para o mob do próprio tier.

**O fluxo de trabalho:** mexer num número do JSON, rodar, ler os alertas. Segundos em vez de horas de teste em jogo.

Quando o servidor Go existir, ele deve carregar `balance.json` diretamente. Se o simulador e o servidor lerem arquivos diferentes, o simulador deixa de valer no dia seguinte.
