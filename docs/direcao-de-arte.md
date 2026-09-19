# Manual de Direção de Arte — Eras do Brasil

Documento autossuficiente. Serve para produzir assets e para gerar as pranchas de referência.

Substitui os documentos de Design Visual anteriores.

---

## 0. Decisões de base

| Decisão | Escolha | Motivo |
|---|---|---|
| Estilo | **3D low poly estilizado** | equipamento modular custa uma peça, não uma peça por direção por pose |
| Engine | **Godot** | cliente fino com backend Go autoritativo; cena pequena; já está no pipeline |
| Plataforma | **web primeiro**, depois desktop e mobile | migrar de web para desktop é mais fácil que o contrário; web impõe o orçamento desde o começo |
| Câmera | isométrica fixa, 3/4 | mesma leitura do plano original, sem custo de arte por direção |
| Ferramenta | **Blender** para modelo e animação | gratuito, exporta glTF direto para Godot |

### Por que 3D e não 2D chibi

O jogo tem **nove peças de armadura × três linhas × seis tiers** só na Era 1, mais armas e off-hands, e a premissa é que tudo apareça no personagem.

Em 2D, o custo de uma peça é *peça × direções × poses*: um capacete não é um desenho, são quatro, e mais variantes para os quadros em que a cabeça inclina. Em 3D, o custo de uma peça é **uma peça** — modelada uma vez, plugada no osso, funciona em toda direção, toda animação e toda era.

A diferença não é de porcentagem. É de ordem de grandeza, e cresce a cada era.

**O custo honesto do 3D não é modelar, é rigging.** Mitigação: um esqueleto humano só, compartilhado por jogador, colono, capanga, feitor, vaqueiro e contrabandista. Paga-se uma vez. Fauna e Encantados precisam dos seus, mas são menos e mais simples.

### Orçamento técnico

Apertado de propósito, e agora **obrigatório**: web-first significa que o orçamento não é folga, é requisito. Tamanho de build, tempo de carregamento e limitação de threading são o teto real.

| Item | Orçamento |
|---|---|
| Personagem completo com equipamento | até 3.000 tris |
| Peça de equipamento | 150 a 500 tris |
| Mob de fauna | 800 a 1.500 tris |
| Chefe | até 4.000 tris |
| Prop de cenário | 50 a 300 tris |
| Textura | atlas de paleta 256×256, uma por família |
| Material | sem PBR, sem normal map, sem metal/rough |

**Cor vem de atlas de paleta, não de textura pintada.** Um único atlas de 256×256 com faixas de cor atende dezenas de modelos, o que reduz draw call e mantém consistência sozinho.

**Antes de modelar cem assets:** faça um personagem, uma arma e uma arena e exporte para web. Um dia de trabalho, e você descobre o teto real de polígono e de tamanho de build antes de estar no formato errado.

---

## 1. Fórmula visual

> **3D LOW POLY + SILHUETA FORTE + CORES CHAPADAS DE PALETA + SOMBRA SIMPLES + EQUIPAMENTO VISÍVEL + ANIMAÇÃO CURTA + CENÁRIO MODULAR + BRASIL COLONIAL**

Em inglês, para ferramentas de geração: *stylized low poly 3D game art, flat palette colors, chunky readable silhouettes, isometric 3/4 camera, soft ambient light, colonial Brazil setting*.

### Princípios

- Estilizado, nunca realista. Forma antes de detalhe.
- **Silhueta vem antes de tudo.** É o que sobra quando o modelo tem 300 tris.
- Paleta limitada por família e por região.
- Sem textura pintada; cor por face e por atlas.
- Personagem e equipamento mais limpos que o cenário.
- Cenário feito de poucas peças reutilizadas muitas vezes.
- Animação curta e legível: o jogo é idle, mas o mundo não parece parado.
- Proporção levemente estilizada — cabeça um pouco maior, membros simplificados. Não é chibi extremo, mas também não é realista.

