import "@/app/ui/global.css";
import { lato } from "./ui/fonts";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { ThemeProvider } from "../components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: {
    template: "%s | BudgetApp ",
    default: " BudgetApp",
  },
  description: "Aplicación de creación de presupuestos",
  manifest: "app/manifest.ts",

  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/icon/favicon.ico",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: " BudgetApp",
    startupImage: [
      {
        url: "/splash/apple-splash-750-1334.png", // iPhone 6/7/8
        media:
          "(device-width: 750px) and (device-height: 1334px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/splash/apple-splash-1334-750.png", // iPhone 6/7/8 (landscape)
        media:
          "(device-width: 1334px) and (device-height: 750px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
      {
        url: "/splash/apple-splash-1125-2436.png", // iPhone X/XS/11 Pro
        media:
          "(device-width: 1125px) and (device-height: 2436px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/splash/apple-splash-2436-1125.png", // iPhone X/XS/11 Pro (landscape)
        media:
          "(device-width: 2436px) and (device-height: 1125px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
      },
      {
        url: "/splash/apple-splash-828-1792.png", // iPhone XR
        media:
          "(device-width: 828px) and (device-height: 1792px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/splash/apple-splash-1792-828.png", // iPhone XR (landscape)
        media:
          "(device-width: 1792px) and (device-height: 828px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
      {
        url: "/splash/apple-splash-1242-2208.png", // iPhone 6/7/8 Plus
        media:
          "(device-width: 1242px) and (device-height: 2208px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/splash/apple-splash-2208-1242.png", // iPhone 6/7/8 Plus (landscape)
        media:
          "(device-width: 2208px) and (device-height: 1242px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
      },
      {
        url: "/splash/apple-splash-1242-2688.png", // iPhone XS Max/11 Pro Max
        media:
          "(device-width: 1242px) and (device-height: 2688px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/splash/apple-splash-2688-1242.png", // iPhone XS Max/11 Pro Max (landscape)
        media:
          "(device-width: 2688px) and (device-height: 1242px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
      },
      {
        url: "/splash/apple-splash-750-1624.png", // iPhone 12 mini (portrait)
        media:
          "(device-width: 750px) and (device-height: 1624px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/splash/apple-splash-1624-750.png", // iPhone 12 mini (landscape)
        media:
          "(device-width: 1624px) and (device-height: 750px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
      },
      {
        url: "/splash/apple-splash-1170-2532.png", // iPhone 12/12 Pro/13/13 Pro
        media:
          "(device-width: 1170px) and (device-height: 2532px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/splash/apple-splash-2532-1170.png", // iPhone 12/12 Pro/13/13 Pro (landscape)
        media:
          "(device-width: 2532px) and (device-height: 1170px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
      },
      {
        url: "/splash/apple-splash-1284-2778.png", // iPhone 12 Pro Max/13 Pro Max
        media:
          "(device-width: 1284px) and (device-height: 2778px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/splash/apple-splash-2778-1284.png", // iPhone 12 Pro Max/13 Pro Max (landscape)
        media:
          "(device-width: 2778px) and (device-height: 1284px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
      },
      {
        url: "/splash/apple-splash-1170-2532.png", // iPhone 14/14 Plus (portrait)
        media:
          "(device-width: 1170px) and (device-height: 2532px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/splash/apple-splash-2532-1170.png", // iPhone 14/14 Plus (landscape)
        media:
          "(device-width: 2532px) and (device-height: 1170px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
      },
      {
        url: "/splash/apple-splash-1290-2796.png", // iPhone 14 Pro (portrait)
        media:
          "(device-width: 1290px) and (device-height: 2796px) and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)",
      },
      {
        url: "/splash/apple-splash-2796-1290.png", // iPhone 14 Pro (landscape)
        media:
          "(device-width: 2796px) and (device-height: 1290px) and (-webkit-device-pixel-ratio: 3) and (orientation: landscape)",
      },
      {
        url: "/splash/apple-splash-1536-2048.png", // iPad (portrait)
        media:
          "(device-width: 1536px) and (device-height: 2048px) and (-webkit-device-pixel-ratio: 2) and (orientation: portrait)",
      },
      {
        url: "/splash/apple-splash-2048-1536.png", // iPad (landscape)
        media:
          "(device-width: 2048px) and (device-height: 1536px) and (-webkit-device-pixel-ratio: 2) and (orientation: landscape)",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="es">
      <body className={`${lato.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system">
          <SessionProvider session={session}>
            {children} <Toaster />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
