import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useEffect } from 'react';
import inStadiumImage from '../../In Stadium.jpg';
import ingameHockeyImage from '../../Ingamehockey.jpg';


export function InStadium() {
  const containerRef = useRef<HTMLDivElement>(null);
  const soccerVideoRef = useRef<HTMLVideoElement>(null);
  const socceringameVideoRef = useRef<HTMLVideoElement>(null);
  const basketballingameVideoRef = useRef<HTMLVideoElement>(null);
  const baseballingameVideoRef = useRef<HTMLVideoElement>(null);
  const baseballingame2VideoRef = useRef<HTMLVideoElement>(null);

  // Individual refs for each gallery item
  const titleRef = useRef<HTMLDivElement>(null);
  const item0Ref = useRef<HTMLDivElement>(null);
  const item1Ref = useRef<HTMLDivElement>(null);
  const item2Ref = useRef<HTMLDivElement>(null);
  const item2bRef = useRef<HTMLDivElement>(null);
  const item3Ref = useRef<HTMLDivElement>(null);
  const item4Ref = useRef<HTMLDivElement>(null);
  const item5Ref = useRef<HTMLDivElement>(null);

  // Scroll progress for title
  const { scrollYProgress: titleScroll } = useScroll({
    target: titleRef,
    offset: ["start end", "end start"]
  });

  // Scroll progress for each gallery item - expanded range for longer visibility
  const { scrollYProgress: item0Scroll } = useScroll({
    target: item0Ref,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: item1Scroll } = useScroll({
    target: item1Ref,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: item2Scroll } = useScroll({
    target: item2Ref,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: item2bScroll } = useScroll({
    target: item2bRef,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: item3Scroll } = useScroll({
    target: item3Ref,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: item4Scroll } = useScroll({
    target: item4Ref,
    offset: ["start end", "end start"]
  });

  const { scrollYProgress: item5Scroll } = useScroll({
    target: item5Ref,
    offset: ["start end", "end start"]
  });

  // Title animations
  const titleY = useTransform(titleScroll, [0, 0.3], [100, 0]);
  const titleOpacity = useTransform(titleScroll, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  // Item 0 animations (Baseball In-Game Video 1) - Scale and fade
  const item0Scale = useTransform(item0Scroll, [0, 0.25, 0.75, 1], [0.6, 1, 1, 0.9]);
  const item0Opacity = useTransform(item0Scroll, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const item0Y = useTransform(item0Scroll, [0, 0.4], [80, 0]);

  // Item 1 animations (In Stadium Image) - Scale and fade
  const item1Scale = useTransform(item1Scroll, [0, 0.25, 0.75, 1], [0.6, 1, 1, 0.9]);
  const item1Opacity = useTransform(item1Scroll, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const item1Y = useTransform(item1Scroll, [0, 0.4], [80, 0]);

  // Item 2 animations (Soccer In-Game Video) - Scale and rotate slightly
  const item2Scale = useTransform(item2Scroll, [0, 0.25, 0.75, 1], [0.6, 1, 1, 0.9]);
  const item2Opacity = useTransform(item2Scroll, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const item2Y = useTransform(item2Scroll, [0, 0.4], [-80, 0]);
  const item2Rotate = useTransform(item2Scroll, [0, 0.4, 0.6, 1], [-5, 0, 0, 5]);

  // Item 2b animations (Baseball In-Game Video 2) - Slide from side
  const item2bScale = useTransform(item2bScroll, [0, 0.25, 0.75, 1], [0.6, 1, 1, 0.9]);
  const item2bOpacity = useTransform(item2bScroll, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const item2bX = useTransform(item2bScroll, [0, 0.4], [-200, 0]);

  // Item 3 animations (Basketball In-Game Video) - Slide from side
  const item3Scale = useTransform(item3Scroll, [0, 0.25, 0.75, 1], [0.6, 1, 1, 0.9]);
  const item3Opacity = useTransform(item3Scroll, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const item3X = useTransform(item3Scroll, [0, 0.4], [200, 0]);

  // Item 4 animations (Soccer Video) - Slide from opposite side
  const item4Scale = useTransform(item4Scroll, [0, 0.25, 0.75, 1], [0.6, 1, 1, 0.9]);
  const item4Opacity = useTransform(item4Scroll, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const item4X = useTransform(item4Scroll, [0, 0.4], [-200, 0]);

  // Item 5 animations (Hockey Image) - Zoom in dramatically
  const item5Scale = useTransform(item5Scroll, [0, 0.25, 0.75, 1], [0.5, 1.1, 1, 0.9]);
  const item5Opacity = useTransform(item5Scroll, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const item5Y = useTransform(item5Scroll, [0, 0.4], [100, 0]);

  // Ensure baseballingame video plays and loops continuously (starting at 11 seconds, but respect user interaction)
  useEffect(() => {
    const video = baseballingameVideoRef.current;
    if (video) {
      const START_TIME = 11;
      let userPaused = false;
      let isUserInteracting = false;
      let isUserSeeking = false;

      const setStartTime = () => {
        // Only enforce start time if user isn't seeking
        if (!isUserSeeking && video.duration > START_TIME && video.currentTime < START_TIME) {
          video.currentTime = START_TIME;
        }
      };

      const playVideo = () => {
        if (!isUserSeeking) {
          setStartTime();
        }
        if (video.paused && !video.ended && !userPaused) {
          video.play().catch((err) => {
            console.log('Baseball video play error, retrying:', err);
            setTimeout(() => {
              if (video.paused && !userPaused) {
                if (!isUserSeeking) {
                  setStartTime();
                }
                video.play().catch(() => {});
              }
            }, 500);
          });
        }
      };

      // Track user interaction
      const handleUserInteraction = () => {
        isUserInteracting = true;
        setTimeout(() => {
          isUserInteracting = false;
        }, 100);
      };

      const handlePause = () => {
        // Only auto-resume if user didn't manually pause
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
        // User clicked play, reset the paused flag
        userPaused = false;
      };

      const handleSeeking = () => {
        // User is scrubbing, don't auto-play
        userPaused = true;
        isUserInteracting = true;
        isUserSeeking = true;
        setTimeout(() => {
          isUserInteracting = false;
        }, 500);
      };

      const handleSeeked = () => {
        // User finished scrubbing, allow auto-play after a moment
        isUserSeeking = false;
        setTimeout(() => {
          userPaused = false;
        }, 1000);
      };

      // Keep video at start time if it goes before (but not when user is seeking)
      const handleTimeUpdate = () => {
        if (!isUserSeeking) {
          setStartTime();
        }
      };

      // Try to play immediately if video is already loaded
      if (video.readyState >= 2) {
        setStartTime();
        playVideo();
      }

      // Add event listeners
      video.addEventListener('canplay', playVideo);
      video.addEventListener('canplaythrough', playVideo);
      video.addEventListener('loadeddata', playVideo);
      video.addEventListener('loadedmetadata', () => {
        setStartTime();
        playVideo();
      });
      video.addEventListener('pause', handlePause);
      video.addEventListener('play', handlePlay);
      video.addEventListener('seeking', handleSeeking);
      video.addEventListener('seeked', handleSeeked);
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('click', handleUserInteraction);
      video.addEventListener('touchstart', handleUserInteraction);

      // Restart video when it ends (for looping)
      const handleEnded = () => {
        userPaused = false;
        setStartTime();
        playVideo();
      };

      video.addEventListener('ended', handleEnded);

      // Also try to play after a short delay to ensure video is loaded
      const timeoutId = setTimeout(() => {
        setStartTime();
        playVideo();
      }, 1000);

      // Set start time when metadata is loaded
      if (video.readyState >= 1 && video.duration > START_TIME) {
        video.currentTime = START_TIME;
      }

      return () => {
        clearTimeout(timeoutId);
        video.removeEventListener('canplay', playVideo);
        video.removeEventListener('canplaythrough', playVideo);
        video.removeEventListener('loadeddata', playVideo);
        video.removeEventListener('loadedmetadata', playVideo);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('seeking', handleSeeking);
        video.removeEventListener('seeked', handleSeeked);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('click', handleUserInteraction);
        video.removeEventListener('touchstart', handleUserInteraction);
        video.removeEventListener('ended', handleEnded);
      };
    }
  }, []);

  // Ensure baseballingame2 video plays and loops continuously (but respect user interaction)
  useEffect(() => {
    const video = baseballingame2VideoRef.current;
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

  // Ensure socceringame video plays and loops continuously (but respect user interaction)
  useEffect(() => {
    const video = socceringameVideoRef.current;
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

  // Ensure basketballingame video plays and loops continuously (but respect user interaction)
  useEffect(() => {
    const video = basketballingameVideoRef.current;
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

  // Ensure soccer video plays and loops continuously (starting at 1 second, but respect user interaction)
  useEffect(() => {
    const video = soccerVideoRef.current;
    if (video) {
      const START_TIME = 1;
      let userPaused = false;
      let isUserInteracting = false;
      let isUserSeeking = false;
      
      const setStartTime = () => {
        // Only enforce start time if user isn't seeking
        if (!isUserSeeking && video.duration > START_TIME && video.currentTime < START_TIME) {
          video.currentTime = START_TIME;
        }
      };

      const playVideo = () => {
        if (!isUserSeeking) {
          setStartTime();
        }
        if (video.paused && !video.ended && !userPaused) {
          video.play().catch(() => {
            setTimeout(() => {
              if (video.paused && !userPaused) {
                setStartTime();
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
        isUserSeeking = true;
        setTimeout(() => {
          isUserInteracting = false;
        }, 500);
      };

      const handleSeeked = () => {
        isUserSeeking = false;
        setTimeout(() => {
          userPaused = false;
        }, 1000);
      };

      // Try to play when video is ready
      if (video.readyState >= 2) {
        playVideo();
      } else {
        video.addEventListener('canplay', playVideo, { once: true });
        video.addEventListener('loadeddata', playVideo, { once: true });
      }

      // Keep video at start time if it goes before (but not when user is seeking)
      const handleTimeUpdate = () => {
        if (!isUserSeeking) {
          setStartTime();
        }
      };

      // Reset to start time when video ends (for looping)
      const handleEnded = () => {
        userPaused = false;
        setStartTime();
        playVideo();
      };

      video.addEventListener('pause', handlePause);
      video.addEventListener('play', handlePlay);
      video.addEventListener('seeking', handleSeeking);
      video.addEventListener('seeked', handleSeeked);
      video.addEventListener('timeupdate', handleTimeUpdate);
      video.addEventListener('ended', handleEnded);
      video.addEventListener('click', handleUserInteraction);
      video.addEventListener('touchstart', handleUserInteraction);

      return () => {
        video.removeEventListener('canplay', playVideo);
        video.removeEventListener('loadeddata', playVideo);
        video.removeEventListener('pause', handlePause);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('seeking', handleSeeking);
        video.removeEventListener('seeked', handleSeeked);
        video.removeEventListener('timeupdate', handleTimeUpdate);
        video.removeEventListener('ended', handleEnded);
        video.removeEventListener('click', handleUserInteraction);
        video.removeEventListener('touchstart', handleUserInteraction);
      };
    }
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Title Section */}
      <div ref={titleRef} className="h-[150vh] flex items-center justify-center px-8">
        <motion.div 
          style={{ y: titleY, opacity: titleOpacity }}
          className="text-center max-w-6xl mx-auto"
        >
          <h2 className="text-8xl leading-none tracking-tight font-light mb-8">
            In stadium
          </h2>
          <p className="text-3xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-6">
            Multi-person and object tracking technology that captures every movement in real-time at scale.
          </p>
          <div className="w-20 h-[2px] bg-gray-400 mx-auto mb-6" />
          <p className="text-2xl text-gray-500 leading-relaxed max-w-3xl mx-auto">
            Real-world complexity. Live data. Instant analysis.
          </p>
        </motion.div>
      </div>

      {/* Gallery Item 0: Baseball In-Game Video 1 */}
      <div ref={item0Ref} className="h-[150vh] flex items-center justify-center px-8 py-32">
        <motion.div 
          style={{ 
            scale: item0Scale, 
            opacity: item0Opacity,
            y: item0Y
          }}
          className="w-full max-w-[1600px]"
        >
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black relative">
            <video
              ref={baseballingameVideoRef}
              src="/New.mov"
              className="w-full h-full object-cover"
              controls
              muted
              playsInline
              preload="auto"
              loop
              autoPlay
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
              onLoadedMetadata={() => {
                const video = baseballingameVideoRef.current;
                if (video && video.paused) {
                  video.play().catch(() => {});
                }
              }}
              onCanPlay={() => {
                const video = baseballingameVideoRef.current;
                if (video && video.paused) {
                  video.play().catch(() => {});
                }
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Gallery Item 1: In Stadium Image */}
      <div ref={item1Ref} className="h-[150vh] flex items-center justify-center px-8 py-32">
        <motion.div 
          style={{ 
            scale: item1Scale, 
            opacity: item1Opacity,
            y: item1Y
          }}
          className="w-full max-w-[1600px]"
        >
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={inStadiumImage} 
              alt="In Stadium" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>

      {/* Gallery Item 2: Soccer In-Game Video */}
      <div ref={item2Ref} className="h-[150vh] flex items-center justify-center px-8 py-32">
        <motion.div 
          style={{ 
            scale: item2Scale, 
            opacity: item2Opacity,
            y: item2Y,
            rotate: item2Rotate
          }}
          className="w-full max-w-[1600px]"
        >
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black relative">
            <video
              ref={socceringameVideoRef}
              src="/socceringame.mov"
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

      {/* Gallery Item 2b: Baseball In-Game Video 2 */}
      <div ref={item2bRef} className="h-[150vh] flex items-center justify-center px-8 py-32">
        <motion.div 
          style={{ 
            scale: item2bScale, 
            opacity: item2bOpacity,
            x: item2bX
          }}
          className="w-full max-w-[1600px]"
        >
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black relative">
            <video
              ref={baseballingame2VideoRef}
              src="/baseballingame2.mov"
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

      {/* Gallery Item 3: Basketball In-Game Video */}
      <div ref={item3Ref} className="h-[150vh] flex items-center justify-center px-8 py-32">
        <motion.div 
          style={{ 
            scale: item3Scale, 
            opacity: item3Opacity,
            x: item3X
          }}
          className="w-full max-w-[1600px]"
        >
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black relative">
            <video
              ref={basketballingameVideoRef}
              src="/basketballingame.mov"
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

      {/* Gallery Item 4: Soccer Video */}
      <div ref={item4Ref} className="h-[150vh] flex items-center justify-center px-8 py-32">
        <motion.div 
          style={{ 
            scale: item4Scale, 
            opacity: item4Opacity,
            x: item4X
          }}
          className="w-full max-w-[1600px]"
        >
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black relative">
            <video
              ref={soccerVideoRef}
              src="/soccer.mov"
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

      {/* Gallery Item 5: In-Game Hockey Image - Dramatic zoom */}
      <div ref={item5Ref} className="h-[150vh] flex items-center justify-center px-8 py-32">
        <motion.div 
          style={{ 
            scale: item5Scale, 
            opacity: item5Opacity,
            y: item5Y
          }}
          className="w-full max-w-[1600px]"
        >
          <div className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={ingameHockeyImage} 
              alt="In-Game Hockey Analysis" 
              className="w-full h-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}