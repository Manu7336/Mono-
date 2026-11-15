import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Expand, Plus } from 'lucide-react';
import { MemoryPhoto } from '../data/content';
import { RomanticIllustration } from './RomanticIllustration';
import { PhotoLightbox } from './PhotoLightbox';

interface PhotoGalleryProps {
  memories: MemoryPhoto[];
  onUpdatePhoto: (photoId: string, imageUrl: string, caption?: string) => void;
  onAddMemory: (newPhoto: MemoryPhoto) => void;
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({
  memories,
  onUpdatePhoto,
  onAddMemory,
}) => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [uploadTargetId, setUploadTargetId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const triggerUpload = (photoId: string) => {
    setUploadTargetId(photoId);
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !uploadTargetId) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        if (uploadTargetId === '__NEW__') {
          const nextNum = memories.length + 1;
          onAddMemory({
            id: `mem-${Date.now()}`,
            title: `Moment ${String(nextNum).padStart(2, '0')}`,
            caption: '',
            dateNote: '',
            imageUrl: reader.result,
            aspect: nextNum % 2 === 0 ? 'portrait' : 'square',
            rotation: nextNum % 2 === 0 ? 1.6 : -1.6,
            illustrationTheme: 'pressed-rose',
          });
        } else {
          onUpdatePhoto(uploadTargetId, reader.result);
        }
      }
      setUploadTargetId(null);
      e.target.value = '';
    };
    reader.readAsDataURL(file);
  };

  const handlePrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + memories.length) % memories.length);
  };

  const handleNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % memories.length);
  };

  return (
    <section
      id="memories"
      className="soft-section-gradient relative py-14 sm:py-20 lg:py-28"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload memory photograph"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-serif-editorial text-base italic text-[#1F7A56] sm:text-lg">
            Chapter I · Scrapbook
          </p>
          <h2 className="font-serif-editorial mt-1 text-3xl font-semibold text-[#1A3326] sm:text-4xl lg:text-5xl text-balance">
            Our Little Moments.
          </h2>
          <p className="font-serif-editorial mt-2.5 text-lg italic text-[#1A3326]/85 sm:mt-3 sm:text-xl lg:text-2xl">
            &ldquo;Every picture tells a story. And I love ours.&rdquo;
          </p>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3 sm:mt-6">
            <button
              type="button"
              onClick={() => triggerUpload('__NEW__')}
              className="inline-flex items-center gap-2 rounded-full border border-[#72B193] bg-white px-5 py-2.5 text-xs font-medium text-[#1A3326] shadow-2xs transition-colors hover:bg-[#E0F2E9] hover:text-[#1F7A56] whitespace-nowrap shrink-0"
            >
              <Plus className="h-4 w-4 text-[#1F7A56]" />
              <span>Add New Polaroid Memory</span>
            </button>
          </div>
        </div>

        {/* Scrapbook Polaroid Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-14 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-9 xl:grid-cols-4">
          {memories.map((photo, index) => {
            const aspectClass =
              photo.aspect === 'portrait'
                ? 'aspect-4/5'
                : photo.aspect === 'landscape'
                  ? 'aspect-4/3'
                  : 'aspect-square';

            return (
              <motion.article
                key={photo.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
                style={{ rotate: `${photo.rotation}deg` }}
                whileHover={{ rotate: 0, y: -6 }}
                onClick={() => setLightboxIndex(index)}
                className="polaroid-shadow group relative flex cursor-pointer flex-col justify-between rounded-3xl border border-[#72B193]/45 bg-white p-3.5 transition-shadow duration-300 hover:shadow-xl sm:p-4"
              >
                {/* Decorative top scrapbook washi tape */}
                <div
                  className="pointer-events-none absolute -top-2.5 left-1/2 h-5 w-24 -translate-x-1/2 rounded-xs bg-[#E0F2E9]/90 ring-1 ring-[#72B193]/35"
                  aria-hidden="true"
                />

                {/* Photograph Frame */}
                <div
                  className={`relative w-full overflow-hidden rounded-2xl bg-[#F4FAF6] ${aspectClass}`}
                >
                  {photo.imageUrl ? (
                    <img
                      src={photo.imageUrl}
                      alt={photo.title || 'Memory photograph'}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <RomanticIllustration
                      theme={photo.illustrationTheme}
                      label={photo.title}
                      sublabel="Tap 'Upload Photo' to place your real photo here"
                      onUploadClick={() => triggerUpload(photo.id)}
                    />
                  )}

                  {/* Quick Hover Actions */}
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 transition-opacity group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        triggerUpload(photo.id);
                      }}
                      title="Upload or change photo"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1A3326] shadow-xs transition-colors hover:bg-[#E0F2E9] hover:text-[#1F7A56] sm:h-8 sm:w-8"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setLightboxIndex(index);
                      }}
                      title="Expand memory"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1A3326] shadow-xs transition-colors hover:bg-[#E0F2E9] hover:text-[#1F7A56] sm:h-8 sm:w-8"
                    >
                      <Expand className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      <PhotoLightbox
        photos={memories}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrev={handlePrev}
        onNext={handleNext}
        onUploadForPhoto={(photoId) => triggerUpload(photoId)}
      />
    </section>
  );
};
