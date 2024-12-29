package models

import "time"

type Movie struct {
	ID             uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Genres         string    `gorm:"type:varchar(100)" json:"genres"`
	AgeRestriction string    `gorm:"type:varchar(10)" json:"age_restriction"`
	Title          string    `gorm:"type:varchar(200);not null" json:"title"`
	Description    string    `gorm:"type:text" json:"description"`
	PosterURL      string    `gorm:"type:varchar(255)" json:"poster_url"`
	Director       string    `gorm:"type:varchar(100)" json:"director"`
	Writers        string    `gorm:"type:text" json:"writers"`
	Cast           string    `gorm:"type:text" json:"cast"`
	ReleaseDate    time.Time `gorm:"type:date" json:"release_date"`
	MovieDuration  int       `gorm:"not null" json:"movie_duration"` // duration in minutes
	TrailerURL     string    `gorm:"type:varchar(255)" json:"trailer_url"`

	Ratings         []Rating `gorm:"foreignKey:MovieID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE" json:"ratings"`
	AverageRating   float32  `gorm:"type:numeric(2,2);default:0;column:avg_rating" json:"avg_rating"`
	NumberOfRatings int      `gorm:"default:0;column:rating_count" json:"number_of_ratings"`
}
