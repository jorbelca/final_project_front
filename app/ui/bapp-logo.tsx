import { teko } from "@/app/ui/fonts";
import Image from "next/image";

export default function BudgetAppLogo() {
  return (
    <div
      className={`${teko.className} flex flex-row items-center justify-center 
      leading-none font-bold  border-2 
       bg-slate-100 dark:bg-gray-500   dark:border-gray-600 
        rounded-lg p-4 shadow-lg dark:shadow-md dark:shadow-slate-400/40
`}
    >
      <Image
        src="/icon/favicon-32x32.png"
        alt="icono"
        className="pr-2"
        width={50}
        height={50}
      />
      <p>
        <span className="text-neutral-500 dark:text-neutral-200">Budget </span>
        &nbsp;
        <span className="dark:text-red-600 text-red-500">A</span>
        <span className="dark:text-blue-700 text-blue-500">p</span>
        <span className="dark:text-yellow-500 text-yellow-400">p</span>
      </p>
    </div>
  );
}
