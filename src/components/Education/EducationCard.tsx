
import { motion } from 'framer-motion';

interface Education {
  degree: string;
  institution: string;
  details: string[];
  icon: string;
}

interface EducationCardProps {
  education: Education;
}

const EducationCard: React.FC<EducationCardProps> = ({ education }) => {
  return (
    <div className="bg-black/30 backdrop-blur-lg rounded-xl border border-purple-500/20 p-6">
      <div className="flex items-start gap-4">
        <div className="text-4xl text-cyan-400 mt-1">
          {education.icon === 'graduation-cap' && 
            <span className="inline-flex items-center justify-center w-12 h-12">🎓</span>
          }
          {education.icon === 'school' && 
            <span className="inline-flex items-center justify-center w-12 h-12">🏫</span>
          }
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-500">
            {education.degree}
          </h3>
          <p className="text-white text-lg mb-4">{education.institution}</p>
          <ul className="space-y-1">
            {education.details.map((detail, idx) => (
              <li key={idx} className="text-white/80">
                {detail}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EducationCard;
