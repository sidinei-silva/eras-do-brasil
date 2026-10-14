// Organização: Funcionalidade > Dado (cenário) > Quando (ação) > Então (resultado).
// Para um cenário novo, adicione um "Dado" dentro da funcionalidade certa;
// para um resultado novo do mesmo cenário, adicione um "Então" no "Quando" existente.
// Convenção dos cenários: R = ranged (aliado, esquerda), M/N = corpo a corpo (mobs, direita).
// Alcances da fixture: curto 1, médio 3, longo 5; o ranged foge com mais de 1 passo dentro do alcance.

import { describe, expect, it } from "vitest";
import {
  CombatantSetup,
  createCombatState,
  createPositionedCombatState,
  findCombatant,
  getAllies,
  getMobs,
} from "../teste-utils";
import {
  canAttack,
  getClosestEnemy,
  getDistance,
  getEnemiesInRange,
  getMoveIntent,
  move,
  moveStep,
} from "./position";
import { CombatState } from "./types";

const ranged = (range: "medium" | "long", step: number, lane = 1): CombatantSetup => ({
  id: "R",
  side: "left",
  range,
  lane,
  step,
});
const melee = (id: string, step: number, lane = 1): CombatantSetup => ({
  id,
  side: "right",
  range: "short",
  lane,
  step,
});

function stepOf(state: CombatState, id: string) {
  return findCombatant(state, id).position?.step;
}

describe("Distância", () => {
  describe("Dado um aliado e um mob na mesma fila, nos passos 2 e 9", () => {
    describe("Quando a distância entre eles é calculada", () => {
      it("Então é 7, a diferença de passos", () => {
        const state = createCombatState({ laneCount: 1, laneLength: 11 });
        const [ally] = getAllies(state);
        const [mob] = getMobs(state);

        expect(getDistance(ally, mob, state.combatConfig.arena)).toBe(7);
      });
    });
  });

  describe("Dado um aliado e um mob em filas vizinhas, nos passos 2 e 5", () => {
    describe("Quando a distância entre eles é calculada", () => {
      it("Então a fila vizinha não soma na distância", () => {
        const state = createPositionedCombatState({
          combatants: [ranged("long", 2, 1), melee("M", 5, 0)],
        });
        const { arena } = state.combatConfig;

        expect(getDistance(findCombatant(state, "R"), findCombatant(state, "M"), arena)).toBe(3);
      });
    });
  });

  describe("Dado um aliado e um mob em filas opostas, nos passos 2 e 5", () => {
    describe("Quando a distância entre eles é calculada", () => {
      it("Então a fila oposta soma +1 na distância", () => {
        const state = createPositionedCombatState({
          combatants: [ranged("long", 2, 0), melee("M", 5, 2)],
        });
        const { arena } = state.combatConfig;

        expect(getDistance(findCombatant(state, "R"), findCombatant(state, "M"), arena)).toBe(4);
      });
    });
  });

  describe("Dado dois mobs nos passos 5 e 8", () => {
    describe("Quando o inimigo mais próximo é buscado", () => {
      it("Então é o do passo 5", () => {
        const state = createPositionedCombatState({
          combatants: [ranged("long", 2), melee("M", 8), melee("N", 5, 0)],
        });

        const closest = getClosestEnemy(
          findCombatant(state, "R"),
          getMobs(state),
          state.combatConfig.arena,
        );

        expect(closest?.id).toBe("N");
      });
    });
  });
});

describe("Pode atacar", () => {
  describe("Dado um corpo a corpo a 1 passo do inimigo", () => {
    it("Então pode atacar", () => {
      const state = createPositionedCombatState({
        combatants: [melee("M", 3), ranged("long", 2)],
      });

      expect(canAttack(state, findCombatant(state, "M"))).toBe(true);
    });
  });

  describe("Dado um corpo a corpo a 2 passos do inimigo", () => {
    it("Então não pode atacar", () => {
      const state = createPositionedCombatState({
        combatants: [melee("M", 4), ranged("long", 2)],
      });

      expect(canAttack(state, findCombatant(state, "M"))).toBe(false);
    });
  });

  describe("Dado um ranged longo (alcance 5) com mobs a 3 e a 6 passos", () => {
    it("Então só alcança o de 3 passos", () => {
      const state = createPositionedCombatState({
        combatants: [ranged("long", 2), melee("M", 8), melee("N", 5, 0)],
      });

      const inRange = getEnemiesInRange(state, findCombatant(state, "R"));

      expect(inRange.map((c) => c.id)).toEqual(["N"]);
    });
  });

  describe("Dado um mob na fila oposta, no mesmo passo", () => {
    it("Então a fila oposta soma +1, a distância fica 1 e o corpo a corpo alcança", () => {
      const state = createPositionedCombatState({
        combatants: [melee("M", 4, 0), ranged("long", 4, 2)],
      });

      expect(canAttack(state, findCombatant(state, "M"))).toBe(true);
      expect(getDistance(findCombatant(state, "M"), findCombatant(state, "R"), state.combatConfig.arena)).toBe(1);
    });
  });
});

