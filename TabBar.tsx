import React from 'react';
import { X } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import type { OpenTab } from '../App';

interface TabBarProps {
  tabs: OpenTab[];
  activeTabId: string;
  onTabSelect: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
}

export const TabBar: React.FC<TabBarProps> = ({ 
  tabs, 
  activeTabId, 
  onTabSelect, 
  onTabClose 
}) => {
  const { currentTheme } = useTheme();

  if (tabs.length === 0) {
    return (
      <div 
        className="h-9 border-b flex items-center px-4"
        style={{ 
          backgroundColor: currentTheme.colors.secondary,
          borderColor: currentTheme.colors.border,
          color: currentTheme.colors.text.secondary
        }}
      >
        <span className="text-sm">No files open</span>
      </div>
    );
  }

  return (
    <div 
      className="h-9 border-b flex items-center overflow-x-auto scrollbar-hide"
      style={{ 
        backgroundColor: currentTheme.colors.secondary,
        borderColor: currentTheme.colors.border
      }}
    >
      {tabs.map(tab => (
        <div
          key={tab.id}
          className={`flex items-center space-x-2 px-3 py-2 border-r cursor-pointer hover:bg-opacity-20 hover:bg-white transition-colors min-w-0 group flex-shrink-0`}
          style={{
            borderColor: currentTheme.colors.border,
            backgroundColor: tab.id === activeTabId ? currentTheme.colors.background : 'transparent',
            color: tab.id === activeTabId ? currentTheme.colors.text.primary : currentTheme.colors.text.secondary,
            minWidth: '120px',
            maxWidth: '200px'
          }}
          onClick={() => onTabSelect(tab.id)}
        >
          <span className="text-sm truncate flex-1">
            {tab.name}
            {tab.isDirty && <span className="text-orange-400 ml-1">●</span>}
          </span>
          <button
            className="hover:bg-opacity-20 hover:bg-white p-0.5 rounded opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity flex-shrink-0 touch-manipulation"
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(tab.id);
            }}
            style={{ minWidth: '20px', minHeight: '20px' }}
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      ))}
      
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};