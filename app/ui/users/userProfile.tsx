import { Subscription } from "@/app/lib/definitions";
import { lusitana } from "@/app/ui/fonts";
import { UserCircleIcon } from "@heroicons/react/24/outline";

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
      <div className="flex  mt-20 sm:mt-0 flex-row justify-between items-center gap-4 bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-center gap-4">
          {user.avatar_url ? (
            <img
              src={user.avatar_url}
              alt="user-avatar"
              className="w-16 h-16 rounded-full"
            />
          ) : (
            <UserCircleIcon className="h-16 w-16 text-gray-500" />
          )}
          <h1 className={`${lusitana.className} text-2xl`}>{user.name}</h1>
        </div>
        {user.logo_url && (
          <img
            src={user.logo_url}
            alt="user-logo"
            className="w-20 h-20 rounded-lg"
          />
        )}
      </div>

      {/* Tabla de Información */}
      <div className="mt-6 flow-root rounded-lg bg-gray-100 dark:bg-gray-800 p-4">
        <table className="w-full text-left text-sm">
          <thead className="text-gray-600 dark:text-gray-300">
            <tr>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Active</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Subscription</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t border-gray-200 dark:border-gray-700">
              <td className="px-4 py-2">{user.email}</td>
              <td className="px-4 py-2">
                {user.active ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="green"
                    className="size-6 bold text-green-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="red "
                    className="size-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18 18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </td>
              <td className="px-4 py-2">
                {new Date(user.created_at).toLocaleDateString()}
              </td>
              <td className="px-4 py-2">{subscription.name}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
