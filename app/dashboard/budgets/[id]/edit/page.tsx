import Breadcrumbs from "@/app/ui/breadcrumbs";
import { fetchCosts, getBudgetById } from "@/app/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { fetchClients } from "@/app/lib/actions";
import { auth } from "@/auth";
import EditForm from "@/app/ui/budgets/edit-form";

export const metadata: Metadata = {
  title: "Edit Budget",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const session = await auth();
  const params = await props.params;
  const id = params.id;

  const [budget, clients, costs] = await Promise.all([
    await getBudgetById(+id),
    await fetchClients(Number(session?.user?.id)),
    await fetchCosts(Number(session?.user?.id)),
  ]);

  if (!budget || !clients) {
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
      <EditForm
        costs={costs.flat()}
        budget={budget}
        clients={clients.flat()}
        user_id={+(session?.user?.id ?? 0)}
      />
    </main>
  );
}
