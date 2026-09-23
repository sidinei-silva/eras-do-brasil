# Backlog — PoC de Eras do Brasil

> Este arquivo é o índice e o planejamento da PoC. O detalhe de cada fatia
> fica no próprio arquivo da fatia.

A fatia é a unidade pequena de trabalho da PoC. Quando uma fatia estiver
decidida, suas tarefas podem ser transformadas em issues dentro de um
Milestone correspondente no GitHub.

## Escopo da PoC

A PoC cobre a construção incremental do fluxo inicial do jogo.

| Fatia | Arquivo                    | Entrega                                | Status       |
| ----- | -------------------------- | -------------------------------------- | ------------ |
| 1     | `01-criacao-conta.md`      | Criação de conta                       | concluída    |
| 2     | `02-login.md`              | Login                                  | não iniciada |
| 3     | `03-criacao-personagem.md` | Criação e persistência de personagem   | concluída    |
| 4     | `04-entrar-no-mundo.md`    | Entrada no mundo com personagem criado | não iniciada |

## Regra do backlog

Este arquivo não é a fonte de verdade para:

- regras de gameplay;
- lore;
- dados de conteúdo;
- arquitetura detalhada;
- fórmulas de balanceamento;
- decisões de interface ou direção de arte.

Esses assuntos pertencem aos documentos correspondentes do projeto.

O backlog registra **o que precisa ser entregue**, suas dependências e a organização das fatias.

## Fatias

### Fatia 1 — Criação de conta

Arquivo: `01-criacao-conta.md`

Entrega a criação de uma conta no backend.

**Status atual:** concluída.

### Fatia 2 — Login

Arquivo: `02-login.md`

Entrega o login do jogador no backend.

**Status atual:** não iniciada.

**Dependência:** Fatia 1.

### Fatia 3 — Criação de personagem

Arquivo: `03-criacao-personagem.md`

Entrega a criação e persistência de um personagem associado à conta.

**Status atual:** concluída.

**Dependência:** Fatia 2.

### Fatia 4 — Entrar no mundo

Arquivo: `04-entrar-no-mundo.md`

Entrega a entrada no mundo de um jogador autenticado com personagem criado.

**Status atual:** não iniciada.

**Dependências:**

- Fatia 2 — autenticação;
- Fatia 3 — criação de personagem.

## Como usar

O `BACKLOG.md` funciona como índice.

Cada fatia possui seu próprio documento com:

- objetivo;
- dependências;
- pré-requisitos;
- fluxo;
- tarefas;
- critérios necessários para considerar a entrega concluída.

Quando uma decisão ou regra deixar de ser específica da implementação da fatia,
ela deve ser registrada no documento de projeto apropriado, em vez de ser
duplicada aqui.

## Fora deste documento

Não registrar aqui:

- detalhes do tutorial;
- listas de zonas, NPCs, mobs, itens ou receitas;
- regras de combate;
- regras de progressão;
- arquitetura interna de `Game`, `GameState`, `World` ou `GameData`;
- decisões históricas;
- estudos de referências externas.

O backlog pode apontar para esses documentos quando necessário, mas não deve
reproduzir seu conteúdo.
