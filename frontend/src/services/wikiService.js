const API_BASE_URL = 'http://localhost:8080';

// Helper function for delay
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

// Helper function for API calls with error handling
const fetchWithErrorHandling = async (url, options = {}) => {
  const response = await fetch(url, options);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API call failed: ${response.status} - ${errorText}`);
  }
  return response.json();
};

// Get content for a specific project by ID
export const fetchProjectContent = async (projectId) => {
  try {
    const data = await fetchWithErrorHandling(
      `${API_BASE_URL}/project-content/id?id=${projectId}`
    );
    return {
      id: data.id,
      project_id: data.project_id,
      content: data.content || ''
    };
  } catch (error) {
    console.error('Error fetching project content:', error);
    throw error;
  }
};

// Create new project from Wikipedia URL
export const createWikiProject = async (wikiUrl) => {
  try {
    const project = await fetchWithErrorHandling(
      `${API_BASE_URL}/project`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ link: wikiUrl }),
      }
    );
    
    await delay(2000);
    
    const content = await fetchProjectContent(project.id);
    
    return {
      ...project,
      content: content.content
    };
  } catch (error) {
    console.error('Error creating wiki project:', error);
    throw error;
  }
};

// Get project by ID with its content
export const fetchWikiProject = async (projectId) => {
  try {
    const [project, content] = await Promise.all([
      fetchWithErrorHandling(`${API_BASE_URL}/project/id?id=${projectId}`),
      fetchProjectContent(projectId)
    ]);
    
    return {
      ...project,
      content: content.content
    };
  } catch (error) {
    console.error('Error fetching wiki project:', error);
    throw error;
  }
};

// Get project by title with its content
export const getProjectByTitle = async (title) => {
  try {
    const project = await fetchWithErrorHandling(
      `${API_BASE_URL}/project/title?title=${encodeURIComponent(title)}`
    );
    const content = await fetchProjectContent(project.id);
    
    return {
      ...project, 
      content: content.content
    };
  } catch (error) {
    console.error('Error fetching project by title:', error);
    throw error;
  }
};

// Get all projects (without content)
export const getAllProjects = async () => {
  try {
    return await fetchWithErrorHandling(`${API_BASE_URL}/project`);
  } catch (error) {
    console.error('Error fetching all projects:', error);
    throw error;
  }
};

// Delete a project by ID
export const deleteProject = async (projectId) => {
  try {
    return await fetchWithErrorHandling(
      `${API_BASE_URL}/project`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: projectId }),
      }
    );
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};