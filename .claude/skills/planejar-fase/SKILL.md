---
name: planejar-fase
description: Quebra o "Pronto quando" de uma fase em tarefas pequenas e reescreve docs/gestao/fase-atual.md. Use quando todas as tarefas da fase atual estiverem marcadas, ou quando eu disser "planejar fase" ou "quebrar em tarefas".
---

Roda na conversa principal, porque precisa da minha aprovação. Mexe só em `docs/gestao/`. Nunca rode `git add`, `git commit` nem `git push`.

1. Leia o roteiro: a fase pedida (ou a próxima depois da fase em curso), o orçamento e o "Pronto quando".
2. Leia os docs que essa fase usa (indicados no `04-roteiro.canvas` e no `03-tecnico`) só para entender o escopo. Não mude nada neles.
3. Proponha de 5 a 12 tarefas, numa tabela com tarefa e sessões estimadas:
   - cada uma cabe em 1 ou 2 sessões e termina em algo verificável (teste passa, comando roda, arquivo existe);
   - na ordem em que devem ser feitas;
   - incluindo os marcos da fase, se houver (ex.: sessões 5, 10 e 20 da fase 1);
   - a soma das sessões cabe no orçamento;
   - sem tarefa de outra fase. O que for de outra fase vira sugestão de estacionar.
4. Diga em uma linha cada suposição que você fez, e pergunte se aprovo, ajusto ou estaciono.
5. Depois da minha resposta: reescreva `docs/gestao/fase-atual.md` (cabeçalho com fase, orçamento e "Pronto quando", e as tarefas em checklist), troque a "Fase em curso" no roteiro e acrescente no estacionamento o que eu mandei estacionar.
6. Sugira a mensagem de commit `docs(gestao): planeja a fase N`. **Não commite.**
