# Manual de Direção de Arte — Eras do Brasil

Documento de referência para produção visual do jogo e para criação das pranchas de referência.

Este documento descreve **regras visuais e de produção atuais**. Catálogos de conteúdo, listas de itens, criaturas, zonas e valores pertencem aos documentos de design e dados correspondentes.

---

## 1. Decisões de base

| Decisão    | Escolha                                   |
| ---------- | ----------------------------------------- |
| Estilo     | **3D low poly estilizado**                |
| Engine     | **Godot**                                 |
| Plataforma | **web primeiro**, depois desktop e mobile |
| Câmera     | isométrica fixa, 3/4                      |
| Ferramenta | **Blender** para modelo e animação        |

### Direção geral

O 3D deve favorecer a reutilização de personagens, equipamentos, criaturas e cenários.

O objetivo não é produzir assets altamente detalhados. O objetivo é criar um conjunto modular em que:

- o equipamento seja visível no personagem;
- as silhuetas sejam reconhecíveis;
- os assets possam ser reutilizados e combinados;
- o mesmo esqueleto e as mesmas animações possam atender vários personagens quando apropriado;
- a produção consiga crescer sem exigir um modelo completamente novo para cada variação.

### Orçamento técnico

O orçamento visual deve ser definido desde o início porque o projeto é **web-first**.

Os valores abaixo são referências de produção atuais:

| Item                                | Orçamento                                |
| ----------------------------------- | ---------------------------------------- |
| Personagem completo com equipamento | até 3.000 tris                           |
| Peça de equipamento                 | 150 a 500 tris                           |
| Mob de fauna                        | 800 a 1.500 tris                         |
| Chefe                               | até 4.000 tris                           |
| Prop de cenário                     | 50 a 300 tris                            |
| Textura                             | atlas de paleta 256×256, uma por família |
| Material                            | sem PBR, sem normal map, sem metal/rough |

**Cor vem de atlas de paleta, não de textura pintada.**

Antes de produzir muitos assets, o pipeline deve ser validado com um personagem, uma peça de equipamento, uma criatura e um pequeno trecho de cenário exportados para a web.

---

## 2. Fórmula visual

> **3D LOW POLY + SILHUETA FORTE + CORES CHAPADAS DE PALETA + SOMBRA SIMPLES + EQUIPAMENTO VISÍVEL + ANIMAÇÃO CURTA + CENÁRIO MODULAR**

Para ferramentas de geração visual:

*stylized low poly 3D game art, flat palette colors, chunky readable silhouettes, isometric 3/4 camera, soft ambient light, Brazilian colonial setting*

### Princípios

- Estilizado, nunca realista. Forma antes de detalhe.
- **Silhueta vem antes de tudo.**
- Paleta limitada por família e por região.
- Sem textura pintada; cor por face e por atlas.
- Personagem e equipamento mais limpos que o cenário.
- Cenário feito de poucas peças reutilizadas muitas vezes.
- Animação curta e legível.
- Proporção levemente estilizada: cabeça um pouco maior, membros simplificados.
- A identidade visual deve vir da combinação de personagem, equipamento, zona, materiais e interface, não de complexidade individual de cada asset.

### Regra de ouro

> **Deve ser simples de modelar, fácil de animar e difícil de confundir com outro jogo.**

Low poly comprado pode ser usado como base quando fizer sentido, mas elementos que definem a identidade visual do jogo precisam manter direção própria.

---

## 3. Escala e unidades

**1 unidade do Godot = 1 metro.** O personagem define a escala de referência.

| Elemento                        | Altura                   |
| ------------------------------- | ------------------------ |
| Personagem base                 | 1,8 u                    |
| Fauna pequena                   | 0,4 a 0,8 u              |
| Fauna média                     | 1,0 u                    |
| Fauna grande                    | 1,8 a 3,0 u              |
| Criatura humanoide sobrenatural | 1,6 a 2,2 u              |
| Chefe                           | 2,5 a 4,0 u              |
| Tile de chão                    | 2 × 2 u                  |
| Árvore pequena                  | 4 u                      |
| Árvore grande                   | até aproximadamente 12 u |

