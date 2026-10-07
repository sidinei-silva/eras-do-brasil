# Combate

## O que é
É a mecânica de luta do jogo, onde o jogador enfrente inimigos em turnos sejam eles NPCs ou outros jogadores. O combate é baseado em turnos, onde cada jogador tem um turno para escolher suas ações e atacar o inimigo. 

## Por que existe
O combate é uma parte importante do jogo, pois é através dele que o jogador pode ganhar experiência, recursos e itens. 
<!-- sugestão: ligar ao pilar de idle × ação (o ativo recompensa a decisão, o automatizado protege quem não pode estar presente) -->

## Como funciona
O combate é dividido em 2 formas: Combate ativo e combate automatizado. Algumas formas como funciona vai depender de como esta configurado o combate, se o jogador esta em combate ativo ou automatizado. E se o combate é contra NPCs ou outros jogadores.

### Entrada na luta
- **Contra NPCs, no ativo:** o jogador que esta no mapa aberto em uma determinada zona ver um inimigo ou um grupo de inimigos clica nele e entra em combate abrindo a tela de combate. Os encontros do mapa estão em [mundo.md](mundo.md).
- **Caçada automatizada:** ver [afk.md](afk.md).
- **Contra outros jogadores:** ver [pvp.md](pvp.md).

---

### Area de combate
A area de combate é o local onde o combate acontece, é recortado um pedaço do mapa aberto para uma instancia de combate, outros players não ver o combate acontecendo no mundo aberto é mostrado apenas o player e inimigo lado a lado, com uma ícone de combate. 

A area de combate é dividida em 3 filas, uma central e duas laterais. O jogador começa na fila central no canto esquerdo e o inimigo vem do canto direito podendo vim em qualquer uma das 3 filas, dependendo do inimigo e da sua configuração de spawn, elite e boss sempre vem na fila central. Caso o combate seja com mais de um inimigo, eles podem vim em qualquer uma das 3 filas, podendo vim 2 inimigos na mesma fila ou 1 inimigo em cada fila. Isso é definido por um algoritmo de spawn de inimigos que é definido pelo designer do jogo.

---

### Formato do combate
O combate é dividido em turnos, onde cada jogador tem um turno para escolher suas ações e atacar o inimigo.

#### Contra NPCs
Contra npcs o combate não tem limite de tempo para cada turno, o jogador pode pensar e escolher suas ações sem pressa.

#### Contra outros jogadores
O turno tem tempo limite. Regras em [pvp.md](pvp.md).

#### Ordem de turno
A ordem de turno é definida pelo sistema de iniciativa, onde cada jogador tem uma iniciativa definida por atributo [AINDA NÃO DEFINIDO] que servirá como peso para a escolha aleatória de quem vai começar o combate. Caso seja um grupo de inimigos eles são sorteados de maneira separadas

---

### Ativo e automatizado

#### Troca entre modos
Se o jogador fez qualquer ação manual durante a luta, incluindo tentar fugir, a luta conta como ativa para o preço da morte, mesmo que ela termine no automatizado. Quando o jogador assume o controle de uma luta que estava no automatizado, a interface avisa que a partir dali ela passa a contar como ativa.

- O preço da morte em cada modo está em [risco.md](risco.md).
- Assumir o controle durante uma caçada automatizada: ver [afk.md](afk.md).
- Troca de modo no PvP: ver [pvp.md](pvp.md).

---

### Movimentação
A movimentação do jogador e do inimigo é sempre feita em linha reta dentro da sua própria fila o mesmo não pode pular para uma fila adjacente. A movimentação acontece de maneira automática um passo por vez em cada turno, até onde o jogador pode se movimentar é configurável ou respeitado o tipo de arma que o jogador esta usando se é curta, média ou longa distância. O inimigo também se movimenta de maneira automática respeitando o mesmo tipo de arma que ele esta usando.

Além da movimentação comum existe habilidades que podem fazer com que o jogador ou inimigo se mova sendo habilidades de avanço ou recuo de maneira ativa ou reativa.

Também existo habilidades de controle de grupo que podem fazer com que o inimigo ou jogador se mova de maneira forçada, podendo ser empurrado, puxado ou paralisado, dependendo da skill usada.

---

### Habilidades
Dado que um jogador ja esteja devidamente equipado com todos seus equipamentos e armas, cada peça lhe oferece algumas skills sendo 3 skills para arma principal, 1 skill para equipamento do dorso, 1 skills para equipamento de cabeça, 1 skill para equipamento do calçado. Totalizando 6 skills que o jogador pode usar no combate mais o ataque normal.

#### Ativo
No combate de modo ativo o jogador pode escolher qual skill usar respeitando o tempo de recarga de cada skill.

#### Automatizado
As skills seguem a automação do jogador. Ver [automacao.md](automacao.md).

#### Tempo de recarga
Cada skill tem um tempo de recarga, o qual é definido pelo designer do jogo, o tempo de recarga é respeitado tanto no combate ativo quanto no combate automatizado, o jogador não pode usar a mesma skill novamente até que o tempo de recarga dela acabe, e o tempo é diminuído a cada turno. A quantidade de tempo de recarga é definida pela skill e existe passivas que podem diminuir o tempo de recarga de skills. Ataques normais não tem tempo de recarga.

---

### Outras ações
Além de atacar o inimigo, o jogador pode escolher outras ações como: usar item ou tentar fugir do combate. Ambos com suas regras e mecânicas próprias e tempo de recarga.

