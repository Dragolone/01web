// Scroll-reveal defaults shared by every `whileInView` block (2026-10-14).
//
// Trigger as soon as the element's top edge is a few percent inside the bottom
// of the viewport, then animate short (0.5s) and low (16px). With the previous
// settings (-100px root margin, 0.7–0.9s, 28px) an element scrolled at ~800px/s
// was already half-way up the screen before it even started fading in, so
// content read as "chasing the scroll". Apple's pages trigger early and keep
// entrances brief; content should feel like it was already there.
//
// `viewport.margin` is an IntersectionObserver rootMargin: a negative bottom
// value shrinks the root from the bottom, i.e. "-5%" ≈ 45px inside at 900px tall.
export const revealViewport = { once: true, margin: "0px 0px -5% 0px" } as const;
export const revealEase = [0.16, 1, 0.3, 1] as const;
export const REVEAL_DURATION = 0.5;
export const REVEAL_Y = 16;
export const revealHidden = { opacity: 0, y: REVEAL_Y } as const;
export const revealShown = { opacity: 1, y: 0 } as const;
/** Transition for a reveal; `delay` staggers siblings (keep it ≤ ~0.06s per item). */
export const revealTransition = (delay = 0) => ({ duration: REVEAL_DURATION, ease: revealEase, delay });
