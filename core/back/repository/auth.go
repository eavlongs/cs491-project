package repository

import (
	"github.com/eavlongs/core/models"
	"gorm.io/gorm"
)

type AuthRepository struct {
	db *gorm.DB
}

func NewAuthRepository(db *gorm.DB) *AuthRepository {
	return &AuthRepository{db: db}
}

func (r *AuthRepository) CreateUser(user *models.User) error {
	return r.db.Create(user).Error
}

func (r *AuthRepository) FindUser(email string, user *models.User) error {
	return r.db.Where("email = ?", email).First(user).Error
}
