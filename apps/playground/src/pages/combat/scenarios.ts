// Cenários de teste do combate, montados com os dados de data/.
// Aqui só tem dado (quem luta, onde começa, com que arma). Regra nenhuma: quem decide é o core.

import mobsData from "@data/mvp/mobs.json";
import weaponsData from "@data/shared/weapons.json";
import type {
  Armor,
  CombatConfig,
  CombatState,
  Combatant,
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
  rangedFleeMargin: number;
};

export const DEFAULT_SETTINGS: ArenaSettings = {
  laneLength: 11,
  oppositeLanePenalty: 1,
  rangeSteps: { short: 1, medium: 3, long: 5 },
  rangedFleeMargin: 1,
};

type MobSetup = { mobId: string; range: WeaponRange; lane: number; step: number };

export type Scenario = {
  key: string;
  label: string;
  description: string;
  player: { lane: number; step: number };
  mobs: MobSetup[];
};

export const SCENARIOS: Scenario[] = [
  {
    key: "perseguicao",
    label: "Perseguição",
    description: "Mob corpo a corpo na fila de cima, perto do jogador.",
    player: { lane: 1, step: 4 },
    mobs: [{ mobId: "mob-caranguejo-da-beira", range: "short", lane: 0, step: 6 }],
  },
  {
    key: "encurralado",
    label: "Mesma fila",
    description: "Os dois na mesma fila: ninguém atravessa ninguém.",
    player: { lane: 1, step: 4 },
    mobs: [{ mobId: "mob-caranguejo-da-beira", range: "short", lane: 1, step: 6 }],
  },
  {
    key: "dois",
    label: "Dois corpo a corpo",
    description: "Um mob em cada lado da fila do jogador.",
    player: { lane: 1, step: 3 },
    mobs: [
      { mobId: "mob-caranguejo-da-beira", range: "short", lane: 0, step: 6 },
      { mobId: "mob-cascalho-vivo", range: "short", lane: 1, step: 8 },
    ],
  },
  {
    key: "tres-filas",
    label: "3 filas",
    description: "Um mob por fila; o chefe vem na fila central.",
    player: { lane: 1, step: 2 },
    mobs: [
      { mobId: "mob-caranguejo-da-beira", range: "short", lane: 0, step: 8 },
      { mobId: "mob-o-primeiro-perdido", range: "short", lane: 1, step: 8 },
      { mobId: "mob-cascalho-vivo", range: "medium", lane: 2, step: 8 },
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
  const clamp = (step: number) => Math.min(step, lastStep);

  const roster: Roster = { J: { name: "Jogador", weapon: weapon.name } };
  const combatants = [
    combatant("J", "left", weapon, scenario.player.lane, clamp(scenario.player.step)),
    ...scenario.mobs.map((mob, i) => {
      const id = `M${i + 1}`;
      const label = `Ataque ${RANGE_LABEL[mob.range]}`;
      roster[id] = { name: mobName(mob.mobId), weapon: label };
      return combatant(
        id,
        "right",
        { id: `${mob.mobId}-attack`, name: label, range: mob.range },
        mob.lane,
        clamp(mob.step),
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
