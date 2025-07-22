import { Phone, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";

const Footer = () => {
  return (
    <footer className="bg-navy text-navy-foreground">
      {/* Main Footer */}
      <Container className="py-16">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <img
                  src="/lovable-uploads/e9551c16-fe28-4398-8884-fdb0424048f9.png"
                  alt="CREDIBLE IT SOLUTIONS"
                  className="w-32 h-32 object-contain relative z-10"
                />
                <div className="absolute inset-0 bg-navy opacity-20 blur-xl rounded-full"></div>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  CREDIBLE IT SOLUTIONS
                </h3>
                <p className="text-navy-foreground/70">Your Partner in IT Excellence</p>
              </div>
            </div>
            <p className="text-navy-foreground/80 mb-6 leading-relaxed max-w-md">
              We are a consultancy firm specializing in IT staffing solutions, providing 
              top-notch IT professionals and strategic guidance for your growth and transformation.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary" />
                <span>8433613966</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary" />
                <span>hr@credibleit.tech</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary" />
                <span>credible.itsol@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold text-navy-foreground mb-6">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <a href="#services" className="text-navy-foreground/70 hover:text-secondary transition-colors">
                  IT Staffing Solutions
                </a>
              </li>
              <li>
                <a href="#services" className="text-navy-foreground/70 hover:text-secondary transition-colors">
                  Consultancy Services
                </a>
              </li>
              <li>
                <a href="#services" className="text-navy-foreground/70 hover:text-secondary transition-colors">
                  Software Development
                </a>
              </li>
              <li>
                <a href="#services" className="text-navy-foreground/70 hover:text-secondary transition-colors">
                  Technical Consulting
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-navy-foreground mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#home" className="text-navy-foreground/70 hover:text-secondary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-navy-foreground/70 hover:text-secondary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-navy-foreground/70 hover:text-secondary transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="text-navy-foreground/70 hover:text-secondary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-navy-foreground/20">
        <Container className="py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-navy-foreground/60 text-sm">
              © 2024 CREDIBLE IT SOLUTIONS. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-navy-foreground/60 hover:text-secondary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-navy-foreground/60 hover:text-secondary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-navy-foreground/60 hover:text-secondary transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;