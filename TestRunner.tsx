import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import type { FileItem } from '../App';

interface TestRunnerProps {
  files: FileItem[];
  onClose: () => void;
}

export const TestRunner: React.FC<TestRunnerProps> = ({ files, onClose }) => {
  const { currentTheme } = useTheme();

  const generateHTML = () => {
    let htmlContent = '';
    let cssContent = '';
    let jsContent = '';
    let x3Content = '';

    const processFiles = (fileList: FileItem[]) => {
      fileList.forEach(file => {
        if (file.type === 'file' && file.content) {
          const extension = file.name.split('.').pop()?.toLowerCase();
          
          switch (extension) {
            case 'html':
              htmlContent += file.content + '\n';
              break;
            case 'css':
              cssContent += file.content + '\n';
              break;
            case 'js':
            case 'javascript':
              jsContent += file.content + '\n';
              break;
            case 'x3':
              x3Content += file.content + '\n';
              break;
          }
        } else if (file.type === 'folder' && file.children) {
          processFiles(file.children);
        }
      });
    };

    processFiles(files);

    // X3 Interpreter (simplified version)
    const x3Interpreter = `
      class X3Interpreter {
        constructor() {
          this.variables = {};
          this.functions = {};
          this.output = [];
        }

        interpret(code) {
          const lines = code.split('\\n').map(line => line.trim()).filter(line => line && !line.startsWith('//') && !line.startsWith('\\\\\\\\'));
          
          for (let i = 0; i < lines.length; i++) {
            try {
              this.executeLine(lines[i]);
            } catch (error) {
              this.output.push('Error: ' + error.message);
            }
          }
          
          return this.output.join('\\n');
        }

        executeLine(line) {
          // Variable declaration: reg type name value
          if (line.startsWith('reg ')) {
            const parts = line.split(' ');
            if (parts.length >= 4) {
              const type = parts[1];
              const name = parts[2];
              const value = parts.slice(3).join(' ').replace(/"/g, '');
              
              if (type === 'str') {
                this.variables[name] = value;
              } else if (type === 'int') {
                this.variables[name] = parseInt(value) || 0;
              } else if (type === 'float') {
                this.variables[name] = parseFloat(value) || 0.0;
              } else if (type === 'bool') {
                this.variables[name] = value.toLowerCase() === 'true';
              }
            }
          }
          
          // Print statement: prt value or prt $variable
          else if (line.startsWith('prt ')) {
            const content = line.substring(4);
            if (content.startsWith('$')) {
              const varName = content.substring(1);
              this.output.push(this.variables[varName] || 'undefined');
            } else if (content.startsWith('"') && content.endsWith('"')) {
              this.output.push(content.slice(1, -1));
            } else {
              // Handle multiple arguments
              const parts = content.split(' ');
              let result = '';
              for (const part of parts) {
                if (part.startsWith('$')) {
                  result += (this.variables[part.substring(1)] || 'undefined') + ' ';
                } else if (part.startsWith('"') && part.endsWith('"')) {
                  result += part.slice(1, -1) + ' ';
                } else {
                  result += part + ' ';
                }
              }
              this.output.push(result.trim());
            }
          }
          
          // Increment: inc variable
          else if (line.startsWith('inc ')) {
            const varName = line.substring(4);
            if (this.variables[varName] !== undefined) {
              this.variables[varName]++;
            }
          }
          
          // Basic while loop (simplified)
          else if (line.startsWith('while ')) {
            // This is a simplified implementation
            // In a real interpreter, you'd need proper parsing
            this.output.push('While loops require more complex parsing');
          }
        }
      }

      // Run X3 code if present
      if (x3Code.trim()) {
        const interpreter = new X3Interpreter();
        const x3Output = interpreter.interpret(x3Code);
        if (x3Output) {
          document.body.innerHTML += '<div style="background: #1e1e1e; color: #00ff41; padding: 20px; margin: 20px; border-radius: 8px; font-family: monospace;"><h3>X3 Output:</h3><pre>' + x3Output + '</pre></div>';
        }
      }
    `;

    // Create the complete HTML document
    const completeHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSX3 Test Runner</title>
    <style>
        body {
            margin: 0;
            padding: 20px;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        .test-header {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            padding: 15px 20px;
            border-radius: 12px;
            margin-bottom: 20px;
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .test-header h1 {
            margin: 0;
            color: white;
            font-size: 24px;
        }
        .test-header p {
            margin: 5px 0 0 0;
            color: rgba(255, 255, 255, 0.8);
            font-size: 14px;
        }
        .content-area {
            background: rgba(255, 255, 255, 0.95);
            border-radius: 12px;
            padding: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        ${cssContent}
    </style>
</head>
<body>
    <div class="test-header">
        <h1>🚀 CSX3 Test Runner</h1>
        <p>Testing your application in a live environment</p>
    </div>
    
    <div class="content-area">
        ${htmlContent || '<h2>No HTML content found</h2><p>Add HTML files to your project to see them rendered here.</p>'}
    </div>

    <script>
        const x3Code = \`${x3Content}\`;
        
        ${x3Interpreter}
        
        // User JavaScript code
        try {
            ${jsContent}
        } catch (error) {
            console.error('JavaScript Error:', error);
            document.body.innerHTML += '<div style="background: #ff4444; color: white; padding: 15px; margin: 20px; border-radius: 8px;"><h3>JavaScript Error:</h3><pre>' + error.message + '</pre></div>';
        }
        
        // Add some helpful information
        if (!document.querySelector('h1, h2, h3, p, div')) {
            document.querySelector('.content-area').innerHTML = \`
                <h2>Welcome to CSX3 Test Runner!</h2>
                <p>This is where your application will run. To see content here:</p>
                <ul>
                    <li>Add HTML files for structure</li>
                    <li>Add CSS files for styling</li>
                    <li>Add JavaScript files for interactivity</li>
                    <li>Add X3 files for custom scripting</li>
                </ul>
                <p>Your files will be automatically combined and executed in this environment.</p>
            \`;
        }
    </script>
</body>
</html>`;

    return completeHTML;
  };

  const openTestWindow = () => {
    const htmlContent = generateHTML();
    const testWindow = window.open('', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
    
    if (testWindow) {
      testWindow.document.write(htmlContent);
      testWindow.document.close();
      testWindow.focus();
    } else {
      alert('Please allow popups for this site to use the Test feature.');
    }
    
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div 
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
        style={{
          backgroundColor: currentTheme.colors.secondary,
          border: `1px solid ${currentTheme.colors.border}`
        }}
      >
        <h2 
          className="text-xl font-semibold mb-4"
          style={{ color: currentTheme.colors.text.primary }}
        >
          🚀 Test Your Application
        </h2>
        
        <p 
          className="mb-6"
          style={{ color: currentTheme.colors.text.secondary }}
        >
          This will open a new window where your code will run in a live environment. 
          HTML, CSS, JavaScript, and X3 files will be combined and executed.
        </p>
        
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded transition-colors"
            style={{ 
              color: currentTheme.colors.text.secondary,
              backgroundColor: 'transparent',
              border: `1px solid ${currentTheme.colors.border}`
            }}
          >
            Cancel
          </button>
          <button
            onClick={openTestWindow}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
          >
            Run Test
          </button>
        </div>
      </div>
    </div>
  );
};