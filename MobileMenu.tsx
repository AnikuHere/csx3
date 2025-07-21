import React from 'react';
import { X, Save, Download, FolderOpen, Code, Palette, HelpCircle, Play, Package, FileText } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import type { FileItem } from '../App';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
  onSaveAs: () => void;
  onSaveProject: () => void;
  onOpen: () => void;
  onSyntaxChange: (syntax: string) => void;
  onTest: () => void;
  onExtensions: () => void;
  onShowChangelog: () => void;
  onExport: () => void;
  files?: FileItem[];
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  onSave,
  onSaveAs,
  onSaveProject,
  onOpen,
  onSyntaxChange,
  onTest,
  onExtensions,
  onShowChangelog,
  onExport,
  files = []
}) => {
  const { currentTheme, setTheme, themeName } = useTheme();

  if (!isOpen) return null;

  const syntaxOptions = [
    { name: 'JavaScript', value: 'javascript' },
    { name: 'Python', value: 'python' },
    { name: 'Lua', value: 'lua' },
    { name: 'C++', value: 'cpp' },
    { name: 'C#', value: 'csharp' },
    { name: 'X3', value: 'x3' },
    { name: 'CSS', value: 'css' },
    { name: 'HTML', value: 'html' },
    { name: 'Markdown', value: 'markdown' },
    { name: 'JSON', value: 'json' },
    { name: 'Plain Text', value: 'text' }
  ];

  const themeOptions = [
    { name: 'Default Dark', value: 'default' },
    { name: 'Glassmorphism', value: 'glassmorphism' },
    { name: 'Frutiger Aero', value: 'frutiger' },
    { name: 'Plain White', value: 'white' },
    { name: 'Plain Black', value: 'black' },
    { name: 'Cyber', value: 'cyber' },
    { name: 'Neon Dreams', value: 'neon' },
    { name: 'Ocean Depths', value: 'ocean' },
    { name: 'Sunset Vibes', value: 'sunset' },
    { name: 'Forest Green', value: 'forest' },
    { name: 'Royal Purple', value: 'royal' }
  ];

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    onClose();
  };

  const handleSyntaxChange = (syntax: string) => {
    onSyntaxChange(syntax);
    onClose();
  };

  const handleJoinDiscord = () => {
    window.open('https://discord.gg/dhpGeeeQ23', '_blank');
    onClose();
  };

  const handleX3Documentation = () => {
    window.open('https://x3documentation.neocities.org', '_blank');
    onClose();
  };

  const handleTest = () => {
    onTest();
    onClose();
  };

  const handleExtensions = () => {
    onExtensions();
    onClose();
  };

  const handleChangelog = () => {
    onShowChangelog();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center z-50">
      <div 
        className={`w-full max-w-md rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto ${
          themeName === 'glassmorphism' ? 'backdrop-blur-md' : ''
        }`}
        style={{
          backgroundColor: themeName === 'glassmorphism' 
            ? 'rgba(255, 255, 255, 0.1)' 
            : currentTheme.colors.secondary,
          backdropFilter: themeName === 'glassmorphism' ? 'blur(20px)' : 'none',
          border: themeName === 'glassmorphism' 
            ? '1px solid rgba(255, 255, 255, 0.2)' 
            : `1px solid ${currentTheme.colors.border}`
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 
            className="text-xl font-semibold"
            style={{ color: currentTheme.colors.text.primary }}
          >
            Menu
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-opacity-20 hover:bg-white transition-colors"
            style={{ color: currentTheme.colors.text.secondary }}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* File Actions */}
        <div className="mb-6">
          <h3 
            className="text-sm font-semibold mb-3 opacity-70"
            style={{ color: currentTheme.colors.text.secondary }}
          >
            FILE
          </h3>
          <div className="space-y-2">
            <button
              onClick={() => { onOpen(); onClose(); }}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-opacity-20 hover:bg-white transition-colors"
              style={{ color: currentTheme.colors.text.primary }}
            >
              <FolderOpen className="w-5 h-5" />
              <span>Open Project</span>
            </button>
            <button
              onClick={() => { onSave(); onClose(); }}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-opacity-20 hover:bg-white transition-colors"
              style={{ color: currentTheme.colors.text.primary }}
            >
              <Save className="w-5 h-5" />
              <span>Save</span>
            </button>
            <button
              onClick={() => { onSaveAs(); onClose(); }}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-opacity-20 hover:bg-white transition-colors"
              style={{ color: currentTheme.colors.text.primary }}
            >
              <Download className="w-5 h-5" />
              <span>Save As...</span>
            </button>
            <button
              onClick={() => { onSaveProject(); onClose(); }}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-opacity-20 hover:bg-white transition-colors"
              style={{ color: currentTheme.colors.text.primary }}
            >
              <Save className="w-5 h-5" />
              <span>Save Project</span>
            </button>
          </div>
        </div>

        {/* Tools */}
        <div className="mb-6">
          <h3 
            className="text-sm font-semibold mb-3 opacity-70"
            style={{ color: currentTheme.colors.text.secondary }}
          >
            TOOLS
          </h3>
          <div className="space-y-2">
            <button
              onClick={handleTest}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-opacity-20 hover:bg-white transition-colors"
              style={{ color: currentTheme.colors.text.primary }}
            >
              <Play className="w-5 h-5" />
              <span>Test Application</span>
            </button>
            <button
              onClick={handleExtensions}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-opacity-20 hover:bg-white transition-colors"
              style={{ color: currentTheme.colors.text.primary }}
            >
              <Package className="w-5 h-5" />
              <span>Extensions</span>
            </button>
            <button
              onClick={handleChangelog}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-opacity-20 hover:bg-white transition-colors"
              style={{ color: currentTheme.colors.text.primary }}
            >
              <FileText className="w-5 h-5" />
              <span>What's New</span>
            </button>

            <button
              onClick={() => { onExport(); onClose(); }}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-opacity-20 hover:bg-white transition-colors"
              style={{ color: currentTheme.colors.text.primary }}
            >
              <Download className="w-5 h-5" />
              <span>Export Project</span>
            </button>
          </div>
        </div>

        {/* Syntax Highlighting */}
        <div className="mb-6">
          <h3 
            className="text-sm font-semibold mb-3 opacity-70"
            style={{ color: currentTheme.colors.text.secondary }}
          >
            SYNTAX HIGHLIGHTING
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {syntaxOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleSyntaxChange(option.value)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-opacity-20 hover:bg-white transition-colors text-left"
                style={{ color: currentTheme.colors.text.primary }}
              >
                <Code className="w-4 h-4" />
                <span className="text-sm">{option.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Themes */}
        <div className="mb-6">
          <h3 
            className="text-sm font-semibold mb-3 opacity-70"
            style={{ color: currentTheme.colors.text.secondary }}
          >
            THEMES
          </h3>
          <div className="grid grid-cols-1 gap-2">
            {themeOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleThemeChange(option.value)}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-opacity-20 hover:bg-white transition-colors text-left"
                style={{ color: currentTheme.colors.text.primary }}
              >
                <div className="flex items-center space-x-2">
                  <Palette className="w-4 h-4" />
                  <span className="text-sm">{option.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Help */}
        <div>
          <h3 
            className="text-sm font-semibold mb-3 opacity-70"
            style={{ color: currentTheme.colors.text.secondary }}
          >
            HELP
          </h3>
          <div className="space-y-2">
            <button
              onClick={handleJoinDiscord}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-opacity-20 hover:bg-white transition-colors"
              style={{ color: currentTheme.colors.text.primary }}
            >
              <HelpCircle className="w-5 h-5" />
              <span>Join Discord</span>
            </button>
            <button
              onClick={handleX3Documentation}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-opacity-20 hover:bg-white transition-colors"
              style={{ color: currentTheme.colors.text.primary }}
            >
              <FileText className="w-5 h-5" />
              <span>X3 Documentation</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};