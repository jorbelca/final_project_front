import { Metadata } from "next";
import Form from "@/app/ui/clients/form";
import Breadcrumbs from "@/app/ui/breadcrumbs";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export const metadata: Metadata = {
  title: "Create a Client",
};
export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Clients", href: "/dashboard/clients" },
          {
            label: "Create Client",
            href: `/dashboard/clients/create`,
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}
