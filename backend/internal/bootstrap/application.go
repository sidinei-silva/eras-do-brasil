// Package bootstrap initializes and runs the application services.
package bootstrap

import (
	"context"
	"eras-do-brasil/internal/account"
	"eras-do-brasil/internal/auth"
	"eras-do-brasil/internal/character"
	"eras-do-brasil/internal/gamedata"
	httpnetwork "eras-do-brasil/internal/network/http"
	"eras-do-brasil/internal/persistence/postgres"
	"eras-do-brasil/internal/persistence/postgres/repositories"
	"fmt"
	"log"
	"log/slog"
	"os"
	"path/filepath"
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

	dataPath, err := loadDataPath()
	if err != nil {
		return nil, err
	}

	data, err := gamedata.Load(dataPath)
	if err != nil {
		return nil, err
	}

	world, err := BuildWorld(data.ZoneMaps)
	if err != nil {
		return nil, err
	}

	slog.Info("Game world loaded", "zones", len(world.Zones))

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

	jwtSecret := os.Getenv("JWT_SECRET")
	if jwtSecret == "" {
		return nil, fmt.Errorf("JWT_SECRET não definido")
	}
	tokenService := auth.NewJWTService(jwtSecret, 24*time.Hour)

	//Middleware
	authMiddleware := httpnetwork.NewAuthMiddleware(tokenService)

	// Health
	healthHandler := httpnetwork.NewHealthHandler()

	// Account
	accountRepository := repositories.NewAccountRepository(db)
	accountService := account.NewService(accountRepository)
	accountHandler := httpnetwork.NewAccountHandler(accountService)

	// Auth

	authService := auth.NewService(accountRepository, tokenService)
	authHandler := httpnetwork.NewAuthHandler(authService)

	// Character
	characterRepository := repositories.NewCharacterRepository(db)
	characterService := character.NewService(characterRepository)
	characterHandler := httpnetwork.NewCharacterHandler(characterService)

	httpServer := httpnetwork.NewServer(healthHandler, accountHandler, authHandler, authMiddleware, characterHandler)

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

func loadDataPath() (string, error) {
	path, err := os.Getwd()

	if err != nil {
		return "", err
	}

	var dataPathDir = path + "/../data"

	absolutePath, err := filepath.Abs(dataPathDir)

	if err != nil {
		slog.Error(
			"Falha ao obter caminho absoluto do arquivo",
			"dataPathDir", dataPathDir,
			"err", err,
		)
		log.Fatal(err)
	}

	return absolutePath, nil
}
