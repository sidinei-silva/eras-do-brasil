// Organização: Funcionalidade > Dado (cenário) > Quando (ação) > Então (resultado).
// Para um cenário novo, adicione um "Dado" dentro da funcionalidade certa;
// para um resultado novo do mesmo cenário, adicione um "Então" no "Quando" existente.

import { beforeEach, describe, expect, it } from "vitest";
import { createCombatState, getAllies, getMobs } from "../teste-utils";
import { CombatState } from "./types";

describe("Início do combate (spawn)", () => {
  describe("Dado uma arena com 1 fila de 11 passos e 1 mob", () => {
    describe("Quando o combate é iniciado", () => {
      let state: CombatState;

      beforeEach(() => {
        state = createCombatState({
          laneCount: 1,
          laneLength: 11,
          mobsCount: 1,
        });
      });

      it("Então há 1 aliado e 1 mob", () => {
        expect(getAllies(state)).toHaveLength(1);
        expect(getMobs(state)).toHaveLength(1);
      });

      it("Então o aliado nasce no passo 2, a 2 passos do canto esquerdo", () => {
        expect(getAllies(state)[0].position).toEqual({ lane: 0, step: 2 });
      });

      it("Então o mob nasce no passo 9, a 2 passos do canto direito", () => {
        expect(getMobs(state)[0].position).toEqual({ lane: 0, step: 9 });
      });
    });
  });

  describe("Dado uma arena com 1 fila de 11 passos e 2 mobs", () => {
    describe("Quando o combate é iniciado", () => {
      let state: CombatState;

      beforeEach(() => {
        state = createCombatState({
          laneCount: 1,
          laneLength: 11,
          mobsCount: 2,
        });
      });

      it("Então há 1 aliado e 2 mobs", () => {
        expect(getAllies(state)).toHaveLength(1);
        expect(getMobs(state)).toHaveLength(2);
      });

      it.todo(
        "Então os 2 mobs nascem no lado direito sem ocupar o mesmo passo",
      );
    });
  });

  describe("Dado uma arena com 3 filas", () => {
    describe("Quando o combate é iniciado", () => {
      it.todo("Então o aliado nasce na fila central, no canto esquerdo");
      it.todo(
        "Então cada mob nasce em uma das 3 filas, conforme o algoritmo de spawn",
      );
      it.todo("Então elite e boss nascem sempre na fila central");
    });
  });
});
