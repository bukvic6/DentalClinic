package service

import (
	"dental_clinic/model"
	"dental_clinic/repository"
	"log"
)

type AuthService struct {
	l    *log.Logger
	repo repository.IAuthRepo
}

func InitAuthService(log *log.Logger, repo repository.IAuthRepo) *AuthService {
	return &AuthService{
		l:    log,
		repo: repo,
	}
}
func (as *AuthService) Login(request *model.LoginRequest) error {
	as.l.Println("User service - Login")
	err := as.repo.Login(request)
	if err != nil {
		return err
	}
	return nil
}
func (as *AuthService) Register(user *model.User) error {
	as.l.Println("User service - Register")
	err := as.repo.Register(user)
	if err != nil {
		return err
	}
	return nil
}
