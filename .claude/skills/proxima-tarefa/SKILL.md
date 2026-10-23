---
name: proxima-tarefa
description: Diz o que foi feito, como está o orçamento da fase e qual a próxima tarefa. Use no começo de uma sessão ou quando eu perguntar "o que falta", "status" ou "qual o próximo passo".
context: fork
agent: pm
---

Só leitura: não edite nada.

1. Leia roteiro, `fase-atual.md`, `sessoes.md`, `git log` desde a última sessão e, se houver código, `go test ./...`.
2. Responda em até 6 linhas:
   - fase e sessões usadas/orçamento (dentro, no limite ou acima de 1,5×);
   - o que andou desde a última sessão;
   - tarefas que os commits ou os testes mostram como feitas, mas ainda sem marcação (sugira marcar com `/fechar-sessao`);
   - **a próxima tarefa**, em uma frase, e por onde começar (arquivo ou comando).
