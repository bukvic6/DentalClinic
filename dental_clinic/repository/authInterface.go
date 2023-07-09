package repository

import "dental_clinic/model"

type IAuthRepo interface {
	Login(request *model.LoginRequest) error
	Register(user *model.User) error
}
