import RegisterForm from "@/app/ui/register-form";
import { Metadata } from "next";
import BudgetAppLogo from "../ui/bapp-logo";
import Footer from "../ui/footer";

import { DarkMode } from "../ui/darkMode";

export const metadata: Metadata = {
  title: "Register",
};

export default function RegisterPage() {
  return (
    <>
      <main className="flex items-center justify-center h-screen bg-slate-200 pb-40 dark:bg-gray-800">
        <div className="fixed top-0 right-0 p-4 md:p-6">
          <DarkMode></DarkMode>
        </div>
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4  md:-mt-32 ">
          <div className="flex w-full h-full items-center justify-center rounded-lg bg-transparent p-3 md:h-36 ">
            <div className="w-320 text-whitemd:w-360">
              <BudgetAppLogo />
            </div>
          </div>
          <RegisterForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
