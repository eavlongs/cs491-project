package main

import (
	"fmt"

	"github.com/eavlongs/core/config"
	"github.com/eavlongs/core/models"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func init() {
	if err := godotenv.Load(".env"); err != nil {
		fmt.Println(err)
		panic(err)
	}
}

func main() {
	var (
		db = config.ConnectDatabase()
	)

	defer func() {
		config.CloseDatabaseConnection(db)
	}()

	admins := []models.User{
		{
			Email:     "admin@gmail.com",
			Password:  "helloworld",
			FirstName: "Admin",
			LastName:  "User",
			IsAdmin:   true,
		}}

	for _, admin := range admins {
		var existingUser models.User
		if err := db.Where("email = ?", admin.Email).First(&existingUser).Error; err != nil {
			if err == gorm.ErrRecordNotFound {
				hashedPassword, err := bcrypt.GenerateFromPassword([]byte(admin.Password), bcrypt.DefaultCost)
				if err != nil {
					fmt.Printf("Failed to hash password: %v", err)
				}
				admin.Password = string(hashedPassword)
				if err := db.Create(&admin).Error; err != nil {
					fmt.Printf("Failed to create admin user: %v", err)
				}
			} else {
				fmt.Printf("Failed to check for existing user: %v", err)
			}
		} else {
			fmt.Printf("User with email %s already exists\n", admin.Email)
		}
	}
}
