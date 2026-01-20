import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect } from 'react';

export function Precision() {
  const ref = useRef<HTMLDivElement>(null);
  const baseballVideoRef = useRef<HTMLVideoElement>(null);
  const golfVideoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const videoX = useTransform(scrollYProgress, [0, 0.5], [200, 0]);
  const textX = useTransform(scrollYProgress, [0, 0.5], [-200, 0]);
  const golfVideoY = useTransform(scrollYProgress, [0.3, 0.5], [100, 0]);
  const golfVideoOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Ensure baseball video plays and loops continuously (but respect user interaction)
  useEffect(() => {
    const video = baseballVideoRef.current;
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-24">
          <motion.div style={{ x: textX }}>
            <h2 className="text-[120px] leading-none tracking-tighter font-light mb-12">
              Biomechanical
              <br />
              <span className="text-gray-400">precision</span>
            </h2>
            <div className="w-32 h-1 bg-black mb-12" />
            <p className="text-3xl text-gray-600 leading-relaxed">
              Full skeletal tracking. Joint angles. Force vectors. Movement efficiency.
            </p>
          </motion.div>

          <motion.div style={{ x: videoX }} className="w-full">
            <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black relative">
              <video
                ref={baseballVideoRef}
                src="/Baseball.mov"
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
        </div>

        <motion.div 
          style={{ y: golfVideoY, opacity: golfVideoOpacity }}
          className="w-full flex justify-center"
        >
          <video
            ref={golfVideoRef}
            src="/Golf.mp4"
            className="h-auto"
            style={{ width: '400px', maxWidth: '100%' }}
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
        </motion.div>
      </motion.div>
    </div>
  );
}
