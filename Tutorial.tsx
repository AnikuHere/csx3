import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X, Play, Code, Bot, Folder } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface TutorialProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const Tutorial: React.FC<TutorialProps> = ({ isOpen, onClose, onComplete }) => {
  const { currentTheme, themeName } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);

  const tutorialSteps = [
    {
      title: "Welcome to CSX3! 🎉",
      content: "CSX3 is a powerful code editor with AI assistance. Let's take a quick tour to get you started!",
      icon: <Code className="w-8 h-8" />,
      highlight: null
    },
    {
      title: "File Explorer 📁",
      content: "On the left, you'll find the file explorer. Here you can browse your project files, create new files, and organize your code structure.",
      icon: <Folder className="w-8 h-8" />,
      highlight: "file-explorer"
    },
    {
      title: "Code Editor ✨",
      content: "The center panel is your main code editor with syntax highlighting for multiple languages including JavaScript, Python, X3, and more!",
      icon: <Code className="w-8 h-8" />,
      highlight: "code-editor"
    },
    {
      title: "AI Assistant 🤖",
      content: "Meet Cody, your AI coding companion! Ask questions, get help with debugging, or learn new programming concepts.",
      icon: <Bot className="w-8 h-8" />,
      highlight: "ai-assistant"
    },
    {
      title: "Test Your Code 🚀",
      content: "Use the Test feature to run your code in a live environment. Perfect for testing HTML, CSS, JavaScript, and X3 applications!",
      icon: <Play className="w-8 h-8" />,
      highlight: "test-button"
    },
    {
      title: "You're All Set! 🎊",
      content: "That's it! You're ready to start coding. Remember, you can always access help from the menu bar. Happy coding!",
      icon: <Code className="w-8 h-8" />,
      highlight: null
    }
  ];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('csx3-tutorial-completed', 'true');
    onComplete();
    onClose();
  };

  const handleSkip = () => {
    localStorage.setItem('csx3-tutorial-completed', 'true');
    onClose();
  };

  if (!isOpen) return null;

  const currentStepData = tutorialSteps[currentStep];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in">
      <div 
        className={`max-w-lg w-full mx-4 rounded-2xl p-6 transform transition-all duration-300 animate-scale-in ${
          themeName === 'glassmorphism' ? 'backdrop-blur-md' : ''
        } ${
          themeName === 'cyber' ? 'cyber-tutorial-glow' : ''
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
            ? `0 0 40px ${currentTheme.colors.primary}40, inset 0 0 20px ${currentTheme.colors.primary}20` 
            : '0 10px 25px rgba(0, 0, 0, 0.2)'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div 
              className={`p-2 rounded-lg ${
                themeName === 'cyber' ? 'cyber-icon-glow' : ''
              }`}
              style={{ backgroundColor: currentTheme.colors.primary }}
            >
              {currentStepData.icon}
            </div>
            <div>
              <h2 
                className={`text-xl font-bold ${
                  themeName === 'cyber' ? 'cyber-text-glow' : ''
                }`}
                style={{ color: currentTheme.colors.text.primary }}
              >
                {currentStepData.title}
              </h2>
              <p 
                className="text-sm"
                style={{ color: currentTheme.colors.text.secondary }}
              >
                Step {currentStep + 1} of {tutorialSteps.length}
              </p>
            </div>
          </div>
          
          <button
            onClick={handleSkip}
            className="p-2 rounded-full hover:bg-opacity-20 hover:bg-white transition-colors"
            style={{ color: currentTheme.colors.text.secondary }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-8">
          <p 
            className="text-base leading-relaxed"
            style={{ color: currentTheme.colors.text.primary }}
          >
            {currentStepData.content}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div 
            className="h-2 rounded-full overflow-hidden"
            style={{ backgroundColor: currentTheme.colors.accent }}
          >
            <div 
              className={`h-full transition-all duration-300 ${
                themeName === 'cyber' ? 'cyber-progress-glow' : ''
              }`}
              style={{ 
                width: `${((currentStep + 1) / tutorialSteps.length) * 100}%`,
                backgroundColor: currentTheme.colors.primary,
                boxShadow: themeName === 'cyber' 
                  ? `0 0 10px ${currentTheme.colors.primary}` 
                  : 'none'
              }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs">
            <span style={{ color: currentTheme.colors.text.secondary }}>
              Progress
            </span>
            <span style={{ color: currentTheme.colors.text.secondary }}>
              {Math.round(((currentStep + 1) / tutorialSteps.length) * 100)}%
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              themeName === 'cyber' ? 'cyber-nav-button' : ''
            }`}
            style={{
              backgroundColor: 'transparent',
              color: currentTheme.colors.text.secondary,
              border: `1px solid ${currentTheme.colors.border}`
            }}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          <div className="flex space-x-2">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentStep ? 'scale-125' : 'opacity-50'
                }`}
                style={{
                  backgroundColor: index === currentStep 
                    ? currentTheme.colors.primary 
                    : currentTheme.colors.text.secondary
                }}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
              themeName === 'cyber' ? 'cyber-next-button' : ''
            }`}
            style={{
              backgroundColor: currentTheme.colors.primary,
              color: 'white',
              boxShadow: themeName === 'cyber' 
                ? `0 0 20px ${currentTheme.colors.primary}40` 
                : 'none'
            }}
          >
            <span>{currentStep === tutorialSteps.length - 1 ? 'Finish' : 'Next'}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Skip Tutorial */}
        <div className="text-center mt-4">
          <button
            onClick={handleSkip}
            className="text-sm hover:underline transition-colors"
            style={{ color: currentTheme.colors.text.secondary }}
          >
            Skip tutorial
          </button>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { transform: scale(0.9) translateY(20px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .cyber-tutorial-glow {
          position: relative;
        }
        
        .cyber-tutorial-glow::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, ${currentTheme.colors.primary}60, transparent, ${currentTheme.colors.primary}60);
          border-radius: inherit;
          z-index: -1;
          animation: cyber-pulse 2s infinite;
        }
        
        .cyber-icon-glow {
          box-shadow: 0 0 20px ${currentTheme.colors.primary}60;
          animation: cyber-icon-pulse 2s infinite;
        }
        
        .cyber-text-glow {
          text-shadow: 0 0 10px currentColor;
        }
        
        .cyber-progress-glow {
          position: relative;
        }
        
        .cyber-progress-glow::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 20px;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5));
          animation: progress-shine 1.5s ease-in-out infinite;
        }
        
        .cyber-next-button:hover {
          box-shadow: 0 0 30px ${currentTheme.colors.primary}80 !important;
        }
        
        .cyber-nav-button:hover {
          background-color: rgba(255, 255, 255, 0.05) !important;
        }
        
        @keyframes cyber-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        @keyframes cyber-icon-pulse {
          0%, 100% { box-shadow: 0 0 20px ${currentTheme.colors.primary}60; }
          50% { box-shadow: 0 0 30px ${currentTheme.colors.primary}80; }
        }
        
        @keyframes progress-shine {
          0% { transform: translateX(-20px); }
          100% { transform: translateX(20px); }
        }
      `}</style>
    </div>
  );
};