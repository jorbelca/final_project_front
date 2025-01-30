import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";
import BudgetAppLogo from "./bapp-logo";
import { DarkMode } from "./darkMode";
import { Button } from "@/components/ui/button";

export default function SideNav() {
  return (
    <div
      className="flex flex-col md:flex-row md:items-center md:justify-start
     px-3 py-2 md:pr-8 md:py-1 bg-gray-100 dark:bg-gray-600 w-full fixed top-0 left-0 z-10"
    >
      <div className="fixed top-0 right-0 p-2 md:p-2 z-20">
        <DarkMode></DarkMode>
      </div>
      {/* Logo */}
      <Link
        href="/dashboard/budgets"
        className="flex items-center justify-center md:justify-start"
      >
        <div className="w-32 text-black">
          <BudgetAppLogo />
        </div>
      </Link>{" "}
      {/* Enlaces de navegación */}
      <div
        className="fixed bottom-0 bg-gray-100 dark:bg-black left-0 pr-1 md:pl-20 md:bg-transparent
         md:dark:bg-transparent
      md:bottom-auto flex flex-row justify-center w-full md:w1/2 md:overflow-hidden space-x-1 md:space-x-2"
      >
        <NavLinks />
        {/* Botón Sign Out */}
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button
            className="flex flex-col-reverse w-20 items-center gap-1 rounded-sm dark:bg-red-500
             dark:hover:bg-red-600 dark:hover:text-white
       bg-red-500 px-4 py-6 text-sm font-medium hover:bg-red-600  hover:text-zinc-600"
          >
            <PowerIcon className="w-6" />
            <span>Sign Out</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
