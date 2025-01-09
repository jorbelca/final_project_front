"use client";

import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  UserCircleIcon,
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
    icon: DocumentDuplicateIcon,
  },
  {
    name: "Generate",
    href: "/dashboard/generate",
    icon: DocumentDuplicateIcon,
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
          "flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium md:flex-none md:justify-start md:p-2 md:px-3",
          {
            "bg-gray-50 hover:bg-sky-100 hover:text-blue-600":
              !isActive, 
            "bg-sky-100 text-blue-600": isActive 
          
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
