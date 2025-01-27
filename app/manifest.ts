import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Budget App",
    short_name: "BudgetApp",
    description: "An App to create budgets",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "public/icon/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "public/icon/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "public/icon/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        src: "public/icon/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  };
}
