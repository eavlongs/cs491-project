package main

import (
	"fmt"

	"github.com/eavlongs/core/config"
	"github.com/eavlongs/core/models"
	"github.com/joho/godotenv"
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

	db.AutoMigrate(&models.User{}, &models.Movie{}, &models.Rating{})
}
