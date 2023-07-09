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
	r.Use(cors.Default())

	dbConnection, err := repository.PostgreSQLConnection(l)
	if err != nil {
		l.Println("Error connecting to database")
	}
	authRepo := repository.InitAuthRepo(l, dbConnection)
	authService := service.InitAuthService(l, authRepo)
	authController := controller.InitAuthController(l, authService)

	appointmentRepo := repository.InitAppointmentRepo(l, dbConnection)
	appointmentService := service.InitAppointmentService(l, appointmentRepo)
	appointmentController := controller.InitAppointmentController(l, appointmentService)

	openApi := r.Group("/api")
	openApi.POST("/login", authController.Login)
	openApi.POST("/register", authController.Register)
	openApi.POST("/scheduleAppointment", appointmentController.ScheduleAppointment)
	openApi.GET("/getAllAppointments", appointmentController.GetAppointments)
	openApi.DELETE("/cancelAppointment/:appointmentId", appointmentController.CancelAppointment)

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
