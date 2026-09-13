package account

import "context"

type Repository interface {
	Create(ctx context.Context, account *Account) error
	FindByEmail(ctx context.Context, email string) (*Account, error)
}
