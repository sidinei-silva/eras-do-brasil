# Fatia 4 - Entrar no mundo (Backend)

Status: não iniciada

Depende:
- Fatia 2 — autenticação
- Fatia 3 — criação de personagem

Entrega:
O jogador autenticado consegue entrar no mundo
com um personagem criado.

## Pré-requisitos

### Identidade
- Auth/JWT funcionando
- Middleware de autenticação funcionando
- AccountID disponível no contexto

### Personagem
- Character definido
- CharacterRepository definido
- CharacterService definido
- Personagem persistido
- Validação de ownership Account → Character

### Mundo
- GameData carregado
- World criado
- World disponível em runtime

### Game
- Game criado
- GameState criado
- Game loop/tick criado

## Fluxo

Client
→ autenticação
→ seleção de personagem
→ EnterWorld
→ Game
→ GameState
→ estado inicial do personagem

## Servidor

- [x] - Criar World
- [x] Criar Game
- Criar GameState
- Criar tick
- Criar operação EnterWorld
- Validar CharacterID
- Validar ownership
- Criar estado runtime do personagem
- Registrar personagem no GameState
- Retornar estado inicial