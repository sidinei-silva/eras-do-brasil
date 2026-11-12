# Direção de arte

Estrutura: **Decidido** (vale) → **Propostas** (para validar) → **Em aberto** (para decidir). Fontes do acervo no fim,
citadas como [F1], [F2]…

## Decidido

| Tema                  | Decisão                                                                                                                                                                                                        |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vista                 | 2D top-down em pixel art, vista ortográfica: chão visto de cima, paredes e pessoas de frente. **Não** é isométrico.                                                                                            |
| Profundidade          | Desníveis: paredões, degraus e escadas desenhados de frente, como no Calamity e no Stardew. Combate em área plana; desnível no combate está estacionado.                                                       |
| Referência            | Calamity para mundo e câmera. Boneco na escala de ~32 px, padrão do gênero. Clima e paleta: a capa de abr/2025 do acervo (entardecer, verdes escuros e frios, sombra fria e luz quente).                       |
| Grade                 | Tiles de 16 px. Boneco ~32 px de altura, cabeça ~25–30% da altura (proporção adulta). Quadro de 64×64 para caber arma e ataque, um pivô só (pés).                                                              |
| Animação              | 4 direções (3 desenhadas + espelho). ~8–12 quadros por segundo. Parado 2–4, andar 6, ataque 3–4 quadros.                                                                                                       |
| Equipamento           | Você é o que veste: o equipamento aparece no boneco. Tier aparece pela cor e pelo acabamento, nunca pelo tamanho.                                                                                              |
| Equipamento no boneco | Camadas por slot (corpo, cabeça, torso, arma) + troca de paleta por tier. Cada slot usa cores só dele.                                                                                                         |
| Tom                   | Não infantil e não sombrio demais. O chibi do Calamity é limite, não meta.                                                                                                                                     |
| Era 1                 | 1500–1654, litoral, Mata Atlântica, engenho. Brasil e folclore só como inspiração indireta: sem religião, sem povo real, sem nomes fortes.                                                                     |
| Dado                  | Dado de interface no centro da tela (como no BG3): 48×48 (tela de 64×64 no Aseprite), terra e madeira, número em `#F0E2B6` sobreposto; face da frente vazia. Giro em 3 quadros; o movimento é feito no código. |
| Janela de teste       | Painel 9-slice 160×157 (nativo), miolo `#26262F`; d20 de 48 px; dano em dados de 32 px, até 4 lado a lado; com mais, 1 dado com "×N" e o total. Todo texto é fonte.                                            |
| Produção              | Desenho à mão. Pack comprado só como placeholder, e só com licença que permita uso junto com IA. Referência feita com IA pode ser placeholder em cena de teste (com `_ref` no nome), nunca conteúdo final.     |
| Importação            | Godot 4 (.NET). Filtro Nearest, sem compressão (Lossless), 16 px = 1 tile.                                                                                                                                     |
| Resolução nativa      | 480×270 (×4 em 1080p, ×8 em 4K; 1440p com borda em ×5).                                                                                                                                                        |
| Paleta                | 36 cores próprias (P1). Só aumenta quando faltar cor de verdade.                                                                                                                                               |
| Ícone                 | 16×16 na HUD, 32×32 na dica.                                                                                                                                                                                   |
| UI                    | Madeira escura com dourado velho e folhas.                                                                                                                                                                     |
| Contorno              | Preto (`#1A1515`) em boneco e item; cenário sem contorno.                                                                                                                                                      |

## Propostas

### P1. Paleta-mestra (36 cores)

| Rampa                                     | Cores (escura → clara)                                                                                           | Origem                                                     |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| Contorno                                  | `#1A1515`                                                                                                        | cor de contorno de [F9] (cartum descartado), reaproveitada |
| Pele (7 cores, 3 rampas que dividem tons) | escura `#2A1814` `#5A3426` `#8C5236` · média `#5A3426` `#A8683F` `#D39A6C` · clara `#A8683F` `#E3B288` `#F4D3AE` | nova                                                       |
| Mata                                      | `#0E2125` `#223C34` `#3D7A3C` `#86B04F`                                                                          | 2 escuros da capa (P7-A2); 2 claros de antes               |
| Terra e madeira                           | `#3D261C` `#7C5A3A` `#A8703E` `#B89976`                                                                          | 1º, 2º e 4º de [F5]; `#A8703E` nova                        |
| Palha e dourado velho                     | `#D8B67A` `#F0E2B6`                                                                                              | `#D8B67A` de [F5]; claro nova                              |
| Pedra                                     | `#26262F` `#4B4A55` `#7B7880` `#B3ACA2`                                                                          | nova                                                       |
| Água                                      | `#0E2236` `#1B4A68` `#2E7F8E` `#78C2B8`                                                                          | "azuis místicos" de [F1][F3]; hex nova                     |
| Metal                                     | `#3A4150` `#7F8896` `#DADDD6`                                                                                    | nova                                                       |
| Rasgo (Raiz)                              | `#2C1840` `#6E2C94` `#C070F0`                                                                                    | roxo espiritual de [F1][F3][F4][F6]; hex nova              |
| Estado de UI                              | `#6E1C22` `#C9402E` `#F2C14E`                                                                                    | nova                                                       |
| Entardecer                                | `#1B4A68` `#7E575E` `#A8703E`                                                                                    | capa de abr/2025; só `#7E575E` é nova                      |

