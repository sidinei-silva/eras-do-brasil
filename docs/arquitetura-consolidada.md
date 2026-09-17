# Arquitetura do servidor — decisões consolidadas

Consolidação de três estudos feitos entre 25/08 e 12/09/2026, mais as decisões fechadas depois. Substitui os chats originais como referência.

Cada decisão traz **o porquê e o que foi descartado**, porque conclusão sem raciocínio não impede ninguém de reabrir a discussão.

---

## Como chegamos aqui

O estudo nasceu para *A Escória* e passou por três fases. A primeira propunha **mutex protegendo agregados de estado**. A segunda validou a ideia de HTTP para comandos. A terceira migrou para **single-owner com channel** e, depois de uma virada de premissa, introduziu o `bootstrap`.

A virada foi esta, e vale citar porque muda tudo: *"nunca gostei de fazer uma arquitetura pensando na MVP e quando crescer mudar; sempre gostei de já da MVP fazer a arquitetura que vai ser mesmo."*

A partir daí a regra passou a ser: **arquitetura definitiva em escala reduzida**, não arquitetura de MVP.

*A Escória* foi depois fundida com *Eras do Brasil*. **A arquitetura sobreviveu inteira; a lore e o vocabulário não.** Ver a seção final.

---

## Os cinco princípios

**1. O servidor é autoritativo.** O cliente expressa intenção; o servidor decide o resultado. Nada de gameplay é calculado no cliente.

**2. O jogo é Command → State → Event.** Comando pede, núcleo valida e transiciona, evento comunica. Os três são conceitos distintos e não se misturam.

**3. Tempo é processado pelo servidor.** Ação é `Activity` com `StartedAt` e `EndsAt`. O loop verifica o que venceu. O servidor não precisa acordar o jogador a cada milissegundo — basta comparar `agora >= EndsAt`.

**4. Concorrência segue ownership, não gosto.** Primeiro se decide quem possui o estado; só depois se escolhe mutex, channel ou loop. Não se usa channel porque é idiomático.

**5. Escopo pequeno, fronteiras definitivas.** Implementa-se pouco, mas as responsabilidades e dependências já nascem certas.

---

## Decisão 1 — Single-owner do GameState

**Decisão.** Uma goroutine possui o `GameState`. A rede coloca comandos num channel; só o game loop modifica o estado.

```
WS 1 ─┐
WS 2 ─┼──► commands chan ──► Game Loop ──► GameState
WS 3 ─┘
```

**Por quê.** Com estado compartilhado protegido por mutex, toda função carrega perguntas: quem segura o lock, por quanto tempo, posso fazer I/O segurando, posso publicar evento segurando. Com ownership, a pergunta vira uma só — *isto está rodando no game loop?* — e sumiu uma classe inteira de bug.

E há um ganho concreto: dois comandos de craft do mesmo jogador nunca veem o mesmo saldo, porque a fila serializa.

**Descartado: mutex no estado principal.** Não está errado, e foi a primeira proposta. Perde porque o jogo é naturalmente sequencial — comando, valida, transiciona, evento. Mutex continua válido para infraestrutura genuinamente compartilhada: registro de conexões, sessões, métricas, cache.

**Descartado: Actor Model.** Uma goroutine por jogador ou por zona. Ganha isolamento e caminho para distribuição; custa mailbox, ciclo de vida, supervisão e troca de mensagens entre atores para uma ação trivial. Fica como evolução possível **quando aparecer contenção medida**, não antes.

**Limite conhecido.** Um loop único é um gargalo global. Para a escala atual, excelente. Para dezenas de milhares de jogadores simultâneos, vai exigir particionar estado — o que é bem diferente de começar com microserviço.

---

## Decisão 2 — Command e Tick entram pelo mesmo loop, por portas diferentes

**Decisão.** O loop tem duas entradas: comandos externos e o relógio interno.

```go
for {
    select {
    case cmd := <-commands:
        publish(engine.Handle(cmd))
    case now := <-ticker.C:
        publish(engine.Tick(now))
    }
}
```

