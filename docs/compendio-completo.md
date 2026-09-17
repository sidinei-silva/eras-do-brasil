# Eras do Brasil — compêndio completo

Estado integral do projeto. Tudo que foi decidido, com os dados atuais. Gerado a partir dos arquivos JSON, sem resumo.

---

## Parte I — Identidade do projeto

**Um MMORPG idle de Brasil colonial com a gramática de progressão do Albion Online.**

Sem classe: você é o que veste. O mundo é feito de eras — fatias do Brasil histórico dispostas lado a lado ao redor da Raiz. O jogador é um forasteiro trazido pela Ruptura, que não pertence a nenhum dos povos em conflito.

**A fantasia central:** montar uma build com peças de séculos diferentes.

### Origem

Fusão de dois projetos. **A Escória** entra com arquitetura, código, fluxo da MVP e a gramática do Albion. **Eras do Brasil** entra com lore, mundo e mecânicas selecionadas.

### Regras de método fixadas

- Material criado com IA vale como mockup ou brainstorm, nunca como texto final.
- Nos documentos, separar o que está escrito no GDD do que é proposta.
- O novo GDD nasce com o tamanho do da Escória, não com o do Eras. Extração, não migração.
- Lore é puxada, não empurrada. Teste: se o jogador nunca ler isto, ele joga pior?
- Não resetar código. É dele nos dois projetos.
- Cliente só de menu primeiro; backend autoritativo.
- Toda constante mora em arquivo de dados, nunca em código.

---

## Parte II — Mundo

### Continentes

| | Continente 1 | Continente 2 |
|---|---|---|
| Nome | As Eras | O Emaranhado |
| Tier | T1 a T6 | T6 a T8 |
| Risco | segura, disputada, mortal | só perda total |
| Conteúdo | as eras separadas, com hub cada | eras misturadas, sem hub fixo |
| Quando | desde o começo | muito depois do lançamento |

### Regras estruturais

- **Era = cluster de zonas** com hub na borda externa e tier subindo em direção ao centro. Eras ficam lado a lado, não empilham no tempo nem no nível.
- **Coração da Raiz** no centro: cidade segura cercada de mortal, e passagem para o continente 2.
- **Zona é a unidade** — um nó com tier. A cidade é uma zona. Não há portão entre regiões; região é rótulo de bioma.
- **Cinco campos independentes na modelagem:** continente, era, região, tier, risco. Nenhum deriva do outro.
- Toda zona precisa de pelo menos dois caminhos.
- Facção é por zona, não por região. Nenhuma facção pode ter duas zonas seguidas no mesmo tier.
- A geografia não é o mapa do Brasil. Decisão irreversível, paga pelas distorções da Ruptura.
- **Uma era para ser jogo, duas para ser este jogo.**

### Escopo por fase

| Escopo | Conteúdo |
|---|---|
| MVP | ilha de 4 zonas, T1–T2, banda segura |
| MVP | 1 era completa, 22 zonas, T1–T6 |
| Continente 1 | 4 eras, 60 a 100 zonas |
| Completo | mais o Emaranhado, T6–T8 |

### A Era 1 — Descoberta e Colonização (1500–1654)

**Regiões:**

| Região | Bioma | Tier |
|---|---|---|
| Costa do Pau-Brasil | mata-atlantica-litoranea | T1–T2 |
| Mata dos Engenhos | mata-atlantica | T2–T3 |
| Sertão de Dentro | caatinga | T4–T4 |
| Rio das Almas | varzea-fluvial | T5–T5 |
| Mata Sem Fim | floresta-amazonica | T6–T6 |

A cadeia é a penetração colonial real: feitoria de pau-brasil na praia, engenhos na mata, entradas no sertão, subida pelo rio, floresta amazônica.

**Facções:** colonizador, indigena, folclorico. São da era, não do jogo — a Era 2 terá outras.

**Checagem histórica adotada:** Curupira, Boitatá, Ipupiara e Anhangá estão documentados no século XVI (Anchieta e Gandavo, 1560–1576). Caipora, Iara, Boto e Mapinguari são atestações dos séculos XVIII e XIX e foram cortados. Mula-sem-cabeça é ibérica medieval.

### As 22 zonas

| Zona | Região | Tier | Risco | Facção | Hub | Recursos | Chefe |
|---|---|---|---|---|---|---|---|
| Feitoria da Cruz | Costa do Pau-Brasil | T1 | segura | colonizador | sim | — | — |
| Praia de Coqueiros | Costa do Pau-Brasil | T1 | segura | livre |  | Piaçava · Couro de capivara | — |
| Manguezal do Sal | Costa do Pau-Brasil | T1 | segura | folclorico |  | Seixo de praia · Cascalho | — |
| Roça de Mandioca | Costa do Pau-Brasil | T1 | segura | colonizador |  | Mandioca · Pau-mole | — |
| Mata do Pau-Brasil | Costa do Pau-Brasil | T2 | segura | livre |  | Pau-brasil · Couro de veado | — |
| Aldeia Potiguara | Costa do Pau-Brasil | T2 | segura | indigena |  | Couro de veado · Algodão-bravo | — |
| Baixio das Garças | Costa do Pau-Brasil | T2 | segura | livre |  | Couro de veado · Arenito | — |
| Canavial Velho | Mata dos Engenhos | T2 | segura | colonizador |  | Algodão-bravo · Ferro-de-brejo | — |
| Engenho da Cruz | Mata dos Engenhos | T3 | disputada | colonizador |  | Ferro-de-serrote | — |
| Mata Fechada | Mata dos Engenhos | T3 | disputada | folclorico |  | Jatobá · Couro de anta | curupira |
| Olho de Boitatá | Mata dos Engenhos | T3 | disputada | folclorico |  | Laje-branca · Essência | boitata |
| Serra da Barriga | Mata dos Engenhos | T3 | disputada | livre |  | Couro de anta · Caroá | — |
| Caatinga Branca | Sertão de Dentro | T4 | disputada | indigena |  | Macambira · Aroeira | — |
| Serrote das Pedras | Sertão de Dentro | T4 | disputada | livre |  | Cobre-do-sertão · Granito rachado | — |
| Curral do Gado | Sertão de Dentro | T4 | disputada | colonizador |  | Couro de boi · Macambira | mula-sem-cabeca |
| Lajedo Rachado | Sertão de Dentro | T4 | disputada | folclorico |  | Granito rachado · Essência | — |
| Várzea Alagada | Rio das Almas | T5 | mortal | indigena |  | Curauá · Couro de jacaré | — |
| Porto de Canoas | Rio das Almas | T5 | mortal | livre |  | Pau-ferro | — |
| Corredeira Negra | Rio das Almas | T5 | mortal | folclorico |  | Ouro-branco · Cristal-de-lapa | ipupiara |
| Castanhal Antigo | Mata Sem Fim | T6 | mortal | indigena |  | Castanheira-mãe · Couro de sucuri | — |
| Igarapé de Anhangá | Mata Sem Fim | T6 | mortal | folclorico |  | Pedra-de-raiz · Cipó-titica | anhanga |
| A Raiz | Mata Sem Fim | T6 | mortal | livre |  | Ferro-do-céu · Essência | guardiao-da-fenda |

**44 conexões**, com tempo de viagem em minutos reais. Cada zona tem dois ou três caminhos; não há rota obrigatória.

### Zonas da MVP

Feitoria da Cruz, Praia de Coqueiros, Manguezal do Sal, Roça de Mandioca, Mata do Pau-Brasil, Aldeia Potiguara, Baixio das Garças. 10 conexões.

