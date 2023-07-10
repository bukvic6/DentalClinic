package service

import (
	"dental_clinic/model"
	"dental_clinic/repository"
	"log"
	"net/smtp"
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

	from := "mailfortesting94@gmail.com"
	password := "oizguuxxzffjnvqb"
	to := []string{
		"bukvic6@gmail.com",
	}
	smtpHost := "smtp.gmail.com"
	smtpPort := "587"
	address := smtpHost + ":" + smtpPort
	var subject string
	var body string

	subject = "Dental_clinic"
	body = "Your reservation has been canceled"

	stringMsg :=
		"From: " + from + "\n" +
			"To: " + to[0] + "\n" +
			"Subject: " + subject + "\n\n" +
			body

	message := []byte(stringMsg)

	auth := smtp.PlainAuth("", from, password, smtpHost)
	err = smtp.SendMail(address, auth, from, to, message)
	if err != nil {
		log.Println("Error sending mail", err)
		return err
	}
	as.l.Println("Mail successfully sent")
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
func (as *AppointmentService) GetHour() (hour int, err error) {
	as.l.Println("Appointment Service - Change Hours needed for cancellation")
	preferences, err := as.repo.GetHour()
	if err != nil {
		return 0, err
	}
	return preferences.TimeNeededForCancellation, nil
}
