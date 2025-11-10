'use client';

import { useRef } from 'react';
import { cn } from '@/lib/utils/cn';
import { useInteractiveGradient } from '@/hooks/use-interactive-gradient';

interface GradientBarProps {
  /** Custom height for the bar. Uses Tailwind height classes. */
  height?: string;
  /** Additional CSS classes. */
  className?: string;
  /** The start color of the gradient (e.g., 'bg-primary'). */
  startColor?: string;
  /** The end color of the gradient (e.g., 'bg-accent'). */
  endColor?: string;
}

/**
 * An interactive gradient bar that shifts based on mouse position or device tilt.
 * Built with performance and accessibility in mind.
 *
 * @example
 * <GradientBar
 *   height="h-8"
 *   startColor="bg-blue-500"
 *   endColor="bg-pink-500"
 * />
 */
export function GradientBar({
  height = 'h-4',
  className,
  startColor = 'bg-gradient-start',
  endColor = 'bg-gradient-end',
}: GradientBarProps) {
  const gradientRef = useRef<HTMLDivElement>(null);
  const gradientPosition = useInteractiveGradient({ ref: gradientRef });

  return (
    <div
      ref={gradientRef}
      className={cn('w-full', height, className)}
      style={{
        backgroundImage: `linear-gradient(90deg, 
          var(--color-start) 0%, 
          var(--color-start) ${gradientPosition - 20}%, 
          var(--color-end) ${gradientPosition + 20}%, 
          var(--color-end) 100%)`,
        // Dynamically set CSS variables from Tailwind colors
        '--color-start': `rgb(var(--color-${startColor.replace('bg-', '')}))`,
        '--color-end': `rgb(var(--color-${endColor.replace('bg-', '')}))`,
      } as React.CSSProperties}
    />
  );
}
