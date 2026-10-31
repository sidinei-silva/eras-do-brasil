package core

// Damage é o dano em dado de uma skill: Count d RollSides + Modifier (ex.: 1d8+2).
type Damage struct {
	Count     int
	RollSides int
	Modifier  int
}

// Skill é um ataque que o lutador pode usar.
type Skill struct {
	ID          string
	HitModifier int
	Damage      Damage
}

// Fighter é quem luta: jogador ou inimigo, mesmo motor.
type Fighter struct {
	ID      string
	HP      int
	Defense int
	Skills  []Skill
}

// Combat é o estado da luta. Quem resolve uma ação devolve um Combat novo.
type Combat struct {
	Seed     uint64 // com Counter, define cada dado: mesma entrada, mesma luta
	Counter  uint64 // sobe 1 a cada dado rolado
	Fighters []Fighter
}

// NewCombat começa a luta com o contador em 0.
func NewCombat(seed uint64, fighters []Fighter) Combat {
	return Combat{
		Seed:     seed,
		Counter:  0,
		Fighters: fighters,
	}
}

// ResolveCombatAction aplica a ação e devolve o combate novo e os eventos.
func ResolveCombatAction(combat Combat, a CombatAction) (Combat, []CombatEvent) {
	return a.resolve(combat)
}

// rollHit rola 1d20 + modificador contra a Defesa.
func rollHit(c *Combat, action UseSkill, modifier int, defense int) HitRolled {
	natural := roll(c.Seed, c.Counter, 20)
	hitDegree := degree(natural, modifier, defense)
	c.Counter++

	return HitRolled{
		ActorID:  action.ActorID,
		TargetID: action.TargetID,
		SkillID:  action.SkillID,
		Natural:  natural,
		Modifier: modifier,
		Defense:  defense,
		Degree:   hitDegree,
	}
}

// dealDamage rola o dano, tira do HP do alvo e avisa se ele morreu.
func dealDamage(c *Combat, target *Fighter, dmg Damage, isCrit bool) []CombatEvent {
	var rolls []int
	var diceSum int

	for i := 0; i < dmg.Count; i++ {
		r := roll(c.Seed, c.Counter, dmg.RollSides)
		c.Counter++
		rolls = append(rolls, r)
		diceSum += r
	}

	totalDamage := diceSum + dmg.Modifier

	// Sucesso crítico dobra o total, modificador incluso.
	if isCrit {
		totalDamage *= 2
	}

	target.HP -= totalDamage

	events := []CombatEvent{}
	events = append(events, DamageRolled{
		TargetID: target.ID,
		Damage:   dmg,
		Rolls:    rolls,
		Critical: isCrit,
		Total:    totalDamage,
		HPAfter:  target.HP,
	})

	if target.HP <= 0 {
		events = append(events, Died{
			FighterID: target.ID,
		})
	}

	return events
}

// findFighter devolve um ponteiro para o lutador dentro de fighters.
func findFighter(fighters []Fighter, id string) *Fighter {
	for i := range fighters {
		if fighters[i].ID == id {
			return &fighters[i]
		}
	}
	return nil
}

func findSkill(skills []Skill, id string) *Skill {
	for i := range skills {
		if skills[i].ID == id {
			return &skills[i]
		}
	}
	return nil
}
