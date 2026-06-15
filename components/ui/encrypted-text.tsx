"use client";

export interface EncryptedTextProps {
  /** The final, decrypted string to reveal. */
  text: string;
  /** Optional extra classes for the wrapper element. */
  className?: string;
}

/**
 * Scrambles, then decrypts `text` when scrolled into view (once).
 * Used on the About and Projects section headings only.
 * Scramble/reveal animation added in a later step.
 */
export function EncryptedText({ text, className }: EncryptedTextProps) {
  return <span className={className}>{text}</span>;
}
