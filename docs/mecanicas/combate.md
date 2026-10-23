---
validado: false
---

# Combate

Lutas por turno num grid visível, em instância. O mesmo motor serve para jogador, inimigos, automático e eco.

## Turno

```mermaid
flowchart LR
  I[Início] --> A1[Ação 1] --> A2[Ação 2] --> A3[Ação 3] --> F[Fim]
  R[Reação: 1 por rodada] -.-> F
```

- Turno por lado: o seu lado age, depois o lado inimigo.
- 3 ações + 1 reação. No máximo 2 golpes por turno; o 2º com -5. A 3ª ação é tática.
- Andar custa ação. Skills custam 1, 2 ou 3 ações.
- Inimigo: até 4 ações por rodada, animadas juntas em até 2 s. A intenção dele aparece antes (casa-alvo).
- Velocidade 2x/3x e pular o turno inimigo.
- Acerto base calibrado jogando no terminal.

## Entrada na luta

- Grupo de inimigos visível no mapa; encostar abre a luta em instância, com o cenário do lugar.
- No mapa, quem passa vê o personagem parado ao lado dos mobs, com o ícone de luta.
- O mob ganha uma cópia por jogador: ninguém trava o grupo para os outros.
- Antes da luta no manual, a tela mostra o risco.
- A luta manual pausa sem limite.

## Movimento

- A armadura define quantas casas se anda por ação.
- Ataque de oportunidade é reação. Passo: 1 casa, sem provocar.
- Ranged pode atacar colado, com penalidade, e provoca ataque de oportunidade.
- Ninguém termina no mesmo quadrado. Atravessa aliado; inimigo só com skill ou manobra.
- Sair da borda só por skill.
- Se o simulador medir mais de 60% de turnos "anda + bate + bate": testar o Passo grátis 1 vez por turno.

## Modos

| Modo | Como funciona | Rende | Onde |
|---|---|---|---|
| Manual | O jogador decide cada ação | Mais | Chefes e jornadas exigem |
| Automático | Lista de prioridade + intenção de movimento; só com o jogo aberto; para por recurso (inventário, durabilidade) | Menos que o manual | Farm, caçada |
| Contínuo | Mesmos turnos sem pausa | — | Só apresentação |

- A IA dos inimigos usa o mesmo decisor do automático.

## PvP contra eco _(adiado)_

- Eco: cópia da build e da automação de outro jogador. Sem perda de itens.
- Primeiro os dois lados no automático; depois, manual contra o eco.

## Propostas

- Condições do livro antigo com +2/-2 no lugar de vantagem.
- Concentração igual à ação de sustentar do Pathfinder 2e.

## Em aberto

- Ataque de oportunidade para todos ou só certos itens.
- Teto de diferença de velocidade entre armaduras.
- Skills de 2 e 3 ações.
- PvP: recompensa, defensor, pareamento.
