# Decisões de design

Este documento registra **decisões de design vigentes** do Eras do Brasil e o motivo que sustenta cada uma.

Ele não espelha dados. Zona, material, arma, mob, skill e números vivem nos arquivos apropriados de `data/`, `design/` e `docs/formulas-e-balanceamento.md`.

O histórico de alternativas, decisões substituídas, experimentos e discussões anteriores fica em `docs/historico-e-estudos.md`.

**Decisão registrada é decisão.** Reabrir uma decisão exige deixar claro o que mudou e por quê.

---

## Regras de método

- Nos documentos, separar o que está escrito do que é proposta.
- **Lore é puxada, não empurrada:** escreve-se quando uma fatia precisa.
- **Arquitetura definitiva em escala reduzida.** Nada de desenho descartável porque é MVP.
- **Mecânica não se poetiza.** Item e habilidade podem ter nome próprio; sistema não.
- Nome de sistema global não deve vir de uma era nem de uma facção.
- Toda constante deve morar em arquivo de dados, nunca em código.
- Decisão registrada é decisão até que seja explicitamente revisada.

---

## Mundo — regras estruturais

### O Coração da Raiz

**Decisão.** O Coração da Raiz é passagem, não destino. É uma cidade segura no centro, cercada de zona mortal, e por ela se chega ao segundo continente.

**Consequência.** O centro funciona como ponto de passagem sem transformar o Coração da Raiz no destino final do jogador.

### Zona como unidade

**Decisão.** Nenhuma regra lê `regionId`. Região é rótulo de bioma e nada mais; a zona é a unidade de recurso, risco, facção, mob e viagem.

**Consequência.** As regras de gameplay não dependem da região como entidade mecânica.

### Modelagem independente

**Decisão.** Continente, era, região, tier e risco são cinco campos independentes.

**Consequência.** Nenhum desses conceitos é derivado automaticamente de outro.

### Caminhos

**Decisão.** Toda zona precisa de pelo menos dois caminhos.

**Motivo.** Uma zona com um único caminho vira corredor.

### Facção

**Decisão.** Facção é definida por zona, não por região.

**Consequência.** Nenhuma facção pode ter duas zonas seguidas no mesmo tier.

### Geografia

**Decisão.** A geografia do jogo não reproduz o mapa cartográfico do Brasil.

**Motivo.** As eras não estão nas posições históricas reais; a organização do mundo é consequência das distorções da Ruptura.

### Mistura de eras

**Decisão.** O jogo precisa de mais de uma era para realizar sua fantasia central de mistura de equipamentos de períodos diferentes.

---

## Tutorial — A Travessia

### Ilha não visitável

**Decisão.** A Travessia é uma ilha de tutorial que não será revisitada.

**Motivo.** O jogador não possui uma origem fixa e o tutorial não precisa representar um lugar do Brasil histórico que ele conhecia anteriormente. A Travessia funciona como espaço de passagem.

**Consequência.** O MVP fica desacoplado dos dados do mundo principal e a Costa do Pau-Brasil pode começar em T2.

**Restrição de produção.** As quatro zonas do tutorial devem reutilizar o mesmo kit de assets da Costa sempre que possível. Não deve existir um bioma exclusivo da ilha apenas para o tutorial.

### T1 é craftável

**Decisão.** Equipamentos T1 são craftáveis.

**Motivo.** O tutorial precisa apresentar a forja cedo, e a progressão inicial não depende de uma regra de T1 como equipamento emprestado.

**Consequência.** Pedra, madeira e couro T1 podem ser coletados sem ferramenta para permitir a fabricação das primeiras ferramentas/equipamentos.

---

## PvP e risco

### Sinalização

**Decisão.** PvP é consentido e mútuo.

**Decisão.** A flag liga e desliga somente na cidade.

**Motivo.** Desligar exige retornar à cidade, tornando a decisão de sinalizar um compromisso e não uma invisibilidade sob demanda.

### Incentivo à sinalização

**Decisão.** Artefato bruto só cai para jogadores sinalizados.

