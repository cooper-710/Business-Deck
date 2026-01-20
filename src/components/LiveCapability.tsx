import { motion, useScroll, useTransform } from 'motion/react';
import { useId, useRef, useState, useEffect } from 'react';

export function LiveCapability() {
  const ref = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const playerRef = useRef<any>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const contentId = useId();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 1.1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [1, 1, 1, 0]);

  // Track if video has been triggered to play
  const hasPlayedRef = useRef(false);

  // Load YouTube IFrame API and trigger play when visible
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
    }

    const initializePlayer = () => {
      if (iframeRef.current && !playerRef.current && window.YT && window.YT.Player) {
        playerRef.current = new window.YT.Player(iframeRef.current, {
          events: {
            onReady: (event: any) => {
              // Pause immediately to prevent auto-play
              event.target.pauseVideo();
            },
            onStateChange: (event: any) => {
              // Pause if somehow started playing before intersection
              if (event.data === window.YT.PlayerState.PLAYING && !hasPlayedRef.current) {
                event.target.pauseVideo();
              }
            }
          }
        });
      }
    };

    if (window.YT && window.YT.Player) {
      initializePlayer();
    } else {
      window.onYouTubeIframeAPIReady = initializePlayer;
    }

    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {}
        playerRef.current = null;
      }
    };
  }, []);

  // Trigger video playback when section becomes visible
  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasPlayedRef.current) {
            if (playerRef.current && window.YT) {
              try {
                const playerState = playerRef.current.getPlayerState();
                if (playerState === window.YT.PlayerState.PAUSED || 
                    playerState === window.YT.PlayerState.ENDED ||
                    playerState === window.YT.PlayerState.UNSTARTED ||
                    playerState === window.YT.PlayerState.CUED) {
                  playerRef.current.playVideo();
                  hasPlayedRef.current = true;
                }
              } catch (e) {
                // Retry after delay
                setTimeout(() => {
                  try {
                    if (playerRef.current) {
                      playerRef.current.playVideo();
                      hasPlayedRef.current = true;
                    }
                  } catch (e2) {}
                }, 500);
              }
            } else if (!playerRef.current && window.YT && window.YT.Player) {
              // Player not initialized yet, wait for it
              const checkPlayer = setInterval(() => {
                if (playerRef.current) {
                  clearInterval(checkPlayer);
                  try {
                    playerRef.current.playVideo();
                    hasPlayedRef.current = true;
                  } catch (e) {}
                }
              }, 100);
              setTimeout(() => clearInterval(checkPlayer), 3000);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px' }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  declare global {
    interface Window {
      YT: any;
      onYouTubeIframeAPIReady: () => void;
    }
  }

  return (
    <div ref={ref} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
        <motion.div 
          style={{ scale, opacity }}
          className="absolute inset-0"
        >
          <div className="w-full h-full">
            <iframe
              ref={iframeRef}
              src="https://www.youtube.com/embed/m_TgpJ2xamk?enablejsapi=1&mute=1&loop=1&playlist=m_TgpJ2xamk&controls=0&modestbranding=1&rel=0&autoplay=0"
              className="w-full h-full"
              allow="autoplay; encrypted-media"
              allowFullScreen
              id="youtube-player-live"
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
              style={{ fontSize: '30px', top: '2px', left: '578px' }}
              onClick={() => setIsCollapsed((prev) => !prev)}
              aria-expanded={!isCollapsed}
              aria-controls={contentId}
            >
              -
            </button>

            <div className={`relative mx-auto ${isCollapsed ? 'max-w-xl' : 'max-w-2xl'}`}>
              <div id={contentId} className="mt-2">
                <h2
                  className={`tracking-tight font-semibold leading-none text-white text-stroke-soft ${
                    isCollapsed ? 'text-3xl mb-3' : 'text-6xl mb-5'
                  }`}
                >
                  Multi-person capture
                  {!isCollapsed && (
                    <>
                      <br />
                      <span className="text-white">at scale</span>
                    </>
                  )}
                  {isCollapsed && <span className="text-white"> at scale</span>}
                </h2>
                {!isCollapsed && (
                  <>
                    <div className="w-20 h-[2px] bg-black/70 mx-auto mb-5" />
                    <p className="text-2xl text-white font-semibold leading-relaxed text-stroke-soft">
                      Real-world complexity. Live data. Instant analysis.
                    </p>
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