# Histórico e estudos — Eras do Brasil

> **Natureza deste documento:** histórico de raciocínio, estudos, alternativas e evolução do projeto.
>
> Este arquivo **não é fonte de verdade do jogo**. Ele preserva contexto útil para entender por que determinadas ideias apareceram, mudaram ou foram descartadas.
>
> Quando houver conflito entre este documento e o estado atual do projeto, o estado atual do projeto prevalece.

---

## 1. Para que este histórico existe

O projeto Eras do Brasil passou por várias fases de exploração de design, lore, arquitetura, dados, balanceamento e direção de arte. Parte desse raciocínio ficou registrada em conversas com ChatGPT e Claude e parte acabou incorporada aos documentos do projeto.

Isso criou uma mistura entre:

- documentação normativa;
- decisões atuais;
- justificativas das decisões;
- alternativas descartadas;
- vestígios de versões anteriores;
- material de estudo e pesquisa.

A intenção deste documento é separar essas coisas.

Os documentos atuais do projeto devem continuar contendo aquilo que precisa ser consultado para construir o jogo. Este histórico preserva apenas o contexto que é útil para compreender a evolução do projeto.

---

# 2. Origem: A Escória → Eras do Brasil

Eras do Brasil não começou como um projeto completamente isolado.

O projeto anterior, **A Escória**, forneceu parte importante da experiência inicial de design e arquitetura, especialmente:

- exploração de um MMORPG idle;
- progressão inspirada na gramática de Albion Online;
- ausência de classes tradicionais;
- importância do equipamento para definir a build;
- servidor autoritativo;
- estudo de HTTP e WebSocket;
- modelagem de atividades temporizadas;
- preocupação com concorrência e ownership de estado;
- separação entre domínio, transporte, dados estáticos e persistência.

Durante a evolução do projeto, houve uma fusão/reformulação. A consequência importante foi separar o que era apenas aprendizado técnico do que pertencia à identidade de A Escória.

A regra que acabou se consolidando foi:

> arquitetura e aprendizados técnicos podem ser reaproveitados; lore, mundo, nomes e mecânicas específicas precisam pertencer ao projeto Eras quando forem adotados por ele.

Conceitos antigos de A Escória não devem ser tratados como regras de Eras apenas porque apareceram em conversas anteriores.

---

# 3. Evolução da visão de jogo

## 3.1. Gramática de progressão inspirada em Albion

Uma das linhas mais persistentes dos estudos foi usar **Albion Online como referência de estrutura de progressão**, e não como conteúdo a ser copiado.

A ideia central que permaneceu foi:

- não existem classes rígidas;
- o equipamento define grande parte da identidade mecânica;
- progressão vertical acontece por tier;
- diferentes famílias de equipamento criam diferentes linguagens de combate;
- a progressão pode ser combinada com conteúdo histórico brasileiro.

Nos estudos antigos apareceram várias decomposições possíveis de:

- tier;
- família;
- arma;
- era;
- origem/facção;
- habilidade E;
- Q/W/passivas;
- artefatos.

Uma formulação que ajudou a organizar o pensamento foi:

- **Tier** = evolução vertical;
- **Família** = linguagem mecânica;
- **Arma** = manifestação concreta;
- **Era** = contexto histórico;
- **Origem/Fação** = tradição;
- **E** = assinatura mecânica da arma;
- **Q/W/passivas** = linguagem compartilhada da família;
- **Artefato** = manifestação excepcional.

Essa formulação é histórica e deve ser conferida contra os documentos atuais antes de ser usada como regra.

---

## 3.2. Eras, tiers e mundo

Em explorações anteriores, houve tentativas diferentes de relacionar:

- Era;
- região;
- tier;
- distância da Raiz;
- risco;
- continente.

Também foi discutida a ideia de que as Eras poderiam coexistir espacialmente em vez de serem simplesmente capítulos cronológicos lineares.

A visão que acabou se aproximando do projeto atual foi:

- Eras são clusters de zonas;
- as Eras ficam lado a lado;
- a progressão vertical é representada por tier;
- o mundo não é simplesmente uma linha cronológica;
- a Raiz do Mundo funciona como elemento estrutural para a organização desse mundo;
- o Emaranhado pode reunir conteúdo de eras sobrepostas em uma etapa posterior.

