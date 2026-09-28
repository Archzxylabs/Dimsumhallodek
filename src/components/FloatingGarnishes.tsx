import React from 'react';
import { motion } from 'framer-motion';

// Sliced Scallion / Daun Bawang Iris (Isometric Ring)
export const ScallionSlice: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-9 h-9 sm:w-11 sm:h-11 drop-shadow-[0_8px_16px_rgba(0,0,0,0.55)] ${className}`}
  >
    <defs>
      <linearGradient id="scallionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#22c55e" />
        <stop offset="60%" stopColor="#15803d" />
        <stop offset="100%" stopColor="#14532d" />
      </linearGradient>
      <linearGradient id="scallionInner" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#d9f99d" />
        <stop offset="100%" stopColor="#84cc16" />
      </linearGradient>
    </defs>
    <ellipse cx="32" cy="32" rx="26" ry="18" fill="url(#scallionGrad)" transform="rotate(-25 32 32)" />
    <ellipse cx="32" cy="32" rx="19" ry="12" fill="url(#scallionInner)" transform="rotate(-25 32 32)" />
    <ellipse cx="32" cy="32" rx="12" ry="7" fill="#14532d" transform="rotate(-25 32 32)" />
  </svg>
);

// Sliced Red Chili Ring with Seed
export const ChiliSlice: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-8 h-8 sm:w-10 sm:h-10 drop-shadow-[0_8px_16px_rgba(0,0,0,0.55)] ${className}`}
  >
    <defs>
      <linearGradient id="chiliGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#ef4444" />
        <stop offset="50%" stopColor="#dc2626" />
        <stop offset="100%" stopColor="#991b1b" />
      </linearGradient>
      <linearGradient id="chiliPulp" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fca5a5" />
        <stop offset="100%" stopColor="#ef4444" />
      </linearGradient>
    </defs>
    <path
      d="M32 8 C46 8, 56 18, 56 32 C56 46, 46 56, 32 56 C18 56, 8 46, 8 32 C8 18, 18 8, 32 8 Z"
      fill="url(#chiliGrad)"
    />
    <ellipse cx="32" cy="32" rx="16" ry="16" fill="url(#chiliPulp)" />
    <ellipse cx="32" cy="32" rx="10" ry="10" fill="#7f1d1d" />
    <circle cx="30" cy="27" r="3.5" fill="#fef08a" stroke="#ca8a04" strokeWidth="1" />
  </svg>
);

// Crispy Fried Shallot / Bawang Goreng Flake
export const FriedShallot: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-10 h-10 sm:w-12 sm:h-12 drop-shadow-[0_8px_14px_rgba(0,0,0,0.55)] ${className}`}
  >
    <defs>
      <linearGradient id="shallotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#fbbf24" />
        <stop offset="40%" stopColor="#d97706" />
        <stop offset="85%" stopColor="#92400e" />
        <stop offset="100%" stopColor="#78350f" />
      </linearGradient>
    </defs>
    <path
      d="M16 42 C12 32, 18 16, 34 12 C44 9, 52 14, 50 24 C48 34, 40 46, 28 50 C20 53, 18 48, 16 42 Z"
      fill="url(#shallotGrad)"
    />
    <path
      d="M22 36 C24 24, 34 18, 42 16"
      stroke="#fef3c7"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

// Roasted Nori Seaweed Flake
export const NoriStrip: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-9 h-9 sm:w-11 sm:h-11 drop-shadow-[0_8px_14px_rgba(0,0,0,0.65)] ${className}`}
  >
    <path
      d="M12 18 L48 10 L52 46 L16 54 Z"
      fill="#1c1917"
      stroke="#292524"
      strokeWidth="1.5"
    />
    <path
      d="M18 22 L44 16 L48 42 L22 48 Z"
      fill="#0c0a09"
    />
    <circle cx="26" cy="28" r="1.5" fill="#44403c" opacity="0.6" />
    <circle cx="36" cy="34" r="1.2" fill="#44403c" opacity="0.6" />
    <circle cx="30" cy="40" r="1.5" fill="#44403c" opacity="0.6" />
  </svg>
);

