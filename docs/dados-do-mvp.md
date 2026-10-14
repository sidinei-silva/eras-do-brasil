# Dados e sistemas do MVP

> **Estado do documento:** este arquivo descreve o recorte de dados do MVP, a separação entre dados compartilhados e conteúdo por escopo e a forma como esses dados entram no servidor. Os detalhes de conteúdo pertencem aos arquivos JSON; este documento não é uma segunda fonte de verdade para eles.
>
> Histórico de modelagem, alternativas descartadas e versões anteriores pertencem a `docs/historico-e-estudos.md`.

---

## 1. Escopo do MVP

O MVP é **A Travessia**: uma ilha tutorial composta por quatro zonas, trabalhando com T1 e T2.

Ela é conteúdo próprio e desacoplado da Era 1.

A Travessia não pertence a uma era histórica específica. É o espaço de passagem construído pela Raiz para o início da jornada do jogador.

A ilha é segura:

- não há PvP;
- não há perda de equipamento;
- o conteúdo de risco do jogo completo fica fora deste escopo.

O MVP deve validar o loop fundamental:

```text
coletar
   ↓
produzir
   ↓
equipar
   ↓
combater
   ↓
progredir
   ↓
atravessar
```

O conteúdo concreto de cada zona, mob, NPC, receita e passo do tutorial é definido nos arquivos de dados correspondentes.

---

## 2. Organização dos dados

Os dados são divididos em dois grandes escopos:

```text
data/
├── shared/       sistemas e catálogos compartilhados
├── mvp/          conteúdo da Travessia
└── era1/         conteúdo da Era 1, quando promovido

design/
├── catalog/      conteúdo projetado, ainda não carregado
└── era-1/        conteúdo da Era 1 ainda não promovido
```

A regra é:

> **`data/` é o que o servidor carrega. `design/` é o que já foi projetado, mas ainda não entra no runtime.**

O processo de promoção é descrito na seção 14 deste documento.

---

## 3. Dados compartilhados

Os dados compartilhados representam sistemas ou catálogos que não pertencem exclusivamente a uma era ou ao MVP.

| Arquivo | Responsabilidade |
|---|---|
| `continents.json` | estrutura dos continentes |
| `materials.json` | catálogo de materiais e requisitos de ferramenta |
| `trees.json` | árvores, habilidades e estrutura de slots |
| `skills.json` | habilidades disponíveis no escopo carregado |
| `traditions.json` | tradições de equipamento |
| `armor.json` | linhas, peças e conjuntos de armadura |
| `equipment.json` | montarias, bolsas e ferramentas |
| `destiny.json` | Árvore do Destino e seus ramos |
| `balance/combat.json` | constantes e regras quantitativas de combate |
| `balance/economy.json` | constantes econômicas |
| `balance/progression.json` | constantes de progressão |

O conteúdo efetivo desses arquivos é a fonte de verdade dos valores. Este documento registra apenas para que cada conjunto de dados existe.

### Regra de escopo

Sistema é compartilhado por definição.

Uma nova era adiciona conteúdo usando os sistemas existentes; não cria automaticamente uma nova árvore de habilidades, uma nova linha de armadura ou uma cópia paralela do sistema.

---

## 4. Conteúdo do MVP

O conteúdo específico da Travessia fica em `data/mvp/`.

| Arquivo | Responsabilidade |
|---|---|
| `zones.json` | zonas, conexões, acampamentos e recursos disponíveis |
| `factions.json` | facções usadas pelo conteúdo do MVP |
| `mobs.json` | bestiário dos mobs do MVP |
| `npcs.json` | NPCs e seus dados de diálogo |
| `recipes.json` | receitas disponíveis |
| `tutorial.json` | passos e estado do tutorial |

O `tutorial.json` representa o tutorial como máquina de estados. A lógica do servidor interpreta esses dados; os passos não devem virar uma sequência hardcoded no código.

---

## 5. Conteúdo posterior

A Era 1 permanece separada do MVP.

O conteúdo ainda não promovido fica em:

