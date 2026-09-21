package game

// entidade de runtime

import "github.com/google/uuid"

type CharacterID uuid.UUID

type Player struct {
	CharacterID CharacterID
	ZoneID      ZoneID
}