describe("Movimentação", () => {
  describe("Corpo a corpo", () => {
    describe("Dado um corpo a corpo fora do alcance", () => {
      describe("Quando ele anda", () => {
        it("Então avança 1 passo em direção ao inimigo", () => {
          const state = createPositionedCombatState({
            combatants: [melee("M", 8), ranged("long", 2)],
          });

          expect(stepOf(move(state, "M"), "M")).toBe(7);
        });
      });
    });

    describe("Dado um corpo a corpo já ao alcance (1 passo)", () => {
      describe("Quando ele anda", () => {
        it("Então fica parado", () => {
          const state = createPositionedCombatState({
            combatants: [melee("M", 3), ranged("long", 2)],
          });

          expect(stepOf(move(state, "M"), "M")).toBe(3);
        });
      });
    });

    describe("Dado um corpo a corpo com outro mob no quadrado da frente", () => {
      describe("Quando ele anda", () => {
        it("Então não ocupa o quadrado e fica parado", () => {
          const state = createPositionedCombatState({
            combatants: [melee("M", 8), melee("N", 7), ranged("long", 2)],
          });

          expect(stepOf(move(state, "M"), "M")).toBe(8);
        });
      });
    });
  });

  describe("Média e longa distância", () => {
    describe("Dado um ranged longo (alcance 5) a 7 passos do inimigo", () => {
      it("Então quer se aproximar e avança 1 passo", () => {
        const state = createPositionedCombatState({
          combatants: [ranged("long", 2), melee("M", 9)],
        });

        expect(getMoveIntent(state, findCombatant(state, "R"))).toBe("approach");
        expect(stepOf(move(state, "R"), "R")).toBe(3);
      });
    });

    describe.each([5, 4])(
      "Dado um ranged longo a %i passos do inimigo (no limite ou 1 dentro)",
      (distance) => {
        it("Então fica parado", () => {
          const state = createPositionedCombatState({
            combatants: [ranged("long", 2), melee("M", 2 + distance)],
          });

          expect(getMoveIntent(state, findCombatant(state, "R"))).toBe("hold");
          expect(stepOf(move(state, "R"), "R")).toBe(2);
        });
      },
    );

    describe("Dado um ranged longo a 3 passos do inimigo (perto demais)", () => {
      it("Então foge 1 passo para longe do inimigo", () => {
        const state = createPositionedCombatState({
          combatants: [ranged("long", 4), melee("M", 7)],
        });

        expect(getMoveIntent(state, findCombatant(state, "R"))).toBe("flee");
        expect(stepOf(move(state, "R"), "R")).toBe(3);
      });
    });

    describe("Dado um ranged médio (alcance 3) a 1 passo do inimigo", () => {
      it("Então foge; a 2 passos, fica parado", () => {
        const close = createPositionedCombatState({
          combatants: [ranged("medium", 4), melee("M", 5)],
        });
        const ok = createPositionedCombatState({
          combatants: [ranged("medium", 4), melee("M", 6)],
        });

        expect(getMoveIntent(close, findCombatant(close, "R"))).toBe("flee");
        expect(getMoveIntent(ok, findCombatant(ok, "R"))).toBe("hold");
      });
    });

    describe("Dado um ranged fugindo encostado na parede", () => {
      describe("E o outro lado tem menos inimigos e a fila está livre", () => {
        it("Então vira e foge para o outro lado, guardando a direção", () => {
          const state = createPositionedCombatState({
            combatants: [ranged("long", 0, 1), melee("M", 2, 0)],
          });

          const after = move(state, "R");

          expect(stepOf(after, "R")).toBe(1);
          expect(findCombatant(after, "R").fleeDirection).toBe(1);
        });

        it("Então no turno seguinte continua na mesma direção, sem voltar para a parede", () => {
          const state = createPositionedCombatState({
            combatants: [ranged("long", 0, 1), melee("M", 2, 0)],
          });

          const after = move(move(state, "R"), "R");

          expect(stepOf(after, "R")).toBe(2);
        });
      });

      describe("E o outro lado tem mais inimigos", () => {
        it("Então fica parado", () => {
          const state = createPositionedCombatState({
            combatants: [
              ranged("long", 0, 1),
              melee("M", 2, 0),
              melee("N", 7, 0),
              melee("O", 8, 2),
            ],
          });

          expect(stepOf(move(state, "R"), "R")).toBe(0);
        });
      });

      describe("E um inimigo fecha a própria fila", () => {
        it("Então fica parado, porque não atravessa ninguém", () => {
          const state = createPositionedCombatState({
            combatants: [ranged("long", 0, 1), melee("M", 2, 1)],
          });

          expect(stepOf(move(state, "R"), "R")).toBe(0);
        });
      });
    });
  });

  describe("Um passo (moveStep)", () => {
    describe("Dado um combatente no canto da fila", () => {
      it("Então não sai da arena", () => {
        const state = createPositionedCombatState({
          combatants: [ranged("long", 0), melee("M", 5)],
        });
        const r = findCombatant(state, "R");

        expect(moveStep(r, -1, state.combatConfig.arena)).toBe(r);
      });
    });
  });
});
