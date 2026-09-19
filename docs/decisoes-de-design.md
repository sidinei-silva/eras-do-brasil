# Decisões de design

Decisões tomadas, **com o motivo e o que foi descartado**. Conclusão sem raciocínio não impede ninguém de reabrir a discussão.

**Este documento não espelha dado.** Zona, material, arma, mob, skill e número vivem nos JSONs em `data/` e no `formulas-e-balanceamento.md`. Aqui fica só o que não cabe em tabela.

Sucede o `compendio-completo.md`, que era uma fotografia de 13/09/2026 e começou a defasar no dia seguinte.

---

## Regras de método


- Nos documentos, separar o que está escrito do que é proposta.
- **Lore é puxada, não empurrada**: escreve-se quando uma fatia precisa. Teste — se o jogador nunca ler isto, ele joga pior?
- **Arquitetura definitiva em escala reduzida.** Nada de desenho descartável porque é MVP.
- **Mecânica não se poetiza.** Item e habilidade podem ter nome próprio; sistema não. Nome de sistema global não pode vir de uma era nem de uma facção.
- Toda constante mora em arquivo de dados, nunca em código.
- **Decisão registrada é decisão.** Reabrir exige dizer o que mudou.

---

## Mundo — regras estruturais

- **O Coração da Raiz é passagem, não destino.** Cidade segura no centro, cercada de zona mortal, e é por ela que se chega ao segundo continente.
- **Nenhuma regra lê `regionId`.** Região é rótulo de bioma e nada mais; a zona é a unidade de tudo (ver `o-jogo.md`).
- **Cinco campos independentes na modelagem:** continente, era, região, tier e risco. Nenhum deriva do outro.
- Toda zona precisa de pelo menos dois caminhos, senão vira corredor.
- **Facção é por zona, não por região**, e nenhuma facção pode ter duas zonas seguidas no mesmo tier.
- **A geografia não é o mapa do Brasil.** As eras não estão nas posições cartográficas reais. Decisão irreversível, paga pelas distorções da Ruptura.
- **Uma era para ser jogo, duas para ser este jogo** — sem duas eras não existe mistura de eras no equipamento, que é a fantasia central.

### O tutorial numa ilha não visitavel

A objeção original era de lore: não fazia sentido tirar um indígena do Brasil para devolvê-lo ao Brasil. **Ela caiu** porque o jogador não tem origem, e porque o lugar do tutorial não precisa ser o Brasil histórico. É o meio do caminho, e você não volta porque estava indo.

**Ganho:** desacopla o MVP dos dados do mundo, e libera a Costa do Pau-Brasil para começar em T2.

**A objeção de produção sobrevive, reduzida:** você constrói quatro zonas e descarta. Ela encolhe se a ilha usar o mesmo kit de asset da Costa. **Nada de bioma exclusivo da ilha.**

### T1 é craftável

A regra antiga — T1 é sucata emprestada, não craftável — vinha da lore da Escória, em que a primeira forja era o momento em que um deus reparava no jogador. **Não há mais deus dentro de arma**; o motivo morreu na fusão.

Com T1 craftável, a aula de forja vem cedo como no Albion, e a escolha de tradição continua no T2.

**Pedra, madeira e couro T1 se coletam sem ferramenta.** Sem essa exceção, você precisaria de ferramenta para fazer ferramenta.

---

## PvP e risco

### Sinalização

PvP é **consentido e mútuo**, no modelo do Albion. As regras — quem ataca quem, e o que cada banda faz perder — estão em `o-jogo.md`; aqui fica o porquê.

**A flag liga e desliga só na cidade** porque desligar exige voltar, o que mantém caçar como compromisso e não como invisibilidade sob demanda.

### Por que alguém sinalizaria

Esta é a decisão que faz o sistema existir, e sem ela tudo o mais é cenografia.

Num jogo com controle direto, sinalizar tem contrapartida imediata. Num idle, sinalizar é risco sem ganho, porque o jogador não está lá para aproveitar nada — **ninguém sinalizaria, e disputada e mortal teriam PvP no papel e zero PvP na prática.**

