package main

import (
	"database/sql"
	"fmt"

	"github.com/dylancrter/wikitype/backend/config"

	_ "github.com/lib/pq"
)

var (
	host     = config.DatabaseConfig.Host
	port     = config.DatabaseConfig.Port
	user     = config.DatabaseConfig.User
	password = config.DatabaseConfig.Password
	dbname   = config.DatabaseConfig.DBName
)

func main() {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+
		"password=%s dbname=%s sslmode=disable",
		host, port, user, password, dbname)
	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		fmt.Println("Database connection unsuccessful. Panicing!")
		panic(err)
	}
	defer db.Close()

	err = db.Ping()
	if err != nil {
		panic(err)
	}
	fmt.Println("Connection successful!")
}
