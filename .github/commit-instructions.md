# Instruções de commit

Formato: `tipo(escopo): descrição`

| Tipos | `feat`, `fix`, `docs`, `refactor`, `test`, `chore` |
|---|---|
| Escopos | `rules`, `contract`, `sim`, `server`, `client`, `data`, `docs`, `gestao`, `repo` |

O hook `.githooks/commit-msg` recusa o commit fora desse formato.

## Regras

- Descrição em português, imperativo, minúscula, sem ponto final, até 72 caracteres.
- O tipo é o que o commit entrega, não o arquivo que mais mudou.
- Um commit, uma entrega. Se precisar de "e" no assunto, são dois commits.
- Corpo opcional: uma linha por peça alterada.
- `gestao` é para `docs/gestao/` (sessões, tarefas, estacionamento); `docs` é para regra do jogo e técnico.

## Proibido

"melhora", "aprimora", "otimiza", "ajustes diversos", "diversas melhorias". Diga o que mudou.

## Exemplos

```
feat(rules): adiciona graus de sucesso no teste de d20

- rules: ResolverTeste com crítico por ±10 e 20/1 natural
- rules: tabela com 8 casos dos graus de sucesso
```

```
docs(gestao): registra sessão e marca tarefa de pastas
```
