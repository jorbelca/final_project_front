"use client";

import { Client, Cost } from "@/app/lib/definitions";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createBudget } from "@/app/lib/actions";
import { useState } from "react";

import {  useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { CircleDollarSignIcon } from "lucide-react";
import clsx from "clsx";
import { teko } from "../fonts";

export default function BudgetForm({
  clients,
  costs,

  user_id,
}: {
  clients: Client[];
  costs: Cost[];

  user_id: number;
}) {
  const router = useRouter();
  if (user_id === 0) {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Problem with authentication",
    });
    router.push("/dashboard/budgets");
  }

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
      const response = await createBudget(
        Number(user_id),
        costsList,
        Number(formValues.discount),
        Number(formValues.tax),
        Number(formValues.clientId)
      );

      if (response.success) {
        toast({
          title: "Success",
          description: "Budget created successfully",
        });
        router.push("/dashboard/budgets");
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Error creating budget",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error ",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 pb-10 sm:p-6 max-w-3xl mx-auto bg-gray-50 dark:bg-gray-700 rounded-md shadow-md"
    >
      <input type="hidden" name="user_id" value={user_id} />
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
              &nbsp; &nbsp; &nbsp; Select a client
            </option>
            {clients.map((client) => (
              <option key={client.client_id} value={client.client_id}>
                {client.name}
              </option>
            ))}
          </select>
          <UserCircleIcon className="absolute top-1/2 left-2 w-5 h-5 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium">List of Costs</h3>
        <ul className="space-y-2 mt-2">
          {costsList.map((cost, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 dark:bg-slate-900 p-2 rounded-md"
            >
              <span>
                {cost.quantity} x {cost.description} - ${cost.cost}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveCost(index)}
                className="text-red-500 hover:underline text-2xl"
              >
                X
              </button>
            </li>
          ))}
        </ul>

        <div className="flex flex-col sm:flex-row items-center gap-2 mt-4">
          <label htmlFor="costId" className="block text-sm font-medium">
            Costs
          </label>

          <div className="relative w-full sm:flex-1">
            <select
              name="costId"
              value={formValues.costId}
              onChange={handleChange}
              className="p-2 border rounded-md w-full sm:flex-1 dark:bg-slate-900 dark:border-gray-100 dark:text-white block"
            >
              <option value="" disabled>
                &nbsp; &nbsp; &nbsp; &nbsp; Select a cost
              </option>
              {costs.map((cost) => (
                <option key={cost.cost_id} value={cost.cost_id}>
                  {cost.description} (${cost.cost})
                </option>
              ))}
            </select>
            <CircleDollarSignIcon className="absolute top-1/2 left-2 w-5 h-5 -translate-y-1/2 text-gray-400" />
          </div>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formValues.quantity}
            onChange={handleChange}
            className="p-2 border rounded-md w-full sm:w-20 dark:bg-slate:900 dark:border-gray-100 dark:text-white"
          />
          <Button
            type="button"
            onClick={handleAddCost}
            className="w-full sm:w-auto"
            color="blue"
          >
            Add
          </Button>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 mt-4">
          <label
            htmlFor="exceptionalDescription"
            className="block text-sm font-medium"
          >
            Extraordinary Costs
          </label>
          <input
            type="text"
            name="exceptionalDescription"
            placeholder="Description"
            value={formValues.exceptionalDescription}
            onChange={handleChange}
            className="p-2 border rounded-md w-full sm:w-30 dark:bg-slate:900 dark:border-gray-100 dark:text-white"
          />
          <input
            type="number"
            name="exceptionalQuantity"
            placeholder="Qty"
            value={formValues.exceptionalQuantity}
            onChange={handleChange}
            className="p-2 border rounded-md w-full sm:w-20 dark:bg-slate:900 dark:border-gray-100 dark:text-white"
          />
          <input
            type="number"
            name="exceptionalCost"
            placeholder="Cost"
            value={formValues.exceptionalCost}
            onChange={handleChange}
            className="p-2 border rounded-md w-full sm:w-24 dark:bg-slate:900 dark:border-gray-100 dark:text-white"
          />

          <Button
            type="button"
            onClick={handleAddCost}
            className="w-full sm:w-auto"
            color="blue"
          >
            Add
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
          href="/dashboard/budgets"
          className={clsx(
            `${teko.className}`,
            "text-lg font-medium px-4 py-1 bg-red-500 hover:bg-red-600 rounded-md text-white"
          )}
        >
          Cancel
        </Link>
        <Button
          type="submit"
          disabled={
            !formValues.clientId || costsList.length === 0 || total <= 0
          }
        >
          Create Budget
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
