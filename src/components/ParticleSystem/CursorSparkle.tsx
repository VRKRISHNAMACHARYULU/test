
import React, { useEffect, useState } from 'react';

interface SparkleParticle {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  size: number;
  opacity: number;
  color: string;
}

const CursorSparkle: React.FC = () => {
  const [sparkles, setSparkles] = useState<SparkleParticle[]>([]);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const COLORS = [
    '#9b87f5', // Primary purple
    '#8B5CF6', // Vivid purple
    '#D6BCFA', // Light purple
    '#E5DEFF', // Soft purple
  ];

  useEffect(() => {
    const createSparkle = (x: number, y: number) => ({
      id: Math.random(),
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      targetX: x + (Math.random() - 0.5) * 40,
      targetY: y + (Math.random() - 0.5) * 40,
      size: Math.random() * 2.5 + 0.5,
      opacity: 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    });

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (Math.random() > 0.6) { // Reduced particle creation rate
        setSparkles(prev => [...prev, createSparkle(e.clientX, e.clientY)]);
      }
    };

    const animationFrame = setInterval(() => {
      setSparkles(prev => 
        prev
          .map(sparkle => ({
            ...sparkle,
            x: sparkle.x + (sparkle.targetX - sparkle.x) * 0.1,
            y: sparkle.y + (sparkle.targetY - sparkle.y) * 0.1,
            opacity: sparkle.opacity - 0.02
          }))
          .filter(sparkle => sparkle.opacity > 0)
      );
    }, 16); // ~60fps for smooth animation

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(animationFrame);
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
          fill={sparkle.color}
          opacity={sparkle.opacity}
          style={{
            filter: `drop-shadow(0 0 ${sparkle.size * 2}px ${sparkle.color})`
          }}
        />
      ))}
    </svg>
  );
};

export default CursorSparkle;
