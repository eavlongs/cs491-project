package middlewares

import (
	"errors"
	"strings"

	"github.com/eavlongs/core/utils"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type MainMiddleware struct {
	db *gorm.DB
}

func NewMainMiddleware(db *gorm.DB) *MainMiddleware {
	return &MainMiddleware{db: db}
}

func (m *MainMiddleware) TestFail(ctx *gin.Context) {
	utils.RespondWithUnauthorizedError(ctx)
	ctx.Abort()
}

func (m *MainMiddleware) TestSuccess(ctx *gin.Context) {
	ctx.Next()
}

func (m *MainMiddleware) IsUser() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		claims, err := getLoggedInUserClaims(ctx)

		if err != nil {
			utils.RespondWithBadRequestError(ctx, err.Error())
			ctx.Abort()
		}
		ctx.Set("_auth_user_id", claims.ID)
		ctx.Next()
	}
}

func (m *MainMiddleware) IsAdmin() gin.HandlerFunc {
	return func(ctx *gin.Context) {
		claims, err := getLoggedInUserClaims(ctx)

		if err != nil {
			utils.RespondWithBadRequestError(ctx, err.Error())
			ctx.Abort()
		}

		if !claims.IsAdmin {
			utils.RespondWithUnauthorizedError(ctx)
			ctx.Abort()
			return
		}

		ctx.Set("_auth_user_id", claims.ID)
		ctx.Next()
	}
}

func getLoggedInUserClaims(ctx *gin.Context) (*utils.Claims, error) {
	tokenString := ctx.GetHeader("Authorization")
	if tokenString == "" || !strings.HasPrefix(tokenString, "Bearer ") {
		return nil, errors.New("authorization header missing or invalid")
	}
	tokenString = strings.TrimPrefix(tokenString, "Bearer ")

	claims, err := utils.ParseJWT(tokenString)
	if err != nil {
		return nil, errors.New("invalid or expired token")
	}

	return claims, nil
}