### Regra de ouro

> **Deve ser simples de modelar, fácil de animar e difícil de confundir com outro jogo.**

A complexidade vem da combinação de personagem, equipamento, zona e interface — nunca de cada asset isolado.

**A armadilha do low poly comprado:** parecer com todo jogo que usou o mesmo pacote. O antídoto é a paleta e o conteúdo — urucum, jenipapo, escaupil, cocar, Curupira. Nenhum pacote tem isso.

---

## 2. O jogo, em três frases

MMORPG idle de Brasil colonial. Não há classe: **você é o que veste**, e o equipamento tem que aparecer no modelo.

O jogador não controla movimento. Ele escolhe uma ação na zona e **observa** o personagem executá-la: anda até o nó e entra em loop de coleta, vai para a arena e luta, ou parte em viagem.

A primeira era é **1500 a 1654**, no Nordeste e na Amazônia. Três forças em conflito — a Coroa portuguesa, os povos indígenas e os Encantados do mato. O jogador não é nenhuma das três.

---

## 3. Escala e unidades

**1 unidade do Godot = 1 metro.** O personagem define a escala de tudo.

| Elemento | Altura |
|---|---|
| Personagem base | 1,8 u |
| Fauna pequena (caranguejo, rato) | 0,4 a 0,8 u |
| Fauna média (capivara, porco-do-mato) | 1,0 u |
| Fauna grande (boi, sucuri estendida) | 1,8 a 3,0 u |
| Encantado comum | 1,6 a 2,2 u |
| Chefe | 2,5 a 4,0 u |
| Tile de chão | 2 × 2 u |
| Árvore pequena | 4 u |
| Castanheira | 12 u |
| Oca | 4 × 6 u |
| Casa de engenho | 8 × 12 u |

**Tudo alinhado à grade de 0,5 u.** Props e construções encaixam na grade de 2 u do tile.

### Ícones de interface

Continuam 2D, renderizados do modelo 3D em câmera ortográfica fixa e exportados como PNG. Tamanhos: 24, 32, 48 e 64 px.

**Renderizar o ícone do próprio modelo é o maior ganho de produção da mudança para 3D.** Nunca desenhe um ícone à mão: monte a cena, aponte a câmera, exporte em lote.

---

## 4. Personagem

### Proporção

Cerca de 6 cabeças, com cabeça e mãos levemente aumentadas para leitura à distância. Membros simplificados, sem musculatura definida, rosto com poucos volumes.

O rosto quase não aparece na câmera isométrica — **não gaste polígono nele.** Gaste em ombro, cabeça e arma, que são o que a silhueta mostra.

### Prioridade de leitura

**Silhueta → cor → equipamento → detalhe.** O personagem precisa ser reconhecível a três metros da câmera, em movimento.

### O forasteiro

O jogador começa **sem nada**: roupa crua, mãos vazias, nenhuma marca de facção. A identidade é construída peça por peça, e a primeira arma T2 é o primeiro momento em que ele parece de algum lugar.

Curva visual do tutorial: **descartável → equipado → competente → alinhado.**

### Esqueleto

Um esqueleto humano único para todo personagem humanoide do jogo. Ossos essenciais apenas:

```
raiz
  quadril
    coluna → peito → pescoço → cabeça
      ombro.E → braço.E → antebraço.E → mão.E   ← socket arma
      ombro.D → braço.D → antebraço.D → mão.D   ← socket off-hand
    coxa.E → canela.E → pé.E
    coxa.D → canela.D → pé.D
```

### Sockets de equipamento

Substituem os anchors do plano 2D. Mesma função, custo muito menor.

| Socket | Osso | Recebe |
|---|---|---|
| `socket_mao_principal` | mão esquerda | arma |
| `socket_mao_secundaria` | mão direita | off-hand, escudo, tocha, patuá |
| `socket_cabeca` | cabeça | capacete, cocar, carapuça |
| `socket_torso` | peito | armadura de torso, manto |
| `socket_pes` | pé E e D | botas, alpercatas, sandálias |
| `socket_costas` | peito | mochila, bolsa, estandarte |

