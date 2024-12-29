package models

type Rating struct {
	ID          uint `gorm:"primaryKey;autoIncrement" json:"id"`
	UserID      uint `gorm:"not null" json:"user_id"`
	MovieID     uint `gorm:"not null" json:"movie_id"`
	RatingPoint uint `gorm:"type:smallint;not null" json:"rating_point"`

	User  User  `gorm:"foreignKey:UserID" json:"user"`
	Movie Movie `gorm:"foreignKey:MovieID" json:"movie"`
}
