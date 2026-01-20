import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import simiLogo from '../../Simi.jpg';

export function AcquisitionStory() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-8 py-32">
      <motion.div style={{ opacity }} className="max-w-7xl">
        <h2 className="text-9xl mb-32 text-center leading-none tracking-tighter font-light">
          The acquisition
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24 items-center">
          <motion.div
            style={{ 
              x: useTransform(scrollYProgress, [0.3, 0.5], [-100, 0]),
              opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
            }}
            className="text-center"
          >
            <div className="mb-8 p-8 bg-white rounded-2xl shadow-lg">
              <img src={simiLogo} alt="Simi Motion" className="h-28 mx-auto" />
            </div>
            <div className="mb-2">
              <img src={simiLogo} alt="Simi Motion" className="h-8 mx-auto object-contain" />
            </div>
            <p className="text-lg text-gray-500">
              The underlying system
            </p>
          </motion.div>

          <motion.div
            style={{ 
              scale: useTransform(scrollYProgress, [0.35, 0.5], [0.5, 1]),
              opacity: useTransform(scrollYProgress, [0.35, 0.5], [0, 1])
            }}
            className="flex flex-col items-center justify-center gap-4"
          >
            <div className="text-8xl text-gray-300 font-extralight">→</div>
            <div className="text-lg text-gray-500 tracking-wider">BECOMES</div>
          </motion.div>

          <motion.div
            style={{ 
              x: useTransform(scrollYProgress, [0.3, 0.5], [100, 0]),
              opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
            }}
            className="text-center"
          >
            <div className="mb-8 p-8 bg-gradient-to-br from-black to-gray-900 rounded-2xl shadow-2xl">
              <div className="text-6xl text-white font-light tracking-tight">Sequence</div>
            </div>
            <p className="text-2xl text-gray-800 mb-2">
              The platform
            </p>
            <p className="text-lg text-gray-500">
              Unified. Accessible. Scalable.
            </p>
          </motion.div>
        </div>

        <motion.div
          style={{ 
            y: useTransform(scrollYProgress, [0.5, 0.7], [50, 0]),
            opacity: useTransform(scrollYProgress, [0.5, 0.7], [0, 1])
          }}
          className="max-w-4xl mx-auto text-center"
        >
          <div className="w-24 h-1 bg-black mx-auto mb-12" />
          <p className="text-4xl text-gray-700 leading-relaxed">
            Sequence is acquiring and rebranding Simi Motion, unifying proven technology under a platform built for scale.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
