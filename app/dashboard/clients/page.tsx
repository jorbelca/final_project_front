import ClientsTable from "@/app/ui/clients/table";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";


export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export const metadata: Metadata = {
  title: "Clients",
};
export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  return (
    <div className="w-full">
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <ClientsTable />
      </Suspense>
    </div>
  );
}
