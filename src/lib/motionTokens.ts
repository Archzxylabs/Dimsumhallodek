export const motionTokens = {
  duration: { fast: 0.18, normal: 0.42, scene: 0.75 },
  ease: [0.22, 1, 0.36, 1] as const,
  stagger: 0.07,
  distance: 22,
};

export const motionSprings = {
  pointer: { stiffness: 180, damping: 24, mass: 0.7 },
  navigation: { type: 'spring' as const, stiffness: 340, damping: 32 },
};
