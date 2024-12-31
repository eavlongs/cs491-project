package routes

import (
	"github.com/eavlongs/core/controllers"
	"github.com/eavlongs/core/middlewares"
	"github.com/gin-gonic/gin"
)

func RegisterMovieRoutes(router *gin.RouterGroup, c *controllers.MovieController, m *middlewares.MainMiddleware) {
	r := router.Group("/movies")
	r.POST("/create", m.IsAdmin(), c.Create)
	r.PATCH("/:id", m.IsAdmin(), c.Update)
	r.GET("/", c.GetAll)
	r.GET("/:id", c.GetOne)
	r.DELETE("/:id", m.IsAdmin(), c.Delete)

	r.POST("/:id/rate", m.IsUser(), c.Rate)
	r.DELETE("/:id/rate", m.IsUser(), c.DeleteRating)
}
