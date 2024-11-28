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
	sslmode  = config.DatabaseConfig.SSLMode
)

// db/db.go
func InitDB() {
	var err error

	// Unix socket connection
	psqlInfo := fmt.Sprintf(
		"host=/tmp user=%s dbname=%s sslmode=disable",
		user, dbname,
	)

	log.Printf("Attempting connection with Unix socket")

	if DB, err = sql.Open("postgres", psqlInfo); err != nil {
		log.Fatalf("Error opening database: %v\n", err)
	}

	if err = DB.Ping(); err != nil {
		log.Fatalf("Cannot connect to the database: %v\n", err)
	}

	// Verify table exists with direct query
	var tableExists int
	err = DB.QueryRow(`
        SELECT COUNT(*)
        FROM pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE n.nspname = 'public'
        AND c.relname = 'projects'
        AND c.relkind = 'r'
    `).Scan(&tableExists)

	if err != nil {
		log.Fatalf("Error checking table existence: %v\n", err)
	}

	log.Printf("Found %d projects tables", tableExists)

	if tableExists == 0 {
		log.Fatalf("Table 'projects' not found in public schema")
	}

	log.Println("Database connection successful!")
}
