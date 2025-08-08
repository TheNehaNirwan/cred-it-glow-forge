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

// Interface for Job details
interface Job {
  id: string;
  title: string;
  description: string;
  department: string;
  location: string;
  status: string;
  jd_file?: File;
}

// Interface for Application Form Data, now including new fields
interface ApplicationFormData {
  name: string;
  email: string;
  phone: string;
  experience: string; // Corresponds to years_of_experience
  current_ctc: string;
  expected_ctc: string;
  notice_period: string;
  current_location: string;
  preferred_work_location: string;
  nationality: string;
  educational_background: string;
  skills_technologies: string;
  availability_to_start: string; // Date string (YYYY-MM-DD)
  resume: File | null;
  coverLetter: string;
}

const Careers = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false); // New state for submission loading
  const [formData, setFormData] = useState<ApplicationFormData>({
    name: "",
    email: "",
    phone: "",
    experience: "",
    current_ctc: "",
    expected_ctc: "",
    notice_period: "",
    current_location: "",
    preferred_work_location: "",
    nationality: "",
    educational_background: "",
    skills_technologies: "",
    availability_to_start: "",
    resume: null,
    coverLetter: "",
  });

  // Effect to load jobs on component mount
  useEffect(() => {
    loadJobs();
  }, []);

  // Effect to manage body overflow when job application popup is open
  useEffect(() => {
    if (selectedJob) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function to reset overflow when component unmounts or selectedJob changes
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedJob]);

  // Function to load job listings from the API
  const loadJobs = async () => {
    try {
      // Check if token is present
      let token = localStorage.getItem('token');

      // If token is missing, perform login
      if (!token) {
        const loginResponse = await api.login('credible', 'credible@2025');
        token = loginResponse.access;
        // token is now stored in localStorage by the api.login function
      }

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
      setIsLoading(false);
    }
  };

  // Handler for input changes in the form fields
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for file input change (resume upload)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please upload a file smaller than 5MB.",
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

  // Handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.resume) {
      toast({
        title: "Resume Required",
        description: "Please upload your resume.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedJob) {
      toast({
        title: "Error",
        description: "No job selected for application.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true); // Set submitting state to true

    try {
      // Create FormData object to send to the API (for file uploads and other fields)
      const formToSend = new FormData();
      formToSend.append('job', selectedJob.id); // Associate application with job ID
      formToSend.append('full_name', formData.name);
      formToSend.append('email', formData.email);
      formToSend.append('phone_number', formData.phone);
      formToSend.append('years_of_experience', formData.experience);
      formToSend.append('current_ctc', formData.current_ctc);
      formToSend.append('expected_ctc', formData.expected_ctc);
      formToSend.append('notice_period', formData.notice_period);
      formToSend.append('current_location', formData.current_location);
      formToSend.append('preferred_work_location', formData.preferred_work_location);
      formToSend.append('nationality', formData.nationality);
      formToSend.append('educational_background', formData.educational_background);
      formToSend.append('skills_technologies', formData.skills_technologies);
      formToSend.append('availability_to_start', formData.availability_to_start);
      if (formData.resume) {
        formToSend.append('resume', formData.resume);
      }
      formToSend.append('cover_letter', formData.coverLetter); // Assuming API expects 'cover_letter'

      await api.submitApplication(formToSend); // Call the API to submit the application

      toast({
        title: "Application Submitted",
        description: "Your application has been successfully submitted! We'll get back to you soon.",
      });

      // Reset form and close popup on successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        experience: "",
        current_ctc: "",
        expected_ctc: "",
        notice_period: "",
        current_location: "",
        preferred_work_location: "",
        nationality: "",
        educational_background: "",
        skills_technologies: "",
        availability_to_start: "",
        resume: null,
        coverLetter: "",
      });
      setSelectedJob(null);
    } catch (error) {
      console.error("Application submission failed:", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false); // Reset submitting state
    }
  };

  return (
    <section id="careers" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-background to-background/80">
      <Container>
        <div className="text-center mb-12 sm:mb-14 md:mb-16 px-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
            <AnimatedText text="Join Our Team" className="inline-block" />
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
            We're always looking for talented individuals to join our team. Check out our current openings below.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[40vh]">
            <p className="text-base sm:text-lg text-muted-foreground">Loading job listings...</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="bg-card rounded-xl p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-accent/50"
              >
                <h3 className="text-lg sm:text-xl font-semibold mb-3 text-gray-800 leading-tight">{job.title}</h3>
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-accent mb-3 sm:mb-4">
                  <span className="font-medium">Location:</span>
                  <span className="break-words">{job.location}</span>
                </div>
                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-accent mb-3 sm:mb-4">
                  <span className="font-medium">Department:</span>
                  <span className="break-words">{job.department}</span>
                </div>
                <p className="text-gray-600 line-clamp-4 mb-4 text-sm sm:text-base leading-relaxed">{job.description}</p>
                <Button
                  variant="outline"
                  className="w-full hover:bg-accent hover:text-accent-foreground text-sm sm:text-base"
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
            <div className="min-h-screen p-2 sm:p-4 flex items-start justify-center">
              <Card className="w-full max-w-2xl my-4 sm:my-6 md:my-8">
                <div className="border-b border-border p-4 sm:p-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl sm:text-2xl font-bold">Job Application</h2>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedJob(null)}
                      className="text-muted-foreground hover:text-foreground flex-shrink-0"
                    >
                      <X className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-4 sm:p-6">
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
                          placeholder="e.g., +91-9876543210"
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

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Current CTC (in Lakhs/Annum) *</label>
                        <Input
                          type="text" // Keep as text to allow flexible input, convert to number on backend if needed
                          name="current_ctc"
                          value={formData.current_ctc}
                          onChange={handleInputChange}
                          placeholder="e.g., 4.3"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Expected CTC (in Lakhs/Annum) *</label>
                        <Input
                          type="text" // Keep as text
                          name="expected_ctc"
                          value={formData.expected_ctc}
                          onChange={handleInputChange}
                          placeholder="e.g., 5.0"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Notice Period *</label>
                        <Input
                          name="notice_period"
                          value={formData.notice_period}
                          onChange={handleInputChange}
                          placeholder="e.g., 30 days, Immediate"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Current Location *</label>
                        <Input
                          name="current_location"
                          value={formData.current_location}
                          onChange={handleInputChange}
                          placeholder="e.g., Bangalore"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Preferred Work Location *</label>
                        <Input
                          name="preferred_work_location"
                          value={formData.preferred_work_location}
                          onChange={handleInputChange}
                          placeholder="e.g., Hybrid, Remote, On-site"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Nationality *</label>
                        <Input
                          name="nationality"
                          value={formData.nationality}
                          onChange={handleInputChange}
                          placeholder="e.g., Indian"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Educational Background *</label>
                      <Textarea
                        name="educational_background"
                        value={formData.educational_background}
                        onChange={handleInputChange}
                        placeholder="e.g., B.Tech in Computer Science from IIT Bombay"
                        className="min-h-[80px] resize-y"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Skills & Technologies *</label>
                      <Textarea
                        name="skills_technologies"
                        value={formData.skills_technologies}
                        onChange={handleInputChange}
                        placeholder="e.g., Python, Django, React, PostgreSQL, Docker"
                        className="min-h-[100px] resize-y"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Availability to Start * (YYYY-MM-DD)</label>
                      <Input
                        type="date"
                        name="availability_to_start"
                        value={formData.availability_to_start}
                        onChange={handleInputChange}
                        required
                      />
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
                      <Button type="button" variant="outline" onClick={() => setSelectedJob(null)} disabled={isSubmitting}>
                        Cancel
                      </Button>
                      <Button type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                      </Button>
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