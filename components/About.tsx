import { EncryptedText } from "@/components/ui/encrypted-text";

const skills = [
  "Next.js",
  "React",
  "TypeScript",
  "Python",
  "FastAPI",
  "Supabase",
  "PostgreSQL",
  "pgvector",
  "Docker",
  "Tailwind",
  "Node.js",
  "MCP",
  "RAG",
  "Git",
  "Linux",
  "Vercel",
  "Railway",
  "Anthropic API",
];

const meta = [
  {
    key: "Degree",
    value: "Bachelor of Computer and information Sciences — AUT",
  },
  { key: "Majors", value: "Software Development & Networks and Cybersecurity" },
  { key: "Location", value: "Auckland, New Zealand" },
  { key: "Focus", value: "Full Stack · AI Engineering" },
];

const contacts = [
  { label: "walkermax193@gmail.com", href: "mailto:walkermax193@gmail.com" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/maxwalker1998/" },
  { label: "GitHub", href: "https://github.com/Max-Walka" },
];

export function About() {
  return (
    <section id="about" className="scroll-mt-[64px] border-t border-white/8">
      <div className="px-[4vw] py-20">
        {/* Section header */}
        <div className="flex items-center gap-[16px]">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/25">
            //
          </span>
          <h2 className="font-syne text-[clamp(22px,3.5vw,32px)] font-bold uppercase leading-[1.1] tracking-[-0.02em] text-white">
            <EncryptedText
              text="About me"
              encryptedClassName="text-white/30"
              revealedClassName="text-white"
            />
          </h2>
          <span className="h-px flex-1 bg-white/8" />
        </div>

        {/* Two-column body */}
        <div className="mt-[40px] flex flex-col gap-16 md:flex-row">
          {/* Left: bio + skills */}
          <div className="min-w-0 flex-1">
            <p className="max-w-[58ch] text-[13px] font-normal leading-[1.8] text-white/50">
              CS graduate from AUT specialising in full stack development and AI
              engineering. I build production-grade software. From hand-rolled
              RAG pipelines and MCP servers to small business websites. I care
              about writing clean, explainable code and shipping things that
              actually work in the real world.
            </p>

            <div className="mt-[24px]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">
                Skills
              </p>
              <div className="mt-[14px] flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-[5px] border border-crimson/30 px-[7px] py-[2px] text-[10px] font-semibold text-crimson"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="mt-[24px]">
              <div className="h-px w-full bg-white/8" />
              <p className="mt-[24px] text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">
                Contact
              </p>
              <div className="mt-[14px] flex flex-wrap items-center gap-x-[20px] gap-y-[8px]">
                {contacts.map(({ label, href }) => (
                  <a
                    key={href}
                    href={href}
                    {...(href.startsWith("http")
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                    className="text-[12px] font-semibold text-white/40 transition-colors duration-200 hover:text-white"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: meta table — fixed narrow column beside the bio */}
          <dl className="w-full shrink-0 md:w-64">
            {meta.map(({ key, value }) => (
              <div key={key} className="border-b border-white/[0.06] py-[10px]">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.12em] text-white/25">
                  {key}
                </dt>
                <dd className="mt-[4px] text-[12px] font-semibold text-white">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
