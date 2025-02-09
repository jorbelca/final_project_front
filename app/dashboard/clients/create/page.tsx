import { Metadata } from "next";
import Form from "@/app/ui/clients/form";
import Breadcrumbs from "@/app/ui/breadcrumbs";
import { auth } from "@/auth";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export const metadata: Metadata = {
  title: "Create a Client",
};
export default async function Page() {
  const session = await auth();
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
      <Form user_id={session?.user?.id ? Number(session.user.id) : undefined} />
    </main>
  );
}
