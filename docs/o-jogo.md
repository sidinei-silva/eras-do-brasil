# O jogo

Leitura de cinco minutos. O que é, como se joga e quais são os sistemas. Para conteúdo e valores efetivamente carregados, os JSONs em `data/` são a fonte de verdade. O que foi projetado e ainda não é carregado vive em `design/`.

---

## Em três frases

**MMORPG idle de fantasia folclórica brasileira, com a gramática de progressão do Albion Online.**

Não há classe tradicional: **você é o que veste**. O mundo é formado por eras do Brasil dispostas ao redor da Raiz do Mundo, e o jogador é um forasteiro que a Raiz puxou.

**A fantasia central:** montar uma build com peças de séculos diferentes.

---

## O que o jogador faz

O jogador não controla o movimento diretamente. Escolhe uma ação numa zona e observa o personagem executá-la.

```text
escolher zona → escolher ação → observar → recolher o resultado → decidir de novo
```

- **Coletar** — o personagem vai até o recurso e entra no loop de coleta.
- **Lutar** — escolhe um acampamento e enfrenta uma onda de inimigos.
- **Viajar** — a viagem consome tempo e leva à zona seguinte.
- **Produzir** — no hub, refina materiais e fabrica equipamento.

Sessões curtas funcionam; sessões longas rendem mais. O jogo recompensa presença e não pune ausência.

---

## Progressão

Sobe **o que você faz**, não um nível global do personagem.

A **Árvore do Destino** possui quatro ramos independentes: combate, coleta, refino e craft.

O **Tier** vai de 1 a 8. A progressão combina qualidade de material e profundidade de nó, enquanto a mesma linha de equipamento atravessa os tiers.

O **Poder de Item** reúne os principais componentes da força do equipamento. Maestria aumenta o poder da arma usada, e Afinidade recompensa o uso continuado da mesma arma.

Não há rebirth. A progressão é acumulativa; a variedade vem de outras árvores, eras e facções.

Os números e fórmulas pertencem a `docs/formulas-e-balanceamento.md`.

---

## Identidade e equipamento

O personagem constrói sua identidade pelo equipamento e pela progressão.

Há sete slots principais:

- mão principal;
- off-hand;
- cabeça;
- torso;
- botas;
- montaria;
- bolsa.

Existem três árvores de habilidade — físico, projétil e mágico — e a arma acrescenta sua habilidade especial. Armaduras se organizam em linhas pesada, média e leve.

A mesma estrutura de habilidades e equipamento deve sustentar diferentes eras; uma nova era não cria automaticamente uma nova árvore.

As regras detalhadas estão em `docs/decisoes-de-design.md`.

---

## Combate

Combate é **auto-battler e sem posicionamento como regra de jogo**.

O jogador escolhe um acampamento e configura previamente seu loadout, prioridades e condições de parada. Ataques básicos e habilidades possuem seus próprios tempos.

A luta é organizada em **ondas fechadas**. O servidor resolve a luta e produz o resultado; o cliente apresenta a animação.

A decisão de build envolve a combinação de arma, habilidades, energia e prioridade.

As regras detalhadas estão em `docs/decisoes-de-design.md`. Fórmulas e parâmetros estão em `docs/formulas-e-balanceamento.md`.

---

## Mundo

O mundo é organizado em continentes, eras e zonas.

**Zona é a unidade de gameplay** para recursos, risco, facção, mobs e viagem. Cidade também é uma zona.

Viagem consome minutos reais e funciona como parte importante do ritmo idle.

O mundo possui quatro bandas de risco: segura, disputada, mortal e selvagem.

---

## Economia

A economia gira em torno de recursos, refino, craft, equipamento, prata, durabilidade, carga e mercado.

Materiais de tiers inferiores continuam úteis porque participam das cadeias de produção de tiers superiores.

Coleta, produção e equipamento formam um ciclo contínuo de progressão.

Os detalhes quantitativos e as fórmulas estão em `docs/formulas-e-balanceamento.md`. O conteúdo do MVP está em `docs/dados-do-mvp.md`.

---

## Risco e PvP

PvP é **consentido e mútuo**.

Jogadores sinalizados podem enfrentar outros jogadores sinalizados nas zonas em que o PvP é permitido. O sinal é ligado e desligado na cidade.

As bandas de risco determinam as consequências do combate.

O sistema detalhado, suas decisões e exceções estão em `docs/decisoes-de-design.md`.

---

## Escopo atual

O MVP é **A Travessia completa**: a ilha tutorial, do fluxo inicial de conta/login/personagem até o fim da experiência tutorial.

A Travessia trabalha com quatro zonas, T1 e T2 e uma experiência segura.

A cobertura de sistemas e a organização dos dados do MVP estão em `docs/dados-do-mvp.md`.

O roadmap e as fatias de implementação estão em `docs/ROADMAP.md` e `docs/backlog/`.

---

## Servidor e cliente

O servidor é autoritativo: o cliente expressa intenção e apresenta a experiência; o servidor decide regras e resultados.

A arquitetura técnica, incluindo Game Core, HTTP, WebSocket, Game Loop, estado e persistência, está em `docs/arquitetura-consolidada.md`.
