package controllers

import (
	"strconv"
	"time"

	"github.com/eavlongs/core/models"
	"github.com/eavlongs/core/repository"
	"github.com/eavlongs/core/utils"
	"github.com/gin-gonic/gin"
)

type MovieController struct {
	repo *repository.MovieRepository
}

func NewMovieController(repo *repository.MovieRepository) *MovieController {
	return &MovieController{repo: repo}
}

func (c *MovieController) Create(ctx *gin.Context) {
	var req CreateMovieRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		utils.RespondWithBadRequestError(ctx, err.Error())
		return
	}

	// parse release date
	releaseDate, err := time.Parse("2006-01-02", req.ReleaseDate)

	if err != nil {
		utils.RespondWithBadRequestError(ctx, "Invalid release date format. Use YYYY-MM-DD")
		return
	}

	movie := &models.Movie{
		Genres:         req.Genres,
		AgeRestriction: req.AgeRestriction,
		Title:          req.Title,
		Description:    req.Description,
		PosterURL:      req.PosterURL,
		Director:       req.Director,
		Writers:        req.Writers,
		Cast:           req.Cast,
		ReleaseDate:    releaseDate,
		MovieDuration:  req.MovieDuration,
		TrailerURL:     req.TrailerURL,
	}

	if err := c.repo.Create(movie); err != nil {
		utils.RespondWithBadRequestError(ctx, err.Error())
		return
	}

	utils.RespondWithSuccess(ctx, movie)
}

func (c *MovieController) Update(ctx *gin.Context) {
	id := ctx.Param("id")

	var req UpdateMovieRequest
	if err := ctx.ShouldBindJSON(&req); err != nil {
		utils.RespondWithBadRequestError(ctx, err.Error())
		return
	}

	// parse release date
	releaseDate, err := time.Parse("2006-01-02", req.ReleaseDate)

	if err != nil {
		utils.RespondWithBadRequestError(ctx, "Invalid release date format. Use YYYY-MM-DD")
		return
	}

	movie := &models.Movie{
		Genres:         req.Genres,
		AgeRestriction: req.AgeRestriction,
		Title:          req.Title,
		Description:    req.Description,
		PosterURL:      req.PosterURL,
		Director:       req.Director,
		Writers:        req.Writers,
		Cast:           req.Cast,
		ReleaseDate:    releaseDate,
		MovieDuration:  req.MovieDuration,
		TrailerURL:     req.TrailerURL,
	}

	uintID, err := strconv.ParseUint(id, 10, 64)
	if uintID == 0 {
		utils.RespondWithBadRequestError(ctx, "Invalid ID")
		return
	}

	movie.ID = uint(uintID)

	if err := c.repo.Update(movie); err != nil {
		utils.RespondWithBadRequestError(ctx, err.Error())
		return
	}

	utils.RespondWithSuccess(ctx, movie)
}

func (c *MovieController) GetAll(ctx *gin.Context) {
	movies, err := c.repo.GetAll()
	if err != nil {
		utils.RespondWithBadRequestError(ctx, err.Error())
		return
	}

	utils.RespondWithSuccess(ctx, movies)
}

func (c *MovieController) Delete(ctx *gin.Context) {
	id := ctx.Param("id")
	uintID, _ := strconv.ParseUint(id, 10, 64)
	if uintID == 0 {
		utils.RespondWithBadRequestError(ctx, "Invalid ID")
		return
	}

	if err := c.repo.Delete(uint(uintID)); err != nil {
		utils.RespondWithBadRequestError(ctx, err.Error())
		return
	}

	utils.RespondWithSuccess(ctx, "Movie deleted successfully")
}

func (c *MovieController) Rate(ctx *gin.Context) {
	id := ctx.Param("id")
	uintID, _ := strconv.ParseUint(id, 10, 64)

	var req struct {
		Rating int `json:"rating" binding:"required"`
	}

	if uintID == 0 {
		utils.RespondWithBadRequestError(ctx, "Invalid ID")
		return
	}

	if err := ctx.ShouldBindJSON(&req); err != nil {
		utils.RespondWithBadRequestError(ctx, err.Error())
		return
	}

	if req.Rating < 1 || req.Rating > 5 {
		utils.RespondWithBadRequestError(ctx, "Rating must be between 1 and 5")
		return
	}

	err := c.repo.Rate(ctx.Keys["_auth_user_id"].(uint), uint(uintID), uint(req.Rating))
	if err != nil {
		utils.RespondWithBadRequestError(ctx, err.Error())
		return
	}

	utils.RespondWithSuccess(ctx, "Movie rated successfully")
}

func (c *MovieController) DeleteRating(ctx *gin.Context) {
	id := ctx.Param("id")
	uintID, _ := strconv.ParseUint(id, 10, 64)

	if uintID == 0 {
		utils.RespondWithBadRequestError(ctx, "Invalid ID")
		return
	}

	err := c.repo.DeleteRating(ctx.Keys["_auth_user_id"].(uint), uint(uintID))
	if err != nil {
		utils.RespondWithBadRequestError(ctx, err.Error())
		return
	}

	utils.RespondWithSuccess(ctx, "Rating deleted successfully")
}

type CreateMovieRequest struct {
	Genres         string `json:"genres" binding:"required"`
	AgeRestriction string `json:"age_restriction" binding:"required"`
	Title          string `json:"title" binding:"required"`
	Description    string `json:"description" binding:"required"`
	PosterURL      string `json:"poster_url" binding:"required"`
	Director       string `json:"director" binding:"required"`
	Writers        string `json:"writers" binding:"required"`
	Cast           string `json:"cast" binding:"required"`
	ReleaseDate    string `json:"release_date" binding:"required"`
	MovieDuration  int    `json:"movie_duration" binding:"required"`
	TrailerURL     string `json:"trailer_url" binding:"required"`
}

type UpdateMovieRequest CreateMovieRequest
