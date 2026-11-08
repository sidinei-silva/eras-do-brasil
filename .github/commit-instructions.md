# Instruções de commit

Formato: `tipo(escopo): descrição`

| Tipos   | `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `devlog`, `post` |
| ------- | -------------------------------------------------------------------- |
| Escopos | `core`, `client`, `server`, `data`, `docs`, `repo`, `devlog`, `post` |

O hook `.githooks/commit-msg` recusa o commit fora desse formato.

## Regras

- Descrição em português, imperativo, minúscula, sem ponto final, até 72 caracteres.
- O tipo é o que o commit entrega, não o arquivo que mais mudou.
- Um commit, uma entrega. Se precisar de "e" no assunto, são dois commits.
- Corpo opcional: uma linha por peça alterada.
- `core` vale também para `core.tests/`; `repo` é config (mise, gitignore, solution, ProjectSettings).

## Proibido

"melhora", "aprimora", "otimiza", "ajustes diversos", "diversas melhorias". Diga o que mudou.

## Exemplos

```
feat(core): adiciona graus de sucesso no teste de d20

- core: Degree com crítico por ±10 e 20/1 natural
- core.tests: tabela com 12 casos dos graus de sucesso
```

```
chore(repo): adiciona solution com core e core.tests
```