import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import hawkeyeLogo from 'figma:asset/938e2b2f2612a1f71c9627befb1f4b73c698928f.png';
import kinatraxLogo from 'figma:asset/8a79c645930fff521856172175231dc32676f21b.png';

export function FragmentedWorld() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-8 py-32 bg-gradient-to-b from-white via-white to-white">
      <motion.div style={{ opacity, scale }} className="max-w-6xl text-center">
        <motion.h2 
          className="text-8xl mb-24 text-gray-400 leading-tight tracking-tight font-light"
          style={{ opacity }}
        >
          The current landscape
          <br />
          is fragmented
        </motion.h2>
        
        <div className="flex items-center justify-center gap-32 mb-20">
          <motion.div
            style={{ 
              x: useTransform(scrollYProgress, [0.3, 0.5], [-100, 0]),
              opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 0.5])
            }}
            className="grayscale"
          >
            <img src={hawkeyeLogo} alt="Hawk-Eye" className="h-28 object-contain" />
          </motion.div>
          
          <motion.div
            style={{ 
              scale: useTransform(scrollYProgress, [0.35, 0.5], [0.5, 1]),
              opacity: useTransform(scrollYProgress, [0.35, 0.5], [0, 0.3])
            }}
            className="text-9xl text-gray-300 font-light"
          >
            +
          </motion.div>
          
          <motion.div
            style={{ 
              x: useTransform(scrollYProgress, [0.3, 0.5], [100, 0]),
              opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 0.5])
            }}
            className="grayscale"
          >
            <img src={kinatraxLogo} alt="Kinatrax" className="h-28 object-contain" />
          </motion.div>
        </div>

        <motion.div
          style={{ 
            y: useTransform(scrollYProgress, [0.4, 0.6], [50, 0]),
            opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1])
          }}
        >
          <p className="text-4xl text-gray-500 leading-relaxed max-w-3xl mx-auto">
            Multiple vendors. Disconnected data.
            <br />
            No unified view of athlete performance.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
