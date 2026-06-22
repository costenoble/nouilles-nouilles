import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nouilles Nouilles — Rennes",
    short_name: "Nouilles Nouilles",
    description:
      "Restaurant asiatique de nouilles fraîches à Rennes. Carte, réservation et infos pratiques.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#f3f0e6",
    theme_color: "#1b1a16",
    lang: "fr",
    categories: ["food", "restaurant"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
