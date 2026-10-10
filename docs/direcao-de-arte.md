# Direção de arte

## Em uma frase
3D low poly estilizado, cor chapada de paleta, equipamento visível, câmera inclinada fixa. Brasil histórico e folclórico, nunca fantasia medieval genérica.

## Fórmula
**low poly + silhueta forte + cor chapada + sombra simples + equipamento visível + animação curta + cenário modular**

- Estilizado, nunca realista. Forma antes de detalhe.
- Silhueta primeiro. Se não lê de longe, não serve.
- Personagem mais limpo que o cenário.
- Poucas peças, reusadas muitas vezes.
- Regra de ouro: simples de modelar, fácil de animar, difícil de confundir com outro jogo.

## Câmera e telas
- Câmera fixa, levemente inclinada, 3/4. Mesma linguagem no mundo e no combate.
- **Mundo:** zona vista de cima em 3/4. Pontos de interesse com ícone (coleta, NPC, encontro, saída). Mob mostra nível e vida.
- **Combate:** arena da zona. Jogador à esquerda, inimigos à direita. Três filas paralelas.
- Fila e passo são discretos → posição na tela sempre legível, sem ambiguidade.
- Linha das filas: sutil no chão. Ajuda a ler, não vira tabuleiro.

## Personagem
- Proporção: levemente estilizada (cabeça e mãos um pouco maiores).
- Leitura: silhueta → cor → equipamento → detalhe.
- Um esqueleto humano para jogador, NPC e inimigo humano.
- Rosto com poucos volumes. Nada que a câmera não mostre.

### Sockets
| Socket                  | Recebe                  |
| ----------------------- | ----------------------- |
| `socket_mao_principal`  | arma                    |
| `socket_mao_secundaria` | escudo, off-hand, tocha |
| `socket_cabeca`         | cabeça                  |
| `socket_torso`          | torso                   |
| `socket_pes`            | calçado                 |
| `socket_costas`         | bolsa, mochila          |

- Peça rígida: plugada no socket, modelada na origem e na orientação do socket.
- Peça que dobra com o corpo: skinning no mesmo esqueleto.

## Equipamento
- Toda peça tem silhueta própria. Trocar peça = mudar o visual.
- Tier sobe por forma, proporção, material e acabamento. Não remodela tudo.
- Raridade e encantamento: borda, brilho e acento de cor. Não modelo novo.

## Paleta
- Base: terrosos, madeira, palha, dourado velho, verde fundo, azul dessaturado, roxo espiritual.
- Cor vem de atlas de paleta. Sem textura pintada.
- Objeto comum: 2 a 3 cores. Personagem: 3 a 6.
- Acento só com função: seleção, alerta, raridade, recompensa.

## Criaturas
- Um elemento marcante por tipo, visível na silhueta.
- Variação parte do mesmo modelo.
- Sobrenatural vem do folclore: proporção estranha, luz de dentro, forma familiar fora do lugar.
- Chefe: silhueta inconfundível.

## Cenário
- Parecer cheio sem modelar muito.
- Zona reconhecível por poucas peças próprias; o resto é reuso.
- Arquitetura brasileira do período. Nada de castelo e muralha de pedra.
- Luz: uma direcional + uma ambiente. Luz diferencia região e hora.

## Animação
- Humano: parado, andar, ataque leve, ataque forte, conjurar, receber dano, fugir, morrer, coletar, produzir.
- Criatura: parado, mover, atacar, reagir, morrer.
- Curta e legível. Esqueleto compartilhado quando a anatomia permite.
- Animação base do Mixamo, ajustada.

## Efeitos
- Complementam, nunca escondem personagem ou equipamento.
- Impacto, faísca, brilho curto, número de dano.
- Sem neon, sem bloom pesado, sem chuva de partícula.

## Interface
- HTML/CSS por cima do canvas 3D. Blocos independentes.
- Leitura: personagem → ação → consequência → detalhe.
- Toda informação de jogo existe na interface, não só na cena.
- Visual: fundo escuro, cantos arredondados, ícone simples, número destacado. Sem dourado ornamental.

### Combate
- Ordem de turno: faixa de retratos no topo, vez atual destacada.
- Intenção do inimigo: ícone sobre o inimigo + cartão do alvo (só no ativo).
- Barra: 6 skills + ataque normal. Ao lado: usar item e fugir.
- Modo: manual / automático, sempre visível.
- Vida e energia do jogador fixas no painel. Vida e nível sobre cada inimigo.
- Diário de combate: curto, com filtro.
- Sem inventário completo no combate. Só consumíveis.
- Ao mirar uma skill de movimento: mostrar o caminho, quem será atingido e onde ele termina.
- Alvo em que a skill não pode ser usada aparece desabilitado.

### Mundo
- Retrato com vida e energia, zona e risco, minimapa, chat, atalhos.

## Tipografia
- Sem serifa, grossa, arredondada, alto contraste.
- Português completo: acento, til, cedilha.

## Produção
- Blender → glTF (`.glb`) → Three.js.
- Fonte `.blend` separada do export.
- Pacote modular comprado vale como base. O que define identidade tem direção própria.
- Nome: inglês, minúsculo, underscore. `equip_weapon_sword_t2.glb`
- Ícone 2D renderizado do próprio modelo quando der.

### Orçamento (referência)
- Personagem com equipamento: até 3.000 tris.
- Peça de equipamento: 150 a 500.
- Fauna: 800 a 1.500. Chefe: até 4.000.
- Prop: 50 a 300.
- Sem PBR, sem normal map.

### Checklist do asset
- Dentro do orçamento? Pivô e escala certos? Usa o atlas?
- Testado na câmera do jogo? Silhueta lê de longe? Dá para variar sem remodelar?

## Evitar
- Realismo e textura pintada.
- Fantasia medieval europeia: castelo, goblin, orc, cavaleiro genérico.
- Low poly genérico sem direção.
- Efeito que esconde silhueta.

## Decisões

### 3D low poly com cor de paleta · 2026-10-09
- **Por quê:** equipamento visível sem desenhar cada peça em cada quadro.
- **Não:** 2D, custo de arte por peça e por animação alto demais para um dev solo.
- **Reabrir:** se o teste de personagem modular em Three.js falhar.

### Interface em HTML/CSS sobre o canvas · 2026-10-09
- **Por quê:** jogo cheio de interface; é onde a web é mais forte.
- **Não:** interface desenhada dentro do 3D, mais lenta de fazer e de mudar.

### Sem inventário completo no combate · 2026-10-09
- **Por quê:** luta leve de executar; menos coisa na tela para o jogador cansado.

## Em aberto
- Proporção final do personagem: estilizada (~6 cabeças) ou chibi (~3).
- Ícone de intenção: linguagem visual por tipo (ataque, defesa, controle, fuga).
- Como a fila aparece no chão sem virar tabuleiro.

## Primeiro teste
Personagem base + duas peças trocáveis + uma animação do Mixamo, no Three.js, na câmera do jogo.
Passou → segue. Não passou → reabre a decisão do cliente.