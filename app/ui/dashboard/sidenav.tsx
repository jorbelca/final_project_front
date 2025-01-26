import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { PowerIcon } from "@heroicons/react/24/outline";
import { signOut } from "@/auth";
import BudgetAppLogo from "../bapp-logo";
import { DarkMode } from "../darkMode";
import { Button } from "@/components/ui/button";

export default function SideNav() {
  return (
    <div
      className="flex flex-col md:flex-row md:items-center md:justify-around
     px-3 py-4 md:px-8 md:py-4 bg-gray-100 w-full fixed top-0 left-0 z-10"
    >
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
      <div className="flex flex-row space-x-1 md:space-x-2">
        <NavLinks />
      </div>
      {/* Botón Sign Out */}{" "}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button
          className="flex flex-col-reverse w-20 items-center gap-1 rounded-xl
       bg-red-500 px-4 py-2 text-sm font-medium hover:bg-red-600 p-5 hover:text-blue-600"
        >
          <PowerIcon className="w-6" />
          <span>Sign Out</span>
        </Button>
      </form>
      <DarkMode></DarkMode>
    </div>
  );
}
