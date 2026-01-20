import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function UnifiedInterface() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-8 pb-32 pt-0" style={{ marginTop: '-100px', marginBottom: '-250px' }}>
      <motion.div 
        style={{ y: textY, opacity: textOpacity }}
        className="text-center max-w-6xl mx-auto"
      >
            <h2 className="text-8xl leading-none tracking-tight font-light">
              Everything in one
              <br />
              <span className="text-gray-400">unified interface</span>
            </h2>
            <p className="text-3xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
              Everything you need in one place. Motion capture, analytics, biomechanics, and ball tracking, all seamlessly integrated into a single, cohesive experience.
            </p>
      </motion.div>
    </div>
  );
}
