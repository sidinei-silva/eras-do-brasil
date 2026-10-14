// Lutas inteiras, conferindo o resultado de vários turnos seguidos.
// As peças (spawn, posição) são testadas nos arquivos delas.

import { describe, expect, it } from "vitest";
import {
  createPositionedCombatState,
  findCombatant,
} from "../teste-utils";
import { getDistance } from "./position";
import { resolveAction, simulateCombat } from "./fight";

describe("Luta", () => {
  describe("Resolver ação (resolveAction)", () => {
    describe("Dado a vez do primeiro combatente", () => {
      describe("Quando ele passa", () => {
        const state = createPositionedCombatState({
          combatants: [
            { id: "M", side: "right", range: "short", lane: 1, step: 8 },
            { id: "R", side: "left", range: "long", lane: 1, step: 2 },
          ],
        });
        const after = resolveAction(state, { type: "pass" });

        it("Então ele dá o passo automático", () => {
          expect(findCombatant(after, "M").position?.step).toBe(7);
        });

        it("Então a vez passa para o próximo e o turno avança", () => {
          expect(after.activeCombatantId).toBe("R");
          expect(after.currentTurn).toBe(1);
        });

        it("Então o estado anterior não muda", () => {
          expect(findCombatant(state, "M").position?.step).toBe(8);
        });
      });
    });
  });

  describe("Simular luta (simulateCombat): ranged foge, corpo a corpo persegue", () => {
    describe("Dado 1 fila com o ranged longo no passo 4 e o corpo a corpo no passo 6", () => {
      it("Então o ranged é encurralado na parede e o corpo a corpo chega ao alcance", () => {
        const state = createPositionedCombatState({
          laneCount: 1,
          combatants: [
            { id: "R", side: "left", range: "long", lane: 0, step: 4 },
            { id: "M", side: "right", range: "short", lane: 0, step: 6 },
          ],
        });

        const last = simulateCombat(state, 16).at(-1)!;

        expect(findCombatant(last, "R").position?.step).toBe(0);
        expect(findCombatant(last, "M").position?.step).toBe(1);
      });
    });

    describe("Dado 3 filas com o corpo a corpo na fila de cima", () => {
      it("Então o ranged vira na parede e escapa, e o corpo a corpo segue pela diagonal", () => {
        const state = createPositionedCombatState({
          combatants: [
            { id: "R", side: "left", range: "long", lane: 1, step: 4 },
            { id: "M", side: "right", range: "short", lane: 0, step: 6 },
          ],
        });

        const history = simulateCombat(state, 30);
        const steps = history.map((s) => findCombatant(s, "R").position?.step);

        expect(Math.min(...(steps as number[]))).toBe(0);
        expect(steps.at(-1)).toBeGreaterThan(5);
      });

      it("Então o corpo a corpo acompanha: depois de alcançar, nunca fica a mais de 2 passos", () => {
        const state = createPositionedCombatState({
          combatants: [
            { id: "R", side: "left", range: "long", lane: 1, step: 4 },
            { id: "M", side: "right", range: "short", lane: 0, step: 6 },
          ],
        });

        const distances = simulateCombat(state, 40).map((s) =>
          getDistance(findCombatant(s, "R"), findCombatant(s, "M"), s.combatConfig.arena),
        );

        const reached = distances.findIndex((d) => d <= 1);

        expect(reached).toBeGreaterThanOrEqual(0);
        expect(Math.max(...distances.slice(reached))).toBeLessThanOrEqual(2);
      });
    });

    describe("Dado o mesmo estado inicial", () => {
      it("Então a simulação termina sempre igual", () => {
        const create = () =>
          createPositionedCombatState({
            combatants: [
              { id: "R", side: "left", range: "medium", lane: 1, step: 3 },
              { id: "M", side: "right", range: "short", lane: 0, step: 6 },
              { id: "N", side: "right", range: "short", lane: 1, step: 8 },
            ],
          });

        const positions = (s: ReturnType<typeof create>) =>
          s.combatants.map((c) => c.position);

        expect(positions(simulateCombat(create(), 30).at(-1)!)).toEqual(
          positions(simulateCombat(create(), 30).at(-1)!),
        );
      });
    });
  });
});