**Por quê.** `Tick` não é pedido do cliente. Tratá-lo como `Command` funciona, mas confunde quem lê — parece que o tempo é uma solicitação externa.

**Nota.** O ticker não é o relógio do jogo; o relógio é `time.Time`. O ticker só pergunta se algo já venceu. Por isso o engine deve **receber `now` como parâmetro** em vez de chamar `time.Now()` internamente: isso torna o núcleo testável e determinístico.

---

## Decisão 3 — Três camadas de dados, e nenhuma invade a outra

**Decisão.**

```
data/*.json  →  gamedata  →  bootstrap  →  game
   dados      definições    montagem    runtime
```

- `gamedata` **carrega e representa** dados estáticos. Não conhece `game`.
- `game` é o domínio e o estado. Não lê JSON.
- `bootstrap` conecta os dois.

**Por quê.** Houve uma versão em que `gamedata` construía `game.Zone` diretamente, e ela até funcionou melhor que a alternativa da época. Foi descartada porque criava duas responsabilidades no mesmo pacote — interpretar formato de arquivo e construir objeto de domínio — e porque **definição estática e estado mutável têm ciclos de vida diferentes**. Um `GameData` que guarda objetos de runtime não é mais "data".

**Formato dos arquivos.** Um JSON por conceito, categorias como chave dentro do arquivo. Não pastas por tipo com um arquivo dentro.

**`data/` fica fora do backend**, na raiz do monorepo, porque é conteúdo do jogo e não configuração de servidor. Configuração do servidor e migrations ficam em `backend/`.

**Loader genérico é permitido, mas só como mecanismo.** `loadJSON[T](path)` não exportado, que não sabe o que é zona, diálogo ou objetivo. Cada tipo tem seu `LoadX` específico.

---

## Decisão 4 — `bootstrap` é o composition root

**Decisão.** `main` é quase vazio. `bootstrap` monta tudo e devolve uma `Application` com `Run()` e `Shutdown()`.

```
main → bootstrap.New() → Application
         ├── gamedata.Load()
         ├── construir World
         ├── conectar Postgres
         ├── repositories → services → handlers
         ├── HTTP e WebSocket
         └── game loop
```

**Por quê.** Existe uma responsabilidade real que não é de ninguém mais: **compor a aplicação e conectar dependências**. Sem ela, ou o `main` vira um composition root gigante, ou `gamedata` e `game` passam a se conhecer.

**Descartado: um arquivo de bootstrap por componente.** `bootstrap/server.go`, `bootstrap/postgres.go`, `bootstrap/websocket.go` transformam o pacote numa coleção de builders. Separar só quando uma montagem específica ficar realmente complexa.

**Direção de dependência:** `bootstrap` conhece todo mundo; ninguém conhece `bootstrap`; o domínio não conhece infraestrutura.

---

## Decisão 5 — Conta não é personagem

**Decisão.** Conta, autenticação e sessão ficam **fora** do Game Core.

```
Criar conta:  HTTP → Handler → Service → Repository → Postgres
Jogar:        WS → Command → Game Core → State → Event → WS
```

**Por quê.** São problemas diferentes e merecem fluxos diferentes. Conta é identidade persistente e CRUD legítimo; o jogo é transição de estado autoritativa. **Arquitetura não significa forçar toda feature pelo mesmo caminho.**

E o banco participa do caminho da criação de conta, o que é correto — mas não deve participar do caminho crítico do game loop.

---

## Decisão 6 — HTTP até entrar no mundo, WebSocket depois

**Decisão.** HTTP cobre criar conta, login, refresh, listar e criar personagem, e entrar no mundo. A partir da entrada, **uma única conexão WebSocket** carrega comandos e eventos.

**Por quê o corte é aí.** Tudo antes da entrada precisa funcionar sem conexão aberta e é naturalmente requisição e resposta. Tudo depois é bidirecional e contínuo.

