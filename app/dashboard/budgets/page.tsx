import Table from "@/app/ui/budgets/table";
import ReducedStatus from "@/app/ui/budgets/reducedStatus";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchBudgets, getLogo, getTotalBudgets } from "@/app/lib/data";
import { Metadata } from "next";
import { auth } from "@/auth";
import { FilterByClient } from "@/app/ui/budgets/filter_client";

import Link from "next/link";
import { Budget } from "@/app/lib/definitions";

export const metadata: Metadata = {
  title: "Budgets",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();
  const user_id = Number(session?.user?.id);

  const { client, page } = await searchParams;
  const currentPage = Number(page) || 1;

  const totalBudgets = await getTotalBudgets(user_id);
  const budgets: Budget[] = [];
  for (let i = 1; i <= currentPage; i++) {
    const budgetsFetched = await fetchBudgets(user_id, i);
    budgets.push(...budgetsFetched);
  }

  const allLoaded = budgets.length >= totalBudgets;

  const logo = await getLogo(Number(session?.user?.id));

  // Obtener clientes únicos
  const clients = Array.from(new Set(budgets.map((b) => b.client_name)));

  // Filtrar budgets si hay un cliente seleccionado en los searchParams
  const filteredBudgets =
    client && client !== "null"
      ? budgets.filter((b) => b.client_name === client)
      : budgets;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between ">
        <h1 className={`text-2xl`}>Budgets</h1>
        <ReducedStatus budgets={filteredBudgets} />
      </div>

      <FilterByClient
        client={client}
        clients={clients}
        currentPage={currentPage}
      />
      <div className="mt-2 flex items-center justify-between gap-2 "></div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table budgets={filteredBudgets} logo={logo} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Link
          href={`?page=${currentPage + 1}`}
          className={`px-4 py-2 bg-blue-600 text-white rounded ${
            allLoaded ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Load More
        </Link>
      </div>
    </div>
  );
}
