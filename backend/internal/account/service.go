package account

import (
	"context"
	"errors"
	"strings"

	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type Service struct {
	repository Repository
}

func NewService(repository Repository) *Service {
	return &Service{
		repository: repository,
	}
}

func (s *Service) CreateAccount(
	ctx context.Context,
	email string,
	password string,
	confirmPassword string,
) (*Account, error) {
	email = strings.TrimSpace(strings.ToLower(email))

	if email == "" {
		return nil, errors.New("email é obrigatório")
	}

	if password == "" {
		return nil, errors.New("senha é obrigatória")
	}

	if confirmPassword == "" {
		return nil, errors.New("confirmação de senha é obrigatória")
	}

	if password != confirmPassword {
		return nil, errors.New("as senhas não correspondem")
	}

	checkAccount, err := s.repository.FindByEmail(ctx, email)
	if err != nil {
		return nil, err
	}

	if checkAccount != nil {
		return nil, errors.New("email já cadastrado")
	}

	hash, err := bcrypt.GenerateFromPassword(
		[]byte(password),
		bcrypt.DefaultCost,
	)
	if err != nil {
		return nil, err
	}

	account := &Account{
		ID:           uuid.New(),
		Email:        email,
		PasswordHash: string(hash),
	}

	if err := s.repository.Create(ctx, account); err != nil {
		return nil, err
	}

	return account, nil
}
