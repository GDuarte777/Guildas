import React, { useEffect, useRef, ReactNode } from 'react';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green' | 'red' | 'orange';
  size?: 'sm' | 'md' | 'lg';
  width?: string | number;
  height?: string | number;
  customSize?: boolean; // When true, ignores size prop and uses width/height or className
  debugMode?: boolean; // Enable visual debugging for cursor alignment
}

const glowColorMap = {
  blue: { base: 220, spread: 200 },
  purple: { base: 280, spread: 300 },
  green: { base: 120, spread: 200 },
  red: { base: 0, spread: 200 },
  orange: { base: 30, spread: 200 }
};

const sizeMap = {
  sm: 'w-48 h-64',
  md: 'w-64 h-80',
  lg: 'w-80 h-96'
};

const GlowCard: React.FC<GlowCardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'blue', 
  size = 'md', 
  width, 
  height, 
  customSize = false,
  debugMode = false 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const isTrackingRef = useRef(false);

  useEffect(() => {
    const syncPointer = (e: PointerEvent) => {
      if (!cardRef.current) return;
      
      const rect = cardRef.current.getBoundingClientRect();
      
      // Check if cursor is over this specific card
      const isOverCard = e.clientX >= rect.left && e.clientX <= rect.right && 
                        e.clientY >= rect.top && e.clientY <= rect.bottom;
      
      // Only apply effect when cursor is over this card
      if (!isOverCard) {
        // Reset effect when cursor leaves with smooth transition
        cardRef.current.style.setProperty('--opacity', '0');
        // Move spotlight off-screen after fade out
        setTimeout(() => {
          if (cardRef.current) {
            cardRef.current.style.setProperty('--x', '-100px');
            cardRef.current.style.setProperty('--y', '-100px');
          }
        }, 200);
        return;
      }
      
      // Calculate exact position relative to the card with sub-pixel precision
      const relativeX = e.clientX - rect.left;
      const relativeY = e.clientY - rect.top;
      
      // Clamp values to card boundaries to prevent overflow
      const clampedX = Math.max(0, Math.min(relativeX, rect.width));
      const clampedY = Math.max(0, Math.min(relativeY, rect.height));
      
      // Only update if position changed significantly (sub-pixel movement)
      const deltaX = Math.abs(clampedX - lastPositionRef.current.x);
      const deltaY = Math.abs(clampedY - lastPositionRef.current.y);
      
      if (deltaX > 0.1 || deltaY > 0.1) {
        lastPositionRef.current = { x: clampedX, y: clampedY };
        
        // Set CSS custom properties for exact cursor positioning
        cardRef.current.style.setProperty('--x', `${clampedX.toFixed(2)}px`);
        cardRef.current.style.setProperty('--y', `${clampedY.toFixed(2)}px`);
        cardRef.current.style.setProperty('--xp', (clampedX / rect.width).toFixed(6));
        cardRef.current.style.setProperty('--yp', (clampedY / rect.height).toFixed(6));
        cardRef.current.style.setProperty('--opacity', '1');
        
        // Store card dimensions for responsive calculations
        cardRef.current.style.setProperty('--card-width', `${rect.width}px`);
        cardRef.current.style.setProperty('--card-height', `${rect.height}px`);
        
        // Update debug display if enabled
        if (debugMode && cardRef.current) {
          const debugX = cardRef.current.querySelector('#debug-x');
          const debugY = cardRef.current.querySelector('#debug-y');
          if (debugX) debugX.textContent = clampedX.toFixed(1);
          if (debugY) debugY.textContent = clampedY.toFixed(1);
        }
      }
    };

    // Use requestAnimationFrame for smooth updates
    let rafId: number;
    const throttledSyncPointer = (e: PointerEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => syncPointer(e));
    };

    document.addEventListener('pointermove', throttledSyncPointer, { passive: true });
    return () => {
      document.removeEventListener('pointermove', throttledSyncPointer);
      cancelAnimationFrame(rafId);
    };
  }, [debugMode]);

  const { base, spread } = glowColorMap[glowColor];

  // Determine sizing
  const getSizeClasses = () => {
    if (customSize) {
      return ''; // Let className or inline styles handle sizing
    }
    return sizeMap[size];
  };

  const getInlineStyles = () => {
    const baseStyles = {
      '--base': base,
      '--spread': spread,
      '--radius': '14',
      '--border': '1', // Reduced from 3 to 1 for a cleaner, modern look
      '--backdrop': 'transparent', // Removed explicit backdrop color for better theme adaptability
      '--backup-border': 'transparent', // Removed hardcoded border
      '--size': '200',
      '--outer': '1',
      '--opacity': '0', // Initially hidden
      '--border-size': 'calc(var(--border, 1) * 1px)',
      '--spotlight-size': 'calc(var(--size, 150) * 1px)',
      '--hue': 'calc(var(--base) + (var(--xp, 0) * var(--spread, 0)))',
      backgroundImage: `radial-gradient( 
        var(--spotlight-size) var(--spotlight-size) at 
        calc(var(--x, 0) - var(--border-size)) 
        calc(var(--y, 0) - var(--border-size)), 
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 70) * 1%) / calc(var(--opacity, 0) * 0.1)), transparent 
      )`,
      backgroundColor: 'var(--backdrop, transparent)',
      backgroundSize: 'calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)))',
      backgroundPosition: '0 0',
      border: 'var(--border-size) solid var(--backup-border)',
      position: 'relative' as const,
      touchAction: 'none' as const,
      willChange: 'background-image' as const,
      overflow: 'hidden' as const,
      transition: 'background-image 0.2s ease-out' as const,
    };

    // Add width and height if provided
    if (width !== undefined) {
      baseStyles.width = typeof width === 'number' ? `${width}px` : width;
    }
    if (height !== undefined) {
      baseStyles.height = typeof height === 'number' ? `${height}px` : height;
    }

    return baseStyles;
  };

  const beforeAfterStyles = `
    [data-glow]::before, 
    [data-glow]::after {
      pointer-events: none;
      content: "";
      position: absolute;
      inset: calc(var(--border-size) * -1);
      border: var(--border-size) solid transparent;
      border-radius: calc(var(--radius) * 1px);
      background-size: calc(100% + (2 * var(--border-size))) calc(100% + (2 * var(--border-size)));
      background-repeat: no-repeat;
      background-position: 0 0;
      mask: linear-gradient(transparent, transparent), linear-gradient(white, white);
      mask-clip: padding-box, border-box;
      mask-composite: intersect;
      will-change: background-image;
      opacity: var(--opacity, 0);
      transition: opacity 0.15s ease-out;
    }
    
    [data-glow]::before {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.75) calc(var(--spotlight-size) * 0.75) at
        calc(var(--x, 0) - var(--border-size))
        calc(var(--y, 0) - var(--border-size)),
        hsl(var(--hue, 210) calc(var(--saturation, 100) * 1%) calc(var(--lightness, 50) * 1%) / calc(var(--opacity, 0) * 0.8)), transparent 100%
      );
      filter: brightness(2);
    }
    
    [data-glow]::after {
      background-image: radial-gradient(
        calc(var(--spotlight-size) * 0.5) calc(var(--spotlight-size) * 0.5) at
        calc(var(--x, 0) - var(--border-size))
        calc(var(--y, 0) - var(--border-size)),
        hsl(0 100% 100% / calc(var(--opacity, 0) * 0.6)), transparent 100%
      );
    }
    
    [data-glow] [data-glow] {
      position: absolute;
      inset: 0;
      will-change: filter;
      opacity: var(--outer, 1);
      border-radius: calc(var(--radius) * 1px);
      border-width: calc(var(--border-size) * 20);
      filter: blur(calc(var(--border-size) * 10));
      background: none;
      pointer-events: none;
      border: none;
      opacity: var(--opacity, 0);
      transition: opacity 0.15s ease-out;
    }
    
    [data-glow] > [data-glow]::before {
      inset: -10px;
      border-width: 10px;
    }
  `;

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: beforeAfterStyles }} />
      <div
        ref={cardRef}
        data-glow
        style={getInlineStyles()}
        className={`
          ${getSizeClasses()}
          ${!customSize ? 'aspect-[3/4]' : ''}
          rounded-2xl
          relative
          grid
          grid-rows-[1fr_auto]
          shadow-[0_1rem_2rem_-1rem_black]
          p-4
          gap-4
          backdrop-blur-[5px]
          ${debugMode ? 'debug-cursor' : ''}
          ${className}
        `}
      >
        <div ref={innerRef} data-glow></div>
        {children}
        {debugMode && (
          <div className="absolute top-2 left-2 bg-black/80 text-white text-xs font-mono p-2 rounded z-50 pointer-events-none">
            <div>X: <span id="debug-x">0</span>px</div>
            <div>Y: <span id="debug-y">0</span>px</div>
            <div className="w-2 h-2 bg-red-500 rounded-full absolute -translate-x-1/2 -translate-y-1/2" 
                 style={{ left: 'var(--x, 0)', top: 'var(--y, 0)' }} />
          </div>
        )}
      </div>
      {debugMode && (
        <style dangerouslySetInnerHTML={{ __html: `
          .debug-cursor::after {
            content: '';
            position: absolute;
            width: 4px;
            height: 4px;
            background: #ff0000;
            border: 1px solid #ffffff;
            border-radius: 50%;
            left: var(--x, 0);
            top: var(--y, 0);
            transform: translate(-50%, -50%);
            z-index: 9999;
            pointer-events: none;
          }
        `}} />
      )}
    </>
  );
};

export { GlowCard };