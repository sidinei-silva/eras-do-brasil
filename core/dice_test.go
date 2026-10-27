package core

import "testing"

func TestDegree(t *testing.T) {
	cases := []struct {
		name  string
		dc    int // a CD; no ataque, a Defesa do alvo
		total int // d20 + bônus
		roll  int // o número que saiu no d20
		want  Degree
	}{
		// as 4 faixas, com dado comum
		{"acima da CD é sucesso", 15, 18, 10, Success},
		{"abaixo da CD é falha", 18, 16, 10, Fail},
		{"CD+10 ou mais é sucesso crítico", 2, 13, 10, CritSuccess},
		{"CD-10 ou menos é falha crítica", 30, 15, 12, CritFail},

		// fronteiras exatas
		{"exatamente na CD é sucesso", 15, 15, 10, Success},
		{"um abaixo da CD é falha", 15, 14, 10, Fail},
		{"exatamente CD+10 é sucesso crítico", 15, 25, 10, CritSuccess},
		{"exatamente CD-10 é falha crítica", 15, 5, 10, CritFail},

		// 20 natural sobe um grau, 1 natural desce um grau
		{"20 natural sobe falha para sucesso", 26, 24, 20, Success},
		{"1 natural desce sucesso para falha", 2, 4, 1, Fail},

		// teto e piso
		{"20 natural em sucesso crítico continua crítico", 5, 25, 20, CritSuccess},
		{"1 natural em falha crítica continua falha crítica", 15, 4, 1, CritFail},
	}

	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			got := degree(c.roll, c.total, c.dc)
			if got != c.want {
				t.Errorf("degree(roll %d, total %d, dc %d) = %v, want %v", c.roll, c.total, c.dc, got, c.want)
			}
		})
	}
}
