package repositories

import (
	"context"
	"eras-do-brasil/internal/character"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
)

type CharacterRepository struct {
	db *pgx.Conn
}

func NewCharacterRepository(db *pgx.Conn) *CharacterRepository {
	return &CharacterRepository{
		db: db,
	}
}

func (r *CharacterRepository) Create(
	ctx context.Context,
	char *character.Character,
) error {
	_, err := r.db.Exec(ctx, `
		INSERT INTO characters (
			id,
			account_id,
			name,
			body_type
		)
		VALUES ($1, $2, $3, $4)
	`,
		char.ID,
		char.AccountID,
		char.Name,
		char.BodyType,
	)

	return err
}

func (r *CharacterRepository) ListByAccountID(
	ctx context.Context,
	accountID uuid.UUID,
) ([]*character.Character, error) {
	rows, err := r.db.Query(ctx, `
		SELECT id, account_id, name, body_type
		FROM characters
		WHERE account_id = $1
		ORDER BY name
	`, accountID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var characters []*character.Character

	for rows.Next() {
		char := &character.Character{}

		if err := rows.Scan(
			&char.ID,
			&char.AccountID,
			&char.Name,
			&char.BodyType,
		); err != nil {
			return nil, err
		}

		characters = append(characters, char)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return characters, nil
}
