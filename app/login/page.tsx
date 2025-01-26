import LoginForm from "@/app/ui/login-form";
import { Metadata } from "next";
import BudgetAppLogo from "../ui/bapp-logo";
import Footer from "../ui/footer";
import { DarkMode } from "../ui/darkMode";

export const metadata: Metadata = {
  title: "Login",
};

export default async function LoginPage() {
  return (
    <>
      <main className="flex items-center justify-center min-h-screen bg-red-100 dark:bg-gray-800 pb-44">
        <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
          <div className="flex h-20 w-full items-center justify-center rounded-lg bg-transparent p-3 md:h-full">
            <DarkMode></DarkMode>
            <div className="w-400 text-white md:w-260">
              <BudgetAppLogo />
            </div>
          </div>
          <LoginForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
