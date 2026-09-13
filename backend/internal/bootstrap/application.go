// Package bootstrap initializes and runs the application services.
package bootstrap

import (
	"context"
	httpnetwork "eras-do-brasil/internal/network/http"
	"eras-do-brasil/internal/persistence/postgres"
	"fmt"
	"log"
	"log/slog"
	"os"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/joho/godotenv"
	"github.com/lmittmann/tint"
)

type Application struct {
	httpServer *httpnetwork.Server
	db         *pgx.Conn
}

func New() (*Application, error) {
	initLogger()

	slog.Info("Starting server...")

	if err := godotenv.Load(); err != nil {
		log.Println("warning: .env not found")
	}

	// Database
	databaseURL := os.Getenv("DATABASE_URL")
	if databaseURL == "" {
		return nil, fmt.Errorf("DATABASE_URL não definido")
	}

	// 1. Executa as migrations embutidas
	if err := postgres.RunMigrations(databaseURL); err != nil {
		return nil, fmt.Errorf("falha ao executar migrations: %w", err)
	}

	// 2. Abre a conexão da aplicação
	db, err := pgx.Connect(context.Background(), databaseURL)
	if err != nil {
		return nil, err
	}

	//Http
	healthHandler := httpnetwork.NewHealthHandler()
	httpServer := httpnetwork.NewServer(healthHandler)

	return &Application{
		httpServer: httpServer,
		db:         db,
	}, nil
}

func (a *Application) Run() error {
	return a.httpServer.Start()
}

func (a *Application) Shutdown(ctx context.Context) error {
	if err := a.httpServer.Shutdown(); err != nil {
		return err
	}

	return nil
}

func initLogger() {
	w := os.Stderr
	logger := slog.New(tint.NewTextHandler(w, &tint.Options{
		Level:      slog.LevelDebug,
		TimeFormat: time.Kitchen,
		AddSource:  true,
	}))

	if os.Getenv("ENV") == "production" {
		logger = slog.New(slog.NewJSONHandler(os.Stdout, nil))
	}

	slog.SetDefault(logger)
}
