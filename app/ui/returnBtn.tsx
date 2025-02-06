import { redirect } from "next/navigation";
import { teko } from "./fonts";

export default function ReturnBtn() {
  return (
    <div
      className="group [transform:translateZ(0)] px-6 py-3 rounded-lg
               bg-transparent overflow-hidden relative before:absolute
                before:bg-sky-600 before:bottom-0 before:left-0 before:h-full 
                before:w-full before:-translate-x-full hover:before:translate-x-0 
                before:transition before:ease-in-out before:duration-500 cursor-pointer"
      onClick={(e) => {
        e.preventDefault();
        redirect("/");
      }}
    >
      <span
        className={`relative z-0 text-black group-hover:text-gray-200 dark:text-white dark:hover:text-gray-200
                 transition ease-in-out duration-500 ${teko.className} text-xl `}
      >
        ⬅ Return to Index
      </span>
    </div>
  );
}
