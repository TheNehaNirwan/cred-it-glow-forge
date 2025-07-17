import { useEffect, useState } from "react";

export const FloatingElements = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-1/4 w-64 h-64 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full morphing-blob" />
      <div className="absolute bottom-32 right-1/4 w-48 h-48 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full morphing-blob" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/8 w-32 h-32 bg-gradient-to-r from-secondary/15 to-accent/15 rounded-full morphing-blob" style={{ animationDelay: '4s' }} />
      
      {/* Floating icons */}
      <div className="absolute top-1/4 right-1/6 text-4xl animate-float text-primary/30">💡</div>
      <div className="absolute bottom-1/4 left-1/6 text-3xl animate-float-reverse text-secondary/30">🚀</div>
      <div className="absolute top-3/4 right-1/3 text-2xl animate-bounce-gentle text-accent/30">⚡</div>
      <div className="absolute top-1/6 left-2/3 text-3xl animate-wiggle text-primary/30">🎯</div>
      
      {/* Interactive cursor follower */}
      <div 
        className="absolute w-6 h-6 bg-gradient-primary rounded-full opacity-20 transition-all duration-300 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
        }}
      />
      <div 
        className="absolute w-4 h-4 bg-gradient-secondary rounded-full opacity-30 transition-all duration-500 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
        }}
      />
      
      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-5">
        <div className="relative w-full h-full">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-px h-full bg-gradient-to-b from-primary to-transparent animate-slide-down"
              style={{
                left: `${5 + i * 5}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: '3s'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};