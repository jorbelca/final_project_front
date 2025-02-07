import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";
import BudgetAppLogo from "./bapp-logo";
import { DarkMode } from "./darkMode";
import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { teko } from "./fonts";

export default function SideNav() {
  return (
    <div
      className="top-0 left-0 min-w-[100vw] bg-gray-100 dark:bg-gray-600 z-10 
    md:relative md:flex md:items-center md:justify-center px-3 py-2 md:py-4"
    >
      {/* Logo */}
      <div className="flex justify-center md:pr-10 w-full md:w-auto">
        <Link href="/dashboard/budgets">
          <div className="w-32 text-black">
            <BudgetAppLogo />
          </div>
        </Link>
      </div>

      {/* Botón de Dark Mode en la esquina derecha */}
      <div className="absolute right-3 top-2  md:ml-auto">
        <DarkMode />
      </div>

      {/* Enlaces de navegación (fijos abajo en móvil, en medio en escritorio) */}
      <div
        className="fixed bottom-0 left-0 w-full
       bg-gray-100 dark:bg-black p-2 flex justify-center md:relative md:w-auto md:bg-transparent gap-1"
      >
        <NavLinks />

        {/* Botón Sign Out */}
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button className="flex flex-col-reverse w-20 items-center gap-1 rounded-sm dark:bg-red-500 dark:hover:bg-red-600 dark:hover:text-white bg-red-500 px-4 py-6 text-sm font-medium hover:bg-red-600 hover:text-zinc-600">
            <PowerIcon className="w-6" />
            <span className={`text-md ${teko.className} antialiased`}>
              Sign Out
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
}
