import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { motionSprings, motionTokens } from '../lib/motionTokens';

function useFinePointer() {
  const [fine, setFine] = useState(false);
  useEffect(() => {
    const media = matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setFine(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return fine;
}

export function Headline({ lines, as = 'h2', className = '', id }: {
  lines: { text: string; accent?: 'orange' | 'yellow' }[];
  as?: 'h1' | 'h2'; className?: string; id?: string;
}) {
  const reduced = useReducedMotion();
  const Tag = as === 'h1' ? motion.h1 : motion.h2;
  return <Tag id={id} className={`motion-heading ${className}`} initial={reduced ? false : 'rest'} whileInView="read" viewport={{ once: true, amount: 0.25 }} variants={{ rest: {}, read: { transition: { staggerChildren: motionTokens.stagger } } }}>
    {lines.map((line, index) => <span className="motion-line" key={index}>
      <motion.span className={`motion-line-inner${line.accent ? ` text-${line.accent}` : ''}`} variants={{ rest: { y: '110%' }, read: { y: 0, transition: { duration: motionTokens.duration.scene, ease: motionTokens.ease } } }}>{line.text}{index < lines.length - 1 ? ' ' : ''}</motion.span>
    </span>)}
  </Tag>;
}

// Native scroll is the timeline; each scene keeps its place in the document.
export function ScrollScene({ children, className = '', depth = 18, turn = 1 }: {
  children: ReactNode; className?: string; depth?: number; turn?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [depth * (fine ? 1 : 0.4), -depth * (fine ? 1 : 0.4)]);
  const rotate = useTransform(scrollYProgress, [0, 1], [turn, -turn]);
  return <motion.div ref={ref} className={`scroll-scene ${className}`} style={reduced ? undefined : { y, rotate }} initial={reduced ? false : { scale: 0.97 }} whileInView={{ scale: 1 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: motionTokens.duration.scene, ease: motionTokens.ease }}>{children}</motion.div>;
}

export function StaggerCard({ children, className = '', index = 0 }: { children: ReactNode; className?: string; index?: number }) {
  const reduced = useReducedMotion();
  return <motion.article className={`motion-card ${className}`} initial={reduced ? false : { y: motionTokens.distance, opacity: 0.65 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: motionTokens.duration.normal, delay: Math.min(index, 3) * motionTokens.stagger, ease: motionTokens.ease }}>{children}</motion.article>;
}

export function TiltCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  const fine = useFinePointer();
  const bounds = useRef<DOMRect | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(x, motionSprings.pointer);
  const rotateY = useSpring(y, motionSprings.pointer);
  const reset = () => { x.set(0); y.set(0); bounds.current = null; };
  useEffect(() => { if (reduced || !fine) reset(); }, [reduced, fine]);
  return <motion.div className={`motion-tilt ${className}`} style={reduced || !fine ? undefined : { rotateX, rotateY, transformPerspective: 900 }} onPointerEnter={event => { if (fine && !reduced) bounds.current = event.currentTarget.getBoundingClientRect(); }} onPointerMove={event => {
    const rect = bounds.current;
    if (!fine || reduced || !rect) return;
    x.set(Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height - 0.5)) * -5);
    y.set(Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width - 0.5)) * 7);
  }} onPointerLeave={reset} onPointerCancel={reset}>{children}</motion.div>;
}

export function ScrollRibbon({ text, variant = '' }: { text: string; variant?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const x = useTransform(scrollYProgress, [0, 1], ['-5%', '-24%']);
  return <div ref={ref} className={`brand-marquee motion-ribbon ${variant}`} aria-label={text}>
    <motion.div className="marquee-track" aria-hidden="true" style={reduced ? undefined : { x }}>
      {Array.from({ length: 4 }, (_, index) => <span key={index}>{text}<span className="marquee-separator">/</span></span>)}
    </motion.div>
  </div>;
}

export function PageProgress() {
  const { scrollYProgress } = useScroll();
  return <motion.div className="reading-progress" aria-hidden="true" style={{ scaleX: scrollYProgress }} />;
}
