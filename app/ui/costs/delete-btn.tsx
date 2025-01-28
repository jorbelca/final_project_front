"use client";

import { deleteCost } from "@/app/lib/actions";
import { TrashIcon } from "@heroicons/react/24/outline";
import { redirect } from "next/navigation";
import { Button } from "../button";

export default function DeleteBtn({ costId }: { costId: number }) {
  const eliminateCost = async (costId: number) => {
    const confirm = window.confirm(
      "¿Estás seguro de que deseas eliminar este costo?"
    );

    if (confirm) {
      const result = await deleteCost(costId);
      if (result.success) {
        redirect("/dashboard/costs");
      } else {
        console.error(result.message);
      }
    }
  };
  return (
    <Button
      color="red-500"
      className="bg-red-500 hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500"
      onClick={() => eliminateCost(costId)}
    >
      <TrashIcon className="h-5 w-5" />
    </Button>
  );
}