Regras de uso:

| Regra                                                                            | Origem                                     |
| -------------------------------------------------------------------------------- | ------------------------------------------ |
| Objeto comum: 2–3 cores. Personagem: até 8.                                      | [F7][F8], adaptado para boneco de 32 px    |
| Acento vivo só com função: seleção, alerta, tier, recompensa.                    | [F7][F8]                                   |
| O roxo do Rasgo é a única cor saturada do cenário; não aparece em nada "normal". | [F10] ("a luz do Rasgo, a única cor viva") |
| Personagem mais limpo (menos detalhe) que o cenário, para ler por cima do chão.  | [F8]                                       |
| Texto claro da UI usa `#F0E2B6`, nunca branco puro.                              | nova                                       |

### P2. Paleta por zona da Era 1

| Zona    | Base                                                    | Acento                             | Luz                              | Origem                                                                     |
| ------- | ------------------------------------------------------- | ---------------------------------- | -------------------------------- | -------------------------------------------------------------------------- |
| Litoral | palha, água (3 tons claros), pedra clara                | verde claro da mata                | alta e quente; sombra curta      | areia/pedra/madeira de [F12]; hex nova                                     |
| Mata    | mata (4 tons), terra escura, água escura em poça        | manchas de luz em `#F0E2B6`        | filtrada pela copa; sombra funda | [F4] (dia: luz filtrada; noite: fachos de luz)                             |
| Engenho | terra e madeira, telha `#A8703E`, pedra (moenda), palha | metal (caldeira), fumaça `#B3ACA2` | quente, poeirenta                | terrosos quentes de [F6] (vila: "segurança precária")                      |
| Rasgo   | rampa do Rasgo                                          | `#C070F0` pulsando                 | luz vem **de dentro** da fenda   | veias roxas no solo + entorno dessaturado de [F4]; "luz de dentro" de [F8] |

Rasgo na zona: o chão em volta troca a rampa local pela rampa de pedra (dessatura) num raio; veias de 1 px em `#6E2C94`
com brilho `#C070F0`. Origem: [F4].

### P3. Cor de tier (T1–T4)

Silhueta e tamanho iguais em todos os tiers. Muda cor, número de tons e acabamento.

| Tier | Material                      | Tons | Brilho | Acabamento                  | Origem                                       |
| ---- | ----------------------------- | ---- | ------ | --------------------------- | -------------------------------------------- |
| T1   | cru: madeira, couro, fibra    | 2    | nenhum | remendo, borda irregular    | "improvisado, rústico, mal-acabado" de [F3b] |
| T2   | tratado: couro curtido, ferro | 3    | 1 px   | costura ou rebite visível   | nova                                         |
| T3   | metal bom, tecido tingido     | 3–4  | 1–2 px | friso + 1 acento de cor     | "borda, brilho e acento" de [F7]             |
| T4   | metal fino, latão             | 4    | 2 px   | gravação + acento `#D8B67A` | nova                                         |

Ideia de produção: o tier é **troca de paleta** do mesmo sprite (shader ou cópia indexada). Desenha-se a peça 1 vez;
T1–T4 são 4 paletas + uma camada de detalhe a partir do T3. Origem: nova (resolve o "custo por peça" que derrubou o 2D
em [F8]).

### P4. Contorno, luz e sombra

| Regra             | Proposta                                                                                         | Origem                                           |
| ----------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------ |
| Luz               | Vem de cima à esquerda, igual em tudo. Noite/dia/zona por tinta global no motor, sem redesenhar. | "luz diferencia região e hora" de [F8], adaptado |
| Tons por material | Base, sombra, brilho; no máximo 4.                                                               | "3 tons sólidos" de [F9], adaptado               |
| Mudança de matiz  | Sombra puxa para frio (azul/roxo), brilho puxa para quente (amarelo).                            | nova                                             |
| Sombra no chão    | Elipse de 1 cor escura sob o boneco, sem transparência.                                          | nova                                             |
| Dither            | Só em áreas grandes de cenário; nunca em boneco ou item.                                         | nova                                             |
| Número de dano    | Contorno forte para ler sobre qualquer chão.                                                     | [F2]                                             |

### P5. Direção da UI

