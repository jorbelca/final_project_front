import { fetchClients } from "@/app/lib/actions";
import ClientsTable from "@/app/ui/clients/table";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { auth } from "@/auth";
import { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export const metadata: Metadata = {
  title: "Clients",
};
export default async function Page() {
  const session = await auth();
  const clients = await fetchClients(Number(session?.user?.id));

  return (
    <div className="w-full">
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <ClientsTable
          clients={clients}
          user_id={session?.user?.id ? Number(session.user.id) : undefined}
        />
      </Suspense>
    </div>
  );
}
