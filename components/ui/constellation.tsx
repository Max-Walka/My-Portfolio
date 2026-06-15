"use client";

export interface ConstellationProps {
  /** Number of drifting particles. */
  particleCount?: number;
  /** Max distance (px) between two particles for a connecting line to draw. */
  lineDistance?: number;
  /** Opacity of each particle. */
  particleOpacity?: number;
  /** Max opacity of connecting lines (scales with proximity). */
  lineOpacity?: number;
}

/**
 * Ambient constellation canvas for the hero background.
 * Pure canvas (no external library); implementation added in a later step.
 */
export function Constellation({
  particleCount = 55,
  lineDistance = 110,
  particleOpacity = 0.2,
  lineOpacity = 0.05,
}: ConstellationProps = {}) {
  void particleCount;
  void lineDistance;
  void particleOpacity;
  void lineOpacity;
  return null;
}
