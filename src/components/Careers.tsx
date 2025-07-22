import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AnimatedText } from "@/components/animations/ScrollAnimations";
import { Container } from "@/components/ui/container";

interface Job {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  experience: string;
  jdFile?: File | null;
  jdText?: string;
}

const Careers = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    // Load jobs from localStorage
    const savedJobs = localStorage.getItem("jobs");
    if (savedJobs) {
      setJobs(JSON.parse(savedJobs));
    }
  }, []);

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-card rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-accent/50"
            >
              <h3 className="text-xl font-semibold mb-3 text-gray-800">{job.title}</h3>
              <div className="flex items-center gap-2 text-sm text-accent mb-4">
                <span className="font-medium">Experience:</span>
                <span>{job.experience}</span>
              </div>
              {job.jdText && (
                <div className="mb-4">
                  <p className="text-gray-600 line-clamp-4">{job.jdText}</p>
                </div>
              )}
              <Button
                variant="outline"
                className="w-full hover:bg-accent hover:text-accent-foreground"
                onClick={() => {
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

        {jobs.length === 0 && (
          <div className="text-center text-muted-foreground py-12">
            <p>No job openings available at the moment. Please check back later.</p>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Careers; 