#### Usar item
O jogador pode usar itens de cura, buffs ou debuffs, respeitando o tempo de recarga do item, o jogador pode usar apenas 1 item por turno, ao usar um item ele entra em cooldown e não pode ser usado novamente até que o tempo de recarga acabe.

- **Ativo:** no combate ativo o jogador pode escolher qual item usar respeitando o tempo de recarga de cada item.
- **Automatizado:** os itens seguem a automação do jogador. Ver [automacao.md](automacao.md).

#### Fugir do combate
O jogador pode tentar fugir do combate, respeitando a regra de tentativa de fuga. 
Fugir não é garantia de escapar, é a chance de escapar pagando menos do que morrer. Quem foge perde o que juntou naquela luta, mas preserva o que carrega e o teto do equipamento.

##### Chance de fuga
A chance é a fuga do jogador contra a anti-fuga dos inimigos. A fuga vem do equipamento, da montaria e das habilidades; a anti-fuga vem do tipo do inimigo e das habilidades dele. Quanto mais inimigos vivos, mais difícil fugir. A chance tem um piso e um teto: nunca é impossível e nunca é garantida. A chance não aumenta a cada tentativa que falha.

A posição também conta: estar longe dos inimigos facilita a fuga, e estar colado num inimigo de corpo a corpo dificulta.

##### Tentativa
Tentar fugir é a ação do turno. O jogador não ataca nem usa habilidade naquele turno.

Se falhar, o jogador perde o turno, os inimigos agem normalmente e o equipamento perde durabilidade. A luta continua e o jogador pode tentar de novo nos turnos seguintes. Se a vida acabar durante as tentativas, o jogador morre.

Se conseguir, o jogador leva um golpe de despedida dos inimigos que estão ao alcance da própria arma, perde o loot daquela luta e volta para o mapa aberto. Por um tempo, ele não pode atacar nem ser atacado por ninguém.

##### Cada um foge do seu jeito
Todas as árvores conseguem fugir, mas por caminhos diferentes:
- Projétil aumenta a chance, com distância e habilidades de recuo.
- Físico reduz o custo, aguentando o golpe de despedida e quebrando o que prende.
- Mágico ignora a posição, com teleporte e efeitos que tiram o jogador de alvo.

Calçados, torso e montaria somam fuga para qualquer árvore.

##### Ativo
No combate ativo o jogador escolhe quando tentar fugir. Como enxerga a intenção do inimigo, pode fugir antes de um golpe grande e preparar a fuga com habilidades de recuo.

##### Automatizado
A fuga no automatizado segue o limiar configurado na automação. Ver [automacao.md](automacao.md).

##### Contra outros jogadores
Ver [pvp.md](pvp.md).

##### Exceções
Alguns inimigos mudam a regra da fuga: anulam tentativas, dificultam mais que o normal ou impedem a fuga enquanto estiverem vivos.

---

### Intenção do inimigo
Para o combate ativo pve o jogador consegue ver a intenção do inimigo, se ele vai atacar, usar habilidade ou tentar fugir. Isso permite que o jogador se prepare para o ataque do inimigo e escolha a melhor ação para o turno. 

## Sem configurar nada
<!-- o que acontece para quem só entra e luta no ativo -->

## Para quem quer ir fundo
- Montar a build para fugir barato ou para segurar quem foge.
- Preparar a fuga no ativo: recuar, prender, depois fugir.
- Criar build para cada tipo de luta.

## Liga com
- [Automação](automacao.md) (skills, itens, alvo e fuga no automatizado)
- [AFK](afk.md) (caçada automatizada)
- [PvP](pvp.md) (luta entre jogadores, atacante e atacado)
- [Risco](risco.md) (preço da morte no ativo e no automatizado)
- [Durabilidade](durabilidade.md) (custo da fuga que falha)
- [Equipamento](equipamento.md) e [Mundo](mundo.md) (skills por slot, montaria como fonte de fuga)

## Em aberto
- O que "preso" faz com a fuga: impede ou só dificulta?
- Como evitar que aproximar e prender trave a fuga para sempre.
- Qual atributo define a ordem dos turnos.
- A fuga precisa de tempo de recarga entre tentativas, ou o turno perdido basta?

## Decisões
| Data       | Decisão                                                | Por quê                                                             |
| ---------- | ------------------------------------------------------ | ------------------------------------------------------------------- |
| 2026-10-06 | A chance de fuga não aumenta a cada falha              | Fuga alta tem que significar fugir barato, não só fugir mais rápido |
| 2026-10-06 | A anti-fuga cresce com o número de inimigos            | Sem isso, uma build de fuga ficava imune                            |
| 2026-10-06 | Tentar fugir é a ação do turno                         | Cria o jogo de preparar a fuga e de impedi-la                       |
| 2026-10-06 | A fuga que falha custa durabilidade, não teto          | Teto fica reservado para consequências graves: morte e upgrade      |
| 2026-10-06 | Todas as árvores fogem, cada uma do seu jeito          | Ninguém fica sem saída por causa da arma                            |
| 2026-10-06 | Quem foge fica protegido de qualquer luta por um tempo | Evita reengajar na hora e o abutre que espera a vida baixa          |
| 2026-10-06 | Qualquer ação manual faz a morte contar como ativa     | Fecha o exploit de trocar para o automatizado para morrer barato    |
<!-- registrar: o botão de pânico saiu (no PvE o turno já espera; no PvP o automatizado assume) -->