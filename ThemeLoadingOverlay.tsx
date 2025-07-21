import React from 'react';
import { Palette } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const ThemeLoadingOverlay: React.FC = () => {
  const { isChangingTheme, currentTheme, themeName } = useTheme();

  if (!isChangingTheme) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[9999] animate-fade-in">
      <div 
        className={`text-center p-8 rounded-3xl transform transition-all duration-500 ${
          themeName === 'glassmorphism' ? 'backdrop-blur-md' : ''
        } ${
          themeName === 'cyber' ? 'cyber-loading-glow' : ''
        } ${
          themeName === 'speedster' ? 'speedster-loading-glow' : ''
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
            : themeName === 'speedster'
              ? '0 0 60px rgba(0, 102, 255, 0.6), inset 0 0 30px rgba(0, 102, 255, 0.2)'
              : '0 20px 40px rgba(0, 0, 0, 0.3)'
        }}
      >
        {/* Theme Icon with Animation */}
        <div className="relative mb-8">
          <div 
            className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center relative overflow-hidden ${
              themeName === 'cyber' ? 'cyber-theme-glow' : 
              themeName === 'speedster' ? 'speedster-theme-glow' : 'apple-theme-glow'
            }`}
            style={{ 
              backgroundColor: currentTheme.colors.primary,
              boxShadow: `0 0 40px ${currentTheme.colors.primary}60`
            }}
          >
            <Palette className="w-12 h-12 text-white z-10" />
            
            {/* Animated rings */}
            <div className="absolute inset-0 rounded-full border-2 border-white opacity-30 animate-ping" />
            <div className="absolute inset-2 rounded-full border border-white opacity-20 animate-ping" style={{ animationDelay: '0.5s' }} />
            <div className="absolute inset-4 rounded-full border border-white opacity-10 animate-ping" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Loading Text */}
        <h2 
          className={`text-2xl font-bold mb-4 transition-all duration-300 ${
            themeName === 'cyber' ? 'cyber-text-glow' : 
            themeName === 'speedster' ? 'speedster-text-glow' : ''
          }`}
          style={{ color: currentTheme.colors.text.primary }}
        >
          🎨 Applying Theme
        </h2>

        {/* Progress Animation */}
        <div className="w-80 mx-auto">
          <div 
            className="h-2 rounded-full overflow-hidden mb-4"
            style={{ backgroundColor: currentTheme.colors.accent }}
          >
            <div 
              className={`h-full transition-all duration-100 ease-out ${
                themeName === 'cyber' ? 'cyber-progress-glow' : 
                themeName === 'speedster' ? 'speedster-progress-glow' : 'apple-progress-glow'
              }`}
              style={{ 
                width: '100%',
                backgroundColor: currentTheme.colors.primary,
                boxShadow: themeName === 'cyber' 
                  ? `0 0 20px ${currentTheme.colors.primary}` 
                  : themeName === 'speedster'
                    ? '0 0 20px rgba(0, 102, 255, 1)'
                    : `0 0 10px ${currentTheme.colors.primary}60`,
                animation: 'loading-sweep 0.8s ease-in-out'
              }}
            />
          </div>
          
          <p 
            className="text-sm"
            style={{ color: currentTheme.colors.text.secondary }}
          >
            Loading new theme...
          </p>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-2 h-2 rounded-full ${
                themeName === 'cyber' ? 'cyber-particle' : 
                themeName === 'speedster' ? 'speedster-particle' : 'apple-particle'
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
        @keyframes loading-sweep {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        @keyframes apple-theme-glow {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 40px ${currentTheme.colors.primary}60;
          }
          50% { 
            transform: scale(1.05);
            box-shadow: 0 0 60px ${currentTheme.colors.primary}80;
          }
        }
        
        @keyframes cyber-theme-glow {
          0%, 100% { 
            transform: scale(1) rotate(0deg);
            box-shadow: 0 0 40px ${currentTheme.colors.primary}60, inset 0 0 20px ${currentTheme.colors.primary}20;
          }
          50% { 
            transform: scale(1.1) rotate(180deg);
            box-shadow: 0 0 80px ${currentTheme.colors.primary}80, inset 0 0 40px ${currentTheme.colors.primary}40;
          }
        }
        
        @keyframes speedster-theme-glow {
          0%, 100% { 
            transform: scale(1);
            box-shadow: 0 0 40px rgba(0, 102, 255, 0.6);
          }
          50% { 
            transform: scale(1.1);
            box-shadow: 0 0 80px rgba(0, 102, 255, 0.8);
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
        
        @keyframes speedster-float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.6; }
          50% { transform: translateY(-25px) translateX(10px); opacity: 1; }
        }
        
        .apple-theme-glow {
          animation: apple-theme-glow 2s ease-in-out infinite;
        }
        
        .cyber-theme-glow {
          animation: cyber-theme-glow 3s ease-in-out infinite;
        }
        
        .speedster-theme-glow {
          animation: speedster-theme-glow 2s ease-in-out infinite;
        }
        
        .apple-particle {
          animation: apple-float 3s ease-in-out infinite;
        }
        
        .cyber-particle {
          animation: cyber-float 4s ease-in-out infinite;
        }
        
        .speedster-particle {
          animation: speedster-float 3s ease-in-out infinite;
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
        
        .speedster-progress-glow {
          position: relative;
        }
        
        .speedster-progress-glow::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 25px;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 102, 255, 1), transparent);
          animation: speedster-progress-scan 1s linear infinite;
        }
        
        .cyber-loading-glow {
          position: relative;
        }
        
        .cyber-loading-glow::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, ${currentTheme.colors.primary}60, transparent, ${currentTheme.colors.primary}60);
          border-radius: inherit;
          z-index: -1;
          animation: cyber-border-pulse 2s infinite;
        }
        
        .speedster-loading-glow {
          position: relative;
        }
        
        .speedster-loading-glow::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, rgba(0, 102, 255, 0.6), transparent, rgba(0, 102, 255, 0.6));
          border-radius: inherit;
          z-index: -1;
          animation: speedster-border-pulse 1.5s infinite;
        }
        
        .cyber-text-glow {
          text-shadow: 0 0 20px currentColor;
          animation: cyber-text-flicker 3s infinite;
        }
        
        .speedster-text-glow {
          text-shadow: 0 0 15px rgba(0, 102, 255, 0.8);
          animation: speedster-text-pulse 2s infinite;
        }
        
        @keyframes progress-shine {
          0% { transform: translateX(-20px); }
          100% { transform: translateX(20px); }
        }
        
        @keyframes cyber-progress-scan {
          0% { transform: translateX(-30px); }
          100% { transform: translateX(30px); }
        }
        
        @keyframes speedster-progress-scan {
          0% { transform: translateX(-25px); }
          100% { transform: translateX(25px); }
        }
        
        @keyframes cyber-border-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        @keyframes speedster-border-pulse {
          0%, 100% { opacity: 0.6; }
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
        
        @keyframes speedster-text-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
};