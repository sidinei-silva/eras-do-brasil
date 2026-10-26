---
name: revisar-casos
description: Depois que eu escrevi meus casos de teste, aponta os cenários que faltam, só pelo nome. Use quando eu disser "revisar casos", "o que falta testar" ou "cobertura".
---

Só lê. Não escreva teste, valor esperado nem código. Nunca rode `git add`, `git commit` nem `git push`.

1. Descubra qual teste revisar (ex.: `core/dice_test.go`). Se não estiver claro, pergunte.
2. Se o teste ainda não tem nenhum caso meu, pare e responda só: "Escreva os seus casos primeiro."
3. Leia o teste e o doc da mecânica que ele cobre (`docs/jogo/mecanicas/`; `motor-de-regras.md` sempre).
4. Liste os casos que já existem, um nome por linha.
5. Liste até 8 cenários que faltam. Cada um em uma linha:
   `<nome do caso como frase> · <regra que cobre: arquivo do doc e trecho>`
   Prioridade: fronteiras (exatamente na CD, CD+10, CD-10), extremos (20 e 1 naturais), "não soma", o que o doc proíbe, o que pode quebrar o determinismo.
6. Sem valor esperado, sem código, sem dizer como implementar.
7. Se o doc não diz o que acontece num cenário, marque `lacuna no doc`. Eu decido a regra.
8. Só olhe regras das tarefas da fase atual (`docs/gestao/fase-atual.md`).

Resposta em até 15 linhas.
