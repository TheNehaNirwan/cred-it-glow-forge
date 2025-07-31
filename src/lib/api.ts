const API_BASE_URL = 'https://api.credibleitsoultions.com';

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

// New interface for Job Application
interface JobApplication {
  id: string;
  job: string; // Job ID
  full_name: string;
  email: string;
  phone_number: string;
  years_of_experience: string;
  current_ctc: string;
  expected_ctc: string;
  notice_period: string;
  current_location: string;
  preferred_work_location: string;
  nationality: string;
  educational_background: string;
  skills_technologies: string;
  availability_to_start: string; // Date string (YYYY-MM-DD)
  resume: string; // URL to the resume file (e.g., 'resumes/Comment_Compliance.pdf')
  cover_letter: string;
  applied_at: string; // Timestamp of application (e.g., "2025-07-31T12:00:00Z")
}

export const api = {
  // ✅ LOGIN
  login: async (username: string, password: string): Promise<LoginResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Login Error:', data);
        throw new Error(data?.detail || 'Login failed');
      }

      console.log('Login Success:', data);

      if (data.access_token) {
        localStorage.setItem('token', data.access_token);
      } else if (data.access) {
        localStorage.setItem('token', data.access);
      } else {
        console.warn('Access token not found in login response');
      }

      return data;
    } catch (error) {
      console.error('Login Exception:', error);
      throw error;
    }
  },

  // ✅ GET JOBS
  getJobs: async (): Promise<Job[]> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_BASE_URL}/company_site/jobs/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Get Jobs Failed:', response.status, errorText);
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        console.warn('Authentication failed for getJobs. Token might be expired or invalid.');
      }
      throw new Error('Failed to fetch jobs');
    }

    return response.json();
  },

  // ✅ CREATE JOB
  createJob: async (jobData: FormData): Promise<Job> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_BASE_URL}/company_site/jobs/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: jobData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Create Job Failed:', errorText);
      throw new Error('Failed to create job');
    }

    return response.json();
  },

  // ✅ UPDATE JOB
  updateJob: async (id: string, jobData: FormData): Promise<Job> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_BASE_URL}/company_site/jobs/${id}/`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: jobData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Update Job Failed:', errorText);
      throw new Error('Failed to update job');
    }

    return response.json();
  },

  // ✅ DELETE JOB
  deleteJob: async (id: string): Promise<void> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_BASE_URL}/company_site/jobs/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Delete Job Failed:', errorText);
      throw new Error('Failed to delete job');
    }
  },

  // ✅ SUBMIT APPLICATION
  submitApplication: async (form: FormData): Promise<unknown> => {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No token found");

    const response = await fetch(`${API_BASE_URL}/company_site/job-applications-create/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: form,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Application failed:", errorText);
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson?.detail || JSON.stringify(errorJson) || "Failed to submit application");
      } catch (e) {
        throw new Error("Failed to submit application: " + errorText);
      }
    }

    return response.json();
  },

  // ✅ GET APPLICATIONS
  getApplications: async (): Promise<JobApplication[]> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_BASE_URL}/company_site/job-applications/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Get Applications Failed:', response.status, errorText);
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        console.warn('Authentication failed for getApplications. Token might be expired or invalid.');
      }
      throw new Error('Failed to fetch applications');
    }

    return response.json();
  },

  // ✅ HELPER: PREPARE FORM DATA
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
