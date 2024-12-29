package models

type User struct {
	ID        uint   `gorm:"primaryKey;autoIncrement" json:"id"`
	Email     string `gorm:"type:varchar(100);unique;not null" json:"email"`
	Password  string `gorm:"type:varchar(100);not null" json:"password"`
	FirstName string `gorm:"type:varchar(100)" json:"first_name"`
	LastName  string `gorm:"type:varchar(100)" json:"last_name"`
	IsAdmin   bool   `gorm:"default:false" json:"is_admin"`

	Ratings []Rating `gorm:"foreignKey:UserID;constraint:OnUpdate:CASCADE,OnDelete:CASCADE" json:"ratings"`
}
