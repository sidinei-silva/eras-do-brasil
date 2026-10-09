# Automação

## O que é
É o sistema que permite que seu personagem cace ou lute sozinho. A build é o equipamento que você veste e define quais skills existem; a automação é o que o personagem faz com essas skills quando você não está controlando, seguindo o preset do tipo de luta.

## Termos
- **Build**: o equipamento vestido. Define as skills disponíveis.
- **Automação**: o sistema que luta pelo jogador.
- **Preset**: a configuração da automação para um tipo de luta (prioridades, alvo e limiar de fuga).

## Por que existe
Para que o player não seja punido por precisar sair alguns segundos no meio de uma luta, ou para que o player consiga progredir no jogo mesmo sem ter tempo para ficar de forma 100% ativa.

## Como funciona

### Skills
O preset define uma lista de prioridade de skills. A cada turno, a automação usa a primeira skill da lista que não estiver em recarga, e usa o ataque normal quando todas estiverem em recarga. O jogador pode alterar a lista a qualquer momento.

### Alvo
O preset define qual inimigo vai ser focado: mais distante, mais próximo, com menos vida, com mais vida, mais forte ou mais fraco.

### Itens
O preset define uma lista de prioridade de itens, respeitando a recarga de cada item. O jogador pode alterar a lista a qualquer momento.

### Fuga
O preset define um limiar de vida; ao cruzá-lo, o personagem tenta fugir. A automação não enxerga a intenção do inimigo, então foge só pela vida.

A cada turno a automação verifica, nesta ordem: fuga, cura e habilidade.

As regras da fuga em si estão em [combate.md](combate.md).

### Presets por tipo de luta
Os tipos até o momento são: inimigos comuns, chefes e PvP. O jogo escolhe qual preset usar de acordo com o tipo de oponente.

Por padrão, todos os presets vêm com a mesma configuração. O jogador pode customizar cada um separadamente.

## Sem configurar nada
- Todos os presets já vêm com prioridades de skills e itens razoáveis e um limiar de fuga razoável.

## Para quem quer ir fundo
- Ajustar o limiar de fuga por preset.
- Montar prioridades de skills, itens e alvo diferentes para cada tipo de luta.

## Liga com
- [Combate](combate.md) (as regras da luta que a automação segue)
- [AFK](afk.md) (a caçada automatizada usa a automação)
- [PvP](pvp.md) (preset de PvP e tempo estourado)

## Em aberto
- Elite usa o preset de comum ou o de chefe?
- Condição por skill baseada em vida (ex.: usar a cura só abaixo de 50%) entra no começo ou fica para depois?
- "Cura" na ordem de verificação é item, skill ou os dois?
- Ao trocar de equipamento, o preset pula a skill que deixou de existir?

## Decisões
| Data       | Decisão                                         | Por quê                                                             |
| ---------- | ----------------------------------------------- | ------------------------------------------------------------------- |
| 2026-10-07 | A automação não enxerga a intenção do inimigo   | Ler a intenção é o que faz o jogo ativo valer mais que o automático |
| 2026-10-07 | Um preset por tipo de luta, escolhido pelo jogo | O jogador configura uma vez e não precisa trocar no meio da caçada  |
| 2026-10-07 | Todos os presets vêm iguais por padrão          | Funciona sem configurar nada; diferenciar é para quem quer ir fundo |
| 2026-10-07 | "Loadout" saiu do vocabulário                   | Colidia com build; ficaram build, automação e preset                |