import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Camera,
  Check,
  ChevronLeft,
  ChevronRight,
  Expand,
  Heart,
  Maximize2,
  Minimize2,
  PenLine,
  Plus,
  X,
} from 'lucide-react';
import { TimelineMilestone } from '../data/content';
import { useImageFullscreen } from '../utils/useImageFullscreen';

interface LoveStoryTimelineProps {
  timeline: TimelineMilestone[];
  onUpdateMilestone: (
    id: string,
    updates: Partial<TimelineMilestone>
  ) => void;
}

export const LoveStoryTimeline: React.FC<LoveStoryTimelineProps> = ({
  timeline,
  onUpdateMilestone,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [titleDraft, setTitleDraft] = useState('');
  const [dateDraft, setDateDraft] = useState('');
  const [memoryDraft, setMemoryDraft] = useState('');
  const [photoTargetId, setPhotoTargetId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Lightbox state for viewing milestone photos in full size
  const [lightbox, setLightbox] = useState<{
    milestoneId: string;
    photoIndex: number;
  } | null>(null);

  const { containerRef, isFullscreen, exitFullscreen, toggleFullscreen } =
    useImageFullscreen(Boolean(lightbox));

  const startEditing = (milestone: TimelineMilestone) => {
    setEditingId(milestone.id);
    setTitleDraft(milestone.milestoneTitle);
    setDateDraft(milestone.date === '[ADD DATE]' ? '' : milestone.date);
    setMemoryDraft(milestone.memory === '[ADD MEMORY]' ? '' : milestone.memory);
  };

  const saveEditing = (id: string, defaultTitle: string) => {
    onUpdateMilestone(id, {
      milestoneTitle: titleDraft.trim() || defaultTitle,
      date: dateDraft.trim(),
      memory: memoryDraft.trim(),
    });
    setEditingId(null);
  };

  const triggerPhotoUpload = (id: string) => {
    setPhotoTargetId(id);
    fileInputRef.current?.click();
  };

  const getMilestoneImages = (item: TimelineMilestone): string[] => {
    if (item.imageUrls && item.imageUrls.length > 0) {
      return item.imageUrls.filter(Boolean);
    }
    if (item.imageUrl) {
      return [item.imageUrl];
    }
    return [];
  };

  const handleFilesChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0 || !photoTargetId) return;

    const fileList = Array.from(files);
    const readPromises = fileList.map(
      (file) =>
        new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (typeof reader.result === 'string') resolve(reader.result);
            else resolve('');
          };
          reader.onerror = () => resolve('');
          reader.readAsDataURL(file);
        })
    );

    const dataUrls = (await Promise.all(readPromises)).filter(Boolean);
    if (dataUrls.length > 0) {
      const targetMilestone = timeline.find((m) => m.id === photoTargetId);
      const existing = targetMilestone ? getMilestoneImages(targetMilestone) : [];
      const updated = [...existing, ...dataUrls];

      onUpdateMilestone(photoTargetId, {
        imageUrls: updated,
        imageUrl: updated[0] || '',
      });
    }

    setPhotoTargetId(null);
    e.target.value = '';
  };

  // Keyboard navigation for timeline lightbox
  useEffect(() => {
    if (!lightbox) return;
    const activeMilestone = timeline.find((m) => m.id === lightbox.milestoneId);
    if (!activeMilestone) return;
    const images = getMilestoneImages(activeMilestone);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          void exitFullscreen();
        } else {
          setLightbox(null);
        }
      }
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
      if (e.key === 'ArrowLeft' && images.length > 1) {
        setLightbox((prev) =>
          prev
            ? {
                ...prev,
                photoIndex: (prev.photoIndex - 1 + images.length) % images.length,
              }
            : null
        );
      }
      if (e.key === 'ArrowRight' && images.length > 1) {
        setLightbox((prev) =>
          prev
            ? {
                ...prev,
                photoIndex: (prev.photoIndex + 1) % images.length,
              }
            : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightbox, timeline, isFullscreen, exitFullscreen, toggleFullscreen]);

  const activeLightboxMilestone = lightbox
    ? timeline.find((m) => m.id === lightbox.milestoneId)
    : null;
  const activeLightboxImages = activeLightboxMilestone
    ? getMilestoneImages(activeLightboxMilestone)
    : [];

  return (
    <section
      id="our-story"
      className="soft-section-gradient relative py-14 sm:py-20 lg:py-28"
    >
      {/* Hidden Multi-file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleFilesChange}
        className="hidden"
        aria-label="Upload milestone photos"
      />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-serif-editorial text-base italic text-[#1F7A56] sm:text-lg">
            Chapter III · Timeline
          </p>
          <h2 className="font-serif-editorial mt-1 text-3xl font-semibold text-[#1A3326] sm:text-4xl lg:text-5xl text-balance">
            Our Story, Our Little World.
          </h2>
        </div>

        {/* Vertical Romantic Timeline */}
        <div className="relative mt-10 sm:mt-16">
          {/* Center vertical hairline on desktop, left line on mobile */}
          <div
            className="pointer-events-none absolute top-0 bottom-0 left-4 w-px bg-[#72B193]/60 sm:left-5 md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          <div className="space-y-8 sm:space-y-12">
            {timeline.map((item, idx) => {
              const isEven = idx % 2 === 0;
              const isEditing = editingId === item.id;
              const images = getMilestoneImages(item);

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className={`relative flex flex-col pl-10 sm:pl-14 md:pl-0 ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  } md:items-center`}
                >
                  {/* Timeline Heart Node */}
                  <div className="absolute top-5 left-4 z-10 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#F4FAF6] bg-[#1F7A56] text-white shadow-sm sm:top-6 sm:left-5 sm:h-9 sm:w-9 md:left-1/2">
                    <Heart className="h-3.5 w-3.5 fill-white sm:h-4 sm:w-4" />
                  </div>

                  {/* Card Column */}
                  <div
                    className={`w-full md:w-1/2 ${
                      isEven ? 'md:pr-10 lg:pr-12' : 'md:pl-10 lg:pl-12'
                    }`}
                  >
                    <div className="paper-texture rounded-2xl border border-[#72B193]/50 p-4 shadow-md transition-shadow duration-300 hover:shadow-lg sm:rounded-3xl sm:p-6 lg:p-7">
                      <div className="flex items-center justify-between gap-2 text-xs text-[#1F7A56]">
                        <span className="font-mono tabular-nums">
                          {String(idx + 1).padStart(2, '0')}
                          {item.promptHint ? ` · ${item.promptHint}` : ''}
                        </span>
                        {!isEditing && (
                          <button
                            type="button"
                            onClick={() => startEditing(item)}
                            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium text-[#1A3326]/75 transition-colors hover:bg-[#E0F2E9] hover:text-[#1F7A56] whitespace-nowrap shrink-0"
                          >
                            <PenLine className="h-3 w-3" />
                            <span>Edit</span>
                          </button>
                        )}
                      </div>

                      <h3 className="font-serif-editorial mt-2 text-2xl font-semibold text-[#1A3326] sm:text-3xl">
                        {item.milestoneTitle}
                      </h3>

                      {isEditing ? (
                        <div className="mt-4 space-y-3">
                          <div>
                            <label className="block text-xs font-medium text-[#1A3326]/80">
                              Chapter Title
                            </label>
                            <input
                              type="text"
                              value={titleDraft}
                              onChange={(e) => setTitleDraft(e.target.value)}
                              placeholder="e.g. Our first picture together."
                              className="mt-1 w-full rounded-xl border border-[#72B193] bg-white px-3 py-2 text-sm text-[#1A3326] focus:border-[#1F7A56] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-[#1A3326]/80">
                              Date
                            </label>
                            <input
                              type="text"
                              value={dateDraft}
                              onChange={(e) => setDateDraft(e.target.value)}
                              placeholder="Add a date (optional)"
                              className="mt-1 w-full rounded-xl border border-[#72B193] bg-white px-3 py-2 text-sm text-[#1A3326] focus:border-[#1F7A56] focus:outline-none"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-[#1A3326]/80">
                              Memory
                            </label>
                            <textarea
                              rows={3}
                              value={memoryDraft}
                              onChange={(e) => setMemoryDraft(e.target.value)}
                              placeholder="Write a memory (optional)"
                              className="mt-1 w-full rounded-xl border border-[#72B193] bg-white px-3 py-2 text-sm text-[#1A3326] focus:border-[#1F7A56] focus:outline-none"
                            />
                          </div>
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingId(null)}
                              className="rounded-lg border border-[#72B193] px-3 py-1.5 text-xs font-medium text-[#1A3326] whitespace-nowrap shrink-0 hover:bg-[#E0F2E9]"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={() => saveEditing(item.id, item.milestoneTitle)}
                              className="inline-flex items-center gap-1 rounded-lg bg-[#1F7A56] px-3.5 py-1.5 text-xs font-medium text-white whitespace-nowrap shrink-0 hover:bg-[#186245] transition-colors"
                            >
                              <Check className="h-3.5 w-3.5" />
                              <span>Save Milestone</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <>
                          {item.date && item.date !== '[ADD DATE]' && (
                            <div
                              onClick={() => startEditing(item)}
                              className="mt-3 inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-[#1F7A56] hover:underline"
                            >
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{item.date}</span>
                            </div>
                          )}

                          {item.memory && item.memory !== '[ADD MEMORY]' && (
                            <p
                              onClick={() => startEditing(item)}
                              className="mt-3 cursor-pointer text-sm leading-relaxed text-[#1A3326]/85 sm:text-base"
                            >
                              {item.memory}
                            </p>
                          )}
                        </>
                      )}

                      {/* Photo Section: Supports Multiple Photos */}
                      <div className="mt-5">
                        {images.length === 0 ? (
                          <button
                            type="button"
                            onClick={() => triggerPhotoUpload(item.id)}
                            className="flex w-full flex-col items-center justify-center gap-1.5 rounded-2xl border border-dashed border-[#72B193] bg-[#E0F2E9]/40 py-6 px-4 text-xs font-medium text-[#1A3326]/80 transition-colors hover:bg-[#E0F2E9]/75 hover:text-[#1F7A56]"
                          >
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/80 text-[#1F7A56] shadow-xs">
                              <Camera className="h-4 w-4" />
                            </div>
                            <span className="font-serif-editorial text-sm font-semibold tracking-wide text-[#1F7A56]">
                              [ADD PHOTOS]
                            </span>
                            <span className="text-[11px] text-[#1A3326]/65">
                              Tap to upload one or multiple photos for this memory
                            </span>
                          </button>
                        ) : images.length === 1 ? (
                          // Single Photo View
                          <div className="space-y-2">
                            <div className="group relative overflow-hidden rounded-2xl border border-[#72B193]/45 bg-white shadow-xs">
                              <img
                                src={images[0]}
                                alt={`${item.milestoneTitle} photo`}
                                referrerPolicy="no-referrer"
                                className="aspect-16/10 w-full cursor-pointer object-cover transition-transform duration-300 group-hover:scale-102"
                                onClick={() =>
                                  setLightbox({ milestoneId: item.id, photoIndex: 0 })
                                }
                              />

                              {/* Hover controls */}
                              <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 opacity-90 transition-opacity group-hover:opacity-100">
                                <button
                                  type="button"
                                  onClick={() =>
                                    setLightbox({ milestoneId: item.id, photoIndex: 0 })
                                  }
                                  title="Enlarge photo"
                                  className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#1A3326] shadow-xs transition-colors hover:bg-[#E0F2E9] hover:text-[#1F7A56]"
                                >
                                  <Expand className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-[#1A3326]/70">
                              <span>1 photo</span>
                              <button
                                type="button"
                                onClick={() => triggerPhotoUpload(item.id)}
                                className="inline-flex items-center gap-1 font-medium text-[#1F7A56] hover:underline"
                              >
                                <Plus className="h-3 w-3" />
                                <span>Add More Photos</span>
                              </button>
                            </div>
                          </div>
                        ) : images.length === 2 ? (
                          // 2 Photos View
                          <div className="space-y-2">
                            <div className="grid grid-cols-2 gap-2.5">
                              {images.map((imgUrl, pIdx) => (
                                <div
                                  key={pIdx}
                                  className="group relative aspect-4/3 overflow-hidden rounded-xl border border-[#72B193]/45 bg-white shadow-xs"
                                >
                                  <img
                                    src={imgUrl}
                                    alt={`${item.milestoneTitle} photo ${pIdx + 1}`}
                                    referrerPolicy="no-referrer"
                                    className="h-full w-full cursor-pointer object-cover transition-transform duration-300 group-hover:scale-105"
                                    onClick={() =>
                                      setLightbox({
                                        milestoneId: item.id,
                                        photoIndex: pIdx,
                                      })
                                    }
                                  />
                                  <div className="absolute top-1.5 right-1.5 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setLightbox({
                                          milestoneId: item.id,
                                          photoIndex: pIdx,
                                        })
                                      }
                                      className="flex h-6 w-6 items-center justify-center rounded-full bg-white/90 text-[#1A3326] shadow-xs hover:bg-[#E0F2E9]"
                                    >
                                      <Expand className="h-3 w-3" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="flex items-center justify-between text-xs text-[#1A3326]/70">
                              <span>2 photos</span>
                              <button
                                type="button"
                                onClick={() => triggerPhotoUpload(item.id)}
                                className="inline-flex items-center gap-1 font-medium text-[#1F7A56] hover:underline"
                              >
                                <Plus className="h-3 w-3" />
                                <span>Add More</span>
                              </button>
                            </div>
                          </div>
                        ) : (
                          // 3+ Photos View (Grid / Collage)
                          <div className="space-y-2">
                            <div className="grid grid-cols-3 gap-2">
                              {images.map((imgUrl, pIdx) => (
                                <div
                                  key={pIdx}
                                  className="group relative aspect-square overflow-hidden rounded-xl border border-[#72B193]/45 bg-white shadow-xs"
                                >
                                  <img
                                    src={imgUrl}
                                    alt={`${item.milestoneTitle} photo ${pIdx + 1}`}
                                    referrerPolicy="no-referrer"
                                    className="h-full w-full cursor-pointer object-cover transition-transform duration-300 group-hover:scale-105"
                                    onClick={() =>
                                      setLightbox({
                                        milestoneId: item.id,
                                        photoIndex: pIdx,
                                      })
                                    }
                                  />
                                  <div className="absolute top-1 right-1 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                                    <button
                                      type="button"
                                      onClick={() =>
                                        setLightbox({
                                          milestoneId: item.id,
                                          photoIndex: pIdx,
                                        })
                                      }
                                      className="flex h-5 w-5 items-center justify-center rounded-full bg-white/90 text-[#1A3326] shadow-xs hover:bg-[#E0F2E9]"
                                    >
                                      <Expand className="h-2.5 w-2.5" />
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <div className="flex items-center justify-between text-xs text-[#1A3326]/70">
                              <span className="font-medium text-[#1F7A56]">
                                {images.length} photos in this memory
                              </span>
                              <button
                                type="button"
                                onClick={() => triggerPhotoUpload(item.id)}
                                className="inline-flex items-center gap-1 font-medium text-[#1F7A56] hover:underline"
                              >
                                <Plus className="h-3 w-3" />
                                <span>Add More</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox for Milestone Photos */}
      <AnimatePresence>
        {lightbox && activeLightboxMilestone && activeLightboxImages.length > 0 && (
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
                setLightbox(null);
              }
            }}
            className={`fixed inset-0 z-50 flex items-center justify-center ${
              isFullscreen
                ? 'bg-black p-0'
                : 'bg-[#1A3326]/90 p-4 backdrop-blur-md'
            }`}
            role="dialog"
            aria-modal="true"
            aria-label={activeLightboxMilestone.milestoneTitle}
          >
            {/* Top Bar Controls */}
            <div className="fixed top-4 right-4 left-4 z-50 flex items-center justify-between">
              <span className="rounded-full bg-black/35 px-3 py-1.5 font-mono text-xs text-white/90 tabular-nums backdrop-blur-xs">
                Photo {lightbox.photoIndex + 1} / {activeLightboxImages.length}
              </span>
              <div className="flex items-center gap-2">
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
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    void exitFullscreen();
                    setLightbox(null);
                  }}
                  aria-label="Close lightbox"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-xs transition-colors hover:bg-white/30"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Previous button */}
            {activeLightboxImages.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((prev) =>
                    prev
                      ? {
                          ...prev,
                          photoIndex:
                            (prev.photoIndex - 1 + activeLightboxImages.length) %
                            activeLightboxImages.length,
                        }
                      : null
                  );
                }}
                aria-label="Previous photo"
                className="fixed left-2 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-xs transition-colors hover:bg-white/35 sm:left-6 sm:h-11 sm:w-11"
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            )}

            {/* Next button */}
            {activeLightboxImages.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLightbox((prev) =>
                    prev
                      ? {
                          ...prev,
                          photoIndex:
                            (prev.photoIndex + 1) % activeLightboxImages.length,
                        }
                      : null
                  );
                }}
                aria-label="Next photo"
                className="fixed right-2 z-50 flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-xs transition-colors hover:bg-white/35 sm:right-6 sm:h-11 sm:w-11"
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
            )}

            {/* Photo Card / Fullscreen Edge-to-Edge Container */}
            {isFullscreen ? (
              <motion.div
                key={`fs-${lightbox.photoIndex}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.18 }}
                onClick={(e) => e.stopPropagation()}
                onDoubleClick={toggleFullscreen}
                className="relative flex h-[100dvh] w-screen items-center justify-center p-2 sm:p-8"
              >
                <img
                  src={activeLightboxImages[lightbox.photoIndex]}
                  alt={`${activeLightboxMilestone.milestoneTitle} photo ${lightbox.photoIndex + 1}`}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full cursor-zoom-out object-contain select-none"
                />
                <div className="pointer-events-none fixed right-6 bottom-5 left-6 flex justify-center">
                  <p className="rounded-full bg-black/55 px-4 py-1.5 font-serif-editorial text-sm text-white/95 backdrop-blur-xs">
                    {activeLightboxMilestone.milestoneTitle}
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={lightbox.photoIndex}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                className="relative max-h-[92dvh] w-full max-w-4xl overflow-hidden rounded-3xl bg-[#F4FAF6] p-3 shadow-2xl sm:p-5"
              >
                <div
                  onDoubleClick={toggleFullscreen}
                  title="Double-click for fullscreen"
                  className="relative flex h-[56dvh] max-h-[74dvh] w-full items-center justify-center overflow-hidden rounded-2xl bg-[#E0F2E9]/50 sm:h-[66dvh]"
                >
                  <img
                    src={activeLightboxImages[lightbox.photoIndex]}
                    alt={`${activeLightboxMilestone.milestoneTitle} photo ${lightbox.photoIndex + 1}`}
                    referrerPolicy="no-referrer"
                    className="h-full w-full cursor-zoom-in object-contain bg-[#F4FAF6]"
                  />
                </div>

                <div className="mt-3 flex items-center justify-between gap-3 px-2">
                  <div>
                    <p className="font-serif-editorial text-lg font-semibold text-[#1A3326]">
                      {activeLightboxMilestone.milestoneTitle}
                    </p>
                    {(() => {
                      const meta = [
                        activeLightboxMilestone.date !== '[ADD DATE]'
                          ? activeLightboxMilestone.date
                          : '',
                        activeLightboxMilestone.memory !== '[ADD MEMORY]'
                          ? activeLightboxMilestone.memory
                          : '',
                      ]
                        .filter(Boolean)
                        .join(' · ');
                      return meta ? (
                        <p className="text-xs text-[#1A3326]/70">{meta}</p>
                      ) : null;
                    })()}
                  </div>
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#72B193] bg-white px-3 py-1.5 text-xs font-medium text-[#1A3326] transition-colors hover:bg-[#E0F2E9] hover:text-[#1F7A56] whitespace-nowrap shrink-0"
                  >
                    <Maximize2 className="h-3.5 w-3.5 text-[#1F7A56]" />
                    <span>Fullscreen</span>
                  </button>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
