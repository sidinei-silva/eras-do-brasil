package core

import "testing"

func TestDegree(t *testing.T) {
	cases := []struct {
		name  string
		dc    int    // Given  a CD no ataque, a Defesa do alvo
		total int    // Given d20 + bonus
		roll  int    // Given o numero do d20
		want  Degree // THen
	}{
		// {"na CD é sucesso", ?, ?, ?, ?},
		// {"20 natural sobe falha para sucesso", ?, ?, ?, ?},
		{"dado cd de 15 e total de 18 quando o roll é 15, então degrau precisa ser sucesso", 15, 18, 15, Success},
	}

	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			got := degree(c.roll, c.total, c.dc)
			if got != c.want {
				t.Errorf("got %v, want %v", got, c.want)
			}
		})
	}
}
