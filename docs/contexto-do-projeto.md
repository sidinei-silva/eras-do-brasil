# Contexto do Projeto — Eras do Brasil

## 1. Para que serve este arquivo

Este arquivo é um contexto curto para o Project do ChatGPT.

Ele não substitui o código, o GDD nem a documentação normativa do repositório. Seu objetivo é ensinar uma conversa nova a **entender o projeto e encontrar a fonte correta**, evitando duplicar as regras mantidas nos documentos específicos.

Quando houver conflito, a fonte mais específica e atual prevalece.

---

## 2. O projeto

**Eras do Brasil** é um MMORPG idle de fantasia folclórica brasileira. A progressão usa equipamento, especialização por uso, combate, coleta, refino, craft e tiers, com referências de estrutura de jogos como Albion Online sem obrigação de copiá-los.

A identidade de mundo, narrativa, conteúdo e regras é própria do projeto.

---

## 3. Escopo atual

O MVP corresponde à construção completa de **A Travessia**, desde o fluxo inicial de conta, login e personagem até o fim da experiência tutorial.

A construção é incremental. O backlog organiza as fatias que levam ao MVP completo.

O MVP trabalha com T1 e T2 e exercita o núcleo necessário para o loop:

```text
coletar → produzir → equipar → combater → progredir → atravessar
```

Não ampliar o MVP antecipando o MMORPG completo.

---

## 4. Onde cada assunto vive

| Pergunta | Fonte |
|---|---|
| O que é o jogo? | `docs/o-jogo.md` |
| Qual é a regra de design e por quê? | `docs/decisoes-de-design.md` |
| Quais dados e sistemas entram no MVP? | `docs/dados-do-mvp.md` |
| Como funcionam fórmulas e balanceamento? | `docs/formulas-e-balanceamento.md` |
| Como o jogo deve ser representado visualmente? | `docs/direcao-de-arte.md` |
| Como o servidor é estruturado? | `docs/arquitetura-consolidada.md` |
| Para onde o projeto evolui? | `docs/ROADMAP.md` |
| O que está sendo trabalhado? | `docs/backlog/` |
| Como chegamos às decisões atuais? | `docs/historico-e-estudos.md` |

Os JSONs em `data/` são a fonte de verdade para conteúdo e valores efetivamente carregados. `design/` contém conteúdo projetado que ainda não entrou no runtime.

---

## 5. Hierarquia de fontes

Para afirmações sobre o estado atual do projeto:

1. código atual, quando a questão for comportamento implementado;
2. documentação normativa específica;
3. dados atuais;
4. histórico.

O histórico serve para entender evolução e alternativas. Não é autoridade sobre o estado atual.

Quando uma fonte não for suficiente, tratar a questão como aberta em vez de inventar uma resolução.

---

## 6. Distinções importantes

Durante o trabalho, separar:

**Decisão atual** — regra estabelecida em fonte normativa.

**Decisão proposta** — solução sugerida que ainda não deve ser tratada como regra definitiva.

**Hipótese** — possibilidade usada para raciocinar.

**Histórico** — ideia ou regra considerada anteriormente que não representa necessariamente o estado atual.

---

## 7. Como o ChatGPT deve trabalhar

O objetivo das conversas é apoiar o raciocínio e ensinar, não substituir o desenvolvimento feito pelo usuário.

Ao discutir arquitetura:

1. explicar a arquitetura;
2. explicar responsabilidades;
3. explicar o fluxo;
4. explicar trade-offs;
5. apresentar código pequeno quando ele for útil.

Não inventar regras de gameplay nem tratar discussões antigas como decisões atuais.

Quando uma simplificação for feita para estudo, identificá-la como tal.

A arquitetura estudada deve ser tratada como referência e não como decisão definitiva de um futuro projeto de desenvolvimento separado.

---

## 8. Regra de ouro

**Consultar a fonte atual e específica antes de concluir.**

Separar claramente fato, decisão, proposta, hipótese e histórico.
