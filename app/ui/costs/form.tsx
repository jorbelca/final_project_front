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
             result = await createCost(Number(session?.user?.id),description, Number(cost), unit, periodicity);
        }
        if (result.success) {
            redirect("/dashboard/costs");
        } else {
            console.error(result.message);
        }
    }


    

return (
    <div className="w-full">
        <h1 className={`${lusitana.className} text-2xl`}>{cost?.cost_id ? "Update a Cost" : "Create a Cost"}</h1>
        <div className="w-full bg-gray-100 p-4 rounded-lg p-4">
          
          <form action={handleSubmit} className="flex flex-col gap-2">
            <input type="hidden" name="cost_id" value={cost?.cost_id} />
            <input type="text" placeholder="Description" name="description" className="w-full" defaultValue={cost?.description} />
            <input type="number" placeholder="Price" name="cost" className="w-1/2" defaultValue={cost?.cost} />
            <input type="text" placeholder="Unit" name="unit" className="w-1/2" defaultValue={cost?.unit} />
            <select name="periodicity" id="periodicity" className="w-1/2" defaultValue={cost?.periodicity}>
                <option value="one-time">One-time</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="yearly">Yearly</option>
            </select>
            <button type="submit" className="w-1/2 bg-violet-400 text-white p-2 hover:bg-violet-600">{cost?.cost_id ? "Update" : "Create"}</button>
          </form>
        </div>
    </div>
)

}
