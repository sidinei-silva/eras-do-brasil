# Worker Notes
> Este arquivo serve como um espaço para anotações e informações importantes relacionadas ao trabalho atual.
> Usado para listar o que vai fazer no momento, anotar pensamentos.
> É limpado a cada início de trabalho, para manter o foco no que é relevante no momento.

# Alguns pontos

- O arquivo [decisoes-de-design](./docs/decisoes-de-design.md) e o arquivo [o-jogo](./docs/o-jogo.md) falam as duas coisas ao mesmo tempo isso não corre risco de desalinhamento?
- Sem o matchmaking como o sinalizado vai conseguir atacar alguém? Sinalizado ou não sinalizado, quando falava de matchmaking, era para a busca dentro da zona por players para lutar. Não era teletransporte para outro lugar. 
- Qual proteção ao coletor isso "Uma condição de parada na regras de combate" tras? Na verdade acaba virando uma ferramenta para pessoas com pvp sair pelo mapa parando a ação de todo mundo.
- É falado que não existe matchmaking mas logo em seguida descreve a regra que tinha feito do matchmaking: "Valem as decisões da página de PvP da Escória: fila de prioridade por consentimento decrescente, offline intocável, postura em vez de loadout separado, full loot só na fase 2. A disputada é o laboratório."
- Pensando se vale manter todas a sessão "NPCs e mundo vivo" no documento [decisoes-de-design](./docs/decisoes-de-design.md)
- No estado de repo ja com o eras sendo um jogo "novo" vale a pena citar o game a escoria? Ou melhor tratar o eras como um jogo novo e deixar os outros arquivados sem que esse o conheça?


---

- Ainda não foi resolvido o problema que você tinha dado essa resposta: 

sobre a pergunta que você fez os perdidos são uma facção da ilha do mvp.

<resposta-claude>
Deixa eu pesquisar antes de opinar, porque a resposta muda o desenho.Pesquisei, e a resposta é muito mais simples do que você temia.

## Como o Albion distribui mob por zona

**Tipo de mob é amarrado ao tier da zona, e facção de mob ao bioma.** Um post de fórum de 2019 reclama exatamente dessa mudança — antes era mais variado, e passou a ser "tier da zona define o tipo, bioma define a facção". A wiki confirma o outro lado: inimigos humanoides existem em seis facções de mob, e cada facção tem seus chefes.

E há uma segunda camada separada: **wildlife**. São mobs de recurso, esfolados por couro, e **os de tier mais baixo aparecem em qualquer bioma**.

Então a fórmula real é:

> **zona = fauna (em qualquer lugar) + uma facção de mob (definida pelo bioma) + tier definido pela zona**

Não são vários packs heterogêneos. É fauna mais uma facção. **Isso é exatamente o que você queria ouvir**, e reduz bastante o trabalho.

E acampamento, nesse contexto, é só **ponto de alta densidade** daquela facção no mapa — não um pack de composição diferente.

## A colisão de nome que você notou

Ela é real e é do Albion mesmo. **Mob camp** é ponto de densidade de PvE. **Faction Camp** é objetivo de guerra de facção: acampamento de suprimento tomado por bandidos, em zona de conflito, que rende ponto para a facção do jogador. São sistemas diferentes com o mesmo nome.

E o Horizons transformou os mob camps em **Dynamic Encampments** — com quest, cache de loot instanciado, marcador no mapa e Lair Maps. Isso é Albion de 2026, e você está certo em pular: é conteúdo de um jogo com dez anos de acréscimo.

Minha sugestão sobre o nome: **mantenha `camps` para o pack de mob agora** e, quando a guerra de facção entrar, chame a outra coisa de posto ou de objetivo. Não herde a ambiguidade só porque o Albion tem.

## O que isso muda no dado

Seu instinto de aninhar está certo, e agora tem um motivo a mais: **acampamento é 1:N e você quer variar nível e presença de elite entre dois acampamentos da mesma facção**, que é o caso do Albion. Aninhado, cada acampamento carrega os próprios números sem depender da zona.

E falta um campo. Se facção de mob vem do bioma, a zona precisa dizer **qual facção de mob mora ali** — hoje isso só existe implícito, espalhado nos camps.

Quer que eu aplique as duas coisas? Seria aninhar os acampamentos dentro da zona, apagar a lista do topo, e acrescentar `mobFactionId` na zona, com os acampamentos de facção herdando dele e os de fauna ficando sem facção.

Antes de mexer, uma pergunta que muda o resultado: **na ilha do MVP, os Perdidos são uma facção de mob ou são fauna humanoide?** Se forem facção, a ilha tem uma facção só e fica igual ao Albion. Se forem fauna, a ilha não tem facção nenhuma — o que faria sentido, porque lá ninguém é de lado nenhum.
</resposta-claude>



--- 

# Rascunho de prompt para o claude

> Alguns prompts e pesquisa agora será feita em novos chats separado por categorias.



---
[WIP]
Estava pensando bastante sobre a "ilha pvp" primeiro sobre sua pergunta, Os Perdidos são uma facção e não fauna humanoide.

Vou alencar alguns pontos aqui: 
No compandio completo fala de 2 continentes mas agora teremos 3 com o tutorial sendo um continente.
Em Escopo por fase tem MVP ilha de 4 zonas e logo abaixo tem 1 era completa, precisa apagar esse de 