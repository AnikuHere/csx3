import React, { useState, useEffect } from 'react';
import { Folder, Plus, Trash2, Edit, Calendar, Code, Save } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import type { FileItem } from '../App';

export interface Project {
  id: string;
  name: string;
  description: string;
  files: FileItem[];
  lastModified: Date;
  created: Date;
  language: string;
  fileCount: number;
}

interface ProjectManagerProps {
  onProjectSelect: (project: Project) => void;
  onCreateProject: () => void;
  currentFiles?: FileItem[];
}

export const ProjectManager: React.FC<ProjectManagerProps> = ({ 
  onProjectSelect, 
  onCreateProject,
  currentFiles = []
}) => {
  const { currentTheme, themeName } = useTheme();
  const [projects, setProjects] = useState<Project[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectDescription, setNewProjectDescription] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = () => {
    const savedProjects = localStorage.getItem('csx3-projects');
    if (savedProjects) {
      const parsed = JSON.parse(savedProjects);
      // Convert date strings back to Date objects
      const projectsWithDates = parsed.map((p: any) => ({
        ...p,
        lastModified: new Date(p.lastModified),
        created: new Date(p.created)
      }));
      setProjects(projectsWithDates);
    }
  };

  const saveProjects = (updatedProjects: Project[]) => {
    localStorage.setItem('csx3-projects', JSON.stringify(updatedProjects));
    setProjects(updatedProjects);
  };

  const createProject = () => {
    if (!newProjectName.trim()) return;

    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName,
      description: newProjectDescription,
      files: currentFiles,
      lastModified: new Date(),
      created: new Date(),
      language: detectPrimaryLanguage(currentFiles),
      fileCount: countFiles(currentFiles)
    };

    const updatedProjects = [newProject, ...projects];
    saveProjects(updatedProjects);
    
    setNewProjectName('');
    setNewProjectDescription('');
    setShowCreateDialog(false);
  };

  const deleteProject = (projectId: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const updatedProjects = projects.filter(p => p.id !== projectId);
      saveProjects(updatedProjects);
    }
  };

  const saveCurrentProject = () => {
    if (currentFiles.length === 0) return;

    const projectName = prompt('Enter project name:');
    if (!projectName) return;

    const description = prompt('Enter project description (optional):') || '';

    const newProject: Project = {
      id: Date.now().toString(),
      name: projectName,
      description,
      files: currentFiles,
      lastModified: new Date(),
      created: new Date(),
      language: detectPrimaryLanguage(currentFiles),
      fileCount: countFiles(currentFiles)
    };

    const updatedProjects = [newProject, ...projects];
    saveProjects(updatedProjects);
  };

  const detectPrimaryLanguage = (files: FileItem[]): string => {
    const languageCounts: Record<string, number> = {};
    
    const countLanguages = (fileList: FileItem[]) => {
      fileList.forEach(file => {
        if (file.type === 'file' && file.language) {
          languageCounts[file.language] = (languageCounts[file.language] || 0) + 1;
        } else if (file.type === 'folder' && file.children) {
          countLanguages(file.children);
        }
      });
    };

    countLanguages(files);
    
    const primaryLanguage = Object.entries(languageCounts)
      .sort(([,a], [,b]) => b - a)[0];
    
    return primaryLanguage ? primaryLanguage[0] : 'mixed';
  };

  const countFiles = (files: FileItem[]): number => {
    let count = 0;
    
    const countRecursive = (fileList: FileItem[]) => {
      fileList.forEach(file => {
        if (file.type === 'file') {
          count++;
        } else if (file.type === 'folder' && file.children) {
          countRecursive(file.children);
        }
      });
    };

    countRecursive(files);
    return count;
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      javascript: '#f7df1e',
      python: '#3776ab',
      lua: '#000080',
      cpp: '#00599c',
      csharp: '#239120',
      x3: '#8b5cf6',
      css: '#1572b6',
      html: '#e34f26',
      markdown: '#083fa1',
      json: '#000000',
      mixed: '#6b7280'
    };
    return colors[language] || '#6b7280';
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div 
        className="p-4 border-b"
        style={{ borderColor: currentTheme.colors.border }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 
            className={`text-lg font-bold ${
              themeName === 'cyber' ? 'cyber-text-glow' : ''
            }`}
            style={{ color: currentTheme.colors.text.primary }}
          >
            📁 My Projects
          </h3>
          <div className="flex space-x-2">
            <button
              onClick={saveCurrentProject}
              className={`p-2 rounded-lg transition-colors hover:scale-105 ${
                themeName === 'cyber' ? 'cyber-button-glow' : ''
              }`}
              style={{
                backgroundColor: currentTheme.colors.primary,
                color: 'white'
              }}
              title="Save Current Project"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowCreateDialog(true)}
              className={`p-2 rounded-lg transition-colors hover:scale-105 ${
                themeName === 'cyber' ? 'cyber-button-glow' : ''
              }`}
              style={{
                backgroundColor: currentTheme.colors.primary,
                color: 'white'
              }}
              title="Create New Project"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Projects List */}
      <div className="flex-1 overflow-y-auto p-4">
        {projects.length === 0 ? (
          <div className="text-center py-8">
            <Folder className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: currentTheme.colors.text.secondary }} />
            <p 
              className="mb-4"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              No projects yet. Create your first project!
            </p>
            <button
              onClick={onCreateProject}
              className={`px-4 py-2 rounded-lg transition-colors hover:scale-105 ${
                themeName === 'cyber' ? 'cyber-button-glow' : ''
              }`}
              style={{
                backgroundColor: currentTheme.colors.primary,
                color: 'white'
              }}
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {projects.map(project => (
              <div
                key={project.id}
                className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                  themeName === 'cyber' ? 'cyber-project-card' : ''
                }`}
                style={{
                  backgroundColor: currentTheme.colors.accent,
                  borderColor: currentTheme.colors.border,
                  boxShadow: themeName === 'cyber' 
                    ? `0 0 20px ${currentTheme.colors.primary}20` 
                    : 'none'
                }}
                onClick={() => onProjectSelect(project)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 
                        className="font-semibold"
                        style={{ color: currentTheme.colors.text.primary }}
                      >
                        {project.name}
                      </h4>
                      <span 
                        className="px-2 py-1 rounded text-xs font-medium"
                        style={{ 
                          backgroundColor: getLanguageColor(project.language),
                          color: 'white'
                        }}
                      >
                        {project.language}
                      </span>
                    </div>

                    {project.description && (
                      <p 
                        className="text-sm mb-2"
                        style={{ color: currentTheme.colors.text.secondary }}
                      >
                        {project.description}
                      </p>
                    )}

                    <div className="flex items-center space-x-4 text-xs">
                      <div className="flex items-center space-x-1">
                        <Code className="w-3 h-3" />
                        <span style={{ color: currentTheme.colors.text.secondary }}>
                          {project.fileCount} files
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span style={{ color: currentTheme.colors.text.secondary }}>
                          {formatDate(project.lastModified)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteProject(project.id);
                    }}
                    className="p-2 rounded-lg hover:bg-red-500 hover:bg-opacity-20 transition-colors"
                    style={{ color: currentTheme.colors.text.secondary }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Project Dialog */}
      {showCreateDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div 
            className={`p-6 rounded-2xl max-w-md w-full mx-4 ${
              themeName === 'glassmorphism' ? 'backdrop-blur-md' : ''
            }`}
            style={{
              backgroundColor: themeName === 'glassmorphism' 
                ? 'rgba(255, 255, 255, 0.1)' 
                : currentTheme.colors.secondary,
              backdropFilter: themeName === 'glassmorphism' ? 'blur(20px)' : 'none',
              border: `1px solid ${currentTheme.colors.border}`
            }}
          >
            <h3 
              className="text-lg font-bold mb-4"
              style={{ color: currentTheme.colors.text.primary }}
            >
              Create New Project
            </h3>

            <div className="space-y-4">
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: currentTheme.colors.text.secondary }}
                >
                  Project Name
                </label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={(e) => setNewProjectName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: currentTheme.colors.accent,
                    color: currentTheme.colors.text.primary,
                    border: `1px solid ${currentTheme.colors.border}`
                  }}
                  placeholder="Enter project name..."
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ color: currentTheme.colors.text.secondary }}
                >
                  Description (Optional)
                </label>
                <textarea
                  value={newProjectDescription}
                  onChange={(e) => setNewProjectDescription(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  style={{
                    backgroundColor: currentTheme.colors.accent,
                    color: currentTheme.colors.text.primary,
                    border: `1px solid ${currentTheme.colors.border}`
                  }}
                  rows={3}
                  placeholder="Enter project description..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowCreateDialog(false)}
                className="px-4 py-2 rounded-lg transition-colors"
                style={{
                  color: currentTheme.colors.text.secondary,
                  border: `1px solid ${currentTheme.colors.border}`
                }}
              >
                Cancel
              </button>
              <button
                onClick={createProject}
                disabled={!newProjectName.trim()}
                className="px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                style={{
                  backgroundColor: currentTheme.colors.primary,
                  color: 'white'
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Global Styles */}
      <style jsx>{`
        .cyber-project-card {
          position: relative;
          overflow: hidden;
        }
        
        .cyber-project-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, ${currentTheme.colors.primary}, transparent);
          animation: cyber-scan 4s linear infinite;
        }
        
        .cyber-text-glow {
          text-shadow: 0 0 10px currentColor;
        }
        
        .cyber-button-glow:hover {
          box-shadow: 0 0 20px ${currentTheme.colors.primary}60 !important;
        }
        
        @keyframes cyber-scan {
          0% { left: -100%; }
          100% { left: 100%; }
        }
      `}</style>
    </div>
  );
};