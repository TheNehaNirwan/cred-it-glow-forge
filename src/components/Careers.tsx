import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/animations/ScrollAnimations";

interface JobOpening {
  title: string;
  description: string;
  requirements: string[];
  experience: string;
}

const jobOpenings: JobOpening[] = [
  {
    title: "Senior Full Stack Developer",
    description: "We're looking for an experienced Full Stack Developer to join our dynamic team. You'll be working on cutting-edge projects using modern technologies.",
    requirements: [
      "Strong experience with React, Node.js, and TypeScript",
      "Experience with cloud platforms (AWS/Azure)",
      "Knowledge of microservices architecture",
      "Strong problem-solving skills"
    ],
    experience: "5+ years"
  },
  {
    title: "DevOps Engineer",
    description: "Join us as a DevOps Engineer to help build and maintain our cloud infrastructure and deployment pipelines.",
    requirements: [
      "Experience with Docker and Kubernetes",
      "Strong knowledge of CI/CD practices",
      "AWS/Azure certification preferred",
      "Infrastructure as Code experience"
    ],
    experience: "3+ years"
  },
  {
    title: "UI/UX Designer",
    description: "We're seeking a creative UI/UX Designer to help create beautiful and intuitive user experiences for our products.",
    requirements: [
      "Strong portfolio demonstrating UI/UX projects",
      "Proficiency in Figma/Adobe XD",
      "Understanding of user-centered design principles",
      "Experience with design systems"
    ],
    experience: "2+ years"
  }
];

const Careers = () => {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);

  return (
    <section id="careers" className="py-20 bg-gradient-to-b from-background to-background/80">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            <AnimatedText text="Join Our Team" className="inline-block" />
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're always looking for talented individuals to join our team. Check out our current openings below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobOpenings.map((job, index) => (
            <div
              key={index}
              className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-accent/50 cursor-pointer"
              onClick={() => setSelectedJob(job)}
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{job.title}</h3>
              <p className="text-gray-600 mb-4">{job.description}</p>
              <div className="flex items-center gap-2 text-sm text-accent">
                <span className="font-medium">Experience:</span>
                <span>{job.experience}</span>
              </div>
              <Button
                variant="outline"
                className="mt-4 w-full hover:bg-accent hover:text-accent-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  const contactSection = document.getElementById('contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                    // Add job title to URL for pre-filling the form
                    window.history.pushState({}, '', `#contact?job=${encodeURIComponent(job.title)}`);
                  }
                }}
              >
                Apply Now
              </Button>
            </div>
          ))}
        </div>

        {selectedJob && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-card rounded-xl p-8 max-w-2xl w-full shadow-2xl border border-border relative">
              <button
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
                onClick={() => setSelectedJob(null)}
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold mb-4 text-primary">{selectedJob.title}</h3>
              <p className="text-muted-foreground mb-6">{selectedJob.description}</p>
              <div className="mb-6">
                <h4 className="font-semibold mb-2 text-accent">Requirements:</h4>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center gap-4">
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => {
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                      window.history.pushState({}, '', `#contact?job=${encodeURIComponent(selectedJob.title)}`);
                      setSelectedJob(null);
                    }
                  }}
                >
                  Apply Now
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setSelectedJob(null)}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Careers; 