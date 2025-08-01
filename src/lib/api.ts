const API_BASE_URL = 'https://api.credibleitsoultions.com';
const API_MEDIA_BASE_URL = 'https://api.credibleitsoultions.com/';

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
  resume: string; // Relative path like 'resumes/Comment_Compliance.pdf'
  cover_letter: string;
  applied_at: string; // Timestamp of application
  status: string; // New: 'pending', 'shortlisted', 'rejected'
  remark: string; // New: Remark from the admin
}

interface Feedback {
  id: number;
  name: string;
  email: string;
  text: string;
  created_at: string;
  status: 'pending' | 'approved' | 'rejected';
}

// New interface for Contact Request
interface ContactRequest {
  id: number;
  full_name: string;
  email: string;
  phone_number: string;
  message: string;
  submitted_at: string;
}

export const api = {
  API_MEDIA_BASE_URL,
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

  // ✅ GET APPLICATIONS BY STATUS
  getApplications: async (status: string = ''): Promise<JobApplication[]> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');
    const statusQuery = status ? `?status=${status}` : '';

    const response = await fetch(`${API_BASE_URL}/company_site/job-applications/${statusQuery}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Get Applications Failed for status '${status}':`, response.status, errorText);
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        console.warn('Authentication failed for getApplications. Token might be expired or invalid.');
      }
      throw new Error(`Failed to fetch applications for status '${status}'`);
    }

    return response.json();
  },

  // ✅ BULK STATUS UPDATE FOR APPLICATIONS
  bulkStatusUpdate: async (applicationIds: string[], status: string, remark: string = ''): Promise<unknown> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_BASE_URL}/company_site/bulk-status-update/`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        application_ids: applicationIds,
        status,
        remark,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Bulk Status Update Failed:', errorText);
      throw new Error('Failed to update application statuses');
    }

    return response.json();
  },

  // ✅ GET FEEDBACKS
  getFeedback: async (): Promise<Feedback[]> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_BASE_URL}/company_site/feedback/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Get Feedback Failed:', response.status, errorText);
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        console.warn('Authentication failed for getFeedback. Token might be expired or invalid.');
      }
      throw new Error('Failed to fetch feedback');
    }

    return response.json();
  },

  // ✅ DELETE FEEDBACK
  deleteFeedback: async (id: number): Promise<void> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_BASE_URL}/company_site/feedback/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Delete Feedback Failed:', errorText);
      throw new Error('Failed to delete feedback');
    }
  },

  // ✅ BULK APPROVE FEEDBACK
  approveFeedback: async (ids: number[]): Promise<unknown> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_BASE_URL}/company_site/feedback/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        ids,
        status: 'approved',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Approve Feedback Failed:', errorText);
      throw new Error('Failed to approve feedback');
    }

    return response.json();
  },

  // ✅ GET CONTACT REQUESTS
  getContactRequests: async (): Promise<ContactRequest[]> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_BASE_URL}/company_site/admin/contact-requests/`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Get Contact Requests Failed:', response.status, errorText);
      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        console.warn('Authentication failed for getContactRequests. Token might be expired or invalid.');
      }
      throw new Error('Failed to fetch contact requests');
    }

    return response.json();
  },

  // ✅ DELETE CONTACT REQUEST
  deleteContactRequest: async (id: number): Promise<void> => {
    const token = localStorage.getItem('token');
    if (!token) throw new Error('No token found');

    const response = await fetch(`${API_BASE_URL}/company_site/admin/contact-requests/${id}/`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Delete Contact Request Failed:', errorText);
      throw new Error('Failed to delete contact request');
    }
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
