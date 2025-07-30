import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/animations/ScrollAnimations";
import { Container } from "@/components/ui/container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { X, Upload } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
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

interface ApplicationFormData {
  name: string;
  email: string;
  phone: string;
  experience: string;
  resume: File | null;
  coverLetter: string;
}

const Careers = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: "",
    email: "",
    phone: "",
    experience: "",
    resume: null,
    coverLetter: "",
  });

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    if (selectedJob) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedJob]);

  const loadJobs = async () => {
  try {
    // Check if token is present
    let token = localStorage.getItem('token');

    // If token is missing, perform login
    if (!token) {
      const loginResponse = await api.login('credible', 'credible@2025');
      token = loginResponse.access;
      // token is now stored in localStorage
    }

    const fetchedJobs = await api.getJobs();
    setJobs(fetchedJobs);
  } catch (error) {
    console.error(error);
    toast({
      title: "Error",
      description: "Failed to load job listings",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};

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
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB",
          variant: "destructive",
        });
        return;
      }
      setFormData((prev) => ({
        ...prev,
        resume: file,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.resume) {
      toast({
        title: "Resume Required",
        description: "Please upload your resume",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send the form data to your backend
    console.log('Application submitted:', { jobId: selectedJob?.id, ...formData });
    
    toast({
      title: "Application Submitted",
      description: "We'll get back to you soon!",
    });

    // Reset form and close popup
    setFormData({
      name: "",
      email: "",
      phone: "",
      experience: "",
      resume: null,
      coverLetter: "",
    });
    setSelectedJob(null);
  };

  return (
    <section id="careers" className="py-20 bg-gradient-to-b from-background to-background/80">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            <AnimatedText text="Join Our Team" className="inline-block" />
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team. Check out our current openings below.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <p className="text-lg text-muted-foreground">Loading job listings...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-accent/50"
              >
                <h3 className="text-xl font-semibold mb-3 text-gray-800">{job.title}</h3>
                <div className="flex items-center gap-2 text-sm text-accent mb-4">
                  <span className="font-medium">Location:</span>
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-accent mb-4">
                  <span className="font-medium">Department:</span>
                  <span>{job.department}</span>
                </div>
                <p className="text-gray-600 line-clamp-4 mb-4">{job.description}</p>
                <Button
                  variant="outline"
                  className="w-full hover:bg-accent hover:text-accent-foreground"
                  onClick={() => setSelectedJob(job)}
                >
                  Apply Now
                </Button>
              </div>
            ))}
          </div>
        )}

        {jobs.length === 0 && !isLoading && (
          <div className="text-center text-muted-foreground py-12">
            <p>No job openings available at the moment. Please check back later.</p>
          </div>
        )}

        {/* Job Application Popup */}
        {selectedJob && (
          <div 
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-y-auto"
            style={{ height: '100vh' }}
          >
            <div className="min-h-screen p-4 flex items-start justify-center">
              <Card className="w-full max-w-2xl my-8">
                <div className="border-b border-border p-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">Job Application</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedJob(null)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  {/* Job Details */}
                  <div className="mb-6 border-b border-border pb-6">
                    <h3 className="text-xl font-semibold text-primary mb-2">{selectedJob.title}</h3>
                    <div className="space-y-2 text-muted-foreground">
                      <p>Department: {selectedJob.department}</p>
                      <p>Location: {selectedJob.location}</p>
                      <div className="mt-4">
                        <h4 className="font-medium text-foreground mb-2">Job Description:</h4>
                        <p className="whitespace-pre-wrap">{selectedJob.description}</p>
                      </div>
                    </div>
                  </div>

                  {/* Application Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name *</label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email *</label>
                        <Input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Phone Number *</label>
                        <Input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="Enter your phone number"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Years of Experience *</label>
                        <Input
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          placeholder="e.g., 3 years"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Resume/CV * (PDF, DOC, DOCX - Max 5MB)
                      </label>
                      <div className="flex items-center gap-4">
                        <Input
                          type="file"
                          onChange={handleFileChange}
                          accept=".pdf,.doc,.docx"
                          className="hidden"
                          id="resume-upload"
                          required
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById('resume-upload')?.click()}
                          className="w-full py-8 flex flex-col items-center justify-center gap-2"
                        >
                          <Upload className="w-5 h-5" />
                          <span>{formData.resume ? formData.resume.name : "Click to upload Resume"}</span>
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Cover Letter</label>
                      <Textarea
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleInputChange}
                        placeholder="Tell us why you'd be a great fit..."
                        className="min-h-[150px] resize-y"
                      />
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end gap-4 pt-6 border-t border-border">
                      <Button type="button" variant="outline" onClick={() => setSelectedJob(null)}>
                        Cancel
                      </Button>
                      <Button type="submit">Submit Application</Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Careers; 