O desenho atual do mundo está documentado nos arquivos atuais do projeto. As formulações anteriores são apenas histórico.

---

# 4. Evolução da ideia do tutorial

O tutorial passou por mudanças significativas.

Em uma fase anterior, foi imaginado como uma sequência mais convencional de zonas de tutorial, incluindo ideias como:

- zona de recepção;
- primeira vila;
- zonas de mundo aberto;
- NPCs apresentando sistemas;
- combate inicial;
- recompensa de equipamento;
- passagem para o mundo principal.

Também apareceu a preocupação de que retirar personagens de seus contextos históricos e depois devolvê-los ao Brasil poderia gerar problemas de coerência.

A solução conceitual que surgiu foi transformar a própria passagem para o mundo em parte da fantasia.

## A Travessia

A Travessia passou a ser entendida como um espaço **liminar**, e não simplesmente uma ilha de tutorial.

A ideia central desenvolvida nos estudos foi:

- o jogador não precisa ter uma origem histórica específica;
- ele é um forasteiro;
- a Raiz puxa pessoas e fragmentos de diferentes eras;
- a Travessia é uma passagem entre esse estado e o mundo;
- o tutorial pode ensinar os sistemas enquanto a própria situação narrativa justifica a presença do jogador.

A ideia de a Raiz permanecer visualmente presente durante a Travessia e desaparecer quando o jogador é expulso para o mundo começou como exploração e foi fechada como decisão em 20/09/2026. A formulação vigente está em `decisoes-de-design.md`.

Alguns conceitos foram explicitamente abandonados durante esse processo, entre eles:

- jogador como escolhido;
- identidade especial derivada de um “Eco”;
- Dom da Revivência;
- Mata Costeira como estrutura do tutorial;
- Vila de São Tomé;
- ritual de 1497.

A formulação atual de A Travessia deve ser lida nos documentos atuais do projeto, especialmente `o-jogo.md`, `dados-do-mvp.md` e os dados em `data/`.

---

# 5. Evolução das armas e habilidades

Nos estudos antigos houve uma discussão importante sobre como adaptar a lógica de famílias de armas.

Inicialmente apareceu a hipótese de tratar a família como um conjunto praticamente uniforme de habilidades.

Depois foi feita uma distinção mais precisa:

- habilidades Q/W/passivas podem formar a linguagem compartilhada da família;
- a arma concreta pode ter uma habilidade E própria;
- diferentes armas dentro da mesma família não precisam possuir o mesmo E;
- a Era pode dar contexto visual, histórico e material às armas sem necessariamente criar uma nova árvore de habilidades.

Essa distinção ajudou a evitar a explosão de árvores de habilidades conforme novas Eras fossem adicionadas.

A visão atual está consolidada nos documentos do jogo e deve prevalecer sobre as formulações históricas.

---

# 6. Evolução do combate

O combate também passou por uma mudança conceitual importante.

## Modelo antigo

Uma versão inicial trabalhava com combate contínuo, no qual novos inimigos poderiam aparecer conforme os anteriores morriam.

Esse modelo produzia uma luta sem fim naturalmente previsível e criava problemas para um jogo idle:

- era difícil saber quando o lote de combate terminaria;
- o servidor precisava preparar trechos futuros;
- jitter de rede poderia afetar a apresentação;
- havia mais estado intermediário para sincronizar.

## Modelo atual estudado

A solução foi transformar o combate em **onda fechada**:

1. o jogador escolhe o grupo;
2. a onda inteira é definida;
3. o servidor resolve a luta;
4. o servidor produz a linha do tempo;
5. o cliente apenas anima;
6. a próxima onda só nasce quando a anterior termina.

Também foi estabelecido um teto de rodadas para impedir lutas que nunca terminam.

Essa mudança simplificou a comunicação entre servidor e cliente e combinou melhor com o caráter idle do jogo.

A decisão atual está documentada em `o-jogo.md` e `arquitetura-consolidada.md`.

---

# 7. Evolução do tutorial e identidade do jogador

Durante o desenvolvimento apareceu uma preocupação recorrente: o jogador não deveria ser tratado como “o escolhido”.

