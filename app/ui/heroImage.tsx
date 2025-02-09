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
    <div className="mx-auto w-4/5 md:w-4/5 md:px-48 md:py-12 ">
      {/* Contenedor de imágenes escalonadas */}
      <div className="relative mt-1 w-full flex justify-center min-h-[70vh]">
        {/* Imagen 1 */}
        {theme === "dark" ? (
          <>
            <Image
              src="/hero/dark-budgets.png"
              alt="dark hero"
              width={500}
              height={400}
              className="absolute top-0 left-0 transform -translate-x-8 translate-y-5 rounded-lg dark:shadow-md dark:shadow-slate-400/40
               border border-gray-300 dark:border-gray-700 max-w-[300px] sm:max-w-[450px] h-auto"
            />
            <Image
              src="/hero/dark-costs.png"
              alt="dark hero"
              width={500}
              height={400}
              className="absolute top-10 left-10 transform -translate-x-8 translate-y-10 rounded-lg 
              dark:shadow-md dark:shadow-slate-400/40
               border border-gray-300 dark:border-gray-700 max-w-[450px] h-auto hidden sm:block"
            />
            <Image
              src="/hero/dark-clients.png"
              alt="dark hero"
              width={500}
              height={400}
              className="absolute top-20 left-20 transform -translate-x-6 translate-y-14 rounded-lg 
              dark:shadow-md dark:shadow-slate-400/40
              border border-gray-300 dark:border-gray-700 max-w-[450px] h-auto hidden sm:block"
            />
          </>
        ) : (
          <>
            <Image
              src="/hero/light-budgets.png"
              alt="light hero"
              width={500}
              height={400}
              className="absolute top-0 left-0 transform -translate-x-8 rounded-lg shadow-2xl border border-gray-300 dark:border-gray-700 max-w-[300px] sm:max-w-[450px] h-auto"
            />
            <Image
              src="/hero/light-costs.png"
              alt="light hero"
              width={500}
              height={400}
              className="absolute top-10 left-10 transform -translate-x-6 translate-y-5 rounded-lg shadow-xl border border-gray-300 dark:border-gray-700 max-w-[450px] h-auto hidden sm:block"
            />
            <Image
              src="/hero/light-clients.png"
              alt="light hero"
              width={500}
              height={400}
              className="absolute top-20 left-20 transform -translate-x-6 translate-y-10 rounded-lg shadow-xl border border-gray-300 dark:border-gray-700 max-w-[450px] h-auto hidden sm:block"
            />
          </>
        )}

        {/* Imagen adicional de presupuesto */}
        <Image
          src="/hero/budget.png"
          alt="budget image"
          width={400}
          height={300}
          className="absolute sm:top-40 sm:left-36 top-10 left-20 transform 
          -translate-x-0 translate-y-10 rounded-lg  shadow-2xl border
          dark:shadow-lg dark:shadow-slate-400/40
           border-gray-300 dark:border-gray-700 max-w-[250px] sm:max-w-[400px] h-auto"
        />
      </div>
    </div>
  );
}
