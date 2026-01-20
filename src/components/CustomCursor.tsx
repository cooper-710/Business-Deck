import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) {
      return;
    }

    const update = () => {
      position.current.x += (target.current.x - position.current.x) * 0.2;
      position.current.y += (target.current.y - position.current.y) * 0.2;

      cursor.style.setProperty('--cursor-x', `${position.current.x}px`);
      cursor.style.setProperty('--cursor-y', `${position.current.y}px`);

      rafRef.current = requestAnimationFrame(update);
    };

    const handleMove = (event: MouseEvent) => {
      target.current.x = event.clientX;
      target.current.y = event.clientY;
    };

    window.addEventListener('mousemove', handleMove);
    rafRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />;
}
