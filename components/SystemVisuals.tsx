
import React, { useEffect, useRef, useState } from 'react';
import { useSystem } from './SystemCore';

/* --- 1. TACTICAL CURSOR COMPONENT (CROSSHAIR EDITION) --- */
export const TacticalCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    // Hide default cursor globally
    document.body.style.cursor = 'none';

    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
      if (followerRef.current) {
        // Add slight delay logic via CSS transition
        followerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Detect interactive elements including inputs and text areas
      if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') || 
        target.tagName === 'INPUT' || 
        target.tagName === 'TEXTAREA' ||
        target.classList.contains('cursor-pointer') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.body.style.cursor = 'auto';
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      {/* 1. Exact Center Point (Always sharp) */}
      <div 
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[20000] mix-blend-difference"
        style={{ marginTop: -2, marginLeft: -2 }}
      >
        <div className="w-1 h-1 bg-white rounded-full shadow-[0_0_2px_#fff]" />
      </div>
      
      {/* 2. Tactical Reticle (Follower) */}
      <div 
        ref={followerRef}
        className="fixed top-0 left-0 pointer-events-none z-[19999] transition-transform duration-100 ease-out will-change-transform flex items-center justify-center mix-blend-exclusion"
        style={{ marginTop: -20, marginLeft: -20, width: 40, height: 40 }}
      >
        {/* Outer Ring / Bracket */}
        <div 
          className={`relative transition-all duration-300 flex items-center justify-center
            ${isHovering ? 'scale-150 rotate-90' : 'scale-100 rotate-0'}
            ${isClicking ? 'scale-75 duration-100' : ''}
          `}
        >
            {/* Top Left Bracket */}
            <div className={`absolute top-0 left-0 w-3 h-3 border-t-[1.5px] border-l-[1.5px] transition-colors duration-300 ${isHovering ? 'border-emerald-400' : 'border-white/60'}`} />
            {/* Top Right Bracket */}
            <div className={`absolute top-0 right-0 w-3 h-3 border-t-[1.5px] border-r-[1.5px] transition-colors duration-300 ${isHovering ? 'border-emerald-400' : 'border-white/60'}`} />
            {/* Bottom Left Bracket */}
            <div className={`absolute bottom-0 left-0 w-3 h-3 border-b-[1.5px] border-l-[1.5px] transition-colors duration-300 ${isHovering ? 'border-emerald-400' : 'border-white/60'}`} />
            {/* Bottom Right Bracket */}
            <div className={`absolute bottom-0 right-0 w-3 h-3 border-b-[1.5px] border-r-[1.5px] transition-colors duration-300 ${isHovering ? 'border-emerald-400' : 'border-white/60'}`} />
            
            {/* Center Crosshair (Visible on Hover) */}
            <div className={`absolute w-full h-full flex items-center justify-center transition-opacity duration-300 ${isHovering ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-[1px] h-3 bg-emerald-500/50 absolute" />
                <div className="h-[1px] w-3 bg-emerald-500/50 absolute" />
            </div>
        </div>
        
        {/* Label (Optional Tech Text) */}
        {isHovering && (
             <div className="absolute top-full mt-6 text-[8px] font-mono font-bold text-emerald-400 tracking-widest bg-black/80 px-2 py-0.5 rounded whitespace-nowrap border border-emerald-500/20">
                 TARGET_LOCKED
             </div>
        )}
      </div>
    </>
  );
};

/* --- 2. REACTIVE GRID COMPONENT (Canvas) --- */
export const ReactiveGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let mouseX = -1000;
    let mouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', handleMouseMove);
    resizeCanvas();

    // Grid Configuration
    const gridSize = 60; // Larger grid for cleaner look
    const nodeColor = 'rgba(255, 255, 255, 0.03)';
    const activeColor = 'rgba(191, 149, 63, 0.2)'; // Gold tint
    const synapseColor = 'rgba(191, 149, 63, 0.1)'; 

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const cols = Math.ceil(canvas.width / gridSize);
      const rows = Math.ceil(canvas.height / gridSize);

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          const x = i * gridSize;
          const y = j * gridSize;

          // Distance from mouse
          const dx = mouseX - x;
          const dy = mouseY - y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const maxDistance = 200;

          // Draw Node (Cross instead of dot for tactical feel)
          if (distance < maxDistance) {
             const size = 3;
             ctx.beginPath();
             // Draw cross
             ctx.moveTo(x - size, y);
             ctx.lineTo(x + size, y);
             ctx.moveTo(x, y - size);
             ctx.lineTo(x, y + size);
             ctx.strokeStyle = activeColor;
             ctx.stroke();

             // Draw Synapse (Line to mouse)
             ctx.beginPath();
             ctx.moveTo(x, y);
             ctx.lineTo(mouseX, mouseY);
             ctx.strokeStyle = synapseColor;
             ctx.lineWidth = (1 - distance / maxDistance) * 1.5;
             ctx.stroke();
          } else {
             // Passive Small Cross
             ctx.beginPath();
             ctx.moveTo(x - 1, y);
             ctx.lineTo(x + 1, y);
             ctx.moveTo(x, y - 1);
             ctx.lineTo(x, y + 1);
             ctx.strokeStyle = nodeColor;
             ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 opacity-40 mix-blend-screen"
    />
  );
};

/* --- 3. GLITCH TEXT COMPONENT (Utility) --- */
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

export const GlitchText: React.FC<{ text: string, className?: string }> = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const { sounds } = useSystem();

  const handleHover = () => { 
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text.split('').map((char, index) => {
          if (index < iteration) {
            return text[index];
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    }, 30);
    
    if (Math.random() > 0.8) sounds.hover();
  };

  return (
    <span className={`${className} cursor-default`} onMouseEnter={handleHover}>
      {displayText}
    </span>
  );
};

/* --- 4. SYSTEM VISUALS EXPORT --- */
export const SystemVisuals: React.FC = () => {
  return (
    <>
      <ReactiveGrid />
      <TacticalCursor />
    </>
  );
};
