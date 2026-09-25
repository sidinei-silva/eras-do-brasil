# Arquitetura do servidor — decisões consolidadas

Este documento registra a **arquitetura técnica atual** do servidor de Eras do Brasil e as decisões que definem suas fronteiras.

Ele é uma referência normativa de arquitetura. O histórico de alternativas, estudos anteriores e evolução das decisões fica em `docs/historico-e-estudos.md`.

Uma decisão registrada aqui representa a arquitetura adotada até que seja explicitamente revisada. Quando uma decisão mudar, o documento deve refletir a nova arquitetura atual; o motivo da mudança e a alternativa anterior devem ser preservados no histórico.

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

```text
WS 1 ─┐
WS 2 ─┼──► commands chan ──► Game Loop ──► GameState
WS 3 ─┘
```

**Por quê.** O jogo é naturalmente sequencial — comando, valida, transiciona, evento. A posse exclusiva do estado evita que cada operação precise coordenar locks e permite que dois comandos de craft do mesmo jogador sejam processados em ordem, sem observarem o mesmo saldo simultaneamente.

**Limite conhecido.** Um loop único é um gargalo global. Para a escala atual, ele mantém o modelo simples. Se surgir contenção real, o estado poderá ser particionado; isso é diferente de introduzir microserviços antecipadamente.

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

**Por quê.** `Tick` não é pedido do cliente. Tratá-lo como `Command` funciona, mas confunde a origem da operação — o tempo é responsabilidade do servidor.

**Nota.** O ticker não é o relógio do jogo; o relógio é `time.Time`. O ticker só pergunta se algo já venceu. Por isso o engine deve **receber `now` como parâmetro** em vez de chamar `time.Now()` internamente: isso torna o núcleo testável e determinístico.

---

## Decisão 3 — Três camadas de dados, e nenhuma invade a outra

**Decisão.**

```text
data/                 →  gamedata  →  bootstrap  →  game
├── shared/*.json         definições    montagem    runtime
├── mvp/*.json
└── era1/*.json
      dados
```

- `gamedata` **carrega e representa** dados estáticos. Não conhece `game`.
- `game` é o domínio e o estado. Não lê JSON.
- `bootstrap` conecta os dois.

**Por quê.** Definição estática e estado mutável têm ciclos de vida diferentes. A camada de dados interpreta o formato dos arquivos; o domínio trabalha com o runtime; o bootstrap faz a composição entre os dois.

**Formato dos arquivos.** **Um arquivo por tipo de entidade**, não por contexto de uso nem por instância. Categorias podem existir como chaves dentro do arquivo. Dividir quando o arquivo mistura tipos diferentes ou passa de umas quinhentas linhas — nunca por instância.

**`data/` fica fora do backend**, na raiz do monorepo, porque é conteúdo do jogo e não configuração de servidor. Configuração do servidor e migrations ficam em `backend/`.

**Loader genérico é permitido, mas só como mecanismo.** `loadJSON[T](path)` não exportado, que não sabe o que é zona, diálogo ou objetivo. Cada tipo tem seu `LoadX` específico.

---

## Decisão 4 — `bootstrap` é o composition root

**Decisão.** `main` é quase vazio. `bootstrap` monta tudo e devolve uma `Application` com `Run()` e `Shutdown()`.

```text
main → bootstrap.New() → Application
         ├── gamedata.Load()
         ├── construir World
         ├── conectar Postgres
         ├── repositories → services → handlers
         ├── HTTP e WebSocket
         └── game loop
```

**Por quê.** Existe uma responsabilidade real de composição que não pertence a outro componente: conectar as dependências e montar a aplicação. Sem essa fronteira, `main` cresce ou as camadas passam a conhecer infraestrutura que não deveriam conhecer.

**Direção de dependência:** `bootstrap` conhece os componentes que precisa montar; os componentes não dependem de `bootstrap`; o domínio não conhece infraestrutura.

---

## Decisão 5 — Conta não é personagem

**Decisão.** Conta, autenticação e sessão ficam **fora** do Game Core.

```text
Criar conta:  HTTP → Handler → Service → Repository → Postgres
Jogar:        WS → Command → Game Core → State → Event → WS
```

**Por quê.** São problemas diferentes e merecem fluxos diferentes. Conta é identidade persistente e CRUD legítimo; o jogo é transição de estado autoritativa. Arquitetura não significa forçar toda feature pelo mesmo caminho.

O banco participa do caminho da criação de conta, mas não deve participar do caminho crítico do game loop.

---

## Decisão 6 — HTTP até entrar no mundo, WebSocket depois

**Decisão.** HTTP cobre criar conta, login, refresh, listar e criar personagem, e entrar no mundo. A partir da entrada, **uma única conexão WebSocket** carrega comandos e eventos.