A ideia evoluiu para:

- o jogador é um entre muitos;
- foi puxado pela Raiz;
- não precisa possuir uma origem histórica definida;
- a identidade vem progressivamente das escolhas de equipamento, progressão e tradição;
- o mundo não gira narrativamente em torno de uma única pessoa.

Essa mudança também ajudou a remover elementos de lore que exigiam uma explicação excessivamente especial para justificar o protagonista.

A diretriz atual é manter a lore mínima necessária para sustentar a experiência do jogo, evitando transformar o tutorial em uma exposição extensa do mundo.

---

# 8. Evolução da arquitetura do servidor

A arquitetura passou por uma sequência de estudos relativamente bem definida.

## 8.1. Primeira linha: estado protegido por mutex

Uma proposta inicial considerava estruturas de estado compartilhado protegidas por mutex.

A ideia era direta:

- handlers recebiam comandos;
- serviços modificavam agregados;
- locks protegiam o estado.

Essa abordagem é tecnicamente válida, mas criou uma quantidade grande de perguntas:

- quem segura o lock;
- por quanto tempo;
- o que pode acontecer enquanto o lock está segurado;
- como publicar eventos;
- como evitar deadlocks;
- como coordenar duas ações concorrentes do mesmo jogador.

---

## 8.2. Segunda linha: HTTP para comandos

Outra etapa explorou a possibilidade de usar HTTP como principal transporte para ações do jogo.

A ideia era:

- cliente envia intenção;
- servidor valida;
- servidor responde;
- cliente anima o resultado.

Para ações isoladas isso funciona muito bem.

O problema aparece quando o servidor precisa produzir eventos espontaneamente durante uma sessão contínua.

---

## 8.3. Terceira linha: single-owner + channel

A arquitetura evoluiu para **ownership do estado**.

A ideia passou a ser:

```text
WebSocket / HTTP
      │
      ▼
 commands chan
      │
      ▼
 Game Loop
      │
      ▼
 GameState
```

Uma única goroutine é dona do estado mutável do jogo.

A rede não modifica diretamente o estado.

Isso elimina uma classe de problemas de concorrência e torna explícita a sequência:

```text
Command → State → Event
```

---

# 9. Evolução de HTTP e WebSocket

O uso dos dois transportes também passou por discussão.

Foram consideradas alternativas como:

- HTTP para todas as ações;
- HTTP + polling;
- HTTP para comandos e WebSocket apenas para eventos;
- WebSocket desde o login;
- HTTP antes do mundo e WebSocket depois.

A formulação que se consolidou foi:

```text
HTTP
  ├── conta
  ├── login
  ├── refresh
  ├── personagem
  └── entrar no mundo
             │
             ▼
        WebSocket
             │
       comandos + eventos
```

A razão principal para o corte é arquitetural:

- antes de entrar no mundo, as operações são naturalmente request/response;
- depois de entrar no mundo, existe uma conexão contínua e bidirecional;
- comandos e eventos podem compartilhar a mesma ordem de transporte;
- o Game Core não precisa conhecer HTTP ou WebSocket.

Essa decisão é considerada uma decisão de transporte, não uma dependência do domínio.

---

# 10. Evolução do modelo temporal

O jogo idle levou à necessidade de representar ações pelo intervalo de tempo, em vez de executar tudo continuamente.

A formulação estudada foi:

```text
Activity
    StartedAt
    EndsAt
```

O servidor compara:

```text
now >= EndsAt
```

em vez de precisar acordar uma ação a cada milissegundo.

Isso levou à distinção entre:

- **tempo do jogo**: `time.Time`;
- **ticker**: mecanismo que verifica periodicamente se algo venceu.

Também foi estabelecido que o domínio deve receber `now` por parâmetro, em vez de chamar `time.Now()` internamente, para facilitar testes determinísticos.

---

# 11. Evolução da separação de dados

Outra linha importante de estudo foi separar:

```text
data → gamedata → bootstrap → game
```

O raciocínio foi separar:

- formato de armazenamento;
- definição estática;
- composição da aplicação;
- estado mutável do jogo.

Uma abordagem anterior fazia `gamedata` construir diretamente objetos de domínio. Ela funcionava, mas misturava responsabilidades.

