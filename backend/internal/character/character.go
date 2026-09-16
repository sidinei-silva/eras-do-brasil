package character

import "github.com/google/uuid"

type BodyType string

const (
	NormalFemale BodyType = "NORMAL_FEMALE"
	NormalMale   BodyType = "NORMAL_MALE"
)

func (b BodyType) IsValid() bool {
	switch b {
	case NormalFemale, NormalMale:
		return true
	default:
		return false
	}
}

type Character struct {
	ID        uuid.UUID
	AccountID uuid.UUID
	Name      string
	BodyType  BodyType
}
