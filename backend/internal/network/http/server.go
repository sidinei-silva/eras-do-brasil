package http

import (
	"log/slog"
	"net/http"
	"time"
)

type Server struct {
	httpServer *http.Server
}

func NewServer(healthHandler *HealthHandler) *Server {
	mux := http.NewServeMux()
	routes := []string{}

	registerRoute(mux, &routes, "/health", healthHandler.CheckHealth)

	slog.Info("HTTP routes registered", "routes", routes)

	return &Server{
		httpServer: &http.Server{
			Addr:              ":8080",
			Handler:           jsonContentTypeMiddleware(mux),
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

func registerRoute(
	mux *http.ServeMux,
	routes *[]string,
	pattern string,
	handler http.HandlerFunc,
) {
	mux.HandleFunc(pattern, handler)
	*routes = append(*routes, pattern)
}

func jsonContentTypeMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		next.ServeHTTP(w, r)
	})
}
