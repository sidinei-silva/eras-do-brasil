package http

import (
	"encoding/json"
	"eras-do-brasil/internal/character"
	"net/http"
)

type CharacterHandler struct {
	service *character.Service
}

func NewCharacterHandler(service *character.Service) *CharacterHandler {
	return &CharacterHandler{
		service: service,
	}
}

type createCharacterRequest struct {
	Name     string             `json:"name"`
	BodyType character.BodyType `json:"body_type"`
}

type createCharacterResponse struct {
	ID       string             `json:"id"`
	Name     string             `json:"name"`
	BodyType character.BodyType `json:"body_type"`
}

func (h *CharacterHandler) CreateCharacter(
	w http.ResponseWriter,
	r *http.Request,
) {
	accountID, ok := AccountIDFromContext(r.Context())
	if !ok {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	var request createCharacterRequest

	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(
			w,
			"invalid request body",
			http.StatusBadRequest,
		)
		return
	}

	if !request.BodyType.IsValid() {
		http.Error(
			w,
			"invalid body_type",
			http.StatusBadRequest,
		)
		return
	}

	char, err := h.service.Create(
		r.Context(),
		accountID,
		request.Name,
		request.BodyType,
	)
	if err != nil {
		http.Error(
			w,
			err.Error(),
			http.StatusBadRequest,
		)
		return
	}

	w.WriteHeader(http.StatusCreated)

	_ = json.NewEncoder(w).Encode(
		createCharacterResponse{
			ID:       char.ID.String(),
			Name:     char.Name,
			BodyType: char.BodyType,
		},
	)
}

func (h *CharacterHandler) ListCharacters(
	w http.ResponseWriter,
	r *http.Request,
) {
	accountID, ok := AccountIDFromContext(r.Context())
	if !ok {
		http.Error(w, "unauthorized", http.StatusUnauthorized)
		return
	}

	characters, err := h.service.ListByAccountID(r.Context(), accountID)

	if err != nil {
		http.Error(
			w,
			err.Error(),
			http.StatusInternalServerError,
		)
		return
	}

	response := make([]createCharacterResponse, 0, len(characters))
	for _, char := range characters {
		response = append(response, createCharacterResponse{
			ID:       char.ID.String(),
			Name:     char.Name,
			BodyType: char.BodyType,
		})
	}

	w.WriteHeader(http.StatusOK)
	_ = json.NewEncoder(w).Encode(response)

}
