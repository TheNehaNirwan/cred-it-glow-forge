import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { AnimatedText, useScrollAnimation } from "@/components/animations/ScrollAnimations";
import { FloatingElements } from "@/components/animations/FloatingElements";
import heroTech from "@/assets/hero-tech.jpg";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  useScrollAnimation();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section id="home" className="relative min-h-screen bg-gradient-hero flex items-center overflow-hidden">
      {/* Floating Background Elements */}
      <FloatingElements />
      
      {/* Animated Background Overlay */}
      <div className="absolute inset-0 bg-navy/90"></div>
      
      {/* Dynamic Background Shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-primary opacity-20 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-secondary opacity-20 rounded-full blur-3xl floating-element" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-accent opacity-10 rounded-full blur-3xl floating-element" style={{ animationDelay: '2s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            {/* Animated Badge */}
            <div className={`inline-flex items-center px-4 py-2 bg-accent/20 rounded-full mb-6 transition-all duration-700 ${isLoaded ? 'animate-slide-down' : 'opacity-0 translate-y-[-20px]'}`}>
              <span className="text-accent font-semibold text-sm animate-text-glow">🚀 Your Partner in IT Excellence</span>
            </div>
            
            {/* Animated Main Heading */}
            <div className="mb-6">
              <div className={`transition-all duration-1000 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <AnimatedText 
                  text="Transform Your Business with"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-navy-foreground leading-tight"
                  delay={0.3}
                />
              </div>
              <div className={`transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <AnimatedText 
                  text="CREDIBLE IT"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight animate-gradient-shift"
                  delay={0.8}
                />
              </div>
              <div className={`transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                <AnimatedText 
                  text="SOLUTIONS"
                  className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-secondary bg-clip-text text-transparent leading-tight animate-gradient-shift"
                  delay={1.1}
                />
              </div>
            </div>
            
            {/* Animated Description */}
            <div className={`transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="text-xl text-navy-foreground/80 mb-8 leading-relaxed">
                We are a consultancy firm specializing in IT staffing solutions, providing top-notch 
                IT professionals and strategic guidance for your growth and transformation.
              </p>
            </div>
            
            {/* Animated Key Benefits */}
            <div className={`stagger-animation mb-8 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center gap-2 text-navy-foreground/90 magnetic-hover">
                <CheckCircle className="w-5 h-5 text-secondary animate-bounce-gentle" />
                <span>Top Tech Talent</span>
              </div>
              <div className="flex items-center gap-2 text-navy-foreground/90 magnetic-hover">
                <CheckCircle className="w-5 h-5 text-secondary animate-bounce-gentle" style={{ animationDelay: '0.2s' }} />
                <span>AI-Powered Screening</span>
              </div>
              <div className="flex items-center gap-2 text-navy-foreground/90 magnetic-hover">
                <CheckCircle className="w-5 h-5 text-secondary animate-bounce-gentle" style={{ animationDelay: '0.4s' }} />
                <span>Strategic IT Guidance</span>
              </div>
            </div>
            
            {/* Animated CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-1500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Button 
                variant="hero" 
                size="xl" 
                className="group glow-pulse magnetic-hover"
              >
                Get Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
              <Button 
                variant="outline" 
                size="xl"
                className="border-navy-foreground/30 text-navy-foreground hover:bg-navy-foreground hover:text-navy magnetic-hover"
              >
                View Our Services
              </Button>
            </div>
          </div>

          {/* Right Content - Animated Hero Image */}
          <div className="relative">
            <div className={`relative transition-all duration-1200 delay-800 ${isLoaded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-90 rotate-3'}`}>
              <div className="relative group">
                <img
                  src={heroTech}
                  alt="IT Solutions Technology"
                  className="w-full h-auto rounded-3xl shadow-elegant floating-element magnetic-hover"
                />
                
                {/* Animated floating badges */}
                <div className={`absolute -top-6 -left-6 w-20 h-20 bg-gradient-accent rounded-2xl shadow-glow flex items-center justify-center transition-all duration-1000 delay-1200 ${isLoaded ? 'animate-zoom-in' : 'opacity-0 scale-0'}`}>
                  <span className="text-2xl animate-bounce-gentle">💡</span>
                </div>
                <div className={`absolute -bottom-6 -right-6 w-16 h-16 bg-gradient-secondary rounded-2xl shadow-secondary flex items-center justify-center transition-all duration-1000 delay-1400 ${isLoaded ? 'animate-zoom-in' : 'opacity-0 scale-0'}`}>
                  <span className="text-xl animate-wiggle">🚀</span>
                </div>
                <div className={`absolute top-1/4 -right-4 w-12 h-12 bg-gradient-primary rounded-xl shadow-primary flex items-center justify-center transition-all duration-1000 delay-1600 ${isLoaded ? 'animate-zoom-in' : 'opacity-0 scale-0'}`}>
                  <span className="text-lg animate-spin-slow">⚡</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Stats Section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 transition-all duration-1000 delay-2000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center scale-in">
            <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 animate-text-glow">
              500+
            </div>
            <div className="text-navy-foreground/70">IT Professionals Placed</div>
          </div>
          <div className="text-center scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl md:text-4xl font-bold bg-gradient-secondary bg-clip-text text-transparent mb-2 animate-text-glow">
              100+
            </div>
            <div className="text-navy-foreground/70">Happy Clients</div>
          </div>
          <div className="text-center scale-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-3xl md:text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-2 animate-text-glow">
              95%
            </div>
            <div className="text-navy-foreground/70">Success Rate</div>
          </div>
          <div className="text-center scale-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 animate-text-glow">
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