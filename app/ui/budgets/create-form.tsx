"use client";

import { Client, Cost } from "@/app/lib/definitions";
import Link from "next/link";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/ui/button";
import { createBudget } from "@/app/lib/actions";
import { useActionState, useState } from "react";
import { useSession } from "next-auth/react";

export default function Form({
  clients,
  costs,
}: {
  clients: Client[];
  costs: Cost[];
}) {
  const session = useSession();

  const [costsList, setCostsList] = useState<
    { quantity: number; description: string; cost: number }[]
  >([]);
  const [quantity, setQuantity] = useState<number | string>("");
  const [costId, setCostId] = useState<number | string>("");
  const [total, setTotal] = useState<number>(0);
  const [tax, setTax] = useState<number | string>("");
  const [discount, setDiscount] = useState<number | string>("");
  const [exQuantity, setExQuantity] = useState<string>("");
  const [exCost, setExCost] = useState<string>("");
  const [exDescription, setExDescription] = useState<string>("");
  const [clientId, setClientId] = useState<string>("");
  const initialState: any = { message: null, errors: {} };
  const [state, formAction] = useActionState(async (state: any) => {
    const response = await createBudget(
      Number(session?.data?.user?.id),
      Number(clientId),
      costsList,
      Number(discount),
      Number(tax)
    );
    return response;
  }, initialState);

  const handleAddCost = (e: React.FormEvent) => {
    e.preventDefault();

    if (costId && typeof costId === "string" && quantity) {
      const selectedCost = costs.find(
        (cost) => cost.cost_id === Number(costId)
      );
      if (selectedCost) {
        const newCost = {
          quantity: Number(quantity),
          description: selectedCost.description,
          cost: +selectedCost.cost,
        };

        setCostsList((prevCostsList) => {
          const updatedList = [...prevCostsList, newCost];
          updateTotal(updatedList); // Recalcula el total con la lista actualizada.
          return updatedList;
        });
      }

      setQuantity("");
      setCostId("");
    } else if (exQuantity && exCost) {
      const newCost = {
        quantity: Number(exQuantity),
        description: exDescription,
        cost: Number(exCost),
      };

      setCostsList((prevCostsList) => {
        const updatedList = [...prevCostsList, newCost];
        updateTotal(updatedList); // Recalcula el total con la lista actualizada.
        return updatedList;
      });

      setExQuantity("");
      setExCost("");
      setExDescription("");
    }
  };

  const handleRemoveCost = (index: number) => {
    setCostsList((prevCostsList) => {
      const updatedList = prevCostsList.filter((_, i) => i !== index);
      updateTotal(updatedList); // Recalcula el total basado en el nuevo costsList.
      return updatedList;
    });
  };

  const updateTotal = (updatedCostsList: typeof costsList) => {
    // Recalcula el total sumando todos los elementos del costsList.
    const baseTotal = updatedCostsList.reduce(
      (sum, item) => sum + item.quantity * item.cost,
      0
    );

    // Aplica descuentos e impuestos al total recalculado.
    const discountTotal = applyDiscount(baseTotal);
    const taxTotal = applyTaxes(discountTotal);
    setTotal(taxTotal);
  };
  const applyDiscount = (subTotal: number) => {
    const discountNumber = Number(discount);
    if (discountNumber > 0 && discountNumber < 100) {
      return subTotal - (subTotal * discountNumber) / 100;
    }
    return subTotal;
  };

  const applyTaxes = (baseTotal: number) => {
    const taxNumber = Number(tax);
    if (taxNumber > 0 && taxNumber < 100) {
      return baseTotal + (baseTotal * taxNumber) / 100;
    }
    return baseTotal;
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
              aria-describedby="customer-error"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
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
            costsList.map(({ description, quantity, cost }, index) => (
              <div
                className="flex justify-between items-center border-gray-200 bg-gray-100 p-2 mb-2"
                key={index}
              >
                <div>
                  {quantity} x {description} - {cost} $
                </div>
                <button
                  className="pl-20 text-red-500"
                  onClick={() => handleRemoveCost(index)}
                >
                  ❌
                </button>
              </div>
            ))}

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
              onChange={(e) => setCostId(e.target.value)}
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
          <div className="flex">
            <Button onClick={handleAddCost}>Exceptional Cost</Button>
            <input
              type="number"
              name="exQuantity"
              id="exQuantity"
              className="peer block w-1/6 cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              value={exQuantity}
              onChange={(e) => setExQuantity(e.target.value)}
              placeholder="Quantity"
            />
            <input
              type="number"
              name="exCost"
              id="exCost"
              className="peer block w-1/6 cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              value={exCost}
              onChange={(e) => setExCost(e.target.value)}
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

        {/* Impuestos */}
        <div className="flex flex items-center justify-between">
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
              onChange={(e) => {
                e.preventDefault();
                setTax(Number(e.target.value));
              }}
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
              onChange={(e) => {
                e.preventDefault();
                setDiscount(Number(e.target.value));
              }}
            />
          </div>
          {/* Total */}
          <div className="mt-20">Total: {total.toFixed(2)} $</div>
        </div>
      </div>

      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/dashboard"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>

        <Button
          type="submit"
          disabled={!(total > 0 && costsList.length > 0 && clientId)}
        >
          Create Budget
        </Button>
      </div>
    </form>
  );
}
