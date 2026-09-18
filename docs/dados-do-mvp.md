# Dados e sistemas do MVP

Inventário completo do que precisa existir para o MVP rodar, e o que é conteúdo da Era 1 e fica para depois.

**O MVP é a ilha da Travessia**: quatro zonas, T1 e T2, banda segura, no modelo do tutorial do Albion. Não é um recorte da Era 1 — é conteúdo próprio e desacoplado. Por isso não se chama mais PoC: dá para testar o loop inteiro nela.

**A ilha não pertence a era nenhuma.** É o meio do caminho, montado pela Raiz com pedaço de tudo. Ninguém é de lá, e não se volta a ela depois de atravessar.

---

## Os arquivos, em três escopos

### Compartilhado — vale para o jogo inteiro

| Arquivo           | Conteúdo                                                                                |
| ----------------- | --------------------------------------------------------------------------------------- |
| `continents.json` | os três continentes: Travessia, As Eras e O Emaranhado                                  |
| `materials.json`  | catálogo T1 a T6, brutos e refinados, a Essência, e **qual ferramenta cada tipo exige** |
| `combat.json`     | 3 árvores, pool de Q, W e passivas, e todas as armas                                    |
| `armor.json`      | 4 linhas (crua, pesada, média, leve), peças e bônus de conjunto                         |
| `transport.json`  | passivas de armadura, montarias e bolsas                                                |
| `destino.json`    | a Árvore do Destino: quatro ramos e os nós                                              |
| `balance.json`    | todas as constantes do jogo                                                             |
| `sim.py`          | simulador, lê `balance.json`                                                            |

**Sistema é compartilhado por definição.** Era nova nunca traz árvore de skill nova nem linha de armadura nova — traz armas, peças e conteúdo.

### MVP — a ilha da Travessia

| Arquivo             | Conteúdo                                               |
| ------------------- | ------------------------------------------------------ |
| `mvp_zones.json`    | 4 zonas, 4 conexões, 6 acampamentos, recursos por zona |
| `mvp_mobs.json`     | 6 mobs, um deles mini-chefe — só bestiário             |
| `mvp_npcs.json`     | 3 NPCs com diálogo                                     |
| `mvp_recipes.json`  | 8 coletas, 4 refinos, 24 crafts                        |
| `mvp_tutorial.json` | 18 passos, como máquina de estados                     |

### Era 1 — conteúdo posterior

| Arquivo               | Conteúdo                                          |
| --------------------- | ------------------------------------------------- |
| `era-1_zones.json`    | 22 zonas, 44 conexões, 5 regiões, 33 acampamentos |
| `era-1_mobs.json`     | 43 mobs — só bestiário                            |
| `era-1_npcs.json`     | 17 NPCs                                           |
| `era-1_factions.json` | 3 facções e 2 grupos independentes                |

---

## As quatro zonas

| Zona                  | Papel                                | Equivalente no Albion | Tier |
| --------------------- | ------------------------------------ | --------------------- | ---- |
| **A Beira**           | onde nasce, o Língua, o mini-chefe   | The Lighthouse        | T1   |
| **Porto de Passagem** | vila, mercado, estações, a Barqueira | The Cove              | T1   |
| **Mata Revirada**     | madeira e couro                      | The Forgotten Woods   | T2   |
| **Pedreira Torta**    | fibra e minério                      | Mountain Fort         | T2   |

A saída de A Beira é liberada pelo passo 8 do tutorial, que exige o mini-chefe — o gate é do tutorial, não da conexão. Toda a ilha é banda segura: sem PvP e sem perda.

---

## Materiais

### T1 — sem ferramenta

Seixo de praia, pau-mole e couro de capivara. **Essa exceção é o que dá partida ao sistema** — sem ela você precisaria de ferramenta para fazer ferramenta.

Couro de capivara é esfolado de qualquer bicho T1 morto, em qualquer zona.

### T2 — exigem ferramenta

