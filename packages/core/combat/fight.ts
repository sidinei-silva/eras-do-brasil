// A porta principal da luta: é o único jeito de mudar um CombatState.
// O servidor e o playground só chamam estas funções; as peças (spawn, posição) ficam por trás.

import { move } from "./position";
import { spawnCombatants } from "./spawn";
import type { Action, Combatant, CombatConfig, CombatState } from "./types";

// iniciarLuta
export function initializeCombat(
  config: CombatConfig,
  combatants: Combatant[],
): CombatState {
  const fightState: CombatState = {
    combatants: spawnCombatants(config, combatants),
    combatConfig: config,
    currentTurn: 0,
    activeCombatantId: combatants[0]?.id ?? "",
  };

  return fightState;
}

// resolverAcao: o passo automático acontece no começo da vez; a ação encerra a vez.
export function resolveAction(state: CombatState, action: Action): CombatState {
  const afterMove = move(state, state.activeCombatantId);

  switch (action.type) {
    case "pass":
      break;
  }

  return passTurn(afterMove);
}

// Entrega a vez ao próximo combatente da lista. Cada vez conta como um turno.
function passTurn(state: CombatState): CombatState {
  const index = state.combatants.findIndex(
    (c) => c.id === state.activeCombatantId,
  );
  const next = state.combatants[(index + 1) % state.combatants.length];
  return {
    ...state,
    currentTurn: state.currentTurn + 1,
    activeCombatantId: next.id,
  };
}

// simularLuta: roda sem ninguém escolher e devolve o estado depois de cada turno.
// Por enquanto todos só passam (andam e não atacam), e a luta não tem fim: para em `maxTurns`.
export function simulateCombat(
  state: CombatState,
  maxTurns: number,
): CombatState[] {
  const history: CombatState[] = [];
  let current = state;
  for (let turn = 0; turn < maxTurns; turn++) {
    current = resolveAction(current, { type: "pass" });
    history.push(current);
  }
  return history;
}
