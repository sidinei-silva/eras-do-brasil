# Instruções de commit

Formato: `tipo(escopo): descrição`

**Tipos** (em inglês): `feat`, `fix`, `docs`, `refactor`, `test`, `chore`
**Escopos**: `fluxo`, `sistema`, `data`, `adr`, `server`, `web`, `docs`

## Regras

- Descrição **sempre em português do Brasil**, imperativo, minúscula, sem ponto
- Assunto com no máximo 72 caracteres
- O tipo reflete o que a fatia **entrega**, não o arquivo que mais mudou. Fatia
  que entrega coleta é `feat` mesmo que a maioria das linhas seja markdown
- Corpo em lista, uma linha por peça alterada: regra, fluxo, data, código,
  teste, lore
- ADR isolada é `docs(adr)`

## Proibido

Nunca use: "melhora", "aprimora", "otimiza", "refatora para melhor
legibilidade", "manutenibilidade", "ajustes diversos", "diversas melhorias".

Diga o que mudou concretamente. Se não der para dizer, o commit está grande
demais.

## Exemplo

    feat(coleta): adiciona ciclo de coleta com nó de recurso

    Fatia 4 · passo 4.

    - gdd/sistemas/coleta.md: R-COL-01 a R-COL-05
    - gdd/fluxos/04-coleta.md
    - data/recursos.json, nós em zonas.json
    - internal/action: ciclo com marcos absolutos
    - testes: R-COL-01..05
    - lore do passo 4