**Toda peça é modelada na origem, na orientação do socket.** Se o pivô estiver certo, a troca é instantânea e nunca precisa de ajuste manual.

Peças de torso e botas podem ser *skinned* ao mesmo esqueleto em vez de plugadas, quando precisarem deformar com o corpo. Capacete, arma e off-hand são sempre plugados.

---

## 5. Equipamento

Equipamento é identidade visual, não número de atributo. O loadout aparece sempre.

### Regras

- Cada peça com silhueta própria, reconhecível sozinha na tela de inventário.
- Uma forma básica que possa ser variada muitas vezes.
- **Evolução de tier muda proporção, material e acabamento — nunca exige modelo do zero.**
- Arma recebe mais polígono que acessório pequeno.
- Toda peça usa o socket padrão; pivô na origem, orientação fixa.

### Leitura por tier

| Tier | Leitura |
|---|---|
| T1 | sucata: forma tosca, material cru, sem acabamento |
| T2 | primeira forja: forma limpa, material honesto, tradição reconhecível |
| T3 | trabalhado: mais volume, marca de oficina |
| T4–T6 | especializado: silhueta própria da facção, acento de cor exclusivo |

### As nove armas da Era 1

| Arma | Árvore | Mãos | Tradição | Entra | Leitura visual |
|---|---|---|---|---|---|
| Espada de lado | Físico | uma mão | colonizador | T2 | lâmina reta curta, guarda em cruz simples, punho de madeira escura |
| Tacape | Físico | duas mãos | indigena | T3 | bloco de madeira densa, seção achatada, gravação geométrica na face |
| Zarabatana | Projétil | duas mãos | indigena | T2 | tubo longo e fino, quase sem volume — a silhueta é uma linha |
| Besta de mão | Projétil | uma mão | colonizador | T3 | arco horizontal curto, corpo de madeira, mecanismo visível |
| Cabaça de Boitatá | Mágico | uma mão | folclorico | T2 | cabaça seca com furos; brasa visível por dentro |
| Maracá | Mágico | uma mão | folclorico | T3 | cabaça menor em haste, franja de fibra, sementes |
| Rodela | Físico | off-hand | colonizador | T3 | broquel redondo pequeno, umbo central, borda de ferro |
| Tocha de breu | Projétil | off-hand | colonizador | T3 | cabo de madeira, breu enrolado no topo, chama baixa |
| Patuá | Mágico | off-hand | folclorico | T3 | bolsinha de couro costurada, cordão, medalha presa |

**As três do T2 — espada de lado, zarabatana e cabaça de Boitatá — são as primeiras armas do jogo** e aparecem no tutorial. São as três primeiras a modelar.

### As nove peças de armadura

| Peça | Linha | Slot | Tradição | Leitura visual |
|---|---|---|---|---|
| Morrião | Pesada | Cabeça | colonizador | capacete de aba curva erguida nas pontas, ferro batido |
| Couraça | Pesada | Torso | colonizador | peitoral de ferro sobre gibão de couro, rebites visíveis |
| Grevas | Pesada | Botas | colonizador | bota alta de couro grosso com reforço de ferro na canela |
| Cocar | Média | Cabeça | indigena | faixa na testa com penas verticais curtas; não é cocar cerimonial grande |
| Escaupil | Média | Torso | indigena | colete acolchoado de algodão, costura em linhas horizontais marcadas |
| Alpercatas | Média | Botas | indigena | sandália de couro cru com tiras cruzadas até o tornozelo |
| Carapuça | Leve | Cabeça | folclorico | capuz de pano solto, borda desfiada, sombra sobre o rosto |
| Manto de Retalhos | Leve | Torso | folclorico | manto de retalhos costurados em tons diferentes, caimento solto |
| Sandálias de Piaçava | Leve | Botas | folclorico | solado de fibra trançada, amarração simples |

