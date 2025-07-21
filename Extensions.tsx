import React, { useState, useEffect } from 'react';
import { Download, Star, Code, Search, Filter, ExternalLink, X, MessageCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface Extension {
  id: string;
  name: string;
  description: string;
  author: string;
  language: string;
  stars: number;
  downloads: number;
  version: string;
  repository: string;
  installed: boolean;
}

interface ExtensionsProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Extensions: React.FC<ExtensionsProps> = ({ isOpen, onClose }) => {
  const { currentTheme, themeName } = useTheme();
  const [extensions, setExtensions] = useState<Extension[]>([]);
  const [filteredExtensions, setFilteredExtensions] = useState<Extension[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [loading, setLoading] = useState(false);

  const languages = ['all', 'javascript', 'python', 'lua', 'cpp', 'csharp', 'x3', 'css', 'html'];

  // Mock extensions data (in a real app, this would fetch from GitHub API)
  const mockExtensions: Extension[] = [
    {
      id: '1',
      name: 'JavaScript Snippets Pro',
      description: 'Advanced JavaScript code snippets and templates for faster development',
      author: 'CodeMaster',
      language: 'javascript',
      stars: 1250,
      downloads: 5420,
      version: '2.1.0',
      repository: 'https://github.com/codemaster/js-snippets-pro',
      installed: false
    },
    {
      id: '2',
      name: 'Python Data Science Kit',
      description: 'Essential tools and templates for Python data science projects',
      author: 'DataScientist',
      language: 'python',
      stars: 890,
      downloads: 3210,
      version: '1.5.2',
      repository: 'https://github.com/datascientist/python-ds-kit',
      installed: true
    },
    {
      id: '3',
      name: 'X3 Language Pack',
      description: 'Complete X3 language support with syntax highlighting and snippets',
      author: 'X3Team',
      language: 'x3',
      stars: 456,
      downloads: 1890,
      version: '3.0.1',
      repository: 'https://github.com/x3team/x3-language-pack',
      installed: false
    },
    {
      id: '4',
      name: 'CSS Framework Builder',
      description: 'Build custom CSS frameworks with pre-built components',
      author: 'StyleGuru',
      language: 'css',
      stars: 2100,
      downloads: 8750,
      version: '4.2.1',
      repository: 'https://github.com/styleguru/css-framework-builder',
      installed: false
    },
    {
      id: '5',
      name: 'Lua Game Scripts',
      description: 'Game development scripts and utilities for Lua',
      author: 'GameDev',
      language: 'lua',
      stars: 678,
      downloads: 2340,
      version: '1.8.0',
      repository: 'https://github.com/gamedev/lua-game-scripts',
      installed: false
    },
    {
      id: '6',
      name: 'C++ Performance Tools',
      description: 'Performance optimization tools and templates for C++',
      author: 'CppExpert',
      language: 'cpp',
      stars: 1456,
      downloads: 4320,
      version: '2.3.0',
      repository: 'https://github.com/cppexpert/cpp-performance-tools',
      installed: false
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setExtensions(mockExtensions);
        setFilteredExtensions(mockExtensions);
        setLoading(false);
      }, 1000);
    }
  }, [isOpen]);

  useEffect(() => {
    let filtered = extensions;

    if (searchTerm) {
      filtered = filtered.filter(ext => 
        ext.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ext.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ext.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedLanguage !== 'all') {
      filtered = filtered.filter(ext => ext.language === selectedLanguage);
    }

    setFilteredExtensions(filtered);
  }, [searchTerm, selectedLanguage, extensions]);

  const handleInstall = (extensionId: string) => {
    setExtensions(prev => prev.map(ext => 
      ext.id === extensionId ? { ...ext, installed: true } : ext
    ));
  };

  const handleUninstall = (extensionId: string) => {
    setExtensions(prev => prev.map(ext => 
      ext.id === extensionId ? { ...ext, installed: false } : ext
    ));
  };

  const handleDiscordRequest = () => {
    window.open('https://discord.gg/dhpGeeeQ23', '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div 
        className={`w-full max-w-4xl h-[80vh] rounded-2xl flex flex-col overflow-hidden ${
          themeName === 'glassmorphism' ? 'backdrop-blur-md' : ''
        } ${
          themeName === 'cyber' ? 'cyber-extensions-glow' : ''
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
          <div className="flex items-center justify-between mb-4">
            <h2 
              className={`text-2xl font-bold ${
                themeName === 'cyber' ? 'cyber-text-glow' : ''
              }`}
              style={{ color: currentTheme.colors.text.primary }}
            >
              🧩 Extensions Marketplace
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-opacity-20 hover:bg-white transition-colors"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Search and Filter */}
          <div className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: currentTheme.colors.text.secondary }} />
              <input
                type="text"
                placeholder="Search extensions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundColor: currentTheme.colors.accent,
                  color: currentTheme.colors.text.primary,
                  border: `1px solid ${currentTheme.colors.border}`
                }}
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: currentTheme.colors.text.secondary }} />
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="pl-10 pr-8 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                style={{
                  backgroundColor: currentTheme.colors.accent,
                  color: currentTheme.colors.text.primary,
                  border: `1px solid ${currentTheme.colors.border}`
                }}
              >
                {languages.map(lang => (
                  <option key={lang} value={lang}>
                    {lang === 'all' ? 'All Languages' : lang.charAt(0).toUpperCase() + lang.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Extensions List */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div 
                className={`animate-spin rounded-full h-12 w-12 border-b-2 ${
                  themeName === 'cyber' ? 'animate-pulse' : ''
                }`}
                style={{ borderColor: currentTheme.colors.primary }}
              />
            </div>
          ) : (
            <div className="grid gap-4">
              {/* More Extensions Coming Soon Notice */}
              <div
                className={`p-4 rounded-lg border transition-all duration-200 ${
                  themeName === 'cyber' ? 'cyber-notice-card' : ''
                }`}
                style={{
                  backgroundColor: currentTheme.colors.primary + '20',
                  borderColor: currentTheme.colors.primary,
                  boxShadow: themeName === 'cyber' 
                    ? `0 0 20px ${currentTheme.colors.primary}30` 
                    : 'none'
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 
                      className="text-lg font-semibold mb-2"
                      style={{ color: currentTheme.colors.text.primary }}
                    >
                      🚀 More Extensions Coming Soon!
                    </h3>
                    <p 
                      className="text-sm mb-3"
                      style={{ color: currentTheme.colors.text.secondary }}
                    >
                      Want to see a specific extension? Request yours at our Discord server and we'll consider adding it to the marketplace!
                    </p>
                  </div>

                  <button
                    onClick={handleDiscordRequest}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                      themeName === 'cyber' ? 'cyber-discord-button' : ''
                    }`}
                    style={{
                      backgroundColor: '#5865F2',
                      color: 'white',
                      boxShadow: themeName === 'cyber' 
                        ? '0 0 20px #5865F240' 
                        : 'none'
                    }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Request on Discord</span>
                  </button>
                </div>
              </div>

              {filteredExtensions.map(extension => (
                <div
                  key={extension.id}
                  className={`p-4 rounded-lg border transition-all duration-200 hover:scale-[1.02] ${
                    themeName === 'cyber' ? 'cyber-extension-card' : ''
                  }`}
                  style={{
                    backgroundColor: currentTheme.colors.accent,
                    borderColor: currentTheme.colors.border,
                    boxShadow: themeName === 'cyber' 
                      ? `0 0 20px ${currentTheme.colors.primary}20` 
                      : 'none'
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 
                          className="text-lg font-semibold"
                          style={{ color: currentTheme.colors.text.primary }}
                        >
                          {extension.name}
                        </h3>
                        <span 
                          className="px-2 py-1 rounded text-xs font-medium"
                          style={{ 
                            backgroundColor: currentTheme.colors.primary,
                            color: 'white'
                          }}
                        >
                          {extension.language}
                        </span>
                        <span 
                          className="text-xs"
                          style={{ color: currentTheme.colors.text.secondary }}
                        >
                          v{extension.version}
                        </span>
                      </div>

                      <p 
                        className="text-sm mb-3"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        {extension.description}
                      </p>

                      <div className="flex items-center space-x-4 text-xs">
                        <span style={{ color: currentTheme.colors.text.secondary }}>
                          by {extension.author}
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3" style={{ color: currentTheme.colors.primary }} />
                          <span style={{ color: currentTheme.colors.text.secondary }}>
                            {extension.stars}
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Download className="w-3 h-3" style={{ color: currentTheme.colors.primary }} />
                          <span style={{ color: currentTheme.colors.text.secondary }}>
                            {extension.downloads}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => window.open(extension.repository, '_blank')}
                        className="p-2 rounded-lg hover:bg-opacity-20 hover:bg-white transition-colors"
                        style={{ color: currentTheme.colors.text.secondary }}
                        title="View Repository"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>

                      {extension.installed ? (
                        <button
                          onClick={() => handleUninstall(extension.id)}
                          className="px-4 py-2 rounded-lg transition-colors"
                          style={{
                            backgroundColor: 'transparent',
                            color: currentTheme.colors.text.secondary,
                            border: `1px solid ${currentTheme.colors.border}`
                          }}
                        >
                          Uninstall
                        </button>
                      ) : (
                        <button
                          onClick={() => handleInstall(extension.id)}
                          className={`px-4 py-2 rounded-lg transition-colors hover:scale-105 ${
                            themeName === 'cyber' ? 'cyber-install-button' : ''
                          }`}
                          style={{
                            backgroundColor: currentTheme.colors.primary,
                            color: 'white',
                            boxShadow: themeName === 'cyber' 
                              ? `0 0 20px ${currentTheme.colors.primary}40` 
                              : 'none'
                          }}
                        >
                          Install
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {filteredExtensions.length === 0 && !loading && (
                <div className="text-center py-12">
                  <Code className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: currentTheme.colors.text.secondary }} />
                  <p style={{ color: currentTheme.colors.text.secondary }}>
                    No extensions found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Global Styles */}
      <style jsx>{`
        .cyber-extensions-glow {
          position: relative;
        }
        
        .cyber-extensions-glow::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, ${currentTheme.colors.primary}40, transparent, ${currentTheme.colors.primary}40);
          border-radius: inherit;
          z-index: -1;
          animation: cyber-pulse 3s infinite;
        }
        
        .cyber-extension-card {
          position: relative;
          overflow: hidden;
        }
        
        .cyber-extension-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, ${currentTheme.colors.primary}, transparent);
          animation: cyber-scan 4s linear infinite;
        }
        
        .cyber-notice-card {
          position: relative;
          overflow: hidden;
        }
        
        .cyber-notice-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, ${currentTheme.colors.primary}, transparent);
          animation: cyber-scan 3s linear infinite;
        }
        
        .cyber-text-glow {
          text-shadow: 0 0 10px currentColor;
        }
        
        .cyber-install-button:hover {
          box-shadow: 0 0 30px ${currentTheme.colors.primary}80 !important;
        }
        
        .cyber-discord-button:hover {
          box-shadow: 0 0 30px #5865F280 !important;
        }
        
        @keyframes cyber-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        
        @keyframes cyber-scan {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};