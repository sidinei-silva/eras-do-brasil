---
name: fechar-sessao
description: Registra em docs/gestao/sessoes.md as sessões desde a última linha, a partir dos commits, e marca as tarefas feitas em fase-atual.md. Use ao terminar de trabalhar ou quando eu disser "fechar sessão" ou "registrar".
context: fork
agent: pm
---

Mexe só em `docs/gestao/`. Nunca rode `git add`, `git commit` nem `git push`.

1. Ache a data da última linha do Registro em `docs/gestao/sessoes.md`.
2. Rode `git log --since="<essa data>" --format="%h|%ci|%s" --name-only`. Considere também `git status` (trabalho ainda sem commit).
3. Agrupe em sessões: commits com menos de 2h entre um e outro são a mesma sessão; 2h ou mais começa outra.
4. Monte uma linha por sessão: `data · fase · usadas/orçamento · código ou design · o que fez`
   - **código ou design:** `design` se todos os arquivos estão em `docs/`; senão `código`;
   - **o que fez:** uma frase curta, a partir das mensagens de commit.
5. Compare com `docs/gestao/fase-atual.md` e liste as tarefas que parecem feitas.
6. Mostre tudo e pergunte:
   - se cada sessão teve 30 minutos ou mais (menor não entra);
   - se houve sessão sem commit;
   - se marca as tarefas listadas.
7. Só depois do "ok": acrescente as linhas, marque as tarefas e avise se o orçamento passou de 1× ou de 1,5×.
8. Termine sugerindo a mensagem de commit, por exemplo `docs(gestao): registra sessão e marca tarefas`. **Não commite.**
