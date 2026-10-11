// distancia.ts só responde perguntas sobre posição, sem alterar nada:
// Qual a distância entre o jogador e esse mob? (A diferença de passos.)
// Esse mob está dentro do meu alcance?
// Qual inimigo é o mais próximo? E o mais distante? (É o que a preferência de alvo da automação vai usar.)
// Funções pequenas com testes: distância, mover um passo, está ao alcance?, aplicar dano.

import { Combatant, CombatConfig, CombatState } from "./types";

// movimento.ts muda a posição:
// Avançar ou recuar um passo.
// Empurrar ou puxar alguém.
// Respeitar os limites da fila: ninguém sai da arena nem passa do canto.
// Decidir quanto um combatente anda no turno: o corpo a corpo avança até entrar no alcance; o ranged fica parado.

// ==== distance.ts ====
export function getDistance(combatant1: Combatant, combatant2: Combatant) {}
export function isWithinRange(
  combatant1: Combatant,
  combatant2: Combatant,
  range: number,
) {}
export function getClosestEnemy(combatant: Combatant, enemies: Combatant[]) {}

// ==== movement.ts =====
export function move(combatant: Combatant, direction: "forward" | "backward") {}

// ===== fight.ts =====
// iniciarLuta;
export function initializeCombat(
  config: CombatConfig,
  combatants: Combatant[],
): CombatState {
  const fightState: CombatState = {
    combatants: combatants,
    combatConfig: config,
    currentTurn: 0,
    activeCombatantId: "",
  };

  //spawn combatants in the arena
  for (const combatant of combatants) {
    const side = combatant.spawnSide;
    if (side === "left") {
      combatant.position = { lane: 0, step: 2 };
    } else if (side === "right") {
      combatant.position = {
        lane: 0,
        step: config.arena.laneLength - 2,
      };
    }
  }

  return fightState;
}

// resolverAcao;
export function resolveAction() {}
