import { lusitana } from "@/app/ui/fonts";

export default function BudgetAppLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center justify-center leading-none text-violet-500 border-2 border-violet-500 rounded-lg p-4`}
    >
      <img src="/icon/favicon-32x32.png" alt="icono" className="pr-2" />
      <p>BudgetApp</p>
    </div>
  );
}
