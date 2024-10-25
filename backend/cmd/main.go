package main

import (
	"log"
	"net/http"

	"github.com/dylancrter/wikitype/backend/db"
	"github.com/dylancrter/wikitype/backend/internal/handlers"
	"github.com/gorilla/mux"

	_ "github.com/lib/pq"
)

func main() {
	db.InitDB()

	router := mux.NewRouter()

	router.HandleFunc("/project", handlers.GetProjects).Methods("GET")
	router.HandleFunc("/project/id", handlers.GetProjectById).Methods("GET")
	router.HandleFunc("/project/title", handlers.GetProjectByTitle).Methods("GET")
	router.HandleFunc("/project-content/id", handlers.GetProjectContentById).Methods("GET")
	router.HandleFunc("/project", handlers.CreateProject).Methods("POST")
	router.HandleFunc("/project", handlers.DeleteProject).Methods("DELETE")

	log.Fatal(http.ListenAndServe(":8080", router))
}
