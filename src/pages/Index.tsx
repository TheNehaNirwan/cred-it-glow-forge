import Header from "@/components/Header";
import LandingCover from "@/components/LandingCover";
import Services from "@/components/Services";
import About from "@/components/About";
import Team from "@/components/Team";
import Careers from "@/components/Careers";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <LandingCover />
      <Services />
      <About />
      <Team />
      <Careers />
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;
