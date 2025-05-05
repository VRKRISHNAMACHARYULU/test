
import { motion } from 'framer-motion';
import ParticleSystem from '../components/ParticleSystem/ParticleSystem';
import CursorSparkle from '../components/ParticleSystem/CursorSparkle';
import Navbar from '../components/Layout/Navbar';
import { Github, Linkedin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const codingProfiles = [
    { 
      name: 'HackerRank', 
      logo: '/lovable-uploads/6ff747eb-e4b5-4255-91d4-e5b2d30eebac.png',
      url: 'https://www.hackerrank.com/' 
    },
    { 
      name: 'CodeChef', 
      logo: '/lovable-uploads/ee34f0eb-a4a1-4431-b8e6-2df16512ba70.png',
      url: 'https://www.codechef.com/' 
    },
    { 
      name: 'GFG', 
      logo: '/lovable-uploads/efacd2b2-9da1-4ada-a825-5f8991c9f107.png',
      url: 'https://www.geeksforgeeks.org/' 
    },
    { 
      name: 'LeetCode', 
      logo: '/lovable-uploads/cc5d7c93-517e-4e7b-938f-fedfd32f6b96.png',
      url: 'https://leetcode.com/' 
    }
  ];

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

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
              About <span className="text-white">Me</span>
            </h2>
            <div className="w-28 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 mx-auto"></div>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={fadeIn}
              className="bg-black/30 backdrop-blur-lg rounded-xl p-6 mb-12 border border-purple-500/20"
            >
              <p className="text-white/90 leading-relaxed mb-6">
                Cloud and DevOps Engineer with experience designing scalable cloud infrastructure and automating deployment pipelines, accelerating deployment by 45%. Optimized system performance by implementing efficient data structures and algorithms in C++. Skilled in AWS, Terraform, Docker, and Kubernetes to streamline cloud operations and enhance system efficiency.
              </p>

              <div className="flex flex-wrap gap-4 justify-center mt-8">
                <Button variant="outline" size="lg" className="border-purple-500 text-white">
                  <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Linkedin size={18} /> LinkedIn
                  </a>
                </Button>
                <Button variant="outline" size="lg" className="border-purple-500 text-white">
                  <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Github size={18} /> GitHub
                  </a>
                </Button>
              </div>
            </motion.div>

            <motion.div 
              initial="initial"
              animate="animate"
              variants={fadeIn}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-semibold text-cyan-400 mb-6">Coding Profiles</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {codingProfiles.map((profile, index) => (
                  <motion.a 
                    key={index}
                    href={profile.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center bg-black/30 backdrop-blur-lg p-4 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all group"
                    whileHover={{ scale: 1.03 }}
                  >
                    <div className="h-20 w-20 p-2 flex items-center justify-center mb-3">
                      <img src={profile.logo} alt={profile.name} className="max-h-full max-w-full object-contain" />
                    </div>
                    <p className="text-white group-hover:text-cyan-400 transition-colors">{profile.name}</p>
                    <ExternalLink size={14} className="text-gray-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
