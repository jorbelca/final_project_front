import "@/app/ui/global.css";
import {  lato } from "./ui/fonts";
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
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: " BudgetApp",
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: "/icon/favicon.ico",
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
