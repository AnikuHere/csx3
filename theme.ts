export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    border: string;
    text: {
      primary: string;
      secondary: string;
      accent: string;
    };
    editor: {
      background: string;
      lineNumbers: string;
      selection: string;
    };
    terminal: {
      background: string;
      text: string;
      prompt: string;
    };
  };
  effects?: {
    blur?: string;
    opacity?: string;
    gradient?: string;
    shadow?: string;
    animation?: string;
  };
}

export const themes: Record<string, Theme> = {
  default: {
    name: 'Default Dark',
    colors: {
      primary: '#007acc',
      secondary: '#2d2d30',
      accent: '#37373d',
      background: '#1e1e1e',
      surface: '#252526',
      border: '#3e3e42',
      text: {
        primary: '#ffffff',
        secondary: '#cccccc',
        accent: '#007acc'
      },
      editor: {
        background: '#1e1e1e',
        lineNumbers: '#858585',
        selection: '#37373d'
      },
      terminal: {
        background: '#1e1e1e',
        text: '#cccccc',
        prompt: '#4ade80'
      }
    }
  },
  glassmorphism: {
    name: 'Glassmorphism',
    colors: {
      primary: '#3b82f6',
      secondary: 'rgba(255, 255, 255, 0.08)',
      accent: 'rgba(255, 255, 255, 0.05)',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
      surface: 'rgba(255, 255, 255, 0.1)',
      border: 'rgba(255, 255, 255, 0.15)',
      text: {
        primary: '#ffffff',
        secondary: 'rgba(255, 255, 255, 0.85)',
        accent: '#60a5fa'
      },
      editor: {
        background: 'rgba(255, 255, 255, 0.05)',
        lineNumbers: 'rgba(255, 255, 255, 0.6)',
        selection: 'rgba(255, 255, 255, 0.1)'
      },
      terminal: {
        background: 'rgba(0, 0, 0, 0.2)',
        text: 'rgba(255, 255, 255, 0.9)',
        prompt: '#4ade80'
      }
    },
    effects: {
      blur: 'backdrop-blur-md',
      opacity: 'bg-opacity-80',
      shadow: 'shadow-2xl'
    }
  },
  frutiger: {
    name: 'Frutiger Aero',
    colors: {
      primary: '#4a90e2',
      secondary: '#f0f8ff',
      accent: '#e6f3ff',
      background: 'linear-gradient(135deg, #87ceeb 0%, #4682b4 50%, #20b2aa 100%)',
      surface: 'rgba(255, 255, 255, 0.85)',
      border: 'rgba(74, 144, 226, 0.25)',
      text: {
        primary: '#2c3e50',
        secondary: '#5a6c7d',
        accent: '#4a90e2'
      },
      editor: {
        background: 'rgba(255, 255, 255, 0.9)',
        lineNumbers: '#4a90e2',
        selection: 'rgba(74, 144, 226, 0.15)'
      },
      terminal: {
        background: 'rgba(44, 62, 80, 0.85)',
        text: '#ecf0f1',
        prompt: '#2ecc71'
      }
    },
    effects: {
      blur: 'backdrop-blur-sm',
      gradient: 'bg-gradient-to-br from-sky-300 via-blue-400 to-teal-400',
      shadow: 'shadow-lg',
      animation: 'waves'
    }
  },
  white: {
    name: 'Plain White',
    colors: {
      primary: '#2563eb',
      secondary: '#f8fafc',
      accent: '#e2e8f0',
      background: '#ffffff',
      surface: '#f8fafc',
      border: '#e2e8f0',
      text: {
        primary: '#1e293b',
        secondary: '#475569',
        accent: '#2563eb'
      },
      editor: {
        background: '#ffffff',
        lineNumbers: '#94a3b8',
        selection: '#e2e8f0'
      },
      terminal: {
        background: '#1e293b',
        text: '#e2e8f0',
        prompt: '#22c55e'
      }
    }
  },
  black: {
    name: 'Plain Black',
    colors: {
      primary: '#ffffff',
      secondary: '#000000',
      accent: '#1a1a1a',
      background: '#000000',
      surface: '#0a0a0a',
      border: '#333333',
      text: {
        primary: '#ffffff',
        secondary: '#cccccc',
        accent: '#ffffff'
      },
      editor: {
        background: '#000000',
        lineNumbers: '#666666',
        selection: '#1a1a1a'
      },
      terminal: {
        background: '#000000',
        text: '#ffffff',
        prompt: '#00ff00'
      }
    }
  },
  neon: {
    name: 'Neon Dreams',
    colors: {
      primary: '#ff0080',
      secondary: 'rgba(20, 20, 40, 0.95)',
      accent: 'rgba(255, 0, 128, 0.1)',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a0a1a 25%, #0a1a2a 50%, #2a0a3a 75%, #0a0a0a 100%)',
      surface: 'rgba(255, 0, 128, 0.05)',
      border: 'rgba(255, 0, 128, 0.3)',
      text: {
        primary: '#ff0080',
        secondary: '#cc0066',
        accent: '#00ffff'
      },
      editor: {
        background: 'rgba(10, 10, 10, 0.95)',
        lineNumbers: '#ff0080',
        selection: 'rgba(255, 0, 128, 0.2)'
      },
      terminal: {
        background: 'rgba(10, 10, 10, 0.98)',
        text: '#ff0080',
        prompt: '#00ffff'
      }
    }
  },
  ocean: {
    name: 'Ocean Depths',
    colors: {
      primary: '#00bcd4',
      secondary: '#1e3a8a',
      accent: '#3b82f6',
      background: 'linear-gradient(135deg, #0c4a6e 0%, #1e3a8a 50%, #1e40af 100%)',
      surface: 'rgba(59, 130, 246, 0.1)',
      border: 'rgba(0, 188, 212, 0.3)',
      text: {
        primary: '#ffffff',
        secondary: '#e0f2fe',
        accent: '#00bcd4'
      },
      editor: {
        background: 'rgba(30, 58, 138, 0.8)',
        lineNumbers: '#00bcd4',
        selection: 'rgba(0, 188, 212, 0.2)'
      },
      terminal: {
        background: 'rgba(12, 74, 110, 0.9)',
        text: '#e0f2fe',
        prompt: '#00bcd4'
      }
    }
  },
  sunset: {
    name: 'Sunset Vibes',
    colors: {
      primary: '#ff6b35',
      secondary: '#2d1b69',
      accent: '#f7931e',
      background: 'linear-gradient(135deg, #ff6b35 0%, #f7931e 25%, #ffcc02 50%, #2d1b69 100%)',
      surface: 'rgba(247, 147, 30, 0.1)',
      border: 'rgba(255, 107, 53, 0.3)',
      text: {
        primary: '#ffffff',
        secondary: '#fef3c7',
        accent: '#ff6b35'
      },
      editor: {
        background: 'rgba(45, 27, 105, 0.8)',
        lineNumbers: '#ff6b35',
        selection: 'rgba(255, 107, 53, 0.2)'
      },
      terminal: {
        background: 'rgba(45, 27, 105, 0.9)',
        text: '#fef3c7',
        prompt: '#ff6b35'
      }
    }
  },
  forest: {
    name: 'Forest Green',
    colors: {
      primary: '#10b981',
      secondary: '#064e3b',
      accent: '#34d399',
      background: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #047857 100%)',
      surface: 'rgba(52, 211, 153, 0.1)',
      border: 'rgba(16, 185, 129, 0.3)',
      text: {
        primary: '#ffffff',
        secondary: '#d1fae5',
        accent: '#10b981'
      },
      editor: {
        background: 'rgba(6, 78, 59, 0.8)',
        lineNumbers: '#10b981',
        selection: 'rgba(16, 185, 129, 0.2)'
      },
      terminal: {
        background: 'rgba(6, 78, 59, 0.9)',
        text: '#d1fae5',
        prompt: '#10b981'
      }
    }
  },
  royal: {
    name: 'Royal Purple',
    colors: {
      primary: '#8b5cf6',
      secondary: '#3730a3',
      accent: '#a78bfa',
      background: 'linear-gradient(135deg, #3730a3 0%, #5b21b6 50%, #7c3aed 100%)',
      surface: 'rgba(167, 139, 250, 0.1)',
      border: 'rgba(139, 92, 246, 0.3)',
      text: {
        primary: '#ffffff',
        secondary: '#ede9fe',
        accent: '#8b5cf6'
      },
      editor: {
        background: 'rgba(55, 48, 163, 0.8)',
        lineNumbers: '#8b5cf6',
        selection: 'rgba(139, 92, 246, 0.2)'
      },
      terminal: {
        background: 'rgba(55, 48, 163, 0.9)',
        text: '#ede9fe',
        prompt: '#8b5cf6'
      }
    }
  }
};