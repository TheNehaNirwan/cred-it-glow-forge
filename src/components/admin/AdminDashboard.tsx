import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash, LogOut, Eye, Upload, FileText, User, X } from "lucide-react";
import { api } from "@/lib/api";

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
}

interface JobFormProps {
  job: Job;
  isEditing: boolean;
  onSave: (job: Job) => void;
  onCancel: () => void;
}

const JobForm = ({ job, isEditing, onSave, onCancel }: JobFormProps) => {
  const [formData, setFormData] = useState<Job>(job);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        jd_file: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const jobFormData = api.prepareJobFormData(formData);
      if (isEditing) {
        await api.updateJob(job.id, jobFormData);
      } else {
        await api.createJob(jobFormData);
      }
      onSave(formData);
    } catch (error) {
      console.error("Job form submission error:", error);
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "create"} job.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Job Title *</label>
            <Input
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter job title"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Department *</label>
            <Input
              name="department"
              value={formData.department}
              onChange={handleInputChange}
              placeholder="e.g., Engineering"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Location *</label>
            <Input
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="e.g., Mumbai"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description *</label>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter job description"
              className="min-h-[150px]"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Job Description File (PDF, DOC, DOCX)
            </label>
            <Input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              className="hidden"
              id="jd-upload"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => document.getElementById('jd-upload')?.click()}
              className="w-full py-8 flex flex-col items-center justify-center gap-2"
            >
              <Upload className="w-5 h-5" />
              <span>{formData.jd_file ? formData.jd_file.name : "Click to upload JD file"}</span>
            </Button>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? `${isEditing ? "Updating..." : "Creating..."}` : (isEditing ? "Update" : "Create")} Job
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoadingJobs, setIsLoadingJobs] = useState(true);
  const [isLoadingApplications, setIsLoadingApplications] = useState(false);
  const [activeTab, setActiveTab] = useState<"jobs" | "applications">("jobs");
  const [selectedApplication, setSelectedApplication] = useState<JobApplication | null>(null);

  // Define the base URL for media files
  const API_MEDIA_BASE_URL = 'https://api.credibleitsoultions.com/';

  const emptyJob: Job = {
    id: "",
    title: "",
    description: "",
    department: "",
    location: "",
    status: "open",
  };

  // Effect to check authentication and load initial jobs
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/admin");
      return;
    }
    loadJobs();
  }, [navigate]);

  // Effect to load applications when the "applications" tab is active
  useEffect(() => {
    if (activeTab === "applications") {
      loadApplications();
    }
  }, [activeTab]);

  // Effect to manage body overflow for application details popup
  useEffect(() => {
    if (selectedApplication) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedApplication]);


  const loadJobs = async () => {
    setIsLoadingJobs(true);
    try {
      const fetchedJobs = await api.getJobs();
      setJobs(fetchedJobs);
    } catch (error) {
      console.error("Failed to load jobs:", error);
      toast({
        title: "Error",
        description: "Failed to load job listings.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingJobs(false);
    }
  };

  const loadApplications = async () => {
    setIsLoadingApplications(true);
    try {
      const fetchedApplications = await api.getApplications();
      setApplications(fetchedApplications);
    } catch (error) {
      console.error("Failed to load applications:", error);
      toast({
        title: "Error",
        description: "Failed to load job applications.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingApplications(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate("/admin");
  };

  const handleSave = async (jobData: Job) => {
    await loadJobs(); // Reload jobs after save
    setEditingJob(null);
    setIsCreating(false);
    toast({
      title: "Success",
      description: `Job ${jobData.id ? "updated" : "created"} successfully.`,
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteJob(id);
      await loadJobs(); // Reload jobs after delete
      toast({
        title: "Success",
        description: "Job deleted successfully.",
      });
    } catch (error) {
      console.error("Failed to delete job:", error);
      toast({
        title: "Error",
        description: "Failed to delete job.",
        variant: "destructive",
      });
    }
  };

  // Helper to find job title by ID
  const getJobTitleById = (jobId: string) => {
    // Ensure jobs are loaded before attempting to find a job title
    if (jobs.length === 0) {
      return "Loading Job Info...";
    }
    const job = jobs.find(j => j.id === jobId);
    return job ? job.title : "Unknown Job (ID: " + jobId + ")";
  };

  // Helper to format date strings
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      // Check if the date is valid
      if (isNaN(date.getTime())) {
        return "Invalid Date";
      }
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      console.error("Error formatting date:", dateString, error);
      return "Invalid Date";
    }
  };

  if (isLoadingJobs && activeTab === "jobs") {
    return (
      <Container className="py-8">
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-lg text-muted-foreground">Loading jobs...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex gap-4">
          <Button
            variant="secondary"
            onClick={() => window.location.href = '/'}
          >
            <Eye className="w-4 h-4 mr-2" />
            View Site
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      <div className="flex border-b border-border mb-6">
        <Button
          variant={activeTab === "jobs" ? "default" : "ghost"}
          onClick={() => setActiveTab("jobs")}
          className="rounded-b-none"
        >
          <FileText className="w-4 h-4 mr-2" /> Manage Jobs
        </Button>
        <Button
          variant={activeTab === "applications" ? "default" : "ghost"}
          onClick={() => setActiveTab("applications")}
          className="rounded-b-none"
        >
          <User className="w-4 h-4 mr-2" /> View Applications
        </Button>
      </div>

      {activeTab === "jobs" && (
        <>
          <div className="mb-6">
            <Button onClick={() => setIsCreating(true)} disabled={isCreating}>
              <Plus className="w-4 h-4 mr-2" />
              Create New Job
            </Button>
          </div>

          {isCreating && (
            <JobForm
              job={emptyJob}
              isEditing={false}
              onSave={handleSave}
              onCancel={() => setIsCreating(false)}
            />
          )}

          {editingJob && (
            <JobForm
              job={editingJob}
              isEditing={true}
              onSave={handleSave}
              onCancel={() => setEditingJob(null)}
            />
          )}

          <div className="grid gap-6">
            {jobs.length === 0 && !isLoadingJobs ? (
              <p className="text-center text-muted-foreground py-8">No jobs created yet.</p>
            ) : (
              jobs.map((job) => (
                <Card key={job.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
                        <div className="space-y-2">
                          <p className="text-muted-foreground">Department: {job.department}</p>
                          <p className="text-muted-foreground">Location: {job.location}</p>
                          <p className="text-muted-foreground mt-4">{job.description}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setEditingJob(job)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => handleDelete(job.id)}
                        >
                          <Trash className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </>
      )}

      {activeTab === "applications" && (
        <>
          <h2 className="text-2xl font-bold mb-6">Job Applications</h2>
          {isLoadingApplications ? (
            <div className="flex justify-center items-center min-h-[40vh]">
              <p className="text-lg text-muted-foreground">Loading applications...</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {applications.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">No job applications received yet.</p>
              ) : (
                applications.map((application) => (
                  <Card key={application.id}>
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-semibold mb-2">{application.full_name}</h3>
                          <div className="space-y-1 text-muted-foreground text-sm">
                            <p>Email: {application.email}</p>
                            <p>Applied for: {getJobTitleById(application.job)}</p>
                            <p>Applied on: {formatDate(application.applied_at)}</p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          onClick={() => setSelectedApplication(application)}
                        >
                          <Eye className="w-4 h-4 mr-2" /> View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          )}

          {selectedApplication && (
            <div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-y-auto"
              style={{ height: '100vh' }}
            >
              <div className="min-h-screen p-4 flex items-start justify-center">
                <Card className="w-full max-w-2xl my-8">
                  <CardHeader className="border-b border-border p-6">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-2xl font-bold">Applicant Details</CardTitle>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setSelectedApplication(null)}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6 space-y-4">
                    <p><strong>Name:</strong> {selectedApplication.full_name}</p>
                    <p><strong>Email:</strong> {selectedApplication.email}</p>
                    <p><strong>Phone:</strong> {selectedApplication.phone_number}</p>
                    <p><strong>Applied For Job:</strong> {getJobTitleById(selectedApplication.job)}</p>
                    <p><strong>Years of Experience:</strong> {selectedApplication.years_of_experience}</p>
                    <p><strong>Current CTC:</strong> {selectedApplication.current_ctc}</p>
                    <p><strong>Expected CTC:</strong> {selectedApplication.expected_ctc}</p>
                    <p><strong>Notice Period:</strong> {selectedApplication.notice_period}</p>
                    <p><strong>Current Location:</strong> {selectedApplication.current_location}</p>
                    <p><strong>Preferred Work Location:</strong> {selectedApplication.preferred_work_location}</p>
                    <p><strong>Nationality:</strong> {selectedApplication.nationality}</p>
                    <div>
                      <strong>Educational Background:</strong>
                      <p className="whitespace-pre-wrap">{selectedApplication.educational_background}</p>
                    </div>
                    <div>
                      <strong>Skills & Technologies:</strong>
                      <p className="whitespace-pre-wrap">{selectedApplication.skills_technologies}</p>
                    </div>
                    <p><strong>Availability to Start:</strong> {selectedApplication.availability_to_start}</p>
                    <p><strong>Applied On:</strong> {formatDate(selectedApplication.applied_at)}</p>

                    {selectedApplication.resume && (
                      <div>
                        <strong>Resume:</strong>{" "}
                        <a
                          href={`${API_MEDIA_BASE_URL}${selectedApplication.resume}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Resume
                        </a>
                      </div>
                    )}
                    {selectedApplication.cover_letter && (
                      <div>
                        <strong>Cover Letter:</strong>
                        <p className="whitespace-pre-wrap">{selectedApplication.cover_letter}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </>
      )}
    </Container>
  );
};

export default AdminDashboard;