A solução consolidada foi:

- `gamedata` carrega dados;
- `bootstrap` transforma/conecta dados e dependências;
- `game` trabalha com domínio e runtime.

Isso também levou à separação entre:

- `data/` — conteúdo que o servidor já carrega;
- `design/` — conteúdo projetado, mas ainda não carregado.

---

# 12. Evolução da organização de dados

Durante os estudos houve uma redução importante da quantidade de arquivos.

Foi considerada a ideia de dividir dados por:

- era;
- contexto;
- entidade;
- instância;
- zona.

A regra que acabou sendo estabelecida foi mais simples:

> um arquivo por tipo de entidade, usando categorias internas quando necessário.

A divisão deve acontecer quando:

- tipos diferentes de entidade estiverem misturados;
- ou um arquivo ficar realmente grande.

Não há necessidade de criar um arquivo por instância.

---

# 13. Evolução de zonas, mobs e acampamentos

Houve uma mudança estrutural na relação entre mapa e criaturas.

Antes, parte da relação entre mobs e zonas era bidirecional e redundante.

A estrutura que acabou prevalecendo foi:

```text
Zona
 └── Acampamentos
       └── referências aos mobs + tamanho do grupo
```

O arquivo de mobs funciona como um bestiário:

```text
Mob = definição da criatura

Zona/Acampamento = onde e como ela aparece
```

Essa separação evita repetir informação.

---

# 14. Evolução da arquitetura de bootstrap

Outra mudança importante foi perceber que a composição da aplicação merecia um lugar próprio.

A arquitetura passou a usar `bootstrap` como composition root:

```text
main
  │
  ▼
bootstrap
  ├── gamedata
  ├── world
  ├── postgres
  ├── repositories
  ├── services
  ├── handlers
  ├── HTTP
  ├── WebSocket
  └── game loop
```

O objetivo foi impedir que:

- `main` virasse um arquivo gigante;
- `gamedata` conhecesse o domínio;
- `game` conhecesse infraestrutura.

---

# 15. Conta, autenticação e Game Core

Durante o estudo ficou clara uma distinção:

```text
Conta / autenticação
        │
        ▼
persistência

Jogo
        │
        ▼
Game Core
```

Conta, login, sessão e personagem são problemas de identidade e persistência.

Gameplay é uma máquina de transição de estado autoritativa.

A conclusão foi não forçar tudo pelo mesmo pipeline.

---

# 16. Persistência

A persistência também foi estudada sob a ótica de um jogo idle.

A regra discutida foi:

- persistir em pontos significativos;
- não persistir a cada tick;
- salvar dados suficientes para reconstruir o estado;
- usar timestamps para recuperar atividades temporais.

Exemplos de pontos significativos:

- login;
- logout;
- início/fim de atividade;
- craft;
- equipar;
- morte;
- mudança de zona;
- checkpoint periódico.

Event Sourcing foi considerado e descartado para o escopo atual.

Também foram deliberadamente deixados para depois:

- outbox;
- transações mais sofisticadas;
- recuperação distribuída;
- particionamento;
- sharding.

---

# 17. O que foi explicitamente descartado na arquitetura

Ao longo dos estudos, foram consideradas e rejeitadas, para o estado atual do projeto:

### Mutex como dono do GameState

Não porque mutex seja errado, mas porque o ownership único simplifica o domínio do jogo.

### Actor Model por jogador/zona

Foi considerado interessante para isolamento e futura distribuição, mas considerado complexidade prematura enquanto não existir contenção medida.

### Microservices

Não há problema atual que justifique separar o servidor em serviços.

### Redis

Não há necessidade atual que justifique introduzi-lo.

### Kafka / NATS

Não há necessidade atual de um barramento distribuído.

### Kubernetes

Não há necessidade atual de orquestração desse nível.

### Sharding

Ficou deliberadamente para uma fase em que escala real produza evidência de necessidade.

### Event Sourcing

Eventos são usados como contrato de comunicação entre núcleo e rede. Isso não significa que sejam a fonte persistente de verdade.

---

# 18. Evolução da economia e balanceamento

A economia foi estudada através de relações entre:

