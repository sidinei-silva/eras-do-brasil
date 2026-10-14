// A arena: 3 filas com os passos marcados e os combatentes por cima.
// Só desenha o estado; quem decide para onde cada um anda é o core.
// A posição muda com transição de CSS, então dá para ver o passo acontecendo.

import {
  getAttackRange,
  getDistance,
  getMoveDirection,
  getMoveIntent,
  type CombatState,
  type Combatant,
} from "core";
import { cn } from "cn";
import { RANGE_LABEL, type Roster } from "./scenarios";

const INTENT_LABEL = {
  approach: "Aproximar",
  flee: "Fugir",
  hold: "Parado",
} as const;

function intentChip(state: CombatState, combatant: Combatant) {
  const intent = getMoveIntent(state, combatant);
  const direction = getMoveDirection(state, combatant);
  const arrow = direction === 1 ? "→ " : direction === -1 ? "← " : "· ";
  return { intent, text: arrow + INTENT_LABEL[intent] };
}

export function Arena({
  state,
  roster,
}: {
  state: CombatState;
  roster: Roster;
}) {
  const { laneCount, laneLength } = state.combatConfig.arena;
  const active = state.combatants.find((c) => c.id === state.activeCombatantId);
  const activeRange = active ? getAttackRange(active, state.combatConfig) : 0;

  const inActiveRange = (lane: number, step: number) =>
    active?.position !== undefined &&
    getDistance(active, { ...active, position: { lane, step } }, state.combatConfig.arena) <=
      activeRange;

  const left = (step: number) => `${((step + 0.5) / laneLength) * 100}%`;
  const top = (lane: number) => `${((lane + 0.5) / laneCount) * 100}%`;

  return (
    <div className="relative h-[460px] overflow-hidden rounded-xl border bg-card px-12 pb-6 sm:h-[520px]">
      <div className="relative h-full">
        {Array.from({ length: laneCount }, (_, lane) => (
          <div
            key={lane}
            className="absolute inset-x-0 flex -translate-y-1/2 gap-1"
            style={{ top: top(lane) }}
          >
            <span className="absolute -left-10 top-1/2 -translate-y-1/2 font-mono text-[11px] text-muted-foreground">
              F{lane}
            </span>
            {Array.from({ length: laneLength }, (_, step) => (
              <div
                key={step}
                className={cn(
                  "relative h-14 flex-1 rounded-md border border-dashed border-border/70",
                  inActiveRange(lane, step) && "bg-amber-500/[0.07]",
                )}
              >
                {lane === laneCount - 1 && (
                  <span className="absolute -bottom-11 left-1/2 -translate-x-1/2 font-mono text-[11px] text-muted-foreground">
                    {step}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}

        {state.combatants.map((combatant) => {
          if (!combatant.position) return null;
          const isPlayer = combatant.spawnSide === "left";
          const isActive = combatant.id === state.activeCombatantId;
          const chip = intentChip(state, combatant);
          const range = combatant.equipments.weapon.range;

          return (
            <div
              key={combatant.id}
              title={`${roster[combatant.id]?.name} · ${roster[combatant.id]?.weapon}`}
              className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center transition-[left,top] duration-300 ease-out"
              style={{ left: left(combatant.position.step), top: top(combatant.position.lane) }}
            >
              <span
                className={cn(
                  "absolute -top-7 whitespace-nowrap rounded-md border px-1.5 py-px font-mono text-[11px]",
                  chip.intent === "flee"
                    ? "border-sky-500/50 bg-sky-500/10 text-sky-300"
                    : "border-border bg-muted text-muted-foreground",
                )}
              >
                {chip.text}
              </span>
              <div
                className={cn(
                  "flex size-11 items-center justify-center rounded-full border-2 font-mono text-sm font-bold",
                  isPlayer
                    ? "border-zinc-100 bg-zinc-100 text-zinc-900"
                    : "border-zinc-500 bg-zinc-900 text-zinc-100",
                  isActive && "ring-3 ring-amber-400 ring-offset-2 ring-offset-card",
                )}
              >
                {combatant.id}
              </div>
              <span className="absolute -bottom-6 whitespace-nowrap font-mono text-[10px] text-muted-foreground">
                {RANGE_LABEL[range]} · {state.combatConfig.weaponRangeSteps[range]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
