import { lusitana } from "@/app/ui/fonts";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";
import { fetchCosts } from "@/app/lib/data";
import { formatDateToLocal } from "@/app/lib/utils";
import Link from "next/link";
import { Button } from "@/app/ui/button";
import { PencilIcon, PlusIcon } from "@heroicons/react/24/outline";
import DeleteBtn from "@/app/ui/costs/delete-btn";

export const metadata = {
  title: "Costs",
};

export default async function Page() {
  const costs = await fetchCosts(Number(process.env.USER_ID));

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Costs</h1>
        <Link href="/dashboard/costs/create">
          <Button color="blue">
            <PlusIcon className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      <Suspense fallback={<InvoicesTableSkeleton />}>
        <div className="mt-6 flow-root">
          <div className="inline-block min-w-full align-middle">
            <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
              <table className="min-w-full text-gray-900">
                <thead className="rounded-lg text-left text-sm font-normal">
                  <tr>
                    <th scope="col" className="px-4 py-5 font-medium">ID</th>
                    <th scope="col" className="px-4 py-5 font-medium">Descripción</th>
                    <th scope="col" className="px-4 py-5 font-medium">Precio</th>
                    <th scope="col" className="px-4 py-5 font-medium">Unidad</th>
                    <th scope="col" className="px-4 py-5 font-medium">Periodicidad</th>
                    <th scope="col" className="px-4 py-5 font-medium">Creacion</th>
                    <th scope="col" className="px-4 py-5 font-medium">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {costs?.map((cost) => (
                    <tr key={cost.cost_id} className="border-b">
                      <td className="px-4 py-3">{cost.cost_id}</td>
                      <td className="px-4 py-3">{cost.description}</td>
                      <td className="px-4 py-3">{cost.cost}</td>
                      <td className="px-4 py-3">{cost.unit}</td>
                      <td className="px-4 py-3">{cost.periodicity}</td>
                      <td className="px-4 py-3">{cost.created_at ? formatDateToLocal(cost.created_at.toDateString()) : ""}</td>
                      <td className="px-4 py-3">
                        <Link href={`/dashboard/costs/edit/${cost.cost_id}`}>
                          <Button>
                            <PencilIcon className="h-5 w-5" />
                          </Button>
                        </Link>
                        <br />
                          <DeleteBtn costId={Number(cost.cost_id)} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Suspense>
    </div>
  );
}
