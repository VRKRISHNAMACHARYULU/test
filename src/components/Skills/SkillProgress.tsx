
import { motion } from 'framer-motion';

interface SkillProgressProps {
  name: string;
  percent: number;
}

const SkillProgress: React.FC<SkillProgressProps> = ({ name, percent }) => {
  return (
    <div className="bg-black/30 backdrop-blur-lg p-6 rounded-xl border border-purple-500/20">
      <div className="flex justify-between items-center mb-2">
        <h4 className="text-white text-lg">{name}</h4>
      </div>
      <div className="h-3 w-full bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-full"
        />
      </div>
    </div>
  );
};

export default SkillProgress;
