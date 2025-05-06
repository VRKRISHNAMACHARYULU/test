import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import ParticleSystem from '../components/ParticleSystem/ParticleSystem';
import CursorSparkle from '../components/ParticleSystem/CursorSparkle';
import Navbar from '../components/Layout/Navbar';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2 } from 'lucide-react';

// Import the type definitions
// Make sure to create the file at src/types/speech-recognition.d.ts

const AIAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [response, setResponse] = useState('Ready to assist you!');
  const [transcript, setTranscript] = useState('');
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(true);

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  // Initialize speech recognition once on mount
  useEffect(() => {
    // Ensure code only runs in the browser (avoid SSR errors)
    if (typeof window === 'undefined') return;
    
    // Initialize speech synthesis
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
  
    // Check if the browser supports SpeechRecognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // Use the correct constructor with proper typing
      const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognitionAPI();
  
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
  
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const current = event.resultIndex;
        const transcriptText = event.results[current][0].transcript;
        console.log('Recognition result:', transcriptText);
        setTranscript(transcriptText);
        handleQuery(transcriptText);
      };
  
      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
  
        switch (event.error) {
          case 'not-allowed':
            setError('Microphone access was denied. Please allow microphone access in your browser settings and try again.');
            break;
          case 'network':
            setError('Network error occurred. Please check your connection.');
            break;
          case 'no-speech':
            setError('No speech was detected. Please try again.');
            break;
          default:
            setError(`Error: ${event.error}`);
        }
  
        setIsListening(false);
      };
  
      recognition.onend = () => {
        console.log('Speech recognition ended.');
        setIsListening(false);
      };
  
      recognitionRef.current = recognition;
    } else {
      setError('Speech recognition not supported in this browser. Please try Chrome or Edge.');
      setIsSupported(false);
    }

    // Check if mediaDevices is supported
    if (!navigator.mediaDevices || typeof navigator.mediaDevices.getUserMedia !== 'function') {
      setError('Media devices not supported in this browser or context. Ensure you are using HTTPS or localhost.');
      setIsSupported(false);
    }
  
    // Cleanup on component unmount
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (err) {
          console.log('Error stopping recognition:', err);
        }
      }
      
      if (synthRef.current) {
        try {
          synthRef.current.cancel();
        } catch (err) {
          console.log('Error cancelling speech:', err);
        }
      }
    };
  }, []);

  const handleQuery = async (query: string) => {
    if (!query.trim()) return;
    setProcessing(true);
    setResponse('Processing your request...');

    try {
      const baseUrl =
        window.location.hostname === 'localhost'
          ? 'http://localhost:3000'
          : '/api';

      setError(null);

      const res = await fetch(`${baseUrl}/api/query`, {  // Added /api prefix
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
        credentials: 'include',
      });

      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`);
      }

      const data = await res.json();
      setResponse(data.answer);
      speakResponse(data.answer);
    } catch (err: any) {
      console.error('Error querying the assistant:', err);
      setError(`Failed to get response: ${err.message}`);
      setResponse('Sorry, I encountered an error while processing your request. Please make sure the backend server is running.');
    } finally {
      setProcessing(false);
    }
  };

  const speakResponse = (text: string) => {
    if (synthRef.current) {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.lang = 'en-US';
      synthRef.current.speak(utterance);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setError('Speech recognition is not initialized.');
      return;
    }

    if (isListening) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.error('Error stopping recognition:', err);
      }
      setIsListening(false);
      setResponse('Ready to assist you!');
    } else {
      setError(null);
      setTranscript('');
      setResponse('Listening...');

      // Safely check for mediaDevices
      if (navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
        navigator.mediaDevices.getUserMedia({ audio: true })
          .then(() => {
            try {
              recognitionRef.current?.start();
              setIsListening(true);
            } catch (err: any) {
              if (err.message && err.message.includes('recognition has already started')) {
                console.warn('Speech recognition already started.');
                // Try stopping and starting again
                try {
                  recognitionRef.current?.stop();
                  setTimeout(() => {
                    recognitionRef.current?.start();
                    setIsListening(true);
                  }, 100);
                } catch (stopErr) {
                  console.error('Error restarting recognition:', stopErr);
                  setError('Failed to restart recognition: ' + (stopErr as Error).message);
                }
              } else {
                console.error('Speech recognition start error:', err);
                setError('Failed to start recognition: ' + (err.message || 'Unknown error'));
              }
            }
          })
          .catch((err) => {
            console.error('Microphone permission denied:', err);
            setError('Microphone access was denied. Please allow microphone access in your browser settings and try again.');
          });
      } else {
        setError('Media devices API is not available in this browser or context. Please ensure you are using HTTPS or localhost.');
      }
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
                Ask me anything using voice commands about my portfolio, skills, or projects!
              </p>

              <div className="flex justify-center gap-4 mb-8">
                <Button
                  onClick={toggleListening}
                  disabled={processing || !isSupported}
                  className={isListening ? "bg-red-500 hover:bg-red-600" : "bg-blue-500 hover:bg-blue-600"}
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

                {response && response !== 'Listening...' && response !== 'Processing your request...' && (
                  <Button
                    onClick={() => speakResponse(response)}
                    className="bg-purple-500 hover:bg-purple-600"
                  >
                    <span className="flex items-center">
                      <Volume2 size={18} className="mr-2" /> Speak Response
                    </span>
                  </Button>
                )}
              </div>

              {transcript && (
                <div className="p-4 bg-black/40 rounded-lg mb-4">
                  <p className="text-gray-300">
                    <span className="text-cyan-400 font-semibold">You said:</span> {transcript}
                  </p>
                </div>
              )}

              <div className="p-4 bg-black/40 rounded-lg">
                <p className="text-gray-300">
                  <span className="text-cyan-400 font-semibold">Assistant:</span> {response}
                </p>
              </div>

              {error && (
                <div className="mt-4 p-2 bg-red-500/30 text-red-200 rounded-lg">
                  {error}
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;