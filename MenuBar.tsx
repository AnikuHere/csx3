import React, { useState, useRef, useEffect } from 'react';
import { Download, FolderOpen, Save, X, Code, Eye, Terminal, HelpCircle, Palette, Play, Package, FileText, Heart } from 'lucide-react';
import { HelpPopup } from './HelpPopup';
import { TestRunner } from './TestRunner';
import { ContributionsDialog } from './ContributionsDialog';
import { useTheme } from '../contexts/ThemeContext';
import type { FileItem } from '../App';

interface MenuBarProps {
  onSave?: () => void;
  onSaveAs?: () => void;
  onSaveProject?: () => void;
  onOpen?: () => void;
  onExit?: () => void;
  onSyntaxChange?: (syntax: string) => void;
  onToggleTerminal?: () => void;
  onExtensions?: () => void;
  onShowChangelog?: () => void;
  onExport?: () => void;
  files?: FileItem[];
}

export const MenuBar: React.FC<MenuBarProps> = ({
  onSave,
  onSaveAs,
  onSaveProject,
  onOpen,
  onExit,
  onSyntaxChange,
  onToggleTerminal,
  onExtensions,
  onShowChangelog,
  onExport,
  files = []
}) => {
  const [showFileMenu, setShowFileMenu] = useState(false);
  const [showViewMenu, setShowViewMenu] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const [showTestRunner, setShowTestRunner] = useState(false);
  const [showContributions, setShowContributions] = useState(false);
  const fileMenuRef = useRef<HTMLDivElement>(null);
  const viewMenuRef = useRef<HTMLDivElement>(null);
  const themeMenuRef = useRef<HTMLDivElement>(null);
  const { currentTheme, setTheme, availableThemes } = useTheme();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (fileMenuRef.current && !fileMenuRef.current.contains(event.target as Node)) {
        setShowFileMenu(false);
      }
      if (viewMenuRef.current && !viewMenuRef.current.contains(event.target as Node)) {
        setShowViewMenu(false);
      }
      if (themeMenuRef.current && !themeMenuRef.current.contains(event.target as Node)) {
        setShowThemeMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuItemClick = (action: () => void) => {
    action();
    setShowFileMenu(false);
  };

  const handleSyntaxChange = (syntax: string) => {
    if (onSyntaxChange) {
      onSyntaxChange(syntax);
    }
    setShowViewMenu(false);
  };

  const handleThemeChange = (themeName: string) => {
    setTheme(themeName);
    setShowThemeMenu(false);
  };

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

  const menuBarStyle = {
    backgroundColor: currentTheme.colors.secondary,
    borderBottomColor: currentTheme.colors.border,
    color: currentTheme.colors.text.secondary
  };

  return (
    <>
      <div className="h-8 border-b flex items-center px-4 text-sm" style={menuBarStyle}>
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gradient-to-br from-blue-400 to-blue-600 rounded flex items-center justify-center">
              <span className="text-xs font-bold text-white">C</span>
            </div>
            <span className="font-semibold" style={{ color: currentTheme.colors.text.primary }}>CSX3</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* File Menu */}
            <div className="relative" ref={fileMenuRef}>
              <button 
                className="hover:text-white hover:bg-opacity-20 hover:bg-white px-2 py-1 rounded transition-colors"
                onClick={() => setShowFileMenu(!showFileMenu)}
              >
                File
              </button>
              
              {showFileMenu && (
                <div 
                  className="absolute top-full left-0 mt-1 border rounded shadow-lg min-w-[160px] z-50"
                  style={{ 
                    backgroundColor: currentTheme.colors.secondary,
                    borderColor: currentTheme.colors.border
                  }}
                >
                  <button
                    className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-opacity-20 hover:bg-white transition-colors"
                    onClick={() => handleMenuItemClick(onOpen || (() => {}))}
                  >
                    <FolderOpen className="w-4 h-4" />
                    <span>Open</span>
                  </button>
                  
                  <div className="border-t" style={{ borderColor: currentTheme.colors.border }} />
                  
                  <button
                    className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-opacity-20 hover:bg-white transition-colors"
                    onClick={() => handleMenuItemClick(onSave || (() => {}))}
                  >
                    <Save className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  
                  <button
                    className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-opacity-20 hover:bg-white transition-colors"
                    onClick={() => handleMenuItemClick(onSaveAs || (() => {}))}
                  >
                    <Download className="w-4 h-4" />
                    <span>Save As...</span>
                  </button>

                  <button
                    className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-opacity-20 hover:bg-white transition-colors"
                    onClick={() => handleMenuItemClick(onSaveProject || (() => {}))}
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Project</span>
                  </button>
                  
                  <div className="border-t" style={{ borderColor: currentTheme.colors.border }} />
                  
                  <button
                    className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-opacity-20 hover:bg-white transition-colors text-red-400"
                    onClick={() => handleMenuItemClick(onExit || (() => window.close()))}
                  >
                    <X className="w-4 h-4" />
                    <span>Exit</span>
                  </button>
                </div>
              )}
            </div>

            {/* View Menu */}
            <div className="relative" ref={viewMenuRef}>
              <button 
                className="hover:text-white hover:bg-opacity-20 hover:bg-white px-2 py-1 rounded transition-colors"
                onClick={() => setShowViewMenu(!showViewMenu)}
              >
                View
              </button>
              
              {showViewMenu && (
                <div 
                  className="absolute top-full left-0 mt-1 border rounded shadow-lg min-w-[160px] z-50"
                  style={{ 
                    backgroundColor: currentTheme.colors.secondary,
                    borderColor: currentTheme.colors.border
                  }}
                >
                  <div className="px-3 py-2 text-xs font-semibold text-gray-400 border-b" style={{ borderColor: currentTheme.colors.border }}>
                    SYNTAX HIGHLIGHTING
                  </div>
                  
                  {syntaxOptions.map((option) => (
                    <button
                      key={option.value}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-opacity-20 hover:bg-white transition-colors"
                      onClick={() => handleSyntaxChange(option.value)}
                    >
                      <Code className="w-4 h-4" />
                      <span>{option.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Themes Menu */}
            <div className="relative" ref={themeMenuRef}>
              <button 
                className="hover:text-white hover:bg-opacity-20 hover:bg-white px-2 py-1 rounded transition-colors flex items-center space-x-1"
                onClick={() => setShowThemeMenu(!showThemeMenu)}
              >
                <Palette className="w-4 h-4" />
                <span>Themes</span>
              </button>
              
              {showThemeMenu && (
                <div 
                  className="absolute top-full left-0 mt-1 border rounded shadow-lg min-w-[180px] z-50"
                  style={{ 
                    backgroundColor: currentTheme.colors.secondary,
                    borderColor: currentTheme.colors.border
                  }}
                >
                  <div className="px-3 py-2 text-xs font-semibold text-gray-400 border-b" style={{ borderColor: currentTheme.colors.border }}>
                    SELECT THEME
                  </div>
                  
                  {themeOptions.map((option) => (
                    <button
                      key={option.value}
                      className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-opacity-20 hover:bg-white transition-colors"
                      onClick={() => handleThemeChange(option.value)}
                    >
                      <div className="flex items-center space-x-2">
                        <Palette className="w-4 h-4" />
                        <span>{option.name}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <button 
              className="hover:text-white hover:bg-opacity-20 hover:bg-white px-2 py-1 rounded transition-colors flex items-center space-x-1"
              onClick={onToggleTerminal}
            >
              <Terminal className="w-4 h-4" />
              <span>Terminal</span>
            </button>
            
            <button 
              className="hover:text-white hover:bg-opacity-20 hover:bg-white px-2 py-1 rounded transition-colors flex items-center space-x-1"
              onClick={() => setShowTestRunner(true)}
            >
              <Play className="w-4 h-4" />
              <span>Test</span>
            </button>

            <button 
              className="hover:text-white hover:bg-opacity-20 hover:bg-white px-2 py-1 rounded transition-colors flex items-center space-x-1"
              onClick={onExtensions}
            >
              <Package className="w-4 h-4" />
              <span>Extensions</span>
            </button>

            <button 
              className="hover:text-white hover:bg-opacity-20 hover:bg-white px-2 py-1 rounded transition-colors flex items-center space-x-1"
              onClick={onExport}
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>

            <button 
              className="hover:text-white hover:bg-opacity-20 hover:bg-white px-2 py-1 rounded transition-colors flex items-center space-x-1"
              onClick={() => setShowContributions(true)}
            >
              <Heart className="w-4 h-4" />
              <span>Contribute</span>
            </button>

            <button 
              className="hover:text-white hover:bg-opacity-20 hover:bg-white px-2 py-1 rounded transition-colors flex items-center space-x-1"
              onClick={onShowChangelog}
            >
              <FileText className="w-4 h-4" />
              <span>Changelog</span>
            </button>
            
            <button 
              className="hover:text-white hover:bg-opacity-20 hover:bg-white px-2 py-1 rounded transition-colors flex items-center space-x-1"
              onClick={() => setShowHelpPopup(true)}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Help</span>
            </button>
          </div>
        </div>
      </div>

      <HelpPopup 
        isOpen={showHelpPopup} 
        onClose={() => setShowHelpPopup(false)} 
      />
      
      {showTestRunner && (
        <TestRunner 
          files={files}
          onClose={() => setShowTestRunner(false)} 
        />
      )}

      <ContributionsDialog
        isOpen={showContributions}
        onClose={() => setShowContributions(false)}
      />
    </>
  );
};