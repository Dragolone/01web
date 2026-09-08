import type { Dictionary } from "@/app/[lang]/dictionaries";

// Real photos — company campus (Pingshan Artisan Park) and the partner
// manufacturing base. Captions live in the dictionaries under gallery.captions
// keyed by id, so the three locales never drift from this list.
export type GalleryId = keyof Dictionary["gallery"]["captions"];

export type GalleryItem = {
  id: GalleryId;
  src: string;
  width: number;
  height: number;
  /** Short muted clip shown inline instead of the still (poster = src). */
  video?: string;
};

const img = (id: GalleryId, src: string, width: number, height: number): GalleryItem => ({ id, src, width, height });

export const companyGallery: GalleryItem[] = [
  img("park-entrance", "/company/park-entrance.jpg", 2400, 1530),
  img("park-gate", "/company/park-gate.jpg", 2000, 1500),
  img("lobby", "/company/lobby.jpg", 2000, 1500),
  img("office", "/company/office.jpg", 1200, 1600),
  img("canteen", "/company/canteen.jpg", 1500, 2000),
];

export const factoryGallery: GalleryItem[] = [
  img("uav-assembly", "/factory/uav-assembly.jpg", 1919, 1080),
  img("charge-vehicle", "/factory/charge-vehicle.jpg", 1920, 1080),
  img("cnc", "/factory/cnc.jpg", 1919, 1080),
  img("charge-pallets", "/factory/charge-pallets.jpg", 1440, 1080),
  img("uav-vtol", "/factory/uav-vtol.jpg", 1919, 1080),
];

export const productGallery: Record<"charge" | "vtol", GalleryItem[]> = {
  vtol: [
    img("uav-assembly", "/factory/uav-assembly.jpg", 1919, 1080),
    img("uav-vtol", "/factory/uav-vtol.jpg", 1919, 1080),
    img("uav-fuselage", "/factory/uav-fuselage.jpg", 1919, 1080),
    img("uav-helicopter", "/factory/uav-helicopter.jpg", 1919, 1080),
    img("cnc", "/factory/cnc.jpg", 1919, 1080),
  ],
  charge: [
    img("charge-vehicle", "/factory/charge-vehicle.jpg", 1920, 1080),
    { ...img("charge-demo", "/factory/charge-demo-poster.jpg", 1000, 421), video: "/factory/charge-demo.mp4" },
    img("charge-units", "/factory/charge-units.jpg", 1532, 1080),
    img("charge-site", "/factory/charge-site.jpg", 1440, 810),
    img("charge-pallets", "/factory/charge-pallets.jpg", 1440, 1080),
  ],
};

// Home film strip — alternates campus / UAV / charging so it reads as one story.
export const homeStrip: GalleryItem[] = [
  companyGallery[0],
  factoryGallery[0],
  factoryGallery[1],
  companyGallery[2],
  factoryGallery[4],
  factoryGallery[3],
  factoryGallery[2],
  companyGallery[1],
];
