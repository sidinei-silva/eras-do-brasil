# Contexto do Projeto — Eras do Brasil

## 1. Natureza deste documento

Este arquivo registra o contexto atual do projeto **Eras do Brasil** para uso como fonte de contexto no Project do ChatGPT.

Ele não substitui o código, o GDD ou a documentação normativa do repositório.

Seu objetivo é permitir que uma conversa nova compreenda rapidamente:

- o que é o projeto;
- qual é o escopo atual;
- quais princípios orientam o desenvolvimento;
- como o projeto organiza design, dados e arquitetura;
- quais fontes devem ser consultadas para cada tipo de afirmação;
- como tratar decisões, hipóteses e material histórico.

Quando este arquivo divergir de uma fonte normativa mais específica e atual do repositório, a fonte específica prevalece.

---

## 2. O que é Eras do Brasil

**Eras do Brasil** é um MMORPG idle ambientado em uma representação histórica e ficcional do Brasil colonial e de seus períodos históricos.

O projeto utiliza como referência de design a gramática de progressão de jogos como Albion Online em aspectos como:

- progressão por equipamento;
- ausência de classes tradicionais;
- especialização por aquilo que o personagem utiliza;
- progressão de combate, coleta, refino e criação;
- evolução vertical por tiers.

Essas referências são referências de estrutura de jogo, não uma obrigação de copiar Albion.

A identidade de mundo, narrativa, conteúdo e regras de Eras é própria do projeto.

---

## 3. Objetivo atual

O projeto está em fase de construção e estudo.

O objetivo atual é desenvolver uma primeira versão jogável pequena, capaz de validar o núcleo da experiência antes de expandir o jogo para todo o escopo de um MMORPG.

A prioridade atual é o fluxo inicial do jogador, especialmente:

**criar conta → entrar → criar personagem → entrar no mundo → executar o fluxo inicial da experiência.**

O projeto não deve ser tratado, nesta fase, como uma implementação completa de MMORPG.

---

## 4. Escopo atual do MVP / PoC

O conteúdo inicial utilizado para validar o jogo é **A Travessia**.

A Travessia funciona como o espaço inicial da experiência e contém um conjunto pequeno de zonas descartáveis destinado a apresentar a progressão inicial do jogo.

O escopo inicial trabalha com:

- T1 e T2;
- progressão inicial;
- combate;
- coleta;
- refino;
- criação;
- fluxo de entrada no mundo;
- sistemas necessários para sustentar a experiência inicial.

A implementação deve priorizar somente o que é necessário para esse fluxo.

Sistemas futuros podem ser representados de forma simplificada quando isso ajudar a demonstrar uma arquitetura, mas não devem transformar a PoC em uma implementação antecipada do MMORPG completo.

---

## 5. Princípios de design

### 5.1 Ausência de classes tradicionais

O personagem não escolhe uma classe fixa.

A identidade mecânica do personagem emerge principalmente daquilo que ele utiliza e desenvolve.

A estrutura de progressão deve permitir especialização sem exigir uma classe tradicional de RPG.

### 5.2 Progressão

A progressão combina:

- equipamento;
- tiers;
- combate;
- coleta;
- refino;
- criação.

A árvore de progressão deve representar a evolução dessas atividades sem transformar o sistema em um conjunto de classes fechadas.

### 5.3 Mundo

O mundo possui uma organização histórica própria e é construído em torno de eras, regiões, progressão e risco.

Detalhes concretos de lore, zonas, criaturas, conteúdo e regras não devem ser inventados a partir deste arquivo.

Para esses detalhes, consultar as fontes de design do repositório.

### 5.4 Jogador

O jogador participa do mundo como personagem dentro dessa estrutura histórica e não deve ser tratado automaticamente como uma figura escolhida ou central à história.

A definição concreta da narrativa e da posição do jogador no mundo deve ser obtida do GDD e das decisões de design atuais.

---

## 6. Princípios técnicos atuais

O backend é planejado em **Go** e deve ser **autoritativo**.

O cliente solicita ações.

O servidor:

1. recebe a intenção;
2. valida a ação;
3. aplica as regras;
4. altera o estado;
5. produz os resultados/eventos necessários;
6. comunica o resultado ao cliente.

A ideia central pode ser resumida como:

```text
Command
   ↓
Game Core
   ↓
State
   ↓
Event
   ↓
Client
```

O cliente não é a autoridade sobre regras, resultados ou estado do jogo.

---

## 7. Organização do servidor

A arquitetura atual separa conceitualmente:

- network;
- game core;
- state;
- commands;
- events;
- persistence;
- static game data;
- bootstrap.

