package service

import (
	"dental_clinic/model"
	"dental_clinic/repository"
	"log"
)

type AppointmentService struct {
	l    *log.Logger
	repo repository.IAppointmentRepo
}

func InitAppointmentService(log *log.Logger, repo repository.IAppointmentRepo) *AppointmentService {
	return &AppointmentService{
		l:    log,
		repo: repo,
	}
}
func (as *AppointmentService) ScheduleAppointment(request *model.AppointmentRequest) error {
	as.l.Println("Appointment Service - ScheduleAppointment")
	err := as.repo.ScheduleAppointment(request)
	if err != nil {
		return err
	}
	return nil
}
func (as *AppointmentService) GetAppointments() ([]*model.Appointment, error) {

	as.l.Println("Appointment Service - GetAppointments")
	appointments, err := as.repo.GetAppointments()
	if err != nil {
		return nil, err
	}
	return appointments, nil
}
func (as *AppointmentService) CancelAppointment(id string) error {
	as.l.Println("Appointment Service - GetAppointments")
	err := as.repo.CancelAppointment(id)
	if err != nil {
		return err
	}
	return nil

}
func (as *AppointmentService) GetClientAppointments(email string) ([]*model.Appointment, error) {
	as.l.Println("Appointment Service - GetClientAppointments")
	appointments, err := as.repo.GetClientAppointments(email)
	if err != nil {
		return nil, err
	}
	return appointments, nil
}
func (as *AppointmentService) ChangeHoursForCancellation(neededHours string) error {
	as.l.Println("Appointment Service - Change Hours needed for cancellation")
	err := as.repo.ChangeHoursForCancellation(neededHours)
	if err != nil {
		return err
	}
	return nil
}
