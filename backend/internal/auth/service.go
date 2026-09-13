package auth

import (
	"context"
	"eras-do-brasil/internal/account"
	"strings"

	"golang.org/x/crypto/bcrypt"
)

type Service struct {
	accounts account.Repository
	tokens   TokenService
}

func NewService(
	accounts account.Repository,
	tokens TokenService,
) *Service {
	return &Service{
		accounts: accounts,
		tokens:   tokens,
	}
}

func (s *Service) Login(
	ctx context.Context,
	email string,
	password string,
) (string, error) {
	email = strings.TrimSpace(strings.ToLower(email))

	acc, err := s.accounts.FindByEmail(ctx, email)
	if err != nil {
		return "", ErrInvalidCredentials
	}

	if err := bcrypt.CompareHashAndPassword(
		[]byte(acc.PasswordHash),
		[]byte(password),
	); err != nil {
		return "", ErrInvalidCredentials
	}

	token, err := s.tokens.Generate(acc.ID)
	if err != nil {
		return "", err
	}

	return token, nil
}
