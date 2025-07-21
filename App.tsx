import React, { useState, useRef, useEffect } from 'react';
import { FileExplorer } from './components/FileExplorer';
import { CodeEditor } from './components/CodeEditor';
import { Terminal } from './components/Terminal';
import { AIAssistant } from './components/AIAssistant';
import { MenuBar } from './components/MenuBar';
import { StatusBar } from './components/StatusBar';
import { TabBar } from './components/TabBar';
import { PanelResizer } from './components/PanelResizer';
import { AnimatedWaves } from './components/AnimatedWaves';
import { CoppercraftBackground } from './components/CoppercraftBackground';
import { SpeedsterBackground } from './components/SpeedsterBackground';
import { MainMenu } from './components/MainMenu';
import { MobileMenu } from './components/MobileMenu';
import { TestRunner } from './components/TestRunner';
import { CodeCorrection } from './components/CodeCorrection';
import { Extensions } from './components/Extensions';
import { AIBootup } from './components/AIBootup';
import { ProjectManager, Project } from './components/ProjectManager';
import { Tutorial } from './components/Tutorial';
import { Changelog } from './components/Changelog';
import { ExportDialog } from './components/ExportDialog';
import { ThemeLoadingOverlay } from './components/ThemeLoadingOverlay';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';

export interface FileItem {
  id: string;
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: FileItem[];
  language?: string;
}

export interface OpenTab {
  id: string;
  name: string;
  content: string;
  language: string;
  isDirty: boolean;
}

interface RecentProject {
  id: string;
  name: string;
  path: string;
  lastOpened: Date;
}

function AppContent() {
  const { currentTheme, themeName } = useTheme();
  const [showMainMenu, setShowMainMenu] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileActivePanel, setMobileActivePanel] = useState<'files' | 'editor' | 'terminal' | 'ai'>('editor');
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showTestRunner, setShowTestRunner] = useState(false);
  const [showExtensions, setShowExtensions] = useState(false);
  const [showAIBootup, setShowAIBootup] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showChangelog, setShowChangelog] = useState(false);
  const [showExportDialog, setShowExportDialog] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const autoSaveInterval = useRef<NodeJS.Timeout>();
  
  const [files, setFiles] = useState<FileItem[]>([
    {
      id: '1',
      name: 'src',
      type: 'folder',
      children: [
        {
          id: '2',
          name: 'main.js',
          type: 'file',
          content: 'console.log("Hello, CSX3!");',
          language: 'javascript'
        },
        {
          id: '3',
          name: 'styles.css',
          type: 'file',
          content: 'body {\n  margin: 0;\n  font-family: Inter, sans-serif;\n}',
          language: 'css'
        },
        {
          id: '5',
          name: 'example.x3',
          type: 'file',
          content: '// X3 Programming Language Example\n// Welcome to X3!\n\nreg str message "Hello, X3 World!"\nprt $message\n\nreg int counter 0\nwhile $counter < 5\n  prt "Count: " $counter\n  inc counter\nend\n\nprt "X3 programming is fun!"',
          language: 'x3'
        }
      ]
    },
    {
      id: '4',
      name: 'README.md',
      type: 'file',
      content: '# Welcome to CSX3\n\nA modern code editor with AI assistance.\n\n## Supported Languages\n- JavaScript\n- Python\n- Lua\n- C++\n- C#\n- **X3** - A custom scripting language\n- CSS\n- HTML\n- Markdown\n- JSON',
      language: 'markdown'
    }
  ]);

  const [openTabs, setOpenTabs] = useState<OpenTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>('');
  const [leftPanelWidth, setLeftPanelWidth] = useState(280);
  const [rightPanelWidth, setRightPanelWidth] = useState(320);
  const [bottomPanelHeight, setBottomPanelHeight] = useState(200);
  const [showTerminal, setShowTerminal] = useState(true);
  const [showAI, setShowAI] = useState(true);

  // Check for first visit and updates
  useEffect(() => {
    const hasVisited = localStorage.getItem('csx3-visited');
    const lastVersion = localStorage.getItem('csx3-last-version');
    const currentVersion = '2.0.0';

    if (!hasVisited) {
      setIsFirstVisit(true);
      localStorage.setItem('csx3-visited', 'true');
      localStorage.setItem('csx3-last-version', currentVersion);
    } else if (lastVersion && lastVersion !== currentVersion) {
      setHasUpdate(true);
      localStorage.setItem('csx3-last-version', currentVersion);
    }

    // Check if tutorial should be shown
    const tutorialCompleted = localStorage.getItem('csx3-tutorial-completed');
    if (!tutorialCompleted && !hasVisited) {
      setTimeout(() => setShowTutorial(true), 2000);
    }

    // Check if changelog should be shown for updates
    if (hasUpdate && hasVisited) {
      setTimeout(() => setShowChangelog(true), 1000);
    }
  }, []);

  // Auto-save functionality
  useEffect(() => {
    if (autoSaveEnabled && openTabs.length > 0) {
      autoSaveInterval.current = setInterval(() => {
        handleSave();
      }, 30000); // Auto-save every 30 seconds
    }

    return () => {
      if (autoSaveInterval.current) {
        clearInterval(autoSaveInterval.current);
      }
    };
  }, [autoSaveEnabled, openTabs]);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || 
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
      
      // Adjust panel sizes for mobile
      if (isMobileDevice) {
        setLeftPanelWidth(window.innerWidth);
        setRightPanelWidth(window.innerWidth);
        setBottomPanelHeight(window.innerHeight * 0.4);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const findFileById = (files: FileItem[], id: string): FileItem | null => {
    for (const file of files) {
      if (file.id === id) return file;
      if (file.children) {
        const found = findFileById(file.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const updateFileContent = (files: FileItem[], id: string, content: string): FileItem[] => {
    return files.map(file => {
      if (file.id === id) {
        return { ...file, content };
      }
      if (file.children) {
        return { ...file, children: updateFileContent(file.children, id, content) };
      }
      return file;
    });
  };

  const handleFileSelect = (fileId: string) => {
    const file = findFileById(files, fileId);
    if (!file || file.type !== 'file') return;

    const existingTab = openTabs.find(tab => tab.id === fileId);
    if (existingTab) {
      setActiveTabId(fileId);
      if (isMobile) {
        setMobileActivePanel('editor');
      }
      return;
    }

    const newTab: OpenTab = {
      id: fileId,
      name: file.name,
      content: file.content || '',
      language: file.language || 'text',
      isDirty: false
    };

    setOpenTabs(prev => [...prev, newTab]);
    setActiveTabId(fileId);
    if (isMobile) {
      setMobileActivePanel('editor');
    }
  };

  const handleTabClose = (tabId: string) => {
    setOpenTabs(prev => prev.filter(tab => tab.id !== tabId));
    if (activeTabId === tabId) {
      const remainingTabs = openTabs.filter(tab => tab.id !== tabId);
      setActiveTabId(remainingTabs.length > 0 ? remainingTabs[remainingTabs.length - 1].id : '');
    }
  };

  const handleContentChange = (content: string) => {
    setOpenTabs(prev => prev.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, content, isDirty: true }
        : tab
    ));
  };

  const handleCodeFix = (fixedCode: string) => {
    setOpenTabs(prev => prev.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, content: fixedCode, isDirty: true }
        : tab
    ));
  };

  const handleSave = () => {
    const activeTab = openTabs.find(tab => tab.id === activeTabId);
    if (!activeTab) return;

    // Update the file content in the files array
    setFiles(prev => updateFileContent(prev, activeTab.id, activeTab.content));
    
    // Mark tab as not dirty
    setOpenTabs(prev => prev.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, isDirty: false }
        : tab
    ));
  };

  const handleSaveAs = () => {
    const getAllFiles = (files: FileItem[]): { name: string; content: string }[] => {
      const result: { name: string; content: string }[] = [];
      
      const traverse = (items: FileItem[], path = '') => {
        items.forEach(item => {
          if (item.type === 'file' && item.content) {
            result.push({
              name: path ? `${path}/${item.name}` : item.name,
              content: item.content
            });
          } else if (item.type === 'folder' && item.children) {
            traverse(item.children, path ? `${path}/${item.name}` : item.name);
          }
        });
      };
      
      traverse(files);
      return result;
    };

    const fileList = getAllFiles(files);
    
    // Create a simple text-based archive (since we can't create actual ZIP files in browser)
    let archiveContent = '# CSX3 Project Archive\n\n';
    
    fileList.forEach(file => {
      archiveContent += `## File: ${file.name}\n\n`;
      archiveContent += '```\n';
      archiveContent += file.content;
      archiveContent += '\n```\n\n';
    });

    // Create and download the file
    const blob = new Blob([archiveContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'csx3-project.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSaveProject = () => {
    const projectName = prompt('Enter project name:');
    if (!projectName) return;

    const description = prompt('Enter project description (optional):') || '';

    const newProject: Project = {
      id: Date.now().toString(),
      name: projectName,
      description,
      files: files,
      lastModified: new Date(),
      created: new Date(),
      language: 'mixed',
      fileCount: files.length
    };

    const savedProjects = localStorage.getItem('csx3-projects');
    const projects = savedProjects ? JSON.parse(savedProjects) : [];
    projects.unshift(newProject);
    localStorage.setItem('csx3-projects', JSON.stringify(projects));

    alert('Project saved successfully!');
  };

  const handleOpen = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.js,.ts,.jsx,.tsx,.css,.html,.md,.json,.txt,.py,.lua,.cpp,.cs,.x3';
    input.multiple = true;
    
    input.onchange = (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files) return;

      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const content = e.target?.result as string;
          const extension = file.name.split('.').pop()?.toLowerCase();
          const language = {
            'js': 'javascript',
            'ts': 'typescript',
            'jsx': 'javascript',
            'tsx': 'typescript',
            'css': 'css',
            'html': 'html',
            'md': 'markdown',
            'json': 'json',
            'py': 'python',
            'lua': 'lua',
            'cpp': 'cpp',
            'cs': 'csharp',
            'x3': 'x3'
          }[extension || ''] || 'text';

          const newFile: FileItem = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: file.name,
            type: 'file',
            content,
            language
          };

          setFiles(prev => [...prev, newFile]);
        };
        reader.readAsText(file);
      });
    };
    
    input.click();
  };

  const handleExit = () => {
    if (confirm('Are you sure you want to exit CSX3?')) {
      window.close();
    }
  };

  const handleSyntaxChange = (syntax: string) => {
    if (activeTabId) {
      setOpenTabs(prev => prev.map(tab => 
        tab.id === activeTabId 
          ? { ...tab, language: syntax }
          : tab
      ));
    }
  };

  const handleCreateProject = () => {
    setShowMainMenu(false);
  };

  const handleOpenProject = () => {
    handleOpen();
    setShowMainMenu(false);
  };

  const handleOpenRecentProject = (project: RecentProject) => {
    // In a real app, this would load the project files
    console.log('Opening project:', project);
    setShowMainMenu(false);
  };

  const handleProjectSelect = (project: Project) => {
    setFiles(project.files);
    setOpenTabs([]);
    setActiveTabId('');
    setShowMainMenu(false);
  };

  const handleOpenGedit = () => {
    alert('Gedit Game Engine is coming soon! This feature is currently in development.');
  };

  const handleAISelect = () => {
    setShowAIBootup(true);
  };

  const handleAIBootupComplete = () => {
    setShowAIBootup(false);
    if (isMobile) {
      setMobileActivePanel('ai');
    }
  };

  const activeTab = openTabs.find(tab => tab.id === activeTabId);

  // Apply theme background
  const appStyle = {
    background: currentTheme.colors.background,
    color: currentTheme.colors.text.primary
  };

  if (showMainMenu) {
    return (
      <>
        <MainMenu
          onCreateProject={handleCreateProject}
          onOpenProject={handleOpenProject}
          onOpenRecentProject={handleOpenRecentProject}
          onProjectSelect={handleProjectSelect}
          onOpenGedit={handleOpenGedit}
          onShowChangelog={() => setShowChangelog(true)}
          currentFiles={files}
        />
        <ThemeLoadingOverlay />
      </>
    );
  }

  // Mobile Layout
  if (isMobile) {
    return (
      <div className="h-screen flex flex-col overflow-hidden relative" style={appStyle}>
        {/* Animated waves background for Frutiger theme */}
        {themeName === 'frutiger' && <AnimatedWaves />}
        
        {/* Glassmorphism background effects */}
        {themeName === 'glassmorphism' && (
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-500/20"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
          </div>
        )}
        
        <div className="relative z-10 h-full flex flex-col">
          {/* Mobile Header */}
          <div 
            className="h-14 border-b flex items-center justify-between px-4"
            style={{ 
              backgroundColor: currentTheme.colors.secondary,
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.text.secondary
            }}
          >
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-blue-600 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-white">C</span>
              </div>
              <span className="font-semibold text-lg" style={{ color: currentTheme.colors.text.primary }}>CSX3</span>
            </div>
            
            <button
              onClick={() => setShowMobileMenu(true)}
              className="p-2 rounded hover:bg-opacity-20 hover:bg-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile Tab Bar */}
          {openTabs.length > 0 && (
            <TabBar 
              tabs={openTabs}
              activeTabId={activeTabId}
              onTabSelect={setActiveTabId}
              onTabClose={handleTabClose}
            />
          )}

          {/* Mobile Content Area */}
          <div className="flex-1 min-h-0">
            {mobileActivePanel === 'files' && (
              <div 
                className={`h-full ${
                  themeName === 'glassmorphism' ? 'backdrop-blur-md' : ''
                }`}
                style={{ 
                  backgroundColor: themeName === 'glassmorphism' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : currentTheme.colors.surface,
                  backdropFilter: themeName === 'glassmorphism' ? 'blur(20px)' : 'none'
                }}
              >
                <FileExplorer 
                  files={files} 
                  onFileSelect={handleFileSelect}
                  onFilesChange={setFiles}
                />
              </div>
            )}

            {mobileActivePanel === 'editor' && (
              <div className="h-full">
                <CodeEditor 
                  content={activeTab?.content || ''}
                  language={activeTab?.language || 'text'}
                  onChange={handleContentChange}
                />
                {activeTab && (
                  <CodeCorrection
                    code={activeTab.content}
                    language={activeTab.language}
                    onCodeFix={handleCodeFix}
                  />
                )}
              </div>
            )}

            {mobileActivePanel === 'terminal' && (
              <div 
                className={`h-full ${
                  themeName === 'glassmorphism' ? 'backdrop-blur-md' : ''
                }`}
                style={{ 
                  backgroundColor: themeName === 'glassmorphism' 
                    ? 'rgba(0, 0, 0, 0.05)' 
                    : currentTheme.colors.background,
                  backdropFilter: themeName === 'glassmorphism' ? 'blur(20px)' : 'none'
                }}
              >
                <Terminal />
              </div>
            )}

            {mobileActivePanel === 'ai' && (
              <div 
                className={`h-full ${
                  themeName === 'glassmorphism' ? 'backdrop-blur-md' : ''
                }`}
                style={{ 
                  backgroundColor: themeName === 'glassmorphism' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : currentTheme.colors.surface,
                  backdropFilter: themeName === 'glassmorphism' ? 'blur(20px)' : 'none'
                }}
              >
                <AIAssistant />
              </div>
            )}
          </div>

          {/* Mobile Bottom Navigation */}
          <div 
            className="h-16 border-t flex items-center justify-around px-2"
            style={{ 
              backgroundColor: currentTheme.colors.secondary,
              borderColor: currentTheme.colors.border
            }}
          >
            <button
              onClick={() => setMobileActivePanel('files')}
              className={`flex flex-col items-center space-y-1 p-2 rounded transition-colors touch-manipulation ${
                mobileActivePanel === 'files' ? 'bg-opacity-20 bg-white' : ''
              }`}
              style={{ minWidth: '60px', minHeight: '60px' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <span className="text-xs">Files</span>
            </button>

            <button
              onClick={() => setMobileActivePanel('editor')}
              className={`flex flex-col items-center space-y-1 p-2 rounded transition-colors touch-manipulation ${
                mobileActivePanel === 'editor' ? 'bg-opacity-20 bg-white' : ''
              }`}
              style={{ minWidth: '60px', minHeight: '60px' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <span className="text-xs">Editor</span>
            </button>

            <button
              onClick={() => setMobileActivePanel('terminal')}
              className={`flex flex-col items-center space-y-1 p-2 rounded transition-colors touch-manipulation ${
                mobileActivePanel === 'terminal' ? 'bg-opacity-20 bg-white' : ''
              }`}
              style={{ minWidth: '60px', minHeight: '60px' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs">Terminal</span>
            </button>

            <button
              onClick={handleAISelect}
              className={`flex flex-col items-center space-y-1 p-2 rounded transition-colors touch-manipulation ${
                mobileActivePanel === 'ai' ? 'bg-opacity-20 bg-white' : ''
              }`}
              style={{ minWidth: '60px', minHeight: '60px' }}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="text-xs">AI</span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          isOpen={showMobileMenu}
          onClose={() => setShowMobileMenu(false)}
          onSave={handleSave}
          onSaveAs={handleSaveAs}
          onSaveProject={handleSaveProject}
          onOpen={handleOpen}
          onSyntaxChange={handleSyntaxChange}
          onTest={() => setShowTestRunner(true)}
          onExtensions={() => setShowExtensions(true)}
          onShowChangelog={() => setShowChangelog(true)}
          onExport={() => setShowExportDialog(true)}
          files={files}
        />

        {/* Components */}
        {showTestRunner && (
          <TestRunner 
            files={files}
            onClose={() => setShowTestRunner(false)} 
          />
        )}

        {showExtensions && (
          <Extensions
            isOpen={showExtensions}
            onClose={() => setShowExtensions(false)}
          />
        )}

        {showAIBootup && (
          <AIBootup
            isVisible={showAIBootup}
            onComplete={handleAIBootupComplete}
          />
        )}

        {showTutorial && (
          <Tutorial
            isOpen={showTutorial}
            onClose={() => setShowTutorial(false)}
            onComplete={() => setShowTutorial(false)}
          />
        )}

        {showChangelog && (
          <Changelog
            isOpen={showChangelog}
            onClose={() => setShowChangelog(false)}
          />
        )}

        <ThemeLoadingOverlay />
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className="h-screen flex flex-col overflow-hidden relative" style={appStyle}>
      {/* Animated waves background for Frutiger theme */}
      {themeName === 'frutiger' && <AnimatedWaves />}
      
      {/* Glassmorphism background effects */}
      {themeName === 'glassmorphism' && (
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-pink-500/20"></div>
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>
      )}
      
      <div className="relative z-10 h-full flex flex-col">
        <MenuBar 
          onSave={handleSave}
          onSaveAs={handleSaveAs}
          onSaveProject={handleSaveProject}
          onOpen={handleOpen}
          onExit={handleExit}
          onSyntaxChange={handleSyntaxChange}
          onToggleTerminal={() => setShowTerminal(!showTerminal)}
          onExtensions={() => setShowExtensions(true)}
          onShowChangelog={() => setShowChangelog(true)}
          onExport={() => setShowExportDialog(true)}
          files={files}
        />
        
        <div className="flex-1 flex min-h-0">
          {/* Left Panel - File Explorer */}
          <div 
            className={`border-r flex-shrink-0 ${
              themeName === 'glassmorphism' ? 'backdrop-blur-md' : ''
            }`}
            style={{ 
              width: leftPanelWidth,
              backgroundColor: themeName === 'glassmorphism' 
                ? 'rgba(255, 255, 255, 0.05)' 
                : currentTheme.colors.surface,
              borderColor: currentTheme.colors.border,
              backdropFilter: themeName === 'glassmorphism' ? 'blur(20px)' : 'none'
            }}
          >
            <FileExplorer 
              files={files} 
              onFileSelect={handleFileSelect}
              onFilesChange={setFiles}
            />
          </div>

          <PanelResizer
            direction="vertical"
            onResize={(delta) => setLeftPanelWidth(prev => Math.max(200, Math.min(500, prev + delta)))}
          />

          {/* Center Panel - Editor */}
          <div className="flex-1 flex flex-col min-w-0">
            <TabBar 
              tabs={openTabs}
              activeTabId={activeTabId}
              onTabSelect={setActiveTabId}
              onTabClose={handleTabClose}
            />
            
            <div className="flex-1 min-h-0">
              <CodeEditor 
                content={activeTab?.content || ''}
                language={activeTab?.language || 'text'}
                onChange={handleContentChange}
              />
              {activeTab && (
                <CodeCorrection
                  code={activeTab.content}
                  language={activeTab.language}
                  onCodeFix={handleCodeFix}
                />
              )}
            </div>

            {showTerminal && (
              <>
                <PanelResizer
                  direction="horizontal"
                  onResize={(delta) => setBottomPanelHeight(prev => Math.max(100, Math.min(400, prev - delta)))}
                />
                <div 
                  className={`border-t flex-shrink-0 ${
                    themeName === 'glassmorphism' ? 'backdrop-blur-md' : ''
                  }`}
                  style={{ 
                    height: bottomPanelHeight,
                    backgroundColor: themeName === 'glassmorphism' 
                      ? 'rgba(0, 0, 0, 0.05)' 
                      : currentTheme.colors.background,
                    borderColor: currentTheme.colors.border,
                    backdropFilter: themeName === 'glassmorphism' ? 'blur(20px)' : 'none'
                  }}
                >
                  <Terminal />
                </div>
              </>
            )}
          </div>

          {showAI && (
            <>
              <PanelResizer
                direction="vertical"
                onResize={(delta) => setRightPanelWidth(prev => Math.max(250, Math.min(600, prev - delta)))}
              />
              
              {/* Right Panel - AI Assistant */}
              <div 
                className={`border-l flex-shrink-0 ${
                  themeName === 'glassmorphism' ? 'backdrop-blur-md' : ''
                }`}
                style={{ 
                  width: rightPanelWidth,
                  backgroundColor: themeName === 'glassmorphism' 
                    ? 'rgba(255, 255, 255, 0.05)' 
                    : currentTheme.colors.surface,
                  borderColor: currentTheme.colors.border,
                  backdropFilter: themeName === 'glassmorphism' ? 'blur(20px)' : 'none'
                }}
              >
                <AIAssistant />
              </div>
            </>
          )}
        </div>

        <StatusBar 
          activeFile={activeTab?.name || ''}
          language={activeTab?.language || ''}
          onToggleTerminal={() => setShowTerminal(!showTerminal)}
          onToggleAI={() => setShowAI(!showAI)}
        />
      </div>

      {/* Components */}
      {showTestRunner && (
        <TestRunner 
          files={files}
          onClose={() => setShowTestRunner(false)} 
        />
      )}

      {showExtensions && (
        <Extensions
          isOpen={showExtensions}
          onClose={() => setShowExtensions(false)}
        />
      )}

      {showAIBootup && (
        <AIBootup
          isVisible={showAIBootup}
          onComplete={handleAIBootupComplete}
        />
      )}

      {showTutorial && (
        <Tutorial
          isOpen={showTutorial}
          onClose={() => setShowTutorial(false)}
          onComplete={() => setShowTutorial(false)}
        />
      )}

      {showChangelog && (
        <Changelog
          isOpen={showChangelog}
          onClose={() => setShowChangelog(false)}
        />
      )}

      {showExportDialog && (
        <ExportDialog
          isOpen={showExportDialog}
          onClose={() => setShowExportDialog(false)}
          projectType="csx3"
        />
      )}

      <ThemeLoadingOverlay />
    </div>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading screen for 2 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
            <span className="text-2xl font-bold text-white">C</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 animate-fade-in">CSX3</h1>
          <div className="w-64 h-1 bg-gray-700 rounded-full mx-auto mb-4 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-loading-bar"></div>
          </div>
          <p className="text-white opacity-80 mb-2">Loading your development environment...</p>
          <p className="text-sm text-white opacity-60">Developed by Pointware & Velarium</p>
        </div>

        <style jsx>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes loading-bar {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          
          .animate-fade-in {
            animation: fade-in 1s ease-out;
          }
          
          .animate-loading-bar {
            animation: loading-bar 2s ease-in-out;
          }
        `}</style>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;