import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface FallingPetalsProps {
  count?: number;
}

export const FallingPetals: React.FC<FallingPetalsProps> = ({ count = 12 }) => {
  const petals = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: `petal-${i}`,
      left: `${(i * 8.7 + 3) % 96}%`,
      size: 12 + (i % 4) * 4,
      duration: 16 + (i % 5) * 3.5,
      delay: (i * 1.7) % 12,
      sway: (i % 2 === 0 ? 1 : -1) * (24 + (i % 3) * 12),
      rotate: (i % 2 === 0 ? 1 : -1) * 220,
      opacity: 0.22 + (i % 3) * 0.1,
    }));
  }, [count]);

  const sparkles = useMemo(() => {
    return Array.from({ length: 10 }, (_, i) => ({
      id: `sparkle-${i}`,
      left: `${(i * 10.5 + 8) % 92}%`,
      top: `${(i * 9.3 + 10) % 86}%`,
      duration: 3.5 + (i % 3) * 1.2,
      delay: (i * 0.7) % 4,
    }));
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      {/* Slowly falling rose petals */}
      {petals.map((petal) => (
        <motion.div
          key={petal.id}
          initial={{ y: '-8vh', x: 0, rotate: 0, opacity: 0 }}
          animate={{
            y: '108vh',
            x: [0, petal.sway, -petal.sway * 0.6, petal.sway * 0.3],
            rotate: [0, petal.rotate * 0.5, petal.rotate],
            opacity: [0, petal.opacity, petal.opacity, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ left: petal.left }}
          className="absolute top-0 text-[#BCE3CD]"
        >
          <svg
            width={petal.size}
            height={petal.size * 1.25}
            viewBox="0 0 24 30"
            fill="currentColor"
          >
            <path d="M12 1C6 7 2 13 2 19.5C2 25.2 6.5 29 12 29C17.5 29 22 25.2 22 19.5C22 13 18 7 12 1Z" />
          </svg>
        </motion.div>
      ))}

      {/* Subtle glowing romantic particles */}
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          animate={{
            opacity: [0.1, 0.5, 0.1],
            scale: [0.8, 1.15, 0.8],
          }}
          transition={{
            duration: sparkle.duration,
            delay: sparkle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{ left: sparkle.left, top: sparkle.top }}
          className="absolute h-2 w-2 rounded-full bg-[#BCE3CD]/60 blur-[1px]"
        />
      ))}
    </div>
  );
};
