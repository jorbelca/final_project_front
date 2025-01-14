import "@/app/ui/global.css";
import { inter } from "./ui/fonts";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";



export const metadata: Metadata = {
  title: {
    template: "%s | BudgetApp ",
    default: " BudgetApp",
  },
  description: "Aplicación de creación de presupuestos",
  //metadataBase: new URL("https://next-learn-dashboard.vercel.sh")
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <SessionProvider>
        <body className={`${inter.className} antialiased`}>{children}</body>
      </SessionProvider>
    </html>
  );
}
