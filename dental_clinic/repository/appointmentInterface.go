package repository

import "dental_clinic/model"

type IAppointmentRepo interface {
	ScheduleAppointment(request *model.AppointmentRequest) error
	GetAppointments() ([]*model.Appointment, error)
	CancelAppointment(id string) error
	GetClientAppointments(email string) ([]*model.Appointment, error)
	ChangeHoursForCancellation(hours string) error
	GetHour() (preferences *model.Preferences, err error)
}