### Materiais

| Tier | Madeira | Fibra | Couro | Minério | Pedra | Comida | Essência |
|---|---|---|---|---|---|---|---|
| T1 | Pau-mole | Piaçava | Couro de capivara | Cascalho | Seixo de praia | Mandioca | — |
| T2 | Pau-brasil | Algodão-bravo | Couro de veado | Ferro-de-brejo | Arenito | — | — |
| T3 | Jatobá | Caroá | Couro de anta | Ferro-de-serrote | Laje-branca | — | — |
| T4 | Aroeira | Macambira | Couro de boi | Cobre-do-sertão | Granito rachado | — | — |
| T5 | Pau-ferro | Curauá | Couro de jacaré | Ouro-branco | Cristal-de-lapa | — | — |
| T6 | Castanheira-mãe | Cipó-titica | Couro de sucuri | Ferro-do-céu | Pedra-de-raiz | — | — |

**A Essência é o material de encantamento**, equivalente às Runas, Almas e Relíquias do Albion. Não é coletada em nó: **cai de mob, chefe e baú**, e o tier do drop é limitado pelo tier do mob morto.

O encantamento tem dois caminhos, como no Albion: craftar direto com recurso já encantado, vindo de nó encantado, ou pegar um item pronto e **subir o nível dele na Forja de Artefato**, gastando Essência do mesmo tier. Cada nível soma Poder de Item; qualidade é outro sistema e soma separado.

---

## Parte III — Identidade e progressão

### A Árvore do Destino — quatro ramos

| Ramo | Um nó por | O que a maestria dá |
|---|---|---|
| combate | linha de arma e por linha de armadura | poder de item |
| coleta | tipo de recurso: madeira, fibra, couro, minerio, pedra | acesso a tier e rendimento |
| refino | tipo de refinado | taxa de retorno de material |
| craft | familia de item | chance de qualidade |

**Multiplicadores de fama por ramo:** combate 1.0, coleta 0.35, refino 0.15, craft 0.2. Coleta, refino e craft sobem mais rápido porque cada ação rende menos fama.

**Bônus de maestria:**

| Ramo | Bônus por nível |
|---|---|
| Combate | +12 de Poder de Item |
| Coleta | +1.5% de rendimento |
| Refino | +0.8% de retorno (base 15%) |
| Craft | +1.2% de qualidade (base 10%) |

### Regras de identidade

- **Progressão por grind.** A progressão por Moeda de Classe, mentor e missão do Eras fica guardada.
- **O jogador não é de nenhuma origem.** As três origens são as facções em conflito, não opções de criação.
- **Origem é passado, gear é presente.**
- **Afinidade:** multiplicador de 1.0 a 1.5 ao longo de 60 ações com a mesma arma. Congela offline, reseta na troca. Custo de oportunidade, nunca punição. **É a régua do projeto inteiro.**
- **Sem rebirth.** Progressão é catraca.
- **Ferramentas:** A ferramenta pode estar no maximo um tier abaixo do recurso. Para T5 e preciso ferramenta T4 ou melhor. Para tirar recurso acima de normal, a ferramenta precisa ser do mesmo tier do no.

---

## Parte IV — Equipamento

### Os sete slots

| Slot | Contribui |
|---|---|
| Mão principal | Q, W, E e uma passiva |
| Off-hand | uma ativa e atributos |
| Cabeça | uma ativa e uma passiva |
| Torso | uma ativa e uma passiva (declara a linha) |
| Botas | uma ativa e uma passiva |
| Montaria | uma ativa e uma passiva |
| Bolsa | Largar Carga e uma passiva |

Até 14 habilidades ativas e passivas ao mesmo tempo.

### Árvores e papéis

| Árvore | Papéis |
|---|---|
| Físico | Dano corpo a corpo · Controle e impacto |
| Projétil | Precisão · Área e desgaste |
| Mágico | Dano · Suporte |

**Árvore é o kit de Q, W e passivas** — 15 entradas cada, do T2 ao T6. É o maior bloco de trabalho do projeto e não escala com o número de eras. **Arma é arte mais um E.** A identidade vem de qual subconjunto do pool ela acessa.

**Era nova nunca traz árvore nova.**

**Regras de mãos:** *main* — Ocupa a mão principal e libera o slot de off-hand. *two* — Ocupa as duas mãos; sem off-hand, em troca de mais poder de item. *off* — Ocupa apenas a mão secundária; exige uma arma de uma mão da mesma árvore.

### Armas da Era 1

| Arma | Árvore | Papel | Mãos | Origem | Entra | E | Efeito do E |
|---|---|---|---|---|---|---|---|
| Espada de lado | Físico | Dano corpo a corpo | main | colonizador | T2 | Estocada de Fé | Dano alto em alvo único; aplica 2 acúmulos de sangramento. |
| Tacape | Físico | Controle e impacto | two | indigena | T3 | Quebra-Crânio | Dano médio; atordoa por 1 turno, cancelando a ação do alvo. |
| Zarabatana | Projétil | Área e desgaste | two | indigena | T2 | Dardo de Curare | Veneno forte; ao matar o alvo, passa para outro inimigo. |
| Besta de mão | Projétil | Precisão | main | colonizador | T3 | Virote Perfurante | Dano alto; ignora armadura por completo. |
| Cabaça de Boitatá | Mágico | Dano | main | folclorico | T2 | Boitatá | Dano em área; os atingidos continuam queimando por 3 turnos. |
| Maracá | Mágico | Suporte | main | folclorico | T3 | Chamado dos Espíritos | Cura o grupo e remove um efeito negativo de cada aliado. |
| Rodela | Físico | Controle e impacto | off | colonizador | T3 | Encostar o Escudo | Absorve por completo o próximo golpe recebido. |
| Tocha de breu | Projétil | Área e desgaste | off | colonizador | T3 | Atear | Queima o alvo e revela quem está escondido. |
| Patuá | Mágico | Suporte | off | folclorico | T3 | Abrir o Patuá | Remove um efeito negativo e devolve recurso. |

Cada origem entrega uma arma no T2 e uma no T3, e cada árvore recebe uma de cada. As três do T2 são as iniciais.

**Gap conhecido:** a árvore Mágico não tem arma de duas mãos na Era 1. O berimbau da Era 2 preenche.

### As três árvores de habilidade, completas

#### Físico

**Q — ataque**

| Tier | Nome | Efeito | Armas | Tags |
|---|---|---|---|---|
| T2 | Golpe Segura | Dano em alvo único, recarga curta. | Espada de lado, Tacape | — |
| T2 | Talho | Sangramento acumulável até 3 vezes. | Espada de lado | dot |
| T3 | Baque Seco | Dano; o alvo causa menos dano por 2 turnos. | Tacape | debuff |
| T4 | Revés | Dano reduzido em até 3 alvos. | Espada de lado, Tacape | area |
| T5 | Quebra-Guarda | Reduz a armadura do alvo a cada acerto. | Espada de lado | debuff |
| T6 | Marretada | Dano alto; interrompe conjuração. | Tacape | interrupcao |

**W — utilidade**

| Tier | Nome | Efeito | Armas | Tags |
|---|---|---|---|---|
| T2 | Firmar os Pés | Reduz dano recebido por 3 turnos. | Espada de lado, Tacape | defesa |
| T3 | Grito de Mata | Provoca; força inimigos a atacar você. | Tacape | controle |
| T4 | Encurralar | O alvo não consegue escapar. | Espada de lado, Tacape | anti-fuga |
| T5 | Segundo Fôlego | Cura instantânea. | Espada de lado | sustentacao |
| T6 | Vontade de Ferro | Imune a controle por 2 turnos. | Espada de lado, Tacape | defesa |

