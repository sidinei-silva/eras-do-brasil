// Tudo sobre a posição na arena.
// Distância: só responde perguntas, sem alterar nada (distância, alcance, inimigo mais próximo).
// Movimento: o passo automático do começo do turno. Cada turno é andar 1 passo na fila;
// trocar de fila não gasta o turno, vai junto com o passo (anda na diagonal). Rascunho.
// - Curta distância (rascunho): vai para a frente do alvo, na fila dele (frente a frente).
//   Fora do alcance, anda na própria fila; o passo que chega ao alcance já entra na fila do alvo.
//   Se a frente do alvo já tem um aliado, fica na diagonal da frente, numa fila vizinha.
//   Bloqueado por alguém na própria fila, contorna pela diagonal.
// - Média e longa: se aproximam até o limite do alcance; se ficarem perto demais
//   (mais de `rangedFleeMargin[alcance]` passos dentro do alcance), fogem.
// - Quem foge e bate na parede vira para o outro lado, a não ser que lá tenha mais inimigos
//   que conseguem atacá-lo. Ele guarda essa direção (fleeDirection) até parar de fugir,
//   para não voltar para a parede no turno seguinte.
// - Quem foge e tem a própria fila fechada à frente foge pela diagonal, para uma fila vizinha livre.
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
  const weaponRange = combatant.equipments.weapon.range;

  // Corpo a corpo: só fica parado quando já está frente a frente (ou sem lugar livre e ao alcance).
  if (weaponRange === "short") {
    const cell = getEngageCell(state, combatant, enemy);
    if (cell === undefined) return distance > range ? "approach" : "hold";
    return samePosition(cell, combatant.position) ? "hold" : "approach";
  }

  if (distance > range) return "approach";
  if (distance < range - combatConfig.rangedFleeMargin[weaponRange]) return "flee";
  return "hold";
}

