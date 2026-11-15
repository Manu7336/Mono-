import { useCallback, useEffect, useRef, useState } from 'react';

export function useImageFullscreen(isOpen: boolean) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const enterFullscreen = useCallback(async () => {
    setIsFullscreen(true);
    const el = containerRef.current;
    if (el && typeof el.requestFullscreen === 'function') {
      try {
        if (!document.fullscreenElement) {
          await el.requestFullscreen();
        }
      } catch {
        // Native fullscreen can be restricted inside embedded iframes; CSS fullscreen remains active.
      }
    }
  }, []);

  const exitFullscreen = useCallback(async () => {
    setIsFullscreen(false);
    if (document.fullscreenElement && typeof document.exitFullscreen === 'function') {
      try {
        await document.exitFullscreen();
      } catch {
        // Ignore native exit errors
      }
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (isFullscreen) {
      void exitFullscreen();
    } else {
      void enterFullscreen();
    }
  }, [isFullscreen, enterFullscreen, exitFullscreen]);

  // Sync if user exits native browser fullscreen via browser UI or Escape
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFullscreen(false);
      } else {
        setIsFullscreen(true);
      }
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
    };
  }, []);

  // Clean up fullscreen when lightbox closes
  useEffect(() => {
    if (!isOpen) {
      void exitFullscreen();
    }
  }, [isOpen, exitFullscreen]);

  return {
    containerRef,
    isFullscreen,
    enterFullscreen,
    exitFullscreen,
    toggleFullscreen,
  };
}
