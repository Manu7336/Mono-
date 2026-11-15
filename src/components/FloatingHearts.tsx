import React, { useMemo } from 'react';
import { motion } from 'motion/react';

interface FloatingHeartsProps {
  count?: number;
  burstKey?: number;
}

export const FloatingHearts: React.FC<FloatingHeartsProps> = ({
  count = 14,
  burstKey = 0,
}) => {
  const ambientHearts = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: `ambient-${i}`,
      left: `${(i * 7.3 + 5) % 94}%`,
      size: 10 + (i % 4) * 5,
      duration: 14 + (i % 6) * 3,
      delay: (i * 1.3) % 10,
      opacity: 0.16 + (i % 3) * 0.08,
      drift: (i % 2 === 0 ? 1 : -1) * (15 + (i % 3) * 10),
    }));
  }, [count]);

  const burstHearts = useMemo(() => {
    if (!burstKey) return [];
    return Array.from({ length: 24 }, (_, i) => ({
      id: `burst-${burstKey}-${i}`,
      left: `${15 + ((i * 29) % 70)}%`,
      size: 14 + (i % 5) * 6,
      duration: 2.6 + (i % 4) * 0.6,
      delay: (i % 6) * 0.08,
      drift: (i % 2 === 0 ? 1 : -1) * (25 + (i % 4) * 18),
    }));
  }, [burstKey]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-10 overflow-hidden"
      aria-hidden="true"
    >
      {ambientHearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '105vh', x: 0, opacity: 0 }}
          animate={{
            y: '-10vh',
            x: [0, heart.drift, -heart.drift * 0.5, 0],
            opacity: [0, heart.opacity, heart.opacity, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ left: heart.left }}
          className="absolute bottom-0 text-[#72B193]"
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}

      {burstHearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ y: '75vh', x: 0, scale: 0.4, opacity: 0.95 }}
          animate={{
            y: '10vh',
            x: heart.drift,
            scale: [0.4, 1.15, 0.9],
            opacity: [0.95, 0.9, 0],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: 'easeOut',
          }}
          style={{ left: heart.left }}
          className="absolute bottom-0 text-[#1F7A56]"
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};
