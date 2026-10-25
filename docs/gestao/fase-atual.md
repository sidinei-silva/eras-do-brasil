# Fase atual

**Fase 1 · Luta no terminal** · orçamento: 20 sessões · ver [04-roteiro](04-roteiro.md)

Pronto quando: 1 personagem × 2 mobs no terminal; a mesma semente repete a luta; o simulador roda 1.000 lutas. Marcos nas sessões 5, 10 e 20.

## Tarefas

- [ ] `go mod init` + estrutura de pastas (`regras/`, `sim/`, `data/`)
- [ ] Estado do núcleo: structs de personagem, mob e estado da luta — só inteiros, semente e contador do sorteio dentro do estado
- [ ] Gerador de dado determinístico (1d20 por semente+contador) e graus (20 sobe grau, 1 desce grau)
- [ ] Teste de ataque: 1d20 + atributo + maestria + item vs Defesa; bônus por tipo sem somar — marco sessão 5
- [ ] `data/`: 2 armas, 1 armadura, 2 inimigos em JSON, números chutados
- [ ] Turno por lado: 3 ações, golpe (máx. 2, 2º com -5), andar
- [ ] Passo (sem ataque de oportunidade) e ataque de oportunidade como reação do item — marco sessão 10: 1 personagem × 1 mob, luta completa no terminal
- [ ] Simulador no terminal: luta até o fim contra os 2 mobs do `data/`, com log
- [ ] Semente por luta: reproduzir a mesma luta a partir da mesma semente
- [ ] Laço de 1.000 lutas + relatório (vitórias, turnos médios)
- [ ] Ajustar números de `data/` com base no relatório de 1.000 lutas
- [ ] Fechar casos pendentes e checar o "Pronto quando" da fase — marco sessão 20 (fim)
