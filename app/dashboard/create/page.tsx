import CustomersTable from "@/app/ui/clients/table";
import { lusitana } from "@/app/ui/fonts";
import Form from "@/app/ui/budgets/create-form";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";
import { fetchClients, fetchCosts } from "@/app/lib/data";

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export const metadata: Metadata = {
  title: "Create a Budget",
};
export default async function Page() {
  const clients = await fetchClients(Number(process.env.USER_ID));
  const costs = await fetchCosts(Number(process.env.USER_ID));
  return (
    <div className="w-full">
      <div className="flex w-full flex-col justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Create a Budget</h1>
        <div className="w-full">
          <Form clients={clients} costs={costs}/>
        </div>
      </div>
    </div>
  );
}
