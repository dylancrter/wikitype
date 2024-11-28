package models

import (
	"fmt"

	"github.com/dylancrter/wikitype/backend/db"
)

type ProjectContent struct {
	ID        int    `json:"id"`
	ProjectID int    `json:"project_id"`
	Content   string `json:"content"`
}

func GetProjectContentById(id int) (*ProjectContent, error) {
	projectContent := &ProjectContent{}

	err := db.DB.QueryRow("SELECT * from project_content where project_id = $1", id).Scan(
		&projectContent.ID,
		&projectContent.ProjectID,
		&projectContent.Content,
	)
	if err != nil {
		return nil, fmt.Errorf("GetProjectContentById: %s", err.Error())
	}

	return projectContent, nil
}

func GetProjectContentByTitle(title string) (*ProjectContent, error) {
	project, err := GetProjectByTitle(title)
	if err != nil {
		return nil, fmt.Errorf("GetProjectContentByTitle: %s", err.Error())
	}

	projectContent, err := GetProjectContentById(project.ID)
	if err != nil {
		return nil, fmt.Errorf("GetProjectContentByTitle: %s", err.Error())
	}

	return projectContent, nil
}

func AddProjectContent(id int64, content string) (int64, error) {
	var contentID int64

	err := db.DB.QueryRow(
		"INSERT INTO project_content (project_id, content) VALUES ($1, $2) RETURNING project_id",
		id,
		content,
	).Scan(&contentID)
	if err != nil {
		return 0, fmt.Errorf("AddProjectContent: %s", err.Error())
	}

	return contentID, nil
}
