import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      className="fixed bottom-0 flex flex-row justify-center
     text-black bg-white dark:bg-gray-600 dark:text-white align-center items-center 
     w-full h-10 md:h-12 z-1"
    >
      <p>Jordi Belda @ 2025</p>
      <Link href="https://github.com/jorbelca" className="pb-1 ml-3">
        <Image
          src="/github-mark/github-mark.png"
          alt="github-logo"
          width={20}
          height={20}
        />
      </Link>
    </footer>
  );
}