**A resposta: artefato bruto só cai para sinalizado.** Isso amarra na estrutura que já existe — artefato dropa não purificado, purificar exige reputação com a facção dele — e o mercado de purificação só existe porque alguém aceitou risco.

O coletor tranquilo continua existindo e progredindo. O topo do jogo passa por aceitar risco.

### Contador de sinalizados

O contador público de sinalizados por zona só é honesto porque a flag é mútua: **todo mundo que aparece nele escolheu aparecer.** Ninguém expõe quem não optou.

**Adjacência foi descartada.** A zona é a unidade de tudo no jogo — recurso, risco, facção, mob, viagem. PvP enxergar além dela faria o sistema falar uma língua que o resto do jogo não fala, e obrigaria o jogador a vigiar mapas vizinhos.

**Sem pareamento entre zonas.** O que foi rejeitado é pareamento que move o jogador de uma zona para outra: tornaria irrelevante a geografia que o projeto inteiro faz questão de tornar relevante. A busca dentro da zona sempre existiu — é o contador mais a fila de prioridade por consentimento decrescente — e o contador gera o jogo sozinho: quem sinaliza já está no conjunto pequeno de quem também sinalizou, e o mapa faz o trabalho de encontro.

Se o número for baixo demais, o problema é de população, e a resposta certa é **concentrar** — menos zonas com PvP habilitado — e não espalhar a busca para fora da zona.

### Proteção do coletor

**Com a flag mútua, o coletor não sinalizado simplesmente não pode ser atacado.** Ele está protegido por não sinalizar, e não precisa de mais nada.

**Descartado: condição de parada por sinalizado na zona.** Sobrou de uma versão em que a flag não era mútua. Era redundante e, pior, virava ferramenta de negação — um sinalizado andaria pelo mapa parando o farm de todo mundo sem lutar com ninguém.

O que continua protegendo quem escolhe sinalizar: o contador público antes de viajar, e os pontos de fuga que ele levou no equipamento.

**O Faro ganha função definitiva aqui.** O contador diz quantos; o Faro diz quem.

### Herdado sem mudança

Valem as decisões de PvP já fechadas: fila de prioridade por consentimento decrescente, offline intocável, postura em vez de loadout separado, full loot só na fase 2. A disputada é o laboratório.

### Reputação

**Adiada.** O destino dela é a purificação de artefato, descrita acima: ou o jogador sobe com uma facção baixando a rival, ou compra purificado no mercado — o que cria o purificador como profissão.

Critério de corte: se até o T4 não houver o que a reputação destranque, ela não entra.

---

## Guardado para depois

As seções abaixo descrevem coisas que **não existem e foram deliberadamente adiadas**. Estão aqui porque registram o que foi cortado e por quê — sem isso, os assuntos voltam.

### NPCs e mundo vivo

#### A escada de simulação

| Degrau                    | Custa                 | Entrega num idle          |
| ------------------------- | --------------------- | ------------------------- |
| 0 · Estação               | nada                  | o jogo funciona           |
| 1 · Estado e estoque      | uma tabela e um timer | motivo para voltar depois |
| 2 · Rotina                | o relógio dia e noite | conteúdo com janela       |
| 3 · Necessidade           | utility AI por NPC    | quase invisível           |
| 4 · Conhecimento e fofoca | memória e expiração   | só se a informação valer  |

**O MVP precisa do degrau 0.** Um NPC: o **Língua** — cargo histórico real, o intérprete que transitava entre os povos sem pertencer a nenhum. Espelho do jogador.

**O degrau 1 entra no MVP.** É o melhor negócio do projeto.

**Guardado:** rotina, necessidades, `knowledgeBase`, fofoca, relógio dia e noite, ciclo da maré.

**Cortado:** companheiros e mercenários.

**Entra:** migração de mob, dentro da faixa de tier da zona ou com sinal visível.

**Princípio registrado:** simulação que não muda nunca vira cenário. NPCs lutando há um ano não dão impressão de guerra, dão impressão de loop.

**Fofoca só valeria se a informação fosse perecível** — e o boletim público já resolve o caso de uso. A cadeia de fofoca, se um dia existir, tem que terminar num **nó temporário**, não numa receita: receita criaria um segundo canal de desbloqueio e faria a Árvore do Destino deixar de ser fonte única.

