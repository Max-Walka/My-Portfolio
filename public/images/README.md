# Project screenshots

Drop project screenshot images in this folder, then reference them from
`components/Projects.tsx` via the project's `image` field.

- Reference with a **root-relative path** starting with `/images/` (the `public`
  folder is served from the site root). Example: a file saved here as
  `DOCBaseUI.PNG` is referenced as `image: "/images/DOCBaseUI.PNG"`.
- Use forward slashes `/`, never backslashes.
- Filenames are case-sensitive in production (Linux/Vercel) — match the case
  exactly, including the extension (`.PNG` vs `.png`).
- The card image area is 240px tall and the image is rendered `object-cover`,
  so roughly landscape screenshots (e.g. 16:10) look best.
- Omit the `image` field to show the placeholder label instead.
