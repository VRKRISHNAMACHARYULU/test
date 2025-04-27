
import ParticleSystem from '../components/ParticleSystem/ParticleSystem';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <ParticleSystem />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Welcome to Interactive Particles</h1>
          <p className="text-xl text-gray-300">Move your mouse to interact with the particles!</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
