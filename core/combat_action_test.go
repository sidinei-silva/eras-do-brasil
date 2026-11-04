package core

import (
	"reflect"
	"testing"
)

func TestUseSkillAction(t *testing.T) {

	t.Run("Skill Error: dado ator não existe, nenhum evento, combat igual", func(t *testing.T) {
		fighters := []Fighter{
			{ID: "actor", HP: 10, Defense: 10, Skills: []Skill{{ID: "skill", HitModifier: 0, Damage: Damage{Count: 1, RollSides: 1, Modifier: 0}}}},
			{ID: "target", HP: 10, Defense: 10, Skills: []Skill{}},
		}

		combat := NewCombat(123456789, fighters)
		action := UseSkill{ActorID: "nonexistent_actor", TargetID: "target", SkillID: "skill"}

		newCombat, events := ResolveCombatAction(combat, action)

		if len(events) != 0 {
			t.Errorf("Esperado nenhum evento, mas recebeu %d", len(events))
		}

		if !reflect.DeepEqual(newCombat, combat) {
			t.Errorf("Esperado combat igual ao original, mas recebeu um diferente")
		}
	})

	t.Run("Skill Matou: HP do alvo ≤ dano, eventos HitRolled, DamageRolled e Died", func(t *testing.T) {
		fighters := []Fighter{
			{ID: "actor", HP: 10, Defense: 10, Skills: []Skill{{ID: "skill", HitModifier: 0, Damage: Damage{Count: 1, RollSides: 1, Modifier: 0}}}},
			{ID: "target", HP: 1, Defense: 10, Skills: []Skill{}},
		}
		combat := NewCombat(123456789, fighters)
		action := UseSkill{ActorID: "actor", TargetID: "target", SkillID: "skill"}

		newCombat, events := ResolveCombatAction(combat, action)

		if newCombat.Fighters[1].HP != 0 {
			t.Errorf("HP do alvo não caiu para zero. Esperado %d, mas recebeu %d", 0, newCombat.Fighters[1].HP)
		}

		if len(events) != 3 {
			t.Errorf("Esperado 3 eventos, mas recebeu %d", len(events))
		} else {
			if _, ok := events[0].(HitRolled); !ok {
				t.Errorf("Esperado evento do tipo HitRolled, mas recebeu %T", events[0])
			}
			if _, ok := events[1].(DamageRolled); !ok {
				t.Errorf("Esperado evento do tipo DamageRolled, mas recebeu %T", events[1])
			}
			if _, ok := events[2].(Died); !ok {
				t.Errorf("Esperado evento do tipo Died, mas recebeu %T", events[2])
			}
		}
	})

	t.Run("Skill Crítico: defesa muito baixa + seed cujo d20 não é 1, HP cai o dobro e Critical é true", func(t *testing.T) {
		fighters := []Fighter{
			{ID: "actor", HP: 10, Defense: 1, Skills: []Skill{{ID: "skill", HitModifier: 0, Damage: Damage{Count: 1, RollSides: 1, Modifier: 0}}}},
			{ID: "target", HP: 10, Defense: 1, Skills: []Skill{}},
		}
		combat := NewCombat(123456789, fighters)
		action := UseSkill{ActorID: "actor", TargetID: "target", SkillID: "skill"}

		newCombat, events := ResolveCombatAction(combat, action)

		if newCombat.Fighters[1].HP != combat.Fighters[1].HP-2 {
			t.Errorf("HP do alvo não caiu corretamente. Esperado %d, mas recebeu %d", combat.Fighters[1].HP-2, newCombat.Fighters[1].HP)
		}

		if len(events) != 2 {
			t.Errorf("Esperado 2 eventos, mas recebeu %d", len(events))
		} else {
			if _, ok := events[0].(HitRolled); !ok {
				t.Errorf("Esperado evento do tipo HitRolled, mas recebeu %T", events[0])
			}
			if damageEvent, ok := events[1].(DamageRolled); !ok {
				t.Errorf("Esperado evento do tipo DamageRolled, mas recebeu %T", events[1])
			} else {
				if !damageEvent.Critical {
					t.Errorf("Esperado Critical true, mas recebeu false")
				}
			}
		}
	})

	t.Run("Skill Acertou: Seed fixa que acerta, dano 1d1+0, HP do alvo cai", func(t *testing.T) {
		fighters := []Fighter{
			{ID: "actor", HP: 10, Defense: 10, Skills: []Skill{{ID: "skill", HitModifier: 0, Damage: Damage{Count: 1, RollSides: 1, Modifier: 0}}}},
			{ID: "target", HP: 10, Defense: 10, Skills: []Skill{}},
		}
		combat := NewCombat(123456789, fighters)
		action := UseSkill{ActorID: "actor", TargetID: "target", SkillID: "skill"}

		newCombat, events := ResolveCombatAction(combat, action)

		if newCombat.Fighters[1].HP != combat.Fighters[1].HP-1 {
			t.Errorf("HP do alvo não caiu corretamente. Esperado %d, mas recebeu %d", combat.Fighters[1].HP-1, newCombat.Fighters[1].HP)
		}

		if len(events) != 2 {
			t.Errorf("Esperado 2 eventos, mas recebeu %d", len(events))
		} else {
			if _, ok := events[0].(HitRolled); !ok {
				t.Errorf("Esperado evento do tipo HitRolled, mas recebeu %T", events[0])
			}
			if _, ok := events[1].(DamageRolled); !ok {
				t.Errorf("Esperado evento do tipo DamageRolled, mas recebeu %T", events[1])
			}
		}
	})

	t.Run("Skill Error: Defesa que nem o 20 natural alcança, precisa retornar HitRolled e HP igual", func(t *testing.T) {
		fighters := []Fighter{
			{ID: "actor", HP: 10, Defense: 10, Skills: []Skill{{ID: "skill", HitModifier: 0, Damage: Damage{Count: 1, RollSides: 1, Modifier: 0}}}},
			{ID: "target", HP: 10, Defense: 30, Skills: []Skill{}},
		}
		combat := NewCombat(123456789, fighters)
		action := UseSkill{ActorID: "actor", TargetID: "target", SkillID: "skill"}

		newCombat, events := ResolveCombatAction(combat, action)

		if newCombat.Fighters[1].HP != combat.Fighters[1].HP {
			t.Errorf("HP do alvo mudou de %d para %d após falha no ataque", combat.Fighters[1].HP, newCombat.Fighters[1].HP)
		}

		if len(events) != 1 {
			t.Errorf("Esperado 1 evento, mas recebeu %d", len(events))
		} else {
			if _, ok := events[0].(HitRolled); !ok {
				t.Errorf("Esperado evento do tipo HitRolled, mas recebeu %T", events[0])
			}
		}
	})

}