**Passivas**

| Tier | Nome | Efeito | Armas | Tags |
|---|---|---|---|---|
| T3 | Couro Grosso | Armadura aumentada. | Espada de lado, Tacape | defesa |
| T4 | Sangue Quente | Mais dano quanto menor a vida. | Espada de lado | — |
| T5 | Calo | Reduz dano de sangramento e veneno recebidos. | Tacape | defesa |
| T6 | Braço Pesado | A cada 3 acertos, o próximo é crítico. | Espada de lado, Tacape | — |

#### Projétil

**Q — ataque**

| Tier | Nome | Efeito | Armas | Tags |
|---|---|---|---|---|
| T2 | Tiro Certo | Dano em alvo único. | Zarabatana, Besta de mão | — |
| T2 | Sopro Curto | Veneno acumulável até 5 vezes. | Zarabatana | dot |
| T3 | Tiro Duplo | Dois disparos de dano reduzido. | Besta de mão | — |
| T4 | Salva | Dano baixo em todos os inimigos. | Zarabatana, Besta de mão | area |
| T5 | Perfurante | Ignora parte da armadura. | Besta de mão | — |
| T6 | Névoa de Curare | Aplica veneno em todos os inimigos. | Zarabatana | area, dot |

**W — utilidade**

| Tier | Nome | Efeito | Armas | Tags |
|---|---|---|---|---|
| T2 | Recuar | Aumenta evasão por 2 turnos. | Zarabatana, Besta de mão | fuga |
| T3 | Marcar | O alvo recebe mais dano de todas as fontes. | Zarabatana, Besta de mão | debuff |
| T4 | Armadilha de Cipó | O alvo perde 1 turno. | Zarabatana | controle |
| T5 | Fôlego de Caçador | Reduz a recarga das habilidades. | Besta de mão | — |
| T6 | Rastro Falso | Grande bônus de escape. | Zarabatana, Besta de mão | fuga |

**Passivas**

| Tier | Nome | Efeito | Armas | Tags |
|---|---|---|---|---|
| T3 | Pé Leve | Bônus permanente de escape. | Zarabatana, Besta de mão | fuga |
| T4 | Olho Treinado | Chance de crítico aumentada. | Besta de mão | — |
| T5 | Aljava Funda | Recupera recurso ao matar. | Zarabatana, Besta de mão | — |
| T6 | Paciência | Dano cresce a cada turno sem receber dano. | Zarabatana | — |

#### Mágico

**Q — ataque**

| Tier | Nome | Efeito | Armas | Tags |
|---|---|---|---|---|
| T2 | Baque | Dano mágico em alvo único. | Cabaça de Boitatá, Maracá | — |
| T2 | Toque de Erva | Cura pequena em um aliado. | Maracá | cura |
| T3 | Labareda | Dano em até 3 inimigos. | Cabaça de Boitatá | area |
| T4 | Sopro Frio | Dano; o alvo recebe menos cura. | Cabaça de Boitatá | debuff |
| T5 | Reza Miúda | Cura em todo o grupo. | Maracá | cura |
| T6 | Maldição de Fumo | Dano por turno; ao matar, passa para outro alvo. | Cabaça de Boitatá, Maracá | dot |

**W — utilidade**

| Tier | Nome | Efeito | Armas | Tags |
|---|---|---|---|---|
| T2 | Barreira de Fumaça | Escudo que absorve dano. | Cabaça de Boitatá, Maracá | defesa |
| T3 | Silêncio | O alvo não pode usar habilidade por 2 turnos. | Cabaça de Boitatá | controle |
| T4 | Chamado | Aumenta o dano dos aliados. | Maracá | buff |
| T5 | Amarração | O alvo não consegue escapar. | Cabaça de Boitatá, Maracá | anti-fuga |
| T6 | Presença | Reduz o dano recebido por todo o grupo. | Maracá | buff |

**Passivas**

| Tier | Nome | Efeito | Armas | Tags |
|---|---|---|---|---|
| T3 | Fôlego Longo | Recurso máximo aumentado. | Cabaça de Boitatá, Maracá | — |
| T4 | Mão Segura | Reduz a recarga das habilidades de cura. | Maracá | cura |
| T5 | Eco | Chance de a habilidade usada repetir. | Cabaça de Boitatá, Maracá | — |
| T6 | Brasa Viva | Mais dano contra alvo que já sofre dano por turno. | Cabaça de Boitatá | — |

### Off-hands

| Off-hand | Árvore | Entra | Ativa | Efeito |
|---|---|---|---|---|
| Rodela | Físico | T3 | Encostar o Escudo | Absorve por completo o próximo golpe recebido. |
| Tocha de breu | Projétil | T3 | Atear | Queima o alvo e revela quem está escondido. |
| Patuá | Mágico | T3 | Abrir o Patuá | Remove um efeito negativo e devolve recurso. |

### Armadura — linhas

| Linha | Materiais | Tradição | Identidade | Peso |
|---|---|---|---|---|
| Pesada | minerio, couro | colonizador | armadura, autocura instantânea, resistir a controle | alto |
| Média | couro, fibra | indigena | evasão, crítico, viagem, escape | medio |
| Leve | fibra | folclorico | recurso, escudo, cura ao longo do tempo, sumir | baixo |

### Armadura — ativas por peça

| Peça | Linha | Slot | Tier | Habilidade | Efeito |
|---|---|---|---|---|---|
| Sandálias de Piaçava | Leve | Botas | T3 | Passo Leve | Reduz o peso do que você carrega. |
| Sandálias de Piaçava | Leve | Botas | T5 | Sumir no Mato | Grande bônus de escape, uma vez por combate. |
| Carapuça | Leve | Cabeça | T2 | Cabeça Limpa | Regenera recurso a cada turno. |
| Carapuça | Leve | Cabeça | T5 | Sussurro | Reduz a recarga da próxima habilidade usada. |
| Manto de Retalhos | Leve | Torso | T2 | Casca de Luz | Escudo que absorve dano. |
| Manto de Retalhos | Leve | Torso | T5 | Panos Quentes | Cura em si mesmo ao longo de vários turnos. |
| Alpercatas | Média | Botas | T3 | Pé Solto | Bônus de escape. |
| Alpercatas | Média | Botas | T5 | Trilha Conhecida | Reduz o tempo de viagem entre zonas. |
| Cocar | Média | Cabeça | T2 | Olho Aberto | Aumenta a chance de crítico. |
| Cocar | Média | Cabeça | T5 | Faro | Revela quem está com postura de gank na zona. |
| Escaupil | Média | Torso | T2 | Rolar | Evita completamente o próximo golpe recebido. |
| Escaupil | Média | Torso | T5 | Couro Batido | Reduz o dano recebido de sangramento e veneno. |
| Grevas | Pesada | Botas | T3 | Passo Pesado | Aumenta a capacidade de carga. |
| Grevas | Pesada | Botas | T5 | Fincar | O alvo não consegue escapar de você. |
| Morrião | Pesada | Cabeça | T2 | Cabeça Fria | Reduz a duração de todo controle sofrido. |
| Morrião | Pesada | Cabeça | T5 | Visor Baixo | Reduz o dano crítico recebido. |
| Couraça | Pesada | Torso | T2 | Aguentar | Reduz drasticamente o dano recebido por 2 turnos. |
| Couraça | Pesada | Torso | T5 | Ferro Vivo | Cura instantânea proporcional à sua armadura. |