```text
design/era-1/
```

Quando chegar o momento de colocá-lo no runtime, o conteúdo será promovido seguindo o processo deste documento.

A organização planejada é:

```text
data/
├── shared/
├── mvp/
└── era1/
```

O mesmo esquema de dados deve ser usado entre MVP e Era 1. O que muda é o conteúdo.

---

## 6. Quatro zonas da Travessia

A Travessia possui quatro zonas com funções distintas no tutorial:

| Zona | Função no fluxo |
|---|---|
| **A Beira** | início da jornada e primeiro combate |
| **Porto de Passagem** | vila, mercado e estações |
| **Mata Revirada** | primeiro espaço de coleta T2 |
| **Pedreira Torta** | segundo espaço de coleta T2 |

Os detalhes de conexões, recursos, acampamentos e gates pertencem a `data/mvp/zones.json`.

A saída de A Beira é controlada pelo fluxo do tutorial. O gate é responsabilidade do sistema de progressão/tutorial, e não uma regra duplicada em cada conexão do mapa.

---

## 7. Materiais e produção

O MVP começa com materiais T1 que podem ser coletados sem ferramenta.

Isso permite iniciar o ciclo:

```text
material T1
    ↓
primeiro equipamento
    ↓
ferramentas
    ↓
coleta T2
    ↓
refino
    ↓
equipamento T2
```

Os materiais, ferramentas exigidas, receitas e estações concretas pertencem aos respectivos arquivos de dados.

Uma regra estrutural importante é:

> **O requisito de ferramenta pertence ao material, não ao nó da zona.**

Assim, o catálogo do material define o requisito uma única vez, enquanto a zona apenas declara que aquele recurso está disponível.

---

## 8. Itens e progressão do tutorial

O MVP utiliza T1 e T2.

A progressão do tutorial apresenta gradualmente:

1. primeiro equipamento;
2. combate;
3. armadura;
4. off-hand;
5. ferramentas;
6. coleta T2;
7. refino;
8. Árvore do Destino;
9. escolha de tradição;
10. conjunto T2;
11. travessia para fora da ilha.

A composição exata de itens e receitas é definida pelos arquivos de dados.

---

## 9. Cobertura de sistemas

O MVP foi desenhado para exercitar o núcleo dos sistemas que serão reutilizados posteriormente.

| Sistema | Exercitado no MVP |
|---|---|
| Inventário e equipamento | sim |
| Combate e ataque básico | sim |
| Onda fechada | sim |
| Slots e prioridade | sim |
| Energia | sim |
| Coleta | sim |
| Coleta sem ferramenta no T1 | sim |
| Ferramentas | sim |
| Craft | sim |
| Off-hand | sim |
| Armadura | sim |
| Mini-chefe e recompensa | sim |
| Mercado e armazém | sim |
| Montaria e carga | sim |
| Refino | sim |
| Árvore do Destino | sim |
| Escolha de tradição | sim |
| Conjunto completo | sim |
| PvP | não |
| Conteúdo T3+ | não |
| Artefatos | não |
| Encantamento e Essência | não |
| Qualidade | não |
| Reputação | não |
| Economia entre jogadores | não |
| Mundo da Era 1 | não |

---

## 10. Modelo de loadout no MVP

O MVP já exercita a estrutura de slots de combate.

A progressão de habilidades ocorre gradualmente:

```text
primeiro equipamento
        ↓
primeiro slot
        ↓
armadura
        ↓
mais slots
        ↓
arma T2
        ↓
loadout completo
```

A prioridade já é relevante mesmo com poucas habilidades.

---

## 11. Organização estrutural dos arquivos

Algumas regras evitam duplicação entre os dados.

### Chaves

Os arquivos usam chaves em inglês e valores de conteúdo em português.

### Materiais e ferramentas

O material declara a ferramenta necessária. A zona declara apenas a disponibilidade do recurso.

### Acampamentos e mobs

O bestiário define o mob. O mapa define onde ele aparece e em qual grupo.

```text
mobs.json
   └── definição do mob

zones.json
   └── acampamento
        └── grupo
             └── mob
```

