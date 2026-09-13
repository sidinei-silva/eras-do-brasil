package http

import (
	"encoding/json"
	"eras-do-brasil/internal/account"
	"net/http"
)

type AccountHandler struct {
	service *account.Service
}

func NewAccountHandler(service *account.Service) *AccountHandler {
	return &AccountHandler{
		service: service,
	}
}

type createAccountRequest struct {
	Email           string `json:"email"`
	Password        string `json:"password"`
	ConfirmPassword string `json:"confirm_password"`
}

type createAccountResponse struct {
	ID string `json:"id"`
}

func (h *AccountHandler) CreateAccount(
	w http.ResponseWriter,
	r *http.Request,
) {
	var request createAccountRequest

	if err := json.NewDecoder(r.Body).Decode(&request); err != nil {
		http.Error(w, "corpo da requisição inválido", http.StatusBadRequest)
		return
	}

	acc, err := h.service.CreateAccount(
		r.Context(),
		request.Email,
		request.Password,
		request.ConfirmPassword,
	)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	response := createAccountResponse{
		ID: acc.ID.String(),
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	_ = json.NewEncoder(w).Encode(response)
}
