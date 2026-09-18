# O jogo

Leitura de cinco minutos. O que é, como se joga, e quais são os sistemas. Sem tabela de dado — para número e conteúdo, os JSONs em `data/` são a verdade.

---

## Em três frases

**MMORPG idle de fantasia folclórica brasileira, com a gramática de progressão do Albion Online.**

Não há classe: **você é o que veste**. O mundo é feito de eras do Brasil dispostas lado a lado ao redor da Raiz do Mundo, e o jogador é um forasteiro que a Raiz puxou, sem origem e sem lado.

**A fantasia central:** montar uma build com peças de séculos diferentes.

---

## O que o jogador faz

Ele **não controla movimento**. Escolhe uma ação numa zona e observa o personagem executá-la.

```
escolher zona → escolher ação → observar → recolher o resultado → decidir de novo
```

**Coletar** — o personagem anda até o recurso e entra em loop de coleta.
**Lutar** — a cena troca para a arena, a onda de mobs nasce e a luta acontece.
**Viajar** — a animação de viagem serve de carregamento até a zona seguinte.
**Produzir** — no hub, refinar material e fabricar equipamento.

Sessão curta funciona; sessão longa rende mais. O jogo **recompensa presença e nunca pune ausência**.

---

## Progressão

Sobe **o que você faz**, não o personagem.

**A Árvore do Destino** tem quatro ramos independentes: combate, coleta, refino e craft. Cada ação alimenta o nó correspondente. Nada de nível global.

**Tier** vai de 1 a 8 e é **qualidade de material mais profundidade de nó** — não uma lista diferente de armas. A mesma linha atravessa os tiers em material melhor.

**Maestria dá poder de verdade.** Trinta níveis num nó de combate valem quase um tier inteiro contra um alvo acima do seu. É por isso que o grind continua valendo depois que o tier abriu.

**Afinidade** é um multiplicador que sobe usando a mesma arma e reseta ao trocar. Congela quando você sai; nada acumulado se perde.

**Não há rebirth.** Progressão é catraca. O que substitui recomeço é largura: outra árvore, outra era, outra facção.

---

## Identidade e equipamento

Sete slots: mão principal, off-hand, cabeça, torso, botas, montaria e bolsa. Até catorze habilidades equipadas ao mesmo tempo.

**Três árvores de habilidade** — físico, projétil e mágico — e cada uma comporta dois papéis. A árvore é o kit de Q, W e passivas, compartilhado por todas as armas dela. **A arma acrescenta arte e um E exclusivo**, e a identidade vem de qual subconjunto do pool ela acessa.

**Era nova nunca traz árvore nova.** Traz armas dentro das que existem.

**Armadura tem três linhas** — pesada, média e leve — com três slots cada. O torso declara a linha; cabeça e botas são intercambiáveis. Conjunto puro dá bônus; misturar dá combinação de habilidade que nenhum conjunto puro alcança.

**Arma cara com armadura ruim performa pior que um conjunto inteiro um tier abaixo.** Isso é desenhado, e mata o vício de todo jogo gear-based.

---

## Combate

**Auto-battler, sem posicionamento.** "Área" significa número de alvos — não formato nem alcance.

O jogador escolhe um acampamento na zona e a **onda nasce fechada**: só nasce a próxima quando a anterior morre inteira. Teto de cinquenta rodadas por onda; se estourar, é impasse.

Como a onda é fechada, **o servidor resolve a luta inteira e manda a linha do tempo pronta**. O cliente só anima.

### Os dois relógios

Não há turno nem tick. Duas coisas correm em paralelo:

**O ataque básico** dispara a cada `1 ÷ velocidade de ataque` segundos. Velocidade de ataque é atributo da arma — espada rápida e fraca por golpe, tacape lento e pesado. Não ocupa slot, não custa energia e nunca para.

**As habilidades** têm recarga própria e custam energia. Quando ficam prontas, disparam pela ordem de prioridade.

É daí que sai a primeira decisão real de build: **bater muitas vezes fraco ou poucas vezes forte.**

### O loadout é o combate

Seis slots ativos, e o slot é a restrição — cada um só aceita habilidade da fonte dele:

| Slot      | Vem de            | Escolha                      |
| --------- | ----------------- | ---------------------------- |
| Ataque    | arma              | entre os Q que a arma acessa |
| Utilidade | arma              | entre os W que a arma acessa |
| Especial  | arma              | **fixo pela arma**           |
| Cabeça    | capacete          | entre as ativas da peça      |
| Torso     | armadura de torso | entre as ativas da peça      |
| Botas     | botas             | entre as ativas da peça      |

