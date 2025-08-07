import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { ArrowRight, CheckCircle } from "lucide-react";
import { AnimatedText, useScrollAnimation } from "@/components/animations/ScrollAnimations";
import { FloatingElements } from "@/components/animations/FloatingElements";
import heroTech from "@/assets/hero-tech.jpg";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const phrases = [
    "through IT services",    
  ];
  const staticText = "Empowering your business ";
  
  useScrollAnimation();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const fullText = staticText + phrases[0]; // Only use the first phrase
    
    if (displayText.length < fullText.length) {
      // Still typing
      const timer = setTimeout(() => {
        setDisplayText(fullText.substring(0, displayText.length + 1));
      }, 100);
      return () => clearTimeout(timer);
    }
    // When finished typing, just keep the cursor blinking (no further action needed)
  }, [displayText]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
      
      <Container className="relative z-10 pt-24 sm:pt-32 md:pt-40 lg:pt-48 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
        
            {/* Main Heading with Letter Animation */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight animate-gradient-shift">
                {displayText}
                <span className="animate-blink ml-1 text-primary">|</span>
              </h1>
            </div>
            
            {/* Animated Key Benefits */}
            <div className={`stagger-animation mb-6 sm:mb-8 space-y-2 sm:space-y-3 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-navy-foreground/90 magnetic-hover">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-secondary animate-bounce-gentle flex-shrink-0" />
                <span className="text-sm sm:text-base">Top Tech Talent</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-navy-foreground/90 magnetic-hover">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-secondary animate-bounce-gentle flex-shrink-0" style={{ animationDelay: '0.2s' }} />
                <span className="text-sm sm:text-base">AI-Powered Screening</span>
              </div>
              <div className="flex items-center justify-center lg:justify-start gap-2 text-navy-foreground/90 magnetic-hover">
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-secondary animate-bounce-gentle flex-shrink-0" style={{ animationDelay: '0.4s' }} />
                <span className="text-sm sm:text-base">Strategic IT Guidance</span>
              </div>
            </div>
            
            {/* Animated CTA Buttons */}
            <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 transition-all duration-1000 delay-1500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Button 
                variant="hero" 
                size="lg"
                className="group glow-pulse magnetic-hover w-full sm:w-auto text-sm sm:text-base"
                onClick={() => scrollToSection('contact')}
              >
                Get Free Consultation
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-navy-foreground/30 text-navy-foreground hover:bg-navy-foreground hover:text-navy magnetic-hover w-full sm:w-auto text-sm sm:text-base"
                onClick={() => scrollToSection('services')}
              >
                View Our Services
              </Button>
            </div>
          </div>

          {/* Right Content - Enhanced Hero Image */}
          <div className="relative order-1 lg:order-2 mb-8 lg:mb-0">
            {/* Main Hero Image - loads with enhanced animation */}
            <div className={`relative transition-all duration-1500 delay-1000 ${isLoaded ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 rotate-6'}`}>
              <div className="relative group perspective-1000">
                <img
                  src={heroTech}
                  alt="IT Solutions Technology"
                  className="w-full h-auto max-w-lg mx-auto lg:max-w-none rounded-2xl sm:rounded-3xl shadow-elegant floating-element magnetic-hover transform-gpu"
                />
                
                {/* Enhanced floating badges with cooler animations - responsive sizing */}
                <div className={`absolute -top-4 sm:-top-8 -left-4 sm:-left-8 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-gradient-accent rounded-2xl sm:rounded-3xl shadow-glow flex items-center justify-center transition-all duration-1500 delay-1400 ${isLoaded ? 'animate-zoom-in rotate-12' : 'opacity-0 scale-0 rotate-45'}`}>
                  <span className="text-xl sm:text-2xl md:text-3xl animate-bounce-gentle">💡</span>
                </div>
                <div className={`absolute -bottom-4 sm:-bottom-8 -right-4 sm:-right-8 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-secondary rounded-2xl sm:rounded-3xl shadow-secondary flex items-center justify-center transition-all duration-1500 delay-1600 ${isLoaded ? 'animate-zoom-in rotate-[-15deg]' : 'opacity-0 scale-0 rotate-[-45deg]'}`}>
                  <span className="text-lg sm:text-xl md:text-2xl animate-wiggle">🚀</span>
                </div>
                <div className={`absolute top-1/3 -right-3 sm:-right-6 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-primary rounded-xl sm:rounded-2xl shadow-primary flex items-center justify-center transition-all duration-1500 delay-1800 ${isLoaded ? 'animate-zoom-in rotate-6' : 'opacity-0 scale-0 rotate-90'}`}>
                  <span className="text-base sm:text-lg md:text-xl animate-spin-slow">⚡</span>
                </div>
                
                {/* New floating success metrics - responsive */}
                <div className={`absolute top-1/4 -left-3 sm:-left-6 w-12 h-12 sm:w-14 sm:h-14 md:w-18 md:h-18 bg-gradient-accent rounded-xl sm:rounded-2xl shadow-accent flex items-center justify-center transition-all duration-1500 delay-2000 ${isLoaded ? 'animate-zoom-in rotate-[-8deg]' : 'opacity-0 scale-0 rotate-[-60deg]'}`}>
                  <span className="text-sm sm:text-base md:text-lg animate-pulse">🎯</span>
                </div>
              </div>
              
              {/* Enhanced glow effects */}
              <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-primary opacity-20 blur-2xl animate-pulse-slow -z-10"></div>
            </div>
          </div>
        </div>

        {/* Animated Stats Section */}
        {/* <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 mt-12 sm:mt-16 md:mt-20 transition-all duration-1000 delay-2000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="text-center scale-in">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-1 sm:mb-2 animate-text-glow">
              500+
            </div>
            <div className="text-navy-foreground/70 text-xs sm:text-sm md:text-base">IT Professionals Placed</div>
          </div>
          <div className="text-center scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-secondary bg-clip-text text-transparent mb-1 sm:mb-2 animate-text-glow">
              100+
            </div>
            <div className="text-navy-foreground/70 text-xs sm:text-sm md:text-base">Happy Clients</div>
          </div>
          <div className="text-center scale-in" style={{ animationDelay: '0.4s' }}>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-1 sm:mb-2 animate-text-glow">
              95%
            </div>
            <div className="text-navy-foreground/70 text-xs sm:text-sm md:text-base">Success Rate</div>
          </div>
          <div className="text-center scale-in" style={{ animationDelay: '0.6s' }}>
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-1 sm:mb-2 animate-text-glow">
              24/7
            </div>
            <div className="text-navy-foreground/70 text-xs sm:text-sm md:text-base">Support Available</div>
          </div>
        </div> */}
      </Container>
    </section>
  );
};

export default Hero;