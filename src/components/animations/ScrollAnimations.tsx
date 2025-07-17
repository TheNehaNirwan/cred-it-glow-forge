import { useEffect, useRef } from "react";

export const useScrollAnimation = () => {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    observerRef.current = observer;

    // Observe all elements with animation classes
    const animationElements = document.querySelectorAll(
      '.fade-in-up, .fade-in-left, .fade-in-right, .scale-in'
    );
    
    animationElements.forEach((el) => observer.observe(el));

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return observerRef;
};

export const AnimatedText = ({ 
  text, 
  className = "",
  delay = 0 
}: { 
  text: string;
  className?: string;
  delay?: number;
}) => {
  const words = text.split(' ');
  
  return (
    <div className={`text-reveal ${className}`} style={{ animationDelay: `${delay}s` }}>
      {words.map((word, index) => (
        <span key={index} className="word" style={{ animationDelay: `${delay + index * 0.1}s` }}>
          {word}&nbsp;
        </span>
      ))}
    </div>
  );
};