- custo de equipamento;
- coleta;
- refino;
- craft;
- fama;
- prata;
- durabilidade;
- tier;
- tempo de jogo.

Uma conclusão importante dos estudos foi que o custo de equipamento deveria mudar de natureza ao longo da progressão:

- no início, vestir-se pesa mais em relação à progressão;
- mais tarde, subir de tier passa a ser o gargalo;
- isso cria espaço para especialização e mercado.

Também foi explorada a cadeia de refino em que tiers superiores consomem materiais dos tiers inferiores.

A intenção era evitar que conteúdo de tier baixo morresse economicamente.

Os números concretos são **atuais apenas quando presentes nos arquivos de dados/balanceamento do projeto**. Este histórico não deve ser usado como fonte numérica.

---

# 19. Evolução da durabilidade

O balanceamento também explorou diferentes formas de desgaste.

A formulação atual considera:

- uso;
- morte;
- fuga fracassada.

Foi estudado o efeito da durabilidade sobre Poder de Item e sobre o custo de manutenção.

Também foi estudada a relação entre:

- ganho de prata;
- custo de reparo;
- tier;
- duração de farm.

Uma versão inicial fazia o reparo crescer rápido demais e chegou a consumir uma proporção muito alta da renda de tiers elevados. O balanceamento foi então ajustado para manter o custo dentro de uma faixa mais sustentável.

Os números atuais devem ser consultados nos dados do projeto, não neste histórico.

---

# 20. Evolução do risco e PvP

A ideia de PvP passou por mudanças importantes.

Em uma formulação antiga, havia mais espaço para interpretações assimétricas da flag.

Depois foi consolidada uma regra de consentimento.

Também foi discutida a ideia de usar o número de jogadores sinalizados na zona como informação pública.

O histórico mostra que algumas regras antigas foram removidas porque permitiam situações em que um jogador poderia interferir no farm de outros sem assumir o risco de combate.

O objetivo desta seção é registrar essa evolução. A regra vigente deve ser consultada nos documentos atuais do projeto, especialmente `o-jogo.md` e `decisoes-de-design.md`.

---

# 21. Evolução da direção de arte

A direção de arte foi desenvolvida como consequência da necessidade de manter um MMORPG relativamente amplo com custo de produção controlado.

As ideias estudadas incluem:

- low poly;
- reutilização de esqueletos;
- câmera isométrica fixa;
- atlas de paleta;
- reutilização de animações;
- distinção visual por roupa, arma e ferramenta;
- produção voltada para web;
- validação precoce de um pequeno conjunto de assets antes de produzir dezenas.

A direção de arte atual está documentada em `docs/direcao-de-arte.md`.

Este histórico preserva apenas o raciocínio de evolução; a documentação atual deve ser usada para produção.

---

# 22. Backlog e forma de trabalho

Também houve estudo sobre como evitar que o backlog se tornasse um segundo documento de design.

A estrutura adotada foi aproximadamente:

```text
ROADMAP
   ↓
BACKLOG da fase
   ↓
fatias
   ↓
implementação
```

A fatia é a unidade pequena de trabalho que pode virar milestone/issue.

A intenção é que:

- Markdown mantenha o contexto do projeto;
- GitHub Issues acompanhe trabalho ativo;
- decisões de design não sejam escondidas em tickets.

Essa metodologia pode ser reutilizada, mas não é uma regra do jogo em si.

---

# 23. Conceitos de A Escória que não foram carregados para Eras

A transição de A Escória para Eras também deixou para trás conceitos que pertenciam ao projeto anterior ou a fases antigas de exploração.

Entre os conceitos que apareceram nos estudos e **não fazem parte do modelo atual de Eras** estão:

- **Lastro**;
- **D20** como estrutura de resolução;
- **classes** como estrutura tradicional de personagem;
- **gank adjacente** como modelo de PvP;
- conceitos antigos de zonas, como **A Ressaca**, **A Bigorna**, **O Verde Surdo** e **A Costela**;
- **panteões/deuses associados às armas**;
- outras regras, nomes e sistemas específicos de A Escória que não foram adotados por Eras.

Esses conceitos podem continuar aparecendo em conversas e materiais antigos porque fizeram parte da evolução do estudo.

