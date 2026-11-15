import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  Film,
  Plus,
  Video,
  X,
} from 'lucide-react';
import { VideoFrameItem } from '../data/content';
import { saveVideoBlob } from '../utils/videoStorage';

interface VideoFramesProps {
  frames: VideoFrameItem[];
  uploadedVideoUrls: Record<string, string>;
  onVideoUploaded: (frameId: string, objectUrl: string) => void;
  onAddFrame: (newFrame: VideoFrameItem, initialObjectUrl?: string) => void;
}

export const VideoFrames: React.FC<VideoFramesProps> = ({
  frames,
  uploadedVideoUrls,
  onVideoUploaded,
  onAddFrame,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadTargetId, setUploadTargetId] = useState<string | null>(null);
  const [lightboxId, setLightboxId] = useState<string | null>(null);

  const resolveVideoSrc = (frame: VideoFrameItem): string => {
    return uploadedVideoUrls[frame.id] || frame.videoUrl || '';
  };

  const triggerUpload = (frameId: string) => {
    setUploadTargetId(frameId);
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadTargetId) return;

    const objectUrl = URL.createObjectURL(file);

    if (uploadTargetId === '__NEW__') {
      const newId = `vid-${Date.now()}`;
      const nextNum = frames.length + 1;
      const padded = nextNum < 10 ? `0${nextNum}` : `${nextNum}`;
      try {
        await saveVideoBlob(newId, file);
      } catch {
        // Still allow instant in-session playback even if IndexedDB fails
      }
      onAddFrame(
        {
          id: newId,
          title: `Reel ${padded}`,
          caption: '',
          videoUrl: '',
          rotation: nextNum % 2 === 0 ? 1.2 : -1.2,
        },
        objectUrl
      );
    } else {
      try {
        await saveVideoBlob(uploadTargetId, file);
      } catch {
        // Still allow instant in-session playback
      }
      onVideoUploaded(uploadTargetId, objectUrl);
    }

    setUploadTargetId(null);
    e.target.value = '';
  };

  const populatedFrames = frames.filter((f) => Boolean(resolveVideoSrc(f)));
  const activeLightboxIndex = lightboxId
    ? populatedFrames.findIndex((f) => f.id === lightboxId)
    : -1;
  const activeLightboxFrame =
    activeLightboxIndex >= 0 ? populatedFrames[activeLightboxIndex] : null;

  useEffect(() => {
    if (!activeLightboxFrame) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxId(null);
      if (e.key === 'ArrowLeft' && populatedFrames.length > 1) {
        const prevIdx =
          (activeLightboxIndex - 1 + populatedFrames.length) %
          populatedFrames.length;
        setLightboxId(populatedFrames[prevIdx].id);
      }
      if (e.key === 'ArrowRight' && populatedFrames.length > 1) {
        const nextIdx = (activeLightboxIndex + 1) % populatedFrames.length;
        setLightboxId(populatedFrames[nextIdx].id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxFrame, activeLightboxIndex, populatedFrames]);

  return (
    <section
      id="video-frames"
      className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload short video clip"
      />

      {/* Section Header */}
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-serif-editorial text-base italic text-[#1F7A56] sm:text-lg">
          Chapter II · Moving Memories
        </p>
        <h2 className="font-serif-editorial mt-1 text-3xl font-semibold text-[#1A3326] sm:text-4xl lg:text-5xl text-balance">
          Our Little Video Frames.
        </h2>
        <p className="font-serif-editorial mt-2.5 text-lg italic text-[#1A3326]/85 sm:mt-3 sm:text-xl lg:text-2xl">
          &ldquo;Some moments are too alive for just a still picture.&rdquo;
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:mt-6">
          <button
            type="button"
            onClick={() => triggerUpload('__NEW__')}
            className="inline-flex items-center gap-2 rounded-full border border-[#72B193] bg-white px-5 py-2.5 text-xs font-medium text-[#1A3326] shadow-2xs transition-colors hover:bg-[#E0F2E9] hover:text-[#1F7A56] whitespace-nowrap shrink-0"
          >
            <Plus className="h-4 w-4 text-[#1F7A56]" />
            <span>Add Another Video Frame</span>
          </button>
        </div>
      </div>

      {/* Responsive Editorial Video Frames Grid */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 sm:gap-8 md:grid-cols-2 lg:gap-10">
        {frames.map((frame, index) => {
          const videoSrc = resolveVideoSrc(frame);

          return (
            <motion.article
              key={frame.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: (index % 2) * 0.1 }}
              style={{ rotate: `${frame.rotation}deg` }}
              whileHover={{ rotate: 0, y: -4 }}
              className="polaroid-shadow group relative flex flex-col justify-between rounded-3xl border border-[#72B193]/45 bg-white p-4 transition-shadow duration-300 hover:shadow-xl sm:p-5"
            >
              {/* Decorative top scrapbook washi tape */}
              <div
                className="pointer-events-none absolute -top-2.5 left-1/2 h-5 w-24 -translate-x-1/2 rounded-xs bg-[#E0F2E9]/90 ring-1 ring-[#72B193]/35"
                aria-hidden="true"
              />

              {/* Film-Strip Frame Header */}
              <div className="mb-2.5 flex items-center justify-between px-1">
                <div className="flex items-center gap-2 text-xs text-[#1F7A56]">
                  <Film className="h-3.5 w-3.5" />
                  <span className="font-mono tabular-nums">{frame.title}</span>
                </div>
              </div>

              {/* Video Frame Viewport */}
              <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-[#72B193]/35 bg-[#1A3326]">
                {videoSrc ? (
                  <>
                    <video
                      src={videoSrc}
                      controls
                      playsInline
                      preload="metadata"
                      className="h-full w-full bg-[#1A3326] object-contain"
                    />

                    {/* Quick Expand Action */}
                    <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-90 transition-opacity group-hover:opacity-100">
                      <button
                        type="button"
                        onClick={() => setLightboxId(frame.id)}
                        title="Expand video frame"
                        className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#1A3326] shadow-xs transition-colors hover:bg-[#E0F2E9] hover:text-[#1F7A56]"
                      >
                        <Expand className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => triggerUpload(frame.id)}
                    className="flex h-full w-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-[#F4FAF6] via-[#E0F2E9]/70 to-[#BCE3CD]/50 px-6 text-center transition-colors hover:from-[#E0F2E9] hover:to-[#BCE3CD]/80"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#72B193]/50 bg-white text-[#1F7A56] shadow-xs transition-transform duration-200 group-hover:scale-105">
                      <Video className="h-5 w-5" />
                    </div>
                    <span className="font-serif-editorial text-lg font-semibold text-[#1A3326]">
                      Tap to Add Short Video
                    </span>
                    <span className="max-w-xs text-xs text-[#1A3326]/70">
                      Choose a clip from your phone or computer (MP4, MOV, WebM)
                    </span>
                  </button>
                )}
              </div>

              {/* Optional Caption */}
              {frame.caption && (
                <div className="mt-4 px-1 pt-0.5">
                  <p className="font-handwritten text-2xl leading-snug text-[#1A3326]">
                    &ldquo;{frame.caption}&rdquo;
                  </p>
                </div>
              )}
            </motion.article>
          );
        })}
      </div>

      {/* Fullscreen Video Lightbox */}
      <AnimatePresence>
        {activeLightboxFrame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightboxId(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A3326]/85 p-4 backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={activeLightboxFrame.caption}
          >
            {/* Top Bar Controls */}
            <div className="fixed top-4 right-4 left-4 z-50 flex items-center justify-between">
              <span className="font-mono text-xs text-white/90 tabular-nums">
                {activeLightboxIndex + 1} / {populatedFrames.length}
              </span>
              <button
                type="button"
                onClick={() => setLightboxId(null)}
                aria-label="Close video viewer"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white transition-colors hover:bg-white/30"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {populatedFrames.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const prevIdx =
                    (activeLightboxIndex - 1 + populatedFrames.length) %
                    populatedFrames.length;
                  setLightboxId(populatedFrames[prevIdx].id);
                }}
                aria-label="Previous video"
                className="fixed left-2 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-xs transition-colors hover:bg-white/35 sm:left-6 sm:h-11 sm:w-11"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            )}

            {populatedFrames.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  const nextIdx =
                    (activeLightboxIndex + 1) % populatedFrames.length;
                  setLightboxId(populatedFrames[nextIdx].id);
                }}
                aria-label="Next video"
                className="fixed right-2 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-xs transition-colors hover:bg-white/35 sm:right-6 sm:h-11 sm:w-11"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            )}

            <motion.div
              key={activeLightboxFrame.id}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90dvh] w-full max-w-4xl overflow-hidden rounded-3xl bg-[#F4FAF6] p-3 shadow-2xl sm:p-5"
            >
              <div className="relative aspect-video max-h-[68dvh] w-full overflow-hidden rounded-2xl bg-[#1A3326]">
                <video
                  src={resolveVideoSrc(activeLightboxFrame)}
                  controls
                  autoPlay
                  playsInline
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="mt-3 flex items-center justify-between px-2">
                <div>
                  {activeLightboxFrame.caption && (
                    <p className="font-handwritten text-2xl text-[#1A3326] sm:text-3xl">
                      &ldquo;{activeLightboxFrame.caption}&rdquo;
                    </p>
                  )}
                  <p className="font-mono text-xs text-[#1F7A56] tabular-nums">
                    {activeLightboxFrame.title}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
