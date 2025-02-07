'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { motion as m } from 'framer-motion';
import { Expand, Shrink } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

// Add type declaration for webkit methods
declare global {
  interface HTMLVideoElement {
    webkitEnterFullscreen?: () => void;
    webkitExitFullscreen?: () => void;
  }
}

export default function VideoPlayer({
  src,
  className,
  onLoadedData,
}: {
  src: string;
  className?: string;
  onLoadedData?: () => void;
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isEnded, setIsEnded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorTimeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setProgress(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setProgress(video.currentTime);
    };

    const handlePlayState = () => {
      setIsPlaying(!video.paused);
    };

    const handleEnded = () => {
      setIsEnded(true);
      setIsPlaying(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === 'TEXTAREA' ||
        document.activeElement?.tagName === 'INPUT'
      ) {
        return;
      }

      if (e.key === ' ') {
        e.preventDefault();
        if (isPlaying) {
          handlePause();
        } else {
          handlePlay();
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        const newTime = Math.max(0, video.currentTime - 5);
        video.currentTime = newTime;
        setProgress(newTime);
        if (isEnded && newTime < duration) {
          setIsEnded(false);
        }
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        const newTime = Math.min(duration, video.currentTime + 5);
        video.currentTime = newTime;
        setProgress(newTime);
      }
    };

    if (video.readyState >= 1) {
      handleLoadedMetadata();
    }

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlayState);
    video.addEventListener('pause', handlePlayState);
    video.addEventListener('ended', handleEnded);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlayState);
      video.removeEventListener('pause', handlePlayState);
      video.removeEventListener('ended', handleEnded);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying, duration]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(
        !!(
          document.fullscreenElement ||
          (document as any).webkitFullscreenElement ||
          (document as any).mozFullScreenElement ||
          (document as any).msFullscreenElement
        ),
      );
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('MSFullscreenChange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener(
        'webkitfullscreenchange',
        handleFullscreenChange,
      );
      document.removeEventListener(
        'mozfullscreenchange',
        handleFullscreenChange,
      );
      document.removeEventListener(
        'MSFullscreenChange',
        handleFullscreenChange,
      );
    };
  }, []);

  useEffect(() => {
    if (!isFullscreen) {
      setShowControls(true);
      if (cursorTimeoutRef.current) {
        clearTimeout(cursorTimeoutRef.current);
      }
      if (containerRef.current) {
        containerRef.current.style.cursor = 'default';
      }
      return;
    }

    const handleMouseMove = () => {
      if (cursorTimeoutRef.current) {
        clearTimeout(cursorTimeoutRef.current);
      }

      setShowControls(true);
      if (containerRef.current) {
        containerRef.current.style.cursor = 'default';
      }

      cursorTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
        if (containerRef.current) {
          containerRef.current.style.cursor = 'none';
        }
      }, 1500);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      if (containerRef.current) {
        containerRef.current.style.cursor = 'default';
      }
    };
  }, [isFullscreen]);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;

    const newTime = parseFloat(e.target.value);
    videoRef.current.currentTime = newTime;
    setProgress(newTime);

    if (isEnded && newTime < duration) {
      setIsEnded(false);
    }
  };

  const handlePlay = () => {
    if (videoRef.current) {
      if (isEnded) {
        videoRef.current.currentTime = 0;
        setIsEnded(false);
      }

      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error('Error playing video:', error);
        });
    }
  };

  function handlePause() {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  }

  const toggleFullscreen = async () => {
    if (!containerRef.current || !videoRef.current) return;

    try {
      if (!isFullscreen) {
        // Handle iOS fullscreen
        if (videoRef.current.webkitEnterFullscreen) {
          videoRef.current.webkitEnterFullscreen();
        }
        // Handle standard fullscreen for other devices
        else if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        } else if ((containerRef.current as any).webkitRequestFullscreen) {
          await (containerRef.current as any).webkitRequestFullscreen();
        } else if ((containerRef.current as any).mozRequestFullScreen) {
          await (containerRef.current as any).mozRequestFullScreen();
        } else if ((containerRef.current as any).msRequestFullscreen) {
          await (containerRef.current as any).msRequestFullscreen();
        }
      } else {
        // Handle exiting fullscreen
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        } else if ((document as any).mozCancelFullScreen) {
          await (document as any).mozCancelFullScreen();
        } else if ((document as any).msExitFullscreen) {
          await (document as any).msExitFullscreen();
        }
      }
    } catch (error) {
      console.error('Error toggling fullscreen:', error);
    }
  };

  return (
    <m.div
      ref={containerRef}
      className={cn('group relative h-full w-full cursor-pointer', className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        loop
        src={src}
        onLoadedData={onLoadedData}
        className="h-full w-full object-cover"
      />
      {(!isPlaying || isEnded) && showControls && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          onClick={handlePlay}
        >
          <Button
            size="icon"
            variant="outline"
            className="h-20 w-20 rounded-full border-2"
          >
            {isEnded ? (
              <m.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-10 w-10"
              >
                <path
                  fillRule="evenodd"
                  d="M4.755 10.059a7.5 7.5 0 0112.548-3.364l1.903 1.903h-3.183a.75.75 0 100 1.5h4.992a.75.75 0 00.75-.75V4.356a.75.75 0 00-1.5 0v3.18l-1.9-1.9A9 9 0 003.306 9.67a.75.75 0 101.45.388zm15.408 3.352a.75.75 0 00-.919.53 7.5 7.5 0 01-12.548 3.364l-1.902-1.903h3.183a.75.75 0 000-1.5H2.984a.75.75 0 00-.75.75v4.992a.75.75 0 001.5 0v-3.18l1.9 1.9a9 9 0 0015.059-4.035.75.75 0 00-.53-.918z"
                  clipRule="evenodd"
                />
              </m.svg>
            ) : (
              <m.svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-10 w-10 translate-x-0.5"
              >
                <path
                  fillRule="evenodd"
                  d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z"
                  clipRule="evenodd"
                />
              </m.svg>
            )}
          </Button>
        </div>
      )}
      {isPlaying && !isEnded && showControls && (
        <div
          onClick={handlePause}
          className="absolute inset-0 flex cursor-pointer items-center justify-center bg-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        >
          <Button
            size="icon"
            variant="outline"
            className="h-20 w-20 rounded-full border-2"
          >
            <m.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-10 w-10"
            >
              <path
                fillRule="evenodd"
                d="M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z"
                clipRule="evenodd"
              />
            </m.svg>
          </Button>
        </div>
      )}

      {showControls && (
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center gap-4 bg-gradient-to-t from-black/30 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          onClick={(e) => e.stopPropagation()}
        >
          <Input
            type="range"
            min={0}
            max={duration || 0}
            step={0.001}
            value={progress}
            onChange={handleSeek}
            className="h-1 flex-1 cursor-pointer appearance-none rounded-lg bg-white/30 px-0 accent-white hover:bg-white/30 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:transition-all [&::-moz-range-thumb]:hover:scale-125 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:hover:scale-125"
            aria-label="Video progress"
          />
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 rounded-full border-2"
            onClick={toggleFullscreen}
          >
            {isFullscreen ? (
              <Shrink className="h-4 w-4" />
            ) : (
              <Expand className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}
    </m.div>
  );
}