O objetivo dessa separação é evitar que regras de jogo fiquem espalhadas pelos handlers HTTP/WebSocket, pela persistência ou pelo carregamento de dados.

O núcleo do jogo deve permanecer independente da forma como a mensagem chegou.

---

## 8. HTTP e WebSocket

A arquitetura atual utiliza HTTP e WebSocket com responsabilidades diferentes.

### Antes de entrar no mundo

HTTP atende operações como:

- criação de conta;
- login;
- criação de personagem;
- entrada no mundo;
- outras operações de natureza semelhante que não exigem o canal contínuo de gameplay.

### Durante o gameplay

Depois de entrar no mundo, o WebSocket fornece o canal contínuo entre cliente e servidor para:

- enviar comandos de gameplay;
- receber eventos/atualizações do servidor;
- manter a comunicação necessária durante a sessão.

O WebSocket não é a fonte da verdade.

A autoridade continua no núcleo do jogo.

---

## 9. Game Loop e concorrência

A proposta atual privilegia um modelo no qual uma goroutine é responsável pela posse do estado mutável do mundo/jogo.

A rede não deve modificar diretamente o estado do jogo.

O fluxo conceitual é:

```text
HTTP / WebSocket
        │
        ▼
     Command
        │
        ▼
     Channel
        │
        ▼
   Game Loop
        │
        ▼
   Game State
```

Isso reduz a quantidade de concorrência necessária dentro das regras do jogo.

### Mutex

Mutex não é proibido.

Ele deve ser usado quando houver estado realmente compartilhado entre goroutines e quando a sincronização por posse exclusiva do Game Loop não resolver o problema.

### Channels

Channels são utilizados para comunicação entre partes concorrentes, especialmente para encaminhar comandos ao núcleo do jogo.

### Actor Model

Actor Model não é um requisito da arquitetura atual.

Ele pode ser estudado futuramente se surgir uma necessidade concreta que justifique sua adoção.

---

## 10. Tempo e ações temporizadas

Ações temporizadas devem ser representadas pelo estado necessário para determinar sua evolução.

Um modelo conceitual é:

```text
StartedAt
EndsAt
Action
Parameters
```

O servidor utiliza seu próprio conceito de tempo para determinar o estado da ação.

O avanço temporal deve ser determinístico a partir do estado armazenado e do tempo atual fornecido ao núcleo.

Um padrão estudado é:

```text
Tick(now)
```

Isso permite que o Game Loop atualize atividades sem depender do cliente para determinar quando algo terminou.

O cliente pode animar ou apresentar visualmente uma ação, mas o servidor continua responsável por determinar o resultado.

---

## 11. Dados estáticos do jogo

Dados como zonas, criaturas, itens e outras definições de conteúdo devem ser separados das regras de execução do servidor.

A ideia atual é:

```text
data/*.json
     ↓
  gamedata
     ↓
  bootstrap
     ↓
    game
```

O carregamento dos arquivos de dados não deve fazer o núcleo do jogo depender diretamente de JSON.

A camada `gamedata` interpreta os dados estáticos.

O bootstrap conecta os dados carregados ao runtime.

O núcleo do jogo trabalha com estruturas apropriadas ao domínio/runtime.

---

## 12. Bootstrap

O bootstrap funciona como composição da aplicação.

Sua responsabilidade é conectar:

- configurações;
- carregadores de dados;
- banco/persistência;
- Game State;
- Game Loop;
- HTTP;
- WebSocket;
- demais dependências.

A ideia é manter `main` pequeno e evitar que o núcleo do jogo conheça detalhes de infraestrutura.

---

## 13. Persistência

PostgreSQL faz parte da arquitetura estudada para persistência.

A persistência não deve transformar cada atualização do Game Loop em uma escrita obrigatória no banco.

O banco representa a persistência necessária do estado.

O runtime do jogo é responsável pela execução em memória.

Persistência e gameplay devem ser desacoplados o suficiente para que o caminho crítico do jogo não dependa de uma escrita no banco a cada tick.

Eventos também não significam automaticamente Event Sourcing.

---

## 14. Arquitetura não distribuída

O projeto não parte da premissa de que precisa de:

- microservices;
- Redis;
- Kafka;
- NATS;
- Kubernetes;
- sharding;
- múltiplos processos de game server distribuídos.

Essas tecnologias podem existir em um futuro projeto real caso uma necessidade concreta apareça.

Neste estudo, introduzi-las antecipadamente prejudica o objetivo didático e aumenta a complexidade sem benefício comprovado.

---

## 15. Estado atual do desenvolvimento

O desenvolvimento atual está trabalhando no fluxo de entrada no mundo.

A branch de referência registrada neste contexto é:

`04-entrar-no-mundo`

