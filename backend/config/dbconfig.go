package config

type PostgresConfig struct {
	Host     string
	Port     int
	User     string
	Password string
	DBName   string
}

var DatabaseConfig PostgresConfig = PostgresConfig{
	Host:     "localhost",
	Port:     5432,
	User:     "your-user",
	Password: "your-password",
	DBName:   "your-db-name",
}
