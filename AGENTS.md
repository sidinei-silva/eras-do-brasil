# AGENTS.md

Regras para qualquer IA neste repositório (Claude, Copilot, ChatGPT, o que vier). Se a ferramenta não lê este arquivo, a regra continua valendo.

## Antes de tudo

- A fonte da verdade é `docs/`. Comece por [docs/01-o-jogo.md](docs/01-o-jogo.md).
- Decisão registrada é decisão. Para reabrir, diga o que mudou e por quê.
- O que está em **Propostas** ou **Em aberto** não é regra ainda.
- A stack só se rediscute com a fase em curso jogável.

## Papel da IA

| Pode | Não pode |
|---|---|
| Explicar conceito e comparar abordagens | Escrever a regra do jogo (`regras/`) |
| Escrever o laço que roda a minha tabela de casos | Escrever casos de teste ou resultado esperado |
| Escrever simulador, scripts e testes de rede | Fazer arte, voz, texto ou qualquer coisa que o jogador vê |
| Revisar o código que eu escrevi | Editar `docs/` sem pedido |
| Apontar contradição na doc e na lore | Inventar regra que não está na doc |

Eu escrevo a regra, os casos de teste e a lore.

## Como responder

- Curto e fácil de validar. Tenho ~2h por noite e sou interrompido.
- O porquê vai na conversa, não no arquivo.
- Hipótese é declarada como hipótese. Se não sabe, pesquise ou pergunte.
- Sem complexidade antecipada (nada de Redis, Kafka, microserviço "por precaução").

## Regras do projeto

- Doc segue [docs/00-como-documentar.md](docs/00-como-documentar.md).
- Mecânica não se poetiza: nome comum de MMORPG.
- Constante de jogo mora em `data/`, nunca no código.
- Núcleo de regras: função pura, sem estado escondido, só inteiros. Ver [docs/03-tecnico.md](docs/03-tecnico.md).
- Commits: [.github/commit-instructions.md](.github/commit-instructions.md).
