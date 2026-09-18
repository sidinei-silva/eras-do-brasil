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

- **Era é um cluster de zonas** com hub na borda externa e tier subindo em direção ao centro. Eras ficam lado a lado; não empilham no tempo nem no nível.
- **O Coração da Raiz é passagem, não destino.** Cidade segura no centro, cercada de zona mortal, e é por ela que se chega ao segundo continente.
- **Zona é a unidade de tudo.** Não há portão entre regiões — região é rótulo de bioma, e nenhuma regra lê `regionId`.
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

## Escopo por fase

| Fase         | Conteúdo                                        |
| ------------ | ----------------------------------------------- |
| **MVP**      | ilha da Travessia: 4 zonas, T1–T2, banda segura |
| Era 1        | 22 zonas, T1–T6, três facções                   |
| Continente 1 | 4 eras, 60 a 100 zonas                          |
| Completo     | mais o Emaranhado, T6–T8                        |

---

## PvP e risco

### Sinalização e bandas

PvP é **consentido e mútuo**, no modelo do Albion: sinalizado pode atacar e ser atacado; não sinalizado não faz nem uma coisa nem outra.

| Banda                     | Regra                                             |
| ------------------------- | ------------------------------------------------- |
| Segura                    | ninguém ataca ninguém, mesmo sinalizado           |
| Disputada                 | sinalizado contra sinalizado, perda parcial       |
| Mortal                    | sinalizado contra sinalizado, perda total         |
| Emaranhado (continente 2) | entrar é consentir; não há flag e não há contador |

**A flag liga e desliga só na cidade.** Desligar exige voltar, o que mantém caçar como compromisso e não como invisibilidade sob demanda.

### Por que alguém sinalizaria

Esta é a decisão que faz o sistema existir, e sem ela tudo o mais é cenografia.

Num jogo com controle direto, sinalizar tem contrapartida imediata. Num idle, sinalizar é risco sem ganho, porque o jogador não está lá para aproveitar nada — **ninguém sinalizaria, e disputada e mortal teriam PvP no papel e zero PvP na prática.**

**A resposta: artefato bruto só cai para sinalizado.** Isso amarra na estrutura que já existe — artefato dropa não purificado, purificar exige reputação com a facção dele. Sinalizar vira a porta de entrada de todo o conteúdo de T4 em diante, e o mercado de purificação só existe porque alguém aceitou risco.

O coletor tranquilo continua existindo e progredindo. O topo do jogo passa por aceitar risco.

### Contador de sinalizados

Cada zona mostra **quantos sinalizados há nela**. Público e gratuito, consultável antes de viajar.

Isso só é honesto porque a flag é mútua: **todo mundo que aparece no contador escolheu aparecer.** Ninguém expõe quem não optou.

**Adjacência foi descartada.** A zona é a unidade de tudo no jogo — recurso, risco, facção, mob, viagem. PvP enxergar além dela faria o sistema falar uma língua que o resto do jogo não fala, e obrigaria o jogador a vigiar mapas vizinhos.

**Sem matchmaking.** O contador gera o jogo sozinho: quem sinaliza já está no conjunto pequeno de quem também sinalizou, e o mapa faz o trabalho de encontro. Matchmaking teleportaria gente e tornaria irrelevante a geografia que o projeto inteiro faz questão de tornar relevante.

Se o número for baixo demais, o problema é de população, e a resposta certa é **concentrar** — menos zonas com PvP habilitado — e não adicionar ferramenta de busca.

### Proteção do coletor

Num idle a defesa não pode ser reação; tem que ser **compromisso prévio**. Três camadas, todas já existentes:

- **A escolha da zona**, com o contador público antes de viajar.
- **Uma condição de parada na regras de combate:** parar se um sinalizado entrar na zona. O personagem interrompe e fica onde está, aguardando ordem.
- **O equipamento** que ele levou: os pontos de fuga, testados no simulador.

**O Faro ganha função definitiva aqui.** O contador diz quantos; o Faro diz quem.

### Herdado sem mudança

Valem as decisões da página de PvP da Escória: fila de prioridade por consentimento decrescente, offline intocável, postura em vez de loadout separado, full loot só na fase 2. A disputada é o laboratório.

### Reputação

