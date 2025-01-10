"use client"

import { deleteCost } from "@/app/lib/actions";
import { TrashIcon } from "@heroicons/react/24/outline";
import { redirect } from "next/navigation";
import { Button } from "../button";

export default function DeleteBtn({ costId }: { costId: number }) {
    const eliminateCost = async (costId: number) => {

        alert("¿Estás seguro de que deseas eliminar este costo?");
        const result = await deleteCost(costId);
        if (result.success) {
          redirect("/dashboard/costs");
        } else {
          console.error(result.message);
        }
      };
  return <Button color="red" onClick={() => 
    eliminateCost(costId)
  }>
    <TrashIcon className="h-5 w-5" />
  </Button>
    
  
}
