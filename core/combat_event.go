package core

// CombatEvent é o que aconteceu numa ação, na ordem em que aconteceu.
type CombatEvent interface{ event() }

// HitRolled é o teste de acerto: 1d20 + modificador contra a Defesa (combate.md).
type HitRolled struct {
	ActorID  string
	TargetID string
	SkillID  string
	Natural  int // o d20 sem modificador
	Modifier int
	Defense  int
	Degree   Degree
}

func (HitRolled) event() {}

// DamageRolled é o dano da skill. Só existe se o acerto deu sucesso (combate.md).
type DamageRolled struct {
	TargetID string
	Damage   Damage
	Rolls    []int // um valor por dado
	Critical bool  // sucesso crítico: total dobrado
	Total    int
	HPAfter  int
}

func (DamageRolled) event() {}

// Died sai quando o HP do lutador chega a 0 ou menos.
type Died struct {
	FighterID string
}

func (Died) event() {}
