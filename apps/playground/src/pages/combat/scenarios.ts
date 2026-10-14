// Cenários de teste do combate, montados com os dados de data/.
// Aqui só tem dado (quem luta, onde começa, com que arma). Regra nenhuma: quem decide é o core.

import mobsData from "@data/mvp/mobs.json";
import weaponsData from "@data/shared/weapons.json";
import type {
  Armor,
  CombatConfig,
  CombatState,
  Combatant,
  RangedWeaponRange,
  WeaponRange,
} from "core";

// As armas de data/ ainda não têm alcance. Até terem, o alcance sai da árvore da arma.
const RANGE_BY_TREE: Record<string, WeaponRange> = {
  "tree-fisico": "short",
  "tree-magico": "medium",
  "tree-projetil": "long",
};

export const RANGE_LABEL: Record<WeaponRange, string> = {
  short: "curto",
  medium: "médio",
  long: "longo",
};

export type PlayerWeapon = {
  id: string;
  name: string;
  range: WeaponRange;
};

// Só as armas iniciais de T1 e T2 que têm alcance conhecido.
export const PLAYER_WEAPONS: PlayerWeapon[] = weaponsData.weapons
  .filter((w) => w.starter && w.treeId in RANGE_BY_TREE)
  .map((w) => ({ id: w.id, name: w.name, range: RANGE_BY_TREE[w.treeId] }));

const mobName = (id: string) =>
  mobsData.mobs.find((m) => m.id === id)?.name ?? id;

export type ArenaSettings = {
  laneLength: number;
  oppositeLanePenalty: number;
  rangeSteps: Record<WeaponRange, number>;
  rangedFleeMargin: Record<RangedWeaponRange, number>;
  // [sobra] [jogador] ---- distância inicial ---- [mobs da frente] [mobs de trás] [sobra]
  spawnBackSpace: number;
  startDistance: number;
};

// Valores achados simulando 1 ranged contra 1 corpo a corpo (rascunho em combate.md):
// margem = alcance − 2 faz o ranged fugir só colado; distância 3 dá 2 ataques grátis ao ranged.
export const DEFAULT_SETTINGS: ArenaSettings = {
  laneLength: 9,
  oppositeLanePenalty: 1,
  rangeSteps: { short: 1, medium: 3, long: 5 },
  rangedFleeMargin: { medium: 1, long: 3 },
  spawnBackSpace: 2,
  startDistance: 3,
};

// depth: 0 = linha da frente; 1 = um passo atrás dela.
type MobSetup = { mobId: string; range: WeaponRange; lane: number; depth: number };

export type Scenario = {
  key: string;
  label: string;
  description: string;
  playerLane: number;
  mobs: MobSetup[];
};

export const SCENARIOS: Scenario[] = [
  {
    key: "perseguicao",
    label: "Perseguição",
    description: "Mob corpo a corpo na fila de cima.",
    playerLane: 1,
    mobs: [{ mobId: "mob-caranguejo-da-beira", range: "short", lane: 0, depth: 0 }],
  },
  {
    key: "encurralado",
    label: "Mesma fila",
    description: "Os dois na mesma fila: ninguém atravessa ninguém.",
    playerLane: 1,
    mobs: [{ mobId: "mob-caranguejo-da-beira", range: "short", lane: 1, depth: 0 }],
  },
  {
    key: "dois",
    label: "Dois corpo a corpo",
    description: "Um mob na fila de cima e outro atrás, na fila do jogador.",
    playerLane: 1,
    mobs: [
      { mobId: "mob-caranguejo-da-beira", range: "short", lane: 0, depth: 0 },
      { mobId: "mob-cascalho-vivo", range: "short", lane: 1, depth: 1 },
    ],
  },
  {
    key: "tres-filas",
    label: "3 filas",
    description: "Um mob por fila; o chefe vem na fila central.",
    playerLane: 1,
    mobs: [
      { mobId: "mob-caranguejo-da-beira", range: "short", lane: 0, depth: 0 },
      { mobId: "mob-o-primeiro-perdido", range: "short", lane: 1, depth: 0 },
      { mobId: "mob-cascalho-vivo", range: "medium", lane: 2, depth: 0 },
    ],
  },
];

const NO_ARMOR: Armor = { id: "none", name: "—", tier: 1 };

function combatant(
  id: string,
  side: "left" | "right",
  weapon: { id: string; name: string; range: WeaponRange },
  lane: number,
  step: number,
): Combatant {
  return {
    id,
    spawnSide: side,
    equipments: {
      head: NO_ARMOR,
      body: NO_ARMOR,
      feet: NO_ARMOR,
      secondaryWeapon: NO_ARMOR,
      weapon: { ...weapon, tier: 1 },
    },
    position: { lane, step },
  };
}

// Nome para mostrar na tela; o core só conhece o id.
export type Roster = Record<string, { name: string; weapon: string }>;

// Monta o estado já com as posições do cenário, sem passar pelo spawn do core
// (o spawn ainda põe todos os mobs no mesmo passo).
export function buildScenario(
  scenario: Scenario,
  weapon: PlayerWeapon,
  settings: ArenaSettings,
): { state: CombatState; roster: Roster } {
  const config: CombatConfig = {
    turnTimeLimitMs: 1000,
    rangedPointBlankPenalty: 1,
    weaponRangeSteps: settings.rangeSteps,
    rangedFleeMargin: settings.rangedFleeMargin,
    arena: {
      laneCount: 3,
      laneLength: settings.laneLength,
      oppositeLanePenalty: settings.oppositeLanePenalty,
    },
  };

  const lastStep = settings.laneLength - 1;
  const clamp = (step: number) => Math.max(0, Math.min(step, lastStep));
  const playerStep = clamp(settings.spawnBackSpace);
  const mobStep = (depth: number) => clamp(playerStep + settings.startDistance + depth);

  const roster: Roster = { J: { name: "Jogador", weapon: weapon.name } };
  const combatants = [
    combatant("J", "left", weapon, scenario.playerLane, playerStep),
    ...scenario.mobs.map((mob, i) => {
      const id = `M${i + 1}`;
      const label = `Ataque ${RANGE_LABEL[mob.range]}`;
      roster[id] = { name: mobName(mob.mobId), weapon: label };
      return combatant(
        id,
        "right",
        { id: `${mob.mobId}-attack`, name: label, range: mob.range },
        mob.lane,
        mobStep(mob.depth),
      );
    }),
  ];

  return {
    state: {
      combatants,
      combatConfig: config,
      currentTurn: 0,
      activeCombatantId: "J",
    },
    roster,
  };
}