func TestUseSkillProperties(t *testing.T) {

	t.Run("Counter: confere Counter depois do resolve: +1 se errou, +3 se acertou com 2 dados", func(t *testing.T) {
		fighters := []Fighter{
			{ID: "actor", HP: 10, Defense: 10, Skills: []Skill{{ID: "skill", HitModifier: 0, Damage: Damage{Count: 2, RollSides: 1, Modifier: 0}}}},
			{ID: "target", HP: 10, Defense: 30, Skills: []Skill{}},
		}
		combat := NewCombat(123456789, fighters)
		action := UseSkill{ActorID: "actor", TargetID: "target", SkillID: "skill"}

		newCombat, _ := ResolveCombatAction(combat, action)

		expectedCounter := combat.Counter + 1 // Errou, então +1
		if newCombat.Counter != expectedCounter {
			t.Errorf("Esperado Counter %d, mas recebeu %d", expectedCounter, newCombat.Counter)
		}

		// Agora testa com um ataque que acerta
		fightersHit := []Fighter{
			{ID: "actor", HP: 10, Defense: 10, Skills: []Skill{{ID: "skill", HitModifier: 0, Damage: Damage{Count: 2, RollSides: 1, Modifier: 0}}}},
			{ID: "target", HP: 10, Defense: 10, Skills: []Skill{}},
		}
		combatHit := NewCombat(123456789, fightersHit)
		actionHit := UseSkill{ActorID: "actor", TargetID: "target", SkillID: "skill"}

		newCombatHit, _ := ResolveCombatAction(combatHit, actionHit)

		expectedCounterHit := combatHit.Counter + 3 // Acertou com 2 dados, então +3
		if newCombatHit.Counter != expectedCounterHit {
			t.Errorf("Esperado Counter %d, mas recebeu %d", expectedCounterHit, newCombatHit.Counter)
		}
	})

	t.Run("Mesma seed repete: chama 2 vezes com o mesmo combat e compara as duas saídas", func(t *testing.T) {
		fighters := []Fighter{
			{ID: "actor", HP: 10, Defense: 10, Skills: []Skill{{ID: "skill", HitModifier: 0, Damage: Damage{Count: 1, RollSides: 1, Modifier: 0}}}},
			{ID: "target", HP: 10, Defense: 10, Skills: []Skill{}},
		}
		combat := NewCombat(123456789, fighters)
		action := UseSkill{ActorID: "actor", TargetID: "target", SkillID: "skill"}

		newCombat1, events1 := ResolveCombatAction(combat, action)
		newCombat2, events2 := ResolveCombatAction(combat, action)

		if !reflect.DeepEqual(newCombat1, newCombat2) {
			t.Errorf("Esperado que os dois combats resultantes sejam iguais, mas não são")
		}

		if !reflect.DeepEqual(events1, events2) {
			t.Errorf("Esperado que os dois eventos resultantes sejam iguais, mas não são")
		}
	})

	t.Run("Entrada intocada: guarda o HP do alvo, chama o resolve e confere que o combat que entrou ainda tem o HP antigo", func(t *testing.T) {
		fighters := []Fighter{
			{ID: "actor", HP: 10, Defense: 10, Skills: []Skill{{ID: "skill", HitModifier: 0, Damage: Damage{Count: 1, RollSides: 1, Modifier: 0}}}},
			{ID: "target", HP: 10, Defense: 10, Skills: []Skill{}},
		}
		combat := NewCombat(123456789, fighters)
		action := UseSkill{ActorID: "actor", TargetID: "target", SkillID: "skill"}

		// Guarda o HP do alvo antes de chamar ResolveCombatAction
		initialHP := combat.Fighters[1].HP

		newCombat, _ := ResolveCombatAction(combat, action)

		if combat.Fighters[1].HP != initialHP {
			t.Errorf("Esperado que o HP do alvo no combat original seja %d, mas recebeu %d", initialHP, combat.Fighters[1].HP)
		}

		if newCombat.Fighters[1].HP == initialHP {
			t.Errorf("Esperado que o HP do alvo no novo combat seja diferente de %d, mas recebeu %d", initialHP, newCombat.Fighters[1].HP)
		}
	})
}
