import React from 'react';
import { Camera, Heart } from 'lucide-react';
import { MemoryPhoto } from '../data/content';

interface RomanticIllustrationProps {
  theme?: MemoryPhoto['illustrationTheme'] | 'hero-frame' | 'letter-frame';
  label?: string;
  sublabel?: string;
  onUploadClick?: () => void;
}

export const RomanticIllustration: React.FC<RomanticIllustrationProps> = ({
  theme = 'pressed-rose',
  label = 'Our Photograph',
  sublabel = 'Click to add your photo',
  onUploadClick,
}) => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#F4FAF6] via-[#E0F2E9] to-[#BCE3CD]/65 p-6 text-center select-none">
      {/* Subtle botanical corner ornaments */}
      <svg
        className="pointer-events-none absolute top-3 left-3 h-14 w-14 text-[#72B193]/50"
        viewBox="0 0 64 64"
        fill="none"
      >
        <path
          d="M8 56C8 28 28 8 56 8"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M18 32C12 26 14 16 22 14C24 22 20 28 18 32Z"
          fill="currentColor"
          fillOpacity="0.35"
        />
        <path
          d="M32 18C26 12 16 14 14 22C22 24 28 20 32 18Z"
          fill="currentColor"
          fillOpacity="0.35"
        />
      </svg>

      <svg
        className="pointer-events-none absolute right-3 bottom-3 h-14 w-14 rotate-180 text-[#72B193]/50"
        viewBox="0 0 64 64"
        fill="none"
      >
        <path
          d="M8 56C8 28 28 8 56 8"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M18 32C12 26 14 16 22 14C24 22 20 28 18 32Z"
          fill="currentColor"
          fillOpacity="0.35"
        />
      </svg>

      {/* Center bespoke romantic botanical artwork */}
      <div className="relative mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-white/75 shadow-sm ring-1 ring-[#72B193]/40">
        {theme === 'pressed-rose' && (
          <svg className="h-11 w-11 text-[#1F7A56]" viewBox="0 0 48 48" fill="none">
            <path
              d="M24 42V24M24 24C17 24 12 19 12 12C18 12 24 16 24 24ZM24 24C31 24 36 19 36 12C30 12 24 16 24 24Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="24" cy="14" r="5" fill="#BCE3CD" stroke="currentColor" strokeWidth="1.6" />
          </svg>
        )}

        {theme === 'sunset-glow' && (
          <svg className="h-11 w-11 text-[#1F7A56]" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="22" r="9" fill="#BCE3CD" stroke="currentColor" strokeWidth="1.6" />
            <path
              d="M8 32H40M13 37H35"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        )}

        {theme === 'starlight' && (
          <svg className="h-11 w-11 text-[#1F7A56]" viewBox="0 0 48 48" fill="none">
            <path
              d="M24 8L27.5 19.5L39 23L27.5 26.5L24 38L20.5 26.5L9 23L20.5 19.5L24 8Z"
              fill="#BCE3CD"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
        )}

        {theme === 'botanical-leaf' && (
          <svg className="h-11 w-11 text-[#1F7A56]" viewBox="0 0 48 48" fill="none">
            <path
              d="M12 36C12 20 24 10 38 10C38 24 28 36 12 36Z"
              fill="#BCE3CD"
              fillOpacity="0.65"
              stroke="currentColor"
              strokeWidth="1.6"
            />
            <path d="M12 36L30 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        )}

        {theme === 'morning-bloom' && (
          <svg className="h-11 w-11 text-[#1F7A56]" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="4" fill="currentColor" />
            <circle cx="24" cy="14" r="5" stroke="currentColor" strokeWidth="1.5" fill="#E0F2E9" />
            <circle cx="24" cy="34" r="5" stroke="currentColor" strokeWidth="1.5" fill="#E0F2E9" />
            <circle cx="14" cy="24" r="5" stroke="currentColor" strokeWidth="1.5" fill="#E0F2E9" />
            <circle cx="34" cy="24" r="5" stroke="currentColor" strokeWidth="1.5" fill="#E0F2E9" />
          </svg>
        )}

        {(theme === 'two-hearts' || theme === 'hero-frame' || theme === 'letter-frame') && (
          <div className="relative flex items-center justify-center">
            <Heart className="h-9 w-9 fill-[#BCE3CD] text-[#1F7A56]" strokeWidth={1.6} />
            <Heart
              className="-ml-3 mt-3 h-6 w-6 fill-[#1F7A56] text-[#1F7A56]"
              strokeWidth={1.6}
            />
          </div>
        )}
      </div>

      <p className="font-serif-editorial text-xl font-medium text-[#1A3326]">{label}</p>
      <p className="mt-1 max-w-[220px] text-xs leading-relaxed text-[#1A3326]/70">{sublabel}</p>

      {onUploadClick && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onUploadClick();
          }}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-[#72B193] bg-white/90 px-3.5 py-1.5 text-xs font-medium text-[#1A3326] shadow-xs transition-colors hover:bg-[#E0F2E9] hover:text-[#1F7A56] whitespace-nowrap shrink-0"
        >
          <Camera className="h-3.5 w-3.5 text-[#1F7A56]" />
          <span>Upload Photo</span>
        </button>
      )}
    </div>
  );
};
