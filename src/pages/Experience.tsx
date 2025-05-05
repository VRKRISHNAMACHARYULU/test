
import { motion } from 'framer-motion';
import ParticleSystem from '../components/ParticleSystem/ParticleSystem';
import CursorSparkle from '../components/ParticleSystem/CursorSparkle';
import Navbar from '../components/Layout/Navbar';
import ExperienceItem from '../components/Experience/ExperienceItem';

const Experience = () => {
  const experience = [
    {
      role: "Cloud Engineer",
      company: "Travel Tale",
      period: "June 2024 - July 2024",
      highlights: [
        "Designed and developed the Travel Tale website using HTML and CSS, increasing site engagement by 30%.",
        "Managed version control for the project by regularly pushing code updates and resolving merge conflicts using Git Bash and GitHub, ensuring smooth collaboration among team members.",
        "Led the deployment process by configuring and deploying the website on an AWS server, ensuring high availability and smooth performance for end-users, ensuring 99.9% uptime and optimizing performance."
      ]
    }
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ParticleSystem />
      <CursorSparkle />
      <div className="absolute inset-0 z-10">
        <Navbar />
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent mb-6">
              Experience
            </h2>
            <div className="w-28 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 mx-auto"></div>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative pl-6">
                <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-cyan-400 via-purple-500 to-cyan-400"></div>
                
                {experience.map((item, index) => (
                  <ExperienceItem 
                    key={index}
                    experience={item}
                    isLast={index === experience.length - 1}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