### Armadura — passivas

| Slot | Linha | Tier | Passiva | Efeito | Acumula |
|---|---|---|---|---|---|
| Botas | todas | T2 | Pé no Chão | Aumenta a capacidade de carga. | sim |
| Botas | todas | T4 | Pressa | Reduz todas as recargas. | sim |
| Botas | todas | T6 | Sola Dura | Reduz o tempo de viagem entre zonas. | sim |
| Cabeça | todas | T2 | Rijeza | Aumenta resistência física e mágica. | sim |
| Cabeça | todas | T4 | Cabeça no Lugar | Reduz a duração de controle sofrido. | sim |
| Cabeça | todas | T6 | Faro Fino | Chance de obter recurso extra ao coletar. | sim |
| Torso | Pesada | T2 | Teimosia | Reduz drasticamente a duração de controle sofrido. | não |
| Torso | Média | T2 | Faca Afiada | Aumenta o dano de ataque básico. | não |
| Torso | Leve | T2 | Boca de Fogo | Aumenta dano de habilidade e potência de cura. | não |
| Torso | Pesada | T4 | Chamariz | Inimigos priorizam você como alvo. | não |
| Torso | Média | T4 | Ligeireza | Após matar, bônus de coleta e de fuga por um tempo. | não |
| Torso | Leve | T4 | Poupança | Reduz o custo de recurso das habilidades. | não |
| Torso | Pesada | T6 | Casco | Converte parte do dano recebido em armadura temporária. | não |
| Torso | Média | T6 | Sem Rastro | Reduz a chance de aparecer na fila de gank. | não |
| Torso | Leve | T6 | Segunda Voz | Chance de a habilidade não entrar em recarga. | não |

Passivas de cabeça e botas são comuns às três linhas. **A passiva de torso carrega a identidade da linha.**

### Bônus de conjunto

| Conjunto | Exige | Bônus |
|---|---|---|
| Pesada | 3 peças | Armadura adicional e resistência a controle. |
| Média | 3 peças | Evasão adicional e bônus de escape. |
| Leve | 3 peças | Recurso máximo e potência de escudo e cura aumentados. |

**A era de cada peça não importa** — o que conta é a linha. Isso preserva a mistura de eras como algo desejável.

### Montarias e bolsas

| Montaria | Velocidade | Carga | Ativa | Passiva |
|---|---|---|---|---|
| Cavalo de sela | rapido | baixo | Meia Volta — Arranca e ganha grande bônus de fuga. | Passo Solto — Reduz o tempo de viagem entre zonas. |
| Mula | medio | medio | Aguentar Segura — Resiste uma vez a ser derrubado da montaria. | Lombo Largo — Capacidade de carga moderada. |
| Boi de carga | lento | alto | Parar Tudo — Ancora no lugar e protege a carga do saque. | Cargueiro — Grande aumento de capacidade de carga. |

| Bolsa | Ativa | Passiva |
|---|---|---|
| Bolsa de couro | Largar Carga | Fundo Largo — Aumenta a capacidade da bolsa. |
| Cesto de cipó | Largar Carga | Trançado — Reduz o peso de recurso bruto. |
| Surrão de sal | Largar Carga | Bem Amarrado — Parte da carga não cai ao morrer. |

### Custo de equipamento por era

| Item | Quantidade |
|---|---|
| Árvores e pool de skills | 0 |
| Armas | 6 (arte + E) |
| Off-hands | 3 |
| Peças de armadura | 9 (só arte e material) |
| Habilidades de armadura | 0 |

**Cerca de nove habilidades novas por era.** O resto é arte e tabela.

---

## Parte V — Combate

**Auto-battler, sem posicionamento.** Tick de 2.0 segundos. Ciclo padrão: Q Q Q Q E.

"Área" significa número de alvos, não formato nem alcance. Isso elimina metade do vocabulário de habilidade do Albion, que existe para mover gente pelo mapa.

### Poder de Item

```
IP(peça) = base(tier) + encantamento + qualidade
```

| Tier | T1 | T2 | T3 | T4 | T5 | T6 |
|---|---|---|---|---|---|---|
| base | 100 | 200 | 350 | 550 | 800 | 1100 |

| Encantamento | +0 | +1 | +2 | +3 | +4 |
|---|---|---|---|---|---|
| bônus | 0 | 80 | 170 | 270 | 380 |

| Qualidade | normal | bom | excepcional | excelente | obra_prima |
|---|---|---|---|---|---|
| bônus | 0 | 20 | 50 | 90 | 140 |

**Consequência desenhada:** um T4+3 tem 820 de IP e supera um T5 limpo, que tem 800. É essa sobreposição que faz o mercado de encantados existir.

**IP do loadout — média ponderada:**

| Slot | Peso |
|---|---|
| arma uma mao | 0.35 |
| arma duas maos | 0.45 |
| offhand | 0.1 |
| cabeca | 0.15 |
| torso | 0.25 |
| botas | 0.15 |

Arma de duas mãos absorve o peso do off-hand. **Torso é o slot de maior peso** entre as armaduras.

### Atributos derivados

```
AP        = IP × 0.5
HP        = 300 + IP × 2.0
Armadura  = (IP_cabeça + IP_torso + IP_botas) × 0.4
```

Só as três peças de armadura contribuem para a Armadura.

### Dano

```
mitigação      = ARM / (ARM + 200 + 2.0 × IP_atacante),  teto 75%
fator_relativo = clamp(1 + (IP_atacante − IP_alvo) / 1000, 0.4, 2.5)

dano = poder_skill × (AP/100) × (1 − mitigação) × fator_relativo
```

**A penetração por IP não é enfeite.** Sem ela a mitigação sobe de 45% no T2 para 58% no T6 e tier alto fica estritamente mais seguro — o simulador mostrou T5 e T6 aguentando grupos com elite que matavam um T4.

**O fator relativo é a peça política do sistema.** Escalar pela diferença de IP é o que faz um T6 esmagar um T4 e o que dá sentido à zona de risco.

**Poder de skill:** Q = 35, W_dano = 45, E = 90.

### Mobs e grupos

| Tipo | HP | AP | anti-fuga |
|---|---|---|---|
| normal | 0.35× | 0.45× | 0.5 |
| elite | 1.5× | 0.85× | 2.5 |
| chefe | 5.0× | 1.15× | 4.0 |

Mob humano normal tem anti-fuga 1.5 em vez de 0.5.

**O jogador escolhe o grupo, como escolhe um nó de coleta.** A zona oferece grupos nomeados; o sorteio fica na composição — 2 a 4 inimigos, com 12% de chance de um elite se juntar. Estado de zona multiplica: abundante 1.6×, normal 1.0×, escassa 0.6×.

**O grupo nasce como onda fechada: só nasce a próxima quando a onda inteira morre.** O jogador foca um alvo por vez e todos os vivos atacam a cada tick, e por isso um grupo de 4 é muito mais perigoso que quatro lutas seguidas de 1. Intervalo entre ondas: 8s.

**Teto de 50 rodadas por onda.** Se estourar, a luta termina em impasse — ninguém morre, não há loot dos sobreviventes, e o jogador volta ao terreno da zona. É limite de segurança, não restrição: o pior caso medido é 39 rodadas.

Como a onda é fechada, **o servidor resolve a luta inteira e envia a linha do tempo pronta.** O cliente só anima.