**Por quê comandos vão pelo WebSocket.** A conexão já está aberta; usar HTTP em paralelo exigiria autenticar duas vias. E o mais importante é **ordenação**: comando e evento no mesmo canal garantem que o cliente nunca receba um resultado antes da confirmação do que pediu. Em web, evita ainda preflight e overhead por requisição.

**Descartado: tudo por HTTP com polling.** Funcionaria para coleta, mas quebra em combate, onde o servidor produz eventos espontaneamente por minutos. Polling em web é caro em latência e bateria.

**Descartado: WebSocket desde o login.** Autenticação é requisição e resposta; abrir socket antes de existir sessão complica sem ganho.

**Isto é decisão de transporte, e é reversível.** O Game Core não conhece nenhum dos dois — ambos são adaptadores que produzem `Command`.

**Queda de conexão não interrompe nada.** O estado vive no servidor; reconectar é refazer a entrada no mundo e receber o snapshot. **O WebSocket não é o estado do jogador.**

---

## Decisão 7 — Coordenada não é estado de jogo

**Decisão.** O servidor **nunca manda posição**. Layout de terreno, onde fica cada nó, onde nascem os mobs, pathing, colisão, câmera e animação são inteiramente do cliente.

O servidor diz *"você está coletando o nó `wood_01` da zona X, termina às 14:32"*. O cliente sabe onde `wood_01` fica no terreno dele e anima o personagem andando até lá.

**Por quê.** O combate não tem posicionamento — "área" significa número de alvos, não formato nem alcance. Sem posicionamento, posição é pura apresentação. Mandar coordenada seria pagar banda e complexidade por algo que não afeta nenhuma regra.

**Consequência.** Layout de zona é **conteúdo estático versionado**, distribuído com o cliente. E fica claro o que nunca sai do servidor: dano, prata, drop, Fama, durabilidade e **o sorteio do elite**. O cliente recebe quais mobs nasceram e instancia os modelos que já tem.

---

## Decisão 8 — Combate é onda fechada, e a luta inteira vai de uma vez

**Decisão.** O jogador escolhe um grupo na zona e ele nasce como **onda fechada**. Só nasce a próxima quando a onda inteira morre. O servidor **resolve a luta completa e envia a linha do tempo pronta**; o cliente apenas anima.

**Por quê.** Numa primeira versão o combate era contínuo, com mob nascendo a cada morte. Isso tornava a luta **aberta**, sem fim previsível, e obrigava o servidor a enviar lotes adiantados de alguns segundos por vez para o cliente não engasgar com a jitter da rede.

Com onda fechada, o problema some: **cada onda já é um lote.** O servidor resolve, envia uma vez, e o cliente anima com folga total. Menos mensagem, menos estado intermediário, animação que nunca pisca.

**Teto de 50 rodadas por onda.** Se estourar, a luta termina em **impasse**: ninguém morre, não há loot dos sobreviventes, e o jogador volta ao terreno da zona. É limite de segurança contra luta que não fecha, e limita o tamanho da linha do tempo que trafega.

**Parar no meio.** Se o jogador mandar parar, o servidor corta a linha do tempo no ponto certo e envia o resultado final. O que não foi animado simplesmente não aconteceu.

**Nada é decidido no cliente.** Ele recebe o futuro já resolvido e apenas o representa.

## Decisão 9 — Tópicos, não salas

**Decisão.** Uma conexão por jogador, sempre. O servidor **inscreve** essa conexão em tópicos — zona, guilda, global — conforme o jogador se move. Mudar de zona é trocar de inscrição.

**Por quê.** "Sala" tende a virar objeto com estado e goroutine própria, e isso é **Actor Model entrando pela porta dos fundos**, contra a Decisão 1. Tópico é apenas uma lista de conexões para fan-out; sala seria dona de estado.

A conexão pertence ao jogador, não ao lugar.

---

## Decisão 10 — Persistência fora do caminho crítico

