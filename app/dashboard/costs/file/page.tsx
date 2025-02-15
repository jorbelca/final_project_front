import Breadcrumbs from "@/app/ui/breadcrumbs";

import Parser from "./parser";
import { auth } from "@/auth";

export const metadata = {
  title: "Costs | File",
};

export default async function Page() {
  const session = await auth();
  const userId: number = Number(session?.user?.id);
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
      <Parser userId={+(userId)} />
    </main>
  );
}
