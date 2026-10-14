// O que o core exporta para o servidor e o playground.

export { initializeCombat, resolveAction, simulateCombat } from "./combat/fight";
// Consultas sem efeito, para o playground mostrar o que cada combatente quer fazer.
export {
  canAttack,
  getAttackRange,
  getEngageCell,
  getNextPosition,
  getClosestEnemy,
  getEnemies,
  getEnemiesInRange,
  getDistance,
  getMoveDirection,
  getMoveIntent,
} from "./combat/position";
export type { MoveIntent, StepDirection } from "./combat/position";
export * from "./combat/types";
