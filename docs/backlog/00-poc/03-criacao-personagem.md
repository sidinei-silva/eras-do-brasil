# Fatia 3 — Criação de personagem (Backend)

**Status:** não iniciada
**Depende de:** Fatia 2 (login existe)

**Entrega:** o jogador vai conseguir criar um personagem no jogo e salvar no banco ainda não entra no mundo. Só
backend por enquanto — o cliente em Godot ainda está em estudo.

## Servidor

- [x] Endpoint para criar personagem
- [x] Endpoint para listar personagens do jogador
- [x] Vincular personagem à conta

## Regras

- Jogador só pode ter 1 personagem por conta por enquanto
- Esta fatia só cria o personagem e salva no banco 

## Passo

- Para criar personagem precisa criar tabela no banco de dados do personagem
- Inicialmente personagem só vai ter os campos basicos:
  - name
  - body_type com uma das opções: NORMAL_FEMALE, NORMAL_MALE