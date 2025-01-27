"use client";
import { useState } from "react";

interface UserEditFormProps {
  user: {
    name: string;
    email: string;
    avatar_url?: string;
    logo_url?: string;
  };
}

export function UserEditForm({ user }: UserEditFormProps) {
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    password: "",
    avatar_url: user.avatar_url || "",
    logo_url: user.logo_url || "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos enviados:", formData);
    // Aquí deberías manejar la lógica para enviar los datos del formulario al servidor
  };

  return (
    <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <h2 className="text-xl font-bold mb-4">Edit User Information</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nombre */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
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
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
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
            value={formData.password}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
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
            value={formData.avatar_url}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
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
            value={formData.logo_url}
            onChange={handleInputChange}
            className="w-full p-2 border rounded-md bg-gray-50 dark:bg-gray-700"
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