**O escaupil é peça histórica real** — armadura acolchoada de algodão usada no Brasil colonial pelos dois lados do conflito. Modele como colete grosso costurado, nunca como couro batido.

### Montarias e bolsas

| Item | Leitura visual |
|---|---|
| Cavalo de sela | sela portuguesa, arreio simples, porte leve |
| Mula | carga lateral em dois fardos, passo curto |
| Boi de carga | carro de boi ou cangalha, volume grande, lento |
| Bolsa de couro | bolsa simples de tiracolo |
| Cesto de cipó | cesto trançado alto, carregado nas costas |
| Surrão de sal | saco de couro grosso, boca amarrada |

### Raridade

Cinco níveis, comunicados por **borda e brilho no ícone e por acento de cor no modelo** — nunca por modelo novo. Comum (cinza), incomum (verde), raro (azul), épico (roxo), lendário (dourado).

### Contagem de assets da Era 1

| Categoria | Quantidade |
|---|---|
| Armas e off-hands | 9 |
| Peças de armadura | 9 |
| Montarias e bolsas | 6 |
| Ferramentas | 2 |
| **Total de equipamento** | **26 modelos** |

Era nova custa 18 modelos: seis armas, três off-hands e nove peças de armadura. Sem esqueleto novo, sem animação nova.

---

## 6. Paleta

### Base do mundo

Terrosos, madeira, palha, dourado envelhecido, verdes profundos, azuis dessaturados e roxos espirituais. **Mundo rústico e vivo — não é um mundo sujo nem arruinado.**

### Por facção

| Facção | Cores | Materiais |
|---|---|---|
| A Coroa | ferro, madeira escura, linho cru, vermelho-tijolo, dourado envelhecido | metal, couro curtido, tecido pesado |
| Os Potiguara e aliados | urucum (vermelho-laranja), jenipapo (azul quase preto), palha, penas, couro claro | fibra, madeira, osso, pena |
| Os Encantados | verde profundo, azul místico, roxo espiritual, amarelo-esverdeado de fogo-fátuo | folha, barro, fumaça, brasa |

Urucum e jenipapo são as duas tintas corporais reais dos povos tupis. São a marca cromática mais forte e mais específica que o jogo tem — use com parcimônia para que não se gaste.

### Por região da Era 1

| Região | Paleta |
|---|---|
| Costa do Pau-Brasil | areia clara, verde-mata, azul-mar, e o vermelho da madeira cortada |
| Mata dos Engenhos | verde denso, terra vermelha, cana verde-clara, fuligem de fornalha |
| Sertão de Dentro | branco-acinzentado, ocre, verde-seco, céu lavado |
| Rio das Almas | água escura, várzea verde-clara, madeira molhada |
| Mata Sem Fim | verde quase preto, luz filtrada em feixe, marrom de castanha |

**A luz muda de região para região.** Costa é luz dura e aberta; Mata Sem Fim é penumbra com feixe vertical. É o recurso mais barato de diferenciação que existe.

### Regra prática

Objeto comum: **2 a 3 cores**. Personagem: **3 a 6 cores principais**. Todas vindas do atlas de paleta — nada de cor solta nem gradiente.

### Acentos

Reservados para seleção, progresso, alerta, raridade e recompensa. Nunca decorativos.

### Leitura de recompensa

Recurso, prata e Fama precisam de tratamento visual distinto e consistente, de modo que o jogador saiba o que ganhou sem ler o texto.

---

## 7. Mobs, NPCs e criaturas

### Regras gerais

- Silhueta diferente da do jogador.
- Formas simples, poucas cores do atlas.
- **Um elemento marcante por tipo**, visível na silhueta.
- Variações por tier partem do mesmo modelo, com troca de material e acessório.

### As quatro famílias

**Fauna** — bicho real do Brasil. É o que o jogador mais mata, e por isso precisa ser o mais barato. Nenhum elemento sobrenatural.

