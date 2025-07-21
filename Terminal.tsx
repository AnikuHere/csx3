import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface TerminalLine {
  id: string;
  type: 'command' | 'output' | 'error';
  content: string;
  timestamp: Date;
}

export const Terminal: React.FC = () => {
  const { currentTheme } = useTheme();
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: '1',
      type: 'output',
      content: 'Welcome to CSX3 Terminal',
      timestamp: new Date()
    }
  ]);
  const [currentCommand, setCurrentCommand] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  const executeCommand = (command: string) => {
    const commandId = Date.now().toString();
    
    // Add command to history
    setLines(prev => [...prev, {
      id: commandId,
      type: 'command',
      content: `$ ${command}`,
      timestamp: new Date()
    }]);

    // Simulate command execution
    setTimeout(() => {
      let output = '';
      let type: 'output' | 'error' = 'output';

      switch (command.toLowerCase().trim()) {
        case 'help':
          output = 'Available commands: help, clear, date, ls, pwd, echo [text], node [file]';
          break;
        case 'clear':
          setLines([]);
          return;
        case 'date':
          output = new Date().toString();
          break;
        case 'ls':
          output = 'src/\nREADME.md\npackage.json';
          break;
        case 'pwd':
          output = '/home/project';
          break;
        default:
          if (command.startsWith('echo ')) {
            output = command.substring(5);
          } else if (command.startsWith('node ')) {
            output = `Executing ${command.substring(5)}...\nHello, CSX3!`;
          } else if (command.trim() === '') {
            return;
          } else {
            output = `Command not found: ${command}`;
            type = 'error';
          }
      }

      setLines(prev => [...prev, {
        id: `${commandId}-output`,
        type,
        content: output,
        timestamp: new Date()
      }]);
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (currentCommand.trim()) {
        setCommandHistory(prev => [...prev, currentCommand]);
        executeCommand(currentCommand);
      }
      setCurrentCommand('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < 0 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setCurrentCommand(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setCurrentCommand('');
        } else {
          setHistoryIndex(newIndex);
          setCurrentCommand(commandHistory[newIndex]);
        }
      }
    }
  };

  const terminalStyle = {
    backgroundColor: currentTheme.colors.terminal.background,
    color: currentTheme.colors.terminal.text
  };

  return (
    <div className="h-full flex flex-col">
      <div 
        className="h-8 flex items-center justify-between px-3 text-xs font-semibold border-b"
        style={{ 
          color: currentTheme.colors.text.secondary,
          borderColor: currentTheme.colors.border
        }}
      >
        <span>TERMINAL</span>
      </div>
      
      <div 
        ref={terminalRef}
        className="flex-1 overflow-y-auto p-3 font-mono text-sm"
        style={terminalStyle}
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map(line => (
          <div 
            key={line.id} 
            className={`mb-1`}
            style={{
              color: line.type === 'command' ? currentTheme.colors.terminal.prompt :
                     line.type === 'error' ? '#ff6b6b' :
                     currentTheme.colors.terminal.text
            }}
          >
            {line.content}
          </div>
        ))}
        
        <div className="flex items-center space-x-2" style={{ color: currentTheme.colors.terminal.prompt }}>
          <span>$</span>
          <input
            ref={inputRef}
            type="text"
            value={currentCommand}
            onChange={(e) => setCurrentCommand(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none"
            style={{ color: currentTheme.colors.terminal.text }}
            placeholder="Type a command..."
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};