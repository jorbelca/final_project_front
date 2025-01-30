
import { createClient, getClientById, updateClient } from "@/app/lib/actions";
import { Client } from "@/app/lib/definitions";
import { auth } from "@/auth";
import { toast } from "@/hooks/use-toast";

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
    'use server'
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const image_url = (formData.get("image_url") as string) ?? "";
    let result: { success: boolean; message: string } | null = null;

    const session = await auth();

    if (client?.client_id) {
      result = await updateClient(
        Number(client?.client_id),
        name,
        email,
        image_url
      );
    } else {
      result = await createClient(
        Number(session?.user?.id),
        name,
        email,
        image_url
      );
    }
    if (result.success) {
      // toast({
      //   title: "Success",
      //   description: "Client has been saved successfully",
      // });
      redirect("/dashboard/clients");
    } else {
      // toast({
      //   title: "Error",
      //   description: "An error occurred while saving the client",
      // });
      console.error(result.message);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-900">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {client?.client_id ? "Edit Client" : "Create New Client"}
      </h1>
      <form action={handleSubmit} className="space-y-4">
        <input type="hidden" name="client_id" value={client?.client_id} />

        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            placeholder="Enter client name"
            defaultValue={client?.name}
            className="mt-1 w-full rounded-lg border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter client email"
            defaultValue={client?.email}
            className="mt-1 w-full rounded-lg border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        {/* Image URL Field */}
        <div>
          <label
            htmlFor="image_url"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Image URL
          </label>
          <input
            id="image_url"
            type="url"
            name="image_url"
            placeholder="Enter image URL"
            defaultValue={client?.image_url}
            className="mt-1 w-full rounded-lg border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-violet-500 text-white py-2 font-medium hover:bg-violet-600 focus:ring-4 focus:ring-violet-300 dark:focus:ring-violet-700"
        >
          {client?.client_id ? "Update Client" : "Create Client"}
        </button>
      </form>
    </div>
  );
}
