import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, RotateCcw, Sparkles } from 'lucide-react';

interface FinalSurpriseProps {
  onReplayBeginning: () => void;
  onTriggerHeartBurst: () => void;
}

export const FinalSurprise: React.FC<FinalSurpriseProps> = ({
  onReplayBeginning,
  onTriggerHeartBurst,
}) => {
  const [heartClicked, setHeartClicked] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleBigHeartClick = () => {
    setHeartClicked(true);
    setClickCount((prev) => prev + 1);
    onTriggerHeartBurst();
  };

  return (
    <section className="romantic-gradient relative overflow-hidden py-16 text-center lg:py-24">
      {/* Local Sparkle & Heart Shower Burst on Click */}
      <AnimatePresence>
        {clickCount > 0 && (
          <div
            key={clickCount}
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            {Array.from({ length: 24 }).map((_, idx) => {
              const angle = (idx / 24) * Math.PI * 2;
              const radius = 110 + (idx % 4) * 55;
              return (
                <motion.div
                  key={idx}
                  initial={{ x: 0, y: 0, scale: 0.3, opacity: 1 }}
                  animate={{
                    x: Math.cos(angle) * radius,
                    y: Math.sin(angle) * radius - 40,
                    scale: [0.4, 1.3, 0.7],
                    opacity: [1, 1, 0],
                  }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="absolute text-[#1F7A56]"
                >
                  {idx % 3 === 0 ? (
                    <Sparkles className="h-5 w-5 text-[#1F7A56]" />
                  ) : (
                    <Heart className="h-6 w-6 fill-[#1F7A56]" />
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </AnimatePresence>

      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
        {/* Large Interactive Animated Jade Heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="flex flex-col items-center"
        >
          <motion.button
            type="button"
            onClick={handleBigHeartClick}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            animate={{
              scale: [1, 1.06, 1],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            aria-label="Tap heart for final surprise"
            className="group relative flex h-32 w-32 items-center justify-center rounded-full bg-white/85 shadow-xl shadow-[#1F7A56]/25 ring-4 ring-[#BCE3CD] transition-shadow hover:shadow-2xl focus-visible:ring-4 focus-visible:ring-[#1F7A56] focus-visible:outline-none sm:h-36 sm:w-36"
          >
            <Heart className="h-16 w-16 fill-[#1F7A56] text-[#1F7A56] transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20" />
          </motion.button>

          <p className="mt-3 text-xs font-medium tracking-wider text-[#1A3326]/70 uppercase">
            {heartClicked ? 'Tap again for more hearts ✨' : 'Tap the heart ❤️'}
          </p>
        </motion.div>

        {/* Revealed Final Message */}
        <AnimatePresence>
          {heartClicked && (
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
              className="paper-texture letter-shadow mx-auto mt-8 max-w-lg rounded-3xl p-6 sm:p-8"
            >
              <p className="font-serif-editorial text-2xl font-semibold text-[#1F7A56] sm:text-3xl">
                &ldquo;You&apos;re my favourite person. Always. ❤️&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Replay Button */}
        <div className="mt-14">
          <button
            type="button"
            onClick={onReplayBeginning}
            className="inline-flex items-center gap-2 rounded-full border border-[#72B193] bg-white/90 px-6 py-3 text-xs font-medium text-[#1A3326] shadow-xs transition-all hover:-translate-y-0.5 hover:bg-white hover:text-[#1F7A56] whitespace-nowrap shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5 text-[#1F7A56]" />
            <span>Replay From The Beginning</span>
          </button>
        </div>
      </div>
    </section>
  );
};
