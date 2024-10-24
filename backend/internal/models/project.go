package models

import (
	"database/sql"
	"fmt"
	"time"

	_ "github.com/lib/pq"

	"github.com/dylancrter/wikitype/backend/db"
	"github.com/dylancrter/wikitype/backend/internal/dto"
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

func GetProjects() ([]Project, error) {
	var projects []Project

	rows, err := db.DB.Query("SELECT * from projects")
	if err != nil {
		return nil, fmt.Errorf("could not retrieve projects: %s", err)
	}
	defer rows.Close()

	for rows.Next() {
		var project Project
		err := rows.Scan(
			&project.ID,
			&project.Title,
			&project.Description,
			&project.Content,
			&project.Progress,
			&project.CreatedAt,
			&project.UpdatedAt,
		)
		if err != nil {
			return nil, fmt.Errorf("error scanning project: %v", err)
		}
		projects = append(projects, project)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("error iterating over project rows: %v", err)
	}

	return projects, nil
}

func GetProjectById(id int) (*Project, error) {
	project := &Project{}

	err := db.DB.QueryRow("SELECT * FROM projects WHERE id = $1", id).Scan(
		&project.ID,
		&project.Title,
		&project.Description,
		&project.Content,
		&project.Progress,
		&project.CreatedAt,
		&project.UpdatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("project with id %d does not exist", id)
		}
		return nil, fmt.Errorf("could not retrieve project with id: %d", id)
	}

	return project, nil
}

func GetProjectByTitle(title string) (*Project, error) {
	project := &Project{}

	err := db.DB.QueryRow("SELECT * FROM projects WHERE title = $1", title).Scan(
		&project.ID,
		&project.Title,
		&project.Description,
		&project.Content,
		&project.Progress,
		&project.CreatedAt,
		&project.UpdatedAt,
	)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("project with title %s does not exist", title)
		}
		return nil, fmt.Errorf("could not retrieve project with title: %s", title)
	}

	return project, nil
}

func AddProject(projectdto *dto.CreateProjectDTO) (int64, error) {
	var id int64

	err := db.DB.QueryRow(
		"INSERT INTO projects (title, description, content, progress, created_at, updated_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id",
		projectdto.Title,
		projectdto.Description,
		projectdto.Content,
		projectdto.Progress,
		time.Now(),
		time.Now(),
	).Scan(&id)

	if err != nil {
		return 0, fmt.Errorf("AddProject: %s", err.Error())
	}

	return id, nil
}

func DeleteProject(id int) (int, error) {
	_, err := db.DB.Exec("DELETE from projects WHERE id = $1", id)
	if err != nil {
		return 0, fmt.Errorf("DeleteProject: %s", err.Error())
	}

	return id, nil
}
