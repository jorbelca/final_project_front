import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { teko } from "./ui/fonts";
import BudgetAppLogo from "./ui/bapp-logo";
import Footer from "./ui/footer";
import { DarkMode } from "./ui/darkMode";

export default function Page() {
  return (
    <>
      <main className="flex min-h-screen flex-col ">
        <div className="fixed top-0 right-0 p-4 md:p-6">
          <DarkMode></DarkMode>
        </div>
        <div className="flex max-[600px]:flex-col md:h-25 justify-between pt-2 pr-9">
          <div className="flex  shrink-0 items-center rounded-lg md:h-25 justify-center">
            <BudgetAppLogo />
          </div>
          <div className="flex justify-around gap-2 items-center pt-6 md:p-8">
            <Link
              href="/login"
              className="flex items-center gap-2 self-start rounded-lg border-solid bg-green-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-green-600 md:text-base cursor-pointer"
            >
              <span className={`${teko.className} font-extralight text-xl`}>
                Log in
              </span>{" "}
              <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
            <Link
              href="/register"
              className="flex items-center gap-2 self-start rounded-lg bg-red-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-red-600 md:text-base cursor-pointer"
            >
              <span className={`${teko.className} font-extralight text-xl`}>
                Register
              </span>{" "}
              <ArrowRightIcon className="w-5 md:w-6" />
            </Link>
          </div>
        </div>
        <div className="mt-4 flex grow flex-col gap-4 md:flex-row">
          <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 dark:bg-blue-800 px-6 py-10 md:w-2/5 md:px-20">
            <p
              className={`${teko.className}text-xl text-gray-800 dark:text-gray-100 md:text-3xl md:leading-normal`}
            >
              <strong>Welcome to BudgetApp.</strong> An app to create budgets
            </p>
          </div>
          <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
            {/* Add Hero Images Here */}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
