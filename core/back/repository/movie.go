package repository

import (
	"github.com/eavlongs/core/models"
	"gorm.io/gorm"
)

type MovieRepository struct {
	db *gorm.DB
}

func NewMovieRepository(db *gorm.DB) *MovieRepository {
	return &MovieRepository{db: db}
}

func (r *MovieRepository) Create(movie *models.Movie) error {
	return r.db.Create(movie).Error
}

func (r *MovieRepository) GetAll() ([]models.Movie, error) {
	var movies []models.Movie
	err := r.db.Model(&models.Movie{}).
		Select("movies.*, COALESCE(AVG(ratings.rating_point), 0) as avg_rating, COALESCE(COUNT(ratings.rating_point), 0) as rating_count").
		Joins("LEFT JOIN ratings ON ratings.movie_id = movies.id").
		Group("movies.id").
		Find(&movies).Error
	return movies, err
}

func (r *MovieRepository) Update(movie *models.Movie) error {
	return r.db.Model(movie).Updates(movie).Error
}

func (r *MovieRepository) Delete(id uint) error {
	return r.db.Where("id = ?", id).Delete(&models.Movie{}).Error
}

func (r *MovieRepository) Rate(userID uint, movieID uint, rating uint) error {
	var existingRating models.Rating

	if err := r.db.Where("user_id = ? AND movie_id = ?", userID, movieID).First(&existingRating).Error; err == nil {
		return r.db.Model(&existingRating).Update("rating_point", rating).Error
	}

	return r.db.Create(&models.Rating{
		UserID:      userID,
		MovieID:     movieID,
		RatingPoint: rating,
	}).Error
}

func (r *MovieRepository) DeleteRating(userID uint, movieID uint) error {
	return r.db.Where("user_id = ? AND movie_id = ?", userID, movieID).Delete(&models.Rating{}).Error
}
