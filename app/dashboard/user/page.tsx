import { getPlans, getSubscription, getUser } from "@/app/lib/data";

import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { RemoveUser } from "@/app/ui/users/deleteUser";
import { UserEditForm } from "@/app/ui/users/formUser";
import { UserProfile } from "@/app/ui/users/userProfile";
import { auth } from "@/auth";
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
  const plans = (await getPlans()) ?? [];

  return (
    <div className="w-full p-4 rounded-sm dark:bg-gray-700 dark:text-white">
      {user ? (
        <>
          {/* Componente: Perfil del Usuario */}
          <Suspense fallback={<InvoicesTableSkeleton />}>
            {/* <Link href={`/dashboard/user/${Number(session?.user?.id)}/admin`}>
              <Button color="red" className="dark:hover:bg-red-600 bg-red-400">
                ADMIN
              </Button>
            </Link> */}
            <UserProfile
              user={user}
              subscription={subscription}
              plans={plans}
            />
          </Suspense>
          <Suspense fallback={<InvoicesTableSkeleton />}>
            {/* Componente: Formulario de Edición */}
            <UserEditForm user={user} />
            <RemoveUser user={user} />
          </Suspense>
        </>
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
}
