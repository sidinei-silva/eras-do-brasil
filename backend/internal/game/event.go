package game

import "time"

type Event interface {
	event()
}

type PlayerEnteredWorldEvent struct {
	CharacterID CharacterID
	ZoneID      ZoneID
	Time        time.Time
}

func (PlayerEnteredWorldEvent) event() {}