// Quantos inimigos estão na metade da arena para onde a direção aponta.
// Quem está exatamente no meio não conta para nenhum lado.
// Quantos inimigos que conseguem atacar o combatente estão na metade indicada.
export function countThreatsOnSide(
  state: CombatState,
  combatant: Combatant,
  direction: -1 | 1,
): number {
  const { arena } = state.combatConfig;
  const middle = (arena.laneLength - 1) / 2;
  return getEnemies(state, combatant).filter((enemy) => {
    if (enemy.position === undefined) return false;
    const onSide =
      direction === -1 ? enemy.position.step < middle : enemy.position.step > middle;
    return (
      onSide &&
      isWithinRange(enemy, combatant, getAttackRange(enemy, state.combatConfig), arena)
    );
  }).length;
}

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

  // Bateu na parede: vira, a não ser que do outro lado tenha mais quem o alcança
  // ou não haja caminho (nem na própria fila, nem numa vizinha).
  const other = -away as -1 | 1;
  if (
    countThreatsOnSide(state, combatant, other) <=
      countThreatsOnSide(state, combatant, away) &&
    getFleePosition(state, combatant, other) !== undefined
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

// Onde quem foge vai parar com um passo na direção indicada.
// Fila livre: um passo nela. Fila fechada (quadrado ocupado ou inimigo à frente):
// passo na diagonal, para uma fila vizinha livre e sem inimigo à frente.
// Empate entre as vizinhas: a de cima. Sem saída: undefined (fica parado).
export function getFleePosition(
  state: CombatState,
  combatant: Combatant,
  direction: -1 | 1,
): CombatantPosition | undefined {
  const position = combatant.position;
  if (position === undefined) return undefined;
  const { arena } = state.combatConfig;

  const ahead = { ...position, step: position.step + direction };
  if (!isInsideArena(ahead, arena)) return undefined;
  const laneOpen =
    !isPositionOccupied(state, ahead) &&
    !isLaneBlockedByEnemy(state, combatant, direction);
  if (laneOpen) return ahead;

  for (const lane of [position.lane - 1, position.lane + 1]) {
    const diagonal = { lane, step: position.step + direction };
    if (!isInsideArena(diagonal, arena) || isPositionOccupied(state, diagonal)) continue;
    const inSideLane = { ...combatant, position: { lane, step: position.step } };
    if (!isLaneBlockedByEnemy(state, inSideLane, direction)) return diagonal;
  }

  return undefined;
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

// ===== Corpo a corpo: frente a frente =====

function samePosition(a?: CombatantPosition, b?: CombatantPosition): boolean {
  return a !== undefined && b !== undefined && a.lane === b.lane && a.step === b.step;
}

function isFreeFor(state: CombatState, combatant: Combatant, position: CombatantPosition) {
  return (
    isInsideArena(position, state.combatConfig.arena) &&
    (samePosition(position, combatant.position) || !isPositionOccupied(state, position))
  );
}

// Onde o corpo a corpo quer ficar para atacar o alvo.
// 1º a frente do alvo, na fila dele; 2º a diagonal da frente, numa fila vizinha
// (a mais perto da fila atual; empate: a de cima). Sem lugar livre: undefined.
export function getEngageCell(
  state: CombatState,
  combatant: Combatant,
  target: Combatant,
): CombatantPosition | undefined {
  const me = combatant.position;
  const t = target.position;
  if (me === undefined || t === undefined) return undefined;

  const side = Math.sign(me.step - t.step) || (combatant.spawnSide === "right" ? 1 : -1);
  const front = { lane: t.lane, step: t.step + side };
  const diagonals = [t.lane - 1, t.lane + 1]
    .map((lane) => ({ lane, step: t.step + side }))
    .sort((a, b) => Math.abs(a.lane - me.lane) - Math.abs(b.lane - me.lane));

  return [front, ...diagonals].find((cell) => isFreeFor(state, combatant, cell));
}

function getMeleeNextPosition(
  state: CombatState,
  combatant: Combatant,
): CombatantPosition | undefined {
  const me = combatant.position;
  const { arena } = state.combatConfig;
  const target = getClosestEnemy(combatant, getEnemies(state, combatant), arena);
  if (me === undefined || target?.position === undefined) return undefined;

  const range = getAttackRange(combatant, state.combatConfig);
  const reaches = (position: CombatantPosition) =>
    getDistance({ ...combatant, position }, target, arena) <= range;
  const free = (position: CombatantPosition) =>
    isFreeFor(state, combatant, position) && !samePosition(position, me);

  const goal = getEngageCell(state, combatant, target);
  if (goal === undefined) {
    // Sem lugar livre na frente do alvo: só anda na fila enquanto estiver fora do alcance.
    if (reaches(me)) return undefined;
    const ahead = { ...me, step: me.step + Math.sign(target.position.step - me.step) };
    return free(ahead) ? ahead : undefined;
  }
  if (samePosition(goal, me)) return undefined;

  const ds = Math.sign(goal.step - me.step);
  const dl = Math.sign(goal.lane - me.lane);
  const straight = ds !== 0 ? { ...me, step: me.step + ds } : undefined;
  const diagonal = ds !== 0 && dl !== 0 ? { lane: me.lane + dl, step: me.step + ds } : undefined;
  const laneOnly = dl !== 0 ? { ...me, lane: me.lane + dl } : undefined;
  // Contornar quem bloqueia a própria fila: diagonal para qualquer vizinha (de cima primeiro).
  const around =
    ds !== 0
      ? [me.lane - 1, me.lane + 1].map((lane) => ({ lane, step: me.step + ds }))
      : [];

  // O passo que chega ao alcance já entra na fila do alvo (trocar de fila não gasta o turno).
  if (diagonal && free(diagonal) && reaches(diagonal)) return diagonal;
  if (straight && free(straight)) return straight;
  if (diagonal && free(diagonal)) return diagonal;
  // Já ao alcance e só falta a fila: troca de fila.
  if (laneOnly && free(laneOnly) && reaches(laneOnly)) return laneOnly;
  return around.find(free);
}

// Para onde o combatente vai neste turno; undefined = fica onde está.
export function getNextPosition(
  state: CombatState,
  combatant: Combatant,
): CombatantPosition | undefined {
  if (combatant.equipments.weapon.range === "short") {
    return getMeleeNextPosition(state, combatant);
  }

  const direction = getMoveDirection(state, combatant);
  if (direction === 0) return undefined;
  if (getMoveIntent(state, combatant) === "flee") {
    return getFleePosition(state, combatant, direction);
  }
  const stepped = moveStep(combatant, direction, state.combatConfig.arena);
  if (stepped === combatant || isPositionOccupied(state, stepped.position!)) return undefined;
  return stepped.position;
}

// O passo automático do começo do turno: decide para onde vai e anda (getNextPosition).
// Quem está fugindo guarda a direção do passo; quem para de fugir esquece.
export function move(state: CombatState, combatantId: string): CombatState {
  const combatant = state.combatants.find((c) => c.id === combatantId);
  if (combatant === undefined) return state;

  const isFleeing = getMoveIntent(state, combatant) === "flee";
  const direction = isFleeing ? getMoveDirection(state, combatant) : 0;

  const moved: Combatant = {
    ...combatant,
    position: getNextPosition(state, combatant) ?? combatant.position,
    fleeDirection: isFleeing && direction !== 0 ? direction : undefined,
  };

  return {
    ...state,
    combatants: state.combatants.map((c) => (c.id === combatantId ? moved : c)),
  };
}
