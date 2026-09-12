# AGENTS.md

> Regras de uso de IA em **Eras do Brasil**. Valem para qualquer ferramenta: Copilot,
> ChatGPT, Claude, o que vier depois. Se uma ferramenta não lê este arquivo, a
> regra continua valendo — ela é minha, não dela.

## Por que este arquivo existe

Este é um projeto pessoal. O objetivo **não é** entregar rápido. É escrever
código que é meu, aprender Go de verdade e voltar a gostar de programar.

Velocidade aqui não é qualidade. Entender é.

## O teste

Antes de aceitar qualquer coisa vinda de uma IA:

> **Eu consigo explicar isso amanhã, sem olhar?**

Se não, não entra. Não importa se funciona, se é idiomático, ou se economizaria
duas horas.


## Permitido

- Explicar um conceito que eu não conheço
- Comparar duas ou mais abordagens, com o problema que cada uma resolve
- Pesquisar: documentação, prática comum, erro obscuro
- **Code review de código que eu escrevi**
- Ajudar a depurar: ler stack trace, sugerir onde investigar, explicar o erro
- Revisar texto que eu escrevi — pontuação, clareza, concordância
- Traduzir
- Procurar defasagem entre documentação e código, ou entre código e teste. E me explicar a diferença.
- Criar mecanismos de simulação para ajudar no balanceamento.

## Proibido

- Colocar comentários em código desnecessários, ou explicando o que o código já diz
- **Deixar material didático de IA morar no repo.** Explicação é conversa, não
  artefato versionado. O que sobreviver vira ADR com as minhas palavras.

## Se eu estiver travado

Escalar aos poucos, nesta ordem. Não pular etapas:

1. Reformular o problema em uma frase
2. Perguntar qual conceito está faltando
3. Pedir um exemplo **em outro domínio**, não no meu código
4. Pedir para apontar a linha errada, sem a correção
5. Só então pedir a correção

## Mensagens de commit

Conventional Commits, descrição em pt-BR. Formato e exemplo em
[.github/commit-instructions.md](.github/commit-instructions.md).

Commit message é documentação que eu vou ler. É como eu vou descobrir, em março,
o que aconteceu numa noite de setembro.

O botão gera, **eu reescrevo**. O Copilot vê o diff — ele não sabe que
`R-COL-03` nasceu ali, nem que aquilo é a Fatia 4. Gerar e commitar sem ler
transforma o `git log` em ruído.

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
peças: