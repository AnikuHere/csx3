import React, { useState, useEffect } from 'react';
import { AlertTriangle, Check, X, Clock, Settings } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface CodeIssue {
  line: number;
  column: number;
  message: string;
  severity: 'error' | 'warning';
  suggestion: string;
}

interface CodeCorrectionProps {
  code: string;
  language: string;
  onCodeFix: (fixedCode: string) => void;
}

export const CodeCorrection: React.FC<CodeCorrectionProps> = ({ 
  code, 
  language, 
  onCodeFix 
}) => {
  const { currentTheme, themeName } = useTheme();
  const [issues, setIssues] = useState<CodeIssue[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentIssue, setCurrentIssue] = useState<CodeIssue | null>(null);
  const [autoCorrectMode, setAutoCorrectMode] = useState<'ask' | 'auto' | 'never'>('ask');
  const [countdown, setCountdown] = useState(5);
  const [isCountingDown, setIsCountingDown] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('csx3-autocorrect-mode');
    if (savedMode) {
      setAutoCorrectMode(savedMode as 'ask' | 'auto' | 'never');
    }
  }, []);

  useEffect(() => {
    if (code.trim()) {
      const detectedIssues = detectCodeIssues(code, language);
      setIssues(detectedIssues);
      
      if (detectedIssues.length > 0 && autoCorrectMode !== 'never') {
        const firstIssue = detectedIssues[0];
        setCurrentIssue(firstIssue);
        
        if (autoCorrectMode === 'auto') {
          setIsCountingDown(true);
          setCountdown(5);
          setShowPopup(true);
        } else {
          setShowPopup(true);
        }
      }
    }
  }, [code, language, autoCorrectMode]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCountingDown && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isCountingDown && countdown === 0) {
      handleAutoFix();
    }
    return () => clearTimeout(timer);
  }, [countdown, isCountingDown]);

  const detectCodeIssues = (code: string, language: string): CodeIssue[] => {
    const issues: CodeIssue[] = [];
    const lines = code.split('\n');

    if (language === 'javascript') {
      lines.forEach((line, index) => {
        // Missing semicolons
        if (line.trim() && 
            !line.trim().endsWith(';') && 
            !line.trim().endsWith('{') && 
            !line.trim().endsWith('}') &&
            !line.trim().startsWith('//') &&
            !line.trim().startsWith('if') &&
            !line.trim().startsWith('for') &&
            !line.trim().startsWith('while') &&
            !line.trim().startsWith('function') &&
            !line.trim().startsWith('class') &&
            !line.trim().includes('//')) {
          issues.push({
            line: index + 1,
            column: line.length,
            message: 'Missing semicolon',
            severity: 'warning',
            suggestion: line + ';'
          });
        }

        // Undefined variables (basic check)
        if (line.includes('console.log') && !line.includes('console.log(')) {
          issues.push({
            line: index + 1,
            column: line.indexOf('console.log'),
            message: 'Missing parentheses in console.log',
            severity: 'error',
            suggestion: line.replace('console.log', 'console.log()')
          });
        }

        // Missing quotes
        if (line.includes('console.log(') && !line.includes('"') && !line.includes("'")) {
          const match = line.match(/console\.log\(([^)]+)\)/);
          if (match && !match[1].includes('$') && !match[1].includes('`')) {
            issues.push({
              line: index + 1,
              column: line.indexOf('console.log'),
              message: 'String should be quoted',
              severity: 'error',
              suggestion: line.replace(match[1], `"${match[1]}"`)
            });
          }
        }
      });
    }

    if (language === 'python') {
      lines.forEach((line, index) => {
        // Missing colons
        if ((line.trim().startsWith('if ') || 
             line.trim().startsWith('for ') || 
             line.trim().startsWith('while ') || 
             line.trim().startsWith('def ') || 
             line.trim().startsWith('class ')) && 
            !line.trim().endsWith(':')) {
          issues.push({
            line: index + 1,
            column: line.length,
            message: 'Missing colon',
            severity: 'error',
            suggestion: line + ':'
          });
        }

        // Print function
        if (line.includes('print ') && !line.includes('print(')) {
          issues.push({
            line: index + 1,
            column: line.indexOf('print'),
            message: 'Use print() function syntax',
            severity: 'error',
            suggestion: line.replace(/print\s+(.+)/, 'print($1)')
          });
        }
      });
    }

    if (language === 'x3') {
      lines.forEach((line, index) => {
        // Missing variable prefix
        if (line.includes('prt ') && line.includes(' ') && !line.includes('$') && !line.includes('"')) {
          const parts = line.split(' ');
          if (parts.length > 1 && parts[1] && !parts[1].startsWith('"')) {
            issues.push({
              line: index + 1,
              column: line.indexOf(parts[1]),
              message: 'Variable should start with $',
              severity: 'error',
              suggestion: line.replace(parts[1], '$' + parts[1])
            });
          }
        }

        // Missing quotes for strings
        if (line.includes('reg str ') && !line.includes('"')) {
          issues.push({
            line: index + 1,
            column: line.length,
            message: 'String value should be quoted',
            severity: 'error',
            suggestion: line + ' "value"'
          });
        }
      });
    }

    return issues;
  };

  const applyFix = (issue: CodeIssue): string => {
    const lines = code.split('\n');
    lines[issue.line - 1] = issue.suggestion;
    return lines.join('\n');
  };

  const handleYes = () => {
    if (currentIssue) {
      const fixedCode = applyFix(currentIssue);
      onCodeFix(fixedCode);
    }
    setShowPopup(false);
    setIsCountingDown(false);
  };

  const handleNo = () => {
    setShowPopup(false);
    setIsCountingDown(false);
  };

  const handleAlways = () => {
    setAutoCorrectMode('auto');
    localStorage.setItem('csx3-autocorrect-mode', 'auto');
    handleYes();
  };

  const handleNever = () => {
    setAutoCorrectMode('never');
    localStorage.setItem('csx3-autocorrect-mode', 'never');
    setShowPopup(false);
    setIsCountingDown(false);
  };

  const handleAutoFix = () => {
    if (currentIssue) {
      const fixedCode = applyFix(currentIssue);
      onCodeFix(fixedCode);
    }
    setShowPopup(false);
    setIsCountingDown(false);
  };

  if (!showPopup || !currentIssue) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
      <div 
        className={`rounded-2xl p-6 max-w-md w-full mx-4 transform transition-all duration-300 animate-scale-in ${
          themeName === 'glassmorphism' ? 'backdrop-blur-md' : ''
        } ${
          themeName === 'cyber' ? 'cyber-popup-glow' : ''
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
            ? `0 0 40px ${currentTheme.colors.primary}40, inset 0 0 20px ${currentTheme.colors.primary}20` 
            : themeName === 'glassmorphism'
              ? '0 8px 32px rgba(0, 0, 0, 0.1)'
              : '0 10px 25px rgba(0, 0, 0, 0.2)'
        }}
      >
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div 
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              themeName === 'cyber' ? 'animate-pulse' : ''
            }`}
            style={{ backgroundColor: currentTheme.colors.primary }}
          >
            <AlertTriangle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 
              className={`text-lg font-bold ${
                themeName === 'cyber' ? 'cyber-text-glow' : ''
              }`}
              style={{ color: currentTheme.colors.text.primary }}
            >
              Codect Detection
            </h3>
            {isCountingDown && (
              <div className="flex items-center space-x-2 mt-1">
                <Clock className="w-4 h-4" style={{ color: currentTheme.colors.primary }} />
                <span 
                  className="text-sm font-mono"
                  style={{ color: currentTheme.colors.text.secondary }}
                >
                  Auto-fixing in {countdown}s
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Issue Details */}
        <div 
          className="p-4 rounded-lg mb-6"
          style={{ 
            backgroundColor: currentTheme.colors.accent,
            border: `1px solid ${currentTheme.colors.border}`
          }}
        >
          <p 
            className="text-sm mb-2"
            style={{ color: currentTheme.colors.text.secondary }}
          >
            <strong>Line {currentIssue.line}:</strong> {currentIssue.message}
          </p>
          <div className="text-xs font-mono">
            <div 
              className="mb-1"
              style={{ color: currentTheme.colors.text.secondary }}
            >
              Current: <span className="text-red-400">{code.split('\n')[currentIssue.line - 1]}</span>
            </div>
            <div style={{ color: currentTheme.colors.text.secondary }}>
              Suggested: <span className="text-green-400">{currentIssue.suggestion}</span>
            </div>
          </div>
        </div>

        {/* Message */}
        <p 
          className="text-center mb-6"
          style={{ color: currentTheme.colors.text.primary }}
        >
          Codect has detected an issue with your code. Should we fix it?
        </p>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={handleYes}
            className={`flex items-center justify-center space-x-2 p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
              themeName === 'cyber' ? 'cyber-button-glow' : ''
            }`}
            style={{
              backgroundColor: currentTheme.colors.primary,
              color: 'white',
              boxShadow: themeName === 'cyber' 
                ? `0 0 20px ${currentTheme.colors.primary}40` 
                : 'none'
            }}
          >
            <Check className="w-4 h-4" />
            <span>Yes</span>
          </button>

          <button
            onClick={handleNo}
            className="flex items-center justify-center space-x-2 p-3 rounded-lg transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: 'transparent',
              color: currentTheme.colors.text.primary,
              border: `1px solid ${currentTheme.colors.border}`
            }}
          >
            <X className="w-4 h-4" />
            <span>No</span>
          </button>

          <button
            onClick={handleAlways}
            className="flex items-center justify-center space-x-2 p-3 rounded-lg transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: currentTheme.colors.accent,
              color: currentTheme.colors.text.primary,
              border: `1px solid ${currentTheme.colors.border}`
            }}
          >
            <Settings className="w-4 h-4" />
            <span>Always automatically</span>
          </button>

          <button
            onClick={handleNever}
            className="flex items-center justify-center space-x-2 p-3 rounded-lg transition-all duration-200 hover:scale-105"
            style={{
              backgroundColor: 'transparent',
              color: currentTheme.colors.text.secondary,
              border: `1px solid ${currentTheme.colors.border}`
            }}
          >
            <X className="w-4 h-4" />
            <span>Never</span>
          </button>
        </div>

        {/* Progress bar for countdown */}
        {isCountingDown && (
          <div className="mt-4">
            <div 
              className="h-1 rounded-full overflow-hidden"
              style={{ backgroundColor: currentTheme.colors.accent }}
            >
              <div 
                className="h-full transition-all duration-1000 ease-linear"
                style={{ 
                  backgroundColor: currentTheme.colors.primary,
                  width: `${((5 - countdown) / 5) * 100}%`
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Global Styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { transform: scale(0.9) translateY(20px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        
        .cyber-popup-glow {
          position: relative;
        }
        
        .cyber-popup-glow::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, ${currentTheme.colors.primary}60, transparent, ${currentTheme.colors.primary}60);
          border-radius: inherit;
          z-index: -1;
          animation: cyber-pulse 2s infinite;
        }
        
        .cyber-text-glow {
          text-shadow: 0 0 10px currentColor;
        }
        
        .cyber-button-glow:hover {
          box-shadow: 0 0 30px ${currentTheme.colors.primary}80 !important;
        }
        
        @keyframes cyber-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};