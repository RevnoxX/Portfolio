import { useEffect, useState, useRef } from "react";
import { playHover } from "../utils/audio";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  
  const [isHovering, setIsHovering] = useState(false);
  const isHoveringRef = useRef(false);

  useEffect(() => {
    isHoveringRef.current = isHovering;
  }, [isHovering]);

  useEffect(() => {
    let mouseX = -100;
    let mouseY = -100;
    let animationFrameId: number;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const render = () => {
      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate3d(-50%, -50%, 0)`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate3d(-50%, -50%, 0)`;
        innerRef.current.style.opacity = isHoveringRef.current ? '0' : '1';
      }
      animationFrameId = requestAnimationFrame(render);
    };
    
    animationFrameId = requestAnimationFrame(render);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') != null ||
        target.closest('button') != null ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer');

      if (isClickable) {
        setIsHovering(prev => {
          if (!prev) playHover();
          return true;
        });
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      {/* Target Lock Crosshair */}
      <div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center will-change-transform"
      >
        <div className={`relative flex items-center justify-center transition-transform duration-200 ease-out ${isHovering ? 'scale-150 rotate-90' : 'scale-100 rotate-0'}`}>
          {/* Horizontal line */}
          <div className={`absolute h-0.5 w-6 ${isHovering ? 'bg-[#ff00aa]' : 'bg-[#00e5ff]'} transition-colors`} />
          {/* Vertical line */}
          <div className={`absolute w-0.5 h-6 ${isHovering ? 'bg-[#ff00aa]' : 'bg-[#00e5ff]'} transition-colors`} />
          {/* Hollow center square */}
          <div className={`absolute w-3 h-3 border ${isHovering ? 'border-[#ff00aa]' : 'border-[#00e5ff]'} bg-transparent transition-colors`} />
        </div>
      </div>
      
      {/* Precision Dot */}
      <div
        ref={innerRef}
        className="fixed top-0 left-0 w-1 h-1 bg-white pointer-events-none z-[10000] transition-opacity duration-200 will-change-transform"
      />
    </>
  );
}
