package repository

import "dental_clinic/model"

type IAppointmentRepo interface {
	ScheduleAppointment(request *model.AppointmentRequest) error
	GetAppointments() ([]*model.Appointment, error)
	CancelAppointment(id string) error
}
