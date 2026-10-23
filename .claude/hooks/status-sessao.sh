#!/usr/bin/env bash
# Roda ao abrir o Claude Code (hook SessionStart).
# Tudo o que este script imprime entra no contexto do Claude.
# Só lê arquivos e o git. Não altera nada.

cd "${CLAUDE_PROJECT_DIR:-.}" || exit 0
G=docs/gestao

fase=$(grep -m1 '^\*\*Fase em curso:\*\*' "$G/04-roteiro.md" 2>/dev/null | sed 's/\*\*Fase em curso:\*\* *//')
ultima=$(grep -E '^- [0-9]{4}-[0-9]{2}-[0-9]{2} ·' "$G/sessoes.md" 2>/dev/null | tail -1 | sed 's/^- //')
data=$(echo "$ultima" | cut -d' ' -f1)

echo "## Status do Eras do Brasil (automático)"
echo "- Fase em curso: ${fase:-não encontrada}"
echo "- Última sessão: ${ultima:-nenhuma}"

if [ -n "$data" ]; then
  n=$(git log --since="$data 23:59" --oneline 2>/dev/null | wc -l | tr -d ' ')
  echo "- Commits depois da última sessão: $n (se > 0, sugerir /fechar-sessao)"
fi

echo "- Próximas tarefas:"
grep -m3 '^- \[ \]' "$G/fase-atual.md" 2>/dev/null | sed 's/^- \[ \] /  - /'

echo "- Mudanças não commitadas: $(git status --porcelain 2>/dev/null | wc -l | tr -d ' ') arquivo(s)"
exit 0
