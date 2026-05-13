'use client';

import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface GradientBarProps {
  height?: string; // Height in rem units
  className?: string;
  style?: React.CSSProperties;
}

const GradientBar: React.FC<GradientBarProps> = ({ 
  height = '2rem', // Default height
  className = '',
  style = {}
}) => {
  const { theme } = useTheme();
  const gradientRef = useRef<HTMLDivElement>(null);
  const [gradientPosition, setGradientPosition] = useState(50); // 50% is center
  const [targetGradientPosition, setTargetGradientPosition] = useState(50); // Target position for smooth animation

  // Handle mouse movement for gradient animation
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Use page width instead of gradient width for full page tracking
      const pageWidth = window.innerWidth;
      const mouseX = e.clientX;
      const centerX = pageWidth / 2;
      
      // Calculate position as percentage from center
      let position;
      if (mouseX <= centerX) {
        // Left half: red increases (position decreases)
        position = 50 - ((centerX - mouseX) / centerX) * 30; // Max 30% shift
      } else {
        // Right half: blue increases (position increases)
        position = 50 + ((mouseX - centerX) / centerX) * 30; // Max 30% shift
      }
      
      // Clamp between 20% and 80%
      position = Math.max(20, Math.min(80, position));
      setTargetGradientPosition(position);
    };

    // Add event listener to the entire document
    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Smooth animation for gradient position with throttling
  useEffect(() => {
    const animationFrame = requestAnimationFrame(() => {
      const diff = targetGradientPosition - gradientPosition;
      if (Math.abs(diff) > 0.1) {
        // Throttle the movement - slower when diff is larger
        const throttleFactor = Math.min(0.05, 0.02 + (Math.abs(diff) * 0.001));
        setGradientPosition(prev => prev + diff * throttleFactor);
      }
    });

    return () => cancelAnimationFrame(animationFrame);
  }, [targetGradientPosition, gradientPosition]);

  return (
    <div
      ref={gradientRef}
      className={`gradient-bar ${className}`}
      style={{
        height,
        width: '100%',
        background: `linear-gradient(90deg, 
          ${theme === 'light' ? '#3032A2' : '#565AD3'} 0%, 
          ${theme === 'light' ? '#3032A2' : '#565AD3'} ${gradientPosition - 20}%, 
          ${theme === 'light' ? '#FA5068' : '#B33E81'} ${gradientPosition + 20}%, 
          ${theme === 'light' ? '#FA5068' : '#B33E81'} 100%)`,
        ...style
      }}
    />
  );
};

export default GradientBar; 