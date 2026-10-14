// Tudo sobre a posição na arena.
// Distância: só responde perguntas, sem alterar nada (distância, alcance, inimigo mais próximo).
// Movimento: o passo automático do começo do turno, sempre na própria fila.
// - Curta distância: se aproxima até o inimigo ficar ao alcance.
// - Média e longa: se aproximam até o limite do alcance; se ficarem perto demais
//   (mais de `rangedFleeMargin` passos dentro do alcance), fogem.
// - Quem foge e bate na parede tenta fugir para o outro lado, desde que lá tenha menos inimigos
//   e nenhum inimigo bloqueie a própria fila. Ele guarda essa direção (fleeDirection) até parar
//   de fugir, para não voltar para a parede no turno seguinte.
// - Ninguém ocupa um quadrado ocupado nem sai da arena.

import type {
  Combatant,
  CombatantPosition,
  CombatArenaConfig,
  CombatConfig,
  CombatState,
} from "./types";

export type StepDirection = -1 | 0 | 1;
export type MoveIntent = "approach" | "flee" | "hold";

// ===== Distância =====

// Distância = diferença de passos. Fila vizinha não soma; fila oposta soma a penalidade.
export function getDistance(
  combatant1: Combatant,
  combatant2: Combatant,
  arena: CombatArenaConfig,
): number {
  if (combatant1.position === undefined || combatant2.position === undefined) {
    throw new Error(
      "Combatants must have positions defined to calculate distance.",
    );
  }
  const steps = Math.abs(combatant1.position.step - combatant2.position.step);
  const lanes = Math.abs(combatant1.position.lane - combatant2.position.lane);
  return lanes >= 2 ? steps + arena.oppositeLanePenalty : steps;
}

export function isWithinRange(
  combatant1: Combatant,
  combatant2: Combatant,
  range: number,
  arena: CombatArenaConfig,
): boolean {
  return getDistance(combatant1, combatant2, arena) <= range;
}

export function getAttackRange(
  combatant: Combatant,
  config: CombatConfig,
): number {
  return config.weaponRangeSteps[combatant.equipments.weapon.range];
}

export function getEnemies(
  state: CombatState,
  combatant: Combatant,
): Combatant[] {
  return state.combatants.filter((c) => c.spawnSide !== combatant.spawnSide);
}

// Empate: fica o primeiro da lista, para a luta ser determinística.
export function getClosestEnemy(
  combatant: Combatant,
  enemies: Combatant[],
  arena: CombatArenaConfig,
): Combatant | undefined {
  let closest: Combatant | undefined;
  for (const enemy of enemies) {
    if (
      closest === undefined ||
      getDistance(combatant, enemy, arena) <
        getDistance(combatant, closest, arena)
    ) {
      closest = enemy;
    }
  }
  return closest;
}

export function getFarthestEnemy(
  combatant: Combatant,
  enemies: Combatant[],
  arena: CombatArenaConfig,
): Combatant | undefined {
  let farthest: Combatant | undefined;
  for (const enemy of enemies) {
    if (
      farthest === undefined ||
      getDistance(combatant, enemy, arena) >
        getDistance(combatant, farthest, arena)
    ) {
      farthest = enemy;
    }
  }
  return farthest;
}

// Inimigos que o combatente alcança com a arma, do mais perto para o mais longe.
export function getEnemiesInRange(
  state: CombatState,
  combatant: Combatant,
): Combatant[] {
  const { arena } = state.combatConfig;
  const range = getAttackRange(combatant, state.combatConfig);
  return getEnemies(state, combatant)
    .filter((enemy) => enemy.position !== undefined)
    .filter((enemy) => isWithinRange(combatant, enemy, range, arena))
    .sort((a, b) => getDistance(combatant, a, arena) - getDistance(combatant, b, arena));
}

export function canAttack(state: CombatState, combatant: Combatant): boolean {
  return getEnemiesInRange(state, combatant).length > 0;
}

// ===== Movimento =====

export function isInsideArena(
  position: CombatantPosition,
  arena: CombatArenaConfig,
): boolean {
  return (
    position.step >= 0 &&
    position.step < arena.laneLength &&
    position.lane >= 0 &&
    position.lane < arena.laneCount
  );
}

export function isPositionOccupied(
  state: CombatState,
  position: CombatantPosition,
): boolean {
  return state.combatants.some(
    (c) =>
      c.position !== undefined &&
      c.position.lane === position.lane &&
      c.position.step === position.step,
  );
}

// O que o combatente quer fazer com a distância até o inimigo mais próximo.
export function getMoveIntent(
  state: CombatState,
  combatant: Combatant,
): MoveIntent {
  const { combatConfig } = state;
  const enemy = getClosestEnemy(
    combatant,
    getEnemies(state, combatant),
    combatConfig.arena,
  );
  if (enemy === undefined) return "hold";

  const distance = getDistance(combatant, enemy, combatConfig.arena);
  const range = getAttackRange(combatant, combatConfig);

  if (distance > range) return "approach";
  const isRanged = combatant.equipments.weapon.range !== "short";
  if (isRanged && distance < range - combatConfig.rangedFleeMargin) {
    return "flee";
  }
  return "hold";
}