### Regras de combate

A cada tick, nesta ordem:

1. **Condições de parada** — carga cheia, pocoes acabaram, durabilidade minima pct.
2. **Limiar de retirada** — rola fuga contra a anti-fuga do inimigo.
3. **Limiar de cura** — poção ou habilidade.
4. **Atacar.**

**Parar significa parar no lugar, NUNCA voltar para a cidade. Viagem de volta continua custando. Paradas nao se desligam; o valor delas e ajustavel.**

| Configuração | Padrão |
|---|---|
| limiar cura pct | 45% |
| limiar retirada pct | 20% |
| carga cheia | True |
| pocoes acabaram | True |
| durabilidade minima pct | 30 |

**Poção:** cura 35% da vida, recarga de 8 ticks, 8 por sessão.

### Fuga e retirada

```
anti_fuga_efetiva = anti_fuga_do_mais_forte + 0.5 × (inimigos_vivos − 1)
chance = clamp(0.3 + pontos_fuga × 0.1 − anti_fuga_efetiva × 0.08, 0.05, 0.75)
```

Mesma fórmula em PvE e PvP — o que conserta um problema que a fuga tinha: só servia para PvP, e a maioria dos jogadores nunca vai fazer PvP.

**A anti-fuga cresce com o número de inimigos vivos.** Foi essa regra que consertou o desbalanceamento: antes, sete pontos de fuga tornavam o jogador praticamente imune.

**A chance não sobe a cada tentativa.** Cada falha custa um turno inteiro mais durabilidade. Fuga alta sai barato; fuga baixa sai caro ou não sai. Morrer continua possível. O atributo significa **eu escapo barato**, não *eu escapo*.

**Pontos de fuga por habilidade:**

| Habilidade | Pontos |
|---|---|
| skill-recuar | 1 |
| skill-rastro-falso | 2 |
| skill-pe-leve | 1 |
| askill-pe-solto | 1 |
| askill-sumir-no-mato | 2 |
| apass-ligeireza | 1 |
| apass-sem-rastro | 1 |
| mskill-meia-volta | 1 |

**Anti-fuga:** skill-encurralar (2), skill-amarracao (2), askill-fincar (2).

**Exclusividade de slot:** Um slot, uma escolha. Recuar OU Rastro Falso (mesmo slot W). Pe Solto OU Trilha Conhecida (mesma bota). Ligeireza OU Sem Rastro (mesmo torso).

**Largar Carga:** +4 pontos, uma vez por combate, descarta toda a carga. Não entra na soma passiva.

**Custo da retirada:** perde o loot da luta, leva um golpe de despedida, 20s de recarga, e 3 de durabilidade por tentativa fracassada.

---

## Parte VI — Economia

### Fama

```
Fama(N → N+1) = ~3600 * 6^(N-1)
```

| Faixa | Fama |
|---|---|
| T1→T2 | 3.600 |
| T2→T3 | 22.000 |
| T3→T4 | 132.000 |
| T4→T5 | 800.000 |
| T5→T6 | 4.800.000 |

**Fama por ação:**

| Tier | mob | coleta | refino |
|---|---|---|---|
| T1 | 20 | 15 | 10 |
| T2 | 50 | 38 | 25 |
| T3 | 125 | 94 | 63 |
| T4 | 313 | 234 | 156 |
| T5 | 781 | 586 | 391 |
| T6 | 1953 | 1465 | 977 |

### Coleta

| Tier | extrair o nó | achar o próximo | por unidade |
|---|---|---|---|
| T1 | 6s | 10s | 8s |
| T2 | 10s | 15s | 12s |
| T3 | 17s | 25s | 21s |
| T4 | 28s | 45s | 36s |
| T5 | 47s | 85s | 66s |
| T6 | 78s | 160s | 119s |

2 unidades por nó. **Ambos escalam por tier** — é o que impede equipamento de tier alto sair de graça.

**Estado de zona:** abundante 1.5×, normal 1.0×, escassa 0.6×.

**Chance de encantamento na coleta:** +1 = 8.0%, +2 = 2.0%, +3 = 0.5%, +4 = 0.1%.

**Coleta é escolha de nó, nunca sorteio de tier.** A zona garante o material; o sorteio acontece só na qualidade e no encantamento. Piso garantido, teto aberto.

**Estado de zona é boletim público** no mapa, com notificação quando muda. Nunca informação que se busca com NPC.

### Refino e craft

```
1 refinado T(N) = 3 brutos T(N) + 1 refinado T(N−1)
```

A cadeia desce até o T1 — **é por isso que zona de tier baixo nunca morre.**

**Refinados por peça:**

| Peça | Refinados |
|---|---|
| arma duas maos | 20 |
| arma uma mao | 16 |
| offhand | 8 |
| torso | 16 |
| cabeca | 8 |
| botas | 8 |

### Estações

Estacoes de producao. Cada uma tem tier proprio e so produz ate o tier dela. Dono pode cobrar taxa.

**Refino — cinco, uma por material:**

| Estação | Recurso | Produz |
|---|---|---|
| Fundicao | minerio | barra |
| Curtume | couro | couro curtido |
| Tecelagem | fibra | pano |
| Serraria | madeira | tabua |
| Canteiro | pedra | bloco |

**Craft — quatro:**

| Estação | Árvore | Linha de armadura |
|---|---|---|
| A Forja | fisico | pesada |
| Posto de Caca | projetil | media |
| Terreiro | magico | leve |
| Ferramentaria | — | — |

Taxa padrão do dono: 10%. Bônus de produção da cidade: 18%.

O encaixe com o Albion é exato: lá cada oficina produz a arma **e** a armadura do arquétipo.

### Durabilidade

Máxima 100. Perde 5% por morte, 1 ponto a cada 400 ações, e 1 por tentativa de fuga fracassada. Aplica-se também ao que está na mochila.

**Penalidade de Poder de Item por faixa:**

| Faixa | Efeito |
|---|---|
| 50% a 100% | nenhum |
| 25% a 49% | -100 de Poder de Item |
| 10% a 24% | -200 de Poder de Item |
| 0% a 9% | não pode ser usado |

**Ferramentas de coleta não perdem Poder de Item.**

**Custo de conserto por ponto:** T1 = 10, T2 = 25, T3 = 60, T4 = 145, T5 = 350, T6 = 840.

### Prata

| Tier | mob solta | refino por refinado | craft por peça |
|---|---|---|---|
| T1 | 15 | 0 | 60 |
| T2 | 36 | 24 | 240 |
| T3 | 86 | 84 | 900 |
| T4 | 207 | 288 | 3.240 |
| T5 | 497 | 960 | 11.400 |
| T6 | 1.194 | 3.240 | 39.600 |

Refino T1 é de graça, como no Albion.

### Carga e transporte

Capacidade base 100. Peso: bruto 1.5, refinado 1.0, equipamento 3 + 1 por tier.

| Montaria | Bônus de carga | Modificador de viagem |
|---|---|---|
| cavalo de sela | +50 | 0.6× |
| mula | +150 | 0.8× |
| boi de carga | +400 | 1.0× |

| Bolsa | Bônus de carga |
|---|---|
| bolsa de couro | +50 |
| cesto de cipo | +80 |
| surrao de sal | +120 |

### Teleporte

**R pessoal** — última cidade visitada. Teto de peso 150, 2 de prata por peso. Bloqueado enquanto já estiver viajando e em zona vermelha com gank ativo.

