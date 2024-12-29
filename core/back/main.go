package main

import (
	"fmt"
	"log"
	"os"

	"github.com/eavlongs/core/config"
	"github.com/eavlongs/core/controllers"
	"github.com/eavlongs/core/middlewares"
	"github.com/eavlongs/core/repository"
	"github.com/eavlongs/core/routes"
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
		mainMiddleware  = middlewares.NewMainMiddleware(db)
		AuthRepository  = repository.NewAuthRepository(db)
		MovieRepository = repository.NewMovieRepository(db)

		AuthController  = controllers.NewAuthController(AuthRepository)
		MovieController = controllers.NewMovieController(MovieRepository)
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

	routes.RegisterAuthRoutes(routerGroup, AuthController, mainMiddleware)
	routes.RegisterMovieRoutes(routerGroup, MovieController, mainMiddleware)

	port := os.Getenv("API_PORT")
	if err := router.Run("127.0.0.1:" + port); err != nil {
		// if err := route.Run(":" + port); err != nil {
		log.Fatalf("error running server: %v", err)
	}
}
