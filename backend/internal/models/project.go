package models

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/lib/pq"

	"github.com/dylancrter/wikitype/backend/db"
)

type Project struct {
	ID          int       `json:"id"`
	Title       string    `json:"title"`
	Description string    `json:"description"`
	Content     string    `json:"content"`
	Progress    int       `json:"progress"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

func GetProjectById(id int) (*Project, error) {
	var project *Project
	err := db.DB.QueryRow("SELECT * FROM projects WHERE id = ?", id).Scan(&project)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("project with id %d does not exist", id)
		}
		return nil, fmt.Errorf("could not retrieve project with id: %d", id)
	}
	return project, nil
}

func GetProjectByTitle(title string) (*Project, error) {
	var project *Project
	err := db.DB.QueryRow("SELECT * FROM projects WHERE title = ?", title).Scan(&project)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("project with title %s does not exist", title)
		}
		return nil, fmt.Errorf("could not retrieve project with title: %s", title)
	}
	return project, nil
}

// func CreateProject(project *Project) (*Project, error) {

// }
