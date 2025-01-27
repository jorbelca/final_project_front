"use client";

import { Budget, Client, Cost } from "@/app/lib/definitions";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createBudget, updateBudget } from "@/app/lib/actions";
import { useActionState, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BudgetForm({
  clients,
  costs,
  budget,
}: {
  clients: Client[];
  costs: Cost[];
  budget?: Budget;
}) {
  const session = useSession();
  const router = useRouter();

  const [costsList, setCostsList] = useState<
    { quantity: number; description: string; cost: number }[]
  >([]);
  const [formValues, setFormValues] = useState({
    quantity: "",
    costId: "",
    exceptionalQuantity: "",
    exceptionalCost: "",
    exceptionalDescription: "",
    clientId: "",
    tax: "",
    discount: "",
  });
  const [total, setTotal] = useState<number>(0);

  // Calcula automáticamente el total al cambiar los valores
  useEffect(() => {
    const baseTotal = costsList.reduce(
      (sum, item) => sum + item.quantity * item.cost,
      0
    );
    const discountedTotal =
      formValues.discount && Number(formValues.discount) > 0
        ? baseTotal - (baseTotal * Number(formValues.discount)) / 100
        : baseTotal;
    const taxedTotal =
      formValues.tax && Number(formValues.tax) > 0
        ? discountedTotal + (discountedTotal * Number(formValues.tax)) / 100
        : discountedTotal;

    setTotal(taxedTotal);
  }, [costsList, formValues.tax, formValues.discount]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleAddCost = () => {
    if (formValues.costId && formValues.quantity) {
      const selectedCost = costs.find(
        (cost) => cost.cost_id === Number(formValues.costId)
      );
      if (selectedCost) {
        setCostsList([
          ...costsList,
          {
            quantity: Number(formValues.quantity),
            description: selectedCost.description,
            cost: selectedCost.cost,
          },
        ]);
        setFormValues({ ...formValues, quantity: "", costId: "" });
      }
    } else if (formValues.exceptionalQuantity && formValues.exceptionalCost) {
      setCostsList([
        ...costsList,
        {
          quantity: Number(formValues.exceptionalQuantity),
          description: formValues.exceptionalDescription || "Custom cost",
          cost: Number(formValues.exceptionalCost),
        },
      ]);
      setFormValues({
        ...formValues,
        exceptionalQuantity: "",
        exceptionalCost: "",
        exceptionalDescription: "",
      });
    }
  };

  const handleRemoveCost = (index: number) => {
    const updatedCosts = costsList.filter((_, i) => i !== index);
    setCostsList(updatedCosts);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userId = session?.data?.user?.id;
      const response = budget
        ? await updateBudget(
            budget.budget_id,
            Number(userId),
            Number(formValues.clientId),
            costsList,
            Number(formValues.discount),
            Number(formValues.tax)
          )
        : await createBudget(
            Number(userId),
            costsList,
            Number(formValues.discount),
            Number(formValues.tax),
            Number(formValues.clientId)
          );

      if (response.success) router.push("/dashboard/budgets");
      else alert(response.message);
    } catch (error) {
      alert("Error submitting form: " + error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 sm:p-6 max-w-3xl mx-auto bg-gray-50 dark:bg-gray-700 rounded-md shadow-md"
    >
      <div className="mb-6">
        <label htmlFor="clientId" className="block text-sm font-medium">
          Choose a client
        </label>
        <div className="relative">
          <select
            id="clientId"
            name="clientId"
            value={formValues.clientId}
            onChange={handleChange}
            className="block w-full mt-2 p-2 border rounded-md"
          >
            <option value="" disabled>
              Select a client
            </option>
            {clients.map((client) => (
              <option key={client.client_id} value={client.client_id}>
                {client.name}
              </option>
            ))}
          </select>
          <UserCircleIcon className="absolute top-1/2 left-3 w-5 h-5 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium">Costs</h3>
        <ul className="space-y-2 mt-2">
          {costsList.map((cost, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 dark:bg-gray-600 p-2 rounded-md"
            >
              <span>
                {cost.quantity} x {cost.description} - ${cost.cost}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveCost(index)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row items-center gap-2 mt-4">
          <select
            name="costId"
            value={formValues.costId}
            onChange={handleChange}
            className="p-2 border rounded-md w-full sm:flex-1 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          >
            <option value="" disabled>
              Select a cost
            </option>
            {costs.map((cost) => (
              <option key={cost.cost_id} value={cost.cost_id}>
                {cost.description} (${cost.cost})
              </option>
            ))}
          </select>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formValues.quantity}
            onChange={handleChange}
            className="p-2 border rounded-md w-full sm:w-20 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          <Button
            type="button"
            onClick={handleAddCost}
            className="w-full sm:w-auto"
          >
            Add
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 mt-4">
          <input
            type="text"
            name="exceptionalDescription"
            placeholder="Description"
            value={formValues.exceptionalDescription}
            onChange={handleChange}
            className="p-2 border rounded-md w-full sm:w-24 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          <input
            type="number"
            name="exceptionalQuantity"
            placeholder="Qty"
            value={formValues.exceptionalQuantity}
            onChange={handleChange}
            className="p-2 border rounded-md w-full sm:w-20 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />
          <input
            type="number"
            name="exceptionalCost"
            placeholder="Cost"
            value={formValues.exceptionalCost}
            onChange={handleChange}
            className="p-2 border rounded-md w-full sm:w-24 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          />

          <Button type="button" onClick={handleAddCost} className="w-full sm:w-auto">
            Add Custom
          </Button>
        </div>
      </div>

      <div className="mb-6 flex gap-4">
        <div className="flex-1">
          <label htmlFor="tax" className="block text-sm font-medium">
            Tax (%)
          </label>
          <input
            type="number"
            id="tax"
            name="tax"
            value={formValues.tax}
            onChange={handleChange}
            className="block w-full mt-2 p-2 border rounded-md"
          />
        </div>
        <div className="flex-1">
          <label htmlFor="discount" className="block text-sm font-medium">
            Discount (%)
          </label>
          <input
            type="number"
            id="discount"
            name="discount"
            value={formValues.discount}
            onChange={handleChange}
            className="block w-full mt-2 p-2 border rounded-md"
          />
        </div>
      </div>

      <div className="mb-6 text-lg font-semibold">
        Total: ${total.toFixed(2)}
      </div>

      <div className="flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cancel
        </Link>
        <Button
          type="submit"
          disabled={
            !formValues.clientId || costsList.length === 0 || total <= 0
          }
        >
          {budget ? "Update Budget" : "Create Budget"}
        </Button>
      </div>

      <style jsx>{`
        @media (max-width: 640px) {
          form {
            padding-top: 2rem;
          }
        }
      `}</style>
    </form>
  );
}
