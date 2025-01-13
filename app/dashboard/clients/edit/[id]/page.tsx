import { Metadata } from "next";
import Form from "@/app/ui/clients/form";
import Breadcrumbs from "@/app/ui/breadcrumbs";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export const metadata: Metadata = {
  title: "Edit a Client",
};
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Clients", href: "/dashboard/clients" },
          {
            label: "Edit Client",
            href: `/dashboard/clients/edit/${id}`,
            active: true,
          },
        ]}
      />
      <Form params={props.params} />
    </main>
  );
}