**Gente** — mesmo esqueleto e mesmas animações do jogador, com roupa e ferramenta de trabalho. **A reutilização aqui é total e é o maior ganho de produção do projeto.**

**Encantados** — formas que não fecham direito: contorno que não se resolve, membro a mais, luz vindo de dentro. **Nunca como monstro de fantasia europeia.**

**Chefes** — silhueta única, um elemento inconfundível, e um acento de cor que nenhum outro mob usa.

### Elenco da Era 1

**Fauna** — 27 modelos

Caranguejo-uçá grande, Bando de atobás, Lama viva, Cria de Ipupiara, Capivara brava, Cão assilvestrado, Macacos-prego, Jacaré-do-papo-amarelo, Garça de sal, Rato-do-canavial, Queixada, Sombra de mata, Teiú de brasa, Fogo-fátuo, Matilha de caça, Bode branco, Cascavel, Espírito de pedra, Morcego-vampiro, Boi bravo, Calango de lajedo, Espírito rachado, Sucuri, Cardume de piranha, Canoa vazia, Bando de guariba, Sombra de igarapé.

**Gente** — 8 modelos

Todos sobre o esqueleto e as animações do jogador: Cortador clandestino, Capanga do canavial, Capanga de espingarda, Feitor, Capitão do mato, Vaqueiro perdido, Remador afogado, Mensageiro de Jurupari.

**Elites** — 2 modelos

Sucuri anciã, Castanheira velha.

**Chefes** — 6 modelos

| Chefe | Elemento marcante |
|---|---|
| Curupira | pés virados para trás e cabelo vermelho. A silhueta inteira se resolve pelos pés |
| Boitatá | corpo é uma linha de brasa; só a cabeça é sólida |
| Mula sem cabeça | fogo no lugar do pescoço; o resto é cavalo comum |
| Ipupiara | braços compridos demais para o corpo, sem rosto legível |
| Anhangá | silhueta de caça com a cor errada |
| O que fica na borda | não é de nenhuma era; formas que não combinam entre si |

**Os cinco Encantados nomeados estão documentados no século XVI**, por Anchieta e por Gandavo. Não invente aparência genérica para eles.

### NPCs

Função comunicada por elemento no modelo e por indicador flutuante: bolsa e balança para comércio, martelo para forja, ferramenta para produção, exclamação para missão.

**O Língua**, NPC do tutorial, precisa de um detalhe que sinalize que ele não pertence a nenhum dos três lados: roupa portuguesa gasta com adereço indígena, ou o contrário.

---

## 8. Cenário

A regra continua: **parecer cheio sem modelar muito.**

### Composição mínima de uma zona

Duas ou três pedras, uma ou duas madeiras, uma caixa ou barril, **um elemento exclusivo da zona**, e chão. O elemento exclusivo é o que faz a zona ser ela mesma; todo o resto se reaproveita.

### Terreno

Tile de 2 × 2 u, alinhado à grade. Variação por material do atlas, não por modelo novo. Peças de borda e de desnível para relevo.

### Elemento exclusivo por região

| Região | O que só existe ali |
|---|---|
| Costa do Pau-Brasil | tora de pau-brasil cortada, vermelha por dentro |
| Mata dos Engenhos | moenda de cana e a fornalha do engenho |
| Sertão de Dentro | mandacaru e a cabeça de gado seca |
| Rio das Almas | canoa de casco escavado |
| Mata Sem Fim | castanheira de tronco largo demais para o quadro |

### Os três terrenos da zona

O jogador nunca controla movimento, mas a zona tem três espaços, e cada um é uma cena:

| Terreno | Contém |
|---|---|
| **Terreno da zona** | nós de recurso, acampamentos de mob, saídas para zonas vizinhas |
| **Arena de combate** | espaço menor onde a onda nasce inteira e a luta acontece; a próxima onda só nasce quando a anterior morre |
| **Transição de viagem** | plano simples de estrada; serve de tela de carregamento |

