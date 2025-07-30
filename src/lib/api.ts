const API_BASE_URL = '/api';
interface LoginResponse {
  access: string;
  refresh: string;
}

interface Job {
  id: string;
  title: string;
  description: string;
  department: string;
  location: string;
  status: string;
  jd_file?: File;
}

export const api = {
  // Auth
  login: async (username: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(`${API_BASE_URL}/auth/login/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const data = await response.json();
    // Store the token
    localStorage.setItem('token', data.access);
    return data;
  },

  // Jobs
getJobs: async (): Promise<Job[]> => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found in localStorage');
  }

  const response = await fetch(`${API_BASE_URL}/company_site/job-applications/`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    console.error('Failed to fetch jobs:', response.status, text);
    throw new Error('Failed to fetch jobs');
  }

  return response.json();
}
,

  createJob: async (jobData: FormData): Promise<Job> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/company_site/jobs/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: jobData,
    });

    if (!response.ok) {
      throw new Error('Failed to create job');
    }

    return response.json();
  },

  updateJob: async (id: string, jobData: FormData): Promise<Job> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/company_site/jobs/${id}/`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: jobData,
    });

    if (!response.ok) {
      throw new Error('Failed to update job');
    }

    return response.json();
  },

  deleteJob: async (id: string): Promise<void> => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/company_site/jobs/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete job');
    }
  },

  // Helper function to prepare form data
  prepareJobFormData: (job: Partial<Job>): FormData => {
    const formData = new FormData();
    if (job.title) formData.append('title', job.title);
    if (job.description) formData.append('description', job.description);
    if (job.department) formData.append('department', job.department);
    if (job.location) formData.append('location', job.location);
    if (job.status) formData.append('status', job.status);
    if (job.jd_file) formData.append('jd_file', job.jd_file);
    return formData;
  }
}; 