**Tudo deve ser alinhado à grade de 0,5 u.** Props e construções devem respeitar a grade adotada pelo cenário.

### Ícones de interface

Continuam 2D, mas podem ser renderizados a partir dos próprios modelos 3D em câmera ortográfica fixa e exportados como PNG.

Tamanhos de referência: 24, 32, 48 e 64 px.

Sempre que possível, o ícone deve derivar do asset real em vez de ser desenhado novamente à mão.

---

## 4. Personagem

### Proporção

Cerca de 6 cabeças, com cabeça e mãos levemente aumentadas para leitura à distância.

Membros simplificados e rosto com poucos volumes.

O rosto não deve receber polígonos que não contribuam para a leitura na câmera do jogo.

### Prioridade de leitura

**Silhueta → cor → equipamento → detalhe.**

O personagem precisa continuar reconhecível em movimento e à distância.

### Esqueleto

Um esqueleto humano compartilhado deve ser usado para personagens humanoides compatíveis.

Estrutura mínima de referência:

```text
raiz
  quadril
    coluna → peito → pescoço → cabeça
      ombro.E → braço.E → antebraço.E → mão.E
      ombro.D → braço.D → antebraço.D → mão.D
    coxa.E → canela.E → pé.E
    coxa.D → canela.D → pé.D
```

### Sockets de equipamento

Os sockets substituem anchors manuais.

| Socket                  | Recebe                                          |
| ----------------------- | ----------------------------------------------- |
| `socket_mao_principal`  | arma                                            |
| `socket_mao_secundaria` | off-hand, escudo, tocha, acessórios compatíveis |
| `socket_cabeca`         | equipamentos de cabeça                          |
| `socket_torso`          | equipamentos de torso                           |
| `socket_pes`            | botas e equipamentos de pés                     |
| `socket_costas`         | bolsas, mochilas, estandartes e similares       |

**Toda peça deve ser modelada na origem, na orientação do socket.**

Peças que precisam deformar com o corpo podem usar skinning no mesmo esqueleto. Elementos rígidos devem ser plugados.

---

## 5. Equipamento

Equipamento é parte da identidade visual do personagem e deve permanecer visível na cena.

### Regras

- Cada peça deve possuir uma silhueta própria.
- A forma básica deve permitir variações.
- Evoluções de tier devem poder alterar proporção, material e acabamento sem obrigatoriamente exigir um modelo completamente novo.
- Armas podem receber mais geometria que acessórios pequenos quando isso melhorar a leitura.
- Toda peça deve usar os sockets e convenções de pivô definidos acima.

### Evolução visual

A leitura visual de progressão deve ser feita principalmente por:

- forma;
- proporção;
- material;
- acabamento;
- acessórios;
- acentos de cor.

A progressão não deve depender de remodelar integralmente a mesma peça a cada variação.

### Raridade

A raridade deve ser comunicada por **ícone, borda, brilho e acento de cor**, quando aplicável, sem exigir um modelo completamente diferente.

---

## 6. Paleta

### Base do mundo

Terrosos, madeira, palha, dourado envelhecido, verdes profundos, azuis dessaturados e roxos espirituais.

O mundo deve parecer rústico e vivo, não necessariamente sujo ou arruinado.

### Identidade cultural

Materiais, cores e formas devem reforçar a identidade histórica e folclórica brasileira do jogo.

Elementos culturais específicos devem ser tratados como referências de design e não como decoração genérica.

### Regra prática

Objeto comum: **2 a 3 cores**.

Personagem: **3 a 6 cores principais**.

Todas devem vir do atlas de paleta sempre que possível.

### Acentos

