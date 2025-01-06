import CustomersTable from "@/app/ui/clients/table";
import { lusitana } from "@/app/ui/fonts";
import Form from "@/app/ui/invoices/create-form";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Metadata } from "next";
import { Suspense } from "react";

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
        <h1 className={`${lusitana.className} text-2xl`}>{metadata.title}</h1>
        <Form />
      </div>
    </div>
  );
}
