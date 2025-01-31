import clsx from "clsx";
import { teko } from "./fonts";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({
  children,
  className,
  color = "green",
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        `${teko.className}`,
        `flex h-10 items-center rounded-lg bg-${color}-500
         hover:bg-${color}-600
        dark:bg-${color}-600 dark:hover:bg-${color}-700
        px-4 py-3 text-lg font-medium text-white transition-colors
          focus-visible:outline focus-visible:outline-2 
         focus-visible:outline-offset-2 focus-visible:outline-${color}-500 
         active:bg-${color}-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 
         cursor-pointer`,
        className
      )}
    >
      {children}
    </button>
  );
}
