package main

import (
	"context"
	"dental_clinic/controller"
	"dental_clinic/repository"
	"dental_clinic/service"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"
)

func main() {
	l := log.New(os.Stdout, "Dental_clinic", log.LstdFlags)
	r := gin.Default()
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"POST", "GET", "OPTIONS", "PUT", "DELETE"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "User-Agent", "Referrer", "Host", "Token", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))
	dbConnection, err := repository.PostgreSQLConnection(l)
	if err != nil {
		l.Println("Error connecting to database")
	}
	authService := service.InitAuthService(l)
	authController := controller.InitAuthController(l, authService)

	appointmentRepo := repository.InitAppointmentRepo(l, dbConnection)
	appointmentService := service.InitAppointmentService(l, appointmentRepo)
	appointmentController := controller.InitAppointmentController(l, appointmentService)

	openApi := r.Group("/api")
	openApi.POST("/login", authController.Login)
	openApi.POST("/scheduleAppointment", appointmentController.ScheduleAppointment)
	openApi.GET("/getAllAppointments", appointmentController.GetAppointments)
	openApi.GET("/getClientAppointments", appointmentController.GetClientAppointments)
	openApi.DELETE("/cancelAppointment/:appointmentId", appointmentController.CancelAppointment)
	openApi.POST("/scheduleAppointmentAsDentist", appointmentController.ScheduleAppointmentAsDentist)

	server := &http.Server{
		Addr:           ":8081",
		Handler:        r,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	l.Println("Server listening on port 8081")
	go func() {
		err := server.ListenAndServe()
		if err != nil {
			l.Fatal(err)
		}
	}()
	sigChan := make(chan os.Signal)
	signal.Notify(sigChan, syscall.SIGINT, syscall.SIGTERM)

	sig := <-sigChan
	l.Println("Graceful shutdown", sig)

	tc, _ := context.WithTimeout(context.Background(), 30*time.Second)
	server.Shutdown(tc)

}
