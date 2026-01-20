import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useRef, useState, useCallback } from 'react';
import simiLogo from '../../Simi.jpg';

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [activeCells, setActiveCells] = useState<Set<string>>(new Set());
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });


  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.8], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.8], [1, 1.2]);
  const y = useTransform(scrollYProgress, [0, 0.8], [0, -200]);
  
  // Parallax transform for grid
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const cellSize = 50;
  
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!gridRef.current) return;
    
    const rect = gridRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Calculate which grid cell the mouse is over
    // The grid moves with parallax, but we calculate based on the actual mouse position
    const cellX = Math.floor(x / cellSize);
    const cellY = Math.floor(y / cellSize);
    const cellKey = `${cellX},${cellY}`;
    
    // Only add if not already active
    if (!activeCells.has(cellKey)) {
      setActiveCells(prev => new Set(prev).add(cellKey));
      
      // Remove after 0.2 seconds
      setTimeout(() => {
        setActiveCells(prev => {
          const next = new Set(prev);
          next.delete(cellKey);
          return next;
        });
      }, 200);
    }
  }, [activeCells, cellSize]);

  return (
    <div ref={ref} className="relative h-[200vh]">
      <div ref={containerRef} className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Grid Overlay */}
        <motion.div
          ref={gridRef}
          style={{ y: gridY }}
          className="absolute inset-0"
          onMouseMove={handleMouseMove}
        >
          {/* Grid lines - very translucent */}
          <div 
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(0, 0, 0, 0.06) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0, 0, 0, 0.06) 1px, transparent 1px)
              `,
              backgroundSize: `${cellSize}px ${cellSize}px`,
            }}
          />
          
          {/* Filled cells on hover */}
          <AnimatePresence>
            {Array.from(activeCells).map((cellKey) => {
              const [cellX, cellY] = cellKey.split(',').map(Number);
              return (
                <motion.div
                  key={cellKey}
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1, delay: 0.1 }}
                  style={{
                    position: 'absolute',
                    left: `${cellX * cellSize}px`,
                    top: `${cellY * cellSize}px`,
                    width: `${cellSize}px`,
                    height: `${cellSize}px`,
                    backgroundColor: 'rgba(0, 0, 0, 0.06)',
                    pointerEvents: 'none',
                  }}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Main Content */}
        <motion.div 
          style={{ 
            opacity, 
            scale, 
            y,
          }}
          className="text-center px-8 max-w-7xl relative z-10 pointer-events-none"
        >
          {/* 3D Holographic Title */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="mb-4"
          >
            <motion.div
              ref={titleRef}
              className="relative"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <img 
                src={simiLogo} 
                alt="Simi Motion" 
                className="h-[180px] mx-auto object-contain block"
                style={{
                  filter: `
                    drop-shadow(0 0 10px rgba(0, 0, 0, 0.1))
                    drop-shadow(0 0 20px rgba(0, 0, 0, 0.1))
                    drop-shadow(0 0 30px rgba(0, 0, 0, 0.1))
                    drop-shadow(0 0 40px rgba(0, 0, 0, 0.05))
                  `,
                  marginTop: '-150px',
                  marginBottom: '-150px',
                }}
              />
            </motion.div>
          </motion.div>
          
          {/* Animated Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="space-y-8 -mt-4"
          >
            <motion.p
              className="text-5xl tracking-tight text-gray-800 max-w-5xl mx-auto leading-tight"
            >
              Real-time tracking of athletes, equipment, and ball movement, all unified in one system, one interface.
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="h-px bg-black max-w-xs mx-auto relative overflow-hidden"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-black to-transparent"
                animate={{
                  x: ['-100%', '200%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Depth of Field Blur Overlay */}
        <motion.div 
          style={{ 
            opacity: useTransform(scrollYProgress, [0, 0.3], [0, 0.3]),
            backdropFilter: 'blur(1px)',
          }}
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white pointer-events-none"
        />
      </div>
    </div>
  );
}
