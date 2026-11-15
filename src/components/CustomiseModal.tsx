import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Copy, Heart, RotateCcw, X } from 'lucide-react';
import { RomanticContent } from '../data/content';

interface CustomiseModalProps {
  isOpen: boolean;
  content: RomanticContent;
  onClose: () => void;
  onUpdateCreatorName: (name: string) => void;
  onResetAllCustomisations: () => void;
}

export const CustomiseModal: React.FC<CustomiseModalProps> = ({
  isOpen,
  content,
  onClose,
  onUpdateCreatorName,
  onResetAllCustomisations,
}) => {
  const [nameInput, setNameInput] = useState(content.creatorName);
  const [copied, setCopied] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (nameInput.trim()) {
      onUpdateCreatorName(nameInput.trim());
    }
    onClose();
  };

  const handleCopyConfig = () => {
    const exportedCode = `// Paste into src/data/content.ts\nexport const INITIAL_CONTENT = ${JSON.stringify(
      content,
      null,
      2
    )};`;
    navigator.clipboard.writeText(exportedCode).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A3326]/65 p-4 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
          aria-label="Personalise MONO MONO"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
            className="paper-texture letter-shadow relative max-h-[90dvh] w-full max-w-lg overflow-y-auto rounded-3xl p-5 sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-5 right-5 flex h-9 w-9 items-center justify-center rounded-full border border-[#72B193]/50 bg-white text-[#1A3326] hover:bg-[#E0F2E9]"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-medium tracking-wider text-[#1F7A56] uppercase">
              <Heart className="h-3.5 w-3.5 fill-[#1F7A56]" />
              <span>Personalise Your Gift</span>
            </div>

            <h3 className="font-serif-editorial mt-1 text-3xl font-semibold text-[#1A3326]">
              Customise MONO MONO
            </h3>
            <p className="mt-1.5 text-xs leading-relaxed text-[#1A3326]/75">
              All photos, captions, timeline milestones, and your signature name are saved in your browser automatically. You can also copy your updated config directly into <code className="rounded bg-[#E0F2E9] px-1 py-0.5 text-[#1F7A56]">src/data/content.ts</code> before deploying to GitHub &amp; Vercel.
            </p>

            <form onSubmit={handleSave} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#1A3326]">
                  Your Name (replaces [MY NAME] on letters)
                </label>
                <input
                  type="text"
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder="Enter your name..."
                  className="mt-1.5 w-full rounded-xl border border-[#72B193] bg-white px-3.5 py-2.5 text-sm text-[#1A3326] focus:border-[#1F7A56] focus:outline-none"
                />
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleCopyConfig}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#72B193] bg-white px-3.5 py-2 text-xs font-medium text-[#1A3326] transition-colors hover:bg-[#E0F2E9] whitespace-nowrap shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#1F7A56]" />
                      <span>Copied for content.ts!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[#1F7A56]" />
                      <span>Copy Config for Vercel</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onResetAllCustomisations}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-[#72B193]/60 bg-white px-3 py-2 text-xs font-medium text-[#1A3326]/75 transition-colors hover:bg-[#E0F2E9] hover:text-[#1F7A56] whitespace-nowrap shrink-0"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  <span>Reset Defaults</span>
                </button>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-[#72B193]/35 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl border border-[#72B193] bg-white px-4 py-2 text-xs font-medium text-[#1A3326] whitespace-nowrap shrink-0"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-[#1F7A56] px-5 py-2 text-xs font-medium text-white shadow-xs transition-colors hover:bg-[#186245] whitespace-nowrap shrink-0"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
