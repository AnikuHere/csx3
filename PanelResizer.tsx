import React, { useState, useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface PanelResizerProps {
  direction: 'vertical' | 'horizontal';
  onResize: (delta: number) => void;
}

export const PanelResizer: React.FC<PanelResizerProps> = ({ direction, onResize }) => {
  const { currentTheme } = useTheme();
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const startPos = direction === 'vertical' ? e.clientX : e.clientY;

    const handleMouseMove = (e: MouseEvent) => {
      const currentPos = direction === 'vertical' ? e.clientX : e.clientY;
      const delta = currentPos - startPos;
      onResize(delta);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [direction, onResize]);

  // Touch events for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const startPos = direction === 'vertical' ? e.touches[0].clientX : e.touches[0].clientY;

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const currentPos = direction === 'vertical' ? e.touches[0].clientX : e.touches[0].clientY;
      const delta = currentPos - startPos;
      onResize(delta);
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };

    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  }, [direction, onResize]);

  return (
    <div
      className={`hover:bg-blue-500 transition-colors cursor-${
        direction === 'vertical' ? 'col-resize' : 'row-resize'
      } touch-none`}
      style={{
        width: direction === 'vertical' ? '4px' : '100%',
        height: direction === 'horizontal' ? '4px' : '100%',
        backgroundColor: isDragging ? '#007acc' : currentTheme.colors.border,
        minWidth: direction === 'vertical' ? '4px' : 'auto',
        minHeight: direction === 'horizontal' ? '4px' : 'auto'
      }}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    />
  );
};