import { getSubscription, getUser } from "@/app/lib/data";
import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { auth } from "@/auth";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export const metadata: Metadata = {
  title: "User Dashboard",
};
export default async function Page() {
  const session = await auth();
  const user = await getUser(Number(session?.user?.id));
  const subscription = await getSubscription(Number(session?.user?.id));

  return (
    <div className="w-full">
      {user.length > 0 ? (
        <>
          <div className="flex w-full gap-2 items-center bg-gray-50 rounded-lg p-2 w-1/3">
            {user[0].avatar_url ? (
              <img
                src={user[0].avatar_url}
                alt="user-image"
                width={100}
                height={100}
              />
            ) : (
              <UserCircleIcon className="h-10 w-10" />
            )}
            <h1 className={`${lusitana.className} text-2xl`}>{user[0].name}</h1>
          </div>
          <br />
          <Suspense fallback={<InvoicesTableSkeleton />}>
            <div className="mt-6 flow-root rounded-lg bg-gray-50 p-2 md:pt-0">
              <table className="min-w-full text-gray-900">
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-bold">
                      Email
                    </th>
                    <th scope="col" className="px-4 py-5 font-bold">
                      Active
                    </th>
                    <th scope="col" className="px-4 py-5 font-bold">
                      Created At
                    </th>
                    <th scope="col" className="px-4 py-5 font-bold">
                      Subscription
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="px-4 py-3">{user[0].email}</td>
                    <td className="px-4 py-3">
                      {user[0].active ? "Yes" : "No"}
                    </td>
                    <td className="px-4 py-3">
                      {user[0].created_at.toLocaleDateString()}
                    </td>

                    <td className="px-4 py-3">{subscription[0].name}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Suspense>
        </>
      ) : (
        <>
          <p>No user found</p>
        </>
      )}
    </div>
  );
}
