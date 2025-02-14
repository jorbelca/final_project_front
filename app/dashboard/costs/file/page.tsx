import Breadcrumbs from "@/app/ui/breadcrumbs";
import CostsForm from "@/app/ui/costs/form";
import Parser from "./parser";

export const metadata = {
  title: "Costs | File",
};

export default async function Page() {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Costs", href: "/dashboard/costs" },
          {
            label: "Upload a file",
            href: `/dashboard/costs/file`,
            active: true,
          },
        ]}
      />
      <Parser></Parser>
    </main>
  );
}
