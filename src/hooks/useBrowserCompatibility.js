// src/hooks/useBrowserCompatibility.js
import { useState, useEffect } from 'react';

/**
 * Hook to check browser compatibility for voice recognition features
 * @returns {Object} Object containing compatibility status and reasons
 */
const useBrowserCompatibility = () => {
  const [compatibility, setCompatibility] = useState({
    isLoading: true,
    isCompatible: false,
    isSpeechRecognitionSupported: false,
    isMediaDevicesSupported: false,
    isSpeechSynthesisSupported: false,
    isSecureContext: false,
    issues: []
  });

  useEffect(() => {
    // Only check in browser environment
    if (typeof window === 'undefined') return;

    // Wait for document to be fully loaded
    if (document.readyState !== 'complete') {
      const handleLoad = () => checkCompatibility();
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    } else {
      checkCompatibility();
    }
  }, []);

  const checkCompatibility = () => {
    const issues = [];
    
    // Check for secure context (HTTPS or localhost)
    const isSecure = window.isSecureContext;
    if (!isSecure) {
      issues.push('Site is not running in a secure context (HTTPS or localhost).');
    }
    
    // Check for Speech Recognition API
    const hasSpeechRecognition = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    if (!hasSpeechRecognition) {
      issues.push('Speech Recognition API is not supported in this browser.');
    }
    
    // Check for Media Devices API
    const hasMediaDevices = 
      typeof navigator !== 'undefined' && 
      navigator.mediaDevices && 
      typeof navigator.mediaDevices.getUserMedia === 'function';
    
    if (!hasMediaDevices) {
      issues.push('Media Devices API is not supported in this browser or requires a secure context.');
    }
    
    // Check for Speech Synthesis API
    const hasSpeechSynthesis = 'speechSynthesis' in window;
    if (!hasSpeechSynthesis) {
      issues.push('Speech Synthesis API is not supported in this browser.');
    }
    
    // Update state with all checks
    setCompatibility({
      isLoading: false,
      isCompatible: isSecure && hasSpeechRecognition && hasMediaDevices && hasSpeechSynthesis,
      isSpeechRecognitionSupported: hasSpeechRecognition,
      isMediaDevicesSupported: hasMediaDevices,
      isSpeechSynthesisSupported: hasSpeechSynthesis,
      isSecureContext: isSecure,
      issues
    });
  };

  return compatibility;
};

export default useBrowserCompatibility;