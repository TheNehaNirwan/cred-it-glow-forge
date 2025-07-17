import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Lightbulb, Code, ArrowRight, CheckCircle } from "lucide-react";
import staffingVector from "@/assets/staffing-vector.jpg";
import consultancyVector from "@/assets/consultancy-vector.jpg";
import developmentVector from "@/assets/development-vector.jpg";

const Services = () => {
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
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-primary font-semibold text-sm">🎯 Our Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Comprehensive{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              IT Solutions
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From staffing solutions to strategic consultancy, we provide end-to-end 
            IT services that drive your business forward.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-elegant transition-all duration-500 hover:-translate-y-2 border-0 bg-card animate-scale-in overflow-hidden"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 ${service.gradient} opacity-20 group-hover:opacity-30 transition-opacity`}></div>
                <div className={`absolute top-4 left-4 w-12 h-12 ${service.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                  {service.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-lg">
                  {service.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                {/* Features List */}
                <div className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-secondary flex-shrink-0" />
                      <span className="text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant="outline" 
                  className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-hero rounded-3xl p-12 animate-fade-in">
          <h3 className="text-3xl md:text-4xl font-bold text-navy-foreground mb-6">
            Ready to Transform Your Business?
          </h3>
          <p className="text-xl text-navy-foreground/80 mb-8 max-w-2xl mx-auto">
            Let's discuss how our IT staffing solutions can support your organization's goals 
            and drive operational efficiency.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="hero" size="xl" className="animate-pulse-glow">
              Get Free Consultation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="border-navy-foreground/30 text-navy-foreground hover:bg-navy-foreground hover:text-navy"
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