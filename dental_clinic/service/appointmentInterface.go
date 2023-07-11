package service

import "dental_clinic/model"

type IAppointmentService interface {
	ScheduleAppointment(request *model.AppointmentRequest) error
	GetAppointments() ([]*model.Appointment, error)
	CancelAppointment(id string) error
	GetClientAppointments(email string) ([]*model.Appointment, error)
	ChangeHoursForCancellation(neededHours string) error
	GetHour() (hour int, err error)
	GetFutureAppointments() ([]*model.FutureAppointments, error)
}
