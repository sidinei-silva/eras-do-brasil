# Fatia 4 — Entrar no mundo (Backend)

**Status:** não iniciada

**Depende de:**
- Fatia 2 — Login
- Fatia 3 — Criação de personagem

**Entrega:** o jogador autenticado consegue entrar no mundo com um personagem criado.

## Pré-requisitos

### Identidade

- Auth/JWT funcionando
- Middleware de autenticação funcionando
- `AccountID` disponível no contexto

### Personagem

- `Character` definido
- `CharacterRepository` definido
- `CharacterService` definido
- Personagem persistido
- Validação de ownership entre conta e personagem

### Mundo

- `GameData` carregado
- `World` criado
- `World` disponível em runtime

### Game

- `Game` criado
- `GameState` criado
- Game loop/tick criado

## Fluxo

```text
HTTP
  │
  ├── autenticação
  ├── seleção de personagem
  └── EnterWorld
          │
          ▼
        Game
          │
          ▼
      GameState
          │
          ▼
   estado inicial
          │
          ▼
      WebSocket
```

## Servidor

- [x] Criar `World`
- [x] Criar `Game`
- [ ] Criar `GameState`
- [ ] Criar game loop/tick
- [ ] Implementar entrada no mundo
- [ ] Validar `CharacterID`
- [ ] Validar ownership entre conta e personagem
- [ ] Criar estado runtime do personagem
- [ ] Registrar personagem no `GameState`
- [ ] Retornar o estado inicial
- [ ] Estabelecer o WebSocket após a entrada no mundo
