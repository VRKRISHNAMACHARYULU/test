
import { motion } from 'framer-motion';

interface Certification {
  name: string;
  date: string;
  icon: string;
}

interface CertificationCardProps {
  certification: Certification;
}

const CertificationCard: React.FC<CertificationCardProps> = ({ certification }) => {
  return (
    <div className="bg-black/30 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6">
      <div className="flex flex-col items-center text-center">
        <div className="text-4xl mb-4">
          {certification.icon === 'oracle' && 
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-black/50 text-orange-500">O</span>
          }
          {certification.icon === 'google' && 
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-black/50 text-blue-500">G</span>
          }
          {certification.icon === 'cisco' && 
            <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-black/50 text-cyan-500">C</span>
          }
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">
          {certification.name}
        </h3>
        <p className="text-cyan-400">{certification.date}</p>
      </div>
    </div>
  );
};

export default CertificationCard;
