import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function TheSystem() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const textY = useTransform(scrollYProgress, [0.3, 0.5], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-8 py-32 bg-gradient-to-b from-white via-white to-white">
      <motion.div style={{ opacity }} className="max-w-6xl text-center">
        <motion.div style={{ y: textY, opacity }}>
          <h2 className="text-8xl mb-16 leading-tight tracking-tight font-light">
            The underlying system
            <br />
            <span className="text-gray-400">powering everything</span>
          </h2>

          <div className="w-32 h-1 bg-black mx-auto mb-16" />

          <p className="text-3xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
            Simi Motion has been building advanced motion capture technology for decades, combining real-time processing and AI-driven tracking with research-grade precision.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
