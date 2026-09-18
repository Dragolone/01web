import type { Dictionary } from "./dictionaries";

// Client components used to receive the whole Dictionary as a prop. Every prop
// handed to a client component is serialized into the page's RSC payload, so
// the full three-language dictionary (~60 KB) shipped with every page. Each
// selector below builds the minimal slice a component reads, keeping the same
// nested shape so component bodies keep using `dict.xxx` unchanged.
// (Plain functions must live outside "use client" files to be callable on the server.)

export const forNavbar = (d: Dictionary) => ({ nav: d.nav, brand: { name: d.brand.name } });
export type NavbarDict = ReturnType<typeof forNavbar>;

export const forImmersiveHero = (d: Dictionary) => ({ heroImmersive: d.heroImmersive, brand: { nameEn: d.brand.nameEn } });
export type ImmersiveHeroDict = ReturnType<typeof forImmersiveHero>;

export const forHomeFeatures = (d: Dictionary) => ({ hero: { features: d.hero.features } });
export type HomeFeaturesDict = ReturnType<typeof forHomeFeatures>;

export const forProductMatrix = (d: Dictionary) => ({ products: d.products });
export type ProductMatrixDict = ReturnType<typeof forProductMatrix>;

export const forHomeSolutions = (d: Dictionary) => ({ homeSolutions: d.homeSolutions, solutions: { scenarios: d.solutions.scenarios } });
export type HomeSolutionsDict = ReturnType<typeof forHomeSolutions>;

export const forHomeAbout = (d: Dictionary) => ({
  brand: { vision: d.brand.vision },
  hero: { cta: d.hero.cta },
  pages: { about: { body: d.pages.about.body, meta: d.pages.about.meta, eyebrow: d.pages.about.eyebrow } },
  gallery: { captions: { "park-entrance": d.gallery.captions["park-entrance"] } },
});
export type HomeAboutDict = ReturnType<typeof forHomeAbout>;

export const forHomeGalleryStrip = (d: Dictionary) => ({ homeGallery: d.homeGallery, gallery: { captions: d.gallery.captions }, brand: { name: d.brand.name } });
export type HomeGalleryStripDict = ReturnType<typeof forHomeGalleryStrip>;

export const forTechCapabilities = (d: Dictionary) => ({ tech: d.tech });
export type TechCapabilitiesDict = ReturnType<typeof forTechCapabilities>;

export const forHomeCTA = (d: Dictionary) => ({ cta: d.cta });
export type HomeCTADict = ReturnType<typeof forHomeCTA>;

export const forContactForm = (d: Dictionary) => ({ pages: { contact: { form: d.pages.contact.form } } });
export type ContactFormDict = ReturnType<typeof forContactForm>;

export const forSolutionScenarios = (d: Dictionary) => ({ solutions: d.solutions });
export type SolutionScenariosDict = ReturnType<typeof forSolutionScenarios>;
