import { lusitana } from "@/app/ui/fonts";
import { BeakerIcon} from "@heroicons/react/24/outline";


export default function BudgetAppLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center justify-center leading-none text-violet-500 border-2 border-violet-500 rounded-lg p-4`}
    >
    <BeakerIcon className="size-6 text-violet-500" />

      <p>BudgetApp</p>
    </div>
  );
}
