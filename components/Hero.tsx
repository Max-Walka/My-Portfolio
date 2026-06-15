import { FaLinkedinIn, FaGithub } from "react-icons/fa";
import { Constellation } from "@/components/ui/constellation";
import { EncryptedText } from "@/components/ui/encrypted-text";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/maxwalker1998/",
    Icon: FaLinkedinIn,
  },
  {
    label: "GitHub",
    href: "https://github.com/Max-Walka",
    Icon: FaGithub,
  },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-57px)] flex-col justify-end overflow-hidden bg-void px-[4vw] pt-0 py-26"
    >
      <Constellation />

      <div className="relative z-10">
        <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/30">
          Full Stack Developer & AI Engineer
        </p>

        <h1 className="mt-[20px] font-syne text-[clamp(34px,10.5vw,56px)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em] text-white sm:text-[clamp(64px,10vw,120px)]">
          <EncryptedText
            text="Max"
            revealDelayMs={150}
            encryptedClassName="text-white/30"
            revealedClassName="text-white"
          />
          <br />
          <EncryptedText
            text="Walker"
            revealDelayMs={150}
            startDelayMs={450}
            encryptedClassName="text-white/30"
            revealedClassName="text-white"
          />
        </h1>

        <p className="mt-[18px] text-[13px] font-normal text-white/40">
          Building production-grade software.
        </p>

        <div className="mt-[40px] flex items-center justify-between">
          <div className="flex items-center gap-[8px]">
            {socials.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="flex h-[30px] w-[30px] items-center justify-center rounded-[5px] border border-white/20 bg-transparent text-white transition-colors duration-200 hover:border-white/40 hover:text-white"
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-[8px]">
            <span className="relative flex h-[6px] w-[6px]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-crimson opacity-75" />
              <span className="relative inline-flex h-[6px] w-[6px] rounded-full bg-crimson" />
            </span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/30">
              Auckland, New Zealand
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
