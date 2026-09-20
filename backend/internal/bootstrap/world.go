package bootstrap

import (
	"eras-do-brasil/internal/game"
	"eras-do-brasil/internal/gamedata"
	"fmt"
)

func BuildWorld(zoneMaps []*gamedata.ZoneMap) (*game.World, error) {
	world := game.NewWorld()

	for _, zoneMap := range zoneMaps {
		for _, zoneDefinition := range zoneMap.Zones {
			zone, err := buildZone(zoneDefinition)
			if err != nil {
				return nil, fmt.Errorf("erro ao construir zona %q: %w", zoneDefinition.ID, err)
			}
			if err := world.AddZone(zone); err != nil {
				return nil, fmt.Errorf("erro ao adicionar zona %q ao mundo: %w", zoneDefinition.ID, err)
			}
		}
	}
	return world, nil
}

func buildZone(def gamedata.ZoneDef) (*game.Zone, error) {
	risk := game.RiskLevel(def.Risk)
	if !game.ValidRisk[risk] {
		return nil, fmt.Errorf("zona %s: risco desconhecido %q", def.ID, def.Risk)
	}
	zone := &game.Zone{
		ID: game.ZoneID(def.ID), Name: def.Name,
		Tier: def.Tier, Risk: risk, Hub: def.Hub,
	}

	return zone, nil
}
