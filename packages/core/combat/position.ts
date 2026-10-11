// distancia.ts só responde perguntas sobre posição, sem alterar nada:
// Qual a distância entre o jogador e esse mob? (A diferença de passos.)
// Esse mob está dentro do meu alcance?
// Qual inimigo é o mais próximo? E o mais distante? (É o que a preferência de alvo da automação vai usar.)

// Funções pequenas com testes: distância, mover um passo, está ao alcance?, aplicar dano.
// movimento.ts muda a posição:

// Avançar ou recuar um passo.
// Empurrar ou puxar alguém.
// Respeitar os limites da fila: ninguém sai da arena nem passa do canto.
// Decidir quanto um combatente anda no turno: o corpo a corpo avança até entrar no alcance; o ranged fica parado.
