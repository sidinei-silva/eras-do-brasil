//  fábricas: um combatente, um mob, uma luta pronta

import { initializeCombat } from "./combat/fight";
import {
  Armor,
  Combatant,
  CombatConfig,
  CombatState,
  Equipments,
  SecondaryWeapon,
  Weapon,
  WeaponRange,
} from "./combat/types";

export function generateRandomWeapon(): Weapon {
  const weapons: Weapon[] = [
    { id: "w1", name: "Espada", tier: 1, range: "short" },
    { id: "w2", name: "Arco", tier: 1, range: "long" },
    { id: "w3", name: "Cajado", tier: 1, range: "medium" },
  ];
  return weapons[Math.floor(Math.random() * weapons.length)];
}

export function generateRandomHeadArmor(): Armor {
  const headArmors: Armor[] = [
    { id: "h1", name: "Capacete", tier: 1 },
    { id: "h2", name: "Elmo", tier: 1 },
  ];
  return headArmors[Math.floor(Math.random() * headArmors.length)];
}

export function generateRandomBodyArmor(): Armor {
  const bodyArmors: Armor[] = [
    { id: "b1", name: "Armadura de Peito", tier: 1 },
    { id: "b2", name: "Cota de Malha", tier: 1 },
  ];
  return bodyArmors[Math.floor(Math.random() * bodyArmors.length)];
}

export function generateRandomFeetArmor(): Armor {
  const feetArmors: Armor[] = [
    { id: "f1", name: "Botas", tier: 1 },
    { id: "f2", name: "Grevas", tier: 1 },
  ];
  return feetArmors[Math.floor(Math.random() * feetArmors.length)];
}

export function generateRandomSecondaryWeapon(): SecondaryWeapon {
  const secondaryWeapons = [
    { id: "sw1", name: "Escudo", tier: 1 },
    { id: "sw2", name: "Adaga", tier: 1 },
  ];
  return secondaryWeapons[Math.floor(Math.random() * secondaryWeapons.length)];
}

export function generateRandomEquipments(): Equipments {
  const weapon = generateRandomWeapon();
  const head = generateRandomHeadArmor();
  const body = generateRandomBodyArmor();
  const feet = generateRandomFeetArmor();
  const secondaryWeapon = generateRandomSecondaryWeapon();

  return {
    body: body,
    head: head,
    feet: feet,
    weapon: weapon,
    secondaryWeapon: secondaryWeapon,
  };
}

export function createCombatant(
  id: string,
  spawnSide: "left" | "right",
): Combatant {
  return {
    id: id,
    spawnSide: spawnSide,
    equipments: generateRandomEquipments(),
  };
}

export function createAlly(id: string): Combatant {
  return createCombatant(id, "left");
}

export function createMob(id: string): Combatant {
  return createCombatant(id, "right");
}

export type CombatScenario = {
  mobsCount?: number;
  laneCount?: number;
  laneLength?: number;
};

// Monta uma luta pronta; cada teste sobrescreve só o que importa para o cenário.
export function createCombatState({
  mobsCount = 1,
  laneCount = 1,
  laneLength = 11,
}: CombatScenario = {}): CombatState {
  const mobs: Combatant[] = [];
  for (let i = 0; i < mobsCount; i++) {
    mobs.push(createMob(`mob-${i + 1}`));
  }
  const combatants: Combatant[] = [createAlly("1"), ...mobs];

  return initializeCombat(createCombatConfig(laneCount, laneLength), combatants);
}

export function createCombatConfig(
  laneCount: number,
  laneLength: number,
): CombatConfig {
  return {
    turnTimeLimitMs: 1000,
    rangedPointBlankPenalty: 1,
    weaponRangeSteps: { short: 1, medium: 3, long: 5 },
    rangedFleeMargin: 1,
    arena: {
      laneCount,
      laneLength,
      oppositeLanePenalty: 1,
    },
  };
}

export type CombatantSetup = {
  id: string;
  side: "left" | "right";
  range: WeaponRange;
  lane: number;
  step: number;
};

// Monta uma luta com cada combatente já posicionado, sem passar pelo spawn.
// A vez começa com o primeiro da lista.
export function createPositionedCombatState({
  laneCount = 3,
  laneLength = 11,
  combatants,
}: {
  laneCount?: number;
  laneLength?: number;
  combatants: CombatantSetup[];
}): CombatState {
  return {
    combatants: combatants.map(({ id, side, range, lane, step }) => {
      const combatant = createCombatant(id, side);
      return {
        ...combatant,
        equipments: {
          ...combatant.equipments,
          weapon: { ...combatant.equipments.weapon, range },
        },
        position: { lane, step },
      };
    }),
    combatConfig: createCombatConfig(laneCount, laneLength),
    currentTurn: 0,
    activeCombatantId: combatants[0].id,
  };
}

export function findCombatant(state: CombatState, id: string): Combatant {
  const combatant = state.combatants.find((c) => c.id === id);
  if (combatant === undefined) throw new Error(`Combatant ${id} not found.`);
  return combatant;
}

export function getAllies(state: CombatState): Combatant[] {
  return state.combatants.filter((combatant) => combatant.spawnSide === "left");
}

export function getMobs(state: CombatState): Combatant[] {
  return state.combatants.filter(
    (combatant) => combatant.spawnSide === "right",
  );
}
