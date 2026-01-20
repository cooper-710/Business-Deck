import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function FutureState() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.9, 1], [0, 1, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-8 py-32">
      <motion.div style={{ opacity, scale }} className="max-w-6xl text-center">
        <motion.h2
          style={{ 
            y: useTransform(scrollYProgress, [0.2, 0.4], [100, 0])
          }}
          className="text-[140px] mb-16 leading-none tracking-tighter font-light"
        >
          Sports are
          <br />
          going digital
        </motion.h2>

        <motion.div
          style={{ 
            y: useTransform(scrollYProgress, [0.3, 0.5], [50, 0]),
            opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
          }}
        >
          <div className="w-32 h-1 bg-black mx-auto mb-16" />
          
          <p className="text-4xl text-gray-600 leading-relaxed mb-20 max-w-5xl mx-auto">
            We are at the top of individual training. System ownership creates unmatched opportunity. We're bringing this application to the masses.
          </p>
        </motion.div>

        <motion.div
          style={{ 
            y: useTransform(scrollYProgress, [0.5, 0.7], [50, 0]),
            opacity: useTransform(scrollYProgress, [0.5, 0.7], [0, 1])
          }}
          className="space-y-12"
        >
          <div className="pt-16">
            <motion.div 
              className="w-48 h-[3px] bg-black mx-auto"
              style={{ 
                scaleX: useTransform(scrollYProgress, [0.65, 0.85], [0, 1])
              }}
            />
          </div>
        </motion.div>

        <motion.div
          style={{ 
            opacity: useTransform(scrollYProgress, [0.7, 0.9], [0, 0.4])
          }}
          className="mt-32 text-sm text-gray-400 tracking-widest"
        >
          JANUARY 2026
        </motion.div>
      </motion.div>
    </div>
  );
}