Coletar leva o personagem até o nó e entra em loop. Lutar carrega a arena. Viajar toca a transição.

**A arena pode ser uma só por região**, com troca de material e props. Não precisa de arena por zona.

### Construções da Era 1

Feitoria de taipa com cobertura de palha, casa de engenho, senzala, oca, mocambo de pau a pique, capela pequena. **Nada de arquitetura medieval europeia** — sem torre de pedra, sem muralha, sem telhado pontudo com bandeirola.

### Luz

Uma luz direcional e uma ambiente. Sem sombra dinâmica complexa; sombra de contato simples embaixo do personagem.

**A luz é o recurso mais barato de diferenciar região.** Costa é luz dura e aberta; Mata Sem Fim é penumbra com feixe vertical.

---

## 9. Animação

**Câmera isométrica fixa e animação no esqueleto.** Some o custo por direção: o personagem gira, e a mesma animação vale para qualquer ângulo.

### Conjunto mínimo, no esqueleto humano

| Animação | Duração | Nota |
|---|---|---|
| Parado | 2 s, loop | respiração e pequeno ajuste de peso |
| Andar | 1 s, loop | usado para ir até o nó e para a transição |
| Coletar | 1,5 s, loop | corte, escavação e colheita podem ser a mesma base |
| Atacar leve | 0,6 s | Q |
| Atacar forte | 1,0 s | E |
| Receber dano | 0,3 s | |
| Morrer | 1,2 s | |
| Forjar | 1,5 s, loop | |

Oito animações cobrem todo humano do jogo — jogador e mobs de gente.

### Fauna e Encantados

Parado, andar, atacar, receber dano e morrer. Cinco por esqueleto. Fauna quadrúpede compartilha um esqueleto; fauna rastejante outro; ave outro.

### Movimento observável

O personagem faz pequenos deslocamentos em loop: **anda alguns passos → para → executa a ação → repete.** O objetivo é um mundo observável, não uma cena parada.

---

## 10. Efeitos

Complementam a leitura, nunca encobrem o personagem. Impacto simples, faísca pequena, brilho curto, número de dano flutuante, barra de progresso.

Partícula com sprite chapado e poucas cores do atlas. **Sem neon, sem bloom pesado, sem partícula em excesso.**

**Por facção:** aço e faísca para a Coroa, folha e poeira para os povos indígenas, brasa e fumaça esverdeada para os Encantados.

---

## 11. Interface

A UI é **2D sobre a cena 3D**, e é construída como **blocos independentes**, não como uma tela única.

Essa é a decisão que permite mobile depois sem redesenhar: no desktop os blocos aparecem lado a lado; no telefone viram abas ou gaveta. É estrutura de UI, não arte, e tomá-la agora economiza uma reescrita.

### Os blocos

| Bloco | Conteúdo |
|---|---|
| Topo | Fama, prata, zona, menu |
| Personagem | retrato, vida, atributos |
| Equipamento | sete slots |
| Cena | a janela 3D — sempre o maior elemento |
| Ação | ação atual, progresso, cancelar |
| Ações da zona | coletar, lutar, viajar |
| Inventário | itens, peso, capacidade |
| Eventos | log |

### Regra de leitura

**Personagem → ação → zona → consequência → informação secundária.**

A cena 3D é observacional. **Nada competitivamente relevante pode existir só na imagem** — tudo importante vive também num bloco.

### Estados da cena

Parado, coletando, lutando, forjando, viajando. **Não criar telas independentes** para combate, coleta ou viagem: são estados da mesma tela, com troca de terreno.

### Linguagem visual

Retângulo arredondado, contorno escuro, fundo escuro, ícone simples, título curto, número destacado. Botão com três estados. **Sem UI dourada e ornamental.**

---

## 12. Tipografia

