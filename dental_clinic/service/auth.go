package service

import (
	"dental_clinic/model"
	"log"
)

type AuthService struct {
	l *log.Logger
}

func InitAuthService(log *log.Logger) *AuthService {
	return &AuthService{
		l: log,
	}
}
func (as *AuthService) Login(request *model.LoginRequest) *model.LoginResponse {
	as.l.Println("User service - Login")
	response := &model.LoginResponse{
		Email: request.Email,
	}
	if request.Email == "zubar@mail.com" {
		response.IsDentist = true
	} else {
		response.IsDentist = false
	}
	return response
}