Reservados para seleção, progresso, alerta, raridade e recompensa. Não devem ser usados apenas como decoração.

### Leitura de recompensa

Recursos, prata, Fama e outras recompensas importantes devem possuir tratamento visual consistente para que o jogador reconheça o tipo de ganho sem depender exclusivamente do texto.

---

## 7. Mobs, NPCs e criaturas

### Regras gerais

- Silhueta diferente da do jogador quando a função exigir.
- Formas simples.
- Poucas cores do atlas.
- **Um elemento marcante por tipo**, visível na silhueta.
- Variações devem partir do mesmo modelo quando isso for adequado.

### Fauna

Fauna deve partir de animais reconhecíveis e de formas compatíveis com a direção low poly.

### Personagens humanos

Quando compatível, NPCs e inimigos humanos devem reutilizar o mesmo esqueleto e animações do jogador.

A diferenciação deve vir principalmente de:

- roupa;
- equipamento;
- ferramenta;
- proporção;
- acessórios;
- postura e animação quando necessário.

### Criaturas sobrenaturais

Criaturas sobrenaturais devem possuir uma linguagem própria e não parecer apenas versões de monstros de fantasia medieval europeia.

A estranheza pode vir de:

- proporções inesperadas;
- silhuetas incomuns;
- elementos que parecem deslocados;
- luz ou material vindo de dentro;
- combinação controlada de formas familiares.

### Chefes

Cada chefe deve possuir:

- silhueta facilmente identificável;
- um elemento visual inconfundível;
- tratamento visual próprio sem abandonar a linguagem low poly do jogo.

### NPCs

A função do NPC deve ser comunicada pelo próprio modelo e por indicadores de interface.

O modelo não deve depender exclusivamente do texto para dizer ao jogador o que aquele personagem faz.

---

## 8. Cenário

A regra continua: **parecer cheio sem modelar muito.**

### Composição mínima de uma zona

Poucas peças reutilizáveis devem formar a maior parte do cenário.

Cada zona deve possuir elementos suficientemente específicos para ser reconhecida, enquanto pedras, vegetação, madeira, recipientes e outros props podem ser reutilizados.

### Terreno

Tile de 2 × 2 u, alinhado à grade.

Variações devem vir principalmente de:

- material;
- paleta;
- altura;
- composição;
- peças de borda;
- pequenos props.

### Terrenos observáveis

O cenário deve suportar diferentes estados de atividade sem transformar cada atividade em uma tela visual completamente independente.

Quando aplicável, o jogo pode representar:

| Terreno             | Função                                            |
| ------------------- | ------------------------------------------------- |
| Terreno da zona     | nós de recurso, acampamentos, estruturas e saídas |
| Arena de combate    | espaço dedicado à resolução visual da luta        |
| Transição de viagem | representação simples da viagem/carregamento      |

### Construções

A arquitetura deve reforçar o contexto brasileiro definido pelo jogo.

Evitar importar automaticamente formas de fantasia medieval europeia como castelos, muralhas de pedra, torres ornamentadas e construções equivalentes.

### Luz

Uma luz direcional e uma ambiente devem ser suficientes para a maior parte das cenas.

Evitar depender de iluminação dinâmica complexa.

A luz também pode diferenciar regiões e estados sem exigir novos modelos.

---

## 9. Animação

**Câmera isométrica fixa e animação no esqueleto.**

### Conjunto mínimo do esqueleto humano

| Animação        | Uso                  |
| --------------- | -------------------- |
| Parado          | loop de espera       |
| Andar           | deslocamento         |
| Coletar         | ações de coleta      |
| Ataque leve     | ataque básico        |
| Ataque forte    | ataque de habilidade |
| Receber dano    | reação               |
| Morrer          | morte                |
| Produzir/forjar | ações de produção    |

As animações devem ser curtas, legíveis e reutilizáveis.

### Fauna e criaturas

Devem possuir apenas o conjunto necessário para comunicar:

