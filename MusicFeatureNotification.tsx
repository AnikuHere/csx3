import React from 'react';
import { Music, X, Volume2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface MusicFeatureNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  onEnable: () => void;
  onDismiss: () => void;
}

export const MusicFeatureNotification: React.FC<MusicFeatureNotificationProps> = ({
  isOpen,
  onClose,
  onEnable,
  onDismiss
}) => {
  const { currentTheme, themeName } = useTheme();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div 
        className={`max-w-md w-full mx-4 rounded-2xl p-6 transform transition-all duration-300 animate-scale-in ${
          themeName === 'glassmorphism' ? 'backdrop-blur-md' : ''
        } ${
          themeName === 'cyber' ? 'cyber-notification-glow' : ''
        } ${
          themeName === 'speedster' ? 'speedster-notification-glow' : ''
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
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div 
              className={`p-3 rounded-full ${
                themeName === 'cyber' ? 'cyber-icon-glow' : ''
              } ${
                themeName === 'speedster' ? 'speedster-icon-glow' : ''
              }`}
              style={{ backgroundColor: currentTheme.colors.primary }}
            >
              <Music className="w-6 h-6 text-white" />
            </div>
            <h2 
              className={`text-xl font-bold ${
                themeName === 'cyber' ? 'cyber-text-glow' : ''
              } ${
                themeName === 'speedster' ? 'speedster-text-glow' : ''
              }`}
              style={{ color: currentTheme.colors.text.primary }}
            >
              🎵 New Feature: Music Player
            </h2>
          </div>
          
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-opacity-20 hover:bg-white transition-colors"
            style={{ color: currentTheme.colors.text.secondary }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p 
            className="text-base leading-relaxed mb-4"
            style={{ color: currentTheme.colors.text.primary }}
          >
            Enhance your coding experience with our new music player! Listen to curated coding playlists while you work.
          </p>
          
          <div 
            className="p-4 rounded-lg mb-4"
            style={{
              backgroundColor: currentTheme.colors.accent,
              border: `1px solid ${currentTheme.colors.border}`
            }}
          >
            <h3 
              className="font-semibold mb-2"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Features:
            </h3>
            <ul 
              className="text-sm space-y-1"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              <li>• Curated coding playlists</li>
              <li>• Background music while coding</li>
              <li>• Skip tracks you don't like</li>
              <li>• Copy links to listen elsewhere</li>
              <li>• Disable anytime</li>
            </ul>
          </div>

          <p 
            className="text-sm"
            style={{ color: currentTheme.colors.text.secondary }}
          >
            Music is disabled by default. You can enable it now or later from the settings.
          </p>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            onClick={onDismiss}
            className="flex-1 px-4 py-2 rounded-lg transition-colors"
            style={{
              backgroundColor: 'transparent',
              color: currentTheme.colors.text.secondary,
              border: `1px solid ${currentTheme.colors.border}`
            }}
          >
            Maybe Later
          </button>
          
          <button
            onClick={onEnable}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
              themeName === 'cyber' ? 'cyber-enable-button' : ''
            } ${
              themeName === 'speedster' ? 'speedster-enable-button' : ''
            }`}
            style={{
              backgroundColor: currentTheme.colors.primary,
              color: 'white',
              boxShadow: themeName === 'cyber' 
                ? `0 0 20px ${currentTheme.colors.primary}40` 
                : themeName === 'speedster'
                  ? '0 0 20px rgba(0, 102, 255, 0.4)'
                  : 'none'
            }}
          >
            <Volume2 className="w-4 h-4" />
            <span>Enable Music</span>
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
        
        .cyber-notification-glow {
          position: relative;
        }
        
        .cyber-notification-glow::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, ${currentTheme.colors.primary}60, transparent, ${currentTheme.colors.primary}60);
          border-radius: inherit;
          z-index: -1;
          animation: cyber-pulse 2s infinite;
        }
        
        .speedster-notification-glow {
          position: relative;
        }
        
        .speedster-notification-glow::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #0066ff60, transparent, #0066ff60);
          border-radius: inherit;
          z-index: -1;
          animation: speedster-pulse 1.5s infinite;
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
        
        .cyber-enable-button:hover {
          box-shadow: 0 0 30px ${currentTheme.colors.primary}80 !important;
        }
        
        .speedster-enable-button:hover {
          box-shadow: 0 0 30px rgba(0, 102, 255, 0.8) !important;
        }
        
        @keyframes cyber-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        @keyframes speedster-pulse {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
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