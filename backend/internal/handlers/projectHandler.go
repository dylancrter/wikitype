package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/dylancrter/wikitype/backend/internal/dto"
	"github.com/dylancrter/wikitype/backend/internal/models"
)

func GetProjectById(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, "Missing id query parameter", http.StatusBadRequest)
		return
	}

	intId, err := strconv.Atoi(id)
	if err != nil {
		http.Error(w, "id is incorrect", http.StatusBadRequest)
		return
	}

	project, err := models.GetProjectById(intId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(project)
	if err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}

func GetProjectByTitle(w http.ResponseWriter, r *http.Request) {
	title := r.URL.Query().Get("title")
	if title == "" {
		http.Error(w, "Missing title query parameter", http.StatusBadRequest)
		return
	}

	project, err := models.GetProjectByTitle(title)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(project)
	if err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}

func GetProjects(w http.ResponseWriter, r *http.Request) {
	projects, err := models.GetProjects()
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(projects)
	if err != nil {
		http.Error(w, "Failed to encode response", http.StatusInternalServerError)
		return
	}
}

func CreateProject(w http.ResponseWriter, r *http.Request) {
	var projectDTO dto.CreateProjectDTO
	err := json.NewDecoder(r.Body).Decode(&projectDTO)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	id, err := models.AddProject(&projectDTO)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"id": id,
	}
	json.NewEncoder(w).Encode(response)
}

func DeleteProject(w http.ResponseWriter, r *http.Request) {
	var projectDTO dto.DeleteProjectDTO
	err := json.NewDecoder(r.Body).Decode(&projectDTO)
	if err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}

	id, err := models.DeleteProject(projectDTO.ID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	response := map[string]interface{}{
		"id": id,
	}
	json.NewEncoder(w).Encode(response)
}
