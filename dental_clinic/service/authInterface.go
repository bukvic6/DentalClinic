package service

import "dental_clinic/model"

type IAuthService interface {
	Login(request *model.LoginRequest) *model.LoginResponse
}
