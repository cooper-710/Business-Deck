import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';

export function SportLogos() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-8 py-32 bg-gradient-to-b from-white via-white to-white">
      <motion.div style={{ opacity }} className="max-w-7xl w-full">
        {/* Sport Logos Section */}
        <motion.div
          style={{ 
            y: useTransform(scrollYProgress, [0.2, 0.4], [50, 0]),
            opacity: useTransform(scrollYProgress, [0.2, 0.4], [0, 1])
          }}
          className="mb-16"
        >
          <div className="flex justify-center items-center gap-12 mb-12 flex-wrap">
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <img 
                src="/MLB.jpg" 
                alt="MLB Logo" 
                style={{ height: '128px', width: 'auto', objectFit: 'contain' }}
              />
            </motion.div>
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <img 
                src="/NBA.jpg" 
                alt="NBA Logo" 
                style={{ height: '160px', width: 'auto', objectFit: 'contain' }}
              />
            </motion.div>
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <img 
                src="/NFL.jpg" 
                alt="NFL Logo" 
                style={{ height: '128px', width: 'auto', objectFit: 'contain' }}
              />
            </motion.div>
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <img 
                src="/NHL.jpg" 
                alt="NHL Logo" 
                style={{ height: '128px', width: 'auto', objectFit: 'contain' }}
              />
            </motion.div>
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <img 
                src="/PGA.jpg" 
                alt="PGA Logo" 
                style={{ height: '128px', width: 'auto', objectFit: 'contain' }}
              />
            </motion.div>
            <motion.div
              className="flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <img 
                src="/Fifa2.png" 
                alt="FIFA Logo" 
                style={{ height: '128px', width: 'auto', objectFit: 'contain' }}
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Access Point Information */}
        <motion.div
          style={{ 
            y: useTransform(scrollYProgress, [0.3, 0.5], [50, 0]),
            opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
          }}
          className="mb-12 text-center max-w-5xl mx-auto"
        >
          <h3 className="text-5xl mb-8 font-light tracking-tight">
            Access Points
          </h3>
          <div className="space-y-6 text-left max-w-4xl mx-auto">
            <p className="text-3xl text-gray-700 leading-relaxed">
              <span className="font-semibold">Baseball:</span> Youth market access point (sell data to pros)
            </p>
            <p className="text-3xl text-gray-700 leading-relaxed">
              <span className="font-semibold">Other Leagues:</span> Direct to pro market (less established mocap infrastructure)
            </p>
          </div>
        </motion.div>

        <div className="w-32 h-1 bg-black mx-auto mb-16" />
      </motion.div>
    </div>
  );
}
