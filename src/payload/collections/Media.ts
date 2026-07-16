import type { CollectionConfig } from "payload";

// Biblioteca de mídia — imagens em WebP com tamanhos por breakpoint (Core Web Vitals).
export const Media: CollectionConfig = {
  slug: "media",
  admin: { group: "Conteúdo" },
  labels: { singular: "Mídia", plural: "Mídia" },
  access: { read: () => true },
  upload: {
    staticDir: "public/media",
    mimeTypes: ["image/*"],
    imageSizes: [
      { name: "thumb", width: 400, height: undefined, formatOptions: { format: "webp", options: { quality: 78 } } },
      { name: "card", width: 800, height: undefined, formatOptions: { format: "webp", options: { quality: 80 } } },
      { name: "hero", width: 1600, height: undefined, formatOptions: { format: "webp", options: { quality: 82 } } },
    ],
    formatOptions: { format: "webp", options: { quality: 82 } },
  },
  fields: [
    { name: "alt", type: "text", label: "Texto alternativo (alt)", required: true },
  ],
};
