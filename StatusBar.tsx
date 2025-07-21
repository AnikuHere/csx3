import React from 'react';
import { Terminal, Bot } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface StatusBarProps {
  activeFile: string;
  language: string;
  onToggleTerminal: () => void;
  onToggleAI: () => void;
}

export const StatusBar: React.FC<StatusBarProps> = ({ 
  activeFile, 
  language, 
  onToggleTerminal, 
  onToggleAI 
}) => {
  const { currentTheme } = useTheme();

  const statusBarStyle = {
    backgroundColor: currentTheme.colors.primary,
    color: 'white'
  };

  return (
    <div className="h-6 flex items-center justify-between px-3 text-xs" style={statusBarStyle}>
      <div className="flex items-center space-x-4">
        <span>{activeFile || 'No file selected'}</span>
        {language && (
          <span className="px-2 py-0.5 rounded" style={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }}>
            {language.toUpperCase()}
          </span>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <button 
          onClick={onToggleTerminal}
          className="hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
          title="Toggle Terminal"
        >
          <Terminal className="w-3 h-3" />
        </button>
        <button 
          onClick={onToggleAI}
          className="hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
          title="Toggle AI Assistant"
        >
          <Bot className="w-3 h-3" />
        </button>
        <span className="opacity-90">CSX3 Ready</span>
      </div>
    </div>
  );
};