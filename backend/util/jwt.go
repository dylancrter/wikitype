package util

import (
	"context"
	"errors"
	"time"

	"github.com/golang-jwt/jwt"
)

var (
	ErrInvalidCredentials = errors.New("invalid credentials")
	ErrUnauthorized       = errors.New("unauthorized")
)

func GenerateJWT(userID int, secret string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": userID,
		"exp":     time.Now().Add(time.Hour * 24).Unix(),
	})

	tokenString, err := token.SignedString([]byte(secret))
	if err != nil {
		return "", err
	}
	return tokenString, nil
}

func ValidateJWT(tokenString string, secret string) (int, error) {
	type MyClaims struct {
		UserID int `json:"user_id"`
		jwt.StandardClaims
	}

	claims := &MyClaims{}

	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		if token.Method.Alg() != jwt.SigningMethodHS256.Alg() {
			return nil, errors.New("unexpected signing method")
		}
		return []byte(secret), nil
	})

	if err != nil {
		return 0, err
	}

	if token.Valid {
		return claims.UserID, nil
	} else {
		return 0, errors.New("invalid token")
	}
}

func GetUserIDFromContext(ctx context.Context) (int, error) {
	userID, ok := ctx.Value("userID").(int)
	if !ok {
		return 0, ErrUnauthorized
	}
	return userID, nil
}
