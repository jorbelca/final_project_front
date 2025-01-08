-- Tabla Users
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,                 -- Identificador único para cada usuario
    name VARCHAR(100) NOT NULL,                -- Nombre del usuario
    email VARCHAR(100) UNIQUE NOT NULL,        -- Correo electrónico único
    password VARCHAR(255) NOT NULL,            -- Contraseña cifrada
    active BOOLEAN DEFAULT TRUE,               -- Estado del usuario
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de registro
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Trigger para actualizar la columna updated_at en Users
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_timestamp_users
BEFORE UPDATE ON Users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Tabla Clients
CREATE TABLE Clients (
    client_id SERIAL PRIMARY KEY,              -- Identificador único para cada cliente
    user_id INT NOT NULL,                      -- Relación con el usuario
    name VARCHAR(100) NOT NULL,                -- Nombre del cliente
    email VARCHAR(100),                        -- Correo electrónico del cliente
    phone VARCHAR(20),                         -- Teléfono del cliente
    company_name VARCHAR(100),                 -- Nombre de la empresa (si aplica)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TRIGGER trg_update_timestamp_clients
BEFORE UPDATE ON Clients
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Tabla Costs
CREATE TABLE Costs (
    cost_id SERIAL PRIMARY KEY,                -- Identificador único para cada coste
    user_id INT NOT NULL,                      -- Relación con el usuario
    description VARCHAR(255) NOT NULL,         -- Descripción del coste
    cost DECIMAL(10, 2) NOT NULL,              -- Coste unitario
    unit VARCHAR(50) NOT NULL,                 -- Unidad de medida (ejemplo: "mes", "pieza", "hora")
    periodicity VARCHAR(50) CHECK (periodicity IN ('one-time', 'daily', 'weekly', 'monthly', 'yearly')) DEFAULT 'one-time', -- Frecuencia
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TRIGGER trg_update_timestamp_costs
BEFORE UPDATE ON Costs
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Tabla Additional_Prompts
CREATE TABLE Additional_Prompts (
    prompt_id SERIAL PRIMARY KEY,              -- Identificador único para el prompt
    user_id INT NOT NULL,                      -- Relación con el usuario
    prompt_text TEXT NOT NULL,                 -- Texto del prompt
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TRIGGER trg_update_timestamp_prompts
BEFORE UPDATE ON Additional_Prompts
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Tabla Budgets
CREATE TABLE Budgets (
    budget_id SERIAL PRIMARY KEY,              -- Identificador único para el presupuesto
    user_id INT NOT NULL,                      -- Relación con el usuario
    client_id INT,                             -- Relación con el cliente
    content JSON NOT NULL,                     -- Contenido del presupuesto en formato JSON
    principal_prompt TEXT,                     -- Prompt principal
    additional_prompt TEXT,                    -- Prompt adicional
    state VARCHAR(50) CHECK (state IN ('draft', 'approved', 'rejected')) DEFAULT 'draft', -- Estado del presupuesto
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (client_id) REFERENCES Clients(client_id)
);

CREATE TRIGGER trg_update_timestamp_budgets
BEFORE UPDATE ON Budgets
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Tabla Plans
CREATE TABLE Plans (
    plan_id SERIAL PRIMARY KEY,                -- Identificador único de plan
    name VARCHAR(50) NOT NULL,                 -- Nombre del plan
    price DECIMAL(10, 2) NOT NULL,             -- Precio
    duration_in_days INT NOT NULL,             -- Duración en días
    features JSON,                             -- Detalles adicionales en JSON
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TRIGGER trg_update_timestamp_plans
BEFORE UPDATE ON Plans
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Tabla Subscriptions
CREATE TABLE Subscriptions (
    subscription_id SERIAL PRIMARY KEY,        -- Identificador único de suscripción
    user_id INT NOT NULL,                      -- Relación con el usuario
    plan_id INT NOT NULL,                      -- Relación con el plan
    payment_number VARCHAR(50) NOT NULL,      -- Número de cuenta o tarjeta de pago
    active BOOLEAN DEFAULT TRUE,               -- Estado de la suscripción
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Inicio de la suscripción
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (plan_id) REFERENCES Plans(plan_id)
);

CREATE TRIGGER trg_update_timestamp_subscriptions
BEFORE UPDATE ON Subscriptions
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();