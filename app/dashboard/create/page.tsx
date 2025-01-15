import { lusitana } from "@/app/ui/fonts";
import Form from "@/app/ui/budgets/create-form";

import { Metadata } from "next";
import { fetchCosts } from "@/app/lib/data";
import { fetchClients } from "@/app/lib/actions";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export const metadata: Metadata = {
  title: "Create a Budget",
};
export default async function Page() {
  const clients = await fetchClients(Number(process.env.USER_ID));
  const costs = await fetchCosts(Number(process.env.USER_ID));
  return (
    <main>
      <div className="flex w-full flex-col justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Create a Budget</h1>
        <div className="w-full">
          <Form clients={clients} costs={costs} />
        </div>
      </div>
    </main>
  );
}