**Entre cidades** — 4 de prata por peso **e** 0.5 por IP equipado. Cara o bastante para que ir sem nada seja o normal, o que gera demanda no mercado de destino.

**Armazém só nas duas cidades da era.** Carga não teleporta de graça: é a lentidão e o risco de mover mercadoria que fazem o mercado existir.

---

## Parte VII — Resultados verificados pelo simulador

Rodados com `python3 sim.py` sobre `balance.json`.

### Poder de Item por encantamento

| Tier | +0 | +1 | +2 | +3 | +4 |
|---|---|---|---|---|---|
| T2 | 200 | 280 | 370 | 470 | 580 |
| T3 | 350 | 430 | 520 | 620 | 730 |
| T4 | 550 | 630 | 720 | 820 | 930 |
| T5 | 800 | 880 | 970 | 1070 | 1180 |

### Tempo para matar, equipamento do mesmo tier

| Tier | normal | elite | chefe | vida perdida |
|---|---|---|---|---|
| T1 | 20s | 78s | 250s | 15% |
| T2 | 16s | 60s | 200s | 15% |
| T3 | 16s | 60s | 190s | 16% |
| T4 | 16s | 62s | 204s | 15% |
| T5 | 18s | 70s | 230s | 15% |
| T6 | 20s | 80s | 264s | 15% |

Curva plana de propósito: **subir de tier não deixa o jogo mais rápido, deixa o jogo maior.**

### Desnível de tier

| | −1 tier | mesmo | +1 tier | +2 tiers |
|---|---|---|---|---|
| jogador T4 | 10s | 16s | 32s | morre |

### Combate em grupo, regras de combate ligada, 3 pontos de fuga

| Cenário | tempo | poções | retirada | morte |
|---|---|---|---|---|
| grupo de 2 | 24–32s | 0 | 0% | 0% |
| grupo de 3 | 38–52s | 1 | 0% | 0% |
| grupo de 4 | 54–78s | 3 | 0% | 0% |
| grupo de 3 + elite | 25–48s | 1–2 | 82–96% | 4–18% |

**Grupo de 2 a 4 é rotina; grupo com elite é emergência.**

### Emergência T4 — grupo de 3 com elite

| Build | morte sem largar | morte largando a carga | largou | durabilidade |
|---|---|---|---|---|
| Físico pesado, a pé (0p) | 67% | 33% | 82% | 6 |
| Físico pesado + cavalo (1p) | 54% | 24% | 70% | 5 |
| Mágico leve + cavalo (3p) | 28% | 13% | 52% | 3 |
| Projétil média completo (5p) | 11% | 8% | 31% | 1 |
| Projétil otimizado T6 (7p) | 7% | 6% | 27% | 1 |

**Amplitude de 67% a 7%, e nenhuma ponta é absoluta.** Largar Carga socorre exatamente quem não investiu em saída, e cobra em material — o que o pesado tinha de sobra porque carrega mais.

### Retirada — chance, tentativas e durabilidade

| pontos | fauna | humano | elite | chefe |
|---|---|---|---|---|
| 0 | 26% · 3,8t · 9 dur | 18% · 5,6t · 14 dur | 10% · 10t · 27 dur | 5% · 20t · 57 dur |
| 3 | 56% · 1,8t · 2 dur | 48% · 2,1t · 3 dur | 40% · 2,5t · 4 dur | 28% · 3,6t · 8 dur |
| 5 | 76% · 1,3t · 1 dur | 68% · 1,5t · 1 dur | 60% · 1,7t · 2 dur | 48% · 2,1t · 3 dur |

### Comparação de builds contra mob normal T4

| Build | IP | HP | mitigação | tempo |
|---|---|---|---|---|
| T4 limpo | 550 | 1400 | 33% | 16s |
| T4 arma +2 | 610 | 1519 | 33% | 14s |
| T4 tudo +4 | 930 | 2160 | 41% | 8s |
| T5 limpo | 800 | 1900 | 36% | 10s |
| T5 arma, T3 no resto | 508 | 1315 | 27% | 18s |

**Arma de tier alto com armadura ruim performa pior que um conjunto T4 inteiro.** Isso mata a build de "arma cara e resto barato".

### Maestria de combate

| Cenário | nível 0 | nível 10 | nível 20 | nível 30 |
|---|---|---|---|---|
| T3 contra mob T4 | 30s | 18s | 12s | 10s |
| T4 contra mob T5 | 26s | 20s | 12s | 10s |
| T5 contra mob T6 | 26s | 20s | 14s | 10s |

**Trinta níveis de maestria valem quase um tier inteiro.**

### Progressão

| Faixa | Fama/hora | Horas | Acumulado |
|---|---|---|---|
| T1→T2 | 4.584 | 0,8 h | 0,8 h |
| T2→T3 | 11.912 | 1,8 h | 2,6 h |
| T3→T4 | 30.885 | 4,3 h | 6,9 h |
| T4→T5 | 73.451 | 10,9 h | 17,8 h |
| T5→T6 | 199.725 | 24,0 h | 41,8 h |

### Cadeia de refino de um conjunto T4

| Material | unidades | por unidade | horas |
|---|---|---|---|
| bruto T1 | 168 | 8s | 0,4 h |
| bruto T2 | 168 | 12s | 0,6 h |
| bruto T3 | 168 | 21s | 1,0 h |
| bruto T4 | 168 | 36s | 1,7 h |

### Vestir contra subir

| Conjunto | brutos | coletar | subir o tier | razão |
|---|---|---|---|---|
| T2 | 336 | 1,3 h | 0,8 h | 1,6× |
| T3 | 504 | 2,5 h | 1,8 h | 1,3× |
| T4 | 672 | 4,6 h | 4,3 h | 1,1× |
| T5 | 840 | 8,5 h | 10,9 h | 0,8× |
| T6 | 1.008 | 15,4 h | 24,0 h | 0,6× |

**A razão inverte ao longo do jogo, e isso é desenho.** No começo, se vestir custa mais que subir — é o que ensina o loop. No fim, subir custa o dobro de vestir, e o gargalo vira a Fama. **É o que empurra o jogo de tier alto para o mercado.**

### Maestria de coleta e refino, conjunto T4

| Nível | brutos | retorno de refino | rendimento | horas |
|---|---|---|---|---|
| 0 | 571 | 15% | 0% | 3,9 h |
| 10 | 450 | 23% | +15% | 3,1 h |
| 20 | 357 | 31% | +30% | 2,5 h |
| 30 | 283 | 39% | +45% | 2,0 h |

**Corta o tempo de se vestir pela metade.** É o que dá valor econômico ao especialista.

### Estado de zona, conjunto T4

| Estado | horas | relativo |
|---|---|---|
| abundante | 2,6 h | 67% |
| normal | 3,9 h | 100% |
| escassa | 6,5 h | 166% |

### Durabilidade perdida por hora, por peça

| Tier | uso | morte | fuga falha | total | até chegar a 50% |
|---|---|---|---|---|---|
| T2 | 4 | 2 | 6 | 12 | 4,0 h |
| T3 | 4 | 3 | 6 | 14 | 3,7 h |
| T4 | 5 | 5 | 6 | 16 | 3,1 h |
| T5 | 4 | 3 | 6 | 13 | 3,7 h |
| T6 | 4 | 5 | 7 | 17 | 3,0 h |

**A perda por fuga fracassada é a maior das três vias.** Fugir mal custa mais que morrer.

### Prata por hora de farm