### Temporadas

**Ficam para depois do lançamento.** É o que vai distanciar o jogo do Albion e por isso mesmo não pode ser feito antes de haver jogo.

- **Expansão traz era; temporada traz evento.** Uma não implica a outra.
- **Regra do resíduo:** todo evento deixa mudança permanente numa zona. O evento queima; a zona alterada fica.
- **Ecos** — o passado vira instância repetível. Constrói-se uma vez, serve duas.
- **Sem reset.**
- **Nunca anunciar data.**
- Temporada mínima viável: um evento com resíduo, um ranking sazonal, um título, um ajuste de balanceamento.

### Teto de Poder de Item

O Albion usa dois: um teto rígido e um teto suave por conteúdo. Servem para o veterano não ficar intocável.

**Não implementar agora.** Está registrado para que exista e para que o motivo não se perca.

### A camada ampla de especialização

No Albion, especializar numa arma dá um pouco para **todas as armas do arquétipo**. Isso faz trocar de arma não recomeçar do zero, e para um jogo cuja fantasia é misturar equipamento, é o que torna experimentar barato.

### O reset da Afinidade

Existem **dois** sistemas punindo troca de arma — a Afinidade, que reseta, e a maestria, que é por arma. O Albion tem só o segundo. Somados, empurram o jogador a ficar com uma arma para sempre, contra o pitch do jogo. Vale rever se a Afinidade deve resetar ou apenas pausar.

---

## Bota-fora

Combate D20. Grid isométrico, posicionamento e cobertura. Modo RPG de mesa. As 18 mini-campanhas. Variáveis procedurais por Save. O termo "Desperto" e o conceito de Escolhido. Companheiros e mercenários. Rebirth. Receita destravada por NPC.


---

## Combate — dois relógios, seis slots e prioridade

**Decisão.** Sem tick e sem turno: dois relógios em paralelo e uma ordem de prioridade. A regra completa está em `o-jogo.md`; aqui fica o porquê.

**O que havia antes, e por que caiu.** O modelo era um ciclo fixo `Q Q Q Q E` num tick de dois segundos. Aquilo foi **placeholder consciente**, suficiente para validar tempo de morte, curva de progressão, economia e durabilidade — e nada além disso. Não tinha ataque básico, velocidade de ataque, recarga, custo de recurso, e o W nem entrava no ciclo.

Com tick fixo, uma arma de 0,8 ataque por segundo e outra de 1,4 são impossíveis de distinguir. **A granularidade matava a diferença entre as armas**, que é justamente o que o projeto inteiro se propõe a ter.

**Por que orientado a evento e não tick fino.** Como a onda é fechada e o servidor já resolve a luta inteira de uma vez, o resultado natural é uma linha do tempo com marcações em segundos — *aos 0,0s bateu, aos 1,2s bateu, aos 2,4s soltou o especial*. É exatamente o que o cliente precisa para animar. Um tick só acrescentaria arredondamento.

### O slot é a restrição

**Descartado: lista de habilidades com desabilitar.** A primeira proposta foi uma lista única de prioridade com uma seção de desabilitadas embaixo. Perde porque **desabilitar é remendo**: a escolha deve acontecer na hora de montar o equipamento, não na hora de desligar o que sobrou.

**Consequência desenhada:** trocar uma peça de armadura troca uma habilidade ativa e uma passiva. Isso faz "você é o que veste" valer também dentro do combate, e não só nos atributos.

### Energia

**Existia implícita e nunca tinha sido criada.** A passiva *Poupança* reduz o custo de recurso das habilidades e a *Cabeça Limpa* regenera recurso — as duas mexiam num sistema que não existia no dado.

Chama-se energia e não mana porque serve às três árvores igualmente.

### O que isso ainda deve

Os valores de velocidade de ataque, recarga, custo e regeneração estão no dado marcados como **chute**, para o simulador ter o que calibrar. **Nenhum foi validado.**

O simulador itera por tick com ciclo fixo e precisa ser reescrito para fila de eventos. Os tempos de morte vão mudar, e com eles a calibração da progressão e da economia.

---

