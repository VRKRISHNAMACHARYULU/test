
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ParticleSystem from '../components/ParticleSystem/ParticleSystem';
import CursorSparkle from '../components/ParticleSystem/CursorSparkle';
import Navbar from '../components/Layout/Navbar';
import { Button } from '../components/ui/button';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/glow.css';

const Index = () => {
  const [typing, setTyping] = useState(true);
  const fullName = "V R KRISHNAMACHARYULU";
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [hoveredImage, setHoveredImage] = useState(false);

  useEffect(() => {
    if (typing) {
      if (index < fullName.length) {
        const timeout = setTimeout(() => {
          setText((prev) => prev + fullName.charAt(index));
          setIndex((prev) => prev + 1);
        }, 100);
        return () => clearTimeout(timeout);
      } else {
        setTimeout(() => {
          setTyping(false);
        }, 1000);
      }
    } else {
      if (index > 0) {
        const timeout = setTimeout(() => {
          setText((prev) => prev.slice(0, -1));
          setIndex((prev) => prev - 1);
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        setTimeout(() => {
          setTyping(true);
        }, 500);
      }
    }
  }, [index, typing]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <ParticleSystem />
      <CursorSparkle />
      <div className="absolute inset-0 z-10">
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="flex flex-col items-center justify-center p-4">
            <div 
              className="w-64 h-64 rounded-full border-4 border-purple-500/30 overflow-hidden mb-8 cursor-pointer transition-all duration-300"
              onMouseEnter={() => setHoveredImage(true)}
              onMouseLeave={() => setHoveredImage(false)}
            >
              <img 
                src={hoveredImage ?  "/images/profile1.jpg" : "/images/profile2.jpg"} 
                alt="Profile"
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <div className="mb-6">
                <h1 className="text-gradient-animate text-4xl md:text-6xl font-bold">
                  {text}<span className="animate-pulse">|</span>
                </h1>
              </div>
              <p className="text-xl text-white/80 drop-shadow-md mb-8">
                Cloud & DevOps Engineer
              </p>
              
              <div className="flex gap-4 mt-8 relative z-20">
                <Button variant="default" className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:opacity-90 transition-all">
                  <a href="/resume.pdf" download className="flex items-center gap-2">
                    <Download size={16} /> Download Resume
                  </a>
                </Button>
                <Button variant="outline" className="border-purple-500 text-white hover:bg-purple-500/20">
                <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                  View Resume
                </a>
                </Button> 
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