| Material       | Ferramenta      | Onde           |
| -------------- | --------------- | -------------- |
| Pau-brasil     | machado         | Mata Revirada  |
| Couro de veado | faca de esfolar | Mata Revirada  |
| Algodão-bravo  | foice           | Pedreira Torta |
| Ferro-de-brejo | picareta        | Pedreira Torta |

### Refinados T2

Tábua de pau-brasil, couro curtido, pano de algodão e barra de ferro. **No T1 não há refino** — os brutos vão direto para o craft, e a cascata começa no T2.

---

## Itens

### Armas

| Item              | Tier | Árvore          | Craft                 |
| ----------------- | ---- | --------------- | --------------------- |
| Lâmina Crua       | T1   | Físico          | seixo + pau-mole      |
| Broquel Cru       | T1   | off-hand        | seixo                 |
| Espada de lado    | T2   | Físico          | barra + couro curtido |
| Zarabatana        | T2   | Projétil        | tábua                 |
| Cabaça de Boitatá | T2   | Mágico          | barra + tábua         |
| Rodela            | T2   | off-hand físico | barra + tábua         |
| Patuá             | T2   | off-hand mágico | pano + couro curtido  |

T1 é sucata sem tradição, e é onde o jogador aprende a forjar. **A tradição só aparece no T2**, e escolher a arma é a primeira decisão de identidade do jogo.

### Armaduras

**T1, linha crua:** Capuz, Colete e Botina. Craft com couro de capivara, uma habilidade cada, sem passiva.

**T2, três linhas:** pesada (morrião, couraça, grevas), média (cocar, escaupil, alpercatas) e leve (carapuça, manto de retalhos, sandálias). Duas ativas e uma passiva por peça, com bônus de conjunto.

### Ferramentas e transporte

Machado, picareta, foice e faca de esfolar, todas T1 de seixo mais pau-mole. Bolsa de couro T2, que **cai do mini-chefe**. Mula T2, **comprada no mercado**.

---

## A diferença deliberada em relação ao Albion

No tutorial do Albion várias peças são **entregues prontas**: o jogador nasce com jaqueta e sapatos, acha um capacete num baú, ganha o escudo e ganha duas das quatro ferramentas.

Aqui **o jogador coleta e fabrica tudo**: as três peças T1, as quatro ferramentas, a arma T2 e o conjunto T2 inteiro. Só a bolsa vem de drop e só a montaria é comprada.

Isso alonga o tutorial e é o ponto — o MVP existe para testar o loop de coletar, refinar e forjar, não para ser rápido.

---

## Os 18 passos

Acordar sem nada → pedra e pau → a primeira lâmina → primeiro combate → couro de bicho → vestido do jeito que dá → o broquel → o que não passou (mini-chefe, bolsa) → o Porto → a mula → quatro ferramentas → Mata Revirada → Pedreira Torta → refinar → a Árvore do Destino → a escolha da tradição → você é o que veste → a travessia.

Cada passo em `mvp_tutorial.json` tem gatilho de entrada, condição de conclusão, o que ensina, o que libera e o que dá de recompensa. **Está em dado e não em código** para poder ser ajustado sem recompilar.

---

## Cobertura de sistemas

| Sistema                               | Passo   |
| ------------------------------------- | ------- |
| Equipar e inventário                  | 3       |
| Combate, onda fechada e ataque básico | 4       |
| Slots, prioridade e energia           | 3, 16   |
| Coleta sem ferramenta                 | 2, 5    |
| Craft                                 | 3, 6, 7 |
| Slots de armadura                     | 6       |
| Off-hand                              | 7       |
| Mini-chefe e recompensa               | 8       |
| Mercado e armazém                     | 9, 10   |
| Montaria e carga                      | 10      |
| Ferramenta destrava recurso           | 11      |
| Tier de recurso e viagem              | 12, 13  |
| Refino e cascata                      | 14      |
| Árvore do Destino, quatro ramos       | 15      |
| Escolha de tradição e de habilidade   | 16      |
| Conjunto completo e bônus             | 17      |

