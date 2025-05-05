
import { useState } from 'react';
import { motion } from 'framer-motion';
import ParticleSystem from '../components/ParticleSystem/ParticleSystem';
import CursorSparkle from '../components/ParticleSystem/CursorSparkle';
import Navbar from '../components/Layout/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mic, MicOff } from 'lucide-react';

const AIAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('Ready to assist you!');

  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real implementation, here you would connect to the Web Speech API
    if (!isListening) {
      setResponse('Listening...');
    } else {
      setResponse('Ready to assist you!');
    }
  };

  const handleQuestionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    
    setResponse('Processing your question...');
    
    // Simulating an AI response
    setTimeout(() => {
      setResponse(`Here's information about my experience with ${question}`);
      setQuestion('');
    }, 1000);
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
              Portfolio Assistant
            </h2>
            <div className="w-28 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 mx-auto"></div>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-black/30 backdrop-blur-lg rounded-xl p-8 border border-purple-500/20"
            >
              <p className="text-lg text-white mb-6">
                Ask me questions about my skills, experience, or projects!
              </p>

              <div className="flex justify-center gap-4 mb-8">
                <Button 
                  onClick={toggleListening}
                  className={isListening ? 
                    "bg-red-500 hover:bg-red-600" : 
                    "bg-blue-500 hover:bg-blue-600"
                  }
                >
                  {isListening ? (
                    <span className="flex items-center">
                      <MicOff size={18} className="mr-2" /> Stop Listening
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <Mic size={18} className="mr-2" /> Start Voice Assistant
                    </span>
                  )}
                </Button>
              </div>

              <div className="text-center text-cyan-400 mb-4">{response}</div>

              <form onSubmit={handleQuestionSubmit} className="mt-6">
                <div className="flex gap-2">
                  <Input
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    placeholder="Type your question here..."
                    className="bg-white/10 border-purple-500/20 text-white placeholder:text-white/50 focus-visible:ring-purple-500"
                  />
                  <Button type="submit" className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 hover:opacity-90">
                    Ask
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
