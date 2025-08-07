import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import CircularAnimation from '@/components/animations/CircularAnimation';

interface LandingCoverProps {
  onEnter: () => void;
}

const LandingCover = ({ onEnter }: LandingCoverProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 bg-navy z-50 flex items-center justify-center cursor-pointer"
      onClick={!isLoading ? onEnter : undefined}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full flex flex-col items-center justify-center">
        {/* Background Gradient Animation */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20"
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

        {/* Main Content */}
        <motion.div
          className="relative text-center"
          animate={{
            scale: isHovered && !isLoading ? 1.05 : 1,
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Logo Animation */}
          <div className="relative w-32 h-32 mx-auto mb-8">
            <CircularAnimation />
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <span className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                CREDIBLE
              </span>
            </motion.div>
          </div>

          {/* Text Content */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <h1 className="text-3xl md:text-4xl font-light text-navy-foreground tracking-wider">
              CREDIBLE-IT SOLUTIONS
            </h1>
            <p className="text-lg md:text-xl text-navy-foreground/80 max-w-xl mx-auto px-4 font-light tracking-wide">
              A digital transformation company creating
              <br />innovative solutions that help businesses thrive
            </p>
          </motion.div>

          {/* Enter Text */}
          {!isLoading && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <span className="text-navy-foreground/70 text-lg tracking-widest uppercase hover:text-navy-foreground transition-colors duration-300">
                Click anywhere to enter
              </span>
            </motion.div>
          )}

          {/* Loading Indicator */}
          {isLoading && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-navy-foreground/50 tracking-widest">Loading</span>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LandingCover; 