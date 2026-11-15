import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Camera, Expand, Heart, Maximize2, Minimize2, X } from 'lucide-react';
import { RomanticContent } from '../data/content';
import { RomanticIllustration } from './RomanticIllustration';
import { useImageFullscreen } from '../utils/useImageFullscreen';

interface FinalLoveLetterProps {
  content: RomanticContent;
  onUpdateLetterPhoto: (dataUrl: string) => void;
  onOpenCustomise: () => void;
}

const renderFormattedText = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={index} className="font-semibold text-[#1A3326]">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return (
        <em key={index} className="italic text-[#1F7A56]">
          {part.slice(1, -1)}
        </em>
      );
    }
    return part;
  });
};

export const FinalLoveLetter: React.FC<FinalLoveLetterProps> = ({
  content,
  onUpdateLetterPhoto,
  onOpenCustomise,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [letterLightboxOpen, setLetterLightboxOpen] = useState(false);
  const { containerRef, isFullscreen, exitFullscreen, toggleFullscreen } =
    useImageFullscreen(letterLightboxOpen);

  useEffect(() => {
    if (!letterLightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          void exitFullscreen();
        } else {
          setLetterLightboxOpen(false);
        }
      }
      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [letterLightboxOpen, isFullscreen, exitFullscreen, toggleFullscreen]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        onUpdateLetterPhoto(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <section
      id="my-letter"
      className="relative mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 lg:py-28"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload love letter photograph"
      />

      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-serif-editorial text-3xl font-semibold text-[#1A3326] sm:text-4xl lg:text-5xl text-balance">
          A Letter for my Mono Miss Natalie Karaliyo
        </h2>
      </div>

      {/* Warm Cream Paper Stationery Sheet */}
      <motion.article
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="paper-texture letter-shadow relative mx-auto mt-8 max-w-3xl overflow-hidden rounded-3xl p-5 sm:mt-12 sm:p-10 md:p-14 lg:p-16"
      >
        {/* Delicate Botanical Top-Right SVG Accent */}
        <svg
          className="pointer-events-none absolute top-6 right-6 h-24 w-24 text-[#72B193]/45"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M85 15C55 15 25 45 15 85"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M65 25C52 15 38 22 36 36C50 38 60 30 65 25Z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <path
            d="M42 48C28 38 16 45 14 58C28 60 38 52 42 48Z"
            fill="currentColor"
            fillOpacity="0.3"
          />
        </svg>

        {/* Letter Salutation Heading */}
        <motion.h3
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-handwritten text-3xl text-[#1F7A56] sm:text-4xl lg:text-5xl"
        >
          {content.finalLetter.heading}
        </motion.h3>

        <div className="my-5 h-px w-20 bg-[#72B193] sm:my-6 sm:w-24" />

        {/* Gradual Scroll-Revealed Letter Paragraphs */}
        <div className="space-y-5 text-base leading-relaxed text-[#1A3326] sm:space-y-6 sm:text-lg sm:leading-loose">
          {content.finalLetter.paragraphs.map((paragraph, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.7, delay: 0.15 + idx * 0.12 }}
            >
              {renderFormattedText(paragraph)}
            </motion.p>
          ))}
        </div>

        {/* Closing & Signature */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.45 }}
          className="mt-8 space-y-4 border-t border-[#72B193]/40 pt-6 sm:mt-10 sm:pt-8"
        >
          {content.finalLetter.closingLine1 && (
            <p className="font-serif-editorial text-xl font-semibold leading-relaxed text-[#1A3326] sm:text-2xl">
              {renderFormattedText(content.finalLetter.closingLine1)}
            </p>
          )}
          {content.finalLetter.closingLine2 && (
            <p className="font-handwritten text-3xl text-[#1F7A56] sm:text-4xl lg:text-5xl">
              {content.finalLetter.closingLine2}
            </p>
          )}

          {content.finalLetter.signOff && (
            <div className="pt-4">
              <p className="text-sm tracking-wide text-[#1A3326]/75">
                {content.finalLetter.signOff}
              </p>
              <button
                type="button"
                onClick={onOpenCustomise}
                title="Click to personalise your name"
                className="font-handwritten mt-1 inline-flex items-center gap-2 text-4xl text-[#1F7A56] transition-opacity hover:opacity-80"
              >
                <span>{content.creatorName} ❤️</span>
              </button>
            </div>
          )}
        </motion.div>

        {/* Photograph Placeholder of Us Together inside the Letter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-12 border-t border-[#72B193]/35 pt-10"
        >
          <div className="polaroid-shadow mx-auto max-w-sm -rotate-1 rounded-3xl border border-[#72B193]/45 bg-white p-4 transition-transform duration-300 hover:rotate-0">
            <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-[#E0F2E9]/40">
              {content.finalLetter.photoUrl ? (
                <>
                  <img
                    src={content.finalLetter.photoUrl}
                    alt={content.finalLetter.photoCaption}
                    referrerPolicy="no-referrer"
                    onClick={() => setLetterLightboxOpen(true)}
                    className="h-full w-full cursor-pointer object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setLetterLightboxOpen(true)}
                    title="View fullscreen"
                    className="absolute top-2.5 right-2.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#1A3326] shadow-xs transition-colors hover:bg-[#E0F2E9] hover:text-[#1F7A56]"
                  >
                    <Expand className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute right-2.5 bottom-2.5 inline-flex items-center gap-1 rounded-lg bg-white/90 px-2.5 py-1 text-xs font-medium text-[#1A3326] shadow-2xs hover:bg-[#E0F2E9] whitespace-nowrap shrink-0"
                  >
                    <Camera className="h-3.5 w-3.5 text-[#1F7A56]" />
                    <span>Change Photo</span>
                  </button>
                </>
              ) : (
                <RomanticIllustration
                  theme="letter-frame"
                  label="Our Picture Together"
                  sublabel="Upload a special photo of the two of you to sign off this letter"
                  onUploadClick={() => fileInputRef.current?.click()}
                />
              )}
            </div>

            <div className="mt-3 flex items-center justify-between px-1">
              <p className="font-handwritten text-2xl text-[#1A3326]">
                {content.finalLetter.photoCaption}
              </p>
              <Heart className="h-4 w-4 fill-[#1F7A56] text-[#1F7A56]" />
            </div>
          </div>
        </motion.div>
      </motion.article>

      {/* Fullscreen Viewer for Letter Photo */}
      <AnimatePresence>
        {letterLightboxOpen && content.finalLetter.photoUrl && (
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
                setLetterLightboxOpen(false);
              }
            }}
            className={`fixed inset-0 z-50 flex items-center justify-center ${
              isFullscreen
                ? 'bg-black p-0'
                : 'bg-[#1A3326]/90 p-4 backdrop-blur-md'
            }`}
            role="dialog"
            aria-modal="true"
            aria-label={content.finalLetter.photoCaption}
          >
            <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFullscreen();
                }}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'View fullscreen'}
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
                  setLetterLightboxOpen(false);
                }}
                aria-label="Close lightbox"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-xs transition-colors hover:bg-white/30"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {isFullscreen ? (
              <div
                onClick={(e) => e.stopPropagation()}
                onDoubleClick={toggleFullscreen}
                className="flex h-[100dvh] w-screen items-center justify-center p-2 sm:p-8"
              >
                <img
                  src={content.finalLetter.photoUrl}
                  alt={content.finalLetter.photoCaption}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full cursor-zoom-out object-contain select-none"
                />
              </div>
            ) : (
              <div
                onClick={(e) => e.stopPropagation()}
                onDoubleClick={toggleFullscreen}
                className="relative max-h-[92dvh] w-full max-w-3xl overflow-hidden rounded-3xl bg-[#F4FAF6] p-3 shadow-2xl sm:p-5"
              >
                <div className="flex h-[56dvh] max-h-[75dvh] w-full items-center justify-center overflow-hidden rounded-2xl bg-[#E0F2E9]/50 sm:h-[65dvh]">
                  <img
                    src={content.finalLetter.photoUrl}
                    alt={content.finalLetter.photoCaption}
                    referrerPolicy="no-referrer"
                    className="h-full w-full cursor-zoom-in object-contain bg-[#F4FAF6]"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between px-2">
                  <p className="font-handwritten text-2xl text-[#1A3326]">
                    {content.finalLetter.photoCaption}
                  </p>
                  <button
                    type="button"
                    onClick={toggleFullscreen}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-[#72B193] bg-white px-3 py-1.5 text-xs font-medium text-[#1A3326] transition-colors hover:bg-[#E0F2E9] hover:text-[#1F7A56] whitespace-nowrap shrink-0"
                  >
                    <Maximize2 className="h-3.5 w-3.5 text-[#1F7A56]" />
                    <span>Fullscreen</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
