import React, { createContext, useContext, useState, useEffect } from 'react';
import { Theme, themes } from '../types/theme';

interface ThemeContextType {
  currentTheme: Theme;
  themeName: string;
  setTheme: (themeName: string) => void;
  availableThemes: string[];
  isChangingTheme: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeName, setThemeName] = useState<string>('default');
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes.default);
  const [isChangingTheme, setIsChangingTheme] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('csx3-theme');
    if (savedTheme && themes[savedTheme]) {
      setThemeName(savedTheme);
      setCurrentTheme(themes[savedTheme]);
      applyThemeStyles(themes[savedTheme], savedTheme);
    }
  }, []);

  const applyThemeStyles = (theme: Theme, newThemeName: string) => {
    // Apply theme to document root for global styles
    const root = document.documentElement;
    
    // Set CSS custom properties
    root.style.setProperty('--color-primary', theme.colors.primary);
    root.style.setProperty('--color-secondary', theme.colors.secondary);
    root.style.setProperty('--color-accent', theme.colors.accent);
    root.style.setProperty('--color-background', theme.colors.background);
    root.style.setProperty('--color-surface', theme.colors.surface);
    root.style.setProperty('--color-border', theme.colors.border);
    root.style.setProperty('--color-text-primary', theme.colors.text.primary);
    root.style.setProperty('--color-text-secondary', theme.colors.text.secondary);
    root.style.setProperty('--color-text-accent', theme.colors.text.accent);
    
    // Add wave animation styles for Frutiger theme
    if (newThemeName === 'frutiger') {
      const style = document.createElement('style');
      style.id = 'frutiger-animations';
      style.textContent = `
        @keyframes gentle-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-10px) rotate(1deg); }
          50% { transform: translateY(-5px) rotate(0deg); }
          75% { transform: translateY(-15px) rotate(-1deg); }
        }
        
        @keyframes wave-drift {
          0% { transform: translateX(0px) scaleX(1); }
          50% { transform: translateX(30px) scaleX(1.05); }
          100% { transform: translateX(0px) scaleX(1); }
        }
        
        .frutiger-float {
          animation: gentle-float 6s ease-in-out infinite;
        }
        
        .frutiger-wave {
          animation: wave-drift 12s ease-in-out infinite;
        }
      `;
      
      // Remove existing style if present
      const existingStyle = document.getElementById('frutiger-animations');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      document.head.appendChild(style);
    } else {
      // Remove Frutiger animations for other themes
      const existingStyle = document.getElementById('frutiger-animations');
      if (existingStyle) {
        existingStyle.remove();
      }
    }
  };

  const setTheme = async (newThemeName: string) => {
    if (themes[newThemeName] && newThemeName !== themeName) {
      setIsChangingTheme(true);
      
      // Simulate loading time for smooth transition (reduced from 800ms to 500ms)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setThemeName(newThemeName);
      setCurrentTheme(themes[newThemeName]);
      localStorage.setItem('csx3-theme', newThemeName);
      
      applyThemeStyles(themes[newThemeName], newThemeName);
      
      setIsChangingTheme(false);
    }
  };

  const availableThemes = Object.keys(themes);

  return (
    <ThemeContext.Provider value={{ currentTheme, themeName, setTheme, availableThemes, isChangingTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};