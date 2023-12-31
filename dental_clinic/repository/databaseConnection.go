package repository

import (
	"dental_clinic/model"
	"fmt"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	gorm_logger "gorm.io/gorm/logger"
	"log"
)

func PostgreSQLConnection(l *log.Logger) (*gorm.DB, error) {
	l.Println("PostgreSQL")
	dsn := fmt.Sprintf("host=postgres user=postgres dbname=postgres sslmode=disable password=notSoSecretPassword port=5432")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{
		Logger: gorm_logger.Default.LogMode(gorm_logger.Info),
	})
	if err != nil {
		log.Printf("Error establishing a database connection")
		panic("Failed to connect to database")
	}
	setup(db)
	l.Println("Successfully connected to postgres database")
	return db, nil
}
func setup(db *gorm.DB) {
	db.AutoMigrate(&model.Preferences{})
	var preferences model.Preferences
	db.First(&preferences, 1)
	if preferences.Id == 0 {
		db.Create(&model.Preferences{
			Id:                        1,
			TimeNeededForCancellation: 24,
		})
	}
	err := db.AutoMigrate(&model.Appointment{})
	if err != nil {
		log.Println("Error initializing table")
	}
}
