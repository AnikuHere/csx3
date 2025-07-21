import React, { useState, useEffect } from 'react';
import { FolderOpen, Plus, Lightbulb, Code, FileText } from 'lucide-react';
import { Gamepad2 } from 'lucide-react';
import { Gamepad2 } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { ProjectManager, Project } from './ProjectManager';
import { ProjectCreationDialog } from './ProjectCreationDialog';
import type { FileItem } from '../App';

interface RecentProject {
  id: string;
  name: string;
  path: string;
  lastOpened: Date;
}

interface MainMenuProps {
  onOpenProject: () => void;
  onCreateProject: () => void;
  onOpenRecentProject: (project: RecentProject) => void;
  onProjectSelect: (project: Project) => void;
  onShowChangelog: () => void;
  currentFiles: FileItem[];
  onOpenGedit: () => void;
  onOpenGedit: () => void;
}

const tips = [
  {
    title: "X3 Language Basics",
    content: "X3 uses simple syntax: 'reg str name \"value\"' to declare variables, 'prt' to print, and 'if/end' for conditionals.",
    icon: "💡"
  },
  {
    title: "Keyboard Shortcuts",
    content: "Use Ctrl+S to save files, Ctrl+O to open projects, and Ctrl+` to toggle the terminal quickly.",
    icon: "⌨️"
  },
  {
    title: "AI Assistant",
    content: "Ask Cody about any programming language! He can help with JavaScript, Python, C++, C#, Lua, and more.",
    icon: "🤖"
  },
  {
    title: "Theme Customization",
    content: "Switch between themes like Glassmorphism, Frutiger Aero, Cyber, and more from the Themes menu for different coding experiences.",
    icon: "🎨"
  },
  {
    title: "Multi-Language Support",
    content: "CSX3 supports syntax highlighting for JavaScript, Python, Lua, C++, C#, X3, CSS, HTML, Markdown, and JSON.",
    icon: "🌐"
  },
  {
    title: "Terminal Integration",
    content: "Use the built-in terminal to run commands like 'help', 'ls', 'date', and 'node [file]' for quick testing.",
    icon: "💻"
  },
  {
    title: "File Management",
    content: "Organize your code with the file explorer. Create folders and files directly in the interface for better project structure.",
    icon: "📁"
  },
  {
    title: "Code Completion",
    content: "Take advantage of intelligent code suggestions and syntax highlighting to write cleaner, error-free code faster.",
    icon: "✨"
  },
  {
    title: "Project Workflow",
    content: "Save your work frequently and use 'Save As' to export your entire project as a text archive for backup.",
    icon: "💾"
  },
  {
    title: "Auto-Correction",
    content: "Codect automatically detects code issues and offers to fix them. Configure it to auto-fix or ask each time.",
    icon: "⚡"
  }
];

