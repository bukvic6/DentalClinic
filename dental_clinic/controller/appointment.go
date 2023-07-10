package controller

import (
	"dental_clinic/model"
	"dental_clinic/service"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"strings"
)

type AppointmentController struct {
	l       *log.Logger
	service service.IAppointmentService
}

func InitAppointmentController(log *log.Logger, serv service.IAppointmentService) *AppointmentController {
	return &AppointmentController{
		l:       log,
		service: serv,
	}
}
func (ac *AppointmentController) ScheduleAppointment(c *gin.Context) {
	ac.l.Println("AppointmentController - ScheduleAppointment")
	var scheduleRequest model.AppointmentRequest
	if err := c.ShouldBindJSON(&scheduleRequest); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"Error": err.Error()})
		return
	}
	err := ac.service.ScheduleAppointment(&scheduleRequest)
	if err != nil {
		ac.l.Printf("Schedule appointment error")
		c.JSON(http.StatusInternalServerError, gin.H{"Error scheduling appointment! :": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"Status": "Everything went fine!"})

}
func (ac *AppointmentController) GetAppointments(c *gin.Context) {
	ac.l.Println("CommunityController - GetAppointments")

	appointments, err := ac.service.GetAppointments()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, appointments)
}
func (ac *AppointmentController) CancelAppointment(c *gin.Context) {
	ac.l.Println("CommunityController - CancelAppointment")

	appointmentId := c.Param("appointmentId")
	err := ac.service.CancelAppointment(appointmentId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"Status": "Appointment successfully canceled!"})
}

func (ac *AppointmentController) GetClientAppointments(c *gin.Context) {
	ac.l.Println("CommunityController - Get Appointment by client email")
	user := c.GetHeader("Authorization")
	if user == "" {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"errors": "Authorization header not provided"})
		return
	}
	bearer, emailString, found := strings.Cut(user, " ")
	if !found || bearer != "UserEmail" {
		c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"errors": "invalid format for User in Authorization header"})
		return
	}
	appointments, err := ac.service.GetClientAppointments(emailString)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, appointments)
}
func (ac *AppointmentController) ChangeHoursNeededForCancellation(c *gin.Context) {
	ac.l.Println("CommunityController - Change Hours Needed for cancelation")
	hoursNeeded := c.Param("hours")
	err := ac.service.ChangeHoursForCancellation(hoursNeeded)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"Status": "Hours needed for cancelling changed"})

}

func (ac *AppointmentController) GetHour(c *gin.Context) {
	ac.l.Println("CommunityController - Change Hours Needed for cancelation")
	hour, err := ac.service.GetHour()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	c.JSON(http.StatusOK, hour)

}
