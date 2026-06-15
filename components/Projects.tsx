"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { EncryptedText } from "@/components/ui/encrypted-text";

interface Project {
  title: string;
  description: string;
  tags: string[];
  /** Path to a screenshot in /public, e.g. "/images/docbase.png". Optional —
   * falls back to the placeholder label when omitted. */
  image?: string;
  /** External link to the live project. When set, the title becomes a link. */
  url?: string;
}

// Ordered most-important first.
const projects: Project[] = [
  {
    title: "DOCBase",
    description:
      "RAG pipeline built from scratch in Python. Voyage AI embeddings, Supabase pgvector, Anthropic Claude API, MCP server for Claude Desktop integration. FastAPI + Docker backend on Railway, Next.js frontend on Vercel. 100% retrieval accuracy.",
    image: "/images/DOCBaseUI.PNG",
    tags: [
      "Python",
      "FastAPI",
      "Next.js",
      "Docker",
      "Railway",
      "VoyageAI",
      "Vercel",
      "MCP",
    ],
  },
  {
    title: "Spinal Cord Injury Assessment Tool",
    description:
      "A spinal cord injury assessment tool, built for clinicians at Middlemore Hospital. Replacing error-prone paper forms with a fast, auditable digital workflow. Made for my capstone project at AUT (image contains mock data)",
    image: "/images/Spinal.PNG",
    tags: ["Next.js", "Supabase", "Vercel", "ISNCSCI", "TypeScript"],
  },
  {
    title: "OSRS Loot Simulator",
    description:
      "Pulls live drop tables and Grand Exchange prices to simulate thousands of kills and project realistic loot value over time.",
    url: "https://osrs-loot-simulator.vercel.app/",
    image: "/images/OSRS.PNG",
    tags: ["Next.js", "TypeScript", "Redis", "Vercel"],
  },
];

const GAP = 16;
const SPEED = 0.3;

function ProjectCarousel({
  projects,
  direction = "rtl",
}: {
  projects: Project[];
  direction?: "ltr" | "rtl";
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(false);
  const draggingRef = useRef(false);
  const strideRef = useRef(0);
  const posRef = useRef(0);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);
  const movedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const render = () => {
      // Drive motion with a transform (sub-pixel, GPU) rather than scrollLeft,
      // which browsers round to whole pixels and which caused the loop jump.
      track.style.transform = `translate3d(${-posRef.current}px, 0, 0)`;
    };

    const measure = () => {
      // Two identical sets are rendered back to back, so one full loop is
      // exactly half the track width plus the single seam gap between sets.
      strideRef.current = (track.scrollWidth + GAP) / 2;
      render();
    };
    measure();

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // ltr = content drifts left→right (pos decreases); rtl = right→left.
    const velocity = direction === "ltr" ? -SPEED : SPEED;

    let frame = 0;
    const step = () => {
      if (!pausedRef.current && !draggingRef.current && !reduceMotion) {
        const s = strideRef.current;
        let pos = posRef.current + velocity;
        if (s > 0) pos = ((pos % s) + s) % s;
        posRef.current = pos;
      }
      render();
      frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);

    window.addEventListener("resize", measure);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
    };
  }, [direction]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    movedRef.current = false;
    dragStartX.current = e.clientX;
    dragStartPos.current = posRef.current;
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - dragStartX.current;
    if (Math.abs(dx) > 4) movedRef.current = true;
    const s = strideRef.current;
    let pos = dragStartPos.current - dx;
    if (s > 0) pos = ((pos % s) + s) % s;
    posRef.current = pos;
  };

  const releasePointer = (e: React.PointerEvent<HTMLDivElement>) => {
    draggingRef.current = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    releasePointer(e);
    // A press with no real movement is a click → toggle play/pause.
    // A drag (moved past the threshold) just scrubs and leaves the state as-is.
    if (!movedRef.current) {
      pausedRef.current = !pausedRef.current;
    }
  };

  return (
    <div
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={releasePointer}
      className="min-h-0 flex-1 cursor-pointer touch-pan-y select-none overflow-hidden pb-[24px] active:cursor-grabbing"
    >
      <div
        ref={trackRef}
        className="flex h-full w-max gap-[16px] will-change-transform"
      >
        {[...projects, ...projects].map((project, i) => (
          <article
            key={`${project.title}-${i}`}
            className="flex h-full w-[64vw] shrink-0 flex-col overflow-hidden rounded-[5px] border border-white/8 transition-colors duration-200 hover:border-white/25"
          >
            <div className="relative h-[60vh] shrink-0 overflow-hidden border-b border-white/8">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="64vw"
                  className="object-cover object-top"
                  draggable={false}
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/20">
                    {project.title}
                  </span>
                </div>
              )}
            </div>

            <div className="flex-1 p-[20px]">
              <h3 className="font-syne text-[24px] font-bold text-white">
                {project.url ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    // Stop pointer events bubbling so opening the link doesn't
                    // trigger the carousel's drag / play-pause handling.
                    onPointerDown={(e) => e.stopPropagation()}
                    onPointerUp={(e) => e.stopPropagation()}
                    className="group inline-flex items-center gap-[6px] text-crimson transition-colors duration-200 hover:text-white"
                  >
                    <span className="underline decoration-crimson/40 decoration-1 underline-offset-[5px] transition-colors duration-200 group-hover:decoration-white">
                      {project.title}
                    </span>
                    <FiArrowUpRight
                      aria-hidden
                      className="text-[20px] transition-transform duration-200 group-hover:-translate-y-[2px] group-hover:translate-x-[2px]"
                    />
                  </a>
                ) : (
                  project.title
                )}
              </h3>
              <p className="mt-[8px] max-w-[70ch] text-[14px] font-normal leading-[1.7] text-white/50">
                {project.description}
              </p>
              <div className="mt-[12px] flex flex-wrap gap-[6px]">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-[5px] border border-crimson/30 px-[7px] py-[2px] text-[12px] font-semibold text-crimson"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      className="flex h-[calc(100vh-64px)] scroll-mt-[64px] flex-col border-t border-white/8"
    >
      {/* Section header — tight padding, just enough to breathe */}
      <div className="shrink-0 px-[4vw] pt-[24px] pb-[20px]">
        <div className="flex items-center gap-[16px]">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/25">
            //
          </span>
          <h2 className="font-syne text-[clamp(22px,3.5vw,32px)] font-bold uppercase leading-[1.1] tracking-[-0.02em] text-white">
            <EncryptedText
              text="Projects"
              encryptedClassName="text-white/30"
              revealedClassName="text-white"
            />
          </h2>
          <span className="h-px flex-1 bg-white/8" />
        </div>
      </div>

      {/* Carousel fills the rest of the viewport */}
      <ProjectCarousel projects={projects} direction="rtl" />
    </section>
  );
}