- espera;
- movimento;
- ataque;
- reação;
- morte.

Esqueletos podem ser compartilhados entre criaturas de anatomia semelhante.

### Movimento observável

O personagem deve apresentar pequenos deslocamentos e ações em loop quando a atividade exigir observação contínua:

**anda → para → executa a ação → repete.**

O objetivo é que o mundo pareça vivo sem transformar a experiência em controle manual de movimento.

---

## 10. Efeitos

Efeitos complementam a leitura, nunca encobrem o personagem.

Exemplos:

- impacto simples;
- faísca;
- brilho curto;
- número de dano;
- barra de progresso;
- efeitos de recompensa.

Partículas devem usar formas simples e poucas cores do atlas.

Evitar:

- neon excessivo;
- bloom pesado;
- partículas em excesso;
- efeitos que escondam equipamento ou silhueta.

Efeitos podem possuir variações visuais coerentes com materiais, regiões, equipamentos ou tradições do mundo.

---

## 11. Interface

A UI é **2D sobre a cena 3D** e deve ser construída como **blocos independentes**, não como uma tela monolítica.

Essa estrutura permite reorganização para diferentes tamanhos de tela sem transformar a UI em uma nova arte para cada plataforma.

### Blocos de referência

| Bloco         | Conteúdo                             |
| ------------- | ------------------------------------ |
| Topo          | recursos principais, zona e menu     |
| Personagem    | retrato, vida e atributos            |
| Equipamento   | slots do personagem                  |
| Cena          | janela 3D                            |
| Ação          | ação atual, progresso e cancelamento |
| Ações da zona | ações disponíveis                    |
| Inventário    | itens, peso e capacidade             |
| Eventos       | log                                  |

A composição exata pode evoluir conforme a interface real seja implementada.

### Regra de leitura

**Personagem → ação → zona → consequência → informação secundária.**

A cena 3D é observacional. Informação relevante para o gameplay não deve existir exclusivamente como detalhe visual impossível de consultar na interface.

### Estados da cena

A mesma cena deve conseguir representar estados como:

- parado;
- coletando;
- lutando;
- produzindo;
- viajando.

Não criar uma tela completamente independente para cada estado quando uma mudança de estado visual da mesma estrutura resolver o problema.

### Linguagem visual

- retângulo arredondado;
- contorno escuro;
- fundo escuro;
- ícone simples;
- título curto;
- número destacado;
- botão com estados claros.

Evitar UI excessivamente ornamental ou dourada.

---

## 12. Tipografia

Sem serifa, grossa, legível, com formas arredondadas e alto contraste.

Títulos e valores importantes devem possuir tamanho suficiente para leitura rápida.

**Suporte completo ao português é obrigatório:** acentos, til e cedilha.

Texto diegético deve ser curto, oral e concreto.

---

## 13. Produção

### Ferramentas

- **Blender** para modelo, rig e animação.
- **Godot** para implementação.
- **Git** para versionamento.
- Ferramenta 2D apenas quando necessária para UI, atlas ou ajustes específicos.

### Formato

**glTF (`.glb`)** para assets que entram no jogo.

O arquivo-fonte do Blender fica separado dos exports.

Exemplo:

```text
art/
  source/
    characters/
    equipment/
    environment/
    creatures/
    ui/
  exports/
    characters/
    equipment/
    environment/
    creatures/
    ui/
  palettes/
  references/
```

### Nomenclatura

Inglês, minúsculas, underscore e sufixo numérico quando houver variação.

```text
char_player_base.glb
char_skeleton_human.blend
equip_weapon_sword_t2.glb
equip_armor_chest_t2.glb
creature_example.glb
env_tree_01.glb
anim_human_gather.glb
ui_icon_resource.png
```

### Checklist

Antes de considerar um asset pronto:

