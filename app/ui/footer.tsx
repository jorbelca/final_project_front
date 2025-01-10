import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-row justify-center text-black bg-white align-center items-center rounded-t-lg absolute bottom-0 w-full h-10">
      <p>Jordi Belda @ 2025</p> 

   
      <Link href="https://github.com/jorbelca" className="pb-1 ml-3">
         <img src='/github-mark/github-mark.png'  width={20} height={20} />
         </Link>

    </footer>
  );
}
