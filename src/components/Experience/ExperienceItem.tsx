
import { motion } from 'framer-motion';

interface Experience {
  role: string;
  company: string;
  period: string;
  highlights: string[];
}

interface ExperienceItemProps {
  experience: Experience;
  isLast: boolean;
}

const ExperienceItem: React.FC<ExperienceItemProps> = ({ experience, isLast }) => {
  return (
    <motion.div 
      className={`relative pb-12 ${!isLast ? 'mb-8' : ''}`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute -left-6 mt-1.5">
        <div className="w-4 h-4 rounded-full bg-cyan-400"></div>
      </div>

      <div className="ml-6">
        <span className="text-sm text-cyan-400 font-medium">{experience.period}</span>

        <div className="mt-4 mb-6 bg-black/30 backdrop-blur-lg p-6 rounded-xl border border-purple-500/20">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-500 mb-1">
            {experience.role}
          </h3>
          <p className="text-white text-lg mb-6">{experience.company}</p>

          <ul className="space-y-4">
            {experience.highlights.map((highlight, idx) => (
              <li key={idx} className="flex">
                <span className="text-cyan-400 mr-2">→</span>
                <span className="text-white/80">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default ExperienceItem;
