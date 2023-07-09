package service

import "dental_clinic/model"

type IAuthService interface {
	Login(request *model.LoginRequest) error
	Register(user *model.User) error
}
