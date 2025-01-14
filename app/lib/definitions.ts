// Tipo para la tabla Users
export interface User {
  user_id: number;
  name: string;
  email: string;
  password: string;
  active: boolean;
  avatar_url?: string;
  created_at: Date;
  updated_at: Date;
}

// Tipo para la tabla Clients
export interface Client {
  client_id: number;
  user_id: number;
  name: string;
  email?: string;
  image_url?: string;
  company_name?: string;
  created_at: Date;
  updated_at: Date;
}

// Tipo para la tabla Costs
export interface Cost {
  cost_id: number;
  user_id: number;
  description: string;
  cost: number;
  unit: string;
  periodicity: "one-time" | "daily" | "weekly" | "monthly" | "yearly";
  created_at?: Date;
  updated_at?: Date;
}

// Tipo para la tabla Budgets
export interface Budget {
  budget_id: number;
  user_id: number;
  client_id: number;
  name?: string;
  content: { quantity: number; details: { name: string; price: number } }[];
  taxes: number;
  discount: number;
  state: "draft" | "sent" | "approved" | "rejected";
  created_at: Date;
  updated_at: Date;
}

// Tipo para la tabla Plans
export interface Plan {
  plan_id: number;
  name: string;
  price: number;
  duration_in_days: number;
  features?: any; // Puedes definir un tipo más específico si conoces la estructura del JSON
  created_at: Date;
  updated_at: Date;
}

// Tipo para la tabla Subscriptions
export interface Subscription {
  subscription_id: number;
  user_id: number;
  plan_id: number;
  payment_number: string;
  active: boolean;
  start_date: Date;
  created_at: Date;
  updated_at: Date;
  name?: string;
  price?: number;
  duration_in_days?: number;
}