**Adiada.** O destino dela: artefato dropa não purificado, e purificar exige reputação com a facção dele. Ou o jogador sobe com uma baixando a rival, ou compra purificado no mercado — o que cria o purificador como profissão.

Critério de corte: se até o T4 não houver o que a reputação destranque, ela não entra.

---

## NPCs e mundo vivo

### A escada de simulação

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

---

## Temporadas

**Ficam para depois do lançamento.** É o que vai distanciar o jogo do Albion e por isso mesmo não pode ser feito antes de haver jogo.

- **Expansão traz era; temporada traz evento.** Uma não implica a outra.
- **Regra do resíduo:** todo evento deixa mudança permanente numa zona. O evento queima; a zona alterada fica.
- **Ecos** — o passado vira instância repetível. Constrói-se uma vez, serve duas.
- **Sem reset.**
- **Nunca anunciar data.**
- Temporada mínima viável: um evento com resíduo, um ranking sazonal, um título, um ajuste de balanceamento.

---

## Bota-fora

Combate D20. Grid isométrico, posicionamento e cobertura. Modo RPG de mesa. As 18 mini-campanhas. Variáveis procedurais por Save. O termo "Desperto" e o conceito de Escolhido. Companheiros e mercenários. Rebirth. Receita destravada por NPC.


---

## Combate — dois relógios, seis slots e prioridade

**Decisão.** Sem tick e sem turno. O ataque básico corre pela velocidade de ataque da arma; cada habilidade tem recarga e custo de energia próprios; a ordem de prioridade decide quem dispara quando mais de uma está pronta.

**O que havia antes, e por que caiu.** O modelo era um ciclo fixo `Q Q Q Q E` num tick de dois segundos. Aquilo foi **placeholder consciente**, suficiente para validar tempo de morte, curva de progressão, economia e durabilidade — e nada além disso. Não tinha ataque básico, velocidade de ataque, recarga, custo de recurso, e o W nem entrava no ciclo.

Com tick fixo, uma arma de 0,8 ataque por segundo e outra de 1,4 são impossíveis de distinguir. **A granularidade matava a diferença entre as armas**, que é justamente o que o projeto inteiro se propõe a ter.

**Por que orientado a evento e não tick fino.** Como a onda é fechada e o servidor já resolve a luta inteira de uma vez, o resultado natural é uma linha do tempo com marcações em segundos — *aos 0,0s bateu, aos 1,2s bateu, aos 2,4s soltou o especial*. É exatamente o que o cliente precisa para animar. Um tick só acrescentaria arredondamento.

### O slot é a restrição

**Descartado: lista de habilidades com desabilitar.** A primeira proposta foi uma lista única de prioridade com uma seção de desabilitadas embaixo. Perde porque **desabilitar é remendo**: a escolha deve acontecer na hora de montar o equipamento, não na hora de desligar o que sobrou.

Seis slots ativos, cada um aceitando só habilidade da própria fonte — três da arma, três da armadura. O **Especial é fixo pela arma**, e é o que diferencia duas armas da mesma árvore. Mais quatro slots de passiva e as fixas de montaria e bolsa.

**Consequência desenhada:** trocar uma peça de armadura troca uma habilidade ativa e uma passiva. Isso faz "você é o que veste" valer também dentro do combate, e não só nos atributos.

### Energia

**Existia implícita e nunca tinha sido criada.** A passiva *Poupança* reduz o custo de recurso das habilidades e a *Cabeça Limpa* regenera recurso — as duas mexiam num sistema que não existia no dado.

Chama-se energia e não mana porque serve às três árvores igualmente.

### O que isso ainda deve

Os valores de velocidade de ataque, recarga, custo e regeneração estão no dado marcados como **chute**, para o simulador ter o que calibrar. **Nenhum foi validado.**

O simulador itera por tick com ciclo fixo e precisa ser reescrito para fila de eventos. Os tempos de morte vão mudar, e com eles a calibração da progressão e da economia.

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

## Vocabulário morto

O projeto nasceu como *A Escória* e foi fundido com *Eras do Brasil*. **Não existem mais:** Lastro; panteões e deuses dentro de armas; gank por adjacência; as zonas A Ressaca, A Bigorna, O Verde Surdo, A Costela e A Encruzilhada; combate D20; as classes como classes; e o módulo Go chamado `escoria`.

Se esse vocabulário aparecer em material antigo, é resíduo.
