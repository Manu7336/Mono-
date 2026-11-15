import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Feather, Heart, Sparkles } from 'lucide-react';
import { PoemItem } from '../data/content';

interface PoetrySectionProps {
  poems: PoemItem[];
}

export const PoetrySection: React.FC<PoetrySectionProps> = ({ poems }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const currentPoem = poems[activeIndex] || poems[0];

  const handleReadAnother = () => {
    setActiveIndex((prev) => (prev + 1) % poems.length);
  };

  return (
    <section
      id="poems"
      className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28"
    >
      {/* Section Header */}
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-serif-editorial text-lg italic text-[#1F7A56]">
          Chapter II · Original Poetry
        </p>
        <h2 className="font-serif-editorial mt-1 text-4xl font-semibold text-[#1A3326] sm:text-5xl text-balance">
          Words From My Heart.
        </h2>
        <p className="font-serif-editorial mt-3 text-xl italic text-[#1A3326]/85 sm:text-2xl">
          &ldquo;Some feelings are too beautiful to leave unspoken.&rdquo;
        </p>
      </div>

      {/* Poem Selector Tabs */}
      <div
        role="tablist"
        aria-label="Romantic poems"
        className="mt-8 flex flex-wrap items-center justify-center gap-2"
      >
        {poems.map((poem, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={poem.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(idx)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                isActive
                  ? 'bg-[#1F7A56] text-white shadow-xs'
                  : 'border border-[#72B193]/60 bg-white text-[#1A3326]/80 hover:bg-[#E0F2E9] hover:text-[#1A3326]'
              }`}
            >
              0{idx + 1}. {poem.title}
            </button>
          );
        })}
      </div>

      {/* Cream Paper Poem Card */}
      <div className="mt-10">
        <AnimatePresence mode="wait">
          <motion.article
            key={currentPoem.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="paper-texture letter-shadow relative mx-auto max-w-2xl rounded-3xl p-8 text-center sm:p-12 md:p-14"
          >
            {/* Delicate floral ornament at top */}
            <div className="mb-4 flex items-center justify-center gap-2 text-xs text-[#1F7A56]">
              <Feather className="h-4 w-4" />
              <span className="font-mono tabular-nums">
                Poem 0{activeIndex + 1} of 0{poems.length}
              </span>
              <span aria-hidden="true">·</span>
              <span>{currentPoem.theme}</span>
            </div>

            <h3 className="font-serif-editorial text-3xl font-semibold text-[#1A3326] sm:text-4xl">
              {currentPoem.title}
            </h3>

            <div className="mx-auto my-6 h-px w-20 bg-[#72B193]" />

            {/* Poem Stanzas */}
            <div className="space-y-6">
              {currentPoem.stanzas.map((stanza, sIdx) => (
                <div key={sIdx} className="space-y-1.5">
                  {stanza.map((line, lIdx) => (
                    <p
                      key={lIdx}
                      className="font-serif-editorial text-xl leading-relaxed text-[#1A3326] sm:text-2xl"
                    >
                      {line}
                    </p>
                  ))}
                </div>
              ))}
            </div>

            {/* Handwritten dedication footer inside card */}
            <div className="mt-8 border-t border-[#72B193]/35 pt-6">
              <p className="font-handwritten text-2xl text-[#1F7A56]">
                {currentPoem.dedication}
              </p>
            </div>
          </motion.article>
        </AnimatePresence>
      </div>

      {/* Interactive Button: Read Another Poem */}
      <div className="mt-10 flex flex-col items-center text-center">
        <button
          type="button"
          onClick={handleReadAnother}
          className="inline-flex items-center gap-2.5 rounded-full bg-[#1F7A56] px-7 py-3.5 text-sm font-medium text-white shadow-md shadow-[#1F7A56]/20 transition-all hover:-translate-y-0.5 hover:bg-[#186245] whitespace-nowrap shrink-0"
        >
          <Sparkles className="h-4 w-4" />
          <span>Read Another Poem</span>
        </button>

        {/* Required closing message */}
        <p className="font-serif-editorial mt-8 flex items-center justify-center gap-1.5 text-xl italic text-[#1A3326]">
          <span>Every word comes from a heart that loves you. ❤️</span>
        </p>
      </div>
    </section>
  );
};
