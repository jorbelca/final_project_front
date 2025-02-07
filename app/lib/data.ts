"use server";
import { sql } from "@vercel/postgres";
import { Budget, Cost, Plan, Subscription, User } from "./definitions";
import { hash } from "bcrypt";

// Función para obtener un presupuesto por ID
export async function getBudgetById(budgetId: number): Promise<Budget | null> {
  try {
    const result = await sql<Budget>`
      SELECT * FROM budgets WHERE budget_id = ${budgetId}
    `;

    return result.rows[0] || null;
  } catch (error) {
    console.error("Error fetching budget:", error);
    return null;
  }
}

// Función para obtener un presupuesto por ID
export async function fetchBudgets(userId: number): Promise<Budget[]> {
  try {
    const result = await sql<Budget>`
      SELECT 
        budgets.budget_id,
        budgets.user_id,
        budgets.client_id,
        budgets.content,
        budgets.created_at,
        budgets.taxes,
        budgets.discount,
        budgets.state,
        clients.client_id AS client_id,
        clients.name AS client_name,
        clients.email AS client_email
      FROM budgets
      LEFT JOIN clients ON clients.client_id = budgets.client_id
      WHERE budgets.user_id = ${userId}
      ORDER BY budgets.created_at DESC
    `;
    return result.rows;
  } catch (error) {
    console.error("Error fetching budgets:", error);
    throw new Error("Failed to fetch budgets.");
  }
}

// Función para obtener todos los costes
export async function fetchCosts(userId: number): Promise<Cost[]> {
  try {
    const result = await sql<Cost>`
      SELECT cost_id, user_id, description, cost, unit, periodicity, created_at, updated_at
      FROM costs
      WHERE user_id = ${userId};
    `;
    return result.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch costs.");
  }
}

// Función para obtener todos los planes
export async function fetchPlans() {
  try {
    const data = await sql<Plan>`
      SELECT * FROM plans
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch plans.");
  }
}

// Función para obtener todas las suscripciones
export async function getSubscriptions() {
  try {
    const data = await sql<Subscription[]>`
      SELECT * FROM subscriptions
    `;
    return data.rows;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch subscriptions.");
  }
}

// Función para obtener presupuestos paginados con búsqueda
export async function fetchBudgetsPages(
  query: string = "",
  page: number = 1,
  pageSize: number = 10
): Promise<{ budgets: Budget[]; totalPages: number }> {
  try {
    // Calcula el desplazamiento para la paginación
    const offset = (page - 1) * pageSize;

    // Construye la cláusula WHERE para la búsqueda
    const searchQuery = query ? `%${query}%` : "%";

    // Obtiene el total de presupuestos que coinciden con la búsqueda
    const totalBudgetsResult = await sql<{ count: number }[]>`
      SELECT COUNT(*) as count FROM budgets
      WHERE principal_prompt ILIKE ${searchQuery} OR additional_prompt ILIKE ${searchQuery}
    `;
    const totalBudgets = totalBudgetsResult[0]?.count || 0;
    const totalPages = Math.ceil(totalBudgets / pageSize);

    // Obtiene los presupuestos para la página actual que coinciden con la búsqueda
    const budgetsResult = await sql<Budget[]>`
      SELECT * FROM budgets ORDER BY created_at DESC
      LIMIT ${pageSize} OFFSET ${offset}
    `;

    // Asegúrate de que budgetsResult sea un array de Budget
    const budgets = Array.isArray(budgetsResult) ? budgetsResult : [];

    return { budgets, totalPages };
  } catch (error) {
    console.error("Error fetching paginated budgets:", error);
    throw new Error("Failed to fetch paginated budgets.");
  }
}

export async function getUser(userId: number) {
  try {
    const user = await sql<User>`
      SELECT * FROM users WHERE users.user_id = ${userId}
    `;
    return user.rows[0];
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function getSubscription(userId: number) {
  try {
    const subscription = await sql<Subscription>`
      SELECT * FROM subscriptions LEFT JOIN plans ON subscriptions.plan_id = plans.plan_id WHERE user_id = ${userId}
    `;
    return subscription.rows[0];
  } catch (error) {
    console.error("Error fetching subscription:", error);
    throw new Error("Failed to fetch subscription.");
  }
}

//Update User
export async function updateUser(
  userId: number,
  name: string,
  email: string,
  password: string,
  avatar_url: string,
  logo_url: string
): Promise<{ success: boolean; message: string }> {
  try {
    password = await hash(password, 10);
    await sql`
      UPDATE users
      SET name = ${name}, email = ${email}, avatar_url = ${avatar_url}, logo_url = ${logo_url}, password = ${password}
      WHERE user_id = ${userId}`;
    return {
      success: true,
      message: "User updated successfully.",
    };
  } catch (error) {
    // console.error("Error updating user:", error);
    return { success: false, message: "Error updating user." + error };
  }
}

// Delete User
export async function deleteUser(
  userId: number
): Promise<{ success: boolean; message: string }> {
  try {
    await sql<User>`
      DELETE FROM users WHERE user_id = ${userId}
    `;

    return { success: true, message: "User deleted successfully." };
  } catch (error) {
    console.error("Error deleting user:", error);
    return { success: false, message: "Error deleting user." };
  }
}

//Update Payment Number
export async function updateSubscription(
  subscriptionId: number,
  paymentNumber: string,
  plan_id: number
): Promise<{ success: boolean; message: string }> {
  try {
    console.log(subscriptionId, paymentNumber, plan_id);

    await sql<Subscription>`
      UPDATE subscriptions
      SET payment_number = ${paymentNumber},
       plan_id = ${plan_id}
      WHERE subscription_id = ${subscriptionId}`;
    return {
      success: true,
      message: "Subscription updated successfully.",
    };
  } catch (error) {
    console.error("Error updating the subscription:", error);
    return { success: false, message: "Error updating the subscription." };
  }
}

export async function getPlans() {
  try {
    const res = await sql<Plan[]>`
      SELECT * from plans`;
    return res.rows.flat();
  } catch (error) {
    console.error("Error getting the plans:", error);
  }
}

export async function usersFull() {
  try {
    const res = await sql`
      SELECT 
        u.*, 
        b.*, 
        c.*, 
        cl.*
      FROM 
        users u
      LEFT JOIN 
        budgets b ON u.user_id = b.user_id
      LEFT JOIN 
        costs c ON u.user_id = c.user_id
      LEFT JOIN 
        clients cl ON b.client_id = cl.client_id;
    `;

    return res.rows; // Devuelve todos los usuarios con los presupuestos, costos y clientes
  } catch (error) {
    console.error(
      "Error getting the users with budgets, costs, and clients:",
      error
    );
    throw error; // Rethrow the error so it can be handled elsewhere
  }
}

export async function getLogo(userId: number) {
  try {
    const user = await sql<String>`
      SELECT logo_url FROM users WHERE users.user_id = ${userId}
    `;
    return user.rows[0];
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user.");
  }
}
