import { useEffect, useState } from "react";
import { useScrollAnimation } from "@/components/animations/ScrollAnimations";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/container";

const Team = () => {
  const [isVisible, setIsVisible] = useState(false);
  useScrollAnimation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('team');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  const teamMembers = [
    {
      name: "Vertika Mishra",
      role: "CEO & Founder",
      icon: "👩‍💼",
      gradient: "bg-gradient-primary",
      shadow: "shadow-primary",
      delay: "delay-200"
    },
    {
      name: "Tech Lead",
      role: "AI Screening Expert",
      icon: "👨‍💻",
      gradient: "bg-gradient-secondary", 
      shadow: "shadow-secondary",
      delay: "delay-400"
    },
    {
      name: "HR Manager",
      role: "Talent Acquisition Specialist",
      icon: "👩‍🎓",
      gradient: "bg-gradient-accent",
      shadow: "shadow-accent",
      delay: "delay-600"
    },
    {
      name: "Client Success Manager",
      role: "Project Management Expert",
      icon: "👨‍🎯",
      gradient: "bg-gradient-primary",
      shadow: "shadow-primary",
      delay: "delay-800"
    }
  ];

  return (
    <section id="team" className="py-20 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-primary opacity-10 rounded-full blur-3xl floating-element"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-secondary opacity-10 rounded-full blur-3xl floating-element" style={{ animationDelay: '1s' }}></div>
      </div>

      <Container>
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
<div
  className={`inline-flex items-center px-6 py-3 bg-accent/20 rounded-full mb-6 transition-all duration-1000 ${
    isVisible ? 'animate-slide-down' : 'opacity-0 translate-y-[-20px]'
  }`}
>
  <span className="text-black font-bold text-lg sm:text-xl animate-text-glow">
    👥 Our Leadership
  </span>
</div>

          
     <motion.h2 
  className="text-4xl md:text-5xl font-bold mb-6"
  initial={{ opacity: 0, scale: 0.5 }}
  whileInView={{ opacity: 1, scale: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.2 }}
>
  <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-shift font-serif italic font-bold">
    Exceptional Team
  </span>{" "}
  <br />
  <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-shift font-bold">
    Extraordinary Results
  </span>
</motion.h2>

          
          <motion.p 
  className="text-xl text-black font-semibold max-w-2xl mx-auto"
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true }}
  transition={{ duration: 0.8, delay: 0.4 }}
>
  Our expert team combines deep technical knowledge with innovative solutions 
  to deliver exceptional results for your business.
</motion.p>


          <motion.div 
            className="w-24 h-1 bg-gradient-primary mx-auto mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          ></motion.div>
        </motion.div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-1000 ${member.delay} ${
                isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'
              }`}
            >
              {/* Team Member Card */}
              <div className="relative bg-card/50 backdrop-blur-sm rounded-3xl p-8 border border-border/50 magnetic-hover group-hover:shadow-elegant transition-all duration-500">
                {/* Avatar */}
                <div className={`w-20 h-20 ${member.gradient} rounded-3xl ${member.shadow} flex items-center justify-center mb-6 mx-auto transform group-hover:scale-110 transition-all duration-500`}>
                  <span className="text-3xl animate-bounce-gentle">{member.icon}</span>
                </div>

                {/* Info */}
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {member.role}
                  </p>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 ${member.gradient} opacity-0 group-hover:opacity-20 rounded-3xl blur-xl transition-all duration-500 -z-10`}></div>
              </div>

              {/* Floating Connection Lines */}
              {index < teamMembers.length - 1 && (
                <div className={`hidden lg:block absolute top-1/2 right-0 w-8 h-px bg-gradient-to-r from-primary/50 to-transparent transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}></div>
              )}
            </div>
          ))}
        </div>

        {/* Team Stats */}
  
      </Container>
    </section>
  );
};

export default Team;