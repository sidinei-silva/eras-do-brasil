// o que é um combatente, o estado da luta, uma ação e um evento
//  Combatente, EstadoDaLuta, Acao, Evento

export type BaseEquipment = {
  id: string;
  name: string;
  tier: number;
};

export type WeaponRange = "medium" | "long" | "short";

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
};

export type CombatArenaConfig = {
  laneCount: number;
  laneLength: number;
  oppositeLanePenalty: number;
};

export type CombatConfig = {
  turnTimeLimitMs: number;
  rangedPointBlankPenalty: number;
  arena: CombatArenaConfig;
};

export type CombatState = {
  combatants: Combatant[];
  combatConfig: CombatConfig;
  currentTurn: number;
  activeCombatantId: string;
};
