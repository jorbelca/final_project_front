"use client";

import BudgetState from "@/app/ui/budgets/status";
import { DeleteBudget, UpdateBudget } from "./buttons";

export default function BudgetsTable({
  query,
  currentPage,
  budgets,
}: {
  query?: string;
  currentPage?: number;
  budgets: any;
}) {
  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle ">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0 dark:bg-slate-600">
          <div className="md:hidden ">
            {budgets?.map((budget) => (
              <div
                key={budget.budget_id}
                className="mb-2 w-full rounded-md bg-white dark:bg-slate-500 p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p className="text-sm font-medium">{budget.budget_id}.</p>
                      &nbsp; <b>Client :</b>
                      {budget.client_id != null ? budget.name : ` ❌`}
                    </div>
                  </div>
                  <BudgetState status={budget.state} id={budget.budget_id} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <ul className="flex flex-col ">
                    {budget.content.map((item: any) => (
                      <li key={item.description}>
                        {item.quantity} X {item.description} ={" "}
                        {item.quantity * item.cost + " $"}
                      </li>
                    ))}
                  </ul>

                  <p>{new Date(budget.created_at).toDateString()}</p>
                </div>
                <div>
                  <hr />
                  <div className="flex justify-between align-baseline gap-2 mt-6">
                    <div>
                      <p>
                        <b>Taxes:</b> {budget.taxes} %
                      </p>
                      <p>
                        <b>Discount: </b>
                        {budget.discount} %
                      </p>
                    </div>
                    <div className="flex justify-center gap-2">
                      <UpdateBudget id={budget.budget_id} />
                      <DeleteBudget id={budget.budget_id} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Tabla estándar para pantallas medianas y grandes */}

          <table className="hidden min-w-full dark:bg-slate-600 text-gray-900 dark:text-white md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Id
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Details
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Discount
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Taxes
                </th>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Client
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  Actions
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  PDF
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-700">
              {budgets?.map((budget) => (
                <tr key={budget.budget_id} className="border-b">
                  <td className="px-4 py-4">{budget.budget_id}</td>
                  <td className="px-4 py-4 w-full">
                    <ul className="flex flex-col">
                      {budget.content.map((item: any) => (
                        <li key={item.description}>
                          {item.quantity} X {item.description} ={" "}
                          {item.quantity * item.cost + " $"}
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4">{budget.discount}%</td>
                  <td className="px-6 py-4">{budget.taxes}%</td>
                  <td className="px-6 py-4">
                    {budget.client_id != null ? budget.name : ` ❌`}
                  </td>
                  <td className="px-3 py-4">
                    {budget.created_at.toDateString()}
                  </td>
                  <td className="px-3 py-4">
                    <BudgetState status={budget.state} id={budget.budget_id} />
                  </td>
                  <td className="px-3 py-4 text-right">
                    <div className="flex justify-end gap-2">
                      <UpdateBudget id={budget.budget_id} />
                      <DeleteBudget id={budget.budget_id} />
                    </div>
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
