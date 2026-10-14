// Diário do combate. O core ainda não emite eventos, então o playground descreve
// cada turno comparando o estado antes e depois. Quando o core tiver eventos, isto some.

import {
  getAttackRange,
  getClosestEnemy,
  getDistance,
  getEnemies,
  getEnemiesInRange,
  getMoveIntent,
  type CombatantPosition,
  type CombatState,
  type MoveIntent,
} from "core";

// Seta do movimento: → ← no passo, ↑ ↓ na fila (fila 0 é a de cima), diagonal quando muda os dois.
export function moveArrow(from?: CombatantPosition, to?: CombatantPosition): string {
  if (!from || !to) return "·";
  const ds = Math.sign(to.step - from.step);
  const dl = Math.sign(to.lane - from.lane);
  const arrows: Record<string, string> = {
    "0,0": "·", "1,0": "→", "-1,0": "←", "0,-1": "↑", "0,1": "↓",
    "1,-1": "↗", "-1,-1": "↖", "1,1": "↘", "-1,1": "↙",
  };
  return arrows[`${ds},${dl}`];
}

const INTENT_TEXT: Record<MoveIntent, string> = {
  approach: "quer se aproximar",
  flee: "quer fugir",
  hold: "está no alcance",
};

export type TurnEvent = {
  turn: number;
  combatantId: string;
  // Depois do passo, antes de acabar a vez: alguém ficou ao alcance da arma?
  canAttack: boolean;
  text: string;
};

export function describeTurn(before: CombatState, after: CombatState): TurnEvent {
  const id = before.activeCombatantId;
  const prev = before.combatants.find((c) => c.id === id);
  const next = after.combatants.find((c) => c.id === id);
  const turn = after.currentTurn;
  const prefix = `T${turn} · ${id}`;
  if (!prev?.position || !next?.position) {
    return { turn, combatantId: id, canAttack: false, text: `${prefix} passa` };
  }

  const intent = getMoveIntent(before, prev);
  const from = prev.position.step;
  const to = next.position.step;
  // Fugir andando em direção ao inimigo só acontece depois de virar na parede.
  const closest = getClosestEnemy(prev, getEnemies(before, prev), before.combatConfig.arena);
  const towardEnemy = closest?.position ? Math.sign(closest.position.step - from) : 0;
  const turned =
    intent === "flee" && towardEnemy !== 0 && Math.sign(to - from) === towardEnemy
      ? " (virou na parede)"
      : "";

  const fromLane = prev.position.lane;
  const toLane = next.position.lane;

  const arrow = moveArrow(prev.position, next.position);
  let move: string;
  if (fromLane !== toLane) {
    const why = intent === "flee" ? "fila fechada" : "frente a frente";
    const steps = from !== to ? `passo ${from} → ${to}, ` : "";
    move = `${INTENT_TEXT[intent]}: ${arrow} ${steps}fila ${fromLane} → ${toLane} (${why})${turned}`;
  } else if (from !== to) {
    move = `${INTENT_TEXT[intent]}: ${arrow} passo ${from} → ${to}${turned}`;
  } else if (intent === "hold") {
    move = `${INTENT_TEXT[intent]}, fica`;
  } else {
    move = `${INTENT_TEXT[intent]}, mas está bloqueado`;
  }

  const attack = describeAttack(after, id);
  return { turn, combatantId: id, canAttack: attack.canAttack, text: `${prefix} ${move}\n    ${attack.text}` };
}

// Avalia no estado depois do passo, que é quando o ataque aconteceria.
function describeAttack(state: CombatState, id: string) {
  const combatant = state.combatants.find((c) => c.id === id)!;
  const { arena } = state.combatConfig;
  const range = getAttackRange(combatant, state.combatConfig);
  const inRange = getEnemiesInRange(state, combatant);

  if (inRange.length > 0) {
    const targets = inRange
      .map((enemy) => `${enemy.id} a ${getDistance(combatant, enemy, arena)}`)
      .join(", ");
    return { canAttack: true, text: `⚔ ataca: ${targets} · alc ${range}` };
  }

  const closest = getClosestEnemy(combatant, getEnemies(state, combatant), arena);
  const distance = closest ? getDistance(combatant, closest, arena) : undefined;
  return {
    canAttack: false,
    text: closest
      ? `✗ não alcança: ${closest.id} a ${distance} · alc ${range}`
      : "✗ não alcança: nenhum inimigo",
  };
}
