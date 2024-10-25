CREATE TABLE IF NOT EXISTS project_content (
    project_id INT REFERENCES projects(id) ON DELETE CASCADE,
    content TEXT,
    PRIMARY KEY (project_id)
);