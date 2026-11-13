# AGENTS.md

Regras para qualquer IA neste repositório. Se a ferramenta não lê este arquivo, a regra continua valendo.

## Antes de tudo

- Repo antigo (`eras-do-brasil-go`, arquivado) é só consulta. Nada dele vale aqui até ser copiado.
- Doc entra copiado do repo antigo, sem editar, só quando o código precisa dele. Mudança de regra é outro commit.
- Decisão registrada é decisão. Para reabrir, diga o que mudou e por quê.
- A stack só se rediscute com a fase em curso jogável.

## Papel da IA

| Pode                                             | Não pode                                                  |
| ------------------------------------------------ | --------------------------------------------------------- |
| Explicar conceito e comparar abordagens          | Escrever a regra do jogo (`core/`) ou o código do jogo    |
| Escrever o laço que roda a minha tabela de casos | Escrever casos de teste ou resultado esperado             |
| Apontar cenários que faltam, só o nome           | Escrever as faixas dos testes de balanceamento            |
| Escrever scripts, configs e testes de rede       | Fazer arte, voz, texto ou qualquer coisa que o jogador vê |
| Revisar o código que eu escrevi                  | Editar `docs/` sem pedido                                 |
| Apontar contradição na doc                       | Inventar regra que não está na doc                        |

Eu escrevo a regra, os casos de teste, o código do jogo e a lore.

## Commits

- **Nenhuma IA roda `git add`, `git commit` ou `git push`.** Está bloqueado em `.claude/settings.json`. Quem commita
  sou eu.
- Formato `tipo(escopo): descrição`, em português, imperativo, minúscula, sem ponto final. Regras completas em
  [.github/commit-instructions.md](.github/commit-instructions.md).
- O hook `.githooks/commit-msg` recusa commit fora do formato. Ativar uma vez por clone:
  `git config core.hooksPath .githooks`.
- Se eu pedir sugestão de mensagem, siga o formato e diga o que mudou, nunca "melhora/ajustes".

## Como responder

- Curto e fácil de validar. Tenho ~2h por noite e sou interrompido.
- O porquê vai na conversa, não no arquivo.
- Hipótese é declarada como hipótese. Se não sabe, pesquise ou pergunte.
- Sem complexidade antecipada.
- Regra nova só na frente do código, quando a tarefa pede. Ideia fora disso: estacionar em 1 linha.

## Stack e estrutura

- Stack: Godot 4 + C# (.NET). Jogo 2D top-down em pixel art. Core em C# puro, sem Godot, compartilhado com o futuro
  servidor .NET.
- Versões: SDK .NET 10 pelo mise; Godot 4.7 (.NET); core e client em net8.0 (alvo da Godot); core.tests em net10.0.
- Estrutura: `core/` (regras puras, projeto .NET), `core.tests/` (xUnit), `client/` (projeto Godot, referencia o
  `core` por `ProjectReference`), `server/` depois.
- Ordem: primeiro roda local; o servidor entra quando 1 combate estiver divertido.

## Regras do projeto

- Núcleo de regras: função pura, sem estado escondido, só inteiros, semente e contador do sorteio no estado.
- Sorteio: `readonly struct Rng` (Seed, Counter) no estado; `Roll(sides)` devolve (valor, próximo `Rng`), com
  SplitMix64 próprio. Nunca `System.Random` no core.
- Um tipo por arquivo; pasta só quando o tema tiver 4+ arquivos; `core.tests` espelha as pastas do `core`.
- Regra de uma classe mora no comentário dela (`/// <summary>` com o porquê curto). `.md` só para o que atravessa
  várias classes ou ainda não é código.
- Nome de teste: `Método_Cenário_Resultado`, com o método em inglês e cenário/resultado em português sem acento
  (ex.: `Roll_MesmoRng_RetornaMesmoValor`).
- Cena de teste usa as mesmas cenas e scripts do jogo; regra fica no core, a cena só mostra.
- Balanceamento: teste no `core.tests` (Trait "Balanceamento") chamando `RunFights` do core. Simulador de console só na
  fase 2, se precisar explorar.
- Constante de jogo mora em `data/`, nunca no código.
- Mecânica não se poetiza: nome comum de MMORPG.

## Arte

- A direção de arte é [docs/direcao-de-arte.md](docs/direcao-de-arte.md).
- A arte é feita no repo `eras-do-brasil-mesa-de-desenho`, nunca aqui.
- Referência feita com IA pode entrar em cena de teste como placeholder, com `_ref` no nome. Nunca como conteúdo final.