# Como documentar

Regras desta pasta. Valem para mim e para qualquer IA que escrever aqui.

## Regras

1. **Pense simples, faça simples.** Feito é melhor que perfeito, mas não mal feito.
2. **Doc é regra, não explicação.** O porquê fica na conversa.
3. **Uma regra mora num lugar só.** Os outros arquivos apontam com link.
4. **Poucos arquivos.** Só separa quando o assunto é outro.
5. **Visual primeiro.** Número vira tabela. Parágrafo só para enredo.
6. **Sem repetição.** Diagrama, canvas e tabela não dizem a mesma coisa.
7. **Curto para validar.** Um arquivo se lê e se valida em até 10 minutos.
8. **Mecânica não se poetiza.** Nome comum de MMORPG. Lore não explica mecânica.
9. **Todo arquivo é alcançável a partir do [01-o-jogo](01-o-jogo.md).**

## Canvas ou Mermaid

| Use | Para |
|---|---|
| Mermaid (dentro do `.md`) | Fluxo em sequência: turno, d20, ciclo de ofícios |
| Canvas (`.canvas`) | Espaço ou ligação entre arquivos: mapa da Travessia, fatias ↔ mecânicas |

## Modelo de arquivo

```
---
validado: false
---
# Nome
Uma frase: o que é.

## (seções com o que está DECIDIDO)
## Propostas     ← aceito ou corto; ao aceitar, sobe
## Em aberto     ← só bullets (o painel lê daqui)
```

_(adiado)_ marca o que está decidido, mas fora do MVP.

## Validação

Um arquivo por noite. Cada item de **Propostas**: aceito, corto ou deixo. Sem propostas pendentes: `validado: true`. Acompanhe no [05-painel](05-painel.md).
