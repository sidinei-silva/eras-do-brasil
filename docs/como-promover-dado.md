# Como promover dado

`data/` e `design/` não são a mesma coisa, e confundir os dois foi o que
inflou os arquivos.

| Pasta     | O que é                                                           | Quem lê    |
| --------- | ----------------------------------------------------------------- | ---------- |
| `data/`   | o que o servidor **vai carregar**; a regra vale a partir de agora | `gamedata` |
| `design/` | o que já foi projetado e **ainda não é carregado**                | você       |

**Regra:** `data/` só deve conter conteúdo para o qual exista código
responsável por carregá-lo e representá-lo.

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

- `design/` contém conteúdo já projetado, mas ainda não carregado pelo servidor.
- `data/` contém o conteúdo que já pode ser carregado pelo servidor.
- `gamedata` carrega e representa os dados estáticos. Não conhece `game`.
- `bootstrap` conecta os dados carregados ao runtime.
- `game` usa as definições para construir e operar o estado do jogo.

---

## O processo

Para cada fatia do backlog, pergunte: **que dado precisa existir para esta fatia funcionar?**

Promova exatamente isso de `design/` para `data/`. Nada a mais.

**Exemplo — "personagem entra no mundo".** Precisa de uma zona com ponto de nascimento. Não precisa de quatro zonas, nem de mobs, nem de receitas, nem de habilidades.

Isso significa editar o mesmo arquivo várias vezes ao longo do desenvolvimento, e **isso é normal** — é o arquivo crescendo junto com o jogo. O que não é normal é ele nascer completo antes de existir código que o leia.

---

## Como promover

1. Abrir o arquivo em `design/`, recortar o que a fatia precisa.
2. Colar no arquivo correspondente em `data/`.
3. **Conferir referência:** todo id citado pelo que entrou precisa existir em `data/`. Habilidade referenciando arma, receita referenciando material, acampamento referenciando mob. A exceção é `balance/`, explicada abaixo.
4. Remover de `design/` o que foi promovido, para não haver duas versões.

O passo 3 é o que mais dá errado. Uma habilidade T2 pode listar armas de T3 no `weaponIds`; ao promovê-la, recorte a lista ao que existe em `data/`.

---

## O que está em `design/` hoje

```text
design/
  catalog/     armas, habilidades, materiais e equipamento de T3 a T6
  era-1/       as 22 zonas, 43 mobs, 17 NPCs e 3 facções da Era 1
```

## O que está em `data/`

```text
data/
  shared/   trees, armor, traditions, equipment, destiny, balance, continents, materials, skills, weapons
  mvp/      zones, mobs, npcs, factions, recipes, tutorial
```

`shared/` guarda **sistema** — árvores, linhas de armadura, slots, balanceamento — que não cresce por era, e o **catálogo recortado ao MVP**: T1 e T2.

---

## `balance/` fica inteiro em `data/`

`balance/` cobre T1 a T6 e não foi recortado: não existe `design/balance-completo.json`. As tabelas indexadas por id de habilidade, como as de fuga em `combat.json`, têm entradas para conteúdo que ainda não está carregado. Isso é esperado e inerte, e o carregador não deve validar ids dentro de `balance/`. Cortar perderia os valores, e seria preciso reconstruí-los a cada habilidade promovida.

---

## Quando a Era 1 chegar

Promover `design/era-1/` para `data/era1/` e o catálogo de T3 a T6 para `data/shared/`. A estrutura já está pronta para isso.

---

## O contrato

`docs/dados-do-mvp.md` diz o que o MVP terá **quando estiver completo**.
`data/` diz o que já entrou para o servidor carregar.

Os dois divergem durante o desenvolvimento, e **isso é esperado**. Quem mede o progresso é o backlog.
