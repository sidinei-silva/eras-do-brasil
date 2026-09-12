package bootstrap

import (
	"context"
	httpnetwork "eras-do-brasil/internal/network/http"
	"log"
	"log/slog"
	"os"
	"time"

	"github.com/joho/godotenv"
	"github.com/lmittmann/tint"
)

type Application struct {
	httpServer *httpnetwork.Server
}

func New() (*Application, error) {
	initLogger()

	slog.Info("Starting server...")

	if err := godotenv.Load(); err != nil {
		log.Println("warning: .env not found")
	}

	//Http
	healthHandler := httpnetwork.NewHealthHandler()
	httpServer := httpnetwork.NewServer(healthHandler)

	return &Application{
		httpServer: httpServer,
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
