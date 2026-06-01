// Site-wide ambient tech backdrop — a single fixed layer behind all content.
// Pure CSS + inline SVG (no images, no deps). Visible but content always reads first.
//
// Layers (back → front):
//   1. Corner glows: soft brand-blue wash top-right + bottom-left + a faint hero lift
//   2. Left / right "blueprint" bands: fine grid lines + a PCB circuit tile, masked so
//      they're strongest in the wide empty margins and fade out before reaching the text.
// Dark sections (opaque bg) paint over this automatically — no per-section handling needed.

// PCB-style circuit tile (200×200): right-angle traces + solid nodes + a couple ring nodes.
const circuit =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><g fill='none' stroke='rgba(24,73,220,0.16)' stroke-width='1.3'><path d='M8 28 H68 V92 H132'/><path d='M42 176 V112 H104 V58'/><path d='M174 18 V78 H112'/><path d='M152 192 V140 H92'/></g><g fill='rgba(24,73,220,0.20)'><circle cx='68' cy='28' r='3'/><circle cx='132' cy='92' r='3'/><circle cx='104' cy='58' r='3'/><circle cx='112' cy='78' r='3'/><circle cx='92' cy='140' r='3'/></g><g fill='none' stroke='rgba(24,73,220,0.18)' stroke-width='1.3'><circle cx='42' cy='112' r='4'/><circle cx='152' cy='140' r='4'/></g></svg>\")";

// Fine blueprint grid (44px) via two crossing line gradients.
const gridLines =
  "linear-gradient(rgba(24,73,220,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(24,73,220,0.10) 1px, transparent 1px)";

export function TechBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Corner glows + faint hero lift */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(38% 34% at 100% 2%, rgba(24,73,220,0.11) 0%, transparent 60%)," +
            "radial-gradient(40% 36% at 0% 100%, rgba(24,73,220,0.09) 0%, transparent 62%)," +
            "radial-gradient(55% 32% at 50% -8%, rgba(24,73,220,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Left blueprint band — grid + circuit, fades toward center */}
      <div
        className="absolute inset-y-0 left-0 w-[36%] max-w-[560px]"
        style={{
          backgroundImage: `${circuit}, ${gridLines}`,
          backgroundSize: "200px 200px, 44px 44px, 44px 44px",
          backgroundRepeat: "repeat",
          WebkitMaskImage:
            "linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 42%, transparent 100%)",
          maskImage:
            "linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 42%, transparent 100%)",
        }}
      />

      {/* Right blueprint band — mirrored */}
      <div
        className="absolute inset-y-0 right-0 w-[36%] max-w-[560px]"
        style={{
          backgroundImage: `${circuit}, ${gridLines}`,
          backgroundSize: "200px 200px, 44px 44px, 44px 44px",
          backgroundRepeat: "repeat",
          backgroundPosition: "right top",
          WebkitMaskImage:
            "linear-gradient(270deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 42%, transparent 100%)",
          maskImage:
            "linear-gradient(270deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.55) 42%, transparent 100%)",
        }}
      />
    </div>
  );
}
