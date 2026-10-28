package core

import (
	"testing"
)

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

func TestRoll(t *testing.T) {
	t.Run("Mesma seed e mesmo counter precisa retornar o mesmo numero", func(t *testing.T) {
		seed := uint64(123456789)
		counter := uint64(2)

		result1 := roll(seed, counter) // Rola 1d20
		result2 := roll(seed, counter) // Rola 1d20

		if result1 != result2 {
			t.Errorf("Resultados diferentes para mesma seed e counter: %d vs %d", result1, result2)
		}
	})

	t.Run("Mesma seed e counter diferentes precisa retornar números diferentes", func(t *testing.T) {
		seed := uint64(123456789)
		counter1 := uint64(1)
		counter2 := uint64(2)

		result1 := roll(seed, counter1) // Rola 1d20
		result2 := roll(seed, counter2) // Rola 1d20

		if result1 == result2 {
			t.Errorf("Resultados iguais para mesma seed e counters diferentes: %d vs %d", result1, result2)
		}
	})

	t.Run("Diferentes seeds e mesmo counter precisa retornar números diferentes", func(t *testing.T) {
		seed1 := uint64(123456789)
		seed2 := uint64(987654321)
		counter := uint64(1)

		result1 := roll(seed1, counter) // Rola 1d20
		result2 := roll(seed2, counter) // Rola 1d20

		if result1 == result2 {
			t.Errorf("Resultados iguais para diferentes seeds e mesmo counter: %d vs %d", result1, result2)
		}
	})

	t.Run("1000 rolls se dado retorna entre 1 a 20", func(t *testing.T) {
		seed := uint64(123456789)

		for i := 0; i < 1000; i++ {
			result := roll(seed, uint64(i))
			if result < 1 || result > 20 {
				t.Errorf("Resultado fora do intervalo esperado (1-20): %d", result)
			}
		}
	})

}
