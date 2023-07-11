package repository

import (
	"dental_clinic/model"
	uuid2 "github.com/satori/go.uuid"
	"gorm.io/gorm"
	"log"
	"time"
)

type AppointmentRepository struct {
	l  *log.Logger
	db *gorm.DB
}

func InitAppointmentRepo(log *log.Logger, dbConn *gorm.DB) *AppointmentRepository {
	return &AppointmentRepository{
		l:  log,
		db: dbConn,
	}
}
func (ar *AppointmentRepository) ScheduleAppointment(request *model.AppointmentRequest) error {
	ar.l.Println("Appointment Repository - ScheduleAppointment")
	uuid := uuid2.NewV4().String()
	createAppointment := ar.db.Create(&model.Appointment{
		Id:        uuid,
		UserEmail: request.UserEmail,
		StartDate: request.StartDate,
		EndDate:   request.EndDate,
	})
	errorMessage := createAppointment.Error
	if errorMessage != nil {
		ar.l.Printf("Unable to schedule appointment: %s", errorMessage)
		return errorMessage
	}
	return nil
}
func (ar *AppointmentRepository) GetAppointments() ([]*model.Appointment, error) {
	ar.l.Println("Appointment Repository - GetAppointments")

	var appointments []*model.Appointment
	if err := ar.db.Table("appointments").Find(&appointments).Error; err != nil {
		return nil, err
	}
	return appointments, nil
}
func (ar *AppointmentRepository) CancelAppointment(id string) error {
	ar.l.Println("Appointment Repository - CancelAppointment")
	appointment := &model.Appointment{}
	ar.l.Println(id)
	err := ar.db.Where("Id = ?", id).Delete(appointment).Error
	if err != nil {
		ar.l.Println("Error canceling appointment")
		return err
	}
	return nil
}
func (ar *AppointmentRepository) GetClientAppointments(email string) ([]*model.Appointment, error) {
	ar.l.Println("Appointment Repository - GetClientAppointments")

	var appointments []*model.Appointment
	if err := ar.db.Where("User_Email = ?", email).Order("start_date DESC").Find(&appointments).Error; err != nil {
		return nil, err
	}
	return appointments, nil
}
func (ar *AppointmentRepository) ChangeHoursForCancellation(hours string) error {
	ar.l.Println("Appointment Repository - GetClientAppointments")

	var preferences *model.Preferences
	if err := ar.db.Model(&preferences).Where("id = ?", 1).Update("time_needed_for_cancellation", hours).Error; err != nil {
		return err
	}
	return nil
}
func (ar *AppointmentRepository) GetHour() (preferences *model.Preferences, err error) {
	ar.l.Println("Appointment Repository - GetClientAppointments")

	hour := &model.Preferences{}

	if err := ar.db.Where("Id = ?", 1).First(hour).Error; err != nil {
		return nil, err
	}

	return hour, nil
}
func (ar *AppointmentRepository) GetFutureAppointments() ([]*model.FutureAppointments, error) {
	ar.l.Println("Appointment Repository - Future Appointments")
	dateNow := time.Now()
	ar.l.Println(dateNow)
	var appointments []*model.FutureAppointments
	if err := ar.db.Table("appointments").Where("start_date > ?", dateNow).Find(&appointments).Error; err != nil {
		return nil, err
	}
	return appointments, nil
}
