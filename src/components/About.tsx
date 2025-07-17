import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Users, Target, Award, ArrowRight } from "lucide-react";
import { useScrollAnimation } from "@/components/animations/ScrollAnimations";

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);
  const stats = [
    { number: "500+", label: "IT Professionals", icon: Users },
    { number: "100+", label: "Successful Projects", icon: Target },
    { number: "95%", label: "Client Satisfaction", icon: Award },
    { number: "5+", label: "Years Experience", icon: CheckCircle }
  ];

  const values = [
    {
      title: "AI-Powered Screening",
      description: "We leverage advanced AI technology combined with deep human evaluation to ensure only the most qualified candidates."
    },
    {
      title: "Rigorous Process",
      description: "Our comprehensive screening process guarantees that every professional we recommend meets the highest standards."
    },
    {
      title: "Client-Focused",
      description: "We tailor our services to match your specific requirements and organizational culture."
    },
    {
      title: "Continuous Support",
      description: "From placement to project completion, we provide ongoing support to ensure success."
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <div className={`inline-flex items-center px-4 py-2 bg-secondary/10 rounded-full mb-6 transition-all duration-700 ${isVisible ? 'animate-slide-down' : 'opacity-0 translate-y-[-20px]'}`}>
            <span className="text-secondary font-semibold text-sm animate-text-glow">👥 About Us</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold text-foreground mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            Meet{" "}
            <span className="bg-gradient-secondary bg-clip-text text-transparent animate-gradient-shift">
              CRED IT SOLUTIONS
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* About Content */}
          <div className="fade-in-left">
            <h3 className={`text-3xl font-bold text-foreground mb-6 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              Your Trusted Partner in IT Excellence
            </h3>
            
            <div className={`prose prose-lg max-w-none text-muted-foreground mb-8 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <p className="mb-6 leading-relaxed">
                We are <strong className="text-primary">CRED IT SOLUTIONS</strong>, a consultancy firm specializing in IT staffing solutions. 
                Our expertise lies in providing top-notch IT professionals to organizations like yours, 
                ensuring seamless project execution and operational efficiency.
              </p>
              
              <p className="mb-6 leading-relaxed">
                Our team can help you find the right talent for your IT needs, whether it's for short-term 
                projects or long-term positions. We take pride in our rigorous screening process which involves 
                use of AI with deep human evaluation, this ensures that only the most skilled and experienced 
                professionals are recommended to our clients.
              </p>
              
              <p className="leading-relaxed">
                If you're looking to augment your IT team or require specialized skills for a project, 
                we'd be delighted to discuss how our IT staffing solutions can support your organization's goals.
              </p>
            </div>

            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <Button variant="secondary" size="lg" className="magnetic-hover">
                Contact Us Today
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
              </Button>
              <Button variant="outline" size="lg" className="magnetic-hover">
                View Our Portfolio
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 fade-in-right">
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                className={`text-center p-6 bg-card border-0 shadow-elegant hover:shadow-glow transition-all duration-500 hover:scale-105 magnetic-hover scale-in ${isVisible ? 'visible' : ''}`}
                style={{ animationDelay: `${0.8 + index * 0.2}s` }}
              >
                <CardContent className="p-0">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl mx-auto mb-4 flex items-center justify-center glow-pulse">
                    <stat.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2 animate-text-glow">
                    {stat.number}
                  </div>
                  <div className="text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="animate-fade-in">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">
            Why Choose{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              CRED IT SOLUTIONS
            </span>
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card 
                key={index} 
                className="group p-6 bg-card border-0 shadow-elegant hover:shadow-primary transition-all duration-300 hover:-translate-y-2"
              >
                <CardContent className="p-0">
                  <div className="w-12 h-12 bg-gradient-secondary rounded-xl mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-6 h-6 text-secondary-foreground" />
                  </div>
                  <h4 className="text-lg font-bold text-foreground mb-3 group-hover:text-secondary transition-colors">
                    {value.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16 text-center bg-gradient-hero rounded-3xl p-8 animate-fade-in">
          <h4 className="text-2xl font-bold text-navy-foreground mb-4">
            Ready to Get Started?
          </h4>
          <p className="text-navy-foreground/80 mb-6">
            Please don't hesitate to contact us to explore the benefits of our services.
          </p>
          <div className="text-navy-foreground">
            <p className="font-semibold text-lg mb-2">Best regards,</p>
            <p className="text-xl font-bold text-accent mb-2">Vertika Mishra</p>
            <p className="font-medium">CRED IT SOLUTIONS</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;