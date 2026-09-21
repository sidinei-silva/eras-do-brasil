package game

// regras/transições do Game

import (
	"fmt"
	"time"
)

type Game struct {
	world *World
	state *GameState
}

func NewGame(world *World) *Game {
	return &Game{
		world: world,
		state: NewGameState(),
	}
}

func (g *Game) EnterWorld(cmd EnterWorldCommand, now time.Time) ([]Event, error) {
	var events []Event

	// Verificar a zona
	if _, exists := g.world.Zones[cmd.ZoneID]; !exists {
		return nil, fmt.Errorf("zona %q não existe", cmd.ZoneID)
	}

	if _, exists := g.state.Players[cmd.CharacterID]; !exists {
		player := &Player{
			CharacterID: cmd.CharacterID,
			ZoneID:      cmd.ZoneID,
		}

		// Adicionar o jogador ao estado
		g.state.Players[cmd.CharacterID] = player
	}

	events = append(events, PlayerEnteredWorldEvent{
		CharacterID: cmd.CharacterID,
		ZoneID:      cmd.ZoneID,
		Time:        now,
	})

	return events, nil

}
