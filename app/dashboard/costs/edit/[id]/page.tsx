import Breadcrumbs from "@/app/ui/breadcrumbs";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CostsForm from "@/app/ui/costs/form";

export const metadata: Metadata = {
  title: "Costs | Edit",
};

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Costs", href: "/dashboard/costs" },
          {
            label: "Edit Cost",
            href: `/dashboard/costs/edit/${id}`,
            active: true,
          },
        ]}
      />
      <CostsForm params={props.params} />
    </main>
  );
}
