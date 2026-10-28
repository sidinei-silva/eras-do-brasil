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

func roll(seed uint64, counter uint64) int {
	// Cria um gerador de números pseudo-aleatórios com a semente fornecida
	pcg := rand.NewPCG(seed, counter)
	rng := rand.New(pcg)

	// Gera um número aleatório entre 1 e 20 (inclusive)
	return rng.IntN(20) + 1
}

func degree(roll int, total int, dc int) Degree {
	// Verificar o total com o DC para saber qual a faixa
	// Total - DC > 10 = 3 CritSuccess
	// Total - DC < -10 = 0  CritFail
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
	case roll == 20 && degreeValue < CritSuccess:
		degreeValue++
	case roll == 1 && degreeValue > CritFail:
		degreeValue--
	}

	return degreeValue
}
