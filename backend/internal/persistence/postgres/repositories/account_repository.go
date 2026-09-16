// Package repositories fornece implementações de interfaces de repositório para persistência de dados.
package repositories

import (
	"context"
	"eras-do-brasil/internal/account"
	"errors"

	"github.com/jackc/pgx/v5"
)

type AccountRepository struct {
	db *pgx.Conn
}

func NewAccountRepository(db *pgx.Conn) *AccountRepository {
	return &AccountRepository{
		db: db,
	}
}

func (r *AccountRepository) Create(
	ctx context.Context,
	acc *account.Account,
) error {
	_, err := r.db.Exec(
		ctx,
		`
		INSERT INTO accounts (
			id,
			email,
			password_hash
		)
		VALUES ($1, $2, $3)
		`,
		acc.ID,
		acc.Email,
		acc.PasswordHash,
	)

	return err
}

func (r *AccountRepository) FindByEmail(
	ctx context.Context,
	email string,
) (*account.Account, error) {
	row := r.db.QueryRow(
		ctx,
		`
        SELECT id, email, password_hash
        FROM accounts
        WHERE email = $1
        `,
		email,
	)

	acc := &account.Account{}

	if err := row.Scan(&acc.ID, &acc.Email, &acc.PasswordHash); err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, nil
		}

		return nil, err
	}

	return acc, nil
}
