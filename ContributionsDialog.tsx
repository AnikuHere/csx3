import React from 'react';
import { X, MessageCircle, Code, Heart, ExternalLink } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ContributionsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContributionsDialog: React.FC<ContributionsDialogProps> = ({ isOpen, onClose }) => {
  const { currentTheme, themeName } = useTheme();

  const handleJoinDiscord = () => {
    window.open('https://discord.gg/dhpGeeeQ23', '_blank');
  };

  const handleGitHub = () => {
    window.open('https://github.com/csx3-community', '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div 
        className={`w-full max-w-lg rounded-2xl flex flex-col overflow-hidden ${
          themeName === 'glassmorphism' ? 'backdrop-blur-md' : ''
        } ${
          themeName === 'cyber' ? 'cyber-contributions-glow' : ''
        } ${
          themeName === 'speedster' ? 'speedster-contributions-glow' : ''
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
            ? `0 0 40px ${currentTheme.colors.primary}40` 
            : themeName === 'speedster'
              ? '0 0 40px rgba(0, 102, 255, 0.4)'
              : '0 10px 25px rgba(0, 0, 0, 0.2)'
        }}
      >
        {/* Header */}
        <div 
          className="p-6 border-b"
          style={{ borderColor: currentTheme.colors.border }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className={`p-3 rounded-full ${
                  themeName === 'cyber' ? 'cyber-icon-glow' : ''
                } ${
                  themeName === 'speedster' ? 'speedster-icon-glow' : ''
                }`}
                style={{ backgroundColor: currentTheme.colors.primary }}
              >
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h2 
                className={`text-2xl font-bold ${
                  themeName === 'cyber' ? 'cyber-text-glow' : ''
                } ${
                  themeName === 'speedster' ? 'speedster-text-glow' : ''
                }`}
                style={{ color: currentTheme.colors.text.primary }}
              >
                🤝 Contribute to CSX3
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-opacity-20 hover:bg-white transition-colors"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p 
            className="text-lg mb-6 leading-relaxed"
            style={{ color: currentTheme.colors.text.primary }}
          >
            Help us shape CSX3 by providing your own ideas and code! Your contributions make CSX3 better for everyone.
          </p>

          {/* Contribution Ways */}
          <div className="space-y-4 mb-6">
            <div 
              className={`p-4 rounded-lg border ${
                themeName === 'cyber' ? 'cyber-contribution-card' : ''
              } ${
                themeName === 'speedster' ? 'speedster-contribution-card' : ''
              }`}
              style={{
                backgroundColor: currentTheme.colors.accent,
                borderColor: currentTheme.colors.border
              }}
            >
              <div className="flex items-start space-x-3">
                <MessageCircle className="w-5 h-5 mt-1" style={{ color: currentTheme.colors.primary }} />
                <div>
                  <h3 
                    className="font-semibold mb-1"
                    style={{ color: currentTheme.colors.text.primary }}
                  >
                    Share Ideas & Feedback
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: currentTheme.colors.text.secondary }}
                  >
                    Join our Discord community to suggest new features, report bugs, or discuss improvements.
                  </p>
                </div>
              </div>
            </div>

            <div 
              className={`p-4 rounded-lg border ${
                themeName === 'cyber' ? 'cyber-contribution-card' : ''
              } ${
                themeName === 'speedster' ? 'speedster-contribution-card' : ''
              }`}
              style={{
                backgroundColor: currentTheme.colors.accent,
                borderColor: currentTheme.colors.border
              }}
            >
              <div className="flex items-start space-x-3">
                <Code className="w-5 h-5 mt-1" style={{ color: currentTheme.colors.primary }} />
                <div>
                  <h3 
                    className="font-semibold mb-1"
                    style={{ color: currentTheme.colors.text.primary }}
                  >
                    Contribute Code
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: currentTheme.colors.text.secondary }}
                  >
                    Submit pull requests, create extensions, or help improve existing features on GitHub.
                  </p>
                </div>
              </div>
            </div>

            <div 
              className={`p-4 rounded-lg border ${
                themeName === 'cyber' ? 'cyber-contribution-card' : ''
              } ${
                themeName === 'speedster' ? 'speedster-contribution-card' : ''
              }`}
              style={{
                backgroundColor: currentTheme.colors.accent,
                borderColor: currentTheme.colors.border
              }}
            >
              <div className="flex items-start space-x-3">
                <Heart className="w-5 h-5 mt-1" style={{ color: currentTheme.colors.primary }} />
                <div>
                  <h3 
                    className="font-semibold mb-1"
                    style={{ color: currentTheme.colors.text.primary }}
                  >
                    Spread the Word
                  </h3>
                  <p 
                    className="text-sm"
                    style={{ color: currentTheme.colors.text.secondary }}
                  >
                    Share CSX3 with other developers and help grow our community of creators.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={handleJoinDiscord}
              className={`w-full flex items-center justify-center space-x-3 p-4 rounded-lg transition-all duration-200 hover:scale-105 ${
                themeName === 'cyber' ? 'cyber-discord-button' : ''
              } ${
                themeName === 'speedster' ? 'speedster-discord-button' : ''
              }`}
              style={{
                backgroundColor: '#5865F2',
                color: 'white',
                boxShadow: themeName === 'cyber' 
                  ? '0 0 20px #5865F240' 
                  : themeName === 'speedster'
                    ? '0 0 20px #5865F240'
                    : 'none'
              }}
            >
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">Join Discord Community</span>
              <ExternalLink className="w-4 h-4" />
            </button>

            <button
              onClick={handleGitHub}
              className={`w-full flex items-center justify-center space-x-3 p-4 rounded-lg transition-all duration-200 hover:scale-105 ${
                themeName === 'cyber' ? 'cyber-github-button' : ''
              } ${
                themeName === 'speedster' ? 'speedster-github-button' : ''
              }`}
              style={{
                backgroundColor: '#24292e',
                color: 'white',
                boxShadow: themeName === 'cyber' 
                  ? '0 0 20px #24292e40' 
                  : themeName === 'speedster'
                    ? '0 0 20px #24292e40'
                    : 'none'
              }}
            >
              <Code className="w-5 h-5" />
              <span className="font-semibold">Contribute on GitHub</span>
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p 
              className="text-sm"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              Together, we can make CSX3 the best coding experience possible! 🚀
            </p>
          </div>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx>{`
        .cyber-contributions-glow {
          position: relative;
        }
        
        .cyber-contributions-glow::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, ${currentTheme.colors.primary}60, transparent, ${currentTheme.colors.primary}60);
          border-radius: inherit;
          z-index: -1;
          animation: cyber-pulse 3s infinite;
        }
        
        .speedster-contributions-glow {
          position: relative;
        }
        
        .speedster-contributions-glow::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #0066ff60, transparent, #0066ff60);
          border-radius: inherit;
          z-index: -1;
          animation: speedster-pulse 2s infinite;
        }
        
        .cyber-contribution-card {
          position: relative;
          overflow: hidden;
        }
        
        .cyber-contribution-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, ${currentTheme.colors.primary}, transparent);
          animation: cyber-scan 4s linear infinite;
        }
        
        .speedster-contribution-card {
          position: relative;
          overflow: hidden;
        }
        
        .speedster-contribution-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, #0066ff, transparent);
          animation: speedster-scan 3s linear infinite;
        }
        
        .cyber-icon-glow {
          box-shadow: 0 0 20px ${currentTheme.colors.primary}60;
          animation: cyber-icon-pulse 2s infinite;
        }
        
        .speedster-icon-glow {
          box-shadow: 0 0 20px rgba(0, 102, 255, 0.6);
          animation: speedster-icon-pulse 1.5s infinite;
        }
        
        .cyber-text-glow {
          text-shadow: 0 0 10px currentColor;
        }
        
        .speedster-text-glow {
          text-shadow: 0 0 10px #0066ff;
        }
        
        .cyber-discord-button:hover {
          box-shadow: 0 0 30px #5865F280 !important;
        }
        
        .speedster-discord-button:hover {
          box-shadow: 0 0 30px #5865F280 !important;
        }
        
        .cyber-github-button:hover {
          box-shadow: 0 0 30px #24292e80 !important;
        }
        
        .speedster-github-button:hover {
          box-shadow: 0 0 30px #24292e80 !important;
        }
        
        @keyframes cyber-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        @keyframes speedster-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        @keyframes cyber-scan {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes speedster-scan {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        @keyframes cyber-icon-pulse {
          0%, 100% { box-shadow: 0 0 20px ${currentTheme.colors.primary}60; }
          50% { box-shadow: 0 0 30px ${currentTheme.colors.primary}80; }
        }
        
        @keyframes speedster-icon-pulse {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 102, 255, 0.6); }
          50% { box-shadow: 0 0 30px rgba(0, 102, 255, 0.8); }
        }
      `}</style>
    </div>
  );
};