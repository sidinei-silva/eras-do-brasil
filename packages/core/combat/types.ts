// o que é um combatente, o estado da luta, uma ação e um evento
//  Combatente, EstadoDaLuta, Acao, Evento

export type BaseEquipment = {
  id: string;
  name: string;
  tier: number;
};

export type WeaponRange = "medium" | "long" | "short";
// Só quem ataca à distância foge; o curto nunca foge.
export type RangedWeaponRange = Exclude<WeaponRange, "short">;

export type Weapon = BaseEquipment & {
  range: WeaponRange;
};
export type Armor = BaseEquipment & {};
export type SecondaryWeapon = BaseEquipment & {};

export type Equipments = {
  head: Armor;
  body: Armor;
  feet: Armor;
  weapon: Weapon;
  secondaryWeapon: SecondaryWeapon;
};

export type CombatantPosition = {
  lane: number;
  step: number;
};

export type Combatant = {
  id: string;
  spawnSide: "left" | "right";
  equipments: Equipments;
  position?: CombatantPosition;
  // Direção em que está fugindo depois de bater na parede; some quando para de fugir.
  fleeDirection?: -1 | 1;
};

export type CombatArenaConfig = {
  laneCount: number;
  laneLength: number;
  oppositeLanePenalty: number;
};

export type CombatConfig = {
  turnTimeLimitMs: number;
  rangedPointBlankPenalty: number;
  // Alcance de ataque, em passos, de cada tipo de arma.
  weaponRangeSteps: Record<WeaponRange, number>;
  // Por arma à distância: quantos passos abaixo do alcance ela aceita antes de fugir.
  rangedFleeMargin: Record<RangedWeaponRange, number>;
  arena: CombatArenaConfig;
};

export type CombatState = {
  combatants: Combatant[];
  combatConfig: CombatConfig;
  currentTurn: number;
  activeCombatantId: string;
};

// Uma ação por vez; cada uma encerra a vez de quem age. Por enquanto só existe passar.
export type Action = { type: "pass" };
