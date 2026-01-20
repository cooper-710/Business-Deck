import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect } from 'react';

export function CashFlowEntry() {
  const ref = useRef<HTMLDivElement>(null);
  const jupiterVideoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  // Ensure Jupiter video plays and loops continuously (but respect user interaction)
  useEffect(() => {
    const jupiterVideo = jupiterVideoRef.current;
    if (jupiterVideo) {
      let userPaused = false;
      let isUserInteracting = false;

      const playVideo = () => {
        if (jupiterVideo.paused && !jupiterVideo.ended && !userPaused) {
          jupiterVideo.play().catch(() => {
            setTimeout(() => {
              if (jupiterVideo.paused && !userPaused) {
                jupiterVideo.play().catch(() => {});
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
        if (!jupiterVideo.ended && !isUserInteracting) {
          setTimeout(() => {
            if (jupiterVideo.paused && !userPaused && !isUserInteracting) {
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

      if (jupiterVideo.readyState >= 2) {
        playVideo();
      } else {
        jupiterVideo.addEventListener('canplay', playVideo, { once: true });
        jupiterVideo.addEventListener('loadeddata', playVideo, { once: true });
      }

      jupiterVideo.addEventListener('pause', handlePause);
      jupiterVideo.addEventListener('play', handlePlay);
      jupiterVideo.addEventListener('seeking', handleSeeking);
      jupiterVideo.addEventListener('seeked', handleSeeked);
      jupiterVideo.addEventListener('click', handleUserInteraction);
      jupiterVideo.addEventListener('touchstart', handleUserInteraction);

      const handleEnded = () => {
        userPaused = false;
        jupiterVideo.currentTime = 0;
        playVideo();
      };

      jupiterVideo.addEventListener('ended', handleEnded);

      return () => {
        jupiterVideo.removeEventListener('canplay', playVideo);
        jupiterVideo.removeEventListener('loadeddata', playVideo);
        jupiterVideo.removeEventListener('pause', handlePause);
        jupiterVideo.removeEventListener('play', handlePlay);
        jupiterVideo.removeEventListener('seeking', handleSeeking);
        jupiterVideo.removeEventListener('seeked', handleSeeked);
        jupiterVideo.removeEventListener('click', handleUserInteraction);
        jupiterVideo.removeEventListener('touchstart', handleUserInteraction);
        jupiterVideo.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  return (
    <div ref={ref} className="min-h-screen flex items-center justify-center px-8 py-32 bg-gradient-to-b from-white via-white to-white">
      <div className="max-w-7xl w-full">
        <motion.h2 
          className="text-8xl mb-24 text-gray-800 leading-tight tracking-tight font-light text-center"
          style={{ opacity, scale }}
        >
          Infiltration
        </motion.h2>
        
        {/* Jupiter Video with Travel Ball Circuit Text */}
        <motion.div
          style={{ 
            y: useTransform(scrollYProgress, [0.2, 0.4], [50, 0]),
            opacity: useTransform(scrollYProgress, [0.2, 0.4], [0, 1]),
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: '64px',
            marginBottom: '80px'
          }}
          className="w-full"
        >
          <div 
            className="relative bg-black rounded-lg overflow-hidden shadow-xl"
            style={{ 
              width: '300px', 
              height: '534px', 
              flexShrink: 0,
              boxSizing: 'border-box'
            }}
          >
            <video
              ref={jupiterVideoRef}
              src="/Jupiter.mp4"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block'
              }}
              loop
              muted
              playsInline
              controls
              autoPlay
              onError={(e) => {
                console.error('Jupiter video loading error:', e);
              }}
              preload="auto"
            />
          </div>

          {/* Travel Ball Circuit Text */}
          <div style={{ flex: '1', textAlign: 'center', minWidth: 0 }}>
            <h3 className="text-6xl md:text-7xl mb-8 text-gray-800 leading-tight tracking-tight font-light text-center">
              The Travel Sports Circuit
            </h3>
            <p className="text-3xl md:text-4xl text-gray-600 leading-relaxed text-center">
              The travel sports circuit is massive across baseball, football, basketball, hockey, and golf. Millions of young athletes compete in tournaments, showcases, and events year-round.
            </p>
          </div>
        </motion.div>
        
        <div className="flex items-center justify-center gap-32 mb-20 text-center">
          <motion.div
            style={{ 
              x: useTransform(scrollYProgress, [0.3, 0.5], [-100, 0]),
              opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
            }}
            className="flex flex-col items-center"
          >
            <img src="/PBR.jpg" alt="Prep Baseball Report" className="w-48 h-32 object-contain mb-4" />
          </motion.div>
          
          <motion.div
            style={{ 
              scale: useTransform(scrollYProgress, [0.35, 0.5], [0.5, 1]),
              opacity: useTransform(scrollYProgress, [0.35, 0.5], [0, 1])
            }}
            className="text-9xl text-gray-300 font-light"
          >
            +
          </motion.div>
          
          <motion.div
            style={{ 
              x: useTransform(scrollYProgress, [0.3, 0.5], [100, 0]),
              opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1])
            }}
            className="flex flex-col items-center"
          >
            <img src="/PG.jpg" alt="Perfect Game" className="w-48 h-32 object-contain mb-4" />
          </motion.div>
        </div>

        <motion.div
          style={{ 
            y: useTransform(scrollYProgress, [0.4, 0.6], [50, 0]),
            opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1])
          }}
          className="text-center"
        >
          <p className="text-4xl text-gray-600 leading-relaxed max-w-3xl mx-auto mb-8">
            Install Simi motion capture cameras at showcases and tournaments.
          </p>
          <p className="text-3xl text-gray-500 leading-relaxed max-w-3xl mx-auto">
            Automated reports for every player.
            <br />
            Revenue per participant model.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
