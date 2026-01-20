import { motion, useScroll, useTransform } from 'motion/react';
import { useId, useRef, useState, useEffect } from 'react';

export function CrossSport() {
  const ref = useRef<HTMLDivElement>(null);
  const hockeyVideoRef = useRef<HTMLVideoElement>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const contentId = useId();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 1, 0]);

  // Ensure hockey video plays and loops continuously (but respect user interaction)
  useEffect(() => {
    const video = hockeyVideoRef.current;
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
    <div ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div 
          style={{ scale, opacity }}
          className="absolute inset-0"
        >
          <div className="w-full h-full bg-black relative">
            <video
              ref={hockeyVideoRef}
              src="/Hockey.mov"
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

        {isCollapsed && (
          <button
            type="button"
            className="absolute z-20 h-10 w-10 box-content rounded-full border border-white/60 text-white text-2xl leading-none flex items-center justify-center bg-white/10 backdrop-blur-md hover:bg-white/20 transition"
            style={{ right: '20px', top: '20px', boxSizing: 'content-box' }}
            onClick={() => setIsCollapsed(false)}
            aria-label="Expand content"
          >
            +
          </button>
        )}

        <motion.div 
          style={{ 
            scale: useTransform(scrollYProgress, [0, 0.3], [0.9, 1])
          }}
          className="relative z-10 text-center px-8"
        >
          {!isCollapsed && (
            <div
            className={`relative bg-white/85 backdrop-blur-xl rounded-3xl inline-block shadow-[0_18px_60px_rgba(0,0,0,0.35)] border border-white/40 ${
              isCollapsed ? 'px-10 py-6' : 'px-14 py-10'
            }`}
            >
            <div className="absolute inset-0 bg-gradient-to-br from-white/70 via-white/40 to-white/10 rounded-3xl" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/25 rounded-3xl" />
            
            <button
              type="button"
              className="absolute text-[30px] text-white hover:text-white transition leading-none z-10"
              style={{ fontSize: '30px', top: '2px', left: '650px' }}
              onClick={() => setIsCollapsed((prev) => !prev)}
              aria-expanded={!isCollapsed}
              aria-controls={contentId}
            >
              -
            </button>

            <div className={`relative mx-auto ${isCollapsed ? 'max-w-xl' : 'max-w-2xl'}`}>
              <div id={contentId} className="mt-2">
                <h2
                  className={`tracking-tight font-semibold text-white leading-tight text-stroke-soft ${
                    isCollapsed ? 'text-3xl mb-3' : 'text-6xl mb-4'
                  }`}
                >
                  Cross-sport applicability
                </h2>
                {!isCollapsed && (
                  <>
                    <p className="text-2xl text-white font-semibold leading-relaxed text-stroke-soft">
                      Baseball. Basketball. Football. Hockey. Golf. Soccer.
                    </p>
                    <div className="w-16 h-[1.5px] bg-black/70 mx-auto mb-4" />
                  </>
                )}
              </div>
            </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}