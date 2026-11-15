import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, MailOpen, X } from 'lucide-react';
import { OpenWhenLetter } from '../data/content';

interface LoveEnvelopesProps {
  letters: OpenWhenLetter[];
  creatorName: string;
  onTriggerHeartBurst?: () => void;
}

export const LoveEnvelopes: React.FC<LoveEnvelopesProps> = ({
  letters,
  creatorName,
  onTriggerHeartBurst,
}) => {
  const [activeLetterId, setActiveLetterId] = useState<string | null>(null);
  const [openedIds, setOpenedIds] = useState<string[]>([]);

  const activeLetter = letters.find((l) => l.id === activeLetterId) || null;

  const handleOpenEnvelope = (id: string) => {
    setActiveLetterId(id);
    if (!openedIds.includes(id)) {
      setOpenedIds((prev) => [...prev, id]);
    }
    if (onTriggerHeartBurst) {
      onTriggerHeartBurst();
    }
  };

  return (
    <section
      id="letters"
      className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      {/* Section Heading */}
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-serif-editorial text-lg italic text-[#1F7A56]">
          Chapter IV · Open Whenever You Need Love
        </p>
        <h2 className="font-serif-editorial mt-1 text-4xl font-semibold text-[#1A3326] sm:text-5xl text-balance">
          Little Letters For You.
        </h2>
        <p className="font-serif-editorial mt-3 text-xl italic text-[#1A3326]/85 sm:text-2xl">
          &ldquo;For every moment, a little reminder that you&apos;re loved.&rdquo;
        </p>
      </div>

      {/* 4 Animated Digital Envelopes Grid */}
      <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2">
        {letters.map((letter, idx) => {
          const isAlreadyOpened = openedIds.includes(letter.id);

          return (
            <motion.div
              key={letter.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <button
                type="button"
                onClick={() => handleOpenEnvelope(letter.id)}
                className="group relative flex w-full flex-col items-center overflow-hidden rounded-3xl border border-[#72B193]/55 bg-gradient-to-b from-[#F4FAF6] to-[#E0F2E9]/75 p-7 text-center shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl focus-visible:ring-2 focus-visible:ring-[#1F7A56] focus-visible:outline-none sm:p-9"
              >
                {/* Illustrated Envelope Graphic */}
                <div className="relative mb-6 h-36 w-56 sm:h-40 sm:w-64">
                  {/* Envelope Back */}
                  <div className="absolute inset-0 rounded-2xl border border-[#72B193]/70 bg-[#E0F2E9] shadow-inner" />

                  {/* Peek-out Cream Letter Sheet */}
                  <div className="paper-texture absolute inset-x-4 top-3 h-24 rounded-xl border border-[#72B193]/45 bg-[#F4FAF6] p-3 shadow-xs transition-transform duration-300 group-hover:-translate-y-3">
                    <p className="font-handwritten text-lg text-[#1F7A56]">
                      {letter.salutation}
                    </p>
                    <div className="mx-auto mt-1.5 h-1 w-24 rounded-full bg-[#72B193]/40" />
                    <div className="mx-auto mt-1.5 h-1 w-16 rounded-full bg-[#72B193]/30" />
                  </div>

                  {/* Envelope Front Pocket SVG */}
                  <svg
                    viewBox="0 0 256 160"
                    className="pointer-events-none absolute inset-0 h-full w-full"
                  >
                    <path
                      d="M0 24 L128 96 L256 24 L256 144 C256 152.8 248.8 160 240 160 L16 160 C7.2 160 0 152.8 0 144 Z"
                      fill="#BCE3CD"
                      stroke="#72B193"
                      strokeWidth="1.5"
                    />
                  </svg>

                  {/* Envelope Top Flap */}
                  <svg
                    viewBox="0 0 256 96"
                    className="pointer-events-none absolute inset-x-0 top-0 w-full origin-top transition-transform duration-300 group-hover:scale-y-75"
                  >
                    <path
                      d="M2 0 L128 84 L254 0 Z"
                      fill="#E0F2E9"
                      stroke="#72B193"
                      strokeWidth="1.5"
                    />
                  </svg>

                  {/* Wax Seal */}
                  <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/4 items-center justify-center rounded-full border-2 border-[#F4FAF6] bg-[#1F7A56] text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                    {isAlreadyOpened ? (
                      <MailOpen className="h-4 w-4" />
                    ) : (
                      <Heart className="h-4 w-4 fill-white" />
                    )}
                  </div>
                </div>

                {/* Envelope Title & Subtitle */}
                <h3 className="font-serif-editorial text-2xl font-semibold tracking-wide text-[#1A3326] sm:text-3xl text-balance">
                  {letter.envelopeLabel}
                </h3>

                <p className="mt-2 text-sm text-[#1A3326]/75">
                  {letter.subtitle}
                </p>

                <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-[#1F7A56] group-hover:underline whitespace-nowrap shrink-0">
                  <span>{isAlreadyOpened ? 'Read Letter Again' : 'Break Seal & Open Letter'}</span>
                  <Heart className="h-3.5 w-3.5 fill-[#1F7A56]" />
                </span>
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Opened Letter Stationery Modal */}
      <AnimatePresence>
        {activeLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveLetterId(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A3326]/65 p-4 backdrop-blur-xs"
            role="dialog"
            aria-modal="true"
            aria-label={activeLetter.envelopeLabel}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="paper-texture letter-shadow relative max-h-[88vh] w-full max-w-xl overflow-y-auto rounded-3xl p-7 sm:p-11"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveLetterId(null)}
                aria-label="Close letter"
                className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#72B193]/50 bg-white text-[#1A3326] transition-colors hover:bg-[#E0F2E9]"
              >
                <X className="h-4 w-4" />
              </button>

              <p className="text-xs font-medium tracking-wider text-[#1F7A56] uppercase">
                {activeLetter.envelopeLabel}
              </p>

              <h3 className="font-handwritten mt-3 text-3xl text-[#1A3326] sm:text-4xl">
                {activeLetter.salutation}
              </h3>

              <div className="my-5 h-px w-16 bg-[#72B193]" />

              <div className="space-y-4 text-base leading-relaxed text-[#1A3326]/90 sm:text-lg">
                {activeLetter.paragraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              <div className="mt-8 border-t border-[#72B193]/35 pt-5">
                <p className="font-serif-editorial text-xl italic text-[#1F7A56]">
                  {activeLetter.closing}
                </p>
                <p className="font-handwritten mt-1 text-2xl text-[#1A3326]">
                  {creatorName}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
