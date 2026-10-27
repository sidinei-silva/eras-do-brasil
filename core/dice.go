package core

// Degree é o grau de sucesso (motor-de-regras.md).
type Degree int

const (
	CritFail    Degree = iota // 0: falha crítica
	Fail                      // 1: falha
	Success                   // 2: sucesso
	CritSuccess               // 3: sucesso crítico
)

func degree(roll int, total int, dc int) Degree {
	// Verificar o total com o DC para saber qual a faixa
	// Total - DC > 10 = 3 CritSuccess
	// Total - DC < -10 = 0  CritFail
	margem := total - dc
	degreeValue := Fail

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