**Por quê o corte é aí.** Tudo antes da entrada precisa funcionar sem conexão aberta e é naturalmente requisição e resposta. Tudo depois é bidirecional e contínuo.

**Por quê comandos vão pelo WebSocket.** A conexão já está aberta e o mesmo canal carrega comandos e eventos, preservando a ordenação da comunicação entre o jogador e o núcleo. Em web, isso também evita manter um fluxo de polling paralelo para o gameplay.

**Isto é decisão de transporte, e é reversível.** O Game Core não conhece HTTP ou WebSocket — ambos são adaptadores que produzem `Command`.

**Queda de conexão não interrompe o estado do jogo.** O estado vive no servidor; a conexão é apenas o canal de comunicação.

---

## Decisão 7 — Coordenada não é estado de jogo

**Decisão.** O servidor **nunca manda posição**. Layout de terreno, onde fica cada nó, onde nascem os mobs, pathing, colisão, câmera e animação são inteiramente do cliente.

O servidor informa, por exemplo, que o personagem está coletando o nó `wood_01` da zona X e informa o estado temporal da atividade. O cliente sabe onde `wood_01` fica no terreno dele e anima o personagem andando até lá.

**Por quê.** O combate não tem posicionamento — "área" significa número de alvos, não formato nem alcance. Sem posicionamento como regra de jogo, posição é apresentação. Mandar coordenada adicionaria banda e complexidade sem alterar o resultado autoritativo.

**Consequência.** Layout de zona é **conteúdo estático versionado**, distribuído com o cliente. O servidor continua responsável por dano, prata, drop, Fama, durabilidade e demais regras de gameplay.

---

## Decisão 8 — Combate é onda fechada, e a luta inteira vai de uma vez

**Decisão.** O jogador escolhe um grupo na zona e ele nasce como **onda fechada**. Só nasce a próxima quando a onda inteira morre. O servidor **resolve a luta completa e envia a linha do tempo pronta**; o cliente apenas anima.

**Por quê.** A onda fechada permite que uma luta seja resolvida como um lote com começo e fim definidos. Isso reduz a necessidade de manter o servidor enviando pequenos lotes de eventos de combate continuamente.

**Teto de 50 rodadas por onda.** Se estourar, a luta termina em **impasse**: ninguém morre, não há loot dos sobreviventes, e o jogador volta ao terreno da zona. É limite de segurança contra luta que não fecha e limita o tamanho da linha do tempo que trafega.

**Parar no meio.** Se o jogador mandar parar, o servidor corta a linha do tempo no ponto certo e envia o resultado final. O que não foi animado simplesmente não aconteceu.

**Nada é decidido no cliente.** Ele recebe o resultado resolvido e apenas o representa.

---

## Decisão 9 — Tópicos, não salas

**Decisão.** Uma conexão por jogador, sempre. O servidor **inscreve** essa conexão em tópicos — zona, guilda, global — conforme o jogador se move. Mudar de zona é trocar de inscrição.

**Por quê.** Tópico é apenas uma estrutura para fan-out de mensagens. A conexão pertence ao jogador, não ao lugar, e o tópico não se torna dono de estado de gameplay.

---

## Decisão 10 — Persistência fora do caminho crítico

**Decisão.** Persistir em **pontos significativos**: login, logout, início e fim de atividade, craft, equipar, morte, mudança de zona, e checkpoint periódico. Nunca a cada tick.

**Por quê.** `UPDATE` a cada tick transforma o banco numa extensão lenta da RAM.

**O que salvar.** Estado suficiente para reconstruir, não o loop. Se a atividade termina às 10:05 e o servidor reinicia às 10:03, o `EndsAt` persistido permite que o engine continue a partir do estado salvo.

**Simplificação atual.** O fluxo comando → muta → salva → publica pode ficar inconsistente se o banco falhar depois do evento ter saído. É uma simplificação aceita no escopo atual, não um desenho provisório: transação, ordenação, retry ou outbox entram quando um requisito concreto pedir, e estão listados em "Deliberadamente não decidido".

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

```text
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

- Particionamento de estado e sharding.
- Transação, outbox e recuperação na persistência.
- Formato de wire do WebSocket — JSON ou binário.
- Como o cliente versiona e baixa o conteúdo estático.
- Reconexão no meio de um lote de combate.
- **Personagem offline.** A intenção é que o jogo renda mais com ele aberto, mesmo minimizado, e limite bastante o ganho de quem está fechado ou offline. Há um esboço, não decidido: ao desconectar, o personagem sai do GameState com a atividade e o horário persistidos; ao reconectar, o ganho do período é recalculado com um teto configurável. Decidir quando existir a primeira Activity de coleta.