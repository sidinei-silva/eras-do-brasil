package auth

import "errors"

var ErrInvalidCredentials = errors.New("credenciais inválidas")
var ErrInvalidToken = errors.New("token inválido")
