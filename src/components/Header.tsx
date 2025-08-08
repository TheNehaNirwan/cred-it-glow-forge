import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-lg border-b border-border/50">
      {/* Main Navigation */}
      <nav className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex justify-between items-center min-h-[60px]">
          {/* Logo */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img
              src="/lovable-uploads/953a64b5-4661-475d-86af-3ad63cf857c1.png"
              alt="CREDIBLE-IT SOLUTIONS"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain flex-shrink-0"
            />
            <div className="hidden sm:block min-w-0">
              <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent leading-tight">
                CREDIBLE-IT SOLUTIONS
              </h1>
              <p className="text-xs sm:text-sm text-gray-900 leading-tight">Your Partner in IT Excellence</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors font-medium">
              Home
            </a>
            <a href="#services" className="text-foreground hover:text-primary transition-colors font-medium">
              Services
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors font-medium">
              About Us
            </a>
            <a href="#careers" className="text-foreground hover:text-primary transition-colors font-medium">
              Careers
            </a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors font-medium">
              Contact
            </a>
          </div>

          {/* CTA Button & Mobile Menu */}
          <div className="flex items-center space-x-4">
            <Button variant="hero" className="hidden md:flex">
              Get Started
            </Button>
            
            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col space-y-4 pt-4">
              <a
                href="#home"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </a>
              <a
                href="#services"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </a>
              <a
                href="#about"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </a>
              <a
                href="#contact"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </a>
              <Button variant="hero" className="self-start mt-4">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;