package core

import "math/rand/v2"

// Degree é o grau de sucesso (motor-de-regras.md).
type Degree int

const (
	CritFail    Degree = iota // 0: falha crítica
	Fail                      // 1: falha
	Success                   // 2: sucesso
	CritSuccess               // 3: sucesso crítico
)

func roll(seed uint64, counter uint64, sides int) int {
	// Cria um gerador de números pseudo-aleatórios com a semente fornecida
	pcg := rand.NewPCG(seed, counter)
	rng := rand.New(pcg)

	return rng.IntN(sides) + 1
}

func degree(natural int, modifiers int, dc int) Degree {
	// Calcula o total do teste
	total := natural + modifiers

	// Verificar o total com o DC para saber qual a faixa
	// Total - DC >= 10 = 3 CritSuccess
	// Total - DC <= -10 = 0  CritFail
	margem := total - dc
	var degreeValue Degree

	switch {
	case margem >= 10:
		degreeValue = CritSuccess
	case margem <= -10:
		degreeValue = CritFail
	case margem >= 0:
		degreeValue = Success
	default:
		degreeValue = Fail
	}

	// Validando o dado natural
	switch {
	case natural == 20 && degreeValue < CritSuccess:
		degreeValue++
	case natural == 1 && degreeValue > CritFail:
		degreeValue--
	}

	return degreeValue
}
