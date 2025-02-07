import { lato } from "@/app/ui/fonts";
import Form from "@/app/ui/budgets/create-form";

import { Metadata } from "next";
import { fetchCosts } from "@/app/lib/data";
import { fetchClients } from "@/app/lib/actions";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export const metadata: Metadata = {
  title: "Create a Budget",
};
export default async function Page() {
  const session = await auth();
  const clients = await fetchClients(Number(session?.user?.id));
  const costs = await fetchCosts(Number(session?.user?.id));
  return (
    <main>
      <div className="flex w-full flex-col justify-between">
        <h1 className={`${lato.className} text-2xl pb-4 `}>Create a Budget</h1>
        <div className="w-full">
          <Form
            clients={clients}
            costs={costs}
            user_id={+(session?.user?.id ?? 0)}
          />
        </div>
      </div>
    </main>
  );
}