Mais quatro slots de passiva, um por peça e um da arma, e as passivas fixas da montaria e da bolsa.

**Depois de preencher, o jogador ordena a prioridade entre os seis.** Quando mais de uma está pronta e há energia, dispara a de prioridade mais alta.

Não existe lista de desabilitadas: quem não quer uma habilidade simplesmente não a escolhe no slot.

### Energia

Recurso das habilidades, comum às três árvores. Regenera com o tempo e tem teto que cresce com o poder de item. Habilidade barata e rápida no topo da prioridade seca a barra; habilidade cara exige guardar.

### Regras de combate

Configuradas antes, porque num idle ninguém está olhando. A cada evento o servidor verifica, nesta ordem: condição de parada, limiar de retirada, limiar de cura, e então dispara o que estiver pronto.

Parar significa **parar no lugar**, nunca voltar para a cidade. Poção dispara por limiar de vida e fica fora da prioridade.

**Retirada usa a mesma matemática da fuga em PvP.** Pontos de fuga vêm do equipamento; falhar custa tempo e durabilidade. O atributo significa *escapar barato*, não *escapar*.

---

## Mundo

**Três continentes.** A Travessia é a ilha do tutorial, não revisitavel. As Eras é o mundo principal. O Emaranhado é o fim de jogo, muito posterior.

**Era é um cluster de zonas** com hub na borda externa e tier subindo em direção ao centro. Eras ficam **lado a lado**, não empilham no tempo nem no nível, e todas encostam no Coração da Raiz.

**Zona é a unidade de tudo** — recurso, risco, facção, mob e viagem. Cidade é uma zona. Não há portão entre regiões: região é só rótulo de bioma.

**Viagem custa minutos reais**, e é o relógio do idle.

**Quatro bandas de risco:** segura, disputada, mortal e selvagem.

---

## Economia

**Cinco tipos de recurso**, cada um em seis tiers. Material não defasa, porque o refino de tier alto consome o tier anterior — zona T1 nunca morre. Arma defasa, e tudo bem.

**Coleta é escolha de nó, nunca sorteio de tier.** A zona garante o material; o sorteio fica na qualidade e no encantamento. Piso garantido, teto aberto.

**Estações de produção**: cinco de refino, uma por material, e quatro de craft, ligadas às três árvores mais as ferramentas.

**Vestir custa material e prata em paralelo.** No começo vestir custa mais que subir de tier; no fim, subir custa o dobro de vestir. **É essa inversão que empurra o jogo de tier alto para o mercado.**

**Durabilidade cai por uso, morte e fuga fracassada.** Abaixo de 50% o item perde poder de item; abaixo de 10% não serve. Conserto é o principal sumidouro de prata. E morrer tem chance de itens quebrarem 100% e não ter serventia.

**Carga não teleporta de graça.** Montaria rápida carrega pouco, lenta carrega muito. Armazém só nas cidades.

---

## Risco e PvP

**PvP é consentido e mútuo.** Sinalizado pode atacar e ser atacado; não sinalizado não faz nem uma coisa nem outra. A flag liga e desliga só na cidade.

**Só existe em zona disputada e mortal.** No Emaranhado, entrar é consentir.

Cada zona mostra **quantos sinalizados há nela**, público e gratuito. Isso só é honesto porque todo mundo que aparece ali escolheu aparecer.

**O que faz alguém sinalizar:** artefato bruto só cai para sinalizado. É a porta de entrada do conteúdo de T4 em diante.

---

## O que o servidor decide e o que o cliente decide

**Servidor:** dano, prata, drop, fama, durabilidade, quem morreu, qual mob nasceu e se veio elite. Tudo que é regra.

**Cliente:** posição, colisão, pathing, câmera, animação, onde fica cada nó no terreno. Tudo que é apresentação.

**O servidor nunca manda coordenada.** Layout de zona é conteúdo estático, versionado e distribuído com o cliente.

---

## Estado

**MVP** — a ilha da Travessia: quatro zonas, T1 e T2, banda segura, o tutorial inteiro.
**Era 1** — 22 zonas, T1 a T6, três facções em conflito.
**Continente 1 completo** — quatro eras.
**Jogo completo** — mais o Emaranhado.

Detalhe do MVP em `dados-do-mvp.md`. Decisões com o porquê em `decisoes-de-design.md`. Números em `formulas-e-balanceamento.md`. Servidor em `arquitetura-consolidada.md`.
