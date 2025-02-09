"use client";
import {
  checkClientEmail,
  claimClient,
  createClient,
  updateClient,
} from "@/app/lib/actions";
import { Client } from "@/app/lib/definitions";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export const metadata = {
  title: "Clients",
};

export default function ClientsForm({
  client,
  user_id,
}: {
  client?: Client | null;
  user_id?: number;
}) {
  const router = useRouter();
  async function handleEmailBlur(event: React.FocusEvent<HTMLInputElement>) {
    const email = event.target.value.trim();
    if (!email || client) return;

    const result = await checkClientEmail(email);

    if (result.exists) {
      const confirmClaim = confirm(
        "This client exists in our DB. You want to associate with it?"
      );
      if (confirmClaim) {
        try {
          const response = await claimClient(
            Number(result.client_id),
            Number(user_id)
          );

          if (response.success) {
            toast({
              title: "Success",
              description: "Client has been saved successfully",
            });
            router.push("/dashboard/clients");
          } else if (response.error) {
            console.error(response.error);
            toast({
              title: "Error",
              description: "An error occurred while saving the client",
              variant: "destructive",
            });
          }
        } catch (error) {
          console.error(error);
          toast({
            title: "Error",
            description: "An error occurred while saving the client",
            variant: "destructive",
          });
        }
      }
    }
  }

  const handleSubmit = async (formData: FormData) => {
    const client_id = formData.get("client_id") as string;
    const user_id = formData.get("user_id") as string;
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const image_url = (formData.get("image_url") as string) ?? "";

    let result: { success: boolean; message: string } | null = null;

    if (client?.client_id) {
      result = await updateClient(Number(client_id), name, email, image_url);
    } else {
      result = await createClient(Number(user_id), name, email, image_url);
    }
    if (result.success) {
      toast({
        title: "Success",
        description: "Client has been saved successfully",
      });
      router.push("/dashboard/clients");
    } else {
      toast({
        title: "Error",
        description: "An error occurred while saving the client",
        variant: "destructive",
      });
      console.error(result.message);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-8 p-6 bg-gray-100 rounded-lg shadow-md dark:bg-gray-900">
      <h1 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {client?.client_id ? "Edit Client" : "Create New Client"}
      </h1>
      <form action={handleSubmit} className="space-y-4">
        {client && (
          <input type="hidden" name="client_id" value={client?.client_id} />
        )}
        {user_id && <input type="hidden" name="user_id" value={user_id} />}

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
            onBlur={handleEmailBlur}
            className="mt-1 w-full rounded-lg border-gray-300 p-2 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

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
