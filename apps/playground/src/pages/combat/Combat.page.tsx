// Depurador de combate. A página só guarda o histórico de estados e chama o core;
// o ritmo (passo a passo, automático, pular turnos) é do playground, a regra é do core.

import { Button } from "@/components/ui/button";
import { cn } from "cn";
import {
  resolveAction,
  simulateCombat,
  type CombatState,
  type RangedWeaponRange,
  type WeaponRange,
} from "core";
import { ChevronLeft, FastForward, Pause, Play, RotateCcw, StepForward } from "lucide-react";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Arena } from "./Arena";
import { describeTurn, type TurnEvent } from "./events";
import {
  buildScenario,
  DEFAULT_SETTINGS,
  PLAYER_WEAPONS,
  RANGE_LABEL,
  SCENARIOS,
  type ArenaSettings,
  type PlayerWeapon,
  type Roster,
  type Scenario,
} from "./scenarios";

const SKIP_TURNS = 10;

type Setup = { scenario: Scenario; weapon: PlayerWeapon; settings: ArenaSettings };

function start(setup: Setup) {
  const { state, roster } = buildScenario(setup.scenario, setup.weapon, setup.settings);
  return { setup, roster, history: [state] };
}

const DEFAULT_WEAPON =
  PLAYER_WEAPONS.find((w) => w.range === "long") ?? PLAYER_WEAPONS[0];

export function CombatPage() {
  const [fight, setFight] = useState(() =>
    start({ scenario: SCENARIOS[0], weapon: DEFAULT_WEAPON, settings: DEFAULT_SETTINGS }),
  );
  const [auto, setAuto] = useState(false);
  const [delayMs, setDelayMs] = useState(400);
  const [showJson, setShowJson] = useState(false);

  const { setup, roster, history } = fight;
  const current = history[history.length - 1];
  const events = useMemo(
    () => history.slice(1).map((state, i) => describeTurn(history[i], state)),
    [history],
  );

  // Cada turno novo também vai para o console, uma vez só (voltar ou reiniciar não repete).
  const loggedCount = useRef(0);
  useEffect(() => {
    if (events.length < loggedCount.current) loggedCount.current = events.length;
    for (const event of events.slice(loggedCount.current)) {
      console.log(`[combate] ${event.text}`);
    }
    loggedCount.current = events.length;
  }, [events]);

  const restart = (changes: Partial<Setup> = {}) => {
    setAuto(false);
    setFight(start({ ...setup, ...changes }));
  };
  const changeSettings = (changes: Partial<ArenaSettings>) =>
    restart({ settings: { ...setup.settings, ...changes } });

  const advance = (next: (state: CombatState) => CombatState[]) =>
    setFight((f) => ({ ...f, history: [...f.history, ...next(f.history[f.history.length - 1])] }));
  const passTurn = () => advance((s) => [resolveAction(s, { type: "pass" })]);
  const skipTurns = () => advance((s) => simulateCombat(s, SKIP_TURNS));
  const undo = () =>
    setFight((f) => (f.history.length > 1 ? { ...f, history: f.history.slice(0, -1) } : f));

  useEffect(() => {
    if (!auto) return;
    const timer = setInterval(passTurn, delayMs);
    return () => clearInterval(timer);
  }, [auto, delayMs]);

  return (
    <div className="flex flex-col gap-4 px-4">
      <header className="flex flex-wrap items-center gap-3">
        <h1 className="font-mono text-sm font-semibold">combate · depurador</h1>
        <div className="h-6 w-px bg-border" />
        <span className="text-xs text-muted-foreground">Cenário</span>
        <div className="flex flex-wrap gap-1">
          {SCENARIOS.map((scenario) => (
            <Button
              key={scenario.key}
              size="sm"
              variant={scenario.key === setup.scenario.key ? "default" : "outline"}
              onClick={() => restart({ scenario })}
            >
              {scenario.label}
            </Button>
          ))}
        </div>
        <span className="ml-auto font-mono text-xs text-muted-foreground">
          turno {current.currentTurn} · {auto ? "automático" : "manual"}
        </span>
      </header>
      <p className="-mt-2 text-xs text-muted-foreground">{setup.scenario.description}</p>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="flex min-w-0 flex-col gap-4">
          <TurnOrder state={current} roster={roster} />
          <Arena state={current} roster={roster} />
          <ActionBar onPass={passTurn} disabled={auto} />
        </div>

        <div className="flex min-w-0 flex-col gap-4">
          <EventLog lines={events.map((e) => e.text)} />
          <AttackTally events={events} roster={roster} />

          <Panel title="Depuração">
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" onClick={() => restart()}>
                <RotateCcw /> Reiniciar
              </Button>
              <Button variant={auto ? "default" : "outline"} onClick={() => setAuto(!auto)}>
                {auto ? <Pause /> : <Play />} {auto ? "Parar" : "Automático"}
              </Button>
              <Button variant="outline" onClick={undo} disabled={auto || history.length < 2}>
                <ChevronLeft /> Voltar turno
              </Button>
              <Button variant="outline" onClick={skipTurns} disabled={auto}>
                <FastForward /> +{SKIP_TURNS} turnos
              </Button>
            </div>
            <label className="flex items-center gap-3 text-xs text-muted-foreground">
              Velocidade
              <input
                type="range"
                min={100}
                max={1500}
                step={50}
                value={delayMs}
                onChange={(e) => setDelayMs(Number(e.target.value))}
                className="flex-1 accent-amber-400"
              />
              <span className="w-14 text-right font-mono">{delayMs} ms</span>
            </label>
          </Panel>

          <Panel title="Regras (reinicia a luta)">
            <label className="flex items-center justify-between gap-3 text-xs">
              <span className="text-muted-foreground">Arma do jogador</span>
              <select
                value={setup.weapon.id}
                onChange={(e) =>
                  restart({ weapon: PLAYER_WEAPONS.find((w) => w.id === e.target.value)! })
                }
                className="rounded-md border bg-background px-2 py-1"
              >
                {PLAYER_WEAPONS.map((w) => (
                  <option key={w.id} value={w.id}>
                    {w.name} ({RANGE_LABEL[w.range]})
                  </option>
                ))}
              </select>
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["short", "medium", "long"] as WeaponRange[]).map((range) => (
                <NumberField
                  key={range}
                  label={`Alcance ${RANGE_LABEL[range]}`}
                  value={setup.settings.rangeSteps[range]}
                  min={0}
                  onChange={(value) =>
                    changeSettings({ rangeSteps: { ...setup.settings.rangeSteps, [range]: value } })
                  }
                />
              ))}
              {(["medium", "long"] as RangedWeaponRange[]).map((range) => (
                <NumberField
                  key={range}
                  label={`Margem fuga ${RANGE_LABEL[range]}`}
                  value={setup.settings.rangedFleeMargin[range]}
                  min={0}
                  onChange={(value) =>
                    changeSettings({
                      rangedFleeMargin: { ...setup.settings.rangedFleeMargin, [range]: value },
                    })
                  }
                />
              ))}
              <NumberField
                label="Sobra atrás"
                value={setup.settings.spawnBackSpace}
                min={0}
                onChange={(value) => changeSettings({ spawnBackSpace: value })}
              />
              <NumberField
                label="Distância inicial"
                value={setup.settings.startDistance}
                min={1}
                onChange={(value) => changeSettings({ startDistance: value })}
              />
              <NumberField
                label="Passos na fila"
                value={setup.settings.laneLength}
                min={5}
                max={21}
                onChange={(value) => changeSettings({ laneLength: value })}
              />
              <NumberField
                label="Fila oposta +"
                value={setup.settings.oppositeLanePenalty}
                min={0}
                onChange={(value) => changeSettings({ oppositeLanePenalty: value })}
              />
            </div>
          </Panel>

          <Panel
            title="Estado (JSON)"
            action={
              <Button size="xs" variant="ghost" onClick={() => setShowJson(!showJson)}>
                {showJson ? "Ocultar" : "Mostrar"}
              </Button>
            }
          >
            {showJson && (
              <pre className="max-h-72 overflow-auto rounded-md border bg-background p-2 font-mono text-[11px] leading-snug">
                {JSON.stringify(current, null, 2)}
              </pre>
            )}
          </Panel>
        </div>
      </div>
    </div>
  );
}

function TurnOrder({ state, roster }: { state: CombatState; roster: Roster }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto rounded-xl border bg-card p-2">
      <span className="px-1 font-mono text-[11px] text-muted-foreground">ordem</span>
      {state.combatants.map((c) => {
        const isActive = c.id === state.activeCombatantId;
        return (
          <div
            key={c.id}
            className={cn(
              "flex shrink-0 items-center gap-2 rounded-lg border px-2 py-1 text-xs",
              isActive ? "border-amber-400 bg-amber-400/10" : "border-transparent opacity-60",
            )}
          >
            <span className="font-mono font-bold">{c.id}</span>
            <span>{roster[c.id]?.name}</span>
            <span className="text-muted-foreground">{roster[c.id]?.weapon}</span>
          </div>
        );
      })}
    </div>
  );
}

// Só "passar" existe no core por enquanto; o resto da barra fica no lugar, desabilitado.
function ActionBar({ onPass, disabled }: { onPass: () => void; disabled: boolean }) {
  const soon = "Ainda não existe no core";
  return (
    <div className="flex flex-col gap-2 rounded-xl border bg-card p-3">
      <span className="font-mono text-[11px] text-muted-foreground">
        ações · por enquanto todo mundo só anda e passa
      </span>
      <div className="flex flex-wrap items-center gap-2">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <Button key={n} variant="outline" size="lg" disabled title={soon}>
            Skill {n}
          </Button>
        ))}
        <Button variant="outline" size="lg" disabled title={soon}>
          Ataque normal
        </Button>
        <div className="mx-1 h-7 w-px bg-border" />
        <Button variant="outline" size="lg" disabled title={soon}>
          Usar item
        </Button>
        <Button variant="outline" size="lg" disabled title={soon}>
          Fugir
        </Button>
        <Button size="lg" className="ml-auto" onClick={onPass} disabled={disabled}>
          Passar turno <StepForward />
        </Button>
      </div>
    </div>
  );
}

// Quantas vezes cada um terminou o passo com alguém ao alcance. Mostra quem nunca ataca.
function AttackTally({ events, roster }: { events: TurnEvent[]; roster: Roster }) {
  const rows = Object.entries(roster).map(([id, info]) => {
    const turns = events.filter((e) => e.combatantId === id);
    const attacks = turns.filter((e) => e.canAttack).length;
    const pct = turns.length ? Math.round((attacks / turns.length) * 100) : 0;
    return { id, name: info.name, turns: turns.length, attacks, pct };
  });

  return (
    <Panel title="Quem pode atacar">
      <div className="flex flex-col gap-2">
        {rows.map((row) => (
          <div key={row.id} className="flex items-center gap-2 text-xs">
            <span className="w-7 font-mono font-bold">{row.id}</span>
            <span className="w-32 truncate text-muted-foreground" title={row.name}>
              {row.name}
            </span>
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
              <div
                className={cn("h-full rounded-full", row.attacks === 0 ? "bg-destructive/60" : "bg-amber-400")}
                style={{ width: `${row.pct}%` }}
              />
            </div>
            <span className="w-20 text-right font-mono">
              {row.attacks}/{row.turns} · {row.pct}%
            </span>
          </div>
        ))}
      </div>
    </Panel>
  );
}

function EventLog({ lines }: { lines: string[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight });
  }, [lines.length]);

  return (
    <div className="flex h-72 flex-col rounded-xl border bg-card">
      <div className="flex justify-between border-b px-3 py-2 text-xs font-semibold">
        <span>Diário de eventos</span>
        <span className="font-mono font-normal text-muted-foreground">{lines.length} linhas</span>
      </div>
      <div ref={ref} className="flex-1 overflow-auto px-3 py-2 font-mono text-xs leading-relaxed">
        {lines.length === 0 && (
          <p className="text-muted-foreground">Passe o turno para ver o primeiro passo.</p>
        )}
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap">
            {line}
          </div>
        ))}
      </div>
    </div>
  );
}

function Panel({
  title,
  action,
  children,
}: {
  title: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3 rounded-xl border bg-card p-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}

function NumberField({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  min?: number;
  max?: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="flex flex-col gap-1 text-[11px] text-muted-foreground">
      {label}
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          const next = Number(e.target.value);
          if (e.target.value === "" || !Number.isFinite(next)) return;
          onChange(Math.min(max ?? Infinity, Math.max(min ?? -Infinity, next)));
        }}
        className="rounded-md border bg-background px-2 py-1 font-mono text-sm text-foreground"
      />
    </label>
  );
}
