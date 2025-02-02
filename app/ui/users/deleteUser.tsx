"use client";
import { deleteUser } from "@/app/lib/data";
import { toast } from "@/hooks/use-toast";
import { signOut } from "next-auth/react";

import { useRouter } from "next/navigation";

export function RemoveUser({ user }) {
  const router = useRouter();
  const handleDeleteUser = async () => {
    const confirm = window.confirm("Are you sure you want to delete the user?");
    if (!confirm) return;
    try {
      const response = await deleteUser(user.user_id);

      if (response.success) {
        await signOut();
        router.push("/");

        toast({
          title: "Success",
          description: "Deleted user",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Error deleting the user",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Error " + error,
      });
    }
  };

  return (
    <div className="w-full flex justify-center p-4 rounded-sm dark:bg-gray-700 dark:text-white">
      <button
        className="bg-red-500 text-white rounded-md p-2"
        onClick={handleDeleteUser}
      >
        Delete User
      </button>
    </div>
  );
}
