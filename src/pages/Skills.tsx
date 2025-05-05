
import { motion } from 'framer-motion';
import ParticleSystem from '../components/ParticleSystem/ParticleSystem';
import CursorSparkle from '../components/ParticleSystem/CursorSparkle';
import Navbar from '../components/Layout/Navbar';
import SkillProgress from '../components/Skills/SkillProgress';
import SkillCard from '../components/Skills/SkillCard';

const Skills = () => {
  const programmingLanguages = [
    { name: 'C++', percent: 90 },
    { name: 'C', percent: 85 }
  ];

  const devOpsSkills = [
    { name: 'Docker', percent: 80 },
    { name: 'Kubernetes', percent: 75 },
    { name: 'Terraform', percent: 70 },
    { name: 'Ansible', percent: 65 }
  ];

  const cloudSkills = [
    { name: 'AWS', icon: 'aws' },
    { name: 'GCP', icon: 'gcp' },
    { name: 'Azure', icon: 'azure' },
    { name: 'MySQL', icon: 'mysql' },
    { name: 'Security', icon: 'security' },
    { name: 'Networking', icon: 'networking' },
    { name: 'Git', icon: 'git' },
    { name: 'GitHub', icon: 'github' }
  ];

  const cicdSkills = [
    { name: 'Jenkins', percent: 85 },
    { name: 'GitHub Actions', percent: 80 }
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
              Technical Skills
            </h2>
            <div className="w-28 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 mx-auto"></div>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {/* Programming Languages Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-semibold text-cyan-400 mb-6">Programming Languages</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {programmingLanguages.map((skill, index) => (
                  <SkillProgress 
                    key={index}
                    name={skill.name}
                    percent={skill.percent}
                  />
                ))}
              </div>
            </motion.div>

            {/* CI/CD & Code Quality Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-semibold text-cyan-400 mb-6">CI/CD & Code Quality</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {cicdSkills.map((skill, index) => (
                  <SkillProgress 
                    key={index}
                    name={skill.name}
                    percent={skill.percent}
                  />
                ))}
              </div>
            </motion.div>

            {/* Cloud & Infrastructure Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-semibold text-cyan-400 mb-6">Cloud & Infrastructure</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {cloudSkills.map((skill, index) => (
                  <SkillCard 
                    key={index}
                    name={skill.name}
                    icon={skill.icon}
                  />
                ))}
              </div>
            </motion.div>

            {/* DevOps & Automation Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-16"
            >
              <h3 className="text-2xl font-semibold text-cyan-400 mb-6">DevOps & Automation</h3>
              <div className="grid md:grid-cols-2 gap-8">
                {devOpsSkills.map((skill, index) => (
                  <SkillProgress 
                    key={index}
                    name={skill.name}
                    percent={skill.percent}
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

export default Skills;
