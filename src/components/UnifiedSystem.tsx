import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect } from 'react';

export function UnifiedSystem() {
  const ref = useRef<HTMLDivElement>(null);
  const dashboardVideoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const videoScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.85]);
  const textY = useTransform(scrollYProgress, [0, 0.3], [100, 0]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Ensure dashboard video plays and loops continuously (but respect user interaction)
  useEffect(() => {
    const video = dashboardVideoRef.current;
    if (video) {
      let userPaused = false;
      let isUserInteracting = false;

      const playVideo = () => {
        if (video.paused && !video.ended && !userPaused) {
          video.play().catch(() => {
            setTimeout(() => {
              if (video.paused && !userPaused) {
                video.play().catch(() => {});
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
        if (!video.ended && !isUserInteracting) {
          setTimeout(() => {
            if (video.paused && !userPaused && !isUserInteracting) {
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

      if (video.readyState >= 2) {
        playVideo();
      } else {
        video.addEventListener('canplay', playVideo, { once: true });
        video.addEventListener('loadeddata', playVideo, { once: true });
      }

      video.addEventListener('pause', handlePause);
      video.addEventListener('play', handlePlay);
      video.addEventListener('seeking', handleSeeking);
      video.addEventListener('seeked', handleSeeked);
      video.addEventListener('click', handleUserInteraction);
      video.addEventListener('touchstart', handleUserInteraction);

      const handleEnded = () => {
        userPaused = false;
        video.currentTime = 0;
        playVideo();
      };

      video.addEventListener('ended', handleEnded);

      return () => {
        video.removeEventListener('canplay', playVideo);
        video.removeEventListener('loadeddata', playVideo);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('seeking', handleSeeking);
        video.removeEventListener('seeked', handleSeeked);
        video.removeEventListener('click', handleUserInteraction);
        video.removeEventListener('touchstart', handleUserInteraction);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  return (
    <div ref={ref} className="relative min-h-[150vh] pt-32" style={{ marginTop: '-200px' }}>
      <div className="sticky top-0 h-screen flex items-center justify-center px-8">
        <div className="max-w-[1800px] w-full">
          <motion.div 
            style={{ scale: videoScale, opacity: textOpacity }}
            className="relative mb-16 px-8"
          >
            <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl bg-black relative">
              <video
                ref={dashboardVideoRef}
                src="/Dashboard.mov"
                className="w-full h-full object-cover"
                controls
                muted
                playsInline
                preload="auto"
                loop
                autoPlay
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              />
            </div>
          </motion.div>

          <motion.div 
            style={{ y: textY, opacity: textOpacity }}
            className="text-center max-w-6xl mx-auto"
          >
          </motion.div>
        </div>
      </div>
    </div>
  );
}