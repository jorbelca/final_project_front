"use client";

import {
  UserGroupIcon,
  CurrencyDollarIcon,
  DocumentDuplicateIcon,
  UserCircleIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Map of links to display in the side navigation.
const links = [
  {
    name: "Budgets",
    href: "/dashboard/budgets",
    icon: DocumentDuplicateIcon,
  },
  { name: "Clients", href: "/dashboard/clients", icon: UserGroupIcon },
  {
    name: "Costs",
    href: "/dashboard/costs",
    icon: CurrencyDollarIcon,
  },
  {
    name: "Create",
    href: "/dashboard/create",
    icon: PlusIcon,
  },
  {
    name: "User",
    href: "/dashboard/user",
    icon: UserCircleIcon,
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        const isActive = pathname === link.href;


        const linkClasses = clsx(
          "flex h-[48px] grow items-center justify-center gap-2 rounded-sm p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3",
          {
            "bg-violet-100 hover:bg-sky-100 hover:text-red-900": !isActive,
            "bg-violet-100 text-gray-900": isActive,
          }
        );

        return (
          <Link key={link.name} href={link.href} className={linkClasses}>
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
