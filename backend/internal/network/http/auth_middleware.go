package http

import (
	"context"
	"eras-do-brasil/internal/auth"
	"net/http"
	"strings"

	"github.com/google/uuid"
)

type contextKey string

const accountIDContextKey contextKey = "account_id"

type AuthMiddleware struct {
	tokens auth.TokenService
}

func NewAuthMiddleware(tokens auth.TokenService) *AuthMiddleware {
	return &AuthMiddleware{
		tokens: tokens,
	}
}

func (m *AuthMiddleware) Authenticate(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		token := extractBearerToken(r)
		if token == "" {
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return
		}

		accountID, err := m.tokens.Validate(token)
		if err != nil {
			http.Error(w, "unauthorized", http.StatusUnauthorized)
			return
		}

		ctx := context.WithValue(
			r.Context(),
			accountIDContextKey,
			accountID,
		)

		next.ServeHTTP(w, r.WithContext(ctx))
	})
}

func extractBearerToken(r *http.Request) string {
	header := r.Header.Get("Authorization")

	const prefix = "Bearer "

	if !strings.HasPrefix(header, prefix) {
		return ""
	}

	return strings.TrimSpace(strings.TrimPrefix(header, prefix))
}

func AccountIDFromContext(ctx context.Context) (uuid.UUID, bool) {
	accountID, ok := ctx.Value(accountIDContextKey).(uuid.UUID)
	return accountID, ok
}
