import Breadcrumbs from "@/app/ui/budgets/breadcrumbs";
import CostsForm from "@/app/ui/costs/form";



export const metadata = {
  title: "Costs | Create",
};

export default async function Page() {
  
    

return (
<main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Costs", href: "/dashboard/costs" },
          {
            label: "Create Cost",
            href: `/dashboard/costs/create`,
            active: true,
          },
        ]}
      />
       <CostsForm />
    </main>  
)

}
