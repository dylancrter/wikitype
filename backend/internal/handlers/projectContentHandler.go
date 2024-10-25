package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/dylancrter/wikitype/backend/internal/models"
)

func GetProjectContentById(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	if id == "" {
		http.Error(w, "Missing id query parameter", http.StatusBadRequest)
		return
	}

	intId, err := strconv.Atoi(id)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	projectContent, err := models.GetProjectContentById(intId)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(projectContent)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
