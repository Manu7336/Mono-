import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, RotateCcw } from 'lucide-react';

interface ReasonsILoveYouProps {
  reasons: string[];
  onTriggerHeartBurst?: () => void;
}

const STORAGE_KEY = 'mono_mono_discovered_reasons_v1';

export const ReasonsILoveYou: React.FC<ReasonsILoveYouProps> = ({
  reasons,
  onTriggerHeartBurst,
}) => {
  const [discovered, setDiscovered] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(discovered));
    } catch {
      // Ignore storage quota errors
    }
  }, [discovered]);

  const handleSelectHeart = (idx: number) => {
    setSelectedIndex(idx);
    if (!discovered.includes(idx)) {
      const updated = [...discovered, idx];
      setDiscovered(updated);
      if (updated.length % 10 === 0 && onTriggerHeartBurst) {
        onTriggerHeartBurst();
      }
    }
  };

  const handleRevealNextUnread = () => {
    const nextUnread = reasons.findIndex((_, idx) => !discovered.includes(idx));
    if (nextUnread !== -1) {
      handleSelectHeart(nextUnread);
    } else {
      const randomIdx = Math.floor(Math.random() * reasons.length);
      setSelectedIndex(randomIdx);
    }
  };

  const handleReset = () => {
    setDiscovered([]);
    setSelectedIndex(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const totalReasons = reasons.length;
  const discoveredCount = discovered.length;

  return (
    <section
      id="reasons"
      className="soft-section-gradient relative py-20 lg:py-28"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-serif-editorial text-lg italic text-[#1F7A56]">
            Chapter III · 100 Hearts
          </p>
          <h2 className="font-serif-editorial mt-1 text-4xl font-semibold text-[#1A3326] sm:text-5xl text-balance">
            100 Little Reasons I Love You.
          </h2>
          <p className="font-serif-editorial mt-3 text-xl italic text-[#1A3326]/85 sm:text-2xl">
            &ldquo;Because one reason could never be enough.&rdquo;
          </p>

          {/* Progress Counter */}
          <div className="mt-6 flex flex-col items-center justify-center gap-3">
            <p className="font-serif-editorial text-2xl font-medium text-[#1F7A56] tabular-nums">
              You&apos;ve discovered {discoveredCount} of {totalReasons} reasons.
            </p>

            {/* Progress Bar */}
            <div className="h-2 w-full max-w-xs overflow-hidden rounded-full bg-[#E0F2E9] ring-1 ring-[#72B193]/40">
              <div
                style={{
                  width: `${Math.min(100, (discoveredCount / totalReasons) * 100)}%`,
                }}
                className="h-full rounded-full bg-[#1F7A56] transition-all duration-300"
              />
            </div>

            {/* Interactive Helper Actions */}
            <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleRevealNextUnread}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#1F7A56] px-5 py-2 text-xs font-medium text-white shadow-xs transition-colors hover:bg-[#186245] whitespace-nowrap shrink-0"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>
                  {discoveredCount < totalReasons
                    ? 'Reveal Next Unread Heart'
                    : 'Pick a Random Reason'}
                </span>
              </button>

              {discoveredCount > 0 && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#72B193] bg-white px-4 py-2 text-xs font-medium text-[#1A3326]/80 transition-colors hover:bg-[#E0F2E9] hover:text-[#1A3326] whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Start Fresh</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Active Revealed Reason Spotlight Card */}
        <div className="mx-auto mt-10 max-w-2xl">
          <AnimatePresence mode="wait">
            {selectedIndex !== null ? (
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -8 }}
                transition={{ duration: 0.25 }}
                className="paper-texture letter-shadow relative flex flex-col items-center rounded-3xl p-7 text-center sm:p-10"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E0F2E9] text-[#1F7A56]">
                  <Heart className="h-5 w-5 fill-[#1F7A56]" />
                </div>
                <p className="mt-3 font-mono text-xs tracking-wider text-[#1F7A56] uppercase tabular-nums">
                  Reason #{selectedIndex + 1} of 100
                </p>
                <p className="font-serif-editorial mt-2 text-2xl font-medium leading-relaxed text-[#1A3326] sm:text-3xl">
                  &ldquo;{reasons[selectedIndex]}&rdquo;
                </p>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="rounded-3xl border border-[#72B193]/45 bg-white/80 p-7 text-center shadow-xs"
              >
                <p className="font-serif-editorial text-xl italic text-[#1A3326]/80">
                  Tap any little jade heart below to uncover a reason why I love you, Natalie...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 100 Interactive Jade Hearts Tapestry */}
        <div
          className="mx-auto mt-10 grid max-w-4xl grid-cols-5 gap-2.5 sm:grid-cols-10 sm:gap-3"
          role="group"
          aria-label="100 clickable hearts"
        >
          {reasons.map((reason, idx) => {
            const isDiscovered = discovered.includes(idx);
            const isSelected = selectedIndex === idx;

            return (
              <motion.button
                key={idx}
                type="button"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSelectHeart(idx)}
                aria-label={`Reason ${idx + 1}${isDiscovered ? `: ${reason}` : ''}`}
                aria-pressed={isSelected}
                className={`group relative flex aspect-square flex-col items-center justify-center rounded-2xl border transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#1F7A56] focus-visible:outline-none ${
                  isSelected
                    ? 'border-[#1F7A56] bg-[#1F7A56] text-white shadow-md shadow-[#1F7A56]/30'
                    : isDiscovered
                      ? 'border-[#72B193] bg-[#E0F2E9] text-[#1F7A56]'
                      : 'border-[#72B193]/40 bg-white/90 text-[#72B193] hover:border-[#1F7A56]/60 hover:bg-[#E0F2E9]/50'
                }`}
              >
                <Heart
                  className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 sm:h-6 sm:w-6 ${
                    isSelected
                      ? 'fill-white text-white'
                      : isDiscovered
                        ? 'fill-[#1F7A56] text-[#1F7A56]'
                        : 'fill-[#BCE3CD]/65 text-[#72B193]'
                  }`}
                />
                <span
                  className={`mt-1 font-mono text-[10px] font-medium tabular-nums ${
                    isSelected
                      ? 'text-white'
                      : isDiscovered
                        ? 'text-[#1A3326]'
                        : 'text-[#1A3326]/55'
                  }`}
                >
                  {idx + 1}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
