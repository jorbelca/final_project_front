"use client";

import { Budget, Client, Cost } from "@/app/lib/definitions";
import Link from "next/link";

import { Button } from "@/app/ui/button";
import { updateBudget } from "@/app/lib/actions";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Form({
  clients,
  costs,
  budget,
}: {
  clients: Client[];
  costs: Cost[];
  budget: Budget;
}) {
  const session = useSession();
  const router = useRouter();

  const [costsList, setCostsList] = useState(budget.content || []);
  const [total, setTotal] = useState<number>(0);
  const [tax, setTax] = useState<number>(budget.taxes || 0);
  const [discount, setDiscount] = useState<number>(budget.discount || 0);
  const [clientId, setClientId] = useState<number>(budget.client_id || 0);

  const [selectedCostId, setSelectedCostId] = useState<number>(0);
  const [selectedQuantity, setSelectedQuantity] = useState<number>(1);
  const [extraDescription, setExtraDescription] = useState<string>("");
  const [extraCost, setExtraCost] = useState<number>(0);
  const [extraQuantity, setExtraQuantity] = useState<number>(1);

  // Actualiza el total cuando cambian los costos, descuento o impuestos
  useEffect(() => {
    const calculateTotal = () => {
      const baseTotal = costsList.reduce(
        (sum, item) => sum + item.quantity * item.cost,
        0
      );
      const discountTotal =
        discount > 0 && discount < 100
          ? baseTotal - (baseTotal * discount) / 100
          : baseTotal;
      const finalTotal =
        tax > 0 && tax < 100
          ? discountTotal + (discountTotal * tax) / 100
          : discountTotal;
      setTotal(finalTotal);
    };
    calculateTotal();
  }, [costsList, tax, discount]);

  const handleAddCost = (
    quantity: number,
    description: string,
    cost: number
  ) => {
    if (quantity > 0 && cost >= 0) {
      setCostsList((prev) => [...prev, { quantity, description, cost }]);
    }
  };

  const handleRemoveCost = (index: number) => {
    setCostsList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (total > 0 && clientId) {
      try {
        const response = await updateBudget(
          budget.budget_id,
          Number(session?.data?.user?.id),
          clientId,
          costsList,
          discount,
          tax
        );
        if (response.success) {
          router.push("/dashboard/budgets");
        } else {
          alert("Error updating budget");
        }
      } catch (error) {
        alert("Unexpected error: " + error);
      }
    } else {
      alert("Please fill all required fields.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="p-6 bg-gray-50 dark:bg-gray-600 rounded-md">
        {/* Cliente */}
        <div className="mb-4">
          <label htmlFor="client" className="block text-sm font-medium">
            Cliente
          </label>
          <select
            id="client"
            value={clientId}
            onChange={(e) => setClientId(Number(e.target.value))}
            className="w-full rounded-md border py-2 px-3"
          >
            <option value={0} disabled>
              Selecciona un cliente
            </option>
            {clients.map((client) => (
              <option key={client.client_id} value={client.client_id}>
                {client.name}
              </option>
            ))}
          </select>
        </div>

        {/* Costos */}
        <div className="mb-4 ">
          <label className="block text-sm font-medium">Costos</label>
          {costsList.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center p-2 mb-2 bg-gray-100 dark:bg-gray-900 rounded"
            >
              <span>
                {item.quantity} x {item.description} - {item.cost} $
              </span>
              <button
                type="button"
                onClick={() => handleRemoveCost(index)}
                className="text-red-500"
              >
                ❌
              </button>
            </div>
          ))}

          {/* Selector de costos predefinidos */}
          <div className="flex gap-2 mt-2">
            <select
              value={selectedCostId}
              onChange={(e) => setSelectedCostId(Number(e.target.value))}
              className="w-1/2 rounded-md border py-2 px-3"
            >
              <option value={0}>Selecciona un costo</option>
              {costs.map((cost) => (
                <option key={cost.cost_id} value={cost.cost_id}>
                  {cost.description} - {cost.cost} $
                </option>
              ))}
            </select>
            <input
              type="number"
              min="1"
              value={selectedQuantity}
              onChange={(e) => setSelectedQuantity(Number(e.target.value))}
              className="w-1/4 rounded-md border py-2 px-3"
              placeholder="Cantidad"
            />
            <button
              type="button"
              onClick={() => {
                const selectedCost = costs.find(
                  (cost) => cost.cost_id === selectedCostId
                );
                if (selectedCost) {
                  handleAddCost(
                    selectedQuantity,
                    selectedCost.description,
                    selectedCost.cost
                  );
                }
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Añadir
            </button>
          </div>

          {/* Costos extraordinarios */}
          <div className="mt-4">
            <label className="block text-sm font-medium">
              Agregar costo extraordinario
            </label>
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={extraDescription}
                onChange={(e) => setExtraDescription(e.target.value)}
                placeholder="Descripción"
                className="w-1/2 rounded-md border py-2 px-3"
              />
              <input
                type="number"
                min="0"
                value={extraCost}
                onChange={(e) => setExtraCost(Number(e.target.value))}
                placeholder="Costo"
                className="w-1/4 rounded-md border py-2 px-3"
              />
              <input
                type="number"
                min="1"
                value={extraQuantity}
                onChange={(e) => setExtraQuantity(Number(e.target.value))}
                placeholder="Cantidad"
                className="w-1/4 rounded-md border py-2 px-3"
              />
              <button
                type="button"
                onClick={() =>
                  handleAddCost(extraQuantity, extraDescription, extraCost)
                }
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Añadir
              </button>
            </div>
          </div>
        </div>

        {/* Impuestos y Descuentos */}
        <div className="flex gap-4 mb-4">
          <div className="w-1/2">
            <label htmlFor="tax" className="block text-sm font-medium">
              Impuestos (%)
            </label>
            <input
              id="tax"
              type="number"
              value={tax}
              onChange={(e) => setTax(Number(e.target.value))}
              className="w-full rounded-md border py-2 px-3"
            />
          </div>
          <div className="w-1/2">
            <label htmlFor="discount" className="block text-sm font-medium">
              Descuento (%)
            </label>
            <input
              id="discount"
              type="number"
              value={discount}
              onChange={(e) => setDiscount(Number(e.target.value))}
              className="w-full rounded-md border py-2 px-3"
            />
          </div>
        </div>

        {/* Total */}
        <div className="text-xl font-bold">Total: {total.toFixed(2)} $</div>
      </div>

      <div className="flex justify-end mt-6 gap-4">
        <Link
          href="/dashboard/budgets"
          className="px-4 py-2 bg-gray-200 dark:bg-yellow-600 rounded-md"
        >
          Cancelar
        </Link>
        <Button type="submit" disabled={total <= 0}>
          Guardar Presupuesto
        </Button>
      </div>
    </form>
  );
}
