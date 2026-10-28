---
name: conferir-regras
description: Compara as regras de docs/jogo/ com o código de core/ e os testes, e aponta divergências. Use nos marcos da fase (ver docs/gestao/fase-atual.md) ou quando eu disser "conferir regras" ou "doc e código batem?".
---

Só lê. Não corrija doc nem código. Nunca rode `git add`, `git commit` nem `git push`.

1. Leia `docs/gestao/fase-atual.md`: só as tarefas marcadas entram na conferência.
2. Leia os arquivos de `core/` (código e `_test.go`). Cada tipo do domínio tem um comentário com o termo do doc, ex.: `// Strike é o golpe (combate.md).` Use esse comentário para achar o doc.
3. Leia os docs citados e sempre `docs/jogo/mecanicas/motor-de-regras.md`.
4. Classifique o que achar:
   - **Diverge:** o doc diz X, o código faz Y.
   - **Sem teste:** regra no código sem caso no `_test.go`.
   - **Sem doc:** comportamento no código que nenhum doc descreve.
   - **Sem comentário:** tipo do domínio sem o comentário com o termo do doc.
   - **Número no código:** constante de jogo fora de `data/`.
5. Regra de tarefa ainda não feita não é divergência. Ignore.
6. Responda numa tabela: `tipo · regra · doc (arquivo e trecho) · código (arquivo:linha)`. Até 12 linhas. Se tudo bate, responda só: "Doc e código batem."
7. Não proponha regra nova. Para cada **Diverge**, pergunte: corrijo o código ou o doc? Eu decido. Se for o doc, dê a linha exata e o arquivo; doc validado só muda com meu pedido.
