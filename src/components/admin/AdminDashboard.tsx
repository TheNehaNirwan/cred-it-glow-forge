import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash, LogOut, Eye, Upload } from "lucide-react";
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
      toast({
        title: "Error",
        description: `Failed to ${isEditing ? "update" : "create"} job`,
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
            <Button type="button" variant="outline" onClick={onCancel}>
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
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const emptyJob: Job = {
    id: "",
    title: "",
    description: "",
    department: "",
    location: "",
    status: "open",
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/admin");
      return;
    }

    loadJobs();
  }, [navigate]);

  const loadJobs = async () => {
    try {
      const fetchedJobs = await api.getJobs();
      setJobs(fetchedJobs);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load jobs",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
      description: `Job ${jobData.id ? "updated" : "created"} successfully`,
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await api.deleteJob(id);
      await loadJobs(); // Reload jobs after delete
      toast({
        title: "Success",
        description: "Job deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete job",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <Container className="py-8">
        <div className="flex justify-center items-center min-h-[60vh]">
          <p className="text-lg text-muted-foreground">Loading...</p>
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
        {jobs.map((job) => (
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
        ))}
      </div>
    </Container>
  );
};

export default AdminDashboard; 