import "@/app/ui/global.css";
import { inter } from "./ui/fonts";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: {
    template: "%s | BudgetApp ",
    default: " BudgetApp",
  },
  description: "Aplicación de creación de presupuestos",
  icons: {
    icon: "/icon/favicon.ico",
  },
  //metadataBase: new URL("https://next-learn-dashboard.vercel.sh")
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <html lang="es">
      <body className={`${inter.className} antialiased`}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </body>
    </html>
  );
}
