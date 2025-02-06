import Table from "@/app/ui/budgets/table";
import ReducedStatus from "@/app/ui/budgets/reducedStatus";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchBudgets, getLogo } from "@/app/lib/data";
import { Metadata } from "next";
import { auth } from "@/auth";
import Link from "next/link";

export const dynamic = "force-dynamic";
export const dynamicParams = true;

export const metadata: Metadata = {
  title: "Budgets",
};

export default async function Page({
  searchParams,
}: {
  searchParams?: { client?: string };
}) {
  const session = await auth();

  const budgets = await fetchBudgets(Number(session?.user?.id));
  const logo = await getLogo(Number(session?.user?.id));

  // Obtener clientes únicos
  const clients = Array.from(new Set(budgets.map((b) => b.client_name)));

  // Filtrar budgets si hay un cliente seleccionado en los searchParams
  const filteredBudgets = searchParams?.client
    ? budgets.filter((b) => b.client_name === searchParams.client)
    : budgets;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`text-2xl`}>Budgets</h1>
        <ReducedStatus budgets={filteredBudgets} />
      </div>

      {/* Selector de cliente con enlaces */}
      <div className="mt-4 flex items-center gap-2">
        <span>Filter by Client:</span>
        <div className="flex gap-2">
          <Link href="/dashboard/budgets">
            <button className="border p-2">All Clients</button>
          </Link>
          {clients.map((client) => (
            <Link key={client} href={`/dashboard/budgets?client=${client}`}>
              <button
                className={`border p-2 ${
                  searchParams?.client === client ? "bg-gray-300" : ""
                }`}
              >
                {client}
              </button>
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8"></div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table budgets={budgets} logo={logo} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center"></div>
    </div>
  );
}