| Tier | ganha | conserto | % do ganho | saldo |
|---|---|---|---|---|
| T2 | 4.579 | 1.249 | 27% | 3.331 |
| T3 | 12.939 | 4.264 | 33% | 8.674 |
| T4 | 31.289 | 11.591 | 37% | 19.698 |
| T5 | 84.020 | 22.921 | 27% | 61.099 |
| T6 | 202.873 | 75.990 | 37% | 126.883 |

### Prata para vestir, além do material

| Conjunto | refino | craft e taxa | total | horas de farm |
|---|---|---|---|---|
| T2 | 1.344 | 1.200 | 2.798 | 0,6 h |
| T3 | 6.048 | 4.500 | 11.603 | 0,9 h |
| T4 | 22.176 | 16.200 | 42.214 | 1,3 h |
| T5 | 75.936 | 57.000 | 146.230 | 1,7 h |
| T6 | 257.376 | 198.000 | 500.914 | 2,5 h |

### Tempo total para dominar a Era 1

Cerca de **42 horas de Fama mais 15 de coleta**, com sobreposição entre as duas. Estimativa realista: **50 a 60 horas de jogo ativo**. A oito horas por semana, cerca de dois meses. É o arco do MVP.

---

## Parte VIII — PvP e risco

### Sinalização e bandas

PvP é **consentido e mútuo**, no modelo do Albion: sinalizado pode atacar e ser atacado; não sinalizado não faz nem uma coisa nem outra.

| Banda | Regra |
|---|---|
| Segura | ninguém ataca ninguém, mesmo sinalizado |
| Disputada | sinalizado contra sinalizado, perda parcial |
| Mortal | sinalizado contra sinalizado, perda total |
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

## Parte IX — NPCs e mundo vivo

### A escada de simulação

| Degrau | Custa | Entrega num idle |
|---|---|---|
| 0 · Estação | nada | o jogo funciona |
| 1 · Estado e estoque | uma tabela e um timer | motivo para voltar depois |
| 2 · Rotina | o relógio dia e noite | conteúdo com janela |
| 3 · Necessidade | utility AI por NPC | quase invisível |
| 4 · Conhecimento e fofoca | memória e expiração | só se a informação valer |

**A MVP precisa do degrau 0.** Um NPC: o **Língua** — cargo histórico real, o intérprete que transitava entre os povos sem pertencer a nenhum. Espelho do jogador.

**O degrau 1 entra no MVP.** É o melhor negócio do projeto.

**Guardado:** rotina, necessidades, `knowledgeBase`, fofoca, relógio dia e noite, ciclo da maré.

**Cortado:** companheiros e mercenários.

**Entra:** migração de mob, dentro da faixa de tier da zona ou com sinal visível.

**Princípio registrado:** simulação que não muda nunca vira cenário. NPCs lutando há um ano não dão impressão de guerra, dão impressão de loop.

**Fofoca só valeria se a informação fosse perecível** — e o boletim público já resolve o caso de uso. A cadeia de fofoca, se um dia existir, tem que terminar num **nó temporário**, não numa receita: receita criaria um segundo canal de desbloqueio e faria a Árvore do Destino deixar de ser fonte única.

---

## Parte X — Temporadas

**Ficam para depois do lançamento.** É o que vai distanciar o jogo do Albion e por isso mesmo não pode ser feito antes de haver jogo.

- **Expansão traz era; temporada traz evento.** Uma não implica a outra.
- **Regra do resíduo:** todo evento deixa mudança permanente numa zona. O evento queima; a zona alterada fica.
- **Ecos** — o passado vira instância repetível. Constrói-se uma vez, serve duas.
- **Sem reset.**
- **Nunca anunciar data.**
- Temporada mínima viável: um evento com resíduo, um ranking sazonal, um título, um ajuste de balanceamento.

---

## Parte XI — Tutorial e MVP

### A ilha descartável

**Decisão revista em 13/09/2026.** O tutorial acontece numa **ilha descartável de quatro zonas**, no modelo do Albion, e não mais dentro do mundo.

A objeção original era de lore: não fazia sentido tirar um indígena do Brasil para devolvê-lo ao Brasil. **Ela caiu** porque o jogador não tem origem, e porque o lugar do tutorial não precisa ser o Brasil histórico. É o **meio do caminho** — um trecho que a Raiz montou puxando pessoas e eras. Ninguém é de lá, e você não volta porque estava indo.

**O que isso conserta:**

- **Desacopla a MVP dos dados do mundo.** A MVP tem conteúdo próprio e pode ser fechada sem a Era 1 estar resolvida.
- **Libera a Costa do Pau-Brasil** para começar em T2 e virar faixa de farm de verdade.

**A objeção de produção sobrevive, reduzida:** você constrói quatro zonas e descarta. Ela encolhe se a ilha usar o mesmo kit de asset da Costa — praia, mata, pedra, barril. **Nada de bioma exclusivo da ilha.** O descartável passa a ser só o layout e os três NPCs.

### As quatro zonas

| Zona | Papel | Equivalente no Albion |
|---|---|---|
| A Beira | onde nasce, o Língua, o mini-chefe | The Lighthouse |
| Porto de Passagem | vila, mercado, estações | The Cove |
| Mata Revirada | madeira e couro | Forgotten Woods |
| Pedreira Torta | fibra e minério | Mountain Fort |

Todas em banda segura. A saída de A Beira só abre depois do mini-chefe.

### T1 voltou a ser craftável

**Decisão revista.** A regra de "T1 é sucata emprestada, não craftável" vinha da lore da Escória, em que a primeira forja era o momento em que um deus reparava no jogador. **Não há mais deus dentro de arma** — o motivo morreu na fusão.

Com T1 craftável, a aula de forja vem cedo, como no Albion, e a escolha de tradição continua no T2.

**E pedra, madeira e couro T1 se coletam sem ferramenta.** Sem essa exceção, você precisa de ferramenta para fazer ferramenta.

### O arco do tutorial

Nascer sem nada → falar com o Língua → coletar pedra e madeira sem ferramenta → forjar a Lâmina Crua e escolher o Q → receber o Broquel → matar mobs e o mini-chefe, que solta a bolsa → entrar no Porto de Passagem → falar com a Barqueira → comprar a mula no mercado → craftar as quatro ferramentas → coletar T2 nas duas zonas abertas → refinar → a Árvore do Destino → escolher a tradição e forjar a arma T2 → conjunto T2 completo → chamar a travessia e sair.

### Escopo da MVP

| Item | Quantidade |
|---|---|
| Zonas | 4, T1–T2, banda segura |
| Materiais | 11 |
| Armas e off-hands | 7 |
| Peças de armadura | 12 |
| Ferramentas e transporte | 6 |
| Skills | 37 |
| Mobs | 5, com um mini-chefe |
| NPCs | 3 |
| Modelos 3D | cerca de 30 |

**Fora da MVP:** PvP, perda de item, durabilidade relevante, T3 em diante, artefatos, reputação, teleporte, encantamento, qualidade, estado de zona, migração de mob, e o mundo da Era 1.

Inventário completo dos arquivos de dados em `dados-da-mvp.md`.

### Faseamento

| Escopo | Conteúdo |
|---|---|
| MVP | ilha de 4 zonas, T1–T2 |
| MVP | 1 era completa, 22 zonas, T1–T6 |
| Continente 1 | 4 eras, 60 a 100 zonas |
| Completo | mais o Emaranhado, T6–T8 |

---

## Parte XII — Direção de arte e plataforma

| Decisão | Escolha | Motivo |
|---|---|---|
| Estilo | **3D low poly estilizado** | equipamento modular custa uma peça, não uma peça por direção por pose |
| Engine | **Godot** | cliente fino com backend Go autoritativo; cena pequena; já está no pipeline |
| Plataforma | **desktop primeiro**, mobile depois | web só se o orçamento de polígono permitir |
| Câmera | isométrica fixa, 3/4 | mesma leitura, sem custo de arte por direção |
| Ferramenta | **Blender**, exportando glTF | gratuito, importação nativa no Godot |

**O argumento decisivo foi o equipamento modular.** A Era 1 tem nove peças de armadura × três linhas × seis tiers, mais nove armas, e a premissa é que tudo apareça. Em 2D o custo é peça × direções × poses; em 3D é uma peça, plugada num socket, válida em toda direção, animação e era. A diferença é de ordem de grandeza e cresce a cada era.

**O custo honesto do 3D não é modelar, é rigging.** Mitigação: um esqueleto humano único, compartilhado por jogador e pelos oito mobs humanos. Paga-se uma vez.

**A UI é construída como blocos independentes**, não como tela única. No desktop aparecem lado a lado; no telefone viram abas. É decisão de estrutura, não de arte, e tomá-la agora evita redesenhar tudo quando mobile entrar.

**Orçamento apertado de propósito:** até 3.000 tris num personagem completo, textura por atlas de paleta, sem PBR. Não custa nada em desktop, mantém mobile viável e deixa web como possibilidade em vez de esperança.

**Antes de modelar cem assets:** um personagem, uma arma e uma arena exportados para os três alvos. Um dia de trabalho, e você descobre se web é real.

**Contagem de equipamento da Era 1:** 26 modelos. Era nova custa 18 — seis armas, três off-hands, nove armaduras. Sem esqueleto novo, sem animação nova.

Detalhamento completo em `direcao-de-arte.md`.

## Parte XIII — Bota-fora

Combate D20. Grid isométrico, posicionamento e cobertura. Modo RPG de mesa. As 18 mini-campanhas. Variáveis procedurais por Save. O termo "Desperto" e o conceito de Escolhido. Companheiros e mercenários. Rebirth. Receita destravada por NPC.

---

## Parte XIV — O que falta

### Bloqueia o código que está na sua frente

Nada. Criação de personagem, autenticação e servidor não dependem de nenhum item desta lista.

### Falta para o combate funcionar

- **Números de W e das passivas.** Só Q e E entram no ciclo simulado. Cada W e cada passiva precisa do seu valor, e é aí que o balanceamento fica realmente trabalhoso.
- **Fórmula de recarga.** O ciclo `Q Q Q Q E` é fixo no simulador. O jogo real precisa de recargas por skill e de uma regra de prioridade quando duas estão prontas.
- **Custo de recurso das habilidades.** Existe a passiva Poupança que reduz custo, mas não existe o custo.

### Falta para o mundo existir

- **Grupos de mob por zona.** Ficou decidido que a zona oferece grupos nomeados, mas `era-1_zones.json` ainda tem `mobIds` como lista solta. Precisa virar grupos com tipo, faixa de tamanho e chance de elite.
- **Correção em `zone-a-raiz`.** Está com `hub: false` e um chefe. Se a Raiz é cidade, precisa de `hub: true`, serviços e risco seguro — talvez separada em duas zonas, a cidade e a passagem.
- **Nós de recurso por zona.** Existe o material primário e secundário, mas não quantos nós, nem o tempo de respawn.

### Risco estrutural da economia

**O loop do Albion depende de população de um jeito que quase nenhum outro jogo depende.** A demanda por equipamento existe porque outros jogadores destroem equipamento no PvP. Sem gente, ninguém compra, o crafter não tem cliente, o mercado não tem preço e o refinador não tem função.

Com trinta pessoas online, a parte mais interessante do desenho — as profissões emergentes, o purificador, o mercado — é a primeira a morrer.

**Corrigível sem trocar de gênero:** sumidouros de PvE que funcionem com zero PvP, durabilidade mais agressiva, perda em morte contra mob. Melvor e Orna são economias fechadas e funcionam com qualquer população.

**A decisão a tomar:** projete a economia para funcionar sozinha e trate o mercado entre jogadores como bônus, não como pilar. É uma tarde de trabalho e separa um jogo que funciona de um que precisa de lançamento bem-sucedido para existir.

### Falta para a economia fechar

- **Preço de mercado.** Não existe modelo de oferta e demanda entre jogadores. Hoje só existe o custo de produção.
- **Taxa de retorno por local.** O bônus de produção da cidade está no JSON como número, mas o simulador não o usa.
- **Prata na MVP.** A MVP não tem conserto relevante nem mercado, então o sistema inteiro fica sem uso até o T3.
- **Sumidouros além do conserto.** Hoje a prata sai do jogo pelo conserto, refino e craft. Falta verificar se isso basta contra a entrada, ao longo de meses.

### Falta decidir, sem pressa

- Resolução de gato e rato da Decisão 4 do PvP.
- Se **Faro** e **Sem Rastro** estão fortes demais. Testar juntos quando a disputada entrar.
- Se o peso da armadura conta no teto do teleporte.
- Passagens laterais entre eras vizinhas, ou só pela Raiz.
- Quantos pontos de passagem para o Emaranhado.
- Se o passo 11 do tutorial pode ser resolvido com violência.
- Onde a montaria entra no tutorial: passo 8 ou 13.
- Bioma: se entra como sistema ou fica só como rótulo.
- Conflito entre GDD e documento de Atos: as regiões da Era 1 são Nordeste e Amazônia, ou incluem Pantanal?
- Terceira ativa por peça de armadura no T6.

### Falta desenhar, mas não agora

- As armas das eras 2, 3 e 4. Existem como esboço: Ouro e Diamantes (1695–1789), Independência (1808–1822), Abolição e República (1888–1889).
- Artefatos: armas e armaduras de facção, conteúdo de T4.
- A capa. Slot mais tardio do Albion, ligado a facção.
- Rodadas não visitadas do pente fino: nenhuma. As sete foram concluídas.

---

## Parte XV — Arquivos

| Arquivo | Conteúdo |
|---|---|
| `era-1_zones.json` | 22 zonas, 44 conexões, 5 regiões |
| `era-1_mobs.json` | 43 mobs, 33 grupos |
| `era-1_factions.json` | 3 facções, 2 grupos independentes, 5 níveis de reputação |
| `era-1_npcs.json` | 17 NPCs, 13 na MVP |
| `direcao-de-arte.md` | manual de arte 3D low poly e briefs das 12 pranchas |
| `dados-da-mvp.md` | inventário dos dados estáticos da MVP |
| `materials.json` | 31 materiais, 7 tipos de recurso |
| `combat.json` | 3 árvores, 9 armas, 54 habilidades |
| `armor.json` | 3 linhas, 9 peças, 18 ativas, 3 bônus de conjunto |
| `transport.json` | 15 passivas, 3 montarias, 3 bolsas, 10 habilidades de transporte |
| `balance.json` | todas as constantes do jogo |
| `sim.py` | simulador, 14 relatórios e alertas |
| `eras-do-brasil-adaptacao.md` | registro das decisões por área |
| `equipamento.era-1.md` | design do equipamento |

| `formulas-e-balanceamento.md` | fórmulas e resultados |
| `pente-fino.md` | histórico das rodadas |

**Regra:** o servidor Go deve carregar `balance.json` diretamente. Se o simulador e o servidor lerem arquivos diferentes, o simulador deixa de valer no dia seguinte.
