# Eras do Brasil

MMORPG sandbox por turno, para PC, inspirado no Brasil e no folclore. Você é o que veste. Projeto pessoal, feito por um
dev solo, for fun.

> "Você não foi escolhido. Ninguém aqui foi. Você se destaca pelo que faz, não pelo que é."

## Estado

Fase 0 do [roteiro](docs/gestao/04-roteiro.md): docs validados, montando a base. Ainda sem código. Tarefas:
[fase-atual](docs/gestao/fase-atual.md).

Núcleo, simulador e servidor em Go; cliente em Unity.

## Por onde ler

1. [O jogo](docs/01-o-jogo.md): visão, pilares e índice de tudo
2. [Roteiro](docs/gestao/04-roteiro.md): fases até o MVP
3. [Painel](docs/gestao/05-painel.md): o que falta decidir (abre no Obsidian com Dataview)

A pasta `docs/` é um vault do Obsidian, mas também se lê aqui no GitHub.

## Estrutura

| Pasta           | O que tem                                                          |
| --------------- | ------------------------------------------------------------------ |
| `docs/jogo/`    | Regras do jogo, mundo, enredo, Travessia                           |
| `docs/tecnico/` | Arquitetura e stack                                                |
| `docs/gestao/`  | Roteiro, tarefas, sessões, estacionamento                          |
| `core/`         | Núcleo de regras (Go)                                              |
| `contract/`     | Mensagens entre cliente e servidor                                 |
| `sim/`          | Simulador de console                                               |
| `server/`       | Servidor                                                           |
| `data/`         | Conteúdo em JSON                                                   |
| `client/`       | Cliente Unity                                                      |
| `.claude/`      | PM automático do Claude Code: subagente, skills, hook e permissões |
| `.githooks/`    | Checagem da mensagem de commit                                     |

As outras pastas entram conforme o [roteiro](docs/gestao/04-roteiro.md) avança.

## Regras do repositório

- Doc curta, visual e fácil de validar: [como documentar](docs/00-como-documentar.md).
- Uso de IA: [AGENTS.md](AGENTS.md).
- Commits: [instruções](.github/commit-instructions.md).
