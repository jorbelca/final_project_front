import { createCost, getCostById, updateCost } from "@/app/lib/actions";
import { lusitana } from "@/app/ui/fonts";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Costs",
};

export default async function CostsForm(props: { params?: Promise<{ id?: string }> }) {
  const params = await props.params;
  const id = params?.id;
  let cost;

  if (id) {
    cost = await getCostById(Number(id));
  }

  const handleSubmit = async (formData: FormData) => {
    "use server";
    const cost_id = formData.get("cost_id") as string;
    const description = formData.get("description") as string;
    const cost = formData.get("cost") as string;
    const unit = formData.get("unit") as string;
    const periodicity = formData.get("periodicity") as string;
    let result;
    const session = await auth();

    if (cost_id) {
      console.log("update");
      result = await updateCost(Number(cost_id), description, Number(cost), unit, periodicity);
    } else {
      console.log("create");
      result = await createCost(Number(session?.user?.id), description, Number(cost), unit, periodicity);
    }

    if (result.success) {
      redirect("/dashboard/costs");
    } else {
      console.error(result.message);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-900">
      <h1
        className={`${lusitana.className} text-2xl font-semibold text-gray-900 dark:text-white mb-4`}
      >
        {cost?.cost_id ? "Update a Cost" : "Create a Cost"}
      </h1>
      <form action={handleSubmit} className="space-y-4">
        {/* Hidden Cost ID */}
        <input type="hidden" name="cost_id" value={cost?.cost_id} />

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <input
            id="description"
            type="text"
            name="description"
            placeholder="Enter cost description"
            defaultValue={cost?.description}
            className="mt-1 w-full rounded-lg border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Cost Field */}
        <div>
          <label htmlFor="cost" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Cost
          </label>
          <input
            id="cost"
            type="number"
            name="cost"
            placeholder="Enter price"
            defaultValue={cost?.cost}
            className="mt-1 w-full rounded-lg border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Unit Field */}
        <div>
          <label htmlFor="unit" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Unit
          </label>
          <input
            id="unit"
            type="text"
            name="unit"
            placeholder="Enter unit"
            defaultValue={cost?.unit}
            className="mt-1 w-full rounded-lg border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Periodicity Field */}
        <div>
          <label htmlFor="periodicity" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Periodicity
          </label>
          <select
            id="periodicity"
            name="periodicity"
            defaultValue={cost?.periodicity || "one-time"}
            className="mt-1 w-full rounded-lg border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="one-time">One-time</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-violet-500 text-white py-2 font-medium hover:bg-violet-600 focus:ring-4 focus:ring-violet-300 dark:focus:ring-violet-700"
        >
          {cost?.cost_id ? "Update Cost" : "Create Cost"}
        </button>
      </form>
    </div>
  );
}