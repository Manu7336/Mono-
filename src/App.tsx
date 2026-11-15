import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Heart } from 'lucide-react';
import {
  INITIAL_CONTENT,
  MemoryPhoto,
  RomanticContent,
  TimelineMilestone,
  VideoFrameItem,
} from './data/content';
import { FloatingHearts } from './components/FloatingHearts';
import { FallingPetals } from './components/FallingPetals';
import { OpeningScreen } from './components/OpeningScreen';
import { Navigation } from './components/Navigation';
import { PhotoGallery } from './components/PhotoGallery';
import { VideoFrames } from './components/VideoFrames';
import { LoveStoryTimeline } from './components/LoveStoryTimeline';
import { FinalLoveLetter } from './components/FinalLoveLetter';
import { FinalSurprise } from './components/FinalSurprise';
import { CustomiseModal } from './components/CustomiseModal';
import { clearAllVideoBlobs, loadAllVideoUrls } from './utils/videoStorage';

const CONTENT_STORAGE_KEY = 'mono_mono_custom_content_v6';

export default function App() {
  const [content, setContent] = useState<RomanticContent>(() => {
    try {
      const saved =
        localStorage.getItem(CONTENT_STORAGE_KEY) ||
        localStorage.getItem('mono_mono_custom_content_v5') ||
        localStorage.getItem('mono_mono_custom_content_v4') ||
        localStorage.getItem('mono_mono_custom_content_v3') ||
        localStorage.getItem('mono_mono_custom_content_v2') ||
        localStorage.getItem('mono_mono_custom_content_v1');
      if (saved) {
        const parsed = JSON.parse(saved);
        const oldDefaultTitles = [
          'The day we first met.',
          'Our first special memory.',
          'A moment that made me fall for her even more.',
          'A favourite day together.',
          'Today and all the memories still waiting for us.',
        ];

        const mergedTimeline = INITIAL_CONTENT.timeline.map((initialItem) => {
          const savedItem = parsed.timeline?.find(
            (t: { id: string }) => t.id === initialItem.id
          );
          if (!savedItem) return initialItem;

          const milestoneTitle =
            savedItem.milestoneTitle &&
            !oldDefaultTitles.includes(savedItem.milestoneTitle)
              ? savedItem.milestoneTitle
              : initialItem.milestoneTitle;

          const cleanDate =
            savedItem.date && savedItem.date !== '[ADD DATE]'
              ? savedItem.date
              : initialItem.date;
          const cleanMemory =
            savedItem.memory && savedItem.memory !== '[ADD MEMORY]'
              ? savedItem.memory
              : initialItem.memory;

          const savedImages: string[] =
            savedItem.imageUrls && savedItem.imageUrls.length > 0
              ? savedItem.imageUrls
              : savedItem.imageUrl
                ? [savedItem.imageUrl]
                : [];
          const defaultImages = initialItem.imageUrls || [];
          const mergedImages = [
            ...savedImages,
            ...defaultImages.filter((url) => !savedImages.includes(url)),
          ];

          return {
            ...initialItem,
            milestoneTitle,
            date: cleanDate,
            memory: cleanMemory,
            imageUrl: savedItem.imageUrl || initialItem.imageUrl,
            imageUrls: mergedImages,
          };
        });

        const oldVideoCaptions = [
          'A little moment in motion.',
          'Your laugh, captured forever.',
          'One of our favourite adventures.',
          'Just us being us — Mono Mono.',
        ];
        const mergedVideoFrames: VideoFrameItem[] = [
          ...INITIAL_CONTENT.videoFrames.map((initialVf) => {
            const savedVf = parsed.videoFrames?.find(
              (vf: VideoFrameItem) => vf.id === initialVf.id
            );
            if (!savedVf) return initialVf;
            return {
              ...initialVf,
              ...savedVf,
              videoUrl: savedVf.videoUrl || initialVf.videoUrl || '',
              caption: oldVideoCaptions.includes(savedVf.caption)
                ? ''
                : savedVf.caption,
            };
          }),
          ...(Array.isArray(parsed.videoFrames)
            ? parsed.videoFrames
                .filter(
                  (vf: VideoFrameItem) =>
                    !INITIAL_CONTENT.videoFrames.some(
                      (initVf) => initVf.id === vf.id
                    )
                )
                .map((vf: VideoFrameItem) => ({
                  ...vf,
                  caption: oldVideoCaptions.includes(vf.caption)
                    ? ''
                    : vf.caption,
                }))
            : []),
        ];

        const mergedMemories: MemoryPhoto[] = INITIAL_CONTENT.memories.map(
          (initialMem) => {
            const savedMem = parsed.memories?.find(
              (m: MemoryPhoto) => m.id === initialMem.id
            );
            if (!savedMem) return initialMem;
            return {
              ...initialMem,
              ...savedMem,
              caption: '',
              dateNote: '',
              imageUrl: savedMem.imageUrl || initialMem.imageUrl,
            };
          }
        );
        const extraSavedMemories: MemoryPhoto[] = Array.isArray(parsed.memories)
          ? parsed.memories
              .filter(
                (m: MemoryPhoto) =>
                  !INITIAL_CONTENT.memories.some((initM) => initM.id === m.id)
              )
              .map((m: MemoryPhoto) => ({
                ...m,
                caption: '',
                dateNote: '',
              }))
          : [];

        return {
          ...INITIAL_CONTENT,
          ...parsed,
          opening: INITIAL_CONTENT.opening,
          memories: [...mergedMemories, ...extraSavedMemories],
          videoFrames: mergedVideoFrames,
          timeline: mergedTimeline,
          finalLetter: {
            ...INITIAL_CONTENT.finalLetter,
            photoUrl:
              parsed.finalLetter?.photoUrl || INITIAL_CONTENT.finalLetter.photoUrl,
            photoCaption:
              parsed.finalLetter?.photoCaption ||
              INITIAL_CONTENT.finalLetter.photoCaption,
          },
        };
      }
    } catch {
      // Ignore storage read errors
    }
    return INITIAL_CONTENT;
  });

  const [hasOpenedSurprise, setHasOpenedSurprise] = useState(false);
  const [heartBurstKey, setHeartBurstKey] = useState(0);
  const [customiseOpen, setCustomiseOpen] = useState(false);
  const [uploadedVideoUrls, setUploadedVideoUrls] = useState<
    Record<string, string>
  >({});

  useEffect(() => {
    let active = true;
    loadAllVideoUrls().then((urls) => {
      if (active) setUploadedVideoUrls(urls);
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(content));
    } catch {
      // Ignore storage quota errors when large photos are uploaded
    }
  }, [content]);

  const triggerHeartBurst = () => {
    setHeartBurstKey((prev) => prev + 1);
  };

  const handleOpenSurprise = () => {
    triggerHeartBurst();
    setHasOpenedSurprise(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReplayBeginning = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setHasOpenedSurprise(false);
  };

  const handleUpdateMemoryPhoto = (
    photoId: string,
    imageUrl: string,
    caption?: string
  ) => {
    setContent((prev) => ({
      ...prev,
      memories: prev.memories.map((m) =>
        m.id === photoId
          ? {
              ...m,
              imageUrl,
              caption: caption !== undefined ? caption : m.caption,
            }
          : m
      ),
    }));
  };

  const handleAddMemory = (newPhoto: MemoryPhoto) => {
    setContent((prev) => ({
      ...prev,
      memories: [...prev.memories, newPhoto],
    }));
  };

  const handleUpdateMilestone = (
    id: string,
    updates: Partial<TimelineMilestone>
  ) => {
    setContent((prev) => ({
      ...prev,
      timeline: prev.timeline.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      ),
    }));
  };

  const handleUpdateLetterPhoto = (dataUrl: string) => {
    setContent((prev) => ({
      ...prev,
      finalLetter: {
        ...prev.finalLetter,
        photoUrl: dataUrl,
      },
    }));
  };

  const handleUpdateCreatorName = (name: string) => {
    setContent((prev) => ({
      ...prev,
      creatorName: name,
    }));
  };

  const handleVideoUploaded = (frameId: string, objectUrl: string) => {
    setUploadedVideoUrls((prev) => ({
      ...prev,
      [frameId]: objectUrl,
    }));
  };

  const handleAddVideoFrame = (
    newFrame: VideoFrameItem,
    initialObjectUrl?: string
  ) => {
    setContent((prev) => ({
      ...prev,
      videoFrames: [...prev.videoFrames, newFrame],
    }));
    if (initialObjectUrl) {
      setUploadedVideoUrls((prev) => ({
        ...prev,
        [newFrame.id]: initialObjectUrl,
      }));
    }
  };

  const handleResetAllCustomisations = () => {
    setContent(INITIAL_CONTENT);
    setUploadedVideoUrls({});
    void clearAllVideoBlobs();
    try {
      localStorage.removeItem(CONTENT_STORAGE_KEY);
    } catch {
      // Ignore
    }
    setCustomiseOpen(false);
  };

  return (
    <div className="relative min-h-[100dvh] w-full overflow-x-clip bg-[#F4FAF6] text-[#1A3326]">
      {/* Ambient Dreamy Romance Atmosphere */}
      <FloatingHearts count={14} burstKey={heartBurstKey} />
      <FallingPetals count={12} />

      <AnimatePresence mode="wait">
        {!hasOpenedSurprise ? (
          <OpeningScreen
            key="opening-screen"
            content={content}
            onOpenSurprise={handleOpenSurprise}
          />
        ) : (
          <motion.div
            key="main-experience"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-20"
          >
            <Navigation
              projectName={content.projectName}
              onOpenCustomise={() => setCustomiseOpen(true)}
            />

            <main>
              {/* Our Memories — Personal Photo Gallery */}
              <PhotoGallery
                memories={content.memories}
                onUpdatePhoto={handleUpdateMemoryPhoto}
                onAddMemory={handleAddMemory}
              />

              {/* Moving Memories — Short Video Frames */}
              <VideoFrames
                frames={content.videoFrames}
                uploadedVideoUrls={uploadedVideoUrls}
                onVideoUploaded={handleVideoUploaded}
                onAddFrame={handleAddVideoFrame}
              />

              {/* Our Story Timeline */}
              <LoveStoryTimeline
                timeline={content.timeline}
                onUpdateMilestone={handleUpdateMilestone}
              />

              {/* 9. The Final Love Letter */}
              <FinalLoveLetter
                content={content}
                onUpdateLetterPhoto={handleUpdateLetterPhoto}
                onOpenCustomise={() => setCustomiseOpen(true)}
              />

              {/* 10. The Final Surprise */}
              <FinalSurprise
                onReplayBeginning={handleReplayBeginning}
                onTriggerHeartBurst={triggerHeartBurst}
              />
            </main>

            {/* Quiet Romantic Footer */}
            <footer className="border-t border-[#72B193]/35 bg-[#F4FAF6] py-12 text-center">
              <div className="mx-auto max-w-xl px-4">
                <p className="font-serif-editorial text-2xl font-semibold tracking-wider text-[#1A3326]">
                  {content.projectName}
                </p>
                <p className="font-serif-editorial mt-1 text-base italic text-[#1F7A56]">
                  Dedicated with all my heart to {content.recipientFullName}
                </p>
                <p className="mt-2 flex items-center justify-center gap-1.5 text-xs text-[#1A3326]/70">
                  <span>{content.tagline}</span>
                </p>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Personalisation Modal */}
      <CustomiseModal
        isOpen={customiseOpen}
        content={content}
        onClose={() => setCustomiseOpen(false)}
        onUpdateCreatorName={handleUpdateCreatorName}
        onResetAllCustomisations={handleResetAllCustomisations}
      />
    </div>
  );
}