// Delicate Steam Wisp / Smoke Ribbon
export const SteamWisp: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 40 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-8 h-20 sm:w-10 sm:h-24 md:w-12 md:h-28 opacity-40 ${className}`}
  >
    <path
      d="M20 90 C10 75, 30 60, 20 45 C10 30, 25 15, 18 5"
      stroke="url(#steamGradient)"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <defs>
      <linearGradient id="steamGradient" x1="0" y1="100" x2="0" y2="0" gradientUnits="userSpaceOnUse">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
        <stop offset="40%" stopColor="#ffffff" stopOpacity="0.8" />
        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
      </linearGradient>
    </defs>
  </svg>
);

interface FloatingGarnishesProps {
  menuId: string;
  direction: number; // 1 for next, -1 for prev
}

interface GarnishItemConfig {
  id: string;
  element: React.ReactNode;
  positionClass: string;
  floatDuration: number;
  floatY: [number, number, number];
  floatRotate: [number, number, number];
}

export const FloatingGarnishes: React.FC<FloatingGarnishesProps> = ({
  menuId,
  direction,
}) => {
  // Customized garnishes set for each menu profile, anchored directly around the plate
  const getGarnishesForMenu = (id: string): GarnishItemConfig[] => {
    switch (id) {
      case 'dimsum-mix-mentai-tartar':
        return [
          {
            id: 'mentai-scallion-1',
            element: <ScallionSlice />,
            positionClass: '-top-4 -right-4 sm:-top-8 sm:-right-8 md:-top-10 md:-right-10',
            floatDuration: 5.5,
            floatY: [-10, 12, -10],
            floatRotate: [-15, 18, -15],
          },
          {
            id: 'mentai-chili-1',
            element: <ChiliSlice />,
            positionClass: 'bottom-4 -right-6 sm:bottom-6 sm:-right-10 md:bottom-8 md:-right-12',
            floatDuration: 4.8,
            floatY: [12, -14, 12],
            floatRotate: [20, -18, 20],
          },
          {
            id: 'mentai-shallot-1',
            element: <FriedShallot />,
            positionClass: '-bottom-6 left-6 sm:-bottom-8 sm:left-10 md:-bottom-10 md:left-14',
            floatDuration: 6.2,
            floatY: [-8, 10, -8],
            floatRotate: [-10, 15, -10],
          },
          {
            id: 'mentai-scallion-2',
            element: <ScallionSlice className="scale-85" />,
            positionClass: '-top-6 -left-4 sm:-top-8 sm:-left-6 md:-top-10 md:-left-8',
            floatDuration: 5.0,
            floatY: [10, -12, 10],
            floatRotate: [12, -15, 12],
          },
          {
            id: 'mentai-steam-1',
            element: <SteamWisp />,
            positionClass: '-top-16 sm:-top-22 md:-top-26 left-1/2 -translate-x-1/2',
            floatDuration: 3.5,
            floatY: [0, -20, 0],
            floatRotate: [0, 0, 0],
          }
        ];

      case 'dimsum-carbonara':
        return [
          {
            id: 'carb-nori-1',
            element: <NoriStrip />,
            positionClass: '-top-6 -right-6 sm:-top-8 sm:-right-10 md:-top-10 md:-right-12',
            floatDuration: 5.8,
            floatY: [-10, 12, -10],
            floatRotate: [14, -14, 14],
          },
          {
            id: 'carb-nori-2',
            element: <NoriStrip className="scale-80" />,
            positionClass: 'bottom-6 -right-4 sm:bottom-8 sm:-right-8 md:bottom-10 md:-right-10',
            floatDuration: 6.5,
            floatY: [12, -12, 12],
            floatRotate: [-18, 14, -18],
          },
          {
            id: 'carb-shallot-1',
            element: <FriedShallot />,
            positionClass: '-bottom-6 left-6 sm:-bottom-8 sm:left-8 md:-bottom-10 md:left-12',
            floatDuration: 5.2,
            floatY: [-8, 10, -8],
            floatRotate: [15, -10, 15],
          },
          {
            id: 'carb-scallion-1',
            element: <ScallionSlice />,
            positionClass: '-top-6 -left-6 sm:-top-8 sm:-left-8 md:-top-10 md:-left-10',
            floatDuration: 5.5,
            floatY: [8, -10, 8],
            floatRotate: [-12, 15, -12],
          },
          {
            id: 'carb-steam-1',
            element: <SteamWisp />,
            positionClass: '-top-16 sm:-top-22 md:-top-26 left-[46%] -translate-x-1/2',
            floatDuration: 3.8,
            floatY: [0, -22, 0],
            floatRotate: [0, 0, 0],
          }
        ];

      case 'dimsum-hot-lava-mentai':
        return [
          {
            id: 'lava-chili-1',
            element: <ChiliSlice className="scale-110" />,
            positionClass: '-top-6 -right-6 sm:-top-8 sm:-right-10 md:-top-10 md:-right-12',
            floatDuration: 4.2,
            floatY: [-14, 14, -14],
            floatRotate: [25, -20, 25],
          },
          {
            id: 'lava-chili-2',
            element: <ChiliSlice />,
            positionClass: 'bottom-4 -right-6 sm:bottom-6 sm:-right-10 md:bottom-8 md:-right-12',
            floatDuration: 4.6,
            floatY: [12, -16, 12],
            floatRotate: [-22, 18, -22],
          },
          {
            id: 'lava-scallion-1',
            element: <ScallionSlice />,
            positionClass: '-top-6 -left-6 sm:-top-8 sm:-left-8 md:-top-10 md:-left-10',
            floatDuration: 5.5,
            floatY: [-10, 10, -10],
            floatRotate: [-15, 15, -15],
          },
          {
            id: 'lava-shallot-1',
            element: <FriedShallot className="scale-90" />,
            positionClass: '-bottom-6 left-6 sm:-bottom-8 sm:left-8 md:-bottom-10 md:left-10',
            floatDuration: 6.0,
            floatY: [10, -10, 10],
            floatRotate: [10, -15, 10],
          },
          {
            id: 'lava-steam-1',
            element: <SteamWisp className="opacity-55 scale-110" />,
            positionClass: '-top-18 sm:-top-24 md:-top-28 left-1/2 -translate-x-1/2',
            floatDuration: 3.0,
            floatY: [0, -25, 0],
            floatRotate: [0, 0, 0],
          }
        ];

      case 'dimsum-cake-tower':
        return [
          {
            id: 'cake-shallot-1',
            element: <FriedShallot />,
            positionClass: '-top-8 -right-6 sm:-top-10 sm:-right-10 md:-top-12 md:-right-12',
            floatDuration: 5.8,
            floatY: [-10, 12, -10],
            floatRotate: [20, -15, 20],
          },
          {
            id: 'cake-nori-1',
            element: <NoriStrip />,
            positionClass: 'bottom-4 -right-6 sm:bottom-6 sm:-right-10 md:bottom-8 md:-right-12',
            floatDuration: 6.2,
            floatY: [10, -12, 10],
            floatRotate: [-15, 12, -15],
          },
          {
            id: 'cake-scallion-1',
            element: <ScallionSlice />,
            positionClass: '-top-6 -left-6 sm:-top-8 sm:-left-8 md:-top-10 md:-left-10',
            floatDuration: 5.0,
            floatY: [-8, 12, -8],
            floatRotate: [-20, 20, -20],
          },
          {
            id: 'cake-chili-1',
            element: <ChiliSlice />,
            positionClass: '-bottom-6 left-6 sm:-bottom-8 sm:left-8 md:-bottom-10 md:left-10',
            floatDuration: 4.8,
            floatY: [12, -10, 12],
            floatRotate: [18, -18, 18],
          },
          {
            id: 'cake-steam-1',
            element: <SteamWisp />,
            positionClass: '-top-16 sm:-top-22 md:-top-26 left-1/2 -translate-x-1/2',
            floatDuration: 3.2,
            floatY: [0, -25, 0],
            floatRotate: [0, 0, 0],
          }
        ];

      case 'dimsum-platter-16':
      default:
        return [
          {
            id: 'plat-scallion-1',
            element: <ScallionSlice />,
            positionClass: '-top-6 -right-6 sm:-top-8 sm:-right-10 md:-top-10 md:-right-12',
            floatDuration: 5.6,
            floatY: [-12, 10, -12],
            floatRotate: [15, -15, 15],
          },
          {
            id: 'plat-chili-1',
            element: <ChiliSlice />,
            positionClass: 'bottom-4 -right-6 sm:bottom-6 sm:-right-10 md:bottom-8 md:-right-12',
            floatDuration: 4.8,
            floatY: [12, -12, 12],
            floatRotate: [-20, 20, -20],
          },
          {
            id: 'plat-shallot-1',
            element: <FriedShallot />,
            positionClass: '-top-6 -left-6 sm:-top-8 sm:-left-8 md:-top-10 md:-left-10',
            floatDuration: 6.2,
            floatY: [-10, 10, -10],
            floatRotate: [18, -12, 18],
          },
          {
            id: 'plat-nori-1',
            element: <NoriStrip />,
            positionClass: '-bottom-6 left-6 sm:-bottom-8 sm:left-8 md:-bottom-10 md:left-10',
            floatDuration: 6.5,
            floatY: [10, -10, 10],
            floatRotate: [-12, 15, -12],
          },
          {
            id: 'plat-steam-1',
            element: <SteamWisp />,
            positionClass: '-top-16 sm:-top-22 md:-top-26 left-1/2 -translate-x-1/2',
            floatDuration: 3.5,
            floatY: [0, -22, 0],
            floatRotate: [0, 0, 0],
          }
        ];
    }
  };

  const garnishes = getGarnishesForMenu(menuId);

  return (
    <div className="absolute inset-0 pointer-events-none z-20 select-none">
      {garnishes.map((item) => (
        <motion.div
          key={item.id}
          initial={{
            opacity: 0,
            scale: 0.5,
            x: direction >= 0 ? 40 : -40,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
          }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`absolute ${item.positionClass}`}
        >
          {/* Inner Continuous Physics Idle Floating Loop */}
          <motion.div
            animate={{
              y: item.floatY,
              rotate: item.floatRotate,
            }}
            transition={{
              duration: item.floatDuration,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {item.element}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};