**Motivo.** Em um jogo idle, sinalizar precisa ter uma contrapartida concreta. Sem uma recompensa exclusiva, o risco não teria incentivo suficiente.

**Consequência.** O conteúdo de artefato bruto cria uma razão econômica para aceitar o risco do PvP.

### Contador de sinalizados

**Decisão.** Cada zona mostra publicamente quantos jogadores sinalizados estão nela.

**Motivo.** A flag é voluntária e mútua; quem aparece no contador escolheu aparecer.

### Encontro dentro da zona

**Decisão.** A busca de PvP acontece dentro da própria zona.

**Decisão.** Não existe pareamento que mova o jogador para outra zona.

**Motivo.** A zona é a unidade de tudo no jogo. Mover jogadores para outra zona para criar encontros faria a geografia perder parte de sua função.

### Proteção do não sinalizado

**Decisão.** Jogador não sinalizado não pode ser atacado por jogador sinalizado.

**Consequência.** Não é necessário um mecanismo adicional de parada do farm do jogador não sinalizado.

### Faro

**Decisão.** O contador informa quantos jogadores sinalizados existem na zona; o Faro informa quem eles são.

### Reputação

**Decisão.** Reputação fica adiada.

**Destino planejado.** A reputação deverá se relacionar à purificação de artefatos e às facções.

**Critério de corte.** Se até T4 não houver conteúdo que dependa dela, ela não entra na implementação anterior a esse ponto.

---

## Combate

### Dois relógios e prioridade

**Decisão.** O combate não usa turno nem tick fixo. Ataques básicos e habilidades funcionam por seus próprios tempos, e as habilidades prontas seguem uma ordem de prioridade.

**Motivo.** A diferença entre velocidades de ataque, recargas e custos precisa aparecer no resultado do combate.

**Consequência.** O servidor pode representar uma luta como uma linha do tempo de eventos.

### O slot é a restrição

**Decisão.** A seleção de habilidades acontece por slots de equipamento. Não existe uma lista geral de habilidades com uma seção separada de habilidades desabilitadas.

**Motivo.** A escolha deve acontecer na montagem do equipamento.

**Consequência.** Trocar uma peça pode trocar uma habilidade ativa e uma passiva, reforçando a regra de que o personagem é o que veste.

### Energia

**Decisão.** O recurso utilizado pelas habilidades se chama **energia** e é comum às três árvores.

**Motivo.** O recurso não pertence a uma tradição específica e precisa funcionar igualmente para as árvores física, de projétil e mágica.

### Valores de combate

**Estado atual.** Velocidade de ataque, recarga, custo e regeneração possuem dados para permitir calibração.

**Regra.** Esses valores não são considerados validados automaticamente apenas por existirem nos dados. O balanceamento deve ser tratado em `docs/formulas-e-balanceamento.md`.

---

## Escala multiplicativa

**Decisão.** Dano, vida, armadura, custo de energia, barra e regeneração utilizam a curva multiplicativa definida em `docs/formulas-e-balanceamento.md`.

**Motivo.** A curva deve permitir que uma peça de tier menor, mas bem trabalhada, continue competitiva contra uma peça de tier maior.

**Consequência.** O tier não domina sozinho o resultado e encantamento, qualidade e maestria continuam tendo espaço no resultado final.

**Decisão.** Não existe um atributo separado de poder de ataque; o Poder de Item e seus multiplicadores participam da determinação dos valores derivados.

**Decisão.** O custo de energia escala com o poder da arma; a recarga não segue a mesma escala.

**Decisão.** Barra de energia e regeneração acompanham a mesma curva do custo para preservar a relação entre tiers.

---

## Especialização e progressão

### Árvore do Destino

**Decisão.** O sistema global de progressão se chama **Árvore do Destino**.

**Motivo.** O nome representa um sistema global de progressão e não uma era ou facção.

### Afinidade

**Decisão.** O sistema que acompanha o uso da mesma arma se chama **Afinidade**.

