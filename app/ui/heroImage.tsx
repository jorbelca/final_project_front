"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function HeroImage() {
  const [theme, setTheme] = useState<string>("");

  useEffect(() => {
    // Crear el observador para detectar cambios en el <html>
    const observer = new MutationObserver(() => {
      // Obtenemos la clase de <html>
      const htmlClass = document.documentElement.className;

      // Comprobamos si contiene la clase "dark"
      if (htmlClass.includes("dark")) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    });

    // Observar los cambios de atributos de la etiqueta <html>
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"], // Solo observamos cambios en la clase
    });

    // Establecer el estado inicial
    const htmlClass = document.documentElement.className;
    if (htmlClass.includes("dark")) {
      setTheme("dark");
    } else {
      setTheme("light");
    }

    // Limpiar el observador cuando el componente se desmonte
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex items-center justify-center p-6 md:w-3/5 md:px-28 md:py-12">
      {/* Condicional para mostrar la imagen según el tema */}
      {theme === "dark" ? (
        <Image
          src="/dark_full.png"
          alt="dark hero"
          width={500}
          height={1000}
          className="w-full max-w-xl md:w-auto rounded-lg"
        />
      ) : (
        <Image
          src="/light_full.png"
          alt="light hero"
          width={500}
          height={1000}
          className="w-full max-w-xl md:w-auto rounded-lg"
        />
      )}
    </div>
  );
}



// <!-- Main Content -->
// <main class="relative mt-10 mx-auto w-[500px]">
//     <h2
//         class="text-3xl font-semibold text-gray-800 dark:text-gray-200 text-center"
//     >
//         Simplify your budgets
//     </h2>
//     <p class="mt-2 text-lg text-gray-600 dark:text-gray-400">
//         Create, manage, and send professional budgets with ease.
//     </p>

//     <div class="relative mt-10 flex justify-center">
//         <img
//             src="/capturas/app.png"
//             alt="Example App"
//             class="rounded-lg shadow-2xl border border-gray-300 dark:border-gray-700 max-w-[500px] max-h-[400px]"
//         />
//         <!-- Imagen superpuesta (Budget) -->
//         <img
//             src="/capturas/budget.png"
//             alt="Example Budget"
//             class="absolute top-10 -right-10 rounded-lg shadow-xl border border-gray-300 dark:border-gray-700 max-w-[500px] max-h-[400px]"
//         />
//     </div>
// </main>