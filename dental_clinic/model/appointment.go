package model

import "time"

type Appointment struct {
	Id        string    `json:"event_id" gorm:"primaryKey"`
	UserEmail string    `json:"title"`
	StartDate time.Time `json:"start"`
	EndDate   time.Time `json:"end"`
}

type AppointmentRequest struct {
	UserEmail string    `json:"title"`
	StartDate time.Time `json:"start"`
	EndDate   time.Time `json:"end"`
}
type FutureAppointments struct {
	StartDate time.Time `json:"start"`
	EndDate   time.Time `json:"end"`
}
type CancelAppointmentRequest struct {
	UserEmail string `json:"user_email"`
	StartDate string `json:"start"`
}
