"use client";

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
];

export function Nav() {
  const scrollToTop = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      aria-label="Primary"
      className="sticky top-0 z-50 bg-void border-b border-white/8"
    >
      <div className="flex w-full items-center justify-between px-[4vw] py-[20px]">
        <a
          href="#hero"
          onClick={scrollToTop}
          className="text-[13px] font-semibold tracking-[0.02em] text-white"
        >
          Max Walker
        </a>
        <ul className="flex items-center gap-28">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-[12px] font-semibold tracking-[0.02em] text-white/40 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
