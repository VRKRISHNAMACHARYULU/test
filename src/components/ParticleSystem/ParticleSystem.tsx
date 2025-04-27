
import React, { useEffect, useRef, useState } from 'react';
import Particle, { ParticleData } from './Particle';

const PARTICLE_COUNT = 80;
const CONNECTION_DISTANCE = 150;
const COLORS = [
  '#FF61D2', // Bright pink
  '#FFA6F6', // Light pink
  '#00FFFF', // Cyan
  '#00CCFF', // Sky blue
  '#33CCFF', // Light blue
  '#4D79FF', // Bright blue
  '#7D00FF', // Purple
  '#FF00FF', // Magenta
  '#FFD700', // Gold
  '#FF3131', // Red
];

const ParticleSystem: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<ParticleData[]>([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationFrameRef = useRef<number>();
  const mousePosition = useRef({ x: 0, y: 0 });
  const time = useRef(0);

  const initParticles = (width: number, height: number) => {
    return Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5,
      radius: Math.random() * 4 + 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      pulseSpeed: Math.random() * 2 + 0.5,
      pulseMagnitude: Math.random() * 0.3 + 0.1
    }));
  };

  const updateParticles = () => {
    time.current += 0.01;

    setParticles(prevParticles => {
      return prevParticles.map(particle => {
        let { x, y, vx, vy } = particle;
        
        // Enhanced mouse interaction
        const dx = mousePosition.current.x - x;
        const dy = mousePosition.current.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
          const force = 0.1 * (1 - distance / 150);
          vx += dx * force * 0.05;
          vy += dy * force * 0.05;
        }
        
        // Add some natural motion using sine waves
        vx += Math.sin(time.current + x * 0.01) * 0.01;
        vy += Math.cos(time.current + y * 0.01) * 0.01;

        x += vx;
        y += vy;

        // Bounce off walls with improved dynamics
        if (x < 0 || x > dimensions.width) vx *= -0.8;
        if (y < 0 || y > dimensions.height) vy *= -0.8;

        // Apply boundaries
        x = Math.max(0, Math.min(dimensions.width, x));
        y = Math.max(0, Math.min(dimensions.height, y));

        return { ...particle, x, y, vx: vx * 0.98, vy: vy * 0.98 };
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
      className="w-full h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-900"
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
                    const opacity = (1 - distance / CONNECTION_DISTANCE) * 0.8;
                    const gradient = `${particle.color}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
                    return (
                      <line
                        key={`${i}-${j}`}
                        x1={particle.x}
                        y1={particle.y}
                        x2={other.x}
                        y2={other.y}
                        stroke={gradient}
                        strokeWidth={1.5}
                        strokeLinecap="round"
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
