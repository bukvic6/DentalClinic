package service

import "dental_clinic/model"

type IAppointmentService interface {
	ScheduleAppointment(request *model.AppointmentRequest) error
	GetAppointments() ([]*model.Appointment, error)
	CancelAppointment(id string) error
}
