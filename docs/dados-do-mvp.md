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

O processo de promoção de `design/` para `data/` está documentado em `docs/como-promover-dado.md`.

---

## 3. Dados compartilhados

Os dados compartilhados representam sistemas ou catálogos que não pertencem exclusivamente a uma era ou ao MVP.

| Arquivo                    | Responsabilidade                                 |
| -------------------------- | ------------------------------------------------ |
| `continents.json`          | estrutura dos continentes                        |
| `materials.json`           | catálogo de materiais e requisitos de ferramenta |
| `trees.json`               | árvores, habilidades e estrutura de slots        |
| `skills.json`              | habilidades disponíveis no escopo carregado      |
| `traditions.json`          | tradições de equipamento                         |
| `armor.json`               | linhas, peças e conjuntos de armadura            |
| `equipment.json`           | montarias, bolsas e ferramentas                  |
| `destiny.json`             | Árvore do Destino e seus ramos                   |
| `balance/combat.json`      | constantes e regras quantitativas de combate     |
| `balance/economy.json`     | constantes econômicas                            |
| `balance/progression.json` | constantes de progressão                         |

O conteúdo efetivo desses arquivos é a fonte de verdade dos valores. Este documento registra apenas **para que cada conjunto de dados existe**.

### Regra de escopo

Sistema é compartilhado por definição.

Uma nova era adiciona conteúdo usando os sistemas existentes; não cria automaticamente uma nova árvore de habilidades, uma nova linha de armadura ou uma cópia paralela do sistema.

Se uma decisão futura alterar essa regra, ela deve ser registrada separadamente como decisão de design.

---

## 4. Conteúdo do MVP

O conteúdo específico da Travessia fica em `data/mvp/`.

| Arquivo         | Responsabilidade                                     |
| --------------- | ---------------------------------------------------- |
| `zones.json`    | zonas, conexões, acampamentos e recursos disponíveis |
| `factions.json` | facções usadas pelo conteúdo do MVP                  |
| `mobs.json`     | bestiário dos mobs do MVP                            |
| `npcs.json`     | NPCs e seus dados de diálogo                         |
| `recipes.json`  | receitas disponíveis                                 |
| `tutorial.json` | passos e estado do tutorial                          |

O `tutorial.json` representa o tutorial como **máquina de estados**, contendo para cada passo os dados necessários para entrada, conclusão, ensino, desbloqueio e recompensa.

A lógica do servidor interpreta esses dados; os passos não devem virar uma sequência hardcoded no código.

---

## 5. Conteúdo posterior

A Era 1 permanece separada do MVP.

O conteúdo ainda não promovido fica em:

```text
design/era-1/
```

Quando chegar o momento de colocá-lo no runtime, o conteúdo será promovido seguindo `docs/como-promover-dado.md`.

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

| Zona                  | Função no fluxo                      |
| --------------------- | ------------------------------------ |
| **A Beira**           | início da jornada e primeiro combate |
| **Porto de Passagem** | vila, mercado e estações             |
| **Mata Revirada**     | primeiro espaço de coleta T2         |
| **Pedreira Torta**    | segundo espaço de coleta T2          |

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

O objetivo desta documentação é registrar **quais sistemas o MVP precisa exercitar**, não repetir o catálogo de itens.

---

## 9. Cobertura de sistemas

O MVP foi desenhado para exercitar o núcleo dos sistemas que serão reutilizados posteriormente.

| Sistema                     | Exercitado no MVP |
| --------------------------- | ----------------- |
| Inventário e equipamento    | sim               |
| Combate e ataque básico     | sim               |
| Onda fechada                | sim               |
| Slots e prioridade          | sim               |
| Energia                     | sim               |
| Coleta                      | sim               |
| Coleta sem ferramenta no T1 | sim               |
| Ferramentas                 | sim               |
| Craft                       | sim               |
| Off-hand                    | sim               |
| Armadura                    | sim               |
| Mini-chefe e recompensa     | sim               |
| Mercado e armazém           | sim               |
| Montaria e carga            | sim               |
| Refino                      | sim               |
| Árvore do Destino           | sim               |
| Escolha de tradição         | sim               |
| Conjunto completo           | sim               |
| PvP                         | não               |
| Conteúdo T3+                | não               |
| Artefatos                   | não               |
| Encantamento e Essência     | não               |
| Qualidade                   | não               |
| Reputação                   | não               |
| Economia entre jogadores    | não               |
| Mundo da Era 1              | não               |

A tabela serve para registrar **cobertura de escopo**, não para substituir os arquivos que implementam cada sistema.

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

O catálogo de habilidades e a configuração concreta dos slots pertencem aos dados compartilhados e ao conteúdo do MVP.

---

## 11. Organização estrutural dos arquivos

Algumas regras evitam duplicação entre os dados.

### Chaves

Os arquivos usam chaves em inglês e valores de conteúdo em português.

A intenção é manter uma convenção única entre os arquivos.

### Materiais e ferramentas

O material declara a ferramenta necessária.

```text
material
   └── requisito de ferramenta
```

A zona declara apenas a disponibilidade do recurso.

```text
zona
   └── recurso disponível
```

### Acampamentos e mobs

O bestiário define o mob.

O mapa define onde ele aparece e em qual grupo.

```text
mobs.json
   └── definição do mob

zones.json
   └── acampamento
        └── grupo
             └── mob
```

Isso evita manter uma relação bidirecional e redundante.

### Gates

O desbloqueio de progressão pertence ao sistema que controla a progressão.

Uma conexão do mapa não deve carregar uma segunda implementação paralela da mesma regra de gate.

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

Isso permite que o carregador componha:

```text
shared + pacote de conteúdo
```

sem precisar criar uma arquitetura diferente para cada era.

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

Este documento **não deve duplicar**:

- catálogo completo de itens;
- números de balanceamento;
- fórmulas;
- lista completa de habilidades;
- estatísticas de mobs;
- receitas completas;
- diálogos;
- detalhes de cada zona;
- conteúdo histórico de versões anteriores.

Essas informações pertencem aos dados ou aos documentos especializados.

---

## 14. Relação com o histórico

Durante a modelagem do MVP existiram alternativas sobre:

- estrutura de zonas;
- relacionamento entre mobs, acampamentos e zonas;
- localização dos requisitos de ferramenta;
- organização de `data/` e `design/`;
- gates de conexão;
- conteúdo inicial do tutorial;
- composição e quantidade de conteúdo.

Essas decisões só devem permanecer neste documento quando ainda forem necessárias para entender a estrutura atual.

As versões anteriores, alternativas descartadas e a evolução dessas decisões pertencem a:

```text
docs/historico-e-estudos.md
```

Assim, este arquivo pode continuar sendo usado como referência do **estado atual dos dados do MVP**, sem transformar cada decisão histórica em uma regra vigente.
