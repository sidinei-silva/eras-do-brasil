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

	// Verificar se o jogador já está no estado
	//Esta bugado deixar comentado até quando eu descobrir quando identificar que é um reconect ou um novo connect ou até ter um snapshot para descobrir
	// if _, exists := g.state.Players[cmd.CharacterID]; exists {
	// 	return nil, fmt.Errorf("jogador %q já está no estado", cmd.CharacterID)
	// }

	// Adicionar o jogador ao estado
	player := &Player{
		CharacterID: cmd.CharacterID,
		ZoneID:      cmd.ZoneID,
	}

	g.state.Players[cmd.CharacterID] = player

	events = append(events, PlayerEnteredWorldEvent{
		CharacterID: cmd.CharacterID,
		ZoneID:      cmd.ZoneID,
		Time:        now,
	})

	return events, nil

}