---

## Fora do MVP

PvP, perda de item, durabilidade relevante, T3 em diante, artefatos, encantamento e Essência, qualidade, reputação e facções, teleporte, montaria rápida e lenta, estado de zona, migração de mob, economia entre jogadores, e o mundo da Era 1.

---

## Contagem

| Categoria                | Quantidade          |
| ------------------------ | ------------------- |
| Zonas                    | 4                   |
| Acampamentos             | 6                   |
| Materiais em uso         | 11                  |
| Armas e off-hands        | 7                   |
| Peças de armadura        | 12                  |
| Ferramentas e transporte | 6                   |
| Mobs                     | 6, com 1 mini-chefe |
| NPCs com diálogo         | 3                   |
| Receitas                 | 36                  |
| Passos do tutorial       | 18                  |
| Modelos 3D               | cerca de 32         |

---

## Faseamento

| Escopo       | Conteúdo                          |
| ------------ | --------------------------------- |
| **MVP**      | ilha da Travessia, 4 zonas, T1–T2 |
| Era 1        | 22 zonas, T1–T6, três facções     |
| Continente 1 | 4 eras, 60 a 100 zonas            |
| Completo     | mais o Emaranhado, T6–T8          |


---

## Esquema dos dados

**MVP e Era 1 usam exatamente o mesmo esquema.** A única diferença é o conteúdo.

**Chaves em inglês, valores em português.** Antes havia mistura — `name` e `nome`, `description` e `descricao` no mesmo conjunto.

**Ferramenta mora no material**, não no nó de zona. A zona diz que tem pau-brasil; o catálogo diz que pau-brasil exige machado. Um lugar só.

**Acampamento mora no mapa.** A zona lista os acampamentos que tem, e cada acampamento diz quais mobs e em que tamanho. O arquivo de mobs virou bestiário puro: define o mob uma vez, e o mapa decide onde ele aparece e em que grupo. Antes a relação era bidirecional e redundante.

**Conexão não trava sozinha.** O `requerBossId` saiu: o que libera cada caminho é um passo do tutorial, e no futuro será missão. Gate é um sistema só, e não um campo que aparece numa conexão de um mapa e em nenhuma outra.

### Estrutura de pastas no repositório

```
data/
  shared/   continents.json materials.json combat.json armor.json
            transport.json destino.json balance.json
  mvp/      zones.json mobs.json npcs.json recipes.json tutorial.json
  era-1/    zones.json mobs.json npcs.json factions.json
```

**Pasta por escopo, não por domínio.** Adicionar a Era 2 é criar uma pasta e copiar a forma; carregar é ler `shared/` mais um pacote de conteúdo. O escopo vira o diretório, e o campo `scope` dentro do arquivo fica só como conferência.

Nos arquivos do Projeto do Claude os nomes são achatados — `mvp_zones.json` em vez de `mvp/zones.json` — porque lá não há pasta.


---

## Loadout no MVP

**Seis slots ativos e quatro passivos**, mesmo com poucas habilidades. É a alma do combate e por isso entra desde o MVP.

| Momento               | O que o jogador tem                   |
| --------------------- | ------------------------------------- |
| Passo 3, Lâmina Crua  | 1 slot: Ataque, entre dois Q          |
| Passo 6, armadura T1  | 4 slots: Ataque, Cabeça, Torso, Botas |
| Passo 16, arma T2     | 6 slots: mais Utilidade e Especial    |
| Passo 17, conjunto T2 | os 6 ativos mais os 4 passivos        |

**Com poucas habilidades a prioridade já decide.** Uma arma rápida com Q barato no topo bate muitas vezes fraco; uma lenta guardando energia para o Especial bate poucas vezes forte. Isso existe desde o passo 3, com dois Q e uma arma só.

O tutorial ensina o sistema em três momentos: escolher a habilidade do slot (passo 3), ordenar a prioridade (passo 16) e fechar as passivas (passo 17).
