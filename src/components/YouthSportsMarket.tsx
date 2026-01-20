import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function YouthSportsMarket() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 0.4, 0.6], [0.9, 1, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-8 py-32 bg-gradient-to-b from-white via-white to-white">
      <motion.div style={{ opacity }} className="max-w-7xl w-full">
        <motion.h2 
          className="text-9xl mb-16 text-center leading-none tracking-tighter font-light"
          style={{ 
            y: useTransform(scrollYProgress, [0.2, 0.4], [50, 0]),
            opacity: useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
          }}
        >
          Opportunity
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image Content */}
          <motion.div
            style={{ 
              scale: imageScale,
              opacity: imageOpacity,
              y: useTransform(scrollYProgress, [0.3, 0.5], [30, 0])
            }}
            className="flex justify-center lg:justify-start"
          >
            <img 
              src="/Proffesional.jpg" 
              alt="Youth to Professional progression" 
              className="max-w-3xl w-full h-auto object-contain"
            />
          </motion.div>

          {/* Text Content */}
          <motion.div
            style={{ 
              y: useTransform(scrollYProgress, [0.4, 0.6], [50, 0]),
              opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1])
            }}
            className="text-center lg:text-left flex flex-col justify-center"
          >
            <div className="mb-12 space-y-4">
              <p className="text-5xl text-gray-800 leading-tight" style={{ fontSize: '30px' }}>
                Youth Sports is a $50 billion global market
              </p>
              <p className="text-4xl text-gray-600 leading-relaxed" style={{ fontSize: '24px' }}>
                Training represents $10–15 billion, growing steadily year over year with projections to double within the next decade.
              </p>
            </div>

            <div className="w-32 h-1 bg-black lg:mx-0 mx-auto mb-12" />

            <p className="text-3xl text-gray-600 leading-relaxed" style={{ fontSize: '20px' }}>
              Starting with youth sports. Expanding to college. Then professional.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
