import { describe, expect, it } from "vitest";
import { createCombatState } from "../teste-utils";

describe("Primeiro combate de teste", () => {
  it("Deve iniciar o combate com o state correto", () => {
    const state = createCombatState(2);
    const leftCombatants = state.combatants.filter(
      (combatant) => combatant.spawnSide === "left",
    );
    const rightCombatants = state.combatants.filter(
      (combatant) => combatant.spawnSide === "right",
    );

    expect(state.combatants.length).toBe(3);
    expect(leftCombatants.length).toBe(1);
    expect(rightCombatants.length).toBe(2);
  });
});
