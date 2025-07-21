import React from 'react';
import { X, Star, Zap, Shield, Palette, Bot, Code } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ChangelogProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Changelog: React.FC<ChangelogProps> = ({ isOpen, onClose }) => {
  const { currentTheme, themeName } = useTheme();

  const changelog = [
    {
      version: "2.0.0",
      date: "2025-07-20",
      type: "major",
      changes: [
        {
          type: "new",
          icon: <Bot className="w-4 h-4" />,
          title: "Gedit Game Engine",
          description: "Introduced Gedit, a complete 2D/3D game development engine with visual programming support"
        },
        {
          type: "new",
          icon: <Code className="w-4 h-4" />,
          title: "Visual Programming Language",
          description: "Added drag-and-drop visual programming similar to Scratch and GDevelop for game development"
        },
        {
          type: "new",
          icon: <Star className="w-4 h-4" />,
          title: "Multi-Platform Export",
          description: "Export projects as APK, AAB, IPA, or EXE files with language selection support"
        },
        {
          type: "improvement",
          icon: <Zap className="w-4 h-4" />,
          title: "CSX3 Out of Beta",
          description: "CSX3 is now officially version 2.0 and no longer in beta status"
        },
        {
          type: "improvement",
          icon: <Palette className="w-4 h-4" />,
          title: "Removed Limited Themes",
          description: "Removed Sonic Speedster and Coppercraft themes, streamlined theme selection"
        },
        {
          type: "improvement",
          icon: <Shield className="w-4 h-4" />,
          title: "Enhanced Animations",
          description: "Added smooth animations for popups, dialogs, and UI transitions throughout the application"
        }
      ]
    },
    {
      version: "1.7.1",
      date: "2025-07-02",
      type: "major",
      changes: [
        {
          type: "new",
          icon: <Bot className="w-4 h-4" />,
          title: "Codect Auto-Correction",
          description: "Intelligent code error detection and automatic fixing with customizable preferences"
        },
        {
          type: "new",
          icon: <Code className="w-4 h-4" />,
          title: "Extensions Marketplace",
          description: "Browse and install extensions from GitHub repositories filtered by programming language"
        },
        {
          type: "new",
          icon: <Palette className="w-4 h-4" />,
          title: "New Themes",
          description: "Added Neon Dreams, Ocean Depths, Sunset Vibes, Forest Green, Royal Purple, and limited-time Coppercraft themes"
        },
        {
          type: "new",
          icon: <Star className="w-4 h-4" />,
          title: "Project Management",
          description: "Complete project saving system with autosave, project browser, and version control"
        },
        {
          type: "improvement",
          icon: <Zap className="w-4 h-4" />,
          title: "Enhanced AI Bootup",
          description: "Apple-style AI assistant initialization with theme-matching animations"
        },
        {
          type: "improvement",
          icon: <Shield className="w-4 h-4" />,
          title: "Mobile File Selection Fix",
          description: "Fixed touch interaction issues with file selection on mobile devices"
        }
      ]
    },
    {
      version: "1.6.1",
      date: "2025-06-19",
      type: "minor",
      changes: [
        {
          type: "new",
          icon: <Code className="w-4 h-4" />,
          title: "Test Runner",
          description: "Live application testing in a new window with HTML, CSS, JS, and X3 support"
        },
        {
          type: "improvement",
          icon: <Zap className="w-4 h-4" />,
          title: "Mobile Optimization",
          description: "Improved mobile interface with better touch controls and responsive design"
        },
        {
          type: "improvement",
          icon: <Palette className="w-4 h-4" />,
          title: "Theme System Enhancement",
          description: "Added more theme options and improved theme switching performance"
        }
      ]
    },
    {
      version: "1.3.2",
      date: "2025-06-14",
      type: "major",
      changes: [
        {
          type: "new",
          icon: <Star className="w-4 h-4" />,
          title: "Rebranding: EclipCode → CSX3",
          description: "Complete rebrand from EclipCode to CSX3 with new logo, colors, and identity"
        },
        {
          type: "new",
          icon: <Bot className="w-4 h-4" />,
          title: "Cody AI Assistant",
          description: "Integrated AI chatbot for coding help and programming guidance"
        },
        {
          type: "new",
          icon: <Palette className="w-4 h-4" />,
          title: "Theme System",
          description: "Multiple themes including Glassmorphism, Frutiger Aero, and Cyber"
        },
        {
          type: "new",
          icon: <Code className="w-4 h-4" />,
          title: "X3 Language Support",
          description: "Full syntax highlighting and execution support for the X3 programming language"
        }
      ]
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'new': return '#10b981';
      case 'improvement': return '#3b82f6';
      case 'fix': return '#f59e0b';
      default: return currentTheme.colors.text.secondary;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'new': return 'NEW';
      case 'improvement': return 'IMPROVED';
      case 'fix': return 'FIXED';
      default: return type.toUpperCase();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div 
        className={`w-full max-w-2xl max-h-[80vh] rounded-2xl flex flex-col overflow-hidden ${
          themeName === 'glassmorphism' ? 'backdrop-blur-md' : ''
        } ${
          themeName === 'cyber' ? 'cyber-changelog-glow' : ''
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
            : '0 10px 25px rgba(0, 0, 0, 0.2)'
        }}
      >
        {/* Header */}
        <div 
          className="p-6 border-b"
          style={{ borderColor: currentTheme.colors.border }}
        >
          <div className="flex items-center justify-between">
            <h2 
              className={`text-2xl font-bold ${
                themeName === 'cyber' ? 'cyber-text-glow' : ''
              }`}
              style={{ color: currentTheme.colors.text.primary }}
            >
              📋 What's New in CSX3
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-opacity-20 hover:bg-white transition-colors"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p 
            className="mt-2"
            style={{ color: currentTheme.colors.text.secondary }}
          >
            Stay up to date with the latest features and improvements
          </p>
        </div>

        {/* Changelog Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
            {changelog.map((release, index) => (
              <div key={release.version} className="relative">
                {/* Version Header */}
                <div className="flex items-center space-x-4 mb-4">
                  <div 
                    className={`px-3 py-1 rounded-full text-sm font-bold ${
                      themeName === 'cyber' ? 'cyber-version-badge' : ''
                    }`}
                    style={{
                      backgroundColor: currentTheme.colors.primary,
                      color: 'white',
                      boxShadow: themeName === 'cyber' 
                        ? `0 0 20px ${currentTheme.colors.primary}40` 
                        : 'none'
                    }}
                  >
                    v{release.version}
                  </div>
                  <span 
                    className="text-sm"
                    style={{ color: currentTheme.colors.text.secondary }}
                  >
                    {release.date}
                  </span>
                  {release.type === 'major' && (
                    <span 
                      className="px-2 py-1 rounded text-xs font-bold"
                      style={{ 
                        backgroundColor: '#ef4444',
                        color: 'white'
                      }}
                    >
                      MAJOR
                    </span>
                  )}
                </div>

                {/* Changes */}
                <div className="space-y-3">
                  {release.changes.map((change, changeIndex) => (
                    <div
                      key={changeIndex}
                      className={`flex items-start space-x-3 p-3 rounded-lg ${
                        themeName === 'cyber' ? 'cyber-change-item' : ''
                      }`}
                      style={{
                        backgroundColor: currentTheme.colors.accent,
                        border: `1px solid ${currentTheme.colors.border}`
                      }}
                    >
                      <div 
                        className="p-2 rounded-lg flex-shrink-0"
                        style={{ backgroundColor: getTypeColor(change.type) }}
                      >
                        {change.icon}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 
                            className="font-semibold"
                            style={{ color: currentTheme.colors.text.primary }}
                          >
                            {change.title}
                          </h4>
                          <span 
                            className="px-2 py-0.5 rounded text-xs font-bold"
                            style={{ 
                              backgroundColor: getTypeColor(change.type),
                              color: 'white'
                            }}
                          >
                            {getTypeLabel(change.type)}
                          </span>
                        </div>
                        <p 
                          className="text-sm"
                          style={{ color: currentTheme.colors.text.secondary }}
                        >
                          {change.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                {index < changelog.length - 1 && (
                  <div 
                    className="mt-8 border-t"
                    style={{ borderColor: currentTheme.colors.border }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div 
          className="p-4 border-t text-center"
          style={{ borderColor: currentTheme.colors.border }}
        >
          <p 
            className="text-sm"
            style={{ color: currentTheme.colors.text.secondary }}
          >
            Developed by <strong>Pointware & Velarium</strong>
          </p>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx>{`
        .cyber-changelog-glow {
          position: relative;
        }
        
        .cyber-changelog-glow::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, ${currentTheme.colors.primary}60, transparent, ${currentTheme.colors.primary}60);
          border-radius: inherit;
          z-index: -1;
          animation: cyber-pulse 3s infinite;
        }
        
        .cyber-text-glow {
          text-shadow: 0 0 10px currentColor;
        }
        
        .cyber-version-badge {
          animation: cyber-badge-glow 2s infinite;
        }
        
        .cyber-change-item {
          position: relative;
          overflow: hidden;
        }
        
        .cyber-change-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, ${currentTheme.colors.primary}, transparent);
          animation: cyber-scan 6s linear infinite;
        }
        
        @keyframes cyber-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        @keyframes cyber-badge-glow {
          0%, 100% { box-shadow: 0 0 20px ${currentTheme.colors.primary}40; }
          50% { box-shadow: 0 0 30px ${currentTheme.colors.primary}80; }
        }
        
        @keyframes cyber-scan {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};