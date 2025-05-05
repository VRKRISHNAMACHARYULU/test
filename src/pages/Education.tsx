
import { motion } from 'framer-motion';
import ParticleSystem from '../components/ParticleSystem/ParticleSystem';
import CursorSparkle from '../components/ParticleSystem/CursorSparkle';
import Navbar from '../components/Layout/Navbar';
import EducationCard from '../components/Education/EducationCard';
import CertificationCard from '../components/Education/CertificationCard';

const Education = () => {
  const education = [
    {
      degree: "Bachelor of Technology",
      institution: "Aditya College of Engineering and Technology",
      details: [
        "Major in Computer Science and Engineering",
        "CGPA: 7.94"
      ],
      icon: "graduation-cap"
    },
    {
      degree: "Intermediate with MPC",
      institution: "Aditya Junior College",
      details: [
        "Secured 840 out of 1000",
        "Strong in Mathematics & Problem Solving"
      ],
      icon: "school"
    }
  ];

  const certifications = [
    {
      name: "Oracle Cloud Infrastructure and AI Foundations Associate",
      date: "September 2024",
      icon: "oracle"
    },
    {
      name: "Google Cloud Career Launchpad",
      date: "August 2024",
      icon: "google"
    },
    {
      name: "Cisco Certified CCNA",
      date: "July 2024",
      icon: "cisco"
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
              Education
            </h2>
            <div className="w-28 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 mx-auto"></div>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 mb-20">
              {education.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <EducationCard education={item} />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-cyan-400 mb-6">
                Certifications
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (index * 0.1) }}
                >
                  <CertificationCard certification={cert} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Education;
