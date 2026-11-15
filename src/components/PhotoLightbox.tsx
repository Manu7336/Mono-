import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Camera,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  X,
} from 'lucide-react';
import { MemoryPhoto } from '../data/content';
import { RomanticIllustration } from './RomanticIllustration';
import { useImageFullscreen } from '../utils/useImageFullscreen';

interface PhotoLightboxProps {
  photos: MemoryPhoto[];
  currentIndex: number | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onUploadForPhoto: (photoId: string) => void;
}

export const PhotoLightbox: React.FC<PhotoLightboxProps> = ({
  photos,
  currentIndex,
  onClose,
  onPrev,
  onNext,
  onUploadForPhoto,
}) => {
  const activePhoto =
    currentIndex !== null ? photos[currentIndex] : undefined;
  const { containerRef, isFullscreen, exitFullscreen, toggleFullscreen } =
    useImageFullscreen(currentIndex !== null);

  useEffect(() => {
    if (currentIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          void exitFullscreen();
        } else {
          onClose();
        }
      }
      if ((e.key === 'f' || e.key === 'F') && activePhoto?.imageUrl) {
        e.preventDefault();
        toggleFullscreen();
      }
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    currentIndex,
    activePhoto?.imageUrl,
    isFullscreen,
    exitFullscreen,
    toggleFullscreen,
    onClose,
    onPrev,
    onNext,
  ]);

  if (currentIndex === null || !activePhoto) return null;

  return (
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={() => {
          if (isFullscreen) {
            void exitFullscreen();
          } else {
            onClose();
          }
        }}
        className={`fixed inset-0 z-50 flex items-center justify-center ${
          isFullscreen
            ? 'bg-black p-0'
            : 'bg-[#1A3326]/90 p-4 backdrop-blur-md'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label={activePhoto.caption}
      >
        {/* Top bar controls */}
        <div className="fixed top-4 right-4 left-4 z-50 flex items-center justify-between">
          <span className="rounded-full bg-black/35 px-3 py-1.5 font-mono text-xs text-white/90 tabular-nums backdrop-blur-xs">
            {currentIndex + 1} / {photos.length}
          </span>
          <div className="flex items-center gap-2">
            {activePhoto.imageUrl && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                }}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
                title={isFullscreen ? 'Exit fullscreen (F)' : 'View fullscreen (F)'}
                className="inline-flex h-11 items-center gap-2 rounded-full bg-white/15 px-4 text-xs font-medium text-white backdrop-blur-xs transition-colors hover:bg-white/30 whitespace-nowrap shrink-0"
              >
                {isFullscreen ? (
                  <>
                    <Minimize2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Exit Fullscreen</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="h-4 w-4" />
                    <span>Fullscreen</span>
                  </>
                )}
              </button>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                void exitFullscreen();
                onClose();
              }}
              aria-label="Close lightbox"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-xs transition-colors hover:bg-white/30"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Previous button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous memory"
          className="fixed left-2 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-xs transition-colors hover:bg-white/35 sm:left-6 sm:h-11 sm:w-11"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Next button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next memory"
          className="fixed right-2 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-xs transition-colors hover:bg-white/35 sm:right-6 sm:h-11 sm:w-11"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>

        {/* Polaroid Lightbox Frame or Edge-to-Edge Fullscreen */}
        {isFullscreen && activePhoto.imageUrl ? (
          <motion.div
            key={`fs-${activePhoto.id}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={toggleFullscreen}
            className="relative flex h-[100dvh] w-screen items-center justify-center p-2 sm:p-8"
          >
            <img
              src={activePhoto.imageUrl}
              alt={activePhoto.caption}
              referrerPolicy="no-referrer"
              className="max-h-full max-w-full cursor-zoom-out object-contain select-none"
            />
          </motion.div>
        ) : (
          <motion.div
            key={activePhoto.id}
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-h-[92dvh] w-full max-w-3xl rounded-3xl bg-[#F4FAF6] p-3 shadow-2xl sm:p-6"
          >
            <div
              onDoubleClick={() => {
                if (activePhoto.imageUrl) toggleFullscreen();
              }}
              className="relative flex h-[56dvh] max-h-[72dvh] w-full items-center justify-center overflow-hidden rounded-2xl bg-[#E0F2E9]/50 sm:h-[64dvh]"
            >
              {activePhoto.imageUrl ? (
                <img
                  src={activePhoto.imageUrl}
                  alt={activePhoto.caption}
                  referrerPolicy="no-referrer"
                  className="h-full w-full cursor-zoom-in object-contain bg-[#F4FAF6]"
                />
              ) : (
                <RomanticIllustration
                  theme={activePhoto.illustrationTheme}
                  label={activePhoto.title}
                  sublabel="Upload your real photograph for this memory"
                  onUploadClick={() => onUploadForPhoto(activePhoto.id)}
                />
              )}
            </div>

            <div className="mt-4 flex items-center justify-end gap-2 px-1">
              {activePhoto.imageUrl && (
                <button
                  type="button"
                  onClick={toggleFullscreen}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-[#72B193] bg-white px-3 py-1.5 text-xs font-medium text-[#1A3326] transition-colors hover:bg-[#E0F2E9] hover:text-[#1F7A56] whitespace-nowrap shrink-0"
                >
                  <Maximize2 className="h-3.5 w-3.5 text-[#1F7A56]" />
                  <span>Fullscreen</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => onUploadForPhoto(activePhoto.id)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#72B193] bg-white px-3 py-1.5 text-xs font-medium text-[#1A3326] transition-colors hover:bg-[#E0F2E9] whitespace-nowrap shrink-0"
              >
                <Camera className="h-3.5 w-3.5 text-[#1F7A56]" />
                <span>{activePhoto.imageUrl ? 'Replace Photo' : 'Add Photo'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};
