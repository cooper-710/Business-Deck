import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function CapitalAllocation() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-8 py-32 bg-gradient-to-b from-white via-gray-50 to-white">
      <motion.div style={{ opacity }} className="max-w-7xl w-full">
        <motion.h2 
          style={{ 
            y: useTransform(scrollYProgress, [0.2, 0.4], [50, 0]),
            opacity: useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
          }}
          className="text-9xl mb-32 text-center tracking-tighter font-light"
        >
          Capital deployment
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <motion.div
            style={{ 
              y: useTransform(scrollYProgress, [0.3, 0.5], [100, 0]),
              opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
            }}
            className="text-center relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl" />
            <div className="relative p-16 border-2 border-gray-200 rounded-3xl">
              <div className="text-[100px] leading-none mb-8 font-extralight tracking-tighter">
                $2.5M
              </div>
              <div className="text-3xl text-gray-800 mb-4">Acquisition</div>
              <div className="w-16 h-px bg-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500">Simi Motion technology and IP</p>
            </div>
          </motion.div>

          <motion.div
            style={{ 
              y: useTransform(scrollYProgress, [0.35, 0.55], [100, 0]),
              opacity: useTransform(scrollYProgress, [0.35, 0.55], [0, 1])
            }}
            className="text-center relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black rounded-3xl" />
            <div className="relative p-16 border-2 border-black rounded-3xl text-white">
              <div className="text-[100px] leading-none mb-8 font-extralight tracking-tighter">
                $2M
              </div>
              <div className="text-3xl mb-4">Per year</div>
              <div className="w-16 h-px bg-white/30 mx-auto mb-4" />
              <p className="text-xl text-white/70">Team and talent</p>
            </div>
          </motion.div>

          <motion.div
            style={{ 
              y: useTransform(scrollYProgress, [0.4, 0.6], [100, 0]),
              opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1])
            }}
            className="text-center relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-50 rounded-3xl" />
            <div className="relative p-16 border-2 border-gray-200 rounded-3xl">
              <div className="text-[100px] leading-none mb-8 font-extralight tracking-tighter">
                $1M
              </div>
              <div className="text-3xl text-gray-800 mb-4">Innovation</div>
              <div className="w-16 h-px bg-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500">Technology advancement</p>
            </div>
          </motion.div>
        </div>

        <motion.p
          style={{ 
            opacity: useTransform(scrollYProgress, [0.5, 0.7], [0, 1])
          }}
          className="text-3xl text-gray-500 text-center mt-24"
        >
          Clear allocation. Focused execution.
        </motion.p>
      </motion.div>
    </div>
  );
}
