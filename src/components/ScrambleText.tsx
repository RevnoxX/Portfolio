import { useState, useEffect, useRef } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export default function ScrambleText({ text, delay = 0 }: { text: string, delay?: number }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let iteration = 0;
    const maxIterations = text.length * 3;
    
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setDisplayText((_) => {
        return text.split('').map((char, index) => {
          if (index < iteration / 3) {
            return text[index];
          }
          if (char === ' ') return ' ';
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        }).join('');
      });

      if (iteration >= maxIterations) {
        clearInterval(intervalRef.current!);
        setDisplayText(text);
      }
      
      iteration += 1;
    }, 30);
  };

  useEffect(() => {
    const timeout = setTimeout(scramble, delay * 1000);
    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [text, delay]);

  return (
    <span 
      onMouseEnter={scramble}
      className="inline-block cursor-default transition-colors duration-300 hover:text-[var(--color-primary)]"
    >
      {displayText}
    </span>
  );
}
