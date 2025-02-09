"use client";

import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { Button } from "../button";
import { deleteClient } from "@/app/lib/actions";
import { toast } from "@/hooks/use-toast";

export default function DeleteBtn({
  clientId,
  user_id,
}: {
  clientId: number;
  user_id: number;
}) {
  const router = useRouter();
  const eliminateClient = async (clientId: number, user_id: number) => {
    alert("¿Are you sure you want to delete this client?");
    const result = await deleteClient(clientId, user_id);
    if (result.success) {
      toast({
        title: "Success",
        description: "Deleted",
      });
      router.push("/dashboard/clients");
    } else {
      console.error(result.message);
      toast({
        title: "Error",
        description: "An error occurred while deleting the client",
        variant: "destructive",
      });
    }
  };
  return (
    <Button
      className="dark:bg-red-400 bg-red-600"
      color="red"
      onClick={() => eliminateClient(clientId, user_id)}
    >
      <TrashIcon className="h-5 w-5" />
    </Button>
  );
}
