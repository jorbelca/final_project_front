"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { redirect } from "next/navigation";
import { Button } from "../button";
import { deleteClient } from "@/app/lib/actions";

export default function DeleteBtn({ clientId }: { clientId: number }) {
  const eliminateClient = async (clientId: number) => {
    alert("¿Estás seguro de que deseas eliminar este cliente?");
    const result = await deleteClient(clientId);
    if (result.success) {
      redirect("/dashboard/clients");
    } else {
      console.error(result.message);
    }
  };
  return (
    <Button
      className="dark:bg-red-400 bg-red-600"
      color="red"
      onClick={() => eliminateClient(clientId)}
    >
      <TrashIcon className="h-5 w-5" />
    </Button>
  );
}
