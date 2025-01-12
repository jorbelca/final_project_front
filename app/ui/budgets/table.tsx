
import { fetchBudgets } from "@/app/lib/data";
import BudgetState from "@/app/ui/budgets/status";

export default async function BudgetsTable({
  query,
  currentPage,
}: {
  query?: string;
  currentPage?: number;
}) {
  const budgets = await fetchBudgets(Number(process.env.USER_ID));

  
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {budgets?.map((budget) => (
              <div
                key={budget.budget_id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{budget.budget_id}</p>
                    </div>
                  </div>
                  <BudgetState status={budget.state} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {budget.content.details}
                    </p>
                    <p>{new Date(budget.created_at).toDateString()}</p>
                  </div>
                  {/* <div className="flex justify-end gap-2">
                    <UpdateInvoice id={budget.id} />
                    <DeleteInvoice id={budget.id} />
                  </div> */}
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Id
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                 Details
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                Client
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
            {budgets?.map((budget) => (
              <tr key={budget.budget_id} className="border-b">
                <td className="px-4 py-4">{budget.budget_id}</td>
                <td className="px-4 py-4">{budget.content.details}</td>
                <td className="px-6 py-4 ">{budget.client_id!=null?budget.client_id:` ❌` }</td>
                <td className="px-3 py-4">{budget.created_at.toDateString()}</td>
                <td className="px-3 py-4">
                  <BudgetState status={budget.state} />
                </td>
                <td className="px-3 py-4 text-right">
                  {/* <div className="flex justify-end gap-2">
                    <UpdateInvoice id={budget.id} />
                    <DeleteInvoice id={budget.id} />
                  </div> */}
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
