import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface CodeEditorProps {
  content: string;
  language: string;
  onChange: (content: string) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({ 
  content, 
  language, 
  onChange 
}) => {
  const { currentTheme } = useTheme();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const lineNumbersRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const updateLineNumbers = () => {
    if (!lineNumbersRef.current || !textareaRef.current) return;
    
    const lines = content.split('\n').length;
    const lineNumbers = Array.from({ length: lines }, (_, i) => i + 1);
    
    lineNumbersRef.current.innerHTML = lineNumbers
      .map(num => `<div class="text-right pr-2 select-none ${isMobile ? 'text-xs' : ''}" style="color: ${currentTheme.colors.editor.lineNumbers}">${num}</div>`)
      .join('');
  };

  useEffect(() => {
    updateLineNumbers();
  }, [content, currentTheme, isMobile]);

  const syntaxHighlight = (code: string, lang: string) => {
    let highlightedCode = code;

    if (lang === 'javascript' || lang === 'js') {
      highlightedCode = code
        .replace(/\b(const|let|var|function|return|if|else|for|while|class|import|export|from|async|await|try|catch|finally)\b/g, '<span style="color: #c586c0">$1</span>')
        .replace(/\b(console|document|window|Array|Object|String|Number|Boolean|Date|Math|JSON)\b/g, '<span style="color: #4fc1ff">$1</span>')
        .replace(/"([^"]*)"/g, '<span style="color: #ce9178">"$1"</span>')
        .replace(/'([^']*)'/g, '<span style="color: #ce9178">\'$1\'</span>')
        .replace(/\/\/.*$/gm, '<span style="color: #6a9955">$&</span>')
        .replace(/\/\*[\s\S]*?\*\//g, '<span style="color: #6a9955">$&</span>');
    }
    
    else if (lang === 'python') {
      highlightedCode = code
        .replace(/\b(def|class|if|elif|else|for|while|try|except|finally|with|import|from|as|return|yield|lambda|pass|break|continue|global|nonlocal|assert|del|raise|and|or|not|in|is)\b/g, '<span style="color: #c586c0">$1</span>')
        .replace(/\b(print|len|range|str|int|float|list|dict|tuple|set|bool|type|isinstance|hasattr|getattr|setattr|open|input|enumerate|zip|map|filter|sorted|reversed|sum|min|max|abs|round)\b/g, '<span style="color: #4fc1ff">$1</span>')
        .replace(/"([^"]*)"/g, '<span style="color: #ce9178">"$1"</span>')
        .replace(/'([^']*)'/g, '<span style="color: #ce9178">\'$1\'</span>')
        .replace(/#.*$/gm, '<span style="color: #6a9955">$&</span>');
    }
    
    else if (lang === 'lua') {
      highlightedCode = code
        .replace(/\b(function|end|if|then|else|elseif|while|do|for|repeat|until|break|return|local|and|or|not|nil|true|false)\b/g, '<span style="color: #c586c0">$1</span>')
        .replace(/\b(print|type|tostring|tonumber|pairs|ipairs|next|table|string|math|io|os)\b/g, '<span style="color: #4fc1ff">$1</span>')
        .replace(/"([^"]*)"/g, '<span style="color: #ce9178">"$1"</span>')
        .replace(/'([^']*)'/g, '<span style="color: #ce9178">\'$1\'</span>')
        .replace(/--.*$/gm, '<span style="color: #6a9955">$&</span>');
    }
    
    else if (lang === 'cpp') {
      highlightedCode = code
        .replace(/\b(int|float|double|char|bool|void|string|auto|const|static|extern|inline|virtual|public|private|protected|class|struct|enum|namespace|using|template|typename|if|else|for|while|do|switch|case|default|break|continue|return|try|catch|throw|new|delete|sizeof|typedef|union|goto)\b/g, '<span style="color: #c586c0">$1</span>')
        .replace(/\b(std|cout|cin|endl|vector|string|map|set|list|queue|stack|pair|make_pair|sort|find|begin|end|size|empty|push_back|pop_back|front|back|insert|erase|clear)\b/g, '<span style="color: #4fc1ff">$1</span>')
        .replace(/"([^"]*)"/g, '<span style="color: #ce9178">"$1"</span>')
        .replace(/'([^']*)'/g, '<span style="color: #ce9178">\'$1\'</span>')
        .replace(/\/\/.*$/gm, '<span style="color: #6a9955">$&</span>')
        .replace(/\/\*[\s\S]*?\*\//g, '<span style="color: #6a9955">$&</span>');
    }
    
    else if (lang === 'csharp') {
      highlightedCode = code
        .replace(/\b(using|namespace|class|struct|interface|enum|public|private|protected|internal|static|readonly|const|virtual|override|abstract|sealed|partial|async|await|var|int|string|bool|double|float|decimal|char|byte|short|long|object|void|if|else|for|foreach|while|do|switch|case|default|break|continue|return|try|catch|finally|throw|new|this|base|null|true|false)\b/g, '<span style="color: #c586c0">$1</span>')
        .replace(/\b(Console|String|Array|List|Dictionary|HashSet|Queue|Stack|StringBuilder|DateTime|TimeSpan|Math|Convert|Parse|ToString|WriteLine|ReadLine|Length|Count|Add|Remove|Contains|Clear|First|Last|Where|Select|OrderBy|GroupBy)\b/g, '<span style="color: #4fc1ff">$1</span>')
        .replace(/"([^"]*)"/g, '<span style="color: #ce9178">"$1"</span>')
        .replace(/'([^']*)'/g, '<span style="color: #ce9178">\'$1\'</span>')
        .replace(/\/\/.*$/gm, '<span style="color: #6a9955">$&</span>')
        .replace(/\/\*[\s\S]*?\*\//g, '<span style="color: #6a9955">$&</span>');
    }
    
    else if (lang === 'x3') {
      highlightedCode = code
        .replace(/\b(if|else|end|while|def|fncend|call|reg|prt|inp|fetch|exit|cls|goto|wait|inc|dec|add|sub|mul|div|mod|pow|sqrt|fastmath|load|flush|reinit)\b/g, '<span style="color: #c586c0">$1</span>')
        .replace(/\b(terminal|w_file|r_file|a_file|del_file|create_dir|delete_dir|search_file|sys_info|set_env|str_len|dev\.debug)\b/g, '<span style="color: #4fc1ff">$1</span>')
        .replace(/\$([a-zA-Z_][a-zA-Z0-9_]*)/g, '<span style="color: #dcdcaa">$&</span>')
        .replace(/(##[a-zA-Z_][a-zA-Z0-9_]*)/g, '<span style="color: #4ec9b0">$1</span>')
        .replace(/"([^"]*)"/g, '<span style="color: #ce9178">"$1"</span>')
        .replace(/'([^']*)'/g, '<span style="color: #ce9178">\'$1\'</span>')
        .replace(/(\/\/.*$|\\\\.*$)/gm, '<span style="color: #6a9955">$1</span>')
        .replace(/\b(==|!=|>=|<=|>|<|==ic|\|\+\||startswith|contains|&|\|)\b/g, '<span style="color: #d7ba7d">$1</span>')
        .replace(/\b(int|float|str|bool)\b/g, '<span style="color: #4ec9b0">$1</span>');
    }
    
    else if (lang === 'visual') {
      highlightedCode = code
        .replace(/\b(when|if|then|else|repeat|forever|wait|move|turn|say|play|stop|start|end)\b/g, '<span style="color: #c586c0">$1</span>')
        .replace(/\b(sprite|sound|backdrop|variable|list|clone|broadcast|receive)\b/g, '<span style="color: #4fc1ff">$1</span>')
        .replace(/"([^"]*)"/g, '<span style="color: #ce9178">"$1"</span>')
        .replace(/\/\/.*$/gm, '<span style="color: #6a9955">$&</span>');
    }
    
    else if (lang === 'css') {
      highlightedCode = code
        .replace(/([a-zA-Z-]+)(\s*:\s*)/g, '<span style="color: #92c5f8">$1</span>$2')
        .replace(/(#[a-fA-F0-9]{3,6})/g, '<span style="color: #dcdcaa">$1</span>')
        .replace(/\{|\}/g, '<span style="color: #c586c0">$&</span>')
        .replace(/\/\*[\s\S]*?\*\//g, '<span style="color: #6a9955">$&</span>');
    }
    
    else if (lang === 'html') {
      highlightedCode = code
        .replace(/(<\/?)([a-zA-Z][a-zA-Z0-9]*)(.*?)(>)/g, '<span style="color: #569cd6">$1</span><span style="color: #92c5f8">$2</span><span style="color: #dcdcaa">$3</span><span style="color: #569cd6">$4</span>')
        .replace(/(<!--[\s\S]*?-->)/g, '<span style="color: #6a9955">$1</span>');
    }
    
    return highlightedCode;
  };

  const editorStyle = {
    backgroundColor: currentTheme.colors.editor.background,
    color: currentTheme.colors.text.primary
  };

  return (
    <div className="h-full flex" style={editorStyle}>
      {/* Line Numbers */}
      <div 
        ref={lineNumbersRef}
        className={`font-mono py-4 border-r ${isMobile ? 'min-w-[40px] text-xs' : 'min-w-[50px] text-xs'}`}
        style={{ 
          backgroundColor: currentTheme.colors.editor.background,
          borderColor: currentTheme.colors.border
        }}
      />
      
      {/* Editor */}
      <div className="flex-1 relative">
        {/* Syntax Highlighted Background */}
        <div 
          className={`absolute inset-0 p-4 font-mono pointer-events-none whitespace-pre-wrap break-words ${
            isMobile ? 'text-sm' : 'text-sm'
          }`}
          style={{ 
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            lineHeight: '1.5',
            color: currentTheme.colors.text.primary
          }}
          dangerouslySetInnerHTML={{ 
            __html: syntaxHighlight(content, language) 
          }}
        />
        
        {/* Actual Textarea */}
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => onChange(e.target.value)}
          className={`w-full h-full p-4 bg-transparent text-transparent font-mono resize-none outline-none ${
            isMobile ? 'text-sm' : 'text-sm'
          }`}
          style={{ 
            caretColor: currentTheme.colors.text.primary,
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            lineHeight: '1.5'
          }}
          placeholder="Start typing..."
          spellCheck={false}
          // Mobile-specific attributes
          autoCapitalize="none"
          autoCorrect="off"
          autoComplete="off"
        />
      </div>
    </div>
  );
};