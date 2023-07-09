package repository

import (
	"dental_clinic/model"
	"gorm.io/gorm"
	"log"
)

type AuthRepository struct {
	l  *log.Logger
	db *gorm.DB
}

func InitAuthRepo(log *log.Logger, dbConn *gorm.DB) *AuthRepository {
	return &AuthRepository{
		l:  log,
		db: dbConn,
	}
}
func (ar *AuthRepository) Login(request *model.LoginRequest) error {
	ar.l.Println("User Repository - GetAppointments")

	return nil
}

func (ar *AuthRepository) Register(user *model.User) error {
	ar.l.Println("USer Repository - GetAppointments")
	registerUser := ar.db.Create(user)
	errMessage := registerUser.Error
	if errMessage != nil {
		ar.l.Println("Unable to Register User.", errMessage)
		return errMessage
	}
	return nil
}
