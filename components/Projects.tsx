"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { EncryptedText } from "@/components/ui/encrypted-text";

interface Project {
  title: string;
  description: string;
  tags: string[];
  /** Path to a screenshot in /public, e.g. "/images/docbase.png". Optional —
   * falls back to the placeholder label when omitted. */
  image?: string;
}

// Ordered most-important first.
const projects: Project[] = [
  {
    title: "DOCBase",
    description:
      "A self-hosted RAG platform with a built-in MCP server: ingest documents, query them with cited answers, and expose the whole pipeline as tools to any LLM client.",
    image: "/images/DOCBaseUI.PNG",
    tags: ["Python", "FastAPI", "Next.js", "pgvector", "Docker", "Railway"],
  },
  {
    title: "OSRS Loot Simulator",
    description:
      "Pulls live drop tables and Grand Exchange prices to Monte-Carlo thousands of kills and project realistic loot value over time.",
    tags: ["Next.js", "TypeScript", "Redis"],
  },
  {
    title: "Spinal Cord Injury Assessment Tool",
    description:
      "A clinical tool for scoring and tracking spinal cord injuries, replacing error-prone paper forms with a fast, auditable digital workflow.",
    tags: ["React", "Supabase", "Vercel"],
  },
  {
    title: "PipeWorks Plumbing",
    description:
      "An SEO-focused marketing site for a local plumber: service pages, booking enquiries, and a mobile-first build that loads fast.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Vercel"],
  },
  {
    title: "Atlas Analytics",
    description:
      "Dummy project — a real-time analytics dashboard with custom charts, filters, and shareable reports.",
    tags: ["React", "D3", "Node.js"],
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
                {project.title}
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
            02
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
