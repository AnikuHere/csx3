import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, Zap } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface AIBootupProps {
  isVisible: boolean;
  onComplete: () => void;
}

export const AIBootup: React.FC<AIBootupProps> = ({ isVisible, onComplete }) => {
  const { currentTheme, themeName } = useTheme();
  const [stage, setStage] = useState(0);
  const [progress, setProgress] = useState(0);

  const stages = [
    { text: "Initializing AI Assistant...", duration: 1000 },
    { text: "Loading Language Models...", duration: 1200 },
    { text: "Connecting to Cody...", duration: 800 },
    { text: "AI Assistant Ready!", duration: 500 }
  ];

  useEffect(() => {
    if (!isVisible) return;

    let currentStage = 0;
    let currentProgress = 0;

    const progressInterval = setInterval(() => {
      currentProgress += 2;
      setProgress(currentProgress);

      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        setTimeout(onComplete, 500);
      }
    }, 50);

    const stageInterval = setInterval(() => {
      if (currentStage < stages.length - 1) {
        currentStage++;
        setStage(currentStage);
      } else {
        clearInterval(stageInterval);
      }
    }, 800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stageInterval);
    };
  }, [isVisible, onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 animate-fade-in">
      <div 
        className={`text-center p-8 rounded-3xl transform transition-all duration-500 ${
          themeName === 'glassmorphism' ? 'backdrop-blur-md' : ''
        } ${
          themeName === 'cyber' ? 'cyber-ai-bootup' : ''
        }`}
        style={{
          backgroundColor: themeName === 'glassmorphism' 
            ? 'rgba(255, 255, 255, 0.1)' 
            : currentTheme.colors.secondary,
          backdropFilter: themeName === 'glassmorphism' ? 'blur(20px)' : 'none',
          border: themeName === 'glassmorphism' 
            ? '1px solid rgba(255, 255, 255, 0.2)' 
            : `1px solid ${currentTheme.colors.border}`,
          boxShadow: themeName === 'cyber' 
            ? `0 0 60px ${currentTheme.colors.primary}60, inset 0 0 30px ${currentTheme.colors.primary}20` 
            : '0 20px 40px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* AI Icon with Apple-style animation */}
        <div className="relative mb-8">
          <div 
            className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center relative overflow-hidden ${
              themeName === 'cyber' ? 'cyber-ai-glow' : 'apple-ai-glow'
            }`}
            style={{ 
              backgroundColor: currentTheme.colors.primary,
              boxShadow: `0 0 40px ${currentTheme.colors.primary}60`
            }}
          >
            <Bot className="w-12 h-12 text-white z-10" />
            
            {/* Apple-style animated rings */}
            <div className="absolute inset-0 rounded-full border-2 border-white opacity-30 animate-ping" />
            <div className="absolute inset-2 rounded-full border border-white opacity-20 animate-ping" style={{ animationDelay: '0.5s' }} />
            <div className="absolute inset-4 rounded-full border border-white opacity-10 animate-ping" style={{ animationDelay: '1s' }} />
            
            {/* Sparkle effects */}
            <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-white animate-pulse" />
            <Zap className="absolute -bottom-2 -left-2 w-5 h-5 text-white animate-pulse" style={{ animationDelay: '0.7s' }} />
          </div>
        </div>

        {/* Stage Text */}
        <h2 
          className={`text-2xl font-bold mb-6 transition-all duration-300 ${
            themeName === 'cyber' ? 'cyber-text-glow' : ''
          }`}
          style={{ color: currentTheme.colors.text.primary }}
        >
          {stages[stage]?.text}
        </h2>

        {/* Progress Bar */}
        <div className="w-80 mx-auto">
          <div 
            className="h-2 rounded-full overflow-hidden mb-4"
            style={{ backgroundColor: currentTheme.colors.accent }}
          >
            <div 
              className={`h-full transition-all duration-100 ease-out ${
                themeName === 'cyber' ? 'cyber-progress-glow' : 'apple-progress-glow'
              }`}
              style={{ 
                width: `${progress}%`,
                backgroundColor: currentTheme.colors.primary,
                boxShadow: themeName === 'cyber' 
                  ? `0 0 20px ${currentTheme.colors.primary}` 
                  : `0 0 10px ${currentTheme.colors.primary}60`
              }}
            />
          </div>
          
          <p 
            className="text-sm"
            style={{ color: currentTheme.colors.text.secondary }}
          >
            {progress}% Complete
          </p>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                themeName === 'cyber' ? 'cyber-particle' : 'apple-particle'
              }`}
              style={{
                backgroundColor: currentTheme.colors.primary,
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.3}s`,
                opacity: 0.6
              }}
            />
          ))}
        </div>
      </div>

      {/* Global Styles */}
      <style jsx>{`
        @keyframes apple-glow {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 40px ${currentTheme.colors.primary}60;
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 0 60px ${currentTheme.colors.primary}80;
          }
        }
        
        @keyframes cyber-glow {
          0%, 100% { 
            transform: scale(1) rotate(0deg);
            box-shadow: 0 0 40px ${currentTheme.colors.primary}60, inset 0 0 20px ${currentTheme.colors.primary}20;
          }
          50% { 
            transform: scale(1.1) rotate(180deg);
            box-shadow: 0 0 80px ${currentTheme.colors.primary}80, inset 0 0 40px ${currentTheme.colors.primary}40;
          }
        }
        
        @keyframes apple-float {
          0%, 100% { transform: translateY(0px) scale(1); opacity: 0.6; }
          50% { transform: translateY(-20px) scale(1.2); opacity: 1; }
        }
        
        @keyframes cyber-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
          50% { transform: translateY(-30px) rotate(180deg); opacity: 1; }
        }
        
        .apple-ai-glow {
          animation: apple-glow 2s ease-in-out infinite;
        }
        
        .cyber-ai-glow {
          animation: cyber-glow 3s ease-in-out infinite;
        }
        
        .apple-particle {
          animation: apple-float 3s ease-in-out infinite;
        }
        
        .cyber-particle {
          animation: cyber-float 4s ease-in-out infinite;
        }
        
        .apple-progress-glow {
          position: relative;
        }
        
        .apple-progress-glow::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 20px;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5));
          animation: progress-shine 1.5s ease-in-out infinite;
        }
        
        .cyber-progress-glow {
          position: relative;
        }
        
        .cyber-progress-glow::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 30px;
          height: 100%;
          background: linear-gradient(90deg, transparent, ${currentTheme.colors.primary}, transparent);
          animation: cyber-progress-scan 2s linear infinite;
        }
        
        .cyber-ai-bootup {
          position: relative;
        }
        
        .cyber-ai-bootup::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, ${currentTheme.colors.primary}60, transparent, ${currentTheme.colors.primary}60);
          border-radius: inherit;
          z-index: -1;
          animation: cyber-border-pulse 2s infinite;
        }
        
        .cyber-text-glow {
          text-shadow: 0 0 20px currentColor;
          animation: cyber-text-flicker 3s infinite;
        }
        
        @keyframes progress-shine {
          0% { transform: translateX(-20px); }
          100% { transform: translateX(20px); }
        }
        
        @keyframes cyber-progress-scan {
          0% { transform: translateX(-30px); }
          100% { transform: translateX(30px); }
        }
        
        @keyframes cyber-border-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        @keyframes cyber-text-flicker {
          0%, 100% { opacity: 1; }
          95% { opacity: 1; }
          96% { opacity: 0.8; }
          97% { opacity: 1; }
          98% { opacity: 0.9; }
          99% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};