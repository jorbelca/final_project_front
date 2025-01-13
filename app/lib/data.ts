import { sql } from "@vercel/postgres";
import { Budget, Client, Cost, Plan, Subscription, User } from "./definitions";

// Función para obtener un presupuesto por ID
export async function getBudgetById(budgetId: number): Promise<Budget | null> {
  try {
    const result = await sql<Budget[]>`
      SELECT * FROM budgets WHERE budget_id = ${budgetId}
    `;
    const resultArray = Array.isArray(result) ? result : [];
    return resultArray.length > 0 ? resultArray[0] : null;
  } catch (error) {
    console.error("Error fetching budget:", error);
    return null;
  }
}

// Función para obtener un presupuesto por ID
export async function fetchBudgets(userId: number): Promise<Budget[]> {
  try {
    const result = await sql<Budget>`
      SELECT * FROM budgets
      WHERE user_id = ${userId}
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
export async function fetchSubscriptions() {
  try {
    const data = await sql<Subscription[]>`
      SELECT * FROM subscriptions
    `;
    return data;
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
    return user.rows;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function getSubscription(userId: number) {
  try {
    const subscription = await sql<Subscription>`
      SELECT * FROM subscriptions JOIN plans ON subscriptions.plan_id = plans.plan_id WHERE user_id = ${userId}
    `;
    return subscription.rows;
  } catch (error) {
    console.error("Error fetching subscription:", error);
    throw new Error("Failed to fetch subscription.");
  }
}
