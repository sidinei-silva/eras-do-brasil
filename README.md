# Eras do Brasil

MMORPG sandbox por turno, para PC, inspirado no Brasil e no folclore. Você é o que veste. Projeto pessoal, feito por um dev solo, for fun.

> "Você não foi escolhido. Ninguém aqui foi. Você se destaca pelo que faz, não pelo que é."

## Estado

Fase 0 do [roteiro](docs/04-roteiro.md): docs corrigidos, montando a base. Ainda sem código.

Núcleo, simulador e servidor em Go; cliente em Unity.

## Por onde ler

1. [O jogo](docs/01-o-jogo.md): visão, pilares e índice de tudo
2. [Roteiro](docs/04-roteiro.md): fases até o MVP
3. [Painel](docs/05-painel.md): o que falta decidir (abre no Obsidian com Dataview)

A pasta `docs/` é um vault do Obsidian, mas também se lê aqui no GitHub.

## Estrutura

| Pasta | O que tem |
|---|---|
| `docs/` | Design, lore, técnico e roteiro |
| `regras/` | Núcleo de regras (Go) |
| `contrato/` | Mensagens entre cliente e servidor |
| `sim/` | Simulador de console |
| `server/` | Servidor |
| `data/` | Conteúdo em JSON |
| `client/` | Cliente Unity |

As outras pastas entram conforme o [roteiro](docs/04-roteiro.md) avança.

## Regras do repositório

- Doc curta, visual e fácil de validar: [como documentar](docs/00-como-documentar.md).
- Uso de IA: [AGENTS.md](AGENTS.md).
- Commits: [instruções](.github/commit-instructions.md).
