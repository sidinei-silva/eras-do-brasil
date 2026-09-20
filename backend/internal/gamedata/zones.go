package gamedata

import (
	"fmt"
	"path/filepath"
)

type ZoneMap struct {
	ID          string          `json:"id"`
	Scope       string          `json:"scope"`
	ContinentID string          `json:"continentId"`
	EraID       string          `json:"eraId"`
	Zones       []ZoneDef       `json:"zones"`
	Connections []ConnectionDef `json:"connections"`
}

type ConnectionDef struct {
	ID            string `json:"id"`
	From          string `json:"from"`
	To            string `json:"to"`
	TravelMinutes int    `json:"travelMinutes"`
}

type ZoneDef struct {
	ID           string        `json:"id"`
	Name         string        `json:"name"`
	Tier         int           `json:"tier"`
	Risk         string        `json:"risk"`
	FactionID    *string       `json:"factionId"`
	Hub          bool          `json:"hub"`
	Spawn        bool          `json:"spawn"`
	BossID       *string       `json:"bossId"`
	MobFactionID *string       `json:"mobFactionId"`
	Resources    []ResourceDef `json:"resources"`
	Camps        []CampDef     `json:"camps"`
}

type ResourceDef struct {
	MaterialID string `json:"materialId"`
	Abundance  string `json:"abundance"`
}

type CampDef struct {
	ID        string   `json:"id"`
	Name      string   `json:"name"`
	MobIDs    []string `json:"mobIds"`
	SizeMin   int      `json:"sizeMin"`
	SizeMax   int      `json:"sizeMax"`
	EliteID   *string  `json:"eliteId"`
	FactionID *string  `json:"factionId"`
}

func LoadZoneMaps(scopeDirs []string) ([]*ZoneMap, error) {
	maps := make([]*ZoneMap, 0, len(scopeDirs))
	for _, dir := range scopeDirs {
		zm, err := loadJSON[ZoneMap](filepath.Join(dir, "zones.json"))
		if err != nil {
			return nil, fmt.Errorf("carregando zones.json de %s: %w", dir, err)
		}
		maps = append(maps, zm)
	}
	return maps, nil
}
