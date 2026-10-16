import { useId, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import { Link } from "react-router";

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
      className={className}
      initial={reduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
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
  return (
    <div className={`brand-marquee ${variant}`} aria-label={text}>
      <div className="marquee-track" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i}>
            {text}
            <span className="marquee-separator">/</span>
          </span>
        ))}
      </div>
    </div>
  );
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
