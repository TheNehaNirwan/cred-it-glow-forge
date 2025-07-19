import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Code, Server, Brain, Users, Shield, Smartphone, ArrowRight } from "lucide-react";
import { motion, useInView } from "framer-motion";

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const services = [
    {
      icon: Code,
      title: 'Custom Software Development',
      description: 'We design, develop, and deploy software solutions that are fully customized to meet your specific business needs, from enterprise-level platforms to mobile applications.',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      gradient: 'from-purple-600 via-pink-600 to-orange-600'
    },
    {
      icon: Server,
      title: 'Hardware Procurement and Setup',
      description: 'We provide high-quality hardware solutions, including servers, networking equipment, and workstations, ensuring your IT infrastructure is robust and reliable.',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      gradient: 'from-orange-600 via-red-600 to-pink-600'
    },
    {
      icon: Brain,
      title: 'AI & Machine Learning Solutions',
      description: 'CRED offers an opportunity to leverage AI and Data Analytics to develop competitive software solutions that drive business intelligence and automation.',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      gradient: 'from-blue-600 via-purple-600 to-pink-600'
    },
    {
      icon: Users,
      title: 'IT Staffing & Consultancy',
      description: 'Expert IT professionals and consultants to augment your team with the right skills and experience for your technology initiatives.',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      gradient: 'from-red-600 via-orange-600 to-yellow-600'
    },
    {
      icon: Shield,
      title: 'Cybersecurity Solutions',
      description: 'Comprehensive security services to protect your digital assets and ensure compliance with industry standards and regulations.',
      color: 'text-blue-700',
      bgColor: 'bg-blue-700/10',
      gradient: 'from-indigo-600 via-blue-600 to-cyan-600'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences across iOS and Android platforms.',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      gradient: 'from-purple-600 via-pink-600 to-orange-600'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section id="services" className="py-20 bg-background" ref={ref}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          style={{
            transform: isInView ? "none" : "translateY(50px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
          }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Our <span className="font-serif italic text-primary">Services</span>
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            What Solutions We Provide
          </motion.p>
          <motion.div 
            className="w-24 h-1 bg-gradient-primary mx-auto mt-6"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
          ></motion.div>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="group relative"
            >
              {/* Gradient Border Animation */}
              <motion.div
                className={`absolute -inset-0.5 rounded-2xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 blur transition duration-1000`}
                initial={false}
                animate={{
                  background: [
                    `linear-gradient(0deg, ${service.gradient})`,
                    `linear-gradient(360deg, ${service.gradient})`
                  ]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              
              <Card className="relative bg-background/80 backdrop-blur-sm border-2 group-hover:border-transparent transition-all duration-300">
                <CardHeader className="text-center pb-4">
                  <motion.div 
                    className={`w-16 h-16 ${service.bgColor} rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden`}
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ['-200%', '200%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                      }}
                    />
                    <service.icon className={`h-8 w-8 ${service.color} relative z-10`} />
                  </motion.div>
                  <CardTitle className={`text-xl group-hover:${service.color} transition-colors duration-300`}>
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="ghost" 
                      className={`w-full group-hover:bg-gradient-to-r ${service.gradient} group-hover:text-white transition-all duration-300 ${service.color}`}
                      onClick={() => {
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                          contactSection.scrollIntoView({ behavior: 'smooth' });
                          // Add service to URL for pre-filling the form
                          window.history.pushState({}, '', `#contact?service=${encodeURIComponent(service.title)}`);
                        }
                      }}
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </Button>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Process Section */}
        <motion.div 
          className="bg-muted/30 rounded-3xl p-8 md:p-12 relative overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Background Animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-pink-500/5 to-orange-500/5"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            }}
          />
          
          <motion.div 
            className="text-center mb-12 relative z-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h3 className="text-3xl font-bold mb-4">
              Our <span className="font-serif italic text-primary">Development Process</span>
            </h3>
            <p className="text-gray-600">
              We follow a proven methodology to ensure successful project delivery
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-4 gap-6 relative z-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {[
              { step: '01', title: 'Discovery', desc: 'Understanding your requirements and goals' },
              { step: '02', title: 'Planning', desc: 'Strategic roadmap and architecture design' },
              { step: '03', title: 'Development', desc: 'Agile development with regular updates' },
              { step: '04', title: 'Deployment', desc: 'Launch and ongoing support & maintenance' }
            ].map((process, index) => (
              <motion.div 
                key={index} 
                className="text-center group relative"
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
              >
                <div className="relative mb-6">
                  <motion.div 
                    className="w-16 h-16 bg-gradient-primary text-white rounded-full flex items-center justify-center mx-auto font-bold text-lg relative overflow-hidden"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ['-200%', '200%'],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        repeatType: "loop",
                        ease: "linear",
                      }}
                    />
                    <span className="relative z-10">{process.step}</span>
                  </motion.div>
                  {index < 3 && (
                    <motion.div 
                      className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-secondary"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.2 }}
                    ></motion.div>
                  )}
                </div>
                <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors duration-300">
                  {process.title}
                </h4>
                <p className="text-gray-600 text-sm">
                  {process.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;