## Escala multiplicativa

**Decisão.** Dano, vida, armadura, custo de energia, barra e regeneração passam por uma curva multiplicativa, a do Albion. A fórmula e a tabela vivem em `formulas-e-balanceamento.md`, seção 3.

**Descartado: escala linear.** Ela fazia um T6 causar onze vezes o dano de um T1; a multiplicativa faz duas vezes e meia.

**Por quê.** Com escala linear, **o tier domina tudo e encantamento vira ruído** — e aí uma peça de era antiga bem trabalhada deixa de ser competitiva, que é o oposto da fantasia central do jogo. A curva achatada é o que faz "T4 obra-prima vale um T5 normal" ser verdade.

E há confirmação empírica: nas telas do Albion, 1,56× de Poder de Item vira 1,375× de dano. **Sublinear.** A curva multiplicativa reproduz isso; a linear não.

**Consequência: o conceito de AP some.** Não existe poder de ataque; existe o multiplicador. E vida e armadura passam pela mesma curva — se ficassem lineares com o dano multiplicativo, o tempo de morte dispararia com o tier.

**O fator relativo estreitou**, e os três valores mudaram juntos: de 0,4–2,5 para 0,5–1,8. Com a curva multiplicativa a diferença de tier já vem embutida; uma banda larga contaria o tier duas vezes, nas duas pontas.

**Custo de energia escala; recarga não.** As telas confirmam: custo sobe 1,385× enquanto o dano sobe 1,375×, e a recarga é 12s no T4 e 12s no T8. Por isso a habilidade guarda `energyCostBase`, e o custo real é calculado com a arma equipada.

**A barra e a regeneração seguem a mesma curva.** Deixá-las lineares com o custo multiplicativo foi um erro, e produzia o problema que a mudança queria eliminar, invertido: a habilidade ficava mais cara em relação à barra a cada tier.

**Efeito colateral bom:** dano por energia fica praticamente constante entre tiers. O tier dá volume absoluto maior, não custo-benefício melhor.

### A maestria daqui é mais generosa que a do Albion

Lá a especialização vai a 100 níveis e dá +2 de Poder de Item por nível — 1,19× no topo. Aqui dá +12 por nível e chega a 1,36× em trinta. Não está errado, mas vale saber que **a maestria vale quase um tier e meio**.

---

## Renomeações — e por quê

Todas seguem a mesma regra: **mecânica não se poetiza, e nome de sistema global não pode vir de uma era**.

| Antes                   | Agora                         | Motivo                                                                                  |
| ----------------------- | ----------------------------- | --------------------------------------------------------------------------------------- |
| Litania                 | **Árvore do Destino**         | vocabulário religioso da Era 1 num sistema do jogo inteiro; é a Destiny Board do Albion |
| Têmpera                 | **Afinidade**                 | metalurgia herdada da Escória, sem equivalente reconhecível                             |
| Doutrina de combate     | **Regras de combate**         | poesia onde cabia a palavra óbvia                                                       |
| Barracas                | **Estações**                  | soava estranho para uma fundição                                                        |
| Sopro                   | **Essência**                  | ninguém lembrava o que era; e estava amarrada aos Encantados, facção da Era 1           |
| firme, trêmula, rachada | **segura, disputada, mortal** | descreviam a distorção da Raiz em vez da regra                                          |
| A Bigorna (estação)     | **A Forja**                   | colidia com uma zona morta da Escória                                                   |

**Ecos ficou**, por ser nome de conteúdo e não de sistema.

---

## De onde veio

O projeto nasceu como *A Escória*, um MMORPG idle sem mundo próprio, e foi fundido com *Eras do Brasil*; a arquitetura e a gramática do Albion vieram da primeira, lore, mundo e mecânicas do segundo. Isso fica registrado porque três decisões só se sustentam com a história — T1 é craftável porque a regra antiga vinha de uma lore com deus dentro de arma; A Forja se chama assim porque *A Bigorna* colidia com uma zona morta do jogo antigo; e parte das renomeações acima herdou vocabulário dele — e sem isso escrito alguém as desfaz achando que são arbitrárias. O resto do material antigo está arquivado e não deve ser consultado.
