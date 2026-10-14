// Organização: Funcionalidade > Dado (cenário) > Quando (ação) > Então (resultado).
// Para um cenário novo, adicione um "Dado" dentro da funcionalidade certa;
// para um resultado novo do mesmo cenário, adicione um "Então" no "Quando" existente.
// Convenção dos cenários: R = ranged (aliado, esquerda), M/N = corpo a corpo (mobs, direita).
// Alcances da fixture: curto 1, médio 3, longo 5. Margem de fuga: médio 1, longo 3,
// ou seja, os dois só fogem com o inimigo a 1 passo ou menos.

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
        it("Então não ocupa o quadrado e contorna pela diagonal", () => {
          const state = createPositionedCombatState({
            combatants: [melee("M", 8), melee("N", 7), ranged("long", 2)],
          });

          expect(findCombatant(move(state, "M"), "M").position).toEqual({ lane: 0, step: 7 });
        });
      });
    });

    describe("Frente a frente (rascunho)", () => {
      describe("Dado um corpo a corpo longe, em outra fila", () => {
        it("Então anda na própria fila", () => {
          const state = createPositionedCombatState({
            combatants: [melee("M", 8, 0), ranged("long", 2, 1)],
          });

          expect(findCombatant(move(state, "M"), "M").position).toEqual({ lane: 0, step: 7 });
        });
      });

      describe("Dado um corpo a corpo cujo passo chega ao alcance, vindo da fila vizinha", () => {
        it("Então chega na fila do alvo no mesmo passo (diagonal), sem gastar outro turno", () => {
          const state = createPositionedCombatState({
            combatants: [melee("M", 4, 0), ranged("long", 2, 1)],
          });

          expect(findCombatant(move(state, "M"), "M").position).toEqual({ lane: 1, step: 3 });
        });
      });

      describe("Dado um corpo a corpo a 1 passo do alvo, na fila vizinha", () => {
        it("Então troca para a fila do alvo, ficando frente a frente", () => {
          const state = createPositionedCombatState({
            combatants: [melee("M", 3, 0), ranged("long", 2, 1)],
          });

          const after = move(state, "M");

          expect(findCombatant(after, "M").position).toEqual({ lane: 1, step: 3 });
          expect(getMoveIntent(after, findCombatant(after, "M"))).toBe("hold");
        });
      });

      describe("Dado um mob frente a frente e outro logo atrás, na mesma fila", () => {
        it("Então o de trás vai num passo só para a diagonal da frente do alvo", () => {
          const state = createPositionedCombatState({
            combatants: [melee("M", 3), melee("N", 4), ranged("long", 2)],
          });

          const after = move(state, "N");

          expect(findCombatant(after, "N").position).toEqual({ lane: 0, step: 3 });
          expect(canAttack(after, findCombatant(after, "N"))).toBe(true);
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

    describe.each([5, 4, 3, 2])(
      "Dado um ranged longo a %i passos do inimigo (dentro da margem de fuga)",
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

    describe("Dado um ranged longo a 1 passo do inimigo (perto demais)", () => {
      it("Então foge 1 passo para longe do inimigo", () => {
        const state = createPositionedCombatState({
          combatants: [ranged("long", 4), melee("M", 5)],
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
            combatants: [ranged("long", 0, 1), melee("M", 1, 0)],
          });

          const after = move(state, "R");

          expect(stepOf(after, "R")).toBe(1);
          expect(findCombatant(after, "R").fleeDirection).toBe(1);
        });

        it("Então no turno seguinte continua na mesma direção, sem voltar para a parede", () => {
          const state = createPositionedCombatState({
            combatants: [ranged("long", 0, 1), melee("M", 1, 0)],
          });

          const after = move(move(state, "R"), "R");

          expect(stepOf(after, "R")).toBe(2);
        });
      });

      describe("E do outro lado tem mais inimigos que o alcançam", () => {
        it("Então fica parado", () => {
          // Fila de 7 passos: o meio é o passo 3. M (esquerda) alcança; N e O (direita, longo) também.
          const state = createPositionedCombatState({
            laneLength: 7,
            combatants: [
              ranged("long", 0, 1),
              melee("M", 1, 0),
              { id: "N", side: "right", range: "long", lane: 0, step: 4 },
              { id: "O", side: "right", range: "long", lane: 2, step: 5 },
            ],
          });

          expect(stepOf(move(state, "R"), "R")).toBe(0);
        });
      });

      describe("E do outro lado tem o mesmo número de inimigos que o alcançam", () => {
        it("Então vira", () => {
          const state = createPositionedCombatState({
            laneLength: 7,
            combatants: [
              ranged("long", 0, 1),
              melee("M", 1, 0),
              { id: "N", side: "right", range: "long", lane: 2, step: 4 },
            ],
          });

          expect(stepOf(move(state, "R"), "R")).toBe(1);
        });
      });

      describe("E um inimigo fecha a própria fila", () => {
        it("Então foge pela diagonal, para uma fila vizinha livre", () => {
          const state = createPositionedCombatState({
            combatants: [ranged("long", 0, 1), melee("M", 1, 1)],
          });

          const after = move(state, "R");

          expect(findCombatant(after, "R").position).toEqual({ lane: 0, step: 1 });
          expect(findCombatant(after, "R").fleeDirection).toBe(1);
        });

        it("Então no turno seguinte segue em frente pela fila nova, passando pelo inimigo", () => {
          const state = createPositionedCombatState({
            combatants: [ranged("long", 0, 1), melee("M", 1, 1)],
          });

          const after = move(move(state, "R"), "R");

          expect(findCombatant(after, "R").position).toEqual({ lane: 0, step: 2 });
        });
      });

      describe("E a arena tem 1 fila só, com o inimigo fechando o caminho", () => {
        it("Então fica parado, encurralado", () => {
          const state = createPositionedCombatState({
            laneCount: 1,
            combatants: [ranged("long", 0, 0), melee("M", 1, 0)],
          });

          expect(findCombatant(move(state, "R"), "R").position).toEqual({ lane: 0, step: 0 });
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
