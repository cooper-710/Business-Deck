import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function StrategicPosition() {
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
          className="text-9xl mb-20 text-center leading-none tracking-tighter font-light"
          style={{ 
            y: useTransform(scrollYProgress, [0.2, 0.4], [50, 0]),
            opacity: useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
          }}
        >
          Strategic positioning
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <motion.div
            style={{ 
              y: useTransform(scrollYProgress, [0.4, 0.6], [50, 0]),
              opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1])
            }}
            className="text-center lg:text-left flex flex-col justify-center"
          >
            <p className="text-6xl text-gray-800 leading-tight mb-16 font-light" style={{ fontSize: '45px' }}>
              Bringing biomechanics
              <br />
              to the masses
            </p>
            
            <div className="w-32 h-1 bg-black lg:mx-0 mx-auto mb-12"></div>
            
            <p className="text-4xl text-gray-700 leading-relaxed mb-8" style={{ fontSize: '30px' }}>
              We have gotten to the top 1% of individuals.
            </p>
            
            <p className="text-2xl text-gray-700 leading-relaxed">
              System ownership enables our entry into teams and the industry.
            </p>
          </motion.div>

          {/* Image Content */}
          <motion.div
            style={{ 
              scale: imageScale,
              opacity: imageOpacity,
              y: useTransform(scrollYProgress, [0.3, 0.5], [30, 0])
            }}
            className="flex justify-center lg:justify-end"
          >
            <img 
              src="/Silos.png" 
              alt="Individual vs Teams/Industry" 
              className="max-w-3xl w-full h-auto object-contain"
              style={{ width: '500px' }}
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
