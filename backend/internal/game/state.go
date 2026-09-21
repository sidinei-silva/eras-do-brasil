package game

// estado mutável

type GameState struct {
	Players map[CharacterID]*Player
}

func NewGameState() *GameState {
	return &GameState{
		Players: make(map[CharacterID]*Player),
	}
}
