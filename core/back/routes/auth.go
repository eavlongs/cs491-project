package routes

import (
	"github.com/eavlongs/core/controllers"
	"github.com/eavlongs/core/middlewares"
	"github.com/gin-gonic/gin"
)

func RegisterAuthRoutes(router *gin.RouterGroup, c *controllers.AuthController, m *middlewares.MainMiddleware) {
	r := router.Group("/auth")
	r.POST("/register", c.Register)
	r.POST("/login", c.Login)
	r.GET("/test-user", m.IsUser(), func(ctx *gin.Context) {})
	r.GET("/test-admin", m.IsAdmin(), func(ctx *gin.Context) {})
}
