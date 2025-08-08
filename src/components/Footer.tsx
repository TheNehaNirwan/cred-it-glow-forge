import { Phone, Mail, MapPin } from "lucide-react";
import { Container } from "@/components/ui/container";

const Footer = () => {
  return (
    <footer className="bg-navy text-navy-foreground">
      {/* Main Footer */}
      <Container className="py-12 sm:py-14 md:py-16">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-3 mb-6">
              <div className="relative flex-shrink-0">
                <img
                  src="/lovable-uploads/953a64b5-4661-475d-86af-3ad63cf857c1.png"
                  alt="CREDIBLE-IT SOLUTIONS"
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 object-contain relative z-10"
                />
                <div className="absolute inset-0 bg-navy opacity-20 blur-xl rounded-full"></div>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  CREDIBLE-IT SOLUTIONS
                </h3>
                <p className="text-navy-foreground/70 text-sm sm:text-base">Your Partner in IT Excellence</p>
              </div>
            </div>
            <p className="text-navy-foreground/80 mb-6 leading-relaxed max-w-md text-sm sm:text-base text-center sm:text-left">
              We are a consultancy firm specializing in IT staffing solutions, providing 
              top-notch IT professionals and strategic guidance for your growth and transformation.
            </p>
            <div className="space-y-3 text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-secondary flex-shrink-0" />
                <span className="text-sm sm:text-base">8433613966</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-secondary flex-shrink-0" />
                <span className="text-sm sm:text-base break-all">hr@credibleit.tech</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-secondary flex-shrink-0" />
                <span className="text-sm sm:text-base break-all">credible.itsol@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-navy-foreground mb-4 sm:mb-6">Our Services</h4>
            <ul className="space-y-2 sm:space-y-3">
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
          <div className="text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-navy-foreground mb-4 sm:mb-6">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
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
        <Container className="py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <p className="text-navy-foreground/60 text-xs sm:text-sm text-center sm:text-left">
              © 2024 CREDIBLE-IT SOLUTIONS. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm">
              <a href="#" className="text-navy-foreground/60 hover:text-secondary transition-colors whitespace-nowrap">
                Privacy Policy
              </a>
              <a href="#" className="text-navy-foreground/60 hover:text-secondary transition-colors whitespace-nowrap">
                Terms of Service
              </a>
              <a href="#" className="text-navy-foreground/60 hover:text-secondary transition-colors whitespace-nowrap">
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