import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Plus, Edit, Trash, LogOut, Eye } from "lucide-react";

interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  experience: string;
  jdFile?: File | null;
  jdText?: string;
}

interface JobFormProps {
  job: Job;
  isEditing: boolean;
  onSave: (job: Job) => void;
  onCancel: () => void;
}

const JobForm = ({ job, isEditing, onSave, onCancel }: JobFormProps) => {
  const [formData, setFormData] = useState<Job>(job);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        jdFile: file
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Job Posting" : "Create New Job Posting"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="block text-sm font-medium mb-2">Experience Required *</label>
            <Input
              name="experience"
              value={formData.experience}
              onChange={handleInputChange}
              placeholder="e.g., 3+ years"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Job Description (Upload JD)
            </label>
            <Input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
            />
            <p className="text-sm text-muted-foreground mt-1">
              Accepted formats: PDF, DOC, DOCX
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Or Paste Job Description
            </label>
            <Textarea
              name="jdText"
              value={formData.jdText}
              onChange={handleInputChange}
              placeholder="Paste job description here..."
              className="min-h-[200px]"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditing ? "Update" : "Create"} Job
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

  const emptyJob: Job = {
    id: "",
    title: "",
    description: "",
    requirements: [],
    experience: "",
    jdFile: null,
    jdText: "",
  };

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAdminAuthenticated");
    if (!isAuthenticated) {
      navigate("/admin");
    }

    // Load jobs from localStorage
    const savedJobs = localStorage.getItem("jobs");
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminAuthenticated");
    navigate("/admin");
  };

  const validateJob = (job: Job): boolean => {
    if (!job.title || !job.experience) {
      toast({
        title: "Validation Error",
        description: "Title and experience are required fields",
        variant: "destructive",
      });
      return false;
    }

    if (!job.jdFile && !job.jdText) {
      toast({
        title: "Validation Error",
        description: "Either JD file or JD text is required",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleSave = (jobData: Job) => {
    if (!validateJob(jobData)) return;

    const isEditing = Boolean(jobData.id);
    const updatedJobs = isEditing
      ? jobs.map((job) => (job.id === jobData.id ? jobData : job))
      : [...jobs, { ...jobData, id: Date.now().toString() }];

    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));

    toast({
      title: isEditing ? "Job Updated" : "Job Created",
      description: `Successfully ${isEditing ? "updated" : "created"} job posting`,
    });

    setEditingJob(null);
    setIsCreating(false);
  };

  const handleDelete = (id: string) => {
    const updatedJobs = jobs.filter((job) => job.id !== id);
    setJobs(updatedJobs);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    toast({
      title: "Job Deleted",
      description: "Successfully deleted job posting",
    });
  };

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
                  <p className="text-muted-foreground">Experience: {job.experience}</p>
                  {job.jdFile && (
                    <p className="text-sm text-muted-foreground mt-1">
                      JD File: {job.jdFile.name}
                    </p>
                  )}
                  {job.jdText && (
                    <div className="mt-4">
                      <h4 className="font-medium mb-2">Job Description:</h4>
                      <p className="text-muted-foreground whitespace-pre-wrap">
                        {job.jdText}
                      </p>
                    </div>
                  )}
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