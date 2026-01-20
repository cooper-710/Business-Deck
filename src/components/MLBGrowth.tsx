import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';

export function MLBGrowth() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const [playerCount, setPlayerCount] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (value) => {
      if (value > 0.3 && value < 0.5) {
        const targetCount = Math.floor(20 * ((value - 0.3) / 0.2));
        setPlayerCount(Math.min(targetCount, 20));
      } else if (value >= 0.5) {
        setPlayerCount(20);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-8 py-32 bg-gradient-to-b from-white via-white to-white">
      <motion.div style={{ opacity }} className="max-w-7xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Side - Current Content */}
          <div className="text-center lg:text-left flex flex-col justify-center">
            <motion.h2 
              className="mb-8 leading-none tracking-tighter font-light"
              style={{ 
                fontSize: '60px',
                y: useTransform(scrollYProgress, [0.2, 0.4], [50, 0]),
                opacity: useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
              }}
            >
              Proof of Concept
            </motion.h2>

            <motion.div
              style={{ 
                y: useTransform(scrollYProgress, [0.3, 0.5], [50, 0]),
                opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
              }}
              className="mb-8"
            >
              <div className="leading-none mb-4 font-extralight tracking-tighter" style={{ fontSize: '70px' }}>
                <span className="text-gray-400">0</span>
                <span className="mx-4 text-gray-600">→</span>
                <span className="text-gray-800">{playerCount}+</span>
              </div>
              <p className="text-gray-600" style={{ fontSize: '40px' }}>
                MLB players in the last year
              </p>
            </motion.div>

            <motion.div
              style={{ 
                y: useTransform(scrollYProgress, [0.4, 0.6], [50, 0]),
                opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1])
              }}
              className="mb-6"
            >
              <div className="w-24 h-1 bg-black mb-8 -mt-2 lg:mx-0 mx-auto" />
              <p className="text-3xl text-gray-500 mb-4">
                Including All Stars, Gold Glovers, future Hall of Famers
              </p>
            </motion.div>

            <motion.div
              style={{ 
                y: useTransform(scrollYProgress, [0.42, 0.62], [50, 0]),
                opacity: useTransform(scrollYProgress, [0.42, 0.62], [0, 1])
              }}
            >
              <p className="text-2xl text-gray-700 leading-relaxed">
                This growth proves the <span className="font-bold underline">application</span> of biomechanics works.
              </p>
            </motion.div>
          </div>

          {/* Right Side - New Achievements */}
          <div className="text-center lg:text-left flex flex-col justify-center space-y-12">
            <motion.div
              style={{ 
                y: useTransform(scrollYProgress, [0.2, 0.4], [50, 0]),
                opacity: useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
              }}
            >
              <p className="text-2xl text-gray-500 mb-3">
                Been in
              </p>
              <div className="leading-none mb-4 font-extralight tracking-tighter" style={{ fontSize: '70px' }}>
                <span className="text-gray-800">10+</span>
                <span className="text-gray-600 ml-4" style={{ fontSize: '50px' }}>MLB stadiums</span>
              </div>
            </motion.div>

            <motion.div
              style={{ 
                y: useTransform(scrollYProgress, [0.3, 0.5], [50, 0]),
                opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
              }}
            >
              <div className="w-24 h-1 bg-black mb-8 -mt-2 lg:mx-0 mx-auto" />
            </motion.div>

            <motion.div
              style={{ 
                y: useTransform(scrollYProgress, [0.35, 0.55], [50, 0]),
                opacity: useTransform(scrollYProgress, [0.35, 0.55], [0, 1])
              }}
            >
              <p className="text-2xl text-gray-500 mb-3">
                Been used at
              </p>
              <div className="leading-none mb-4 font-extralight tracking-tighter" style={{ fontSize: '70px' }}>
                <span className="text-gray-800">the Olympics</span>
              </div>
            </motion.div>

            <motion.div
              style={{ 
                y: useTransform(scrollYProgress, [0.4, 0.6], [50, 0]),
                opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1])
              }}
            >
              <div className="w-24 h-1 bg-black mb-8 -mt-2 lg:mx-0 mx-auto" />
            </motion.div>

            <motion.div
              style={{ 
                y: useTransform(scrollYProgress, [0.45, 0.65], [50, 0]),
                opacity: useTransform(scrollYProgress, [0.45, 0.65], [0, 1])
              }}
            >
              <p className="text-2xl text-gray-500 mb-3">
                Been used at
              </p>
              <div className="leading-none mb-4 font-extralight tracking-tighter" style={{ fontSize: '70px' }}>
                <span className="text-gray-800">the Masters</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
