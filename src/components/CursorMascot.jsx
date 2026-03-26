import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CursorMascot() {
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
        {/* You can completely delete this <svg> and replace it with: 
            <img src="/images/your-custom-mascot.png" className="w-full h-full object-contain" alt="Mascot" /> 
        */}
        <svg viewBox="0 0 100 100" className="w-full h-full text-accent drop-shadow-xl" shapeRendering="geometricPrecision">
          {/* Main Ghost/Mascot Body */}
          <path d="M50,15 C25,15 15,35 15,65 C15,90 25,95 35,90 C40,88 44,92 50,90 C56,92 60,88 65,90 C75,95 85,90 85,65 C85,35 75,15 50,15 Z" fill="currentColor" />
          
          {/* Big Cute Eyes (with Blinking Animation) */}
          <ellipse cx="35" cy="45" rx="5" ry="8" fill="#1e1e28">
            <animate attributeName="ry" values="8;1;8;8;8;8;8;8;8;8;8;8" dur="4s" repeatCount="indefinite" />
          </ellipse>
          <ellipse cx="65" cy="45" rx="5" ry="8" fill="#1e1e28">
            <animate attributeName="ry" values="8;1;8;8;8;8;8;8;8;8;8;8" dur="4s" repeatCount="indefinite" />
          </ellipse>
          
          {/* Blushing Cheeks */}
          <circle cx="25" cy="55" r="5" fill="#ff7675" opacity="0.6" />
          <circle cx="75" cy="55" r="5" fill="#ff7675" opacity="0.6" />
        </svg>
      </div>
    </div>
  );
}