Eles devem ser entendidos como **histórico do projeto anterior ou de exploração abandonada**, não como conteúdo ou regra de Eras.

A regra geral permanece:

> arquitetura e aprendizados técnicos podem ser reaproveitados; lore, mundo, nomes e mecânicas específicas só pertencem a Eras quando foram efetivamente adotados pelo projeto.

---

# 24. O que o histórico não deve fazer

Este arquivo não deve:

- definir regras atuais;
- substituir `o-jogo.md`;
- substituir dados JSON;
- substituir decisões atuais;
- determinar arquitetura atual;
- determinar balanceamento atual;
- ser tratado como backlog;
- obrigar o projeto a preservar uma decisão antiga.

Seu objetivo é responder perguntas como:

> “Por que chegamos aqui?”

e:

> “Que alternativas já foram consideradas?”

não:

> “O que o jogo faz hoje?”

---

# 25. Regra para conflitos

Quando uma informação deste histórico divergir do projeto atual, seguir esta ordem:

1. código atual, quando a questão for comportamento implementado;
2. documentação atual do projeto;
3. dados atuais;
4. decisões atuais;
5. este histórico;
6. conversas antigas.

O histórico é contexto, não autoridade.

---

# 26. Fontes que originaram este histórico

Este documento foi consolidado a partir de:

- conversas anteriores deste Project;
- conversas arquivadas sobre Eras do Brasil;
- conversas do Claude analisadas durante a preparação do novo Project;
- documentação atual do projeto `eras-do-brasil`;
- decisões arquiteturais e de design já registradas.

As conversas originais não precisam continuar sendo carregadas como contexto permanente quando o conteúdo relevante já estiver consolidado aqui.

---

# 27. Migração de histórico para fora dos documentos atuais

Na revisão da documentação atual do projeto foram encontrados exemplos claros de raciocínio histórico misturados à documentação normativa, especialmente:

- `docs/arquitetura-consolidada.md`, que descrevia as fases do estudo e alternativas descartadas;
- `docs/decisoes-de-design.md`, que mantinha motivos e versões antigas de regras;
- `docs/formulas-e-balanceamento.md`, que registrava valores anteriores e tentativas de balanceamento;
- `docs/dados-do-mvp.md`, que registrava algumas mudanças estruturais anteriores;
- `docs/direcao-de-arte.md`, que continha partes de processo e justificativa;
- o backlog da antiga PoC, que possuía material de visão e exploração anterior.

Isso não significa que esses arquivos devam ser simplesmente apagados.

A distinção proposta é:

### Deve continuar nos documentos do projeto

- regra atual;
- decisão atual;
- justificativa necessária para manutenção da decisão;
- contrato entre código e dados;
- especificação necessária para implementar;
- backlog operacional;
- dados e fórmulas que o projeto realmente usa;
- documentação necessária para quem trabalha no código.

### Pode permanecer neste histórico

- narrativa detalhada de como uma decisão surgiu;
- alternativas antigas que já não precisam ser consultadas durante implementação;
- versões antigas de uma regra;
- comparação extensa entre hipóteses;
- raciocínio exploratório vindo de chats;
- ideias abandonadas que não têm função operacional.

### Não deve ser duplicado desnecessariamente

Uma decisão atual deve ter sua definição nos documentos atuais do projeto.

Este histórico pode mencionar essa decisão quando isso for necessário para explicar sua evolução, mas não deve reproduzi-la integralmente.

---

# 28. Síntese da evolução

A evolução do projeto pode ser resumida assim:

```text
A Escória
   │
   ├── aprendizados de arquitetura
   ├── exploração de MMORPG idle
   └── gramática de progressão inspirada em Albion
             │
             ▼
     Eras do Brasil
             │
             ├── lore própria
             ├── mundo baseado em Eras
             ├── A Travessia
             ├── equipamento como identidade
             ├── progressão por atividade
             └── servidor autoritativo
                         │
                         ▼
              arquitetura consolidada
                         │
              Command → State → Event
                         │
                  single-owner state
                         │
                HTTP → entrar no mundo
                         │
                    WebSocket
```

O projeto atual deve ser tratado como o resultado dessa evolução, não como a soma de todas as ideias que já passaram por ele.