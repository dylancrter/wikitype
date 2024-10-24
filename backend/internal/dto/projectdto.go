package dto

type CreateProjectDTO struct {
	Title       string
	Description string
	Content     string
	Progress    int
}

type DeleteProjectDTO struct {
	ID int
}
