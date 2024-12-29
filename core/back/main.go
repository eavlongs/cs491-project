package main

import (
	"fmt"
	"log"
	"os"

	"github.com/eavlongs/go_backend_template/config"
	"github.com/eavlongs/go_backend_template/controllers"
	"github.com/eavlongs/go_backend_template/middlewares"
	"github.com/eavlongs/go_backend_template/repository"
	"github.com/eavlongs/go_backend_template/routes"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
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
		// db             *gorm.DB
		mainMiddleware = middlewares.NewMainMiddleware(db)
		mainRepository = repository.NewMainRepository(db)
		mainController = controllers.NewMainController(mainRepository)
	)

	defer func() {
		config.CloseDatabaseConnection(db)
	}()

	router := gin.Default()
	corsConfig := cors.DefaultConfig()
	corsConfig.AllowOrigins = []string{"http://localhost:3000"}
	corsConfig.AllowHeaders = []string{"Origin", "Content-Length", "Content-Type", "Authorization"}
	corsConfig.AllowMethods = []string{"GET", "POST", "PATCH", "DELETE"}

	router.Use(cors.New(corsConfig))

	routePrefix := os.Getenv("API_ROUTE_PREFIX")
	routerGroup := router.Group(routePrefix)

	routes.RegisterMainRoutes(routerGroup, mainController, mainMiddleware)

	port := os.Getenv("API_PORT")
	if err := router.Run("127.0.0.1:" + port); err != nil {
		// if err := route.Run(":" + port); err != nil {
		log.Fatalf("error running server: %v", err)
	}
}
