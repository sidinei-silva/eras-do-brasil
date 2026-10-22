# AGENTS.md

> Regras de uso de IA em **Eras do Brasil**. Valem para qualquer ferramenta: Copilot,
> ChatGPT, Claude, o que vier depois. Se uma ferramenta não lê este arquivo, a
> regra continua valendo — ela é minha, não dela.


**Conventional Commits, com a descrição em pt-BR.**

Formato: `tipo(escopo): descrição`

- Tipos em inglês, que é o padrão: `feat`, `fix`, `docs`, `refactor`, `test`,
  `chore`
- **Descrição em português**, imperativo, minúscula, sem ponto final
  ✅ `feat(coleta): adiciona ciclo com nó de recurso`
  ❌ `feat(coleta): Adicionado o ciclo de coleta.`
- Escopos deste repo: `fluxo`, `sistema`, `data`, `adr`, `server`, `web`, `docs`

**O tipo é o que a fatia entrega**, não o arquivo que mais mudou. Fatia que
entrega coleta é `feat`, mesmo que 80% das linhas sejam markdown.

**A fatia inteira num commit só.** A receita manda fechar fluxo, regra, conteúdo,
código, teste e lore juntos. Então o assunto resume a entrega e o corpo lista as
peças