Sem serifa, grossa, legível, formas arredondadas, alto contraste. Títulos e valores em tamanho grande. **Suporte completo a português: acento, til e cedilha são obrigatórios.**

Texto diegético curto, oral e concreto. Sem jargão de interface dentro do mundo.

---

## 13. Produção

### Ferramentas

**Blender** para modelo, rig e animação. **Godot** para implementação. **Git** para versionamento. Krita permanece só para ícone de interface e textura de atlas.

### Formato

**glTF (.glb)** para tudo que vai ao jogo. Blender exporta nativo e Godot importa nativo. Arquivo `.blend` fica em `source/`, nunca em `exports/`.

### Estrutura de pastas

```
art/
  source/     characters/ equipment/ environment/ creatures/ ui/
  exports/    characters/ equipment/ environment/ creatures/ ui/
  palettes/   atlas de cor
  references/
```

### Nomenclatura

Inglês, minúsculas, underscore, sufixo numérico quando houver variação.

```
char_player_base.glb
char_skeleton_human.blend
equip_weapon_sword_t2.glb
equip_armor_chest_plate_t2.glb
creature_curupira.glb
env_tree_brazilwood_01.glb
anim_human_gather.glb
ui_icon_ore_t4.png
```

### Checklist antes de considerar pronto

- Dentro do orçamento de tris?
- Pivô na origem e orientação correta do socket?
- Usa o atlas de paleta, sem cor solta?
- Escala certa em relação ao personagem?
- Nome de arquivo correto?
- Exportado em .glb?
- Testado no Godot, na câmera do jogo?
- Silhueta legível a três metros?
- Reutilizável ou variável sem remodelar?

---

## 14. O que evitar

Realismo. PBR, normal map, metal e roughness. Textura pintada à mão por modelo. Iluminação cinematográfica. Sombra dinâmica pesada. Partícula em excesso. Neon. Rosto detalhado. **Fantasia medieval europeia.** Arquitetura de castelo. Elfo, anão, orc, goblin. UI dourada e luxuosa.

**A armadilha mais provável:** modelar Brasil colonial e acabar com fantasia medieval genérica, porque é o que a mão e as ferramentas de geração já sabem fazer. **Toda prancha e todo asset precisa ser conferido contra isso.**

**A segunda armadilha:** low poly comprado pronto que faz o jogo parecer com todos os outros que usaram o mesmo pacote. Base humana e prop genérico podem ser comprados; **arma, armadura, Encantado e construção são o que te diferencia e têm que ser seus.**

---

## 15. Briefs das pranchas

Doze pranchas. Cada brief é autossuficiente e pode ser usado direto numa ferramenta de geração de imagem.

**Cabeçalho comum:** logo "Eras do Brasil" no canto superior esquerdo, título do guia ao lado, fundo azul-escuro de documento técnico, painéis com contorno claro, texto em português, estilo de infográfico de game design. **Os exemplos visuais devem ser renders low poly 3D, não desenhos 2D.**

### Prancha 01 — Guia do Personagem
Personagem base low poly em três vistas, wireframe ao lado do render mostrando o orçamento de polígono, proporção de cerca de 6 cabeças, exemplos com equipamento das três tradições (colonial, indígena, encantado), variações de pele e cabelo, câmera isométrica do jogo, estados do personagem.

### Prancha 02 — Guia de Escala e Orçamento
Personagem de 1,8 u com grade de 0,5 u, proporção entre personagem, fauna pequena, fauna média, Encantado, chefe, árvore e construção. Tabela de orçamento de tris por categoria. Tile de 2 × 2 u. Tamanhos de ícone. Configuração de exportação glTF e checklist.

### Prancha 03 — Guia de Esqueleto e Sockets
Esqueleto humano único com os ossos nomeados, os seis sockets de equipamento destacados em cores, exemplo de peça modelada na origem, montagem modular de personagem equipado, diferença entre peça plugada e peça com skin, convenção de pivô e orientação.

