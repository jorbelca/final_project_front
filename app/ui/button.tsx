import clsx from "clsx";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export function Button({
  children,
  className,
  color = "violet-500",
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      className={clsx(
        `flex h-10 items-center rounded-lg bg-${color} px-4 text-sm font-medium text-white transition-colors hover:bg-${color}-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${color}-500 active:bg-${color}-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50 cursor-pointer`,
        className
      )}
    >
      {children}
    </button>
  );
}
