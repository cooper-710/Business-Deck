import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect } from 'react';

export function PortableSystem() {
  const ref = useRef<HTMLDivElement>(null);
  const golfVideoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Ensure golf video plays and loops continuously (but respect user interaction)
  useEffect(() => {
    const golfVideo = golfVideoRef.current;
    if (golfVideo) {
      let userPaused = false;
      let isUserInteracting = false;

      const playVideo = () => {
        if (golfVideo.paused && !golfVideo.ended && !userPaused) {
          golfVideo.play().catch(() => {
            setTimeout(() => {
              if (golfVideo.paused && !userPaused) {
                golfVideo.play().catch(() => {});
              }
            }, 100);
          });
        }
      };

      const handleUserInteraction = () => {
        isUserInteracting = true;
        setTimeout(() => {
          isUserInteracting = false;
        }, 100);
      };

      const handlePause = () => {
        if (!golfVideo.ended && !isUserInteracting) {
          setTimeout(() => {
            if (golfVideo.paused && !userPaused && !isUserInteracting) {
              playVideo();
            }
          }, 100);
        } else {
          userPaused = true;
        }
      };

      const handlePlay = () => {
        userPaused = false;
      };

      const handleSeeking = () => {
        userPaused = true;
        isUserInteracting = true;
        setTimeout(() => {
          isUserInteracting = false;
        }, 500);
      };

      const handleSeeked = () => {
        setTimeout(() => {
          userPaused = false;
        }, 1000);
      };

      if (golfVideo.readyState >= 2) {
        playVideo();
      } else {
        golfVideo.addEventListener('canplay', playVideo, { once: true });
        golfVideo.addEventListener('loadeddata', playVideo, { once: true });
      }

      golfVideo.addEventListener('pause', handlePause);
      golfVideo.addEventListener('play', handlePlay);
      golfVideo.addEventListener('seeking', handleSeeking);
      golfVideo.addEventListener('seeked', handleSeeked);
      golfVideo.addEventListener('click', handleUserInteraction);
      golfVideo.addEventListener('touchstart', handleUserInteraction);

      const handleEnded = () => {
        userPaused = false;
        golfVideo.currentTime = 0;
        playVideo();
      };

      golfVideo.addEventListener('ended', handleEnded);

      return () => {
        golfVideo.removeEventListener('canplay', playVideo);
        golfVideo.removeEventListener('loadeddata', playVideo);
        golfVideo.removeEventListener('pause', handlePause);
        golfVideo.removeEventListener('play', handlePlay);
        golfVideo.removeEventListener('seeking', handleSeeking);
        golfVideo.removeEventListener('seeked', handleSeeked);
        golfVideo.removeEventListener('click', handleUserInteraction);
        golfVideo.removeEventListener('touchstart', handleUserInteraction);
        golfVideo.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-8 py-32">
      <motion.div style={{ opacity }} className="max-w-[1800px] w-full">
        {/* Title Section */}
        <motion.div 
          style={{ 
            y: useTransform(scrollYProgress, [0, 0.3], [100, 0]),
            opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
          }}
          className="text-center max-w-6xl mx-auto mb-16"
        >
          <h2 className="text-8xl leading-none tracking-tight font-light mb-8">
            Portable System
          </h2>
          <p className="text-3xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-6">
            Take the system anywhere. Portable motion capture and biomechanics analysis for training facilities, practice fields, and remote locations.
          </p>
          <div className="w-20 h-[2px] bg-gray-400 mx-auto mb-6" />
          <p className="text-2xl text-gray-500 leading-relaxed max-w-3xl mx-auto">
            Professional-grade analysis. Wherever you need it.
          </p>
        </motion.div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 gap-12 items-center max-w-5xl mx-auto">
          {/* Golf Video */}
          <motion.div
            style={{ 
              x: useTransform(scrollYProgress, [0.3, 0.5], [100, 0]),
              opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
            }}
            className="w-full flex justify-center"
          >
            <div className="relative w-full bg-black rounded-lg overflow-hidden shadow-xl flex items-center justify-center" style={{ height: '600px', maxHeight: '600px', minHeight: '600px' }}>
              <video
                ref={golfVideoRef}
                src="/Golf.mp4"
                className="w-full h-full object-contain"
                style={{ width: '100%', height: '600px', maxHeight: '600px', minHeight: '600px', objectFit: 'contain', flexShrink: 0 }}
                loop
                muted
                playsInline
                controls
                autoPlay
                onError={(e) => {
                  console.error('Golf video loading error:', e);
                }}
                preload="auto"
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
