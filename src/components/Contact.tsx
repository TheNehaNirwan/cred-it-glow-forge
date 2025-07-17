import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";

const Contact = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      details: "8433613966",
      description: "Mon-Fri from 9am to 6pm",
      gradient: "bg-gradient-primary"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: "hr@credibleit.tech",
      description: "We'll respond within 24 hours",
      gradient: "bg-gradient-secondary"
    },
    {
      icon: Mail,
      title: "Alternative Email",
      details: "credible.itsol@gmail.com",
      description: "For general inquiries",
      gradient: "bg-gradient-accent"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Mon - Fri: 9AM - 6PM",
      description: "Weekend support available",
      gradient: "bg-gradient-primary"
    }
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full mb-6">
            <span className="text-accent-foreground font-semibold text-sm">📞 Contact Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Let's{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              Start a Conversation
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Ready to transform your business with our IT solutions? Get in touch with us today 
            for a free consultation and discover how we can help you achieve your goals.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-foreground mb-8 animate-fade-in-left">
              Get in Touch
            </h3>
            
            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <Card 
                  key={index} 
                  className="group border-0 shadow-elegant hover:shadow-primary transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 ${method.gradient} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <method.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {method.title}
                        </h4>
                        <p className="text-lg font-semibold text-primary mb-1">
                          {method.details}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {method.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Logo */}
            <div className="mt-8 text-center animate-fade-in">
              <img
                src="/lovable-uploads/8b60bfa9-4396-411e-8a05-f2dcde695875.png"
                alt="CREDIBLE IT SOLUTIONS"
                className="w-32 h-32 mx-auto object-contain mb-4 animate-float"
              />
              <h4 className="text-lg font-bold bg-gradient-primary bg-clip-text text-transparent">
                CREDIBLE IT SOLUTIONS
              </h4>
              <p className="text-muted-foreground">Your Partner in IT Excellence</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-elegant animate-fade-in-right">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-foreground">
                  Send us a Message
                </CardTitle>
                <p className="text-muted-foreground">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name *
                    </label>
                    <Input 
                      placeholder="Enter your first name"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name *
                    </label>
                    <Input 
                      placeholder="Enter your last name"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Email Address *
                    </label>
                    <Input 
                      type="email"
                      placeholder="Enter your email"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Phone Number
                    </label>
                    <Input 
                      type="tel"
                      placeholder="Enter your phone number"
                      className="h-12"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Company Name
                  </label>
                  <Input 
                    placeholder="Enter your company name"
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    How can we help you? *
                  </label>
                  <Textarea 
                    placeholder="Tell us about your IT staffing needs, project requirements, or any questions you have..."
                    className="min-h-32 resize-none"
                  />
                </div>

                <Button 
                  variant="hero" 
                  size="lg" 
                  className="w-full group animate-pulse-glow"
                >
                  Send Message
                  <Send className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="mt-20 bg-gradient-hero rounded-3xl p-12 text-center animate-fade-in">
          <h3 className="text-3xl md:text-4xl font-bold text-navy-foreground mb-6">
            Ready to Transform Your Business?
          </h3>
          <p className="text-xl text-navy-foreground/80 mb-8 max-w-2xl mx-auto">
            Don't wait! Contact us today for a free consultation and discover how our 
            IT staffing solutions can drive your business forward.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="hero" 
              size="xl" 
              className="bg-accent hover:bg-accent-glow animate-pulse-glow"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Now: 8433613966
            </Button>
            <Button 
              variant="outline" 
              size="xl"
              className="border-navy-foreground/30 text-navy-foreground hover:bg-navy-foreground hover:text-navy"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;