
import { motion } from 'framer-motion';

interface SkillCardProps {
  name: string;
  icon: string;
}

// Simple icon mapping
const getIconComponent = (iconName: string) => {
  return (
    <div className="text-white text-2xl font-semibold flex items-center justify-center h-12">
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
      className="bg-black/70 backdrop-blur-lg p-4 rounded-xl border border-purple-500/30 flex flex-col items-center justify-center aspect-square transition-all hover:border-purple-500/80 shadow-lg hover:shadow-purple-500/20"
    >
      {getIconComponent(icon)}
      <p className="mt-2 text-white font-medium text-center">{name}</p>
    </motion.div>
  );
};

export default SkillCard;
