# Fase atual

**Fase 1 · Luta no terminal** · orçamento: 29 sessões · ver [04-roteiro](04-roteiro.md)

Pronto quando: 1 personagem contra 3 encontros no terminal (3 mobs T1 fracos; 1 mob T1 mais forte; 1 mini boss T2
sozinho), com as skills T1 (Q da espada e ativas da armadura); a mesma semente repete a luta; o simulador roda 1.000
lutas. Marcos nas sessões 5, 13 e 29.

## Tarefas

- [x] `go mod init` + estrutura de pastas (`core/`, `sim/`, `data/`) · 1 sessão
- [x] Gerador de dado determinístico (1d20 por semente+contador) e graus (20 sobe grau, 1 desce grau) · 1 sessão
- [ ] Estado do combate mínimo, criado pelo teste da ResolveCombatAction(UseSkill): HP, Defense, skills com modificadores prontos, seed e counter. Cada tarefa seguinte acrescenta o campo que usar · 1 sessão
- [ ] ResolveCombatAction(combat, UseSkill): 1d20 + modificador de acerto vs Defesa; dano em dado só se acertou; crítico dobra o total; devolve combat novo + eventos — marco sessão 5 · 2 sessões
- [ ] data/: espada, escudo e couro T1 (3 peças), os inimigos dos 3 encontros, skills.json e rules.json + função equipamento → números (atributo + maestria + item; bônus do mesmo tipo não soma) · 2 sessões
- [ ] Turno por lado: 3 ações, golpe (máx. 2, 2º com -5), andar · 3 sessões
- [ ] Passo (sem ataque de oportunidade) e ataque de oportunidade como reação do item — marco sessão 13: 1 personagem ×
      1 mob, luta completa no terminal · 3 sessões
- [ ] Conjuração e o tapa do mini boss: área marcada, cai no próximo turno, empurrão · 2 sessões
- [ ] Q da espada T1 com 2 opções: Heroic Strike (alvo único) e Cleave (área; a forma da área é decidida aqui) · 2 sessões
- [ ] Ativas da armadura T1: capacete (barreira que absorve dano) e botas (esquiva: anda sem ataque de oportunidade) · 2 sessões
- [ ] Os 3 encontros em sequência: o HP passa de um para o outro; regen fora da luta e ativa do peitoral (cura fora da luta) entre os encontros · 2 sessões
- [ ] Simulador no terminal: luta até o fim nos 3 encontros do `data/`, com log · 2 sessões
- [ ] Semente por luta: reproduzir a mesma luta a partir da mesma semente · 1 sessão
- [ ] Laço de 1.000 lutas + relatório (vitórias, turnos médios) · 2 sessões
- [ ] Ajustar números de `data/` com base no relatório de 1.000 lutas · 2 sessões
- [ ] Fechar casos pendentes e checar o "Pronto quando" da fase — marco sessão 29 (fim) · 1 sessão