**Decisão.** Persistir em **pontos significativos**: login, logout, início e fim de atividade, craft, equipar, morte, mudança de zona, e checkpoint periódico. Nunca a cada tick.

**Por quê.** `UPDATE` a cada tick transforma o banco numa extensão lenta da RAM.

**O que salvar.** Estado suficiente para reconstruir, não o loop. Se a atividade termina às 10:05 e o servidor reinicia às 10:03, o `EndsAt` persistido faz o engine simplesmente continuar. **Essa propriedade é especialmente valiosa num idle.**

**Simplificação aceita.** O fluxo comando → muta → salva → publica pode ficar inconsistente se o banco falhar depois do evento ter saído. Aceitável agora; em produção exige transação, ordenação, retry ou outbox.

**Descartado: Event Sourcing.** Eventos existem como contrato entre núcleo e rede. Isso não os torna a fonte de verdade persistente. São coisas diferentes.

**Descartado: Redis, Kafka, NATS, microserviço, sharding.** Nenhum resolve um problema que existe hoje.

---

## Decisão 11 — Estilo de código Go

Interfaces **pequenas e definidas no consumidor**. `account.Repository` existe porque `account` precisa de persistência, não porque interfaces são boas.

**Nada de `types/` ou `models/` global.** O tipo mora perto do conceito: `game.Zone` em `game/zone.go`.

**Nada de interface antecipada** para clock, gerador de id, publisher, transaction manager. Começar concreto.

**Um `doc.go` por pacote relevante**, dizendo a responsabilidade dele.

**`network` em vez de `network/http`** enquanto couber, para não criar um pacote `http` que colide com `net/http` em todo import. Dividir quando o arquivo crescer de verdade.

**`HTTPServer` dono do `*http.Server`**, não apenas do `ServeMux`, porque isso dá `Start()` e `Shutdown()` e prepara o desligamento gracioso sem abstração nova.

**Evitar:** `controllers/`, `services/`, `usecases/`, `dtos/`, `mappers/`, `factories/` como camadas globais. Framework de injeção. ORM obrigatório. Clean Architecture rígida. Repository CRUD genérico — a lógica do jogo não é CRUD.

---

## Estrutura

```
eras-do-brasil/
├── backend/
│   ├── cmd/server/main.go
│   ├── internal/
│   │   ├── bootstrap/     application.go, world.go
│   │   ├── gamedata/      loader.go, zones.go, ...
│   │   ├── game/          state.go, world.go, zone.go, player.go,
│   │   │                  activity.go, command.go, event.go, engine.go
│   │   ├── account/       account.go, service.go, repository.go
│   │   ├── network/       http.go, websocket.go, handlers
│   │   └── persistence/postgres/
│   ├── migrations/
│   └── go.mod
├── clients/
├── data/                  zones.json, dialogs.json, objectives.json, ...
└── README.md
```

---

## Deliberadamente não decidido

- Particionamento de estado e sharding. Só com contenção medida.
- Transação, outbox e recuperação na persistência.
- Formato de wire do WebSocket — JSON ou binário.
- Como o cliente versiona e baixa o conteúdo estático.
- Reconexão no meio de um lote de combate.

---

## Vocabulário morto

Os estudos originais são de *A Escória*. **Não existem mais:** Lastro; panteões e deuses dentro de armas; a Têmpera como multiplicador divino; gank por adjacência; as zonas A Ressaca, A Bigorna, O Verde Surdo, A Costela e A Encruzilhada; e o módulo Go chamado `escoria`.

**Sobreviveram:** o multiplicador de uso ativo da mesma arma, hoje chamado **Afinidade**; a progressão por uso, hoje chamada **Árvore do Destino**, agora em quatro ramos; o tutorial como máquina de estados; e Fama e recursos encapsulados em vez de campos abertos que qualquer sistema altera.

O PvP mudou: a fila por prioridade continua, mas a busca é por **sinalizados na mesma zona**, com contador público, sem adjacência e sem matchmaking.
