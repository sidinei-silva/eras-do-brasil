// Onde cada combatente nasce na arena.
// Ninguém nasce na borda: sobra espaço atrás de cada lado para empurrão e recuo.

import type { Combatant, CombatConfig } from "./types";

export function spawnCombatants(
  config: CombatConfig,
  combatants: Combatant[],
): Combatant[] {
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

  return combatants;
}
