package character

import (
	"context"

	"github.com/google/uuid"
)

type Repository interface {
	Create(ctx context.Context, character *Character) error
	ListByAccountID(ctx context.Context, accountID uuid.UUID) ([]*Character, error)
}
