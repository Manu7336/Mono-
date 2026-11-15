import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { RomanticContent } from '../data/content';

interface OpeningScreenProps {
  content: RomanticContent;
  onOpenSurprise: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({
  content,
  onOpenSurprise,
}) => {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpenClick = () => {
    if (isOpening) return;
    setIsOpening(true);
    window.setTimeout(() => {
      onOpenSurprise();
    }, 1550);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03, filter: 'blur(6px)' }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="romantic-gradient relative flex min-h-[100dvh] w-full flex-col items-center justify-center overflow-hidden px-4 py-8 sm:py-12 text-center"
    >
      {/* Soft radial ambient glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -z-0 h-[min(460px,85vw)] w-[min(460px,85vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/55 blur-3xl"
        aria-hidden="true"
      />

      {/* Burst hearts when opening */}
      {isOpening && (
        <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
          {Array.from({ length: 18 }).map((_, idx) => {
            const angle = (idx / 18) * Math.PI * 2;
            const distance = 120 + (idx % 3) * 65;
            return (
              <motion.div
                key={idx}
                initial={{ x: 0, y: 20, scale: 0.3, opacity: 1 }}
                animate={{
                  x: Math.cos(angle) * distance,
                  y: Math.sin(angle) * distance - 70,
                  scale: [0.4, 1.25, 0.8],
                  opacity: [1, 1, 0],
                }}
                transition={{ duration: 1.35, ease: 'easeOut' }}
                className="absolute text-[#1F7A56]"
              >
                <Heart className="h-6 w-6 fill-[#BCE3CD]" />
              </motion.div>
            );
          })}
        </div>
      )}

      <div className="relative z-10 mx-auto flex max-w-xl flex-col items-center">
        {/* Subtle top floral ornament */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-3 flex items-center justify-center gap-2 text-[#1F7A56] sm:mb-4 sm:gap-3"
        >
          <Sparkles className="h-4 w-4 shrink-0 sm:h-6 sm:w-6" />
          <span className="font-serif-editorial text-lg font-semibold tracking-wide sm:text-2xl md:text-3xl lg:text-4xl text-balance">
            For the love of my life Miss {content.recipientFullName}
          </span>
          <Sparkles className="h-4 w-4 shrink-0 sm:h-6 sm:w-6" />
        </motion.div>

        {/* Main Title: my MONO MONO */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-serif-editorial text-4xl font-semibold tracking-wider text-[#1A3326] sm:text-6xl md:text-7xl"
        >
          my {content.projectName}
        </motion.h1>

        {/* Animated Romantic Envelope Illustration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.35 }}
          className="relative my-6 flex flex-col items-center sm:my-8"
        >
          <div
            onClick={handleOpenClick}
            role="button"
            tabIndex={0}
            aria-label="Open your romantic surprise envelope"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleOpenClick();
              }
            }}
            className="group relative h-48 w-[min(18rem,calc(100vw-2.5rem))] cursor-pointer sm:h-56 sm:w-80 focus:outline-none"
          >
            {/* Envelope Back */}
            <div className="absolute inset-x-0 bottom-0 h-40 rounded-2xl border border-[#72B193]/60 bg-[#E0F2E9] shadow-xl transition-transform duration-300 group-hover:-translate-y-1 sm:h-48" />

            {/* Rising Letter Card inside Envelope */}
            <motion.div
              animate={
                isOpening
                  ? { y: -62, scale: 1.03 }
                  : { y: 0, scale: 1 }
              }
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="paper-texture absolute inset-x-3 bottom-3 flex h-32 flex-col items-center justify-center rounded-xl border border-[#72B193]/45 bg-[#F4FAF6] p-3 shadow-md sm:inset-x-4 sm:bottom-4 sm:h-40 sm:p-4"
            >
              <p className="font-serif-editorial text-xs leading-relaxed text-[#1A3326] sm:text-base">
                &ldquo;{content.opening.message}&rdquo;
              </p>
              <div className="mt-2 flex items-center gap-1 text-[#1F7A56]">
                <Heart className="h-3.5 w-3.5 fill-[#1F7A56]" />
                <span className="font-serif-editorial text-xs italic">
                  {content.recipientFirstName}
                </span>
              </div>
            </motion.div>

            {/* Envelope Front Pocket Flaps */}
            <svg
              viewBox="0 0 320 192"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-44 w-full drop-shadow-xs sm:h-48"
            >
              <path
                d="M0 24 L160 116 L320 24 L320 176 C320 184.8 312.8 192 304 192 L16 192 C7.2 192 0 184.8 0 176 Z"
                fill="#BCE3CD"
                stroke="#72B193"
                strokeWidth="1.5"
              />
              <path
                d="M0 184 L132 100 M320 184 L188 100"
                stroke="#72B193"
                strokeWidth="1.2"
              />
            </svg>

            {/* Envelope Top Flap */}
            <motion.svg
              viewBox="0 0 320 120"
              animate={
                isOpening
                  ? { rotateX: 180, y: -36, opacity: 0.85 }
                  : { rotateX: 0, y: 0, opacity: 1 }
              }
              transition={{ duration: 0.55, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top center' }}
              className="pointer-events-none absolute inset-x-0 top-8 z-10 w-full"
            >
              <path
                d="M2 0 L160 106 L318 0 Z"
                fill="#E0F2E9"
                stroke="#72B193"
                strokeWidth="1.5"
              />
            </motion.svg>

            {/* Romantic Wax Seal */}
            <motion.div
              animate={
                isOpening
                  ? { scale: 0, opacity: 0 }
                  : { scale: [1, 1.06, 1], opacity: 1 }
              }
              transition={{
                duration: isOpening ? 0.3 : 2.5,
                repeat: isOpening ? 0 : Infinity,
                ease: 'easeInOut',
              }}
              className="absolute top-1/2 left-1/2 z-20 flex h-13 w-13 -translate-x-1/2 -translate-y-1/4 items-center justify-center rounded-full border-2 border-[#F4FAF6]/80 bg-[#1F7A56] text-white shadow-lg"
            >
              <Heart className="h-5 w-5 fill-white" />
            </motion.div>
          </div>
        </motion.div>

        {/* Personal Greeting Copy (Single Sentence) */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.48 }}
          className="max-w-lg px-2"
        >
          <p className="font-serif-editorial text-lg font-medium leading-relaxed text-[#1A3326] sm:text-2xl text-balance">
            &ldquo;{content.opening.message}&rdquo;
          </p>
        </motion.div>

        {/* Interactive CTA Button: Open Your Surprise ❤️ */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-6 sm:mt-8"
        >
          <button
            type="button"
            onClick={handleOpenClick}
            disabled={isOpening}
            className="group relative inline-flex items-center gap-2.5 rounded-full bg-[#1F7A56] px-6 py-3.5 text-sm font-medium text-white shadow-lg shadow-[#1F7A56]/25 transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#186245] focus-visible:ring-2 focus-visible:ring-[#1F7A56] focus-visible:ring-offset-2 focus-visible:outline-none active:translate-y-0 sm:px-8 sm:py-4 sm:text-base whitespace-nowrap shrink-0"
          >
            <span>
              {isOpening ? 'Opening Our World...' : content.opening.buttonLabel}
            </span>
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
};
