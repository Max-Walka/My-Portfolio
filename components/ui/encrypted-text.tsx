"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";

const SCRAMBLE_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!<>-_\\/[]{}=+*^?#@";

function randomChar() {
  return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
}

export interface EncryptedTextProps {
  /** The final, decrypted string to reveal. */
  text: string;
  /** Classes for the wrapper element. */
  className?: string;
  /** Classes applied to characters still scrambling. */
  encryptedClassName?: string;
  /** Classes applied to characters once revealed. */
  revealedClassName?: string;
  /** Delay between each character being revealed, in ms. */
  revealDelayMs?: number;
  /** Delay (ms) after coming into view before the reveal begins. The text
   * scrambles during this wait — use it to sequence multiple instances. */
  startDelayMs?: number;
}

/**
 * Scrambles, then decrypts `text` left-to-right when scrolled into view (once).
 * Renders the real text until in view so SSR and the first client paint match
 * (no hydration mismatch); the scramble only begins after mount.
 */
export function EncryptedText({
  text,
  className,
  encryptedClassName,
  revealedClassName,
  revealDelayMs = 200,
  startDelayMs = 20,
}: EncryptedTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [started, setStarted] = useState(startDelayMs <= 0);
  const [revealedCount, setRevealedCount] = useState(0);
  // Bumped on an interval to re-randomise the still-scrambling characters.
  const [, setTick] = useState(0);

  const done = revealedCount >= text.length;

  // Hold the reveal until startDelayMs has elapsed (text scrambles meanwhile).
  useEffect(() => {
    if (!inView || started) return;
    const id = setTimeout(() => setStarted(true), startDelayMs);
    return () => clearTimeout(id);
  }, [inView, started, startDelayMs]);

  // Reveal one more character every revealDelayMs.
  useEffect(() => {
    if (!inView || !started || done) return;
    const id = setTimeout(() => setRevealedCount((c) => c + 1), revealDelayMs);
    return () => clearTimeout(id);
  }, [inView, started, done, revealedCount, revealDelayMs]);

  // Re-randomise the scrambled characters while the effect is running.
  useEffect(() => {
    if (!inView || done) return;
    const id = setInterval(() => setTick((t) => t + 1), 55);
    return () => clearInterval(id);
  }, [inView, done]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {text.split("").map((char, i) => {
        if (char === " ") {
          return (
            <span key={i} aria-hidden="true">
              {" "}
            </span>
          );
        }
        const scrambling = inView && i >= revealedCount;
        return (
          <span
            key={i}
            aria-hidden="true"
            className={scrambling ? encryptedClassName : revealedClassName}
          >
            {scrambling ? randomChar() : char}
          </span>
        );
      })}
    </span>
  );
}
