package db

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/dylancrter/wikitype/backend/config"
	_ "github.com/lib/pq"
)

var (
	DB       *sql.DB
	host     = config.DatabaseConfig.Host
	port     = config.DatabaseConfig.Port
	user     = config.DatabaseConfig.User
	password = config.DatabaseConfig.Password
	dbname   = config.DatabaseConfig.DBName
)

func InitDB() {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	DB, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		log.Fatalf("Error opening database: %v\n", err)
	}

	if err = DB.Ping(); err != nil {
		log.Fatalf("Cannot connect to the database: %v\n", err)
	}
	fmt.Println("Connection successful!")
}