| Item      | Proposta                                                                      | Origem                  |
| --------- | ----------------------------------------------------------------------------- | ----------------------- |
| Painel    | 9-slice, cantos de 1–2 px, madeira escura (Decidido).                         | 9-slice de [F1]         |
| Ornamento | Dourado velho e folhas; sem penas e sem grafismo étnico (regra de povo real). | Decidido                |
| Botão     | 3 estados: parado, em cima, pressionado.                                      | [F1][F2]                |
| Leitura   | Personagem → ação → consequência → detalhe.                                   | [F8]                    |
| Fonte     | Fonte pixel com acento, til e cedilha (ver Em aberto E5).                     | requisito PT-BR de [F1] |

Cores de estado:

| Estado        | Cor                                       | Origem                |
| ------------- | ----------------------------------------- | --------------------- |
| Vida          | `#C9402E` (fundo `#6E1C22`)               | "PV vermelho" de [F2] |
| Energia       | `#2E7F8E` (brilho `#78C2B8`)              | nova                  |
| Falha crítica | número `#6E1C22` com contorno, dado treme | nova                  |
| Falha         | número `#7B7880`                          | nova                  |
| Sucesso       | número `#86B04F`                          | nova                  |
| Crítico       | número `#F2C14E` + 1 quadro de brilho     | nova                  |

### P6. Outras ideias do acervo

| Ideia                                                                                                                                                   | Origem          |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| Duas linguagens de construção: "ordem" (linha reta, madeira cortada, telha, grade) e "orgânica" (palha, barro, cipó, segue o terreno). Sem nomear povo. | [F4], adaptado  |
| Sobrenatural = forma comum fora do lugar + luz de dentro; nunca monstro genérico.                                                                       | [F8]            |
| Minério raro com veio que brilha de dentro (1 cor viva sobre pedra).                                                                                    | [F6]            |
| Efeitos curtos: impacto, faísca, brilho; sem neon, sem bloom, sem chuva de partícula.                                                                   | [F8]            |
| Pastas `art/source` (`.aseprite`) e `art/exports` (`.png`), com subpastas `characters equipment environment creatures ui`.                              | [F11], adaptado |
| Nome de arquivo: inglês, minúsculo, underscore, tier no fim: `equip_weapon_sword_t2.png`.                                                               | [F8], adaptado  |

## Em aberto

| #   | Questão | Opção A                                            | Opção B                                                                    | Opção C                                            |
| --- | ------- | -------------------------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------- |
| E5  | Fonte   | **TinyUnicode** ([F1]): já avaliada, muito pequena | Fonte pixel pública de 7–11 px (hipótese: conferir acento e cedilha antes) | **Fonte própria** no Aseprite: só as letras usadas |

Enquanto a E5 não fecha, as cenas de teste usam a fonte padrão da Godot.

## Fontes (caminhos no acervo)

| ID  | Arquivo                                                                                                                                                          |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F1  | `Artefatos/03-mud-moderno-pre-fusao/gdd-batalha-turno/gdd/04_Design_Visual/01_Estilo_Arte_e_Tecnica.md`                                                          |
| F2  | `Artefatos/03-mud-moderno-pre-fusao/gdd-batalha-turno/gdd/04_Design_Visual/05_UI_Fase_1_Exploracao_e_Combate.md` e `06_UI_Fase_2_Combate_Tatico.md`              |
| F3  | `Artefatos/01-rpg-de-mesa-e-narrativa/Livros Antigos/Documento de Design Visual.md`                                                                              |
| F3b | `Artefatos/01-rpg-de-mesa-e-narrativa/NotebookLM/Elemental Being Class and Interface Design Guide/Artifacts/Lista de Tarefas de Pixel Art_ Protótipo (Fase 1.md` |
| F4  | `Artefatos/01-rpg-de-mesa-e-narrativa/NotebookLM/Eras Do Brasil_ Teste de Regressão/Artifacts/Lista Mestra de Assets Visuais (Pixel Art) - Fas.md`               |
| F5  | `Conversas/GPT/2025-04-14_Setor de Arte_convertido.md`                                                                                                           |
| F6  | `Artefatos/03-mud-moderno-pre-fusao/gdd-batalha-turno/gdd/06_Dados_e_Assets/02_Lista_de_Assets_Ato1.md`                                                          |
| F7  | `Artefatos/04-idle-escoria-e-fusao/eras-do-brasil-idle/docs/direcao-de-arte.md` (3D low poly, descartado)                                                        |
| F8  | `Artefatos/05-semi-idle-typescript/eras-do-brasil-semi-idle/docs/direcao-de-arte.md` (3D low poly, descartado)                                                   |
| F9  | `Conversas/GPT/2026-09-05_Revisar decisão de arte_convertido.md` e `2026-09-03_Mockup de interface_convertido.md` (cartum chibi, descartado)                     |
| F10 | `Artefatos/06-mmorpg-sandbox-por-turno/debates-2026-10/02-arte/compilado.md`                                                                                     |
| F11 | `Conversas/GPT/2026-09-15_1 - Guia de UI Gamer_convertido.md`                                                                                                    |
| F12 | `Conversas/GPT/2026-09-15_1 - Atlas de paleta Ambiente_convertido.md` (só o pedido, sem hex)                                                                     |