### Prancha 04 — Guia de Cenário e Terrenos
Grade de 2 u, tiles de terreno das cinco regiões, peças de borda e desnível, props reutilizáveis (pedra, tora de pau-brasil, tronco, arbusto, mandacaru), construções coloniais em low poly, os três terrenos (zona, arena, transição), exemplo de composição, luz por região.

### Prancha 05 — Guia de Equipamento e Modularização
Sete slots no personagem, as nove armas da Era 1 em render, as nove peças de armadura, montagem por socket, variação por tier do T1 ao T6 numa mesma peça, raridade por acento de cor e borda de ícone, inventário e comparação.

### Prancha 06 — Guia de Armas da Era 1
Prancha específica. As nove armas em render isolado e na mão do personagem: espada de lado, tacape, zarabatana, besta de mão, cabaça de Boitatá, maracá, rodela, tocha de breu, patuá. Tradição de cada uma, silhueta em contraluz, e a evolução visual T2 a T6 de uma delas.

### Prancha 07 — Guia de Armaduras da Era 1
Prancha específica. As três linhas completas: morrião, couraça e grevas (pesada colonial); cocar, escaupil e alpercatas (média indígena); carapuça, manto de retalhos e sandálias de piaçava (leve encantada). Conjunto montado no personagem, bônus de conjunto, e nota sobre o escaupil ser peça histórica real.

### Prancha 08 — Guia de Fauna e Gente
Fauna do Brasil em low poly com os esqueletos compartilhados (quadrúpede, rastejante, ave), escala comparada, e os oito mobs humanos mostrando que todos usam o mesmo esqueleto e as mesmas animações do jogador, mudando só roupa e ferramenta.

### Prancha 09 — Guia dos Encantados
Os cinco Encantados documentados no século XVI — Curupira, Boitatá, Ipupiara, Anhangá e Jurupari — com o elemento marcante de cada um, estudo de silhueta em preto, paleta espiritual, a regra de "formas que não fecham direito", e a proibição explícita de modelar como monstro de fantasia europeia.

### Prancha 10 — Guia de Animação
Câmera isométrica fixa e por que não há custo por direção. As oito animações do esqueleto humano com quadros-chave, as cinco de fauna, ciclo de movimento observável (anda, para, executa, repete), duração de cada uma, e a regra de reutilização entre jogador e mobs humanos.

### Prancha 11 — Guia de UI e Blocos
Os oito blocos independentes, arranjo em desktop lado a lado e em mobile como abas, HUD em exploração, HUD em combate, tela de zona com ações, inventário, equipamento com os sete slots, mapa, A Árvore do Destino com os quatro ramos, crafting, e a regra de que nada relevante existe só na cena 3D.

### Prancha 12 — Guia de Produção
Fluxo do conceito ao asset final em Blender e Godot, estrutura de pastas, nomenclatura, atlas de paleta, exportação glTF, controle de versão, checklist de qualidade, erros comuns, e a regra de o que comprar contra o que modelar.

---

## 16. Ordem de produção

Não modele tudo. Comece por um conjunto mínimo que exercite todas as regras:

1. **Esqueleto humano e personagem base**, sem equipamento, com parado e andar.
2. **Atlas de paleta** com as cores das três facções e das cinco regiões.
3. **As três armas do T2**: espada de lado, zarabatana, cabaça de Boitatá.
4. **Um conjunto de armadura T2 completo**, de uma linha só.
5. **Kit da ilha da Travessia**: chão de praia, duas pedras, palmeira, tora, barril.
6. **Dois mobs**: um caranguejo-uçá e um cortador clandestino — que usa o esqueleto do jogador.
7. **O Língua.**
8. **Ícones dos cinco recursos**, renderizados dos modelos.

Com isso a MVP inteira fica jogável, e você já exercitou escala, socket, atlas, silhueta, animação e exportação. **Tudo depois disso é repetição do mesmo método.**

> **Modele como se tivesse que modelar a mesma peça cem vezes.**
