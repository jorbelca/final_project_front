"use client";
import { updateUser } from "@/app/lib/data";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface UserEditFormProps {
  user: {
    user_id: number;
    name: string;
    email: string;
    avatar_url?: string;
    logo_url?: string;
  };
}

export function UserEditForm({ user }: UserEditFormProps) {
  const router = useRouter();

  const handleSubmit = async (formData: FormData) => {
    const user_id = Number(formData.get("user_id") as string);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const avatar_url = formData.get("avatar_url") as string;
    const logo_url = formData.get("logo_url") as string;

    try {
      const response = await updateUser(
        user_id,
        name,
        email,
        password,
        avatar_url.trimEnd(),
        logo_url.trimEnd()
      );

      if (response.success) {
        toast({
          variant: "default",
          title: "Success",
          description: "User updated successfully.",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Error updating the user.",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error updating the user.",
      });
      console.error(error);
    }
    router.refresh();
  };

  return (
    <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Edit User Information</h2>
      <form action={handleSubmit} className="space-y-4">
        <input type="hidden" name="user_id" value={user?.user_id} />
        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={user?.name}
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
            autoComplete="off"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={user?.email}
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
            autoComplete="off"
          />
        </div>

        {/* Contraseña */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            defaultValue={""}
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
            autoComplete="off"
            minLength={6}
          />
        </div>

        {/* Avatar URL */}
        <div>
          <label htmlFor="avatar_url" className="block text-sm font-medium">
            Avatar URL
          </label>
          <input
            type="url"
            id="avatar_url"
            name="avatar_url"
            defaultValue={user?.avatar_url?.trimEnd()}
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
            autoComplete="off"
          />
        </div>

        {/* Logo URL */}
        <div>
          <label htmlFor="logo_url" className="block text-sm font-medium">
            Logo URL
          </label>
          <input
            type="url"
            id="logo_url"
            name="logo_url"
            defaultValue={user?.logo_url?.trimEnd()}
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
            autoComplete="off"
          />
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
