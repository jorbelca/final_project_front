import { deleteBudget } from "@/app/lib/actions";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Button } from "../button";

export function CreateBudget() {
  return (
    <Link
      href="/dashboard/budgets/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Budget</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateBudget({ budgetId }: { budgetId: number }) {
  return (
    <Link href={`/dashboard/budgets/${budgetId}/edit`}>
      <Button color="violet-500" className="dark:hover:bg-violet-400 ">
        <PencilIcon className="w-5" />
      </Button>
    </Link>
  );
}

export function DeleteBudget({ budgetId }: { budgetId: number }) {
  const eliminateBudget = async (budgetId: number) => {
    const confirm = window.confirm(
      "¿Estás seguro de que deseas eliminar este presupuesto?"
    );

    if (confirm) {
      const result = await deleteBudget(budgetId);
      if (result.success) {
        redirect("/dashboard/budgets");
      } else {
        alert("Error al eliminar el presupuesto");
        console.error(result.message);
      }
    }
  };
  return (
    <Button
      color="red-500"
      className="bg-red-500 hover:bg-red-600 dark:bg-red-400 dark:hover:bg-red-500"
      onClick={() => eliminateBudget(budgetId)}
    >
      <TrashIcon className="h-5 w-5" />
    </Button>
  );
}
