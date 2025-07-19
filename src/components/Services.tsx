import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Lightbulb, Code, ArrowRight, CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/components/animations/ScrollAnimations";
import staffingVector from "@/assets/staffing-vector.jpg";
import consultancyVector from "@/assets/consultancy-vector.jpg";
import developmentVector from "@/assets/development-vector.jpg";

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  useScrollAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);
  const services = [
    {
      icon: Users,
      title: "IT Staffing Solutions",
      description: "Hire top tech talent tailored to your business needs",
      image: staffingVector,
      features: [
        "AI-Powered Candidate Screening",
        "Deep Human Evaluation Process",
        "Short-term & Long-term Positions",
        "Skilled & Experienced Professionals"
      ],
      gradient: "bg-gradient-primary"
    },
    {
      icon: Lightbulb,
      title: "Consultancy Services",
      description: "Strategic IT guidance for your growth and transformation",
      image: consultancyVector,
      features: [
        "Digital Transformation Strategy",
        "Technology Roadmap Planning",
        "Process Optimization",
        "IT Infrastructure Assessment"
      ],
      gradient: "bg-gradient-secondary"
    },
    {
      icon: Code,
      title: "Software Development",
      description: "Custom solutions for businesses and educational institutions",
      image: developmentVector,
      features: [
        "Web Application Development",
        "Mobile App Solutions",
        "Educational Technology Platforms",
        "Enterprise Software Solutions"
      ],
      gradient: "bg-gradient-accent"
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in-up">
          <div className={`inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6 transition-all duration-700 ${isVisible ? 'animate-slide-down' : 'opacity-0 translate-y-[-20px]'}`}>
            <span className="text-primary font-semibold text-sm animate-text-glow">🎯 Our Services</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-bold text-foreground mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <span className="font-serif italic">Comprehensive</span>{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent animate-gradient-shift font-bold">
              IT Solutions
            </span>
          </h2>
          <p className={`text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            From staffing solutions to strategic consultancy, we provide end-to-end 
            IT services that drive your business forward.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className={`group hover:shadow-elegant transition-all duration-700 hover:-translate-y-4 border-0 bg-card scale-in magnetic-hover overflow-hidden ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: `${0.7 + index * 0.2}s` }}
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 ${service.gradient} opacity-20 group-hover:opacity-40 transition-all duration-500`}></div>
                <div className={`absolute top-4 left-4 w-12 h-12 ${service.gradient} rounded-xl flex items-center justify-center shadow-lg glow-pulse group-hover:animate-wiggle`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-serif italic text-foreground group-hover:text-primary transition-all duration-300 group-hover:animate-text-glow">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-lg group-hover:text-foreground transition-colors duration-300">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Features List */}
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3 group-hover:translate-x-1 transition-transform duration-300" style={{ transitionDelay: `${featureIndex * 0.1}s` }}>
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0 group-hover:animate-bounce-gentle" />
                      <span className="text-foreground group-hover:text-primary transition-colors duration-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-500 group-hover:shadow-primary magnetic-hover"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center bg-gradient-hero rounded-3xl p-12 fade-in-up relative overflow-hidden ${isVisible ? 'visible' : ''}`} style={{ animationDelay: '1.5s' }}>
          {/* Animated background elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-accent/10 rounded-full animate-float"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-secondary/10 rounded-full animate-float-reverse"></div>
          
          <h3 className="text-3xl md:text-4xl font-serif italic text-navy-foreground mb-6 animate-text-glow relative z-10">
            Ready to Transform Your Business?
          </h3>
          <p className="text-xl text-navy-foreground/80 mb-8 max-w-2xl mx-auto relative z-10">
            Let's discuss how our IT staffing solutions can support your organization's goals 
            and drive operational efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Button variant="hero" size="xl" className="glow-pulse magnetic-hover">
              Get Free Consultation
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="border-navy-foreground/30 text-navy-foreground hover:bg-navy-foreground hover:text-navy magnetic-hover"
            >
              View Case Studies
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;