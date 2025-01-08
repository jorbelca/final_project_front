import Form from "@/app/ui/invoices/create-form";
import Breadcrumbs from "@/app/ui/invoices/breadcrumbs";
import { fetchCustomers } from "@/app/lib/data";
import { Metadata } from "next";


export const dynamic = 'force-dynamic';
export const dynamicParams = true;
export const metadata: Metadata = {
  title: "Create Budget",
};

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Budgets", href: "/dashboard/budgets" },
          {
            label: "Create Budget",
            href: "/dashboard/budgets/create",
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
