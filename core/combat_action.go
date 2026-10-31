package core

// CombatAction é qualquer ação que um lutador faz no turno.
type CombatAction interface {
	resolve(c Combat) (Combat, []CombatEvent)
}

// UseSkill o lutador usa uma skill contra um alvo.
type UseSkill struct {
	ActorID  string
	SkillID  string
	TargetID string
}

// resolve: rola o acerto; se acertou, rola e aplica o dano.
func (a UseSkill) resolve(originalCombat Combat) (Combat, []CombatEvent) {
	// Copia os lutadores para não mexer no combate recebido.
	var combat = Combat{
		Seed:     originalCombat.Seed,
		Counter:  originalCombat.Counter,
		Fighters: make([]Fighter, len(originalCombat.Fighters)),
	}
	copy(combat.Fighters, originalCombat.Fighters)

	attacker := findFighter(combat.Fighters, a.ActorID)
	if attacker == nil {
		return combat, []CombatEvent{}
	}

	target := findFighter(combat.Fighters, a.TargetID)
	if target == nil {
		return combat, []CombatEvent{}
	}

	skill := findSkill(attacker.Skills, a.SkillID)
	if skill == nil {
		return combat, []CombatEvent{}
	}

	events := []CombatEvent{}

	hitEvent := rollHit(&combat, a, skill.HitModifier, target.Defense)
	events = append(events, hitEvent)

	// Só rola dano se acertou.
	if hitEvent.Degree == Success || hitEvent.Degree == CritSuccess {
		damageEvents := dealDamage(&combat, target, skill.Damage, hitEvent.Degree == CritSuccess)
		events = append(events, damageEvents...)
	}

	return combat, events
}
