import { Phone, Mail } from "lucide-react";
import { Container } from "@/components/ui/container";

const Footer = () => {
  return (
    <footer className="bg-navy text-white">
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
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  CREDIBLE-IT SOLUTIONS
                </h3>
                <p className="text-white/80 text-base sm:text-lg font-semibold">
                  Your Partner in IT Excellence
                </p>
              </div>
            </div>
            <p className="text-white/90 mb-6 leading-relaxed max-w-md text-base sm:text-lg font-semibold text-center sm:text-left">
              We are a consultancy firm specializing in IT staffing solutions,
              providing top-notch IT professionals and strategic guidance for your growth and transformation.
            </p>
            <div className="space-y-3 text-center sm:text-left font-semibold">
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="text-base sm:text-lg">8433613966</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="text-base sm:text-lg break-all">hr@credibleit.tech</span>
              </div>
              <div className="flex items-center justify-center sm:justify-start gap-3">
                <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                <span className="text-base sm:text-lg break-all">credible.itsol@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Services */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
              Our Services
            </h4>
            <ul className="space-y-2 sm:space-y-3 font-semibold">
              <li>
                <a href="#services" className="text-white/80 hover:text-secondary transition-colors text-base sm:text-lg">
                  IT Staffing Solutions
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-secondary transition-colors text-base sm:text-lg">
                  Consultancy Services
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-secondary transition-colors text-base sm:text-lg">
                  Software Development
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-secondary transition-colors text-base sm:text-lg">
                  Technical Consulting
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6">
              Quick Links
            </h4>
            <ul className="space-y-2 sm:space-y-3 font-semibold">
              <li>
                <a href="#home" className="text-white/80 hover:text-secondary transition-colors text-base sm:text-lg">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-white/80 hover:text-secondary transition-colors text-base sm:text-lg">
                  About Us
                </a>
              </li>
              <li>
                <a href="#services" className="text-white/80 hover:text-secondary transition-colors text-base sm:text-lg">
                  Services
                </a>
              </li>
              <li>
                <a href="#contact" className="text-white/80 hover:text-secondary transition-colors text-base sm:text-lg">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="border-t border-white/20">
        <Container className="py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 font-semibold">
            <p className="text-white/70 text-sm sm:text-base text-center sm:text-left">
              © 2024 CREDIBLE-IT SOLUTIONS. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm sm:text-base">
              <a href="#" className="text-white/70 hover:text-secondary transition-colors whitespace-nowrap">
                Privacy Policy
              </a>
              <a href="#" className="text-white/70 hover:text-secondary transition-colors whitespace-nowrap">
                Terms of Service
              </a>
              <a href="#" className="text-white/70 hover:text-secondary transition-colors whitespace-nowrap">
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
