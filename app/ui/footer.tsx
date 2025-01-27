import Link from "next/link";

export default function Footer() {
  return (
    //el footer no se queda fixed en la parte de abajo de la pagina, cuando haces scroll hacia abajo

    <footer className="flex flex-row justify-center text-black bg-white dark:bg-gray-600 dark:text-white align-center items-center rounded-t-lg fixed bottom-0 w-full h-10 md:h-12 z-10">
      <p>Jordi Belda @ 2025</p>
      <Link href="https://github.com/jorbelca" className="pb-1 ml-3">
        <img
          src="/github-mark/github-mark.png"
          alt="github-logo"
          width={20}
          height={20}
        />
      </Link>
    </footer>
  );
}
