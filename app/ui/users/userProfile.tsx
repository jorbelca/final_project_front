import SubscriptionModal from "@/app/dashboard/subscription/page";
import { Subscription } from "@/app/lib/definitions";
import { lusitana } from "@/app/ui/fonts";
import { Button } from "@/components/ui/button";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

interface UserProfileProps {
  user: {
    name: string;
    email: string;
    active: boolean;
    avatar_url?: string;
    logo_url?: string;
    created_at: Date;
  };
  subscription: Subscription;
}

export function UserProfile({ user, subscription }: UserProfileProps) {
  return (
    <>
      {/* Perfil del Usuario */}
      <div
        className="flex pt-0 sm:mt-0 flex-row justify-between items-center
       gap-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-4"
      >
        <div className="flex items-center justify-center gap-4 ">
          {user.avatar_url ? (
            <Image
              src={user.avatar_url}
              alt="user-avatar"
              className="w-16 h-16 rounded-full"
              width={50}
              height={50}
            />
          ) : (
            <UserCircleIcon className="h-16 w-16 text-gray-500" />
          )}
          <div className="flex flex-col">
            <h1 className={`${lusitana.className} text-2xl`}>{user.name}</h1>
            <div>
              {user.active ? (
                <p className="text-sm text-green-500">Active</p>
              ) : (
                <p className="text-sm text-red-500">No Active</p>
              )}
            </div>
          </div>
        </div>
        {user.logo_url && (
          <Image
            src={user.logo_url}
            alt="user-logo"
            className="w-20 h-20 rounded-lg"
            width={50}
            height={50}
          />
        )}
      </div>

      {/* Tabla de Información */}
      <div className="mt-6 flow-root rounded-lg bg-gray-100 dark:bg-gray-800 p-4">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-600 dark:text-gray-300">
            <tr>
              <th className="px-4 py-2">Email</th>

              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Subscription</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">{user.email}</td>

              <td className="px-4 py-2">
                {new Date(user.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">{subscription?.name}</td>
              {/* <SubscriptionModal /> */}
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
