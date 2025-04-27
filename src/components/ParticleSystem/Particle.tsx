
import React, { useEffect, useState } from 'react';

export interface ParticleData {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  pulseSpeed: number;
  pulseMagnitude: number;
}

interface ParticleProps {
  particle: ParticleData;
}

const Particle: React.FC<ParticleProps> = ({ particle }) => {
  const [scale, setScale] = useState(1);
  
  useEffect(() => {
    const pulse = () => {
      const time = Date.now() / 1000;
      const newScale = 1 + Math.sin(time * particle.pulseSpeed) * particle.pulseMagnitude;
      setScale(newScale);
    };
    
    const animationId = requestAnimationFrame(function animate() {
      pulse();
      requestAnimationFrame(animate);
    });
    
    return () => cancelAnimationFrame(animationId);
  }, [particle.pulseSpeed, particle.pulseMagnitude]);

  return (
    <circle
      cx={particle.x}
      cy={particle.y}
      r={particle.radius * scale}
      fill={particle.color}
      className="transition-transform duration-300 ease-in-out"
      style={{
        filter: `drop-shadow(0 0 ${particle.radius * scale}px ${particle.color})`,
      }}
    />
  );
};

export default Particle;
