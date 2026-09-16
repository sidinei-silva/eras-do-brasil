package character

import (
	"context"
	"errors"
	"strings"

	"github.com/google/uuid"
)

type Service struct {
	repository Repository
}

func NewService(repository Repository) *Service {
	return &Service{
		repository: repository,
	}
}

func (s *Service) Create(
	ctx context.Context,
	accountID uuid.UUID,
	name string,
	bodyType BodyType,
) (*Character, error) {
	name = strings.TrimSpace(name)

	if name == "" {
		return nil, errors.New("name is required")
	}

	character := &Character{
		ID:        uuid.New(),
		AccountID: accountID,
		Name:      name,
		BodyType:  bodyType,
	}

	if err := s.repository.Create(ctx, character); err != nil {
		return nil, err
	}

	return character, nil
}

func (s *Service) ListByAccountID(
	ctx context.Context,
	accountID uuid.UUID,
) ([]*Character, error) {

	return s.repository.ListByAccountID(ctx, accountID)
}
