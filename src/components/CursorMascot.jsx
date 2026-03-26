import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CursorMascot({ variant = 'ghost' }) {
  const containerRef = useRef(null);
  const visualsRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // State refs for continuous lerp animation
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const isHovering = useRef(false);
  
  // Continuous physics states
  const currentRotation = useRef(0);
  const currentScale = useRef(1);
  const time = useRef(0);
  const idleWeight = useRef(0); // 0 = Moving, 1 = Full Idle

  useEffect(() => {
    // Disable on mobile/tablets
    if (window.innerWidth < 768) return;
    setIsVisible(true);
    
    // Defer initialization to ensure refs are attached
    const initTimer = setTimeout(() => {
        const container = containerRef.current;
        const visuals = visualsRef.current;
        if (!container || !visuals) return;

        // Center the container exactly on its coordinates
        gsap.set(container, { xPercent: -50, yPercent: -50, transformOrigin: "50% 50%" });
        gsap.set(visuals, { transformOrigin: "50% 50%" });

        const onMouseMove = (e) => {
          mouse.current.x = e.clientX;
          mouse.current.y = e.clientY;
        };

        window.addEventListener('mousemove', onMouseMove);

        const handleMouseOver = (e) => {
          const target = e.target.closest('a, button, input, textarea');
          if (target) isHovering.current = true;
        };
        
        const handleMouseOut = (e) => {
          const target = e.target.closest('a, button, input, textarea');
          if (target) isHovering.current = false;
        };

        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);

        const updatePosition = () => {
          // Increase delta time for sine waves
          time.current += 0.04;

          // 1) Base Follow Lerp
          const followSpeed = isHovering.current ? 0.15 : 0.06; // Snappier on hover, dreamier normally
          const dx = mouse.current.x - pos.current.x;
          const dy = mouse.current.y - pos.current.y;
          
          pos.current.x += dx * followSpeed;
          pos.current.y += dy * followSpeed;

          // Prevent going off-screen (clamp)
          const padding = 40;
          pos.current.x = Math.max(padding, Math.min(pos.current.x, window.innerWidth - padding));
          pos.current.y = Math.max(padding, Math.min(pos.current.y, window.innerHeight - padding));

          // 2) Idle Weight Calculation
          const distanceToMouse = Math.sqrt(dx * dx + dy * dy);
          // If we are very close to the mouse target and not hovering, slowly blend into Idle State
          if (distanceToMouse < 2 && !isHovering.current) {
              idleWeight.current += (1 - idleWeight.current) * 0.05; // Lerp into idle
          } else {
              idleWeight.current += (0 - idleWeight.current) * 0.2;  // Snap out of idle
          }

          // 3) Idle Physics (Floating, Breathing, Drifting)
          // Uses Lissajous curves scaled by the idleWeight
          const idleY = Math.sin(time.current * 1.5) * 12 * idleWeight.current;
          const idleRot = Math.cos(time.current * 0.8) * 8 * idleWeight.current;
          
          // Breathing effect: slight stretch/squash
          const breatheStretch = Math.sin(time.current * 2) * 0.05 * idleWeight.current;
          const idleScaleX = 1 + breatheStretch;
          const idleScaleY = 1 - breatheStretch;

          // Apply Container Transform (Position + Floating Y)
          gsap.set(container, {
            x: pos.current.x,
            y: pos.current.y + idleY,
          });

          // 4) Rotation Lerp (Tilts based on horizontal movement)
          const velocityX = dx * followSpeed;
          const targetRotation = velocityX * 2.5; // Exaggerate tilt slightly
          // Smoothly interpolate current rotation to target rotation
          currentRotation.current += (targetRotation - currentRotation.current) * 0.15;
          // Clamp rotation to avoid spinning out during fast snaps
          const clampedRotation = Math.max(-45, Math.min(currentRotation.current, 45));

          // 5) Scale Lerp (Snaps up on hover)
          const targetScale = isHovering.current ? 1.4 : 1;
          // Interpolate scale towards target scale
          currentScale.current += (targetScale - currentScale.current) * (isHovering.current ? 0.2 : 0.1);

          // Apply Visuals Transform (Rotation, Scale, Breathing)
          gsap.set(visuals, {
             rotation: clampedRotation + idleRot,
             scaleX: currentScale.current * idleScaleX,
             scaleY: currentScale.current * idleScaleY,
          });
        };

        // Hook GSAP ticker (requestAnimationFrame)
        gsap.ticker.add(updatePosition);

        return () => {
          window.removeEventListener('mousemove', onMouseMove);
          document.removeEventListener('mouseover', handleMouseOver);
          document.removeEventListener('mouseout', handleMouseOut);
          gsap.ticker.remove(updatePosition);
        };
    }, 100);

    return () => clearTimeout(initTimer);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed top-0 left-0 w-20 h-20 pointer-events-none z-[100]"
      style={{ willChange: 'transform' }}
    >
      <div 
        ref={visualsRef} 
        className="w-full h-full flex items-center justify-center filter drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]"
        style={{ willChange: 'transform' }}
      >
        {variant === 'ghost' && (
          <svg viewBox="0 0 100 100" className="w-full h-full text-accent drop-shadow-xl" shapeRendering="geometricPrecision">
            <path d="M50,15 C25,15 15,35 15,65 C15,90 25,95 35,90 C40,88 44,92 50,90 C56,92 60,88 65,90 C75,95 85,90 85,65 C85,35 75,15 50,15 Z" fill="currentColor" />
            <ellipse cx="35" cy="45" rx="5" ry="8" fill="#1e1e28">
              <animate attributeName="ry" values="8;1;8;8;8;8;8;8;8;8;8;8" dur="4s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="65" cy="45" rx="5" ry="8" fill="#1e1e28">
              <animate attributeName="ry" values="8;1;8;8;8;8;8;8;8;8;8;8" dur="4s" repeatCount="indefinite" />
            </ellipse>
            <circle cx="25" cy="55" r="5" fill="#ff7675" opacity="0.6" />
            <circle cx="75" cy="55" r="5" fill="#ff7675" opacity="0.6" />
          </svg>
        )}

        {variant === 'drone' && (
          <svg viewBox="0 0 100 100" className="w-full h-full text-accent">
            <rect x="20" y="35" width="60" height="30" rx="10" fill="#252540" stroke="currentColor" strokeWidth="4" />
            <rect x="28" y="42" width="44" height="16" rx="4" fill="#1a1a2e" stroke="transparent" />
            <ellipse cx="40" cy="50" rx="3.5" ry="5" fill="currentColor" />
            <ellipse cx="60" cy="50" rx="3.5" ry="5" fill="currentColor" />
            <line x1="50" y1="35" x2="50" y2="15" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="50" cy="15" r="5" fill="#ff7675" />
            <path d="M 30 75 Q 50 85 70 75" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.8" />
            <path d="M 35 85 Q 50 95 65 85" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity="0.4" />
          </svg>
        )}

        {variant === 'cyberpet' && (
          <svg viewBox="0 0 100 100" className="w-full h-full text-accent drop-shadow-md">
            <polygon points="20,50 10,20 40,40" fill="#252540" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
            <polygon points="80,50 90,20 60,40" fill="#252540" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
            <polygon points="22,45 15,28 35,40" fill="currentColor" opacity="0.4" />
            <polygon points="78,45 85,28 65,40" fill="currentColor" opacity="0.4" />
            <path d="M 20 50 Q 50 35 80 50 L 90 70 Q 50 95 10 70 Z" fill="#1a1a2e" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
            <ellipse cx="35" cy="55" rx="4" ry="7" fill="currentColor">
              <animate attributeName="ry" values="7;1;7;7;7;7;7;7;7;7;7;7" dur="4s" repeatCount="indefinite" />
            </ellipse>
            <ellipse cx="65" cy="55" rx="4" ry="7" fill="currentColor">
              <animate attributeName="ry" values="7;1;7;7;7;7;7;7;7;7;7;7" dur="4s" repeatCount="indefinite" />
            </ellipse>
            <polygon points="47,65 53,65 50,69" fill="#ff7675" />
            <line x1="22" y1="58" x2="8" y2="55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
            <line x1="25" y1="66" x2="12" y2="70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
            <line x1="78" y1="58" x2="92" y2="55" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
            <line x1="75" y1="66" x2="88" y2="70" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
          </svg>
        )}

        {variant === 'retro' && (
          <svg viewBox="0 0 100 100" className="w-full h-full text-accent drop-shadow-xl" shapeRendering="crispEdges">
            <polygon points="25,20 25,85 45,70 56,92 70,86 60,62 85,62" fill="currentColor" stroke="#1a1a2e" strokeWidth="6" strokeLinejoin="miter" />
            <polygon points="34,34 34,71 44,61 54,81 59,79 49,59 72,59" fill="#ffffff" opacity="0.25" />
            <rect x="75" y="75" width="6" height="6" fill="currentColor" stroke="#1a1a2e" strokeWidth="2" />
            <rect x="85" y="65" width="6" height="6" fill="currentColor" stroke="#1a1a2e" strokeWidth="2" />
            <rect x="15" y="88" width="8" height="8" fill="currentColor" stroke="#1a1a2e" strokeWidth="2" />
            <rect x="85" y="30" width="5" height="5" fill="#ff7675" stroke="#1a1a2e" strokeWidth="2" />
          </svg>
        )}
      </div>
    </div>
  );
}
