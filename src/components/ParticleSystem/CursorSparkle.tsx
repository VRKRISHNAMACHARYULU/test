
import React, { useEffect, useState } from 'react';

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
}

const CursorSparkle: React.FC = () => {
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const createSparkle = (x: number, y: number) => ({
      id: Math.random(),
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      size: Math.random() * 3 + 1,
      opacity: 1
    });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (Math.random() > 0.5) { // Only create sparkles 50% of the time for performance
        setSparkles(prev => [...prev, createSparkle(e.clientX, e.clientY)]);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const fadeInterval = setInterval(() => {
      setSparkles(prev => 
        prev
          .map(sparkle => ({ ...sparkle, opacity: sparkle.opacity - 0.05 }))
          .filter(sparkle => sparkle.opacity > 0)
      );
    }, 50);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(fadeInterval);
    };
  }, []);

  return (
    <svg 
      className="fixed inset-0 pointer-events-none z-50" 
      style={{ width: '100vw', height: '100vh' }}
    >
      {sparkles.map(sparkle => (
        <circle
          key={sparkle.id}
          cx={sparkle.x}
          cy={sparkle.y}
          r={sparkle.size}
          fill="#FFD700"
          opacity={sparkle.opacity}
          style={{
            filter: `drop-shadow(0 0 ${sparkle.size}px #FFD700)`
          }}
        />
      ))}
    </svg>
  );
};

export default CursorSparkle;
