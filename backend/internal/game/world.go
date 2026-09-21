package game

import "fmt"

// World representa a estrutura do mundo em runtime
type World struct {
	Zones map[ZoneID]*Zone
}

func NewWorld() *World {
	return &World{Zones: make(map[ZoneID]*Zone)}
}

func (w *World) AddZone(zone *Zone) error {
	if zone == nil {
		return fmt.Errorf("zone is nil")
	}

	if _, exists := w.Zones[zone.ID]; exists {
		return fmt.Errorf("zona %q duplicada", zone.ID)
	}

	w.Zones[zone.ID] = zone
	return nil
}
