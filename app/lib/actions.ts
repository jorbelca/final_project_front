"use server";
import { sql } from "@vercel/postgres";
import { signIn } from "@/auth";

import { hash } from "bcrypt";
import { Budget, Client, Cost, User } from "./definitions";
import bcrypt from "bcrypt";
import { AuthError } from "next-auth";

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

export async function login(email: string, password: string) {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email = ${email}`;

    if (!user) return null;
    const passwordsMatch = await bcrypt.compare(
      password,
      user.rows[0].password
    );
    if (passwordsMatch) {
      return user.rows[0];
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
}

export async function register(
  name: string,
  email: string,
  password: string,
  confirmPassword: string
) {
  if (password !== confirmPassword) {
    return { success: false, message: "Las contraseñas no coinciden" };
  }

  const hashedPassword = await hash(password, 10);

  try {
    // Insertar usuario y devolver su ID
    const user = await sql<{ user_id: number }>`
      INSERT INTO users (name, email, password)
      VALUES (${name}, ${email}, ${hashedPassword})
      RETURNING user_id
    `;

    const userId = user.rows[0]?.user_id;
    if (!userId) {
      console.error("No se obtuvo user_id:", user);
      throw new Error("No se pudo obtener el ID del usuario");
    }

    // Insertar suscripción vacía
    await sql`
      INSERT INTO subscriptions (user_id, plan_id, payment_number, active, start_date, created_at, updated_at)
      VALUES (${userId}, NULL, NULL, false, NOW(), NOW(), NOW())
    `;

    return {
      success: true,
      message: "Usuario y suscripción creados exitosamente",
    };
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    return { success: false, message: "Error al registrar el usuario" };
  }
}

// Función para crear un presupuesto
export async function createBudget(
  userId: number,
  content: { quantity: number; description: string; cost: number }[],
  discount: number,
  tax: number,
  clientId?: number
): Promise<any> {
  try {
    const serializedContent = JSON.stringify(content);
    await sql<Budget>`
      INSERT INTO budgets (user_id, client_id, discount, taxes, content)
      VALUES (${userId}, ${clientId}, ${discount}, ${tax}, ${serializedContent})
    `;
    return { success: true, message: "Presupuesto creado exitosamente" };
  } catch (error) {
    console.error("Error al crear el presupuesto:", error);
    return { success: false, message: "Error al crear el presupuesto" };
  }
}

// Función para actualizar un presupuesto
export async function updateBudget(
  budgetId: number,
  userId: number,
  clientId: number,
  content: { quantity: number; description: string; cost: number }[],
  discount: number,
  tax: number
): Promise<{ success: boolean; message: string }> {
  try {
    // Ejecutar la consulta SQL
    await sql`
      UPDATE budgets
      SET 
        user_id = ${userId},
        client_id = ${clientId},
        discount = ${discount},
        taxes = ${tax},
        content = ${JSON.stringify(content)}
      WHERE 
        budget_id = ${budgetId}
    `;

    // Retornar éxito
    return { success: true, message: "Presupuesto actualizado exitosamente" };
  } catch (error) {
    console.error("Error al actualizar el presupuesto:", error);

    // Retornar fallo
    return {
      success: false,
      message: "Error al actualizar el presupuesto" + error,
    };
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

export async function createCost(
  userId: number,
  description: string,
  cost: number,
  unit: string,
  periodicity: string
): Promise<{ success: boolean; message: string }> {
  try {
    await sql`
      INSERT INTO costs (user_id, description, cost, unit, periodicity)
      VALUES (${userId}, ${description}, ${cost}, ${unit}, ${periodicity})
    `;
    return { success: true, message: "Costo creado exitosamente" };
  } catch (error) {
    return { success: false, message: "Error al crear el costo" };
  }
}

export async function deleteCost(
  costId: number
): Promise<{ success: boolean; message: string }> {
  try {
    await sql`DELETE FROM costs WHERE cost_id = ${costId}`;
    return { success: true, message: "Costo eliminado exitosamente" };
  } catch (error) {
    return { success: false, message: "Error al eliminar el costo" };
  }
}

export async function getCostById(costId: number): Promise<Cost | null> {
  try {
    const cost =
      await sql<Cost>`SELECT cost_id, user_id, description, cost, unit, periodicity FROM costs WHERE cost_id = ${costId}`;

    return cost.rows[0];
  } catch (error) {
    console.error("Error fetching cost:", error);
    return null;
  }
}

export async function updateCost(
  costId: number,
  description: string,
  cost: number,
  unit: string,
  periodicity: string
): Promise<{ success: boolean; message: string }> {
  try {
    await sql`UPDATE costs SET description = ${description}, cost = ${cost}, unit = ${unit}, periodicity = ${periodicity} WHERE cost_id = ${costId}`;
    return { success: true, message: "Costo actualizado exitosamente" };
  } catch (error) {
    return { success: false, message: "Error al actualizar el costo" };
  }
}

// Clientes
// Función para obtener todos los clientes
export async function fetchClients(userId: number) {
  try {
    const result = await sql<Client>`
      SELECT clients.client_id, clients.name, clients.email, clients.image_url
      FROM user_client
      JOIN clients ON clients.client_id = user_client.client_id
      WHERE user_client.user_id = ${userId}
      ORDER BY clients.name ASC
    `;
    return result.rows;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all clients.");
  }
}
export async function createClient(
  userId: number,
  name: string,
  email: string,
  image_url: string
) {
  try {
    // Realizamos la primera inserción
    const newClient = await sql<Client>`
      INSERT INTO clients (name, email, image_url) 
      VALUES (${name}, ${email}, ${image_url})
      RETURNING client_id`;

    // Verificamos que la respuesta contiene client_id
    if (newClient && newClient.rows[0]?.client_id) {
      const clientId = newClient.rows[0].client_id;

      // Comprobamos si el userId es válido
      if (!userId) {
        return { success: false, message: "userId no válido" };
      }

      // Realizamos la segunda inserción para vincular los datos
      const result = await sql<any>`
        INSERT INTO user_client (user_id, client_id) 
        VALUES (${userId}, ${clientId})`;

      // Si la inserción se ejecutó correctamente
      if (result && result.rowCount && result.rowCount > 0) {
        return {
          success: true,
          message: "Cliente creado y vinculado exitosamente",
        };
      } else {
        return {
          success: false,
          message: "Error al vincular el cliente con el usuario",
        };
      }
    } else {
      return {
        success: false,
        message: "Error al crear el cliente",
      };
    }
  } catch (error) {
    console.error("Error al crear el cliente:", error); // Detalles del error
    return { success: false, message: "Error al crear el cliente" };
  }
}

export async function getClientById(clientId: number): Promise<Client | null> {
  try {
    const client =
      await sql<Client>`SELECT * FROM clients WHERE client_id = ${clientId}`;
    return client.rows[0];
  } catch (error) {
    console.error("Error fetching client:", error);
    return null;
  }
}

export async function updateClient(
  clientId: number,
  name: string,
  email: string,
  image_url: string
): Promise<{ success: boolean; message: string }> {
  try {
    await sql`UPDATE clients SET name = ${name}, email = ${email}, image_url = ${image_url} WHERE client_id = ${clientId}`;
    return { success: true, message: "Cliente actualizado exitosamente" };
  } catch (error) {
    return { success: false, message: "Error al actualizar el cliente" };
  }
}

export async function deleteClient(
  clientId: number,
  userId: number
): Promise<{ success: boolean; message: string }> {
  try {
    // 1️⃣ Eliminar la relación del usuario con el cliente en `user_client`
    await sql`
      DELETE FROM user_client 
      WHERE client_id = ${clientId} AND user_id = ${userId}
    `;

    // 2️⃣ Verificar si el cliente sigue teniendo más relaciones
    const { rows } = await sql`
      SELECT COUNT(*) AS count 
      FROM user_client 
      WHERE client_id = ${clientId}
    `;
    const count = rows[0]?.count;

    // 3️⃣ Si no tiene más relaciones, eliminarlo de `clients`
    if (+count === 0) {
      await sql`
        DELETE FROM clients 
        WHERE client_id = ${clientId}
      `;
      return { success: true, message: "Cliente eliminado completamente" };
    }

    return {
      success: true,
      message: "Relación eliminada, pero el cliente sigue existiendo",
    };
  } catch (error) {
    return {
      success: false,
      message: "Error al eliminar la relación del cliente",
    };
  }
}

export async function updateBudgetState(
  budgetId: number,
  state: "draft" | "sent" | "approved" | "rejected"
) {
  try {
    await sql`UPDATE budgets SET state = ${state} WHERE budget_id = ${budgetId}`;
    return { success: true, message: "Estado del presupuesto actualizado" };
  } catch (error) {
    return {
      success: false,
      message: "Error al actualizar el estado del presupuesto",
    };
  }
}

// Verifica si el email ya existe y devuelve el ID si lo encuentra
export async function checkClientEmail(email: string) {
  if (!email) return { error: "El email es requerido" };
  try {
    const client = await sql<Client>`
    SELECT client_id FROM clients WHERE email = ${email} LIMIT 1;
  `;

    if (client.rowCount === 0) return { exists: false };

    return { exists: true, client_id: client.rows[0].client_id };
  } catch (error) {
    return {
      success: false,
      message: "Error ",
    };
  }
}

// Asigna un cliente existente al usuario
export async function claimClient(client_id: number, user_id: number) {
  if (!user_id) return { error: "No autorizado" };
  try {
    // Relación en la tabla intermedia
    await sql`
    INSERT INTO user_client (user_id, client_id) VALUES (${user_id}, ${client_id})
    ON CONFLICT DO NOTHING;
  `;

    return { success: true, message: "Insertado" };
  } catch (error) {
    return {
      success: false,
      message: "Error al actualizar el estado del presupuesto",
    };
  }
}