export const MainMenu: React.FC<MainMenuProps> = ({
  onOpenProject,
  onCreateProject,
  onOpenRecentProject,
  onProjectSelect,
  onShowChangelog,
  currentFiles,
  onOpenGedit
  onOpenGedit
}) => {
  const { currentTheme, themeName } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState<'tips' | 'projects'>('tips');
  const [showProjectCreation, setShowProjectCreation] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Change tip every 4 seconds
  useEffect(() => {
    if (activeTab === 'tips') {
      const tipTimer = setInterval(() => {
        setCurrentTipIndex((prev) => (prev + 1) % tips.length);
      }, 4000);

      return () => clearInterval(tipTimer);
    }
  }, [activeTab]);

  const handleCreateProject = () => {
    setShowProjectCreation(true);
  };

  const handleProjectCreated = (project: Project) => {
    onProjectSelect(project);
    setShowProjectCreation(false);
  };

  if (isLoading) {
    return (
      <div 
        className="h-screen flex items-center justify-center relative overflow-hidden"
        style={{ 
          background: currentTheme.colors.background,
          color: currentTheme.colors.text.primary 
        }}
      >
        {/* Loading Animation */}
        <div className="text-center">
          <div className="mb-8">
            <div 
              className={`w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4 ${
                themeName === 'cyber' ? 'animate-pulse' : ''
              }`}
              style={{ 
                background: themeName === 'glassmorphism' 
                  ? 'rgba(255, 255, 255, 0.1)' 
                  : currentTheme.colors.primary,
                backdropFilter: themeName === 'glassmorphism' ? 'blur(10px)' : 'none',
                border: themeName === 'glassmorphism' 
                  ? '1px solid rgba(255, 255, 255, 0.2)' 
                  : themeName === 'cyber' 
                    ? `2px solid ${currentTheme.colors.primary}` 
                    : 'none',
                boxShadow: themeName === 'cyber' 
                  ? `0 0 20px ${currentTheme.colors.primary}40` 
                  : 'none'
              }}
            >
              <Code className="w-8 h-8 text-white" />
            </div>
            <h1 
              className={`text-4xl font-bold mb-2 ${
                themeName === 'cyber' ? 'animate-pulse' : ''
              }`}
              style={{ color: currentTheme.colors.text.primary }}
            >
              CSX3
            </h1>
            <p 
              className="text-lg opacity-80"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              Loading your development environment...
            </p>
          </div>
          
          {/* Loading Bar */}
          <div 
            className="w-64 h-2 rounded-full mx-auto overflow-hidden"
            style={{ backgroundColor: `${currentTheme.colors.primary}20` }}
          >
            <div 
              className={`h-full rounded-full ${
                themeName === 'cyber' ? 'animate-pulse' : ''
              }`}
              style={{ 
                background: currentTheme.colors.primary,
                animation: 'loading-bar 1.5s ease-in-out',
                boxShadow: themeName === 'cyber' 
                  ? `0 0 10px ${currentTheme.colors.primary}` 
                  : 'none'
              }}
            />
          </div>
        </div>

        {/* Cyber Glitch Effects */}
        {themeName === 'cyber' && (
          <>
            <div className="absolute inset-0 pointer-events-none">
              <div className="cyber-glitch-1"></div>
              <div className="cyber-glitch-2"></div>
              <div className="cyber-glitch-3"></div>
            </div>
          </>
        )}

        <style jsx>{`
          @keyframes loading-bar {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          
          @keyframes cyber-glitch {
            0%, 100% { transform: translateX(0); opacity: 0; }
            10% { transform: translateX(-2px); opacity: 1; }
            20% { transform: translateX(2px); opacity: 0; }
            30% { transform: translateX(-1px); opacity: 1; }
            40% { transform: translateX(1px); opacity: 0; }
            50% { transform: translateX(0); opacity: 1; }
            60% { transform: translateX(-1px); opacity: 0; }
            70% { transform: translateX(1px); opacity: 1; }
            80% { transform: translateX(0); opacity: 0; }
            90% { transform: translateX(-2px); opacity: 1; }
          }
          
          .cyber-glitch-1 {
            position: absolute;
            top: 20%;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00ff41, transparent);
            animation: cyber-glitch 3s infinite;
          }
          
          .cyber-glitch-2 {
            position: absolute;
            top: 60%;
            left: 0;
            right: 0;
            height: 1px;
            background: linear-gradient(90deg, transparent, #ff0080, transparent);
            animation: cyber-glitch 2s infinite reverse;
          }
          
          .cyber-glitch-3 {
            position: absolute;
            top: 80%;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, transparent, #00ff41, transparent);
            animation: cyber-glitch 4s infinite;
            animation-delay: 1s;
          }
        `}</style>
      </div>
    );
  }

  const currentTip = tips[currentTipIndex];

  // Mobile Layout
  if (isMobile) {
    return (
      <div 
        className="h-screen flex flex-col relative overflow-hidden p-6"
        style={{ 
          background: currentTheme.colors.background,
          color: currentTheme.colors.text.primary 
        }}
      >
        {/* Cyber Glitch Effects */}
        {themeName === 'cyber' && (
          <div className="absolute inset-0 pointer-events-none z-10">
            <div className="cyber-scan-line"></div>
            <div className="cyber-glitch-overlay"></div>
          </div>
        )}

        {/* Logo Section */}
        <div className="text-center mb-8 relative z-20">
          <div 
            className={`w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-6 ${
              themeName === 'cyber' ? 'cyber-glow' : ''
            }`}
            style={{ 
              background: themeName === 'glassmorphism' 
                ? 'rgba(255, 255, 255, 0.15)' 
                : currentTheme.colors.primary,
              backdropFilter: themeName === 'glassmorphism' ? 'blur(20px)' : 'none',
              border: themeName === 'glassmorphism' 
                ? '1px solid rgba(255, 255, 255, 0.3)' 
                : themeName === 'cyber' 
                  ? `2px solid ${currentTheme.colors.primary}` 
                  : 'none',
              boxShadow: themeName === 'cyber' 
                ? `0 0 30px ${currentTheme.colors.primary}60, inset 0 0 20px ${currentTheme.colors.primary}20` 
                : themeName === 'glassmorphism'
                  ? '0 8px 32px rgba(0, 0, 0, 0.1)'
                  : 'none'
            }}
          >
            <Code className="w-10 h-10 text-white" />
          </div>
          <h1 
            className={`text-5xl font-bold mb-4 ${
              themeName === 'cyber' ? 'cyber-text-glow' : ''
            }`}
            style={{ color: currentTheme.colors.text.primary }}
          >
            CSX3
          </h1>
          <p 
            className="text-lg opacity-80"
            style={{ color: currentTheme.colors.text.secondary }}
          >
            Advanced Code Editor with AI Assistant
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mb-8 relative z-20">
          <button
            onClick={handleCreateProject}
            className={`w-full flex items-center justify-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
              themeName === 'cyber' ? 'cyber-button-glow' : ''
            }`}
            style={{
              background: themeName === 'glassmorphism' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : currentTheme.colors.primary,
              backdropFilter: themeName === 'glassmorphism' ? 'blur(20px)' : 'none',
              border: themeName === 'glassmorphism' 
                ? '1px solid rgba(255, 255, 255, 0.2)' 
                : themeName === 'cyber' 
                  ? `1px solid ${currentTheme.colors.primary}` 
                  : 'none',
              boxShadow: themeName === 'cyber' 
                ? `0 0 20px ${currentTheme.colors.primary}40` 
                : themeName === 'glassmorphism'
                  ? '0 8px 32px rgba(0, 0, 0, 0.1)'
                  : 'none'
            }}
          >
            <Plus className="w-6 h-6 text-white" />
            <span className="text-lg font-semibold text-white">Create New Project</span>
          </button>

          <button
            onClick={onOpenProject}
            className={`w-full flex items-center justify-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
              themeName === 'cyber' ? 'cyber-button-secondary' : ''
            }`}
            style={{
              background: themeName === 'glassmorphism' 
                ? 'rgba(255, 255, 255, 0.08)' 
                : 'transparent',
              backdropFilter: themeName === 'glassmorphism' ? 'blur(20px)' : 'none',
              border: themeName === 'glassmorphism' 
                ? '1px solid rgba(255, 255, 255, 0.15)' 
                : `2px solid ${currentTheme.colors.primary}`,
              boxShadow: themeName === 'glassmorphism'
                ? '0 8px 32px rgba(0, 0, 0, 0.05)'
                : 'none'
            }}
          >
            <FolderOpen className="w-6 h-6" style={{ color: currentTheme.colors.primary }} />
            <span 
              className="text-lg font-semibold"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Open Project
            </span>
          </button>

          <button
            onClick={onOpenGedit}
            className={`w-full flex items-center justify-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
              themeName === 'cyber' ? 'cyber-button-secondary' : ''
            }`}
            style={{
              background: themeName === 'glassmorphism' 
                ? 'rgba(255, 255, 255, 0.08)' 
                : 'transparent',
              backdropFilter: themeName === 'glassmorphism' ? 'blur(20px)' : 'none',
              border: themeName === 'glassmorphism' 
                ? '1px solid rgba(255, 255, 255, 0.15)' 
                : `2px solid ${currentTheme.colors.primary}`,
              boxShadow: themeName === 'glassmorphism'
                ? '0 8px 32px rgba(0, 0, 0, 0.05)'
                : 'none'
            }}
          >
            <Gamepad2 className="w-6 h-6" style={{ color: currentTheme.colors.primary }} />
            <span 
              className="text-lg font-semibold"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Open Gedit
            </span>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-4 relative z-20">
          <button
            onClick={() => setActiveTab('tips')}
            className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-l-xl transition-all duration-200 ${
              activeTab === 'tips' ? 'opacity-100' : 'opacity-60'
            }`}
            style={{
              backgroundColor: activeTab === 'tips' ? currentTheme.colors.primary : currentTheme.colors.accent,
              color: activeTab === 'tips' ? 'white' : currentTheme.colors.text.primary
            }}
          >
            <Lightbulb className="w-5 h-5" />
            <span>Tips</span>
          </button>
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-r-xl transition-all duration-200 ${
              activeTab === 'projects' ? 'opacity-100' : 'opacity-60'
            }`}
            style={{
              backgroundColor: activeTab === 'projects' ? currentTheme.colors.primary : currentTheme.colors.accent,
              color: activeTab === 'projects' ? 'white' : currentTheme.colors.text.primary
            }}
          >
            <FolderOpen className="w-5 h-5" />
            <span>Projects</span>
          </button>
        </div>

        {/* Content Area */}
        <div 
          className={`flex-1 rounded-2xl p-6 relative z-20 ${
            themeName === 'cyber' ? 'cyber-panel-glow' : ''
          }`}
          style={{
            background: themeName === 'glassmorphism' 
              ? 'rgba(255, 255, 255, 0.05)' 
              : currentTheme.colors.surface,
            backdropFilter: themeName === 'glassmorphism' ? 'blur(20px)' : 'none',
            border: themeName === 'glassmorphism' 
              ? '1px solid rgba(255, 255, 255, 0.1)' 
              : themeName === 'cyber' 
                ? `1px solid ${currentTheme.colors.primary}40` 
                : `1px solid ${currentTheme.colors.border}`,
            boxShadow: themeName === 'cyber' 
              ? `0 0 40px ${currentTheme.colors.primary}20, inset 0 0 40px ${currentTheme.colors.primary}10` 
              : themeName === 'glassmorphism'
                ? '0 8px 32px rgba(0, 0, 0, 0.1)'
                : 'none'
          }}
        >
          {activeTab === 'tips' ? (
            <>
              <div className="flex items-center space-x-3 mb-6">
                <Lightbulb className="w-6 h-6" style={{ color: currentTheme.colors.primary }} />
                <h2 
                  className="text-xl font-bold"
                  style={{ color: currentTheme.colors.text.primary }}
                >
                  Tips & Tricks
                </h2>
              </div>

              {/* Current Tip Display */}
              <div 
                className={`relative overflow-hidden rounded-xl p-4 transition-all duration-500 ${
                  themeName === 'cyber' ? 'cyber-tip-glow' : ''
                }`}
                style={{
                  background: themeName === 'glassmorphism' 
                    ? 'rgba(255, 255, 255, 0.08)' 
                    : currentTheme.colors.accent,
                  backdropFilter: themeName === 'glassmorphism' ? 'blur(10px)' : 'none',
                  border: themeName === 'glassmorphism' 
                    ? '1px solid rgba(255, 255, 255, 0.1)' 
                    : themeName === 'cyber'
                      ? `1px solid ${currentTheme.colors.primary}30`
                      : 'none',
                  boxShadow: themeName === 'glassmorphism'
                    ? '0 4px 16px rgba(0, 0, 0, 0.05)'
                    : themeName === 'cyber'
                      ? `0 0 20px ${currentTheme.colors.primary}20`
                      : 'none'
                }}
                key={currentTipIndex}
              >
                <div className="text-center">
                  <div 
                    className={`text-3xl mb-3 ${
                      themeName === 'cyber' ? 'animate-pulse' : ''
                    }`}
                  >
                    {currentTip.icon}
                  </div>
                  <h3 
                    className={`font-bold text-lg mb-3 ${
                      themeName === 'cyber' ? 'cyber-text-glow' : ''
                    }`}
                    style={{ color: currentTheme.colors.text.primary }}
                  >
                    {currentTip.title}
                  </h3>
                  <p 
                    className="text-sm leading-relaxed"
                    style={{ color: currentTheme.colors.text.secondary }}
                  >
                    {currentTip.content}
                  </p>
                </div>

                {/* Cyber scanning effect */}
                {themeName === 'cyber' && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="cyber-tip-scan"></div>
                  </div>
                )}
              </div>

              {/* Tip Progress Indicator */}
              <div className="mt-6 flex justify-center space-x-2">
                {tips.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentTipIndex ? 'scale-125' : 'opacity-50'
                    }`}
                    style={{
                      backgroundColor: index === currentTipIndex 
                        ? currentTheme.colors.primary 
                        : currentTheme.colors.text.secondary,
                      boxShadow: index === currentTipIndex && themeName === 'cyber'
                        ? `0 0 8px ${currentTheme.colors.primary}`
                        : 'none'
                    }}
                  />
                ))}
              </div>
            </>
          ) : (
            <ProjectManager
              onProjectSelect={onProjectSelect}
              onCreateProject={handleCreateProject}
              currentFiles={currentFiles}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-4 relative z-20">
          <button
            onClick={onShowChangelog}
            className="flex items-center space-x-2 mx-auto px-4 py-2 rounded-lg transition-colors hover:bg-opacity-20 hover:bg-white"
            style={{ color: currentTheme.colors.text.secondary }}
          >
            <FileText className="w-4 h-4" />
            <span className="text-sm">What's New</span>
          </button>
        </div>

        {/* Project Creation Dialog */}
        {showProjectCreation && (
          <ProjectCreationDialog
            isOpen={showProjectCreation}
            onClose={() => setShowProjectCreation(false)}
            onProjectCreated={handleProjectCreated}
          />
        )}

        {/* Global Mobile Styles */}
        <style jsx>{`
          @keyframes slide-in-up {
            from { transform: translateY(100px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
          
          @keyframes cyber-scan {
            0% { top: -2px; }
            100% { top: 100%; }
          }
          
          @keyframes cyber-flicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          
          @keyframes cyber-tip-scan {
            0% { left: -100%; }
            100% { left: 100%; }
          }
          
          .cyber-scan-line {
            position: absolute;
            left: 0;
            right: 0;
            height: 2px;
            background: linear-gradient(90deg, transparent, #00ff41, transparent);
            animation: cyber-scan 3s linear infinite;
          }
          
          .cyber-glitch-overlay {
            position: absolute;
            inset: 0;
            background: repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 255, 65, 0.03) 2px,
              rgba(0, 255, 65, 0.03) 4px
            );
            animation: cyber-flicker 0.15s infinite linear alternate;
          }
          
          .cyber-glow {
            animation: cyber-flicker 2s infinite;
          }
          
          .cyber-text-glow {
            text-shadow: 0 0 10px currentColor;
            animation: cyber-flicker 3s infinite;
          }
          
          .cyber-button-glow:active {
            box-shadow: 0 0 30px ${currentTheme.colors.primary}80 !important;
            transform: scale(0.98);
          }
          
          .cyber-button-secondary:active {
            background: rgba(0, 255, 65, 0.1) !important;
            box-shadow: 0 0 20px ${currentTheme.colors.primary}40 !important;
            transform: scale(0.98);
          }
          
          .cyber-panel-glow {
            position: relative;
          }
          
          .cyber-panel-glow::before {
            content: '';
            position: absolute;
            inset: -1px;
            background: linear-gradient(45deg, ${currentTheme.colors.primary}40, transparent, ${currentTheme.colors.primary}40);
            border-radius: inherit;
            z-index: -1;
            animation: cyber-flicker 4s infinite;
          }
          
          .cyber-tip-glow {
            position: relative;
            overflow: hidden;
          }
          
          .cyber-tip-scan {
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(0, 255, 65, 0.1), transparent);
            animation: cyber-tip-scan 3s linear infinite;
          }
        `}</style>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div 
      className="h-screen flex relative overflow-hidden"
      style={{ 
        background: currentTheme.colors.background,
        color: currentTheme.colors.text.primary 
      }}
    >
      {/* Cyber Glitch Effects */}
      {themeName === 'cyber' && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="cyber-scan-line"></div>
          <div className="cyber-glitch-overlay"></div>
        </div>
      )}

      {/* Left Panel - Logo and Main Actions */}
      <div 
        className={`w-1/2 flex flex-col justify-center items-start px-16 relative z-20 ${
          themeName === 'cyber' ? 'animate-fade-in-left' : 'animate-slide-in-left'
        }`}
      >
        {/* Logo */}
        <div className="mb-12">
          <div 
            className={`w-20 h-20 rounded-xl flex items-center justify-center mb-6 ${
              themeName === 'cyber' ? 'cyber-glow' : ''
            }`}
            style={{ 
              background: themeName === 'glassmorphism' 
                ? 'rgba(255, 255, 255, 0.15)' 
                : currentTheme.colors.primary,
              backdropFilter: themeName === 'glassmorphism' ? 'blur(20px)' : 'none',
              border: themeName === 'glassmorphism' 
                ? '1px solid rgba(255, 255, 255, 0.3)' 
                : themeName === 'cyber' 
                  ? `2px solid ${currentTheme.colors.primary}` 
                  : 'none',
              boxShadow: themeName === 'cyber' 
                ? `0 0 30px ${currentTheme.colors.primary}60, inset 0 0 20px ${currentTheme.colors.primary}20` 
                : themeName === 'glassmorphism'
                  ? '0 8px 32px rgba(0, 0, 0, 0.1)'
                  : 'none'
            }}
          >
            <Code className="w-10 h-10 text-white" />
          </div>
          <h1 
            className={`text-6xl font-bold mb-4 ${
              themeName === 'cyber' ? 'cyber-text-glow' : ''
            }`}
            style={{ color: currentTheme.colors.text.primary }}
          >
            CSX3
          </h1>
          <p 
            className="text-xl opacity-80"
            style={{ color: currentTheme.colors.text.secondary }}
          >
            Advanced Code Editor with AI Assistant
          </p>
        </div>

        {/* Main Action Buttons */}
        <div className="space-y-4 w-full max-w-md">
          <button
            onClick={handleCreateProject}
            className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
              themeName === 'cyber' ? 'cyber-button-glow' : ''
            }`}
            style={{
              background: themeName === 'glassmorphism' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : currentTheme.colors.primary,
              backdropFilter: themeName === 'glassmorphism' ? 'blur(20px)' : 'none',
              border: themeName === 'glassmorphism' 
                ? '1px solid rgba(255, 255, 255, 0.2)' 
                : themeName === 'cyber' 
                  ? `1px solid ${currentTheme.colors.primary}` 
                  : 'none',
              boxShadow: themeName === 'cyber' 
                ? `0 0 20px ${currentTheme.colors.primary}40` 
                : themeName === 'glassmorphism'
                  ? '0 8px 32px rgba(0, 0, 0, 0.1)'
                  : 'none'
            }}
          >
            <Plus className="w-6 h-6 text-white" />
            <span className="text-lg font-semibold text-white">Create New Project</span>
          </button>

          <button
            onClick={onOpenProject}
            className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
              themeName === 'cyber' ? 'cyber-button-secondary' : ''
            }`}
            style={{
              background: themeName === 'glassmorphism' 
                ? 'rgba(255, 255, 255, 0.08)' 
                : 'transparent',
              backdropFilter: themeName === 'glassmorphism' ? 'blur(20px)' : 'none',
              border: themeName === 'glassmorphism' 
                ? '1px solid rgba(255, 255, 255, 0.15)' 
                : `2px solid ${currentTheme.colors.primary}`,
              boxShadow: themeName === 'glassmorphism'
                ? '0 8px 32px rgba(0, 0, 0, 0.05)'
                : 'none'
            }}
          >
            <FolderOpen className="w-6 h-6" style={{ color: currentTheme.colors.primary }} />
            <span 
              className="text-lg font-semibold"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Open Project
            </span>
          </button>

          <button
            onClick={onOpenGedit}
            className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 hover:scale-105 ${
              themeName === 'cyber' ? 'cyber-button-secondary' : ''
            }`}
            style={{
              background: themeName === 'glassmorphism' 
                ? 'rgba(255, 255, 255, 0.08)' 
                : 'transparent',
              backdropFilter: themeName === 'glassmorphism' ? 'blur(20px)' : 'none',
              border: themeName === 'glassmorphism' 
                ? '1px solid rgba(255, 255, 255, 0.15)' 
                : `2px solid ${currentTheme.colors.primary}`,
              boxShadow: themeName === 'glassmorphism'
                ? '0 8px 32px rgba(0, 0, 0, 0.05)'
                : 'none'
            }}
          >
            <Gamepad2 className="w-6 h-6" style={{ color: currentTheme.colors.primary }} />
            <span 
              className="text-lg font-semibold"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Open Gedit
            </span>
          </button>
        </div>

        {/* Changelog Button */}
        <div className="mt-8">
          <button
            onClick={onShowChangelog}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors hover:bg-opacity-20 hover:bg-white"
            style={{ color: currentTheme.colors.text.secondary }}
          >
            <FileText className="w-4 h-4" />
            <span>What's New</span>
          </button>
        </div>
      </div>

      {/* Right Panel - Tips and Projects */}
      <div 
        className={`w-1/2 p-16 relative z-20 ${
          themeName === 'cyber' ? 'animate-fade-in-right' : 'animate-slide-in-right'
        }`}
      >
        <div 
          className={`h-full rounded-2xl flex flex-col ${
            themeName === 'cyber' ? 'cyber-panel-glow' : ''
          }`}
          style={{
            background: themeName === 'glassmorphism' 
              ? 'rgba(255, 255, 255, 0.05)' 
              : currentTheme.colors.surface,
            backdropFilter: themeName === 'glassmorphism' ? 'blur(20px)' : 'none',
            border: themeName === 'glassmorphism' 
              ? '1px solid rgba(255, 255, 255, 0.1)' 
              : themeName === 'cyber' 
                ? `1px solid ${currentTheme.colors.primary}40` 
                : `1px solid ${currentTheme.colors.border}`,
            boxShadow: themeName === 'cyber' 
              ? `0 0 40px ${currentTheme.colors.primary}20, inset 0 0 40px ${currentTheme.colors.primary}10` 
              : themeName === 'glassmorphism'
                ? '0 8px 32px rgba(0, 0, 0, 0.1)'
                : 'none'
          }}
        >
          {/* Tab Navigation */}
          <div className="flex p-6 pb-0">
            <button
              onClick={() => setActiveTab('tips')}
              className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-l-xl transition-all duration-200 ${
                activeTab === 'tips' ? 'opacity-100' : 'opacity-60'
              }`}
              style={{
                backgroundColor: activeTab === 'tips' ? currentTheme.colors.primary : currentTheme.colors.accent,
                color: activeTab === 'tips' ? 'white' : currentTheme.colors.text.primary
              }}
            >
              <Lightbulb className="w-5 h-5" />
              <span>Tips & Tricks</span>
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex-1 flex items-center justify-center space-x-2 p-3 rounded-r-xl transition-all duration-200 ${
                activeTab === 'projects' ? 'opacity-100' : 'opacity-60'
              }`}
              style={{
                backgroundColor: activeTab === 'projects' ? currentTheme.colors.primary : currentTheme.colors.accent,
                color: activeTab === 'projects' ? 'white' : currentTheme.colors.text.primary
              }}
            >
              <FolderOpen className="w-5 h-5" />
              <span>My Projects</span>
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 p-6 pt-4">
            {activeTab === 'tips' ? (
              <>
                {/* Current Tip Display */}
                <div 
                  className={`relative overflow-hidden rounded-xl p-6 transition-all duration-500 ${
                    themeName === 'cyber' ? 'cyber-tip-glow' : ''
                  }`}
                  style={{
                    background: themeName === 'glassmorphism' 
                      ? 'rgba(255, 255, 255, 0.08)' 
                      : currentTheme.colors.accent,
                    backdropFilter: themeName === 'glassmorphism' ? 'blur(10px)' : 'none',
                    border: themeName === 'glassmorphism' 
                      ? '1px solid rgba(255, 255, 255, 0.1)' 
                      : themeName === 'cyber'
                        ? `1px solid ${currentTheme.colors.primary}30`
                        : 'none',
                    boxShadow: themeName === 'glassmorphism'
                      ? '0 4px 16px rgba(0, 0, 0, 0.05)'
                      : themeName === 'cyber'
                        ? `0 0 20px ${currentTheme.colors.primary}20`
                        : 'none'
                  }}
                  key={currentTipIndex}
                >
                  <div className="flex items-start space-x-4">
                    <div 
                      className={`text-3xl flex-shrink-0 ${
                        themeName === 'cyber' ? 'animate-pulse' : ''
                      }`}
                    >
                      {currentTip.icon}
                    </div>
                    <div className="flex-1">
                      <h3 
                        className={`font-bold text-xl mb-3 ${
                          themeName === 'cyber' ? 'cyber-text-glow' : ''
                        }`}
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        {currentTip.title}
                      </h3>
                      <p 
                        className="text-base leading-relaxed"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        {currentTip.content}
                      </p>
                    </div>
                  </div>

                  {/* Cyber scanning effect */}
                  {themeName === 'cyber' && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="cyber-tip-scan"></div>
                    </div>
                  )}
                </div>

                {/* Tip Progress Indicator */}
                <div className="mt-8 flex justify-center space-x-2">
                  {tips.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentTipIndex ? 'scale-125' : 'opacity-50'
                      }`}
                      style={{
                        backgroundColor: index === currentTipIndex 
                          ? currentTheme.colors.primary 
                          : currentTheme.colors.text.secondary,
                        boxShadow: index === currentTipIndex && themeName === 'cyber'
                          ? `0 0 8px ${currentTheme.colors.primary}`
                          : 'none'
                      }}
                    />
                  ))}
                </div>

                {/* Next tip countdown */}
                <div className="mt-4 text-center">
                  <p 
                    className="text-sm opacity-60"
                    style={{ color: currentTheme.colors.text.secondary }}
                  >
                    Next tip in a few seconds...
                  </p>
                </div>
              </>
            ) : (
              <ProjectManager
                onProjectSelect={onProjectSelect}
                onCreateProject={handleCreateProject}
                currentFiles={currentFiles}
              />
            )}
          </div>
        </div>
      </div>

      {/* Project Creation Dialog */}
      {showProjectCreation && (
        <ProjectCreationDialog
          isOpen={showProjectCreation}
          onClose={() => setShowProjectCreation(false)}
          onProjectCreated={handleProjectCreated}
        />
      )}

      {/* Global Styles */}
      <style jsx>{`
        @keyframes slide-in-left {
          from { transform: translateX(-100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slide-in-right {
          from { transform: translateX(100px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fade-in-left {
          from { transform: translateX(-50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes fade-in-right {
          from { transform: translateX(50px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes cyber-scan {
          0% { top: -2px; }
          100% { top: 100%; }
        }
        
        @keyframes cyber-flicker {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        
        @keyframes cyber-tip-scan {
          0% { left: -100%; }
          100% { left: 100%; }
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }
        
        .animate-fade-in-left {
          animation: fade-in-left 1s ease-out;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 1s ease-out;
        }
        
        .cyber-scan-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00ff41, transparent);
          animation: cyber-scan 3s linear infinite;
        }
        
        .cyber-glitch-overlay {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 65, 0.03) 2px,
            rgba(0, 255, 65, 0.03) 4px
          );
          animation: cyber-flicker 0.15s infinite linear alternate;
        }
        
        .cyber-glow {
          animation: cyber-flicker 2s infinite;
        }
        
        .cyber-text-glow {
          text-shadow: 0 0 10px currentColor;
          animation: cyber-flicker 3s infinite;
        }
        
        .cyber-button-glow:hover {
          box-shadow: 0 0 30px ${currentTheme.colors.primary}80 !important;
        }
        
        .cyber-button-secondary:hover {
          background: rgba(0, 255, 65, 0.1) !important;
          box-shadow: 0 0 20px ${currentTheme.colors.primary}40 !important;
        }
        
        .cyber-panel-glow {
          position: relative;
        }
        
        .cyber-panel-glow::before {
          content: '';
          position: absolute;
          inset: -1px;
          background: linear-gradient(45deg, ${currentTheme.colors.primary}40, transparent, ${currentTheme.colors.primary}40);
          border-radius: inherit;
          z-index: -1;
          animation: cyber-flicker 4s infinite;
        }
        
        .cyber-tip-glow {
          position: relative;
          overflow: hidden;
        }
        
        .cyber-tip-scan {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(0, 255, 65, 0.1), transparent);
          animation: cyber-tip-scan 3s linear infinite;
        }
      `}</style>
    </div>
  );
};