**Estado atual.** A regra de reset da Afinidade é um ponto que pode ser revisado porque existe também a maestria específica por arma.

### Maestria

**Decisão.** Maestria contribui diretamente para o Poder de Item da arma utilizada.

**Consequência.** A progressão continua relevante depois que o jogador desbloqueia tiers superiores.

---

## Especialização ampla

**Decisão.** A especialização deve permitir que investir em uma arma não torne a troca para outra arma do mesmo arquétipo equivalente a começar do zero.

**Estado.** A forma exata dessa especialização e seus valores pertencem ao sistema de progressão/balanceamento e devem ser mantidos alinhados aos dados atuais.

---

## Sistemas adiados

Estas são decisões de **escopo futuro**, não sistemas ativos do MVP.

### NPCs e mundo vivo

**Decisão.** O MVP precisa somente do nível de simulação necessário para sustentar o funcionamento do mundo e dos NPCs presentes nele.

**Adiado.** Rotinas complexas, necessidades, `knowledgeBase`, fofoca, relógio de dia e noite e ciclo da maré.

**Cortado.** Companheiros e mercenários.

**Mantido como possibilidade.** Migração de mobs dentro da faixa de tier da zona ou com sinal visível.

### Temporadas

**Decisão.** Temporadas ficam para depois do lançamento.

Princípios definidos para quando forem implementadas:

- expansão traz era; temporada traz evento;
- eventos deixam mudanças permanentes em zonas;
- Ecos podem transformar conteúdo passado em instâncias repetíveis;
- não há reset;
- não se anuncia uma data antes de haver base para isso.

### Teto de Poder de Item

**Decisão.** Não implementar agora.

O conceito fica reservado para uma necessidade futura de controle de progressão e conteúdo.

---

## Decisões de nomenclatura

Os nomes atuais dos sistemas devem seguir a regra de não poetizar mecânicas nem usar nomes dependentes de uma era.

| Sistema/conceito              | Nome atual                    |
| ----------------------------- | ----------------------------- |
| Progressão global             | **Árvore do Destino**         |
| Uso recorrente da mesma arma  | **Afinidade**                 |
| Regras de execução do combate | **Regras de combate**         |
| Estruturas de produção        | **Estações**                  |
| Recurso das habilidades       | **Energia**                   |
| Bandas de risco do mundo principal | **Segura, Disputada, Mortal** |
| Conteúdo de memória do mundo  | **Ecos**                      |

> **Escopo da nomenclatura:** a banda **Selvagem** também existe no modelo do mundo completo, mas é exclusiva do Emaranhado e pertence a conteúdo posterior ao lançamento. Ela não faz parte das bandas do mundo principal nem do escopo atual do MVP.

---

## Conteúdo explicitamente fora do escopo

Os seguintes conceitos não fazem parte do design atual:

- combate D20;
- grid isométrico;
- posicionamento e cobertura como sistemas de combate;
- modo RPG de mesa;
- 18 mini-campanhas;
- variáveis procedurais por save;
- conceito de jogador escolhido;
- companheiros e mercenários;
- rebirth;
- receita desbloqueada por NPC.

Esses itens não devem ser reintroduzidos como regras atuais sem uma nova decisão de design.

---

## Relação com dados

Este documento define **regras e decisões de design**.

Ele não é a fonte dos valores concretos de conteúdo.

- `data/` contém o que o servidor já carrega.
- `design/` contém conteúdo projetado que ainda não foi promovido para o runtime.
- `docs/formulas-e-balanceamento.md` contém fórmulas e valores de balanceamento.
- `docs/dados-do-mvp.md` descreve o conjunto de conteúdo previsto para o MVP.
- `docs/o-jogo.md` apresenta a visão consolidada de como o jogo funciona.
- `docs/historico-e-estudos.md` registra a evolução e as alternativas descartadas.

Quando uma regra deste documento entrar em conflito com uma implementação já existente, o conflito deve ser explicitamente resolvido; não se deve assumir silenciosamente qual versão prevalece.

