package gamedata

import (
	"encoding/json"
	"log/slog"
	"os"
)

func loadJSON[T any](filePath string) (*T, error) {
	slog.Info("Carregando arquivo JSON", "filePath", filePath)

	jsonFile, err := os.ReadFile(filePath)
	if err != nil {
		slog.Error("Falha ao carregar arquivo", "filePath", filePath, "err", err)
		return nil, err
	}

	var data T

	if err := json.Unmarshal(jsonFile, &data); err != nil {
		slog.Error("Falha ao fazer unmarshal do arquivo", "filePath", filePath, "err", err)
		return nil, err
	}

	return &data, nil
}
