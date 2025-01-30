import { Inter, Lato, Lusitana, Teko } from "next/font/google";

export const inter = Inter({ subsets: ["latin"] });
export const lusitana = Lusitana({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const teko = Teko({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export const lato = Lato({
  weight: ["300", "400", "700", "900"],
  subsets: ["latin"],
});
