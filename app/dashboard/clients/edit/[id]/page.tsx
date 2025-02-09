import { Metadata } from "next";
import Form from "@/app/ui/clients/form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { auth } from "@/auth";
import { getClientById } from "@/app/lib/actions";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export const metadata: Metadata = {
  title: "Edit a Client",
};
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const params = await props.params;
  const id = params.id;

  // Fetch del cliente en el servidor
  const client = await getClientById(Number(id));
  
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
      <Form
        client={client}
        user_id={session?.user?.id ? Number(session.user.id) : undefined}
      />
    </main>
  );
}
