---
name: "devlog"
description: "Monta um post de devlog do Eras do Brasil em 4 etapas (ler commits, entrevista, rascunho, confirmação), com as palavras do Sidinei. Use quando ele disser devlog, entrevista do devlog ou escrever post."
---

O texto é meu. Você lê, pergunta e costura com as minhas palavras; não invente fatos, números, sentimentos nem datas. Não revele lore além do que eu disser. Nunca rode `git add`, `git commit` nem `git push`. Só escreva o arquivo final depois que eu disser "pode escrever".

Imagem: só material real do projeto. Nunca sugira nem escreva prompt para imagem ou vídeo gerado por IA (regra do AGENTS.md: sem IA em arte).

Rode no repo do Eras. Cada etapa termina numa pergunta; espere minha resposta antes da próxima.

## 1. Ler

1. Ache o último devlog: o arquivo mais recente em `devlog/`. Se não existir, pergunte desde quando começo.
2. Leia desde essa data:
   - `git log --since="<data>" --format="%h|%ci|%s" --stat`;
   - `git status` (trabalho sem commit);
   - as linhas novas de `docs/gestao/sessoes.md`;
   - as tarefas marcadas em `docs/gestao/fase-atual.md`.
3. Resuma em até 6 linhas: o que mudou no código, nos docs e nas decisões.
4. Pergunte: "O resumo bate? Faltou algo?"

## 2. Entrevista

1. Com base no resumo, faça de 4 a 5 perguntas curtas, numa mensagem só. Exemplos:
   - O que foi mais legal de fazer nesse período?
   - O que travou ou deu raiva?
   - O que você aprendeu (Go, game design, processo)?
   - Qual decisão você tomou e por quê?
   - Qual é o próximo passo?
2. Aceite respostas soltas, com erro de digitação ou transcritas de áudio.
3. No máximo uma rodada extra de perguntas, só se faltar algo essencial.

## 3. Rascunho

Formato fixo, até ~200 palavras, em primeira pessoa, simples, sem poetizar e sem tom de marketing:

```
# <título curto>

**O que fiz:** 2 a 3 linhas.

<imagem: o que capturar e como>

**O que aprendi / o que travou:** 1 a 2 linhas.

**Próximo passo:** 1 linha.
```

- Use as frases das minhas respostas; mude só a ordem, o português e as ligações.
- Marque com `[?]` todo trecho que você completou sem eu ter dito.
- Na imagem, sugira 1 ou 2 capturas reais ligadas ao que foi feito, dizendo o comando ou a tela exata. Exemplos: saída de `go run ./sim` ou de `go test ./core/ -v`; um trecho de código do `core/` (só o que eu escrevi); o canvas do Obsidian; um diff; mais tarde, um print do Unity. Se fizer sentido, sugira GIF do terminal ou da tela.

## 4. Confirmação

1. Liste cada `[?]` e pergunte o que fica.
2. Pergunte se o tom, o tamanho e a imagem estão bons.
3. Aplique os ajustes e mostre a versão final.
4. Só depois de "pode escrever":
   - salve em `devlog/AAAA-MM-DD.md`;
   - mostre o texto pronto para colar no Medium (Dev .init);
   - sugira o commit `docs(repo): devlog AAAA-MM-DD`. Não commite.