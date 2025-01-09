import { GlobeAltIcon } from "@heroicons/react/24/outline";
import { lusitana } from "@/app/ui/fonts";
import Image from "next/image";

export default function BAILogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image src="./logo/logo.svg" alt="logo" width={200} height={350} />

    </div>
  );
}
