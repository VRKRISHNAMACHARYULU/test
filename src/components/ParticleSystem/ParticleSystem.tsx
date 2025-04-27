
import React, { useEffect, useRef, useState } from 'react';
import Particle, { ParticleData } from './Particle';

const PARTICLE_COUNT = 50;
const CONNECTION_DISTANCE = 100;
const COLORS = ['#9b87f5', '#D946EF', '#8B5CF6'];

const ParticleSystem: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<ParticleData[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationFrameRef = useRef<number>();
  const mousePosition = useRef({ x: 0, y: 0 });

  const initParticles = (width: number, height: number) => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      radius: Math.random() * 2 + 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    }));
  };

  const updateParticles = () => {
    setParticles(prevParticles => {
      return prevParticles.map(particle => {
        let { x, y, vx, vy } = particle;
        
        // Add mouse interaction
        const dx = mousePosition.current.x - x;
        const dy = mousePosition.current.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          vx += dx * 0.002;
          vy += dy * 0.002;
        }

        x += vx;
        y += vy;

        // Bounce off walls
        if (x < 0 || x > dimensions.width) vx *= -1;
        if (y < 0 || y > dimensions.height) vy *= -1;

        // Apply boundaries
        x = Math.max(0, Math.min(dimensions.width, x));
        y = Math.max(0, Math.min(dimensions.height, y));

        return { ...particle, x, y, vx: vx * 0.99, vy: vy * 0.99 };
      });
    });

    animationFrameRef.current = requestAnimationFrame(updateParticles);
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        setParticles(initParticles(width, height));
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    return () => {
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      updateParticles();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      mousePosition.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 to-black"
      onMouseMove={handleMouseMove}
    >
      <svg className="w-full h-full absolute top-0 left-0">
        <g>
          {particles.map((particle, i) => (
            <React.Fragment key={i}>
              {particles.map((other, j) => {
                if (i < j) {
                  const dx = particle.x - other.x;
                  const dy = particle.y - other.y;
                  const distance = Math.sqrt(dx * dx + dy * dy);

                  if (distance < CONNECTION_DISTANCE) {
                    const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.2;
                    return (
                      <line
                        key={`${i}-${j}`}
                        x1={particle.x}
                        y1={particle.y}
                        x2={other.x}
                        y2={other.y}
                        stroke={`rgba(155, 135, 245, ${opacity})`}
                        strokeWidth="1"
                      />
                    );
                  }
                }
                return null;
              })}
              <Particle particle={particle} />
            </React.Fragment>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default ParticleSystem;
