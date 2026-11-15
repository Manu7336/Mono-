import React, { useState } from 'react';
import { Menu, X, PenLine } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface NavigationProps {
  projectName: string;
  onOpenCustomise: () => void;
}

const NAV_ITEMS = [
  { label: 'Memories', href: '#memories' },
  { label: 'Videos', href: '#video-frames' },
  { label: 'Our Story', href: '#our-story' },
  { label: 'My Letter', href: '#my-letter' },
];

export const Navigation: React.FC<NavigationProps> = ({
  projectName,
  onOpenCustomise,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[#72B193]/35 bg-[#F4FAF6]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-3.5 lg:px-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#memories"
          className="font-serif-editorial text-lg font-semibold tracking-wider text-[#1A3326] sm:text-xl whitespace-nowrap shrink-0"
        >
          {projectName}
        </a>

        {/* Zone 2: Clean single-line text navigation links (Tablet & Desktop) */}
        <nav
          aria-label="Romantic chapters"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-[#1A3326]/80"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="border-b border-transparent py-0.5 transition-colors hover:border-[#1F7A56] hover:text-[#1F7A56] whitespace-nowrap shrink-0"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary action + Mobile Menu Toggle */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenCustomise}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#72B193] bg-white px-3 py-1.5 text-xs font-medium text-[#1A3326] transition-colors hover:bg-[#E0F2E9] hover:text-[#1F7A56] sm:px-3.5 whitespace-nowrap shrink-0"
          >
            <PenLine className="h-3.5 w-3.5 text-[#1F7A56]" />
            <span>Personalise</span>
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close chapters menu' : 'Open chapters menu'}
            aria-expanded={mobileMenuOpen}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#72B193] bg-white text-[#1A3326] transition-colors hover:bg-[#E0F2E9] hover:text-[#1F7A56] md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Chapter Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            aria-label="Mobile chapters"
            className="overflow-hidden border-t border-[#72B193]/25 bg-[#F4FAF6]/98 px-4 py-3 md:hidden"
          >
            <div className="grid grid-cols-2 gap-1.5">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-2.5 text-center text-sm font-medium text-[#1A3326] transition-colors hover:bg-[#E0F2E9] hover:text-[#1F7A56]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};
