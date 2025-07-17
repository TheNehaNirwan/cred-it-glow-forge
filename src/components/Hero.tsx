import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import heroTech from "@/assets/hero-tech.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen bg-gradient-hero flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-navy/90"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      
      <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left animate-fade-in-left">
            <div className="inline-flex items-center px-4 py-2 bg-accent/20 rounded-full mb-6">
              <span className="text-accent font-semibold text-sm">🚀 Your Partner in IT Excellence</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-foreground mb-6 leading-tight">
              Transform Your Business with{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                CREDIBLE IT
              </span>{" "}
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                SOLUTIONS
              </span>
            </h1>
            
            <p className="text-xl text-navy-foreground/80 mb-8 leading-relaxed">
              We are a consultancy firm specializing in IT staffing solutions, providing top-notch 
              IT professionals and strategic guidance for your growth and transformation.
            </p>
            
            {/* Key Benefits */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center gap-2 text-navy-foreground/90">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <span>Top Tech Talent</span>
              </div>
              <div className="flex items-center gap-2 text-navy-foreground/90">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <span>AI-Powered Screening</span>
              </div>
              <div className="flex items-center gap-2 text-navy-foreground/90">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <span>Strategic IT Guidance</span>
              </div>
            </div>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                variant="hero" 
                size="xl" 
                className="group animate-pulse-glow"
              >
                Get Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                className="border-navy-foreground/30 text-navy-foreground hover:bg-navy-foreground hover:text-navy"
              >
                View Our Services
              </Button>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-fade-in-right">
            <div className="relative">
              <img
                src={heroTech}
                alt="IT Solutions Technology"
                className="w-full h-auto rounded-3xl shadow-elegant animate-float"
              />
              <div className="absolute -top-6 -left-6 w-20 h-20 bg-gradient-accent rounded-2xl shadow-glow animate-bounce-gentle flex items-center justify-center">
                <span className="text-2xl">💡</span>
              </div>
              <div className="absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-secondary rounded-2xl shadow-secondary animate-bounce-gentle flex items-center justify-center" style={{ animationDelay: '0.5s' }}>
                <span className="text-xl">🚀</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 animate-fade-in">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              500+
            </div>
            <div className="text-navy-foreground/70">IT Professionals Placed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-secondary bg-clip-text text-transparent mb-2">
              100+
            </div>
            <div className="text-navy-foreground/70">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-2">
              95%
            </div>
            <div className="text-navy-foreground/70">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
              24/7
            </div>
            <div className="text-navy-foreground/70">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;