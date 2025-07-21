import React, { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder, FolderOpen, Plus, MoreHorizontal, Edit3, Trash2, Code, FolderPlus, BoxSelect as SelectAll, EyeOff } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import type { FileItem } from '../App';

interface FileExplorerProps {
  files: FileItem[];
  onFileSelect: (fileId: string) => void;
  onFilesChange: (files: FileItem[]) => void;
}

export const FileExplorer: React.FC<FileExplorerProps> = ({ 
  files, 
  onFileSelect, 
  onFilesChange 
}) => {
  const { currentTheme } = useTheme();
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['1', 'src-folder', 'assets-folder']));
  const [selectedFile, setSelectedFile] = useState<string>('');
  const [showContextMenu, setShowContextMenu] = useState<{ fileId: string; x: number; y: number } | null>(null);
  const [showMainMenu, setShowMainMenu] = useState(false);
  const [editingFile, setEditingFile] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const toggleFolder = (folderId: string) => {
    setExpandedFolders(prev => {
      const newSet = new Set(prev);
      if (newSet.has(folderId)) {
        newSet.delete(folderId);
      } else {
        newSet.add(folderId);
      }
      return newSet;
    });
  };

  const handleFileClick = (file: FileItem, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (file.type === 'folder') {
      toggleFolder(file.id);
    } else {
      setSelectedFile(file.id);
      onFileSelect(file.id);
    }
  };

  const handleTouchStart = (file: FileItem, event: React.TouchEvent) => {
    event.preventDefault();
    
    if (file.type === 'folder') {
      toggleFolder(file.id);
    } else {
      setSelectedFile(file.id);
      onFileSelect(file.id);
    }
  };

  const handleContextMenu = (fileId: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setShowContextMenu({ fileId, x: event.clientX, y: event.clientY });
  };

  const handleMainMenuClick = () => {
    setShowMainMenu(!showMainMenu);
  };

  const createNewFile = (parentId?: string) => {
    const newFile: FileItem = {
      id: Date.now().toString(),
      name: 'new-file.txt',
      type: 'file',
      content: '',
      language: 'text'
    };

    if (parentId) {
      // Add to specific folder
      const updatedFiles = addFileToFolder(files, parentId, newFile);
      onFilesChange(updatedFiles);
    } else {
      // Add to root
      onFilesChange([...files, newFile]);
    }

    setEditingFile(newFile.id);
    setEditingName('new-file.txt');
    setShowContextMenu(null);
    setShowMainMenu(false);
  };

  const createNewFolder = (parentId?: string) => {
    const newFolder: FileItem = {
      id: Date.now().toString(),
      name: 'new-folder',
      type: 'folder',
      children: []
    };

    if (parentId) {
      const updatedFiles = addFileToFolder(files, parentId, newFolder);
      onFilesChange(updatedFiles);
    } else {
      onFilesChange([...files, newFolder]);
    }

    setEditingFile(newFolder.id);
    setEditingName('new-folder');
    setShowContextMenu(null);
    setShowMainMenu(false);
  };

  const addFileToFolder = (fileList: FileItem[], folderId: string, newFile: FileItem): FileItem[] => {
    return fileList.map(file => {
      if (file.id === folderId && file.type === 'folder') {
        return {
          ...file,
          children: [...(file.children || []), newFile]
        };
      } else if (file.children) {
        return {
          ...file,
          children: addFileToFolder(file.children, folderId, newFile)
        };
      }
      return file;
    });
  };

  const deleteFile = (fileId: string) => {
    if (confirm('Are you sure you want to delete this item?')) {
      const updatedFiles = removeFileFromList(files, fileId);
      onFilesChange(updatedFiles);
      setShowContextMenu(null);
    }
  };

  const removeFileFromList = (fileList: FileItem[], fileId: string): FileItem[] => {
    return fileList.filter(file => {
      if (file.id === fileId) {
        return false;
      }
      if (file.children) {
        file.children = removeFileFromList(file.children, fileId);
      }
      return true;
    });
  };

  const startRename = (fileId: string, currentName: string) => {
    setEditingFile(fileId);
    setEditingName(currentName);
    setShowContextMenu(null);
  };

  const finishRename = () => {
    if (editingFile && editingName.trim()) {
      const updatedFiles = renameFileInList(files, editingFile, editingName.trim());
      onFilesChange(updatedFiles);
    }
    setEditingFile(null);
    setEditingName('');
  };

  const renameFileInList = (fileList: FileItem[], fileId: string, newName: string): FileItem[] => {
    return fileList.map(file => {
      if (file.id === fileId) {
        return { ...file, name: newName };
      }
      if (file.children) {
        return {
          ...file,
          children: renameFileInList(file.children, fileId, newName)
        };
      }
      return file;
    });
  };

  const changeSyntax = (fileId: string, newLanguage: string) => {
    const updatedFiles = changeSyntaxInList(files, fileId, newLanguage);
    onFilesChange(updatedFiles);
    setShowContextMenu(null);
  };

  const changeSyntaxInList = (fileList: FileItem[], fileId: string, newLanguage: string): FileItem[] => {
    return fileList.map(file => {
      if (file.id === fileId) {
        return { ...file, language: newLanguage };
      }
      if (file.children) {
        return {
          ...file,
          children: changeSyntaxInList(file.children, fileId, newLanguage)
        };
      }
      return file;
    });
  };

  const getFileIcon = (file: FileItem) => {
    if (file.type === 'folder') {
      return expandedFolders.has(file.id) ? 
        <FolderOpen className="w-4 h-4 text-blue-400" /> : 
        <Folder className="w-4 h-4 text-blue-400" />;
    }
    
    const extension = file.name.split('.').pop()?.toLowerCase();
    const iconColor = {
      'js': 'text-yellow-400',
      'ts': 'text-blue-400',
      'jsx': 'text-cyan-400',
      'tsx': 'text-cyan-400',
      'css': 'text-pink-400',
      'html': 'text-orange-400',
      'md': 'text-gray-400',
      'json': 'text-green-400',
      'x3': 'text-purple-400',
      'py': 'text-blue-500',
      'lua': 'text-blue-600',
      'cpp': 'text-blue-700',
      'cs': 'text-green-500'
    }[extension || ''] || 'text-gray-400';

    return <File className={`w-4 h-4 ${iconColor}`} />;
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

  const renderFileTree = (files: FileItem[], depth = 0) => {
    return files.map(file => (
      <div key={file.id}>
        <div
          className={`flex items-center space-x-1 px-2 py-2 cursor-pointer hover:bg-opacity-20 hover:bg-white transition-colors touch-manipulation select-none group`}
          style={{ 
            paddingLeft: `${8 + depth * 16}px`,
            backgroundColor: selectedFile === file.id ? currentTheme.colors.accent : 'transparent',
            color: currentTheme.colors.text.secondary,
            minHeight: '36px',
            userSelect: 'none',
            WebkitUserSelect: 'none',
            WebkitTouchCallout: 'none'
          }}
          onClick={(e) => handleFileClick(file, e)}
          onTouchStart={(e) => handleTouchStart(file, e)}
          onContextMenu={(e) => handleContextMenu(file.id, e)}
          role="button"
          tabIndex={0}
          aria-label={`${file.type === 'folder' ? 'Folder' : 'File'}: ${file.name}`}
        >
          {file.type === 'folder' && (
            <div className="flex-shrink-0">
              {expandedFolders.has(file.id) ? 
                <ChevronDown className="w-3 h-3 text-gray-400" /> : 
                <ChevronRight className="w-3 h-3 text-gray-400" />
              }
            </div>
          )}
          <div className="flex-shrink-0">
            {getFileIcon(file)}
          </div>
          
          {editingFile === file.id ? (
            <input
              type="text"
              value={editingName}
              onChange={(e) => setEditingName(e.target.value)}
              onBlur={finishRename}
              onKeyDown={(e) => {
                if (e.key === 'Enter') finishRename();
                if (e.key === 'Escape') {
                  setEditingFile(null);
                  setEditingName('');
                }
              }}
              className="flex-1 min-w-0 bg-transparent border-b border-blue-500 outline-none text-sm"
              style={{ color: currentTheme.colors.text.primary }}
              autoFocus
            />
          ) : (
            <span className="text-sm truncate flex-1 min-w-0">{file.name}</span>
          )}

          {/* File context menu button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleContextMenu(file.id, e);
            }}
            className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-opacity-20 hover:bg-white transition-all"
            style={{ minWidth: '20px', minHeight: '20px' }}
          >
            <MoreHorizontal className="w-3 h-3" />
          </button>
        </div>
        
        {file.type === 'folder' && file.children && expandedFolders.has(file.id) && (
          <div>
            {renderFileTree(file.children, depth + 1)}
          </div>
        )}
      </div>
    ));
  };

  // Close menus when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setShowContextMenu(null);
      setShowMainMenu(false);
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div 
        className="h-8 flex items-center justify-between px-3 text-xs font-semibold border-b"
        style={{ 
          color: currentTheme.colors.text.secondary,
          borderColor: currentTheme.colors.border
        }}
      >
        <span>EXPLORER</span>
        <div className="flex items-center space-x-1">
          <button 
            onClick={() => createNewFile()}
            className="hover:bg-opacity-20 hover:bg-white p-1 rounded touch-manipulation"
            style={{ minWidth: '24px', minHeight: '24px' }}
            title="New File"
          >
            <Plus className="w-3 h-3" />
          </button>
          <div className="relative">
            <button 
              onClick={handleMainMenuClick}
              className="hover:bg-opacity-20 hover:bg-white p-1 rounded touch-manipulation"
              style={{ minWidth: '24px', minHeight: '24px' }}
              title="More Actions"
            >
              <MoreHorizontal className="w-3 h-3" />
            </button>

            {/* Main Menu Dropdown */}
            {showMainMenu && (
              <div 
                className="absolute top-full right-0 mt-1 border rounded shadow-lg min-w-[180px] z-50"
                style={{ 
                  backgroundColor: currentTheme.colors.secondary,
                  borderColor: currentTheme.colors.border
                }}
              >
                <button
                  onClick={() => createNewFolder()}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-opacity-20 hover:bg-white transition-colors"
                  style={{ color: currentTheme.colors.text.primary }}
                >
                  <FolderPlus className="w-4 h-4" />
                  <span>Create New Folder</span>
                </button>
                
                <button
                  onClick={() => {
                    // Select all files logic would go here
                    setShowMainMenu(false);
                  }}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-opacity-20 hover:bg-white transition-colors"
                  style={{ color: currentTheme.colors.text.primary }}
                >
                  <SelectAll className="w-4 h-4" />
                  <span>Select All</span>
                </button>
                
                <button
                  onClick={() => {
                    // Remove overlays logic would go here
                    setShowMainMenu(false);
                  }}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-opacity-20 hover:bg-white transition-colors"
                  style={{ color: currentTheme.colors.text.primary }}
                >
                  <EyeOff className="w-4 h-4" />
                  <span>Remove All Overlays</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="py-1">
          {renderFileTree(files)}
        </div>
      </div>

      {/* Context Menu */}
      {showContextMenu && (
        <div 
          className="fixed border rounded shadow-lg min-w-[160px] z-50"
          style={{ 
            backgroundColor: currentTheme.colors.secondary,
            borderColor: currentTheme.colors.border,
            left: showContextMenu.x,
            top: showContextMenu.y
          }}
        >
          {(() => {
            const file = files.find(f => f.id === showContextMenu.fileId) || 
                        files.flatMap(f => f.children || []).find(f => f.id === showContextMenu.fileId);
            
            return (
              <>
                <button
                  onClick={() => startRename(showContextMenu.fileId, file?.name || '')}
                  className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-opacity-20 hover:bg-white transition-colors"
                  style={{ color: currentTheme.colors.text.primary }}
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Rename</span>
                </button>

                {file?.type === 'file' && (
                  <div className="border-t" style={{ borderColor: currentTheme.colors.border }}>
                    <div className="px-3 py-1 text-xs font-semibold" style={{ color: currentTheme.colors.text.secondary }}>
                      Change Syntax
                    </div>
                    {syntaxOptions.map(option => (
                      <button
                        key={option.value}
                        onClick={() => changeSyntax(showContextMenu.fileId, option.value)}
                        className="w-full flex items-center space-x-2 px-3 py-1 text-left hover:bg-opacity-20 hover:bg-white transition-colors"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        <Code className="w-3 h-3" />
                        <span className="text-sm">{option.name}</span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="border-t" style={{ borderColor: currentTheme.colors.border }}>
                  <button
                    onClick={() => deleteFile(showContextMenu.fileId)}
                    className="w-full flex items-center space-x-2 px-3 py-2 text-left hover:bg-opacity-20 hover:bg-red-500 transition-colors text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </>
            );
          })()}
        </div>
      )}

      {/* Mobile-specific styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .touch-manipulation {
            touch-action: manipulation;
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0.1);
          }
        }
      `}</style>
    </div>
  );
};