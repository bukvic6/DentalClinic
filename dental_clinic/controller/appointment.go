package controller

import (
	"dental_clinic/model"
	"dental_clinic/service"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
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
