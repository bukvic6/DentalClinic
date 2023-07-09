package controller

import (
	"dental_clinic/model"
	"dental_clinic/service"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
)

type AuthController struct {
	l       *log.Logger
	service service.IAuthService
}

func InitAuthController(log *log.Logger, service service.IAuthService) *AuthController {
	return &AuthController{
		l:       log,
		service: service,
	}
}
func (ac *AuthController) Login(c *gin.Context) {
	ac.l.Printf("AuthController - Login")
	var loginRequest *model.LoginRequest
	if err := c.ShouldBindJSON(&loginRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Error": err.Error()})
		return
	}
	response := ac.service.Login(loginRequest)

	ac.l.Println(response.IsDentist)
	c.JSON(http.StatusOK, response)

}
