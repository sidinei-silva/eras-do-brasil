# Fatia 3 — Criação de personagem (Backend)

**Status:** concluída
**Depende de:** Fatia 2 — Login

**Entrega:** o jogador consegue criar um personagem associado à sua conta e salvá-lo no banco. Esta fatia ainda não inclui a entrada no mundo.

## Servidor

- [x] Endpoint para criar personagem
- [x] Endpoint para listar personagens do jogador
- [x] Vincular personagem à conta

## Regras

- O jogador só pode ter 1 personagem por conta por enquanto
- Esta fatia cria o personagem e salva no banco

## Passo

- Para criar personagem, é necessário criar a tabela do personagem no banco de dados
- Inicialmente, o personagem possui apenas os campos básicos:
  - `name`
  - `body_type`, com uma das opções:
    - `NORMAL_FEMALE`
    - `NORMAL_MALE`
