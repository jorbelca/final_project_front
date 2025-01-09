"use server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { hash } from "bcrypt";
import { Budget } from "./definitions"; // Importa el tipo Budget

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function register(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  // Verifica que las contraseñas coincidan
  if (password !== confirmPassword) {
    return { success: false, message: "Las contraseñas no coinciden" };
  }

  // Encripta la contraseña
  const hashedPassword = await hash(password, 10);

  // Inserta el nuevo usuario en la base de datos
  try {
    await sql`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
    `;
    return { success: true, message: "Usuario registrado exitosamente" };
  } catch (error) {
    return { success: false, message: "Error al registrar el usuario" };
  }
}

// Función para crear un presupuesto
export async function createBudget(
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  try {
    const userId = formData.get("userId") as string;
    const clientId = formData.get("clientId") as string;
    const content = formData.get("content") as string;
    const principalPrompt = "Testing";
    const additionalPrompt = "Testing";
    const state = formData.get("state") as string;
    await sql`
      INSERT INTO budgets (user_id, client_id, content, principal_prompt, additional_prompt, state)
      VALUES (${userId}, ${clientId}, ${content}, ${principalPrompt}, ${additionalPrompt}, ${state})
    `;
    return { success: true, message: "Presupuesto creado exitosamente" };
  } catch (error) {
    return { success: false, message: "Error al crear el presupuesto" };
  }
}

// Función para actualizar un presupuesto
export async function updateBudget(
  budgetId: number,
  content: any,
  state: "draft" | "approved" | "rejected"
): Promise<{ success: boolean; message: string }> {
  try {
    await sql`
      UPDATE budgets
      SET content = ${content}, state = ${state}
      WHERE budget_id = ${budgetId}
    `;
    return { success: true, message: "Presupuesto actualizado exitosamente" };
  } catch (error) {
    return { success: false, message: "Error al actualizar el presupuesto" };
  }
}

// Función para eliminar un presupuesto
export async function deleteBudget(
  budgetId: number
): Promise<{ success: boolean; message: string }> {
  try {
    await sql`
      DELETE FROM budgets WHERE budget_id = ${budgetId}
    `;
    return { success: true, message: "Presupuesto eliminado exitosamente" };
  } catch (error) {
    return { success: false, message: "Error al eliminar el presupuesto" };
  }
}
