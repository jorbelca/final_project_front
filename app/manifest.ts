import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Budget App",
    short_name: "BudgetApp",
    description: "An App to create budgets",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    orientation: "portrait",
    theme_color: "#FFFFFF",
    icons: [
      {
        src: "/icon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/icon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "/icon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/icon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/icon/120.png",
        sizes: "120x120",
        type: "image/png",
      },
      {
        src: "/icon/128.png",
        sizes: "128x128",
        type: "image/png",
      },
      {
        src: "/icon/72.png",
        sizes: "72x72",
        type: "image/png",
      },
      {
        src: "/icon/96.png",
        sizes: "96x96",
        type: "image/png",
      },
    ],
  };
}
