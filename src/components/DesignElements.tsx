import type { ReactNode } from "react";
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

export function Spark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="m50 0 9 31 26-16-16 26 31 9-31 9 16 26-26-16-9 31-9-31-26 16 16-26L0 50l31-9-16-26 26 16Z" />
    </svg>
  );
}

export function Dumpling({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 110"
      className={className}
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M15 64C22 17 49 5 70 8c30 0 52 23 56 58 4 24-16 35-55 35-43 0-62-12-56-37Z"
        fill="#FFF9ED"
        stroke="#35462B"
        strokeWidth="3"
      />
      <path
        d="M25 47c7-1 14 2 21 9M44 22c4 8 7 18 7 28M70 12v33M96 23c-4 8-7 17-7 27m26-2c-9 0-17 4-24 9"
        stroke="#35462B"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="51" cy="72" r="3" fill="#35462B" />
      <circle cx="88" cy="72" r="3" fill="#35462B" />
      <path
        d="M62 79c5 5 12 5 17 0"
        stroke="#35462B"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <ellipse cx="40" cy="79" rx="5" ry="3" fill="#E96B2B" opacity=".5" />
      <ellipse cx="100" cy="79" rx="5" ry="3" fill="#E96B2B" opacity=".5" />
    </svg>
  );
}

export function BouquetArt() {
  return (
    <svg
      viewBox="0 0 440 460"
      className="bouquet-art"
      role="img"
      aria-label="Ilustrasi bouquet dimsum dengan pita"
    >
      <path d="m74 205 290-22-133 257Z" fill="#35462B" />
      <path d="m67 209 164 230 10-208Z" fill="#E96B2B" />
      <path d="m241 229 129-29-139 240Z" fill="#CB5B25" />
      <path d="m80 194 141 67 137-69-110-40Z" fill="#F6C94B" />
      {[
        [124, 133],
        [212, 109],
        [298, 139],
        [170, 198],
        [255, 201],
      ].map(([x, y], i) => (
        <g
          key={i}
          transform={`translate(${x - 49},${y - 39}) rotate(${i % 2 === 0 ? -12 : 10},49,39)`}
        >
          <path
            d="M6 46C10 9 36 0 49 3c25 0 43 18 45 45 3 18-12 26-45 26C18 74 1 66 6 46Z"
            fill="#FFF9ED"
            stroke="#35462B"
            strokeWidth="2.5"
          />
          <path
            d="m21 22 14 18m14-35v31m27-13L64 40"
            stroke="#35462B"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <circle cx="38" cy="51" r="2.5" fill="#35462B" />
          <circle cx="60" cy="51" r="2.5" fill="#35462B" />
          <path
            d="M44 57q6 6 12 0"
            stroke="#35462B"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </g>
      ))}
      <path
        d="M230 325c-75-65-99 17-15 14-19 9-29 30-27 46m42-60c70-66 102 15 17 14 23 13 31 29 31 44"
        stroke="#FFF9ED"
        strokeWidth="12"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="231" cy="333" r="12" fill="#F6C94B" />
    </svg>
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
            <Spark />
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
  return (
    <div className="faq-list">
      {items.map((item) => (
        <details key={item.question}>
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