- está dentro do orçamento de tris?
- possui pivô e orientação corretos?
- usa o atlas de paleta quando aplicável?
- está na escala correta?
- possui nome de arquivo correto?
- foi exportado no formato esperado?
- foi testado no Godot, na câmera do jogo?
- possui silhueta legível?
- pode ser reutilizado ou variado sem remodelagem desnecessária?

---

## 14. O que evitar

- Realismo.
- PBR, normal map, metal e roughness quando não forem necessários ao estilo.
- Textura pintada individualmente para cada modelo.
- Iluminação cinematográfica pesada.
- Sombra dinâmica complexa sem benefício claro.
- Partículas em excesso.
- Neon gratuito.
- Rosto excessivamente detalhado.
- Fantasia medieval europeia genérica.
- Arquitetura de castelo como linguagem padrão.
- Criaturas genéricas de fantasia medieval.
- UI dourada e luxuosa sem função.
- Assets que só funcionam em uma combinação e não podem ser reutilizados.

### Duas armadilhas principais

**1. Brasil colonial transformado em fantasia medieval genérica.**

Toda prancha e todo asset deve ser conferido contra o contexto histórico, cultural e folclórico definido pelo projeto.

**2. Low poly genérico comprado pronto.**

Base humana e props genéricos podem ser úteis, mas os elementos que definem a identidade visual do jogo devem possuir direção própria.

---

## 15. Pranchas de referência

As pranchas devem documentar **regras visuais**, não funcionar como catálogo duplicado de conteúdo.

Cada prancha deve ser autossuficiente o suficiente para orientar produção, mas não deve se tornar outra fonte de verdade para listas de itens, criaturas ou sistemas.

### Pranchas recomendadas

1. **Guia do Personagem** — proporção, silhueta, câmera e leitura à distância.
2. **Guia de Escala e Orçamento** — escala, grade, orçamento de polígonos e tamanhos de ícone.
3. **Guia de Esqueleto e Sockets** — esqueleto humano, sockets, pivôs e montagem modular.
4. **Guia de Cenário** — grade, tiles, props, composição e iluminação.
5. **Guia de Equipamento** — slots, modularização, evolução visual e raridade.
6. **Guia de Armas** — linguagem formal, escala, materiais e silhueta.
7. **Guia de Armaduras** — linhas visuais, materiais e modularização.
8. **Guia de Fauna e Personagens Humanos** — escala, esqueletos compartilhados e leitura.
9. **Guia de Criaturas Sobrenaturais** — silhueta, estranheza e linguagem visual.
10. **Guia de Animação** — conjunto mínimo, reutilização e movimento observável.
11. **Guia de UI e Blocos** — blocos, hierarquia e adaptação de tela.
12. **Guia de Produção** — fluxo Blender → Godot, pastas, nomenclatura e checklist.

Os exemplos concretos de cada prancha devem ser derivados dos dados e do design atuais do projeto, em vez de manter listas duplicadas neste documento.

---

## 16. Ordem de produção

Não produzir todos os assets de uma vez.

Começar por um conjunto mínimo que exercite todas as regras:

1. **Esqueleto humano e personagem base**, com parado e andar.
2. **Atlas de paleta** com as cores fundamentais do projeto.
3. **Um pequeno conjunto de equipamentos representativos**, cobrindo as principais linguagens visuais.
4. **Um conjunto de armadura modular**.
5. **Kit de cenário da primeira área jogável**.
6. **Dois tipos de criatura**, preferencialmente de famílias diferentes.
7. **Um NPC representativo**.
8. **Ícones dos primeiros recursos e itens**, derivados dos modelos quando possível.

Esse conjunto deve validar:

- escala;
- sockets;
- atlas;
- silhueta;
- animação;
- exportação;
- integração com Godot;
- leitura na câmera real do jogo.

Depois disso, a produção deve repetir o método em vez de criar uma regra nova para cada asset.

> **Modele como se tivesse que modelar a mesma peça cem vezes.**
