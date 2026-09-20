package gamedata

import (
	"os"
	"path/filepath"
)

type GameData struct {
	ZoneMaps []*ZoneMap
}

func Load(dataDir string) (*GameData, error) {
	scopeDirs, err := discoverScopes(dataDir)
	if err != nil {
		return nil, err
	}

	zoneMaps, err := LoadZoneMaps(scopeDirs)
	if err != nil {
		return nil, err
	}

	return &GameData{ZoneMaps: zoneMaps}, nil
}

func discoverScopes(dataDir string) ([]string, error) {
	entries, err := os.ReadDir(dataDir)
	if err != nil {
		return nil, err
	}
	var scopes []string
	for _, e := range entries {
		if e.IsDir() && e.Name() != "shared" {
			scopes = append(scopes, filepath.Join(dataDir, e.Name()))
		}
	}
	return scopes, nil
}
