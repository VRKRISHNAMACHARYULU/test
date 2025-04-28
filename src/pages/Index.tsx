
import ParticleSystem from '../components/ParticleSystem/ParticleSystem';
import CursorSparkle from '../components/ParticleSystem/CursorSparkle';

const Index = () => {
  return (
    <div className="relative min-h-screen">
      <ParticleSystem />
      <CursorSparkle />
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center p-6 rounded-xl backdrop-blur-xl bg-black/30 border border-white/10">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500">
            Interactive Particles
          </h1>
          <p className="text-xl text-white/90 drop-shadow-md">
            Move your mouse to create dazzling visual effects!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
