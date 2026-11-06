package core

import (
	"log/slog"
	"reflect"
	"testing"
)

func TestDealDamage(t *testing.T) {

	/*
		O que testar:
		- Faixa do dano
			- Given: um Damage 2d6+1 e um alvo com HP alto
			- When: chamar dealDamage 1.000 vezes, cada uma com counter (ou seed) diferente
			- Then: o Total nunca sai do mínimo/máximo possível; len(Rolls) é sempre 2
		- Crítico dobra
			- Given: o mesmo Damage, isCrit true
			- When: chamar uma vez
			- Then: Total = o dobro de (soma dos Rolls + Modifier)
	*/

	t.Run("Faixa de dano, um Damage 2d6+1 e um alvo com HP alto, 1000 vezes, o Total nunca sai mínimo/máximo possível, len(Rolls) é sempre 2", func(t *testing.T) {

		damage := Damage{Count: 2, RollSides: 6, Modifier: 1}
		maxDamage := 2*6 + 1 // máximo possível é 2*6 + 1 = 13
		minDamage := 2*1 + 1 // mínimo possível é 2*1 + 1 = 3
		actor := Fighter{ID: "actor", HP: 10, Defense: 10, Skills: []Skill{{ID: "skill", HitModifier: 0, Damage: damage}}}

		for i := 0; i < 1000; i++ {
			target := Fighter{ID: "target", HP: 200, Defense: 10, Skills: []Skill{}}
			combat := NewCombat(uint64(i), []Fighter{actor, target})
			combatEvents := dealDamage(&combat, &target, damage, false)

			slog.Debug("Combat events", "events", combatEvents)
			if len(combatEvents) != 1 {
				t.Errorf("Expected 1 combat event, got %d", len(combatEvents))
			}

			if reflect.TypeOf(combatEvents[0]) != reflect.TypeOf(DamageRolled{}) {
				t.Errorf("Expected DamageDealt event, got %T", combatEvents[0])
			}

			damageRolled := combatEvents[0].(DamageRolled)
			if len(damageRolled.Rolls) != 2 {
				t.Errorf("Expected 2 rolls, got %d", len(damageRolled.Rolls))
			}

			if damageRolled.Total < minDamage || damageRolled.Total > maxDamage {
				t.Errorf("Expected total damage between %d and %d, got %d", minDamage, maxDamage, damageRolled.Total)
			}
		}
	})

}