// Quantos inimigos estão na metade da arena para onde a direção aponta.
// Quem está exatamente no meio não conta para nenhum lado.
export function countEnemiesOnSide(
  state: CombatState,
  combatant: Combatant,
  direction: -1 | 1,
): number {
  const middle = (state.combatConfig.arena.laneLength - 1) / 2;
  return getEnemies(state, combatant).filter((enemy) => {
    if (enemy.position === undefined) return false;
    return direction === -1
      ? enemy.position.step < middle
      : enemy.position.step > middle;
  }).length;
}

// Para onde o combatente anda neste turno (0 = fica parado).
export function getMoveDirection(
  state: CombatState,
  combatant: Combatant,
): StepDirection {
  const { arena } = state.combatConfig;
  const enemy = getClosestEnemy(combatant, getEnemies(state, combatant), arena);
  if (
    enemy === undefined ||
    enemy.position === undefined ||
    combatant.position === undefined
  ) {
    return 0;
  }

  const intent = getMoveIntent(state, combatant);
  const towardEnemy = Math.sign(
    enemy.position.step - combatant.position.step,
  ) as StepDirection;

  if (intent === "hold") return 0;
  if (intent === "approach") return towardEnemy;

  // Fugir: mantém a direção de quem já virou na parede; senão, para longe do inimigo.
  // No mesmo passo (outra fila), foge para o lado com menos inimigos.
  const away =
    combatant.fleeDirection ??
    (towardEnemy !== 0
      ? (-towardEnemy as -1 | 1)
      : getSideWithFewerEnemies(state, combatant));

  const next = { ...combatant.position, step: combatant.position.step + away };
  if (isInsideArena(next, arena)) return away;

  // Bateu na parede: tenta o outro lado, desde que lá tenha menos inimigos
  // e nenhum inimigo na própria fila feche o caminho.
  const other = -away as -1 | 1;
  if (
    countEnemiesOnSide(state, combatant, other) <
      countEnemiesOnSide(state, combatant, away) &&
    !isLaneBlockedByEnemy(state, combatant, other)
  ) {
    return other;
  }
  return 0;
}

// Tem algum inimigo na mesma fila, na direção indicada? Ninguém atravessa ninguém na mesma fila.
export function isLaneBlockedByEnemy(
  state: CombatState,
  combatant: Combatant,
  direction: -1 | 1,
): boolean {
  const position = combatant.position;
  if (position === undefined) return false;
  return getEnemies(state, combatant).some(
    (enemy) =>
      enemy.position !== undefined &&
      enemy.position.lane === position.lane &&
      Math.sign(enemy.position.step - position.step) === direction,
  );
}

// Empate: vai para o lado com mais espaço até a parede.
function getSideWithFewerEnemies(
  state: CombatState,
  combatant: Combatant,
): -1 | 1 {
  const left = countEnemiesOnSide(state, combatant, -1);
  const right = countEnemiesOnSide(state, combatant, 1);
  if (left !== right) return left < right ? -1 : 1;

  const step = combatant.position?.step ?? 0;
  const lastStep = state.combatConfig.arena.laneLength - 1;
  return step > lastStep - step ? -1 : 1;
}

// Um passo na própria fila. Se sair da arena, fica onde está.
export function moveStep(
  combatant: Combatant,
  direction: StepDirection,
  arena: CombatArenaConfig,
): Combatant {
  if (combatant.position === undefined || direction === 0) return combatant;
  const next = { ...combatant.position, step: combatant.position.step + direction };
  if (!isInsideArena(next, arena)) return combatant;
  return { ...combatant, position: next };
}

// O passo automático do começo do turno: decide a direção e anda, se o quadrado estiver vazio.
// Quem está fugindo guarda a direção do passo; quem para de fugir esquece.
export function move(state: CombatState, combatantId: string): CombatState {
  const combatant = state.combatants.find((c) => c.id === combatantId);
  if (combatant === undefined) return state;

  const isFleeing = getMoveIntent(state, combatant) === "flee";
  const direction = getMoveDirection(state, combatant);
  const stepped = moveStep(combatant, direction, state.combatConfig.arena);
  const canStep =
    stepped !== combatant && !isPositionOccupied(state, stepped.position!);

  const moved: Combatant = {
    ...(canStep ? stepped : combatant),
    fleeDirection: isFleeing && direction !== 0 ? direction : undefined,
  };

  return {
    ...state,
    combatants: state.combatants.map((c) => (c.id === combatantId ? moved : c)),
  };
}