Essa etapa envolve conceitos como:

- bootstrap do mundo;
- Game State;
- entrada do personagem no mundo;
- preparação do núcleo do jogo para receber comandos;
- evolução posterior para Game Loop e comunicação por channels.

O estado real do código deve sempre ser verificado diretamente no repositório antes de afirmar que determinada implementação já existe.

---

## 16. Hierarquia de fontes

Para informações sobre o projeto, usar a fonte mais específica e atual disponível.

### 1. Código do repositório

É a fonte de verdade para o comportamento que já está efetivamente implementado.

### 2. `o-jogo.md`

Resumo normativo atual do jogo.

### 3. `decisoes-de-design.md`

Decisões atuais de design e seus fundamentos.

### 4. `arquitetura-consolidada.md`

Arquitetura técnica consolidada e decisões arquiteturais atuais.

### 5. `como-promover-dado.md`

Regras sobre como dados e informações devem evoluir dentro do projeto.

### 6. `formulas-e-balanceamento.md` / `dados-do-mvp.md`

Fontes específicas para fórmulas, balanceamento e dados atuais do MVP.

### 7. Demais documentos do repositório

Consultar conforme o assunto.

### 8. `historico-e-estudos.md`

Material histórico e exploratório.

Esse arquivo serve para recuperar contexto e entender como ideias evoluíram.

Ele não substitui uma fonte normativa atual.

---

## 17. Como tratar conflitos

Quando duas fontes divergirem:

1. verificar qual delas é mais atual;
2. verificar se uma é normativa e outra histórica;
3. priorizar código para comportamento já implementado;
4. priorizar o documento específico para a regra que ele define;
5. não transformar automaticamente uma hipótese histórica em regra atual.

Se o conflito não puder ser resolvido pelas fontes, deve ser apresentado como questão em aberto.

Não inventar uma resolução.

---

## 18. Repositório versus Project do ChatGPT

O repositório deve concentrar aquilo que precisa acompanhar o desenvolvimento do projeto:

- código;
- regras atuais;
- decisões atuais;
- especificações;
- dados;
- fórmulas;
- backlog;
- documentação operacional.

O Project do ChatGPT pode concentrar:

- contexto geral;
- histórico de estudos;
- alternativas descartadas;
- raciocínios arquiteturais;
- discussões de design;
- material exploratório;
- contexto necessário para interpretar decisões atuais.

A existência de uma informação no Project não deve ser usada para justificar uma regra que contradiga uma fonte normativa atual do repositório.

---

## 19. Como o ChatGPT deve trabalhar neste projeto

O objetivo principal das conversas é **ensinar e apoiar o raciocínio**, não substituir o desenvolvimento feito pelo usuário.

Ao discutir arquitetura:

1. explicar a arquitetura primeiro;
2. explicar a responsabilidade dos componentes;
3. explicar o fluxo;
4. explicar os trade-offs;
5. só então apresentar código quando ele for útil.

O código deve ser pequeno, didático e idiomático.

Não produzir grandes implementações de produção quando o objetivo for estudar um conceito.

Quando uma simplificação for feita para fins didáticos, identificá-la explicitamente.

---

## 20. Decisão, proposta e hipótese

As conversas devem distinguir claramente:

### Decisão atual

Algo que já está estabelecido em uma fonte normativa atual.

### Decisão proposta

Uma solução sugerida durante o estudo, mas que ainda não deve ser tratada como regra definitiva.

### Hipótese

Uma possibilidade utilizada para raciocinar sobre uma solução.

### Histórico

Uma ideia, arquitetura ou regra que foi considerada anteriormente, mas não representa necessariamente o estado atual.

Essa distinção é importante para evitar que o estudo do projeto seja confundido com o projeto em si.

---

## 21. O que não deve ser feito

Não:

- inventar regras de gameplay;
- tratar discussões antigas como decisões atuais;
- ampliar o MVP sem necessidade;
- antecipar infraestrutura distribuída;
- colocar regras de jogo diretamente nos handlers;
- fazer o cliente determinar resultados;
- usar o banco como mecanismo de execução do Game Loop;
- assumir que um evento significa Event Sourcing;
- transformar uma proposta arquitetural deste estudo em decisão definitiva do projeto real.

---

## 22. Regra de ouro

Quando houver dúvida sobre o estado atual de Eras do Brasil:

**consultar a fonte atual e específica antes de concluir.**

Quando a fonte não for suficiente:

**declarar a lacuna e separar claramente fato, interpretação, proposta e hipótese.**

O objetivo deste Project é ajudar a compreender e construir Eras do Brasil com clareza, sem transformar material de estudo em regra definitiva por acidente.
