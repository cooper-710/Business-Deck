import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import mastersImage from '../../Masters.jpg';
import hockeyImage from '../../Hockey.jpg';
import mmImage from '../../MM.jpg';
import cfbImage from '../../CFB.jpg';
import mlbCrowdImage from '../../MLB crowd.jpg';
import fifaCrowdImage from '../../FifaCrowd.jpg';

export function SportsBillionKicker() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-8 py-32 bg-white">
      <motion.div style={{ opacity }} className="max-w-7xl w-full relative z-10">
        {/* Title Section */}
        <motion.div
          style={{ 
            y: useTransform(scrollYProgress, [0.05, 0.15], [50, 0]),
            opacity: useTransform(scrollYProgress, [0.05, 0.15], [0, 1])
          }}
          className="mb-20 text-center"
        >
          <h2 className="mb-6 font-light tracking-tight leading-none whitespace-nowrap" style={{ fontSize: '45px' }}>
            Sports is the <span className="font-semibold">Billion $ Kicker</span>
          </h2>
          <div className="w-32 h-1 bg-black mx-auto mt-12" />
        </motion.div>

        {/* Images Collage - 3x3 Grid */}
        <div className="flex flex-col gap-4 mb-12 w-full px-4">
            {/* Row 1 - 3 Images */}
            <div className="flex flex-row justify-center items-stretch gap-4 w-full">
                <motion.div
                  style={{ 
                    y: useTransform(scrollYProgress, [0.08, 0.18], [50, 0]),
                    opacity: useTransform(scrollYProgress, [0.08, 0.18], [0, 1]),
                    flex: '1 1 0',
                    minWidth: 0
                  }}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg h-[500px]"
                >
                  <img 
                    src={fifaCrowdImage} 
                    alt="FIFA Crowd" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <motion.div
                  style={{ 
                    y: useTransform(scrollYProgress, [0.09, 0.19], [50, 0]),
                    opacity: useTransform(scrollYProgress, [0.09, 0.19], [0, 1]),
                    flex: '1 1 0',
                    minWidth: 0
                  }}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg h-[500px]"
                >
                  <img 
                    src={mlbCrowdImage} 
                    alt="MLB Crowd" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <motion.div
                  style={{ 
                    y: useTransform(scrollYProgress, [0.1, 0.2], [50, 0]),
                    opacity: useTransform(scrollYProgress, [0.1, 0.2], [0, 1]),
                    flex: '1 1 0',
                    minWidth: 0
                  }}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg h-[500px]"
                >
                  <img 
                    src={hockeyImage} 
                    alt="Hockey Game" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
            </div>

            {/* Row 2 - 3 Images */}
            <div className="flex flex-row justify-center items-stretch gap-4 w-full">
                <motion.div
                  style={{ 
                    y: useTransform(scrollYProgress, [0.11, 0.21], [50, 0]),
                    opacity: useTransform(scrollYProgress, [0.11, 0.21], [0, 1]),
                    flex: '1 1 0',
                    minWidth: 0
                  }}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg h-[500px]"
                >
                  <img 
                    src={mmImage} 
                    alt="March Madness" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <motion.div
                  style={{ 
                    y: useTransform(scrollYProgress, [0.12, 0.22], [50, 0]),
                    opacity: useTransform(scrollYProgress, [0.12, 0.22], [0, 1]),
                    flex: '1 1 0',
                    minWidth: 0
                  }}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg h-[500px]"
                >
                  <img 
                    src={cfbImage} 
                    alt="College Football" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>

                <motion.div
                  style={{ 
                    y: useTransform(scrollYProgress, [0.13, 0.23], [50, 0]),
                    opacity: useTransform(scrollYProgress, [0.13, 0.23], [0, 1]),
                    flex: '1 1 0',
                    minWidth: 0
                  }}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg h-[500px]"
                >
                  <img 
                    src={mastersImage} 
                    alt="Masters Golf Tournament" 
                    className="w-full h-full object-cover"
                  />
                </motion.div>
            </div>

        </div>

        {/* Text Section */}
        <motion.div
          style={{ 
            y: useTransform(scrollYProgress, [0.17, 0.27], [50, 0]),
            opacity: useTransform(scrollYProgress, [0.17, 0.27], [0, 1])
          }}
          className="max-w-4xl mx-auto mt-16 text-center"
        >
          <p className="text-2xl leading-relaxed text-gray-700 font-light mb-4">
            Millions watch and billions are spent. People care about sports more than almost anything, and that passion creates massive value in capturing and understanding what happens on the field.
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}