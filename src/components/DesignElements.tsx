import { useId, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { Link } from "react-router";
import { ScrollRibbon } from './MotionElements';
import { motionTokens } from '../lib/motionTokens';

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={`motion-reveal ${className}`}
      initial={reduced ? false : { opacity: 0.65, y: motionTokens.distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reduced ? motionTokens.duration.fast : motionTokens.duration.scene, delay: reduced ? 0 : delay, ease: motionTokens.ease }}
    >
      {children}
    </motion.div>
  );
}

export function Marquee({
  text = "GOOD FOOD. GOOD MOOD.",
  variant = "",
}: {
  text?: string;
  variant?: string;
}) {
  return <ScrollRibbon text={text} variant={variant} />;
}

export function ArrowLink({
  to,
  children,
  className = "",
}: {
  to: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link to={to} className={`arrow-link ${className}`}>
      <span>{children}</span>
      <span className="arrow-circle">
        <ArrowUpRight size={22} />
      </span>
    </Link>
  );
}

export function Faq({
  items,
}: {
  items: { question: string; answer: string }[];
}) {
  const group = useId();
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details key={item.question} name={group}>
          <summary>
            {item.question}
            <Plus size={21} aria-hidden="true" />
          </summary>
          <p>{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
