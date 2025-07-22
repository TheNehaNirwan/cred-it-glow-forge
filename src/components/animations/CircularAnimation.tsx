import { motion } from 'framer-motion';

const CircularAnimation = () => {
  const circles = Array.from({ length: 3 });
  
  return (
    <div className="absolute inset-0">
      {circles.map((_, index) => (
        <motion.div
          key={index}
          className="absolute inset-0 border-2 border-primary/30 rounded-full"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 1,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Rotating dots */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-2 h-2 rounded-full bg-primary"
          style={{
            top: '50%',
            left: '50%',
            transformOrigin: '0 0',
          }}
          initial={{
            x: 100 * Math.cos((i * Math.PI * 2) / 12),
            y: 100 * Math.sin((i * Math.PI * 2) / 12),
            opacity: 0,
          }}
          animate={{
            x: [
              100 * Math.cos((i * Math.PI * 2) / 12),
              100 * Math.cos(((i + 1) * Math.PI * 2) / 12),
            ],
            y: [
              100 * Math.sin((i * Math.PI * 2) / 12),
              100 * Math.sin(((i + 1) * Math.PI * 2) / 12),
            ],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.1,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

export default CircularAnimation; 