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
		// Testar sucesso com natural diferente de 20 e de 1 = total > CD
		{"dado cd 15 e total 18, quando o roll é 15, então degrau precisa ser sucesso", 15, 18, 15, Success},
		// Testar sucesso com natural 20 = degrau Fail + 1
		{"dado cd 26 e total 24, quando o roll é 20, então o degrau precisa ser fail + 1 = success", 26, 24, 20, Success},
		// Testa sucesso com natural 1 = degrau CritSuccess - 1
		{"dado cd 5 e total 16, quando o roll é 1, então o degrau precisa ser CritSuccess 1 - = success", 5, 16, 1, Success},

		// Testar fail com natural diferente de 20 e de 1  = total < CD
		{"dado cd 18 e total de 16, quando o roll é 15, então o degrau precisa ser fail", 18, 16, 15, Fail},
		// Testar fail com natural 20 = degrau FailCrit + 1
		{"dado cd 34 com total 21, quando o roll é 20, então o degrau precisa ser FailCrit + 1 = Fail", 34, 21, 20, Fail},
		// Testar fail com natural 1 = degrau Success - 1
		{"dado cd 2 com total 4, quando o roll é 1, então o degrau precisa ser Success - 1 = Fail", 2, 4, 1, Fail},

		// Testar CritSuccess com margem +10 e natural diferente de 1 e 20
		{"dado cd 2 com total 13, quando o roll é 10, então degrau precisa ser CritSuccess", 2, 13, 10, CritSuccess},
		// Testar CritSuccess com margem ente -10 e +10  e natural 20
		{"dado cd 15 com total 22, quando o roll é 20, então degrau precisa ser Success + 1 = CritSuccess", 2, 22, 10, CritSuccess},

		// Testar CritFail com margem -10 e natural diferente de 1 e 20
		{"dado cd 30 e total 15, quando o roll é 12, então degrau precisa ser CritFail", 30, 15, 12, CritFail},
		//Testar CritFail com margem entre -10 e +10 e natural 1
		{"dado cd 5 e total 3, quando o roll é 1, então degrau precisa ser Fail - 1 = CritFail", 5, 3, 1, CritFail},

		// Testar se vai passar do teto do CritSuccess com +10 e 20
		{"dado cd 5 e total 25, quando o roll é 20, então degrau precisa ser CritSuccess", 5, 25, 20, CritSuccess},
		// Testar se vai passar do piso do CritFail com -10 e 1
		{"dado cd 15 e total 4, quando o roll é 1, então degrau precisa ser CritFail", 15, 4, 1, CritFail},
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