### Gates

O desbloqueio de progressão pertence ao sistema que controla a progressão. Uma conexão do mapa não deve carregar uma segunda implementação paralela da mesma regra.

---

## 12. Esquema por escopo

MVP e Era 1 usam o mesmo formato conceitual de dados.

```text
shared/
  sistemas e catálogos compartilhados

mvp/
  conteúdo da Travessia

era1/
  conteúdo da Era 1
```

Os nomes dos arquivos de conteúdo podem se repetir entre escopos:

```text
mvp/zones.json
era1/zones.json
```

O escopo é definido pela pasta que contém o pacote.

---

## 13. O que pertence a este documento e o que não pertence

Este documento deve responder:

- qual é o escopo do MVP;
- quais pacotes de dados existem;
- onde cada pacote fica;
- qual responsabilidade cada arquivo possui;
- quais sistemas o MVP cobre;
- como os dados são relacionados;
- como o conteúdo passa de `design/` para `data/`.

Este documento não deve duplicar:

- catálogo completo de itens;
- números de balanceamento;
- fórmulas;
- lista completa de habilidades;
- estatísticas de mobs;
- receitas completas;
- diálogos;
- detalhes de cada zona;
- conteúdo histórico de versões anteriores.

---

## 14. Promoção de dados: design → data

`data/` e `design/` não são a mesma coisa:

| Pasta | O que é | Quem lê |
|---|---|---|
| `data/` | conteúdo que o servidor já pode carregar | `gamedata` |
| `design/` | conteúdo projetado que ainda não entra no runtime | projeto/design |

### Regra

`data/` só deve conter conteúdo para o qual exista código responsável por carregá-lo e representá-lo.

O fluxo é:

```text
design
   ↓
data
   ↓
gamedata
   ↓
bootstrap
   ↓
game
```

### Como promover

Para cada fatia do backlog, perguntar:

**que dado precisa existir para esta fatia funcionar?**

Promover exatamente isso de `design/` para `data/`. Nada a mais.

Exemplo: para “personagem entra no mundo”, basta a zona e o ponto de nascimento necessários para essa fatia. Não é necessário promover mobs, receitas ou habilidades ainda não usadas.

A promoção pode editar o mesmo arquivo várias vezes ao longo do desenvolvimento. Isso é esperado.

Ao promover:

1. recortar de `design/` apenas o conteúdo necessário;
2. colocar no arquivo correspondente em `data/`;
3. conferir se as referências usadas pelo conteúdo promovido existem em `data/`;
4. remover de `design/` o que foi promovido para não manter duas versões.

A exceção é `balance/`: suas referências podem incluir conteúdo ainda não carregado, conforme a regra da seção seguinte.

### Estado dos diretórios

Hoje:

```text
design/
  catalog/     armas, habilidades, materiais e equipamento de T3 a T6
  era-1/       conteúdo da Era 1 ainda não promovido

data/
  shared/      sistemas, catálogos carregados e balanceamento
  mvp/         conteúdo da Travessia
```

### Balanceamento

`balance/` permanece inteiro em `data/`. Ele cobre T1 a T6 e pode conter entradas para conteúdo que ainda não está carregado. Isso é esperado e o carregador não deve exigir que todos esses ids já existam no conteúdo promovido.

### Quando a Era 1 chegar

Promover o conteúdo de `design/era-1/` para `data/era1/` e o catálogo correspondente de T3 a T6 para `data/shared/`.

### Contrato

`dados-do-mvp.md` descreve o que o MVP terá quando estiver completo.

`data/` mostra o que já entrou para o servidor carregar.

Eles podem divergir durante o desenvolvimento. Quem mede o progresso é o backlog.

---

## 15. Relação com o histórico

Alternativas sobre estrutura de zonas, dados, gates, conteúdo do tutorial e organização de `data/` e `design/` pertencem ao histórico quando já não forem necessárias para entender o estado atual.

Consulte `docs/historico-e-estudos.md` para a evolução dessas decisões.
