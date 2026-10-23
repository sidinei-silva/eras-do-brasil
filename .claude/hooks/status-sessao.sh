#!/usr/bin/env bash
# Roda ao abrir o Claude Code (hook SessionStart).
# Mostra o status para você (systemMessage) e passa o mesmo texto ao Claude (additionalContext).
# Só lê arquivos e o git. Não altera nada.

cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
G=docs/gestao

fase=$(grep -m1 '^\*\*Fase em curso:\*\*' "$G/04-roteiro.md" 2>/dev/null | sed 's/\*\*Fase em curso:\*\* *//')
ultima=$(grep -E '^- [0-9]{4}-[0-9]{2}-[0-9]{2} ·' "$G/sessoes.md" 2>/dev/null | tail -1 | sed 's/^- //')
data=$(echo "$ultima" | cut -d' ' -f1)
commits=0
[ -n "$data" ] && commits=$(git log --since="$data 23:59" --oneline 2>/dev/null | wc -l | tr -d ' ')
pendentes=$(git status --porcelain 2>/dev/null | wc -l | tr -d ' ')
tarefas=$(grep -m3 '^- \[ \]' "$G/fase-atual.md" 2>/dev/null | sed 's/^- \[ \] /  • /')

texto="Eras do Brasil
Fase em curso: ${fase:-não encontrada}
Última sessão: ${ultima:-nenhuma}
Commits ainda sem sessão registrada: $commits
Arquivos sem commit: $pendentes
Próximas tarefas:
${tarefas:-  (nenhuma; rode /planejar-fase)}"

# Escapa para JSON sem depender de jq ou python
json=$(printf '%s' "$texto" | sed -e 's/\\/\\\\/g' -e 's/"/\\"/g' | awk 'BEGIN{ORS="\\n"} {print}')

printf '{"systemMessage":"%s","hookSpecificOutput":{"hookEventName":"SessionStart","additionalContext":"%s"}}\n' "$json" "$json"
exit 0
