package game

type ZoneID string
type RiskLevel string

const (
	RiskSegura    RiskLevel = "segura"
	RiskDisputada RiskLevel = "disputada"
	RiskMortal    RiskLevel = "mortal"
	RiskSelvagem  RiskLevel = "selvagem"
)

var ValidRisk = map[RiskLevel]bool{
	RiskSegura:    true,
	RiskDisputada: true,
	RiskMortal:    true,
	RiskSelvagem:  true,
}

type Zone struct {
	ID           ZoneID
	Name         string
	Tier         int
	Risk         RiskLevel
	FactionID    *string
	Hub          bool
	Spawn        bool
	BossID       *string
	MobFactionID *string
}
