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
	var loginRequest model.LoginRequest
	if err := c.ShouldBindJSON(&loginRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Error": err.Error()})
		return
	}
	err := ac.service.Login(&loginRequest)
	if err != nil {
		ac.l.Println("Login error")
		c.JSON(http.StatusInternalServerError, gin.H{"Error creating procurement! :": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"Status": "You are logged in"})

}
func (ac *AuthController) Register(c *gin.Context) {
	ac.l.Printf("AuthController - Register")
	var registerRequest model.User
	if err := c.ShouldBindJSON(&registerRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Error": err.Error()})
		return
	}
	err := ac.service.Register(&registerRequest)
	if err != nil {
		ac.l.Println("Register error")
		c.JSON(http.StatusInternalServerError, gin.H{"Error creating user! :": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"Status": "You are now client"})

}
