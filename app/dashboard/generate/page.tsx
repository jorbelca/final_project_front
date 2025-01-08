import CustomersTable from "@/app/ui/clients/table";
import { lusitana } from "@/app/ui/fonts";
import Form from "@/app/ui/budgets/create-form";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export const metadata: Metadata = {
  title: "Generate a Budget",
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
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Generate a Budget</h1>
        <Form clients={[]}/>
      </div>
    </div>
  );
}
