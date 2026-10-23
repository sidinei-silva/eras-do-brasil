---
name: planejar-fase
description: Quebra o "Pronto quando" de uma fase em tarefas pequenas e reescreve docs/gestao/fase-atual.md. Use quando uma fase terminar ou quando eu disser "planejar fase" ou "quebrar em tarefas".
context: fork
agent: pm
---

Mexe só em `docs/gestao/`. Nunca rode `git add`, `git commit` nem `git push`.

1. Leia o roteiro: a fase pedida (ou a próxima depois da fase em curso), o orçamento e o "Pronto quando".
2. Leia os docs que essa fase usa (indicados no canvas `04-roteiro.canvas` e no `03-tecnico`) só para entender o escopo. Não mude nada neles.
3. Proponha de 5 a 12 tarefas:
   - cada uma cabe em 1 ou 2 sessões e termina em algo verificável (teste passa, comando roda, arquivo existe);
   - na ordem em que devem ser feitas;
   - incluindo os marcos da fase, se houver (ex.: sessões 5, 10 e 20 da fase 1);
   - sem tarefa de outra fase. O que for de outra fase vai para o estacionamento.
4. Mostre a lista e espere o "ok" ou os ajustes.
5. Depois do "ok": reescreva `docs/gestao/fase-atual.md` (cabeçalho com fase, orçamento e "Pronto quando", e as tarefas em checklist) e troque a "Fase em curso" no roteiro.
6. Sugira a mensagem de commit `docs(gestao): planeja a fase N`. **Não commite.**
