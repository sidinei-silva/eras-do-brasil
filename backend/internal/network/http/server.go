package http

import (
	"log/slog"
	"net/http"
	"time"
)

type Server struct {
	httpServer *http.Server
}

type Route struct {
	Method  string
	Path    string
	Handler http.HandlerFunc
	Public  bool
}

func NewServer(healthHandler *HealthHandler, accountHandler *AccountHandler, authHandler *AuthHandler, authMiddleware *AuthMiddleware) *Server {
	mux := http.NewServeMux()
	routes := []Route{
		{
			Method:  http.MethodGet,
			Path:    "/health",
			Handler: healthHandler.CheckHealth,
			Public:  true,
		},
		{
			Method:  http.MethodPost,
			Path:    "/accounts",
			Handler: accountHandler.CreateAccount,
			Public:  true,
		},
		{
			Method:  http.MethodGet,
			Path:    "/me",
			Handler: accountHandler.Me,
		},
		{
			Method:  http.MethodPost,
			Path:    "/auth/login",
			Handler: authHandler.Login,
			Public:  true,
		},
	}

	for _, route := range routes {
		handler := http.Handler(http.HandlerFunc(route.Handler))
		if !route.Public {
			handler = authMiddleware.Authenticate(handler)
		}
		mux.Handle(route.Method+" "+route.Path, handler)
		slog.Info("Registered route", "method", route.Method, "path", route.Path, "public", route.Public)
	}

	return &Server{
		httpServer: &http.Server{
			Addr:              ":8080",
			Handler:           JSONContentTypeMiddleware(mux),
			ReadHeaderTimeout: 5 * time.Second,
			ReadTimeout:       10 * time.Second,
			WriteTimeout:      10 * time.Second,
			IdleTimeout:       60 * time.Second,
		},
	}

}

func (s *Server) Start() error {
	slog.Info(
		"HTTP server listening",
		"address", s.httpServer.Addr,
	)

	return s.httpServer.ListenAndServe()
}

func (s *Server) Shutdown() error {
	slog.Info("Shutting down HTTP server")

	return s.httpServer.Close()
}
