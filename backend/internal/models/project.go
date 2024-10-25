package models

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"strings"
	"time"

	_ "github.com/lib/pq"

	"github.com/dylancrter/wikitype/backend/db"
	"github.com/dylancrter/wikitype/backend/internal/dto"
)

type Project struct {
	ID        int       `json:"id"`
	Title     string    `json:"title"`
	Progress  int       `json:"progress"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
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

	url := projectdto.Link
	title := url[strings.LastIndex(url, "/")+1:]

	resp, err := http.Get(fmt.Sprintf("https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exlimit=max&explaintext&titles=%s", title))
	if err != nil {
		return 0, fmt.Errorf("AddProject: %s", err.Error())
	}

	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return 0, fmt.Errorf("AddProject: %s", err.Error())
	}

	var result map[string]interface{}
	err = json.Unmarshal(body, &result)
	if err != nil {
		return 0, fmt.Errorf("AddProject: %s", err.Error())
	}

	query, ok := result["query"].(map[string]interface{})
	if !ok {
		return 0, fmt.Errorf("AddProject: error with query result")
	}

	pages, ok := query["pages"].(map[string]interface{})
	if !ok {
		return 0, fmt.Errorf("AddProject: error with pages result")
	}

	var extract string
	for _, page := range pages {
		pageMap, ok := page.(map[string]interface{})
		if !ok {
			return 0, fmt.Errorf("AddProject: error with pageMap result")
		}

		extract, ok = pageMap["extract"].(string)
		if !ok {
			return 0, fmt.Errorf("AddProject: error with extract result")
		}

		break
	}

	err = db.DB.QueryRow(
		"INSERT INTO projects (title, progress, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING id",
		title,
		0,
		time.Now(),
		time.Now(),
	).Scan(&id)

	if err != nil {
		return 0, fmt.Errorf("AddProject: %s", err.Error())
	}

	id, err = AddProjectContent(id, extract)
	if err != nil {
		return 0, fmt.Errorf("AddProject: %s", err)
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
