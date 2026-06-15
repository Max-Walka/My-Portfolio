"use client";

import { useEffect, useRef } from "react";

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

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

const MAX_VELOCITY = 0.25;

/**
 * Ambient constellation canvas for the hero background.
 * Pure canvas — no external library. Low opacity, slow drift; supports the
 * hero without competing with it.
 */
export function Constellation({
  particleCount = 55,
  lineDistance = 110,
  particleOpacity = 0.2,
  lineOpacity = 0.05,
}: ConstellationProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const particles: Particle[] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 2 * MAX_VELOCITY,
          vy: (Math.random() - 0.5) * 2 * MAX_VELOCITY,
          r: 0.4 + Math.random() * 1.2,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x <= 0) {
          p.x = 0;
          p.vx *= -1;
        } else if (p.x >= width) {
          p.x = width;
          p.vx *= -1;
        }
        if (p.y <= 0) {
          p.y = 0;
          p.vy *= -1;
        } else if (p.y >= height) {
          p.y = height;
          p.vy *= -1;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${particleOpacity})`;
        ctx.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < lineDistance) {
            const alpha = (1 - dist / lineDistance) * lineOpacity;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      frame = requestAnimationFrame(draw);
    };

    const handleResize = () => {
      resize();
      seed();
    };

    resize();
    seed();
    draw();
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleResize);
    };
  }, [particleCount, lineDistance, particleOpacity, lineOpacity]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
