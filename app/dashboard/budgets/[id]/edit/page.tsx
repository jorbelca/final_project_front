import Form from "@/app/ui/budgets/edit-form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { getBudgetById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { fetchClients } from "@/app/lib/actions";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Edit Budget",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const params = await props.params;
  const id = params.id;
  const [budget, client] = await Promise.all([
    getBudgetById(+id),
    fetchClients(Number(session?.user?.id)),
  ]);
  if (!budget) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Budgets", href: "/dashboard/budgets" },
          {
            label: "Edit Budget",
            href: `/dashboard/budgets/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form budget={budget} clients={client.flat()} />
    </main>
  );
}
