import { createClient, getClientById, updateClient } from "@/app/lib/actions";
import { Client } from "@/app/lib/definitions";
import { lusitana } from "@/app/ui/fonts";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Clients",
};

export default async function ClientsForm(props: {
  params?: Promise<{ id?: string }>;
}) {
  const params = (await props.params) || null;
  const id = params?.id || null;

  let client: Client | null = null;
  if (id) {
    client = await getClientById(Number(id));
  }

  const handleSubmit = async (formData: FormData) => {
    "use server";
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const image_url = (formData.get("image_url") as string) ?? "";
    let result: { success: boolean; message: string } | null = null;

    const session = await auth();

    if (client?.client_id) {
      console.log("update");

      result = await updateClient(
        Number(client?.client_id),
        name,
        email,
        image_url
      );
    } else {
      console.log("create");
      result = await createClient(
        Number(session?.user?.id),
        name,
        email,
        image_url
      );
    }
    if (result.success) {
      redirect("/dashboard/clients");
    } else {
      console.error(result.message);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full bg-gray-100 p-4 rounded-lg p-4">
        <form action={handleSubmit} className="flex flex-col gap-2">
          <input type="hidden" name="client_id" value={client?.client_id} />
          <input
            type="text"
            placeholder="Name"
            name="name"
            className="w-full"
            defaultValue={client?.name}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            className="w-1/2"
            defaultValue={client?.email}
          />
          <input
            type="text"
            placeholder="image_url"
            name="image_url"
            className="w-1/2"
            defaultValue={client?.image_url}
          />

          <button
            type="submit"
            className="w-1/2 bg-violet-400 text-white p-2 hover:bg-violet-600"
          >
            {client?.client_id ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}
