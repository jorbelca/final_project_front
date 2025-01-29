import { teko } from "@/app/ui/fonts";
import Image from "next/image";

export default function BudgetAppLogo() {
  return (
    <div
      className={`${teko.className} flex flex-row items-center justify-center 
      leading-none font-bold text-white border-2
       bg-slate-100 dark:bg-blue-900   dark:border-blue-800  rounded-lg p-4`}
    >
      <Image src="/icon/favicon-32x32.png" alt="icono" className="pr-2" width={50} height={50}/>
      <p>
        <span className="text-neutral-500 dark:text-white">Budget </span>
        &nbsp;
        <span className="text-red-500">A</span>
        <span className="text-blue-500">p</span>
        <span className="text-yellow-400">p</span>
      </p>
    </div>
  );
}
