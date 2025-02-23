import { ArrowRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { teko } from "./ui/fonts";
import BudgetAppLogo from "./ui/bapp-logo";
import Footer from "./ui/footer";
import { DarkMode } from "./ui/darkMode";

import HeroImage from "./ui/heroImage";

export default function Page() {
  return (
    <>
      <main className="flex min-h-screen flex-col relative ">
        <div className="fixed top-0 right-0 p-4 md:p-6">
          <DarkMode></DarkMode>
        </div>
        <div className="flex max-[640px]:flex-col md:h-25 justify-between pt-2 pr-0 sm:pr-14 md:pr-9">
          <div className="flex shrink-0 items-center rounded-lg md:h-25 justify-center pl-2">
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
        <div className="mt-4 flex flex-col flex-grow  gap-4 sm:pb-52">
          <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 dark:bg-blue-800 px-6 py-10 mx-10 ">
            <div
              className={`${teko.className}text-xl text-gray-800 dark:text-gray-100 md:text-xl md:leading-normal text-center`}
            >
              <strong>Welcome to BudgetApp.</strong>
              <p>Simplify your budget managment</p>
            </div>
          </div>
          <HeroImage />
        </div>
        <Footer />{" "}
      </main>
    </>
  );
}
