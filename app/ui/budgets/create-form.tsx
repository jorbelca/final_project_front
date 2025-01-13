"use client";

import { Client, Cost } from "@/app/lib/definitions";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createBudget } from "@/app/lib/actions";
import { useActionState, useState } from "react";

export default function Form({
  clients,
  costs,
}: {
  clients: Client[];
  costs: Cost[];
}) {
  const [costsList, setCostsList] = useState<
    { quantity: number; cost: any | null }[]
  >([]);
  const [quantity, setQuantity] = useState<any>("");
  const [costId, setCostId] = useState<any>("");
  const [total, setTotal] = useState<number>(0);
  const [tax, setTax] = useState<number>();
  const [discount, setDiscount] = useState<number>();
  const [exDescription, setExDescription] = useState<string>("");
  const [exCost, setExCost] = useState<any>();
  const [exQuantity, setExQuantity] = useState<any>();
  const initialState: any = { message: null, errors: {} };
  const [state, formAction] = useActionState(createBudget, initialState);

  const handleAddCost = () => {
    if (costId) {
      const selectedCost = costs.find((cost) => cost.cost_id === costId);
      if (selectedCost) {
        setCostsList((prevCostsList) => [
          ...prevCostsList,
          { quantity: quantity, cost: selectedCost },
        ]);
        setTotal((prevTotal) => prevTotal + quantity * selectedCost.cost);
      }
      setQuantity("");
      setCostId(0);
    } else {
      setCostsList((prevCostsList) => [
        ...prevCostsList,
        { quantity: exQuantity, cost: exCost, description: exDescription },
      ]);
      setTotal((prevTotal) => prevTotal + exQuantity * exCost);

      setExQuantity("");
      setExCost("");
      setExDescription("");
    }
  };

  const handleRemoveCost = (index: number) => {
    setCostsList((prevCostsList) => {
      const costToRemove = prevCostsList[index];
      setTotal(
        (prevTotal) =>
          prevTotal - costToRemove.quantity * costToRemove.cost.cost
      );
      return prevCostsList.filter((_, i) => i !== index);
    });
  };

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* client Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-medium">
            Choose a client
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              aria-describedby="customer-error"
            >
              <option value="" disabled>
                Select a client
              </option>
              {clients?.map((client) => (
                <option key={client.client_id} value={client.client_id}>
                  {client.name}
                </option>
              ))}
            </select>
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
          {/* Error */}
          <div id="client-error" aria-live="polite" aria-atomic="true">
            {state.errors?.clientId &&
              state.errors.clientId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Costs */}
        <div className="mb-4">
          <label htmlFor="cost" className="mb-2 block text-sm font-medium">
            Costs
          </label>
          {/* Lista de costos */}
          {costsList.length > 0 &&
            costsList.map(({ cost, quantity }, index) => (
              <div
                className="flex justify-between items-center border-gray-200 bg-gray-100 p-2 mb-2"
                key={index}
              >
                <div className=" ">
                  {quantity} x {cost.description} - {cost.cost} - {cost.unit}
                </div>
                <button
                  className="pl-20 text-red-500"
                  onClick={() => handleRemoveCost(index)}
                >
                  ❌
                </button>
              </div>
            ))}
          <div></div>

          <div className="flex gap-2">
            <Button onClick={handleAddCost}>Add Cost</Button>
            <input
              type="number"
              name="cost"
              id="cost"
              placeholder="Quantity"
              className="peer block w-1/6 cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />

            <select
              id="cost"
              name="costId"
              className="peer block w-5/6 cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              aria-describedby="cost-error"
              value={costId}
              onChange={(e) => setCostId(Number(e.target.value))}
            >
              <option value="" disabled>
                Select a cost
              </option>
              {costs?.map((cost) => (
                <option key={cost.cost_id} value={cost.cost_id}>
                  {`${cost.description} - ${cost.cost}  al  ${cost.unit}`}
                </option>
              ))}
            </select>
          </div>
          <br />
          <label htmlFor="cost" className="mb-2 block text-sm font-medium">
            Exceptional Costs
          </label>
          <div className="flex ">
            <Button onClick={handleAddCost}> Exceptional Cost</Button>
            <input
              type="number"
              name="exQuantity"
              id="exQuantity"
              className="peer block w-1/6 cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              value={exQuantity}
              onChange={(e) => setExQuantity(Number(e.target.value))}
              placeholder="Quantity"
            />
            <input
              type="number"
              name="exCost"
              id="exCost"
              className="peer block w-1/6 cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              value={exCost}
              onChange={(e) => setExCost(Number(e.target.value))}
              placeholder="Cost"
            />

            <input
              className="peer block w-5/6 cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              type="text"
              name="exDescription"
              id="exDescription"
              aria-describedby="cost-error"
              value={exDescription}
              onChange={(e) => setExDescription(e.target.value)}
              placeholder="Description"
            />
          </div>

          {/* Error */}
          <div id="cost-error" aria-live="polite" aria-atomic="true">
            {state.errors?.costId &&
              state.errors.costId.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        {/* Impuestos  */}
        <div className=" flex flex items-center justify-between">
          <div className="w-1/6 flex flex-col">
            <label htmlFor="tax" className="mb-2 block text-sm font-medium ">
              Tax
            </label>
            <input
              type="number"
              name="tax"
              id="tax"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              value={tax}
              onChange={(e) => setTax(Number(e.target.value))}
            />
          </div>

          <div className="w-1/6 flex flex-col">
            <label
              htmlFor="discount"
              className="mb-2 block text-sm font-medium "
            >
              Discount
            </label>
            <input
              type="number"
              name="discount"
              id="discount"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
            />
          </div>
          {/* Total */}
          <div className="mt-20">Total: {total}</div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Budget</Button>
      </div>
    </form>
  );
}
