
import { useState } from 'react';
import { motion } from 'framer-motion';
import ParticleSystem from '../components/ParticleSystem/ParticleSystem';
import CursorSparkle from '../components/ParticleSystem/CursorSparkle';
import Navbar from '../components/Layout/Navbar';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Instagram } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Message sent successfully!');
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        toast.error(data.message || 'Failed to send message.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again later.');
      console.error('Contact form error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
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
              Contact
            </h2>
            <div className="w-28 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 mx-auto"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="p-6"
            >
              <div className="flex flex-col space-y-6">
                <div className="flex items-center space-x-4">
                  <Mail className="text-purple-500" size={24} />
                  <a href="mailto:raghunandanperiyala@gmail.com" className="text-white hover:text-cyan-400 transition-colors">
                    raghunandanperiyala@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <Phone className="text-purple-500" size={24} />
                  <a href="tel:+916300547936" className="text-white hover:text-cyan-400 transition-colors">
                    +91 63005 47936
                  </a>
                </div>
                <div className="flex items-center space-x-4">
                  <MapPin className="text-purple-500" size={24} />
                  <span className="text-white">Pithapuram, India</span>
                </div>
              </div>

              <div className="flex space-x-4 mt-8">
                <a 
                  href="https://linkedin.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-black/30 backdrop-blur-lg rounded-full flex items-center justify-center border border-purple-500/20 hover:border-purple-500 transition-all"
                >
                  <Linkedin className="text-white" size={20} />
                </a>
                <a 
                  href="https://github.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-black/30 backdrop-blur-lg rounded-full flex items-center justify-center border border-purple-500/20 hover:border-purple-500 transition-all"
                >
                  <Github className="text-white" size={20} />
                </a>
                <a 
                  href="https://instagram.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-black/30 backdrop-blur-lg rounded-full flex items-center justify-center border border-purple-500/20 hover:border-purple-500 transition-all"
                >
                  <Instagram className="text-white" size={20} />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-black/30 backdrop-blur-lg p-8 rounded-xl border border-purple-500/20"
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <Input 
                    placeholder="Your Name" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-white/10 border-purple-500/20 text-white placeholder:text-white/50 focus-visible:ring-purple-500"
                  />
                </div>
                <div>
                  <Input 
                    type="email" 
                    placeholder="Your Email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/10 border-purple-500/20 text-white placeholder:text-white/50 focus-visible:ring-purple-500"
                  />
                </div>
                <div>
                  <Input 
                    placeholder="Subject" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                    className="bg-white/10 border-purple-500/20 text-white placeholder:text-white/50 focus-visible:ring-purple-500"
                  />
                </div>
                <div>
                  <Textarea 
                    placeholder="Your Message" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={6}
                    required
                    className="bg-white/10 border-purple-500/20 text-white placeholder:text-white/50 focus-visible:ring-purple-500"
                  />
                </div>
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 hover:opacity-90 transition-opacity"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Send size={16} className="mr-2" /> Send Message
                    </span>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
