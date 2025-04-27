
import React from 'react';

export interface ParticleData {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface ParticleProps {
  particle: ParticleData;
}

const Particle: React.FC<ParticleProps> = ({ particle }) => {
  return (
    <circle
      cx={particle.x}
      cy={particle.y}
      r={particle.radius}
      fill={particle.color}
      className="transition-transform duration-300 ease-in-out"
    />
  );
};

export default Particle;
