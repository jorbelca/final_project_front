import Table from "@/app/ui/budgets/table";
import ReducedStatus from "@/app/ui/budgets/reducedStatus";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchBudgets, getLogo } from "@/app/lib/data";
import { Metadata } from "next";
import { auth } from "@/auth";
import { FilterByClient } from "@/app/ui/budgets/filter_client";
import Pagination from "@/app/ui/budgets/pagination";

export const metadata: Metadata = {
  title: "Budgets",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const session = await auth();

  const budgets = await fetchBudgets(Number(session?.user?.id));
  const logo = await getLogo(Number(session?.user?.id));

  const { client, page } = await searchParams;
  const currentPage = Number(page) || 1;
  const itemsPerPage = 3;
  const totalPages = Math.ceil(budgets.length / itemsPerPage);

  // Obtener clientes únicos
  const clients = Array.from(new Set(budgets.map((b) => b.client_name)));

  // Filtrar budgets si hay un cliente seleccionado en los searchParams
  const filteredBudgets =
    client && client !== "null"
      ? budgets.filter((b) => b.client_name === client)
      : budgets;

  // Aplicar paginación (cortar el array)
  const paginatedBudgets = filteredBudgets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between ">
        <h1 className={`text-2xl`}>Budgets</h1>
        <ReducedStatus budgets={filteredBudgets} />
      </div>

      <FilterByClient client={client} clients={clients} />
      <div className="mt-2 flex items-center justify-between gap-2 "></div>
      <Suspense fallback={<InvoicesTableSkeleton />}>
        <Table budgets={paginatedBudgets} logo={logo} />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
