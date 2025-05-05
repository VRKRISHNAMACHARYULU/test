
import { motion } from 'framer-motion';

interface SkillCardProps {
  name: string;
  icon: string;
}

// Simple icon mapping
const getIconComponent = (iconName: string) => {
  return (
    <div className="text-white text-2xl flex items-center justify-center h-8">
      {iconName === 'aws' && <span>AWS</span>}
      {iconName === 'gcp' && <span>GCP</span>}
      {iconName === 'azure' && <span>Azure</span>}
      {iconName === 'mysql' && <span>MySQL</span>}
      {iconName === 'security' && <span>Security</span>}
      {iconName === 'networking' && <span>Networking</span>}
      {iconName === 'git' && <span>Git</span>}
      {iconName === 'github' && <span>GitHub</span>}
    </div>
  );
};

const SkillCard: React.FC<SkillCardProps> = ({ name, icon }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-gray-900/50 backdrop-blur-lg p-4 rounded-xl border border-purple-500/20 flex flex-col items-center justify-center aspect-square transition-all hover:border-purple-500/50"
    >
      {getIconComponent(icon)}
      <p className="mt-2 text-white text-center">{name}</p>
    </motion.div>
  );
};

export default SkillCard;
