import React, { useState } from 'react';
import { X, Folder, Code, Image, Music, Video, FileText } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { Project } from './ProjectManager';
import type { FileItem } from '../App';

interface ProjectCreationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onProjectCreated: (project: Project) => void;
}

export const ProjectCreationDialog: React.FC<ProjectCreationDialogProps> = ({
  isOpen,
  onClose,
  onProjectCreated
}) => {
  const { currentTheme, themeName } = useTheme();
  const [projectName, setProjectName] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [selectedExtensions, setSelectedExtensions] = useState<string[]>(['javascript', 'css', 'html']);

  const availableExtensions = [
    { id: 'javascript', name: 'JavaScript', icon: <Code className="w-4 h-4" />, color: '#f7df1e' },
    { id: 'typescript', name: 'TypeScript', icon: <Code className="w-4 h-4" />, color: '#3178c6' },
    { id: 'python', name: 'Python', icon: <Code className="w-4 h-4" />, color: '#3776ab' },
    { id: 'lua', name: 'Lua', icon: <Code className="w-4 h-4" />, color: '#000080' },
    { id: 'cpp', name: 'C++', icon: <Code className="w-4 h-4" />, color: '#00599c' },
    { id: 'csharp', name: 'C#', icon: <Code className="w-4 h-4" />, color: '#239120' },
    { id: 'x3', name: 'X3', icon: <Code className="w-4 h-4" />, color: '#8b5cf6' },
    { id: 'css', name: 'CSS', icon: <Code className="w-4 h-4" />, color: '#1572b6' },
    { id: 'html', name: 'HTML', icon: <Code className="w-4 h-4" />, color: '#e34f26' },
    { id: 'markdown', name: 'Markdown', icon: <FileText className="w-4 h-4" />, color: '#083fa1' },
    { id: 'json', name: 'JSON', icon: <Code className="w-4 h-4" />, color: '#000000' }
  ];

  const toggleExtension = (extensionId: string) => {
    setSelectedExtensions(prev => 
      prev.includes(extensionId)
        ? prev.filter(id => id !== extensionId)
        : [...prev, extensionId]
    );
  };

  const createProject = () => {
    if (!projectName.trim()) return;

    // Create base project structure
    const baseFiles: FileItem[] = [
      {
        id: 'src-folder',
        name: 'src',
        type: 'folder',
        children: []
      },
      {
        id: 'assets-folder',
        name: 'assets',
        type: 'folder',
        children: []
      }
    ];

    // Add starter files based on selected extensions
    const srcFiles: FileItem[] = [];
    
    if (selectedExtensions.includes('html')) {
      srcFiles.push({
        id: 'index-html',
        name: 'index.html',
        type: 'file',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${projectName}</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1>Welcome to ${projectName}</h1>
        <p>Your project is ready to go!</p>
    </div>
    <script src="script.js"></script>
</body>
</html>`,
        language: 'html'
      });
    }

    if (selectedExtensions.includes('css')) {
      srcFiles.push({
        id: 'styles-css',
        name: 'styles.css',
        type: 'file',
        content: `/* ${projectName} Styles */

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    line-height: 1.6;
    color: #333;
    background: #f4f4f4;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    text-align: center;
}

h1 {
    color: #2c3e50;
    margin-bottom: 1rem;
    font-size: 2.5rem;
}

p {
    font-size: 1.2rem;
    color: #7f8c8d;
}`,
        language: 'css'
      });
    }

    if (selectedExtensions.includes('javascript')) {
      srcFiles.push({
        id: 'script-js',
        name: 'script.js',
        type: 'file',
        content: `// ${projectName} JavaScript

console.log('Welcome to ${projectName}!');

// Add your JavaScript code here
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');
    
    // Example: Add click event to elements
    const container = document.querySelector('.container');
    if (container) {
        container.addEventListener('click', function() {
            console.log('Container clicked!');
        });
    }
});`,
        language: 'javascript'
      });
    }

    if (selectedExtensions.includes('python')) {
      srcFiles.push({
        id: 'main-py',
        name: 'main.py',
        type: 'file',
        content: `# ${projectName} - Python Script

def main():
    """Main function for ${projectName}"""
    print("Welcome to ${projectName}!")
    
    # Add your Python code here
    
if __name__ == "__main__":
    main()`,
        language: 'python'
      });
    }

    if (selectedExtensions.includes('x3')) {
      srcFiles.push({
        id: 'main-x3',
        name: 'main.x3',
        type: 'file',
        content: `// ${projectName} - X3 Script

reg str project_name "${projectName}"
prt "Welcome to " $project_name "!"

// Add your X3 code here
reg int counter 0
while $counter < 3
    prt "Initializing... " $counter
    inc counter
end

prt "Project setup complete!"`,
        language: 'x3'
      });
    }

    if (selectedExtensions.includes('markdown')) {
      srcFiles.push({
        id: 'readme-md',
        name: 'README.md',
        type: 'file',
        content: `# ${projectName}

${projectDescription || 'A new project created with CSX3.'}

## Getting Started

This project was created using CSX3 with the following technologies:
${selectedExtensions.map(ext => `- ${ext.charAt(0).toUpperCase() + ext.slice(1)}`).join('\n')}

## Project Structure

\`\`\`
${projectName}/
├── src/          # Source code files
├── assets/       # Images, videos, and other assets
└── README.md     # This file
\`\`\`

## Development

Open this project in CSX3 to start developing!

---

Created with ❤️ using CSX3`,
        language: 'markdown'
      });
    }

    // Add source files to src folder
    baseFiles[0].children = srcFiles;

    // Add a sample asset file
    baseFiles[1].children = [{
      id: 'sample-asset',
      name: '.gitkeep',
      type: 'file',
      content: '# This file keeps the assets folder in version control\n# Add your images, videos, and other assets here',
      language: 'text'
    }];

    const newProject: Project = {
      id: Date.now().toString(),
      name: projectName,
      description: projectDescription,
      files: baseFiles,
      lastModified: new Date(),
      created: new Date(),
      language: selectedExtensions[0] || 'mixed',
      fileCount: srcFiles.length + 1
    };

    // Save to localStorage
    const savedProjects = localStorage.getItem('csx3-projects');
    const projects = savedProjects ? JSON.parse(savedProjects) : [];
    projects.unshift(newProject);
    localStorage.setItem('csx3-projects', JSON.stringify(projects));

    onProjectCreated(newProject);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div 
        className={`w-full max-w-2xl max-h-[90vh] rounded-2xl flex flex-col overflow-hidden ${
          themeName === 'glassmorphism' ? 'backdrop-blur-md' : ''
        } ${
          themeName === 'cyber' ? 'cyber-dialog-glow' : ''
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
              🚀 Create New Project
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-opacity-20 hover:bg-white transition-colors"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-6">
            {/* Project Name */}
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: currentTheme.colors.text.secondary }}
              >
                Project Name *
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundColor: currentTheme.colors.accent,
                  color: currentTheme.colors.text.primary,
                  border: `1px solid ${currentTheme.colors.border}`
                }}
                placeholder="Enter your project name..."
              />
            </div>

            {/* Project Description */}
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ color: currentTheme.colors.text.secondary }}
              >
                Description (Optional)
              </label>
              <textarea
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                style={{
                  backgroundColor: currentTheme.colors.accent,
                  color: currentTheme.colors.text.primary,
                  border: `1px solid ${currentTheme.colors.border}`
                }}
                rows={3}
                placeholder="Describe your project..."
              />
            </div>

            {/* Extensions Selection */}
            <div>
              <label 
                className="block text-sm font-medium mb-3"
                style={{ color: currentTheme.colors.text.secondary }}
              >
                Select Languages & Extensions
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {availableExtensions.map((extension) => (
                  <button
                    key={extension.id}
                    onClick={() => toggleExtension(extension.id)}
                    className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                      selectedExtensions.includes(extension.id)
                        ? 'ring-2 ring-blue-500'
                        : ''
                    } ${
                      themeName === 'cyber' ? 'cyber-extension-card' : ''
                    }`}
                    style={{
                      backgroundColor: selectedExtensions.includes(extension.id)
                        ? currentTheme.colors.primary + '20'
                        : currentTheme.colors.accent,
                      borderColor: selectedExtensions.includes(extension.id)
                        ? currentTheme.colors.primary
                        : currentTheme.colors.border,
                      color: currentTheme.colors.text.primary
                    }}
                  >
                    <div 
                      className="p-1 rounded"
                      style={{ backgroundColor: extension.color }}
                    >
                      {extension.icon}
                    </div>
                    <span className="text-sm font-medium">{extension.name}</span>
                  </button>
                ))}
              </div>
              <p 
                className="text-xs mt-2 opacity-70"
                style={{ color: currentTheme.colors.text.secondary }}
              >
                Selected extensions will create starter files in your project
              </p>
            </div>

            {/* Project Structure Preview */}
            <div>
              <label 
                className="block text-sm font-medium mb-3"
                style={{ color: currentTheme.colors.text.secondary }}
              >
                Project Structure Preview
              </label>
              <div 
                className="p-4 rounded-lg font-mono text-sm"
                style={{
                  backgroundColor: currentTheme.colors.accent,
                  border: `1px solid ${currentTheme.colors.border}`
                }}
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Folder className="w-4 h-4 text-blue-400" />
                  <span style={{ color: currentTheme.colors.text.primary }}>
                    {projectName || 'your-project'}
                  </span>
                </div>
                <div className="ml-6 space-y-1">
                  <div className="flex items-center space-x-2">
                    <Folder className="w-3 h-3 text-blue-400" />
                    <span style={{ color: currentTheme.colors.text.secondary }}>src/</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Folder className="w-3 h-3 text-blue-400" />
                    <span style={{ color: currentTheme.colors.text.secondary }}>assets/</span>
                  </div>
                  {selectedExtensions.includes('markdown') && (
                    <div className="flex items-center space-x-2">
                      <FileText className="w-3 h-3 text-gray-400" />
                      <span style={{ color: currentTheme.colors.text.secondary }}>README.md</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div 
          className="p-6 border-t"
          style={{ borderColor: currentTheme.colors.border }}
        >
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-lg transition-colors"
              style={{
                color: currentTheme.colors.text.secondary,
                border: `1px solid ${currentTheme.colors.border}`
              }}
            >
              Cancel
            </button>
            <button
              onClick={createProject}
              disabled={!projectName.trim()}
              className={`px-6 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 ${
                themeName === 'cyber' ? 'cyber-create-button' : ''
              }`}
              style={{
                backgroundColor: currentTheme.colors.primary,
                color: 'white',
                boxShadow: themeName === 'cyber' 
                  ? `0 0 20px ${currentTheme.colors.primary}40` 
                  : 'none'
              }}
            >
              Create Project
            </button>
          </div>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx>{`
        .cyber-dialog-glow {
          position: relative;
        }
        
        .cyber-dialog-glow::before {
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
        
        .cyber-create-button:hover {
          box-shadow: 0 0 30px ${currentTheme.colors.primary}80 !important;
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