const API_BASE_URL = 'http://localhost:8080/api';

export const fetchWikiProject = async (projectId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching wiki project:', error);
    throw error;
  }
};

export const createWikiProject = async (link) => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ link }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error creating wiki project:', error);
    throw error;
  }
};

export const getProjectContent = async (projectId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/projects/${projectId}/content`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching project content:', error);
    throw error;
  }
};