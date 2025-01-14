-- Eliminar base de datos si ya existe
DROP DATABASE IF EXISTS BudgetApp;

-- Crear base de datos
CREATE DATABASE BudgetApp;

-- Usar la base de datos creada
\c BudgetApp;

-- Tabla Users
CREATE TABLE Users (
    user_id SERIAL PRIMARY KEY,                     -- Identificador único para cada usuario
    name VARCHAR(100) NOT NULL,                    -- Nombre del usuario
    email VARCHAR(100) UNIQUE NOT NULL,            -- Correo electrónico único
    password VARCHAR(255) NOT NULL,                -- Contraseña cifrada
    active BOOLEAN DEFAULT TRUE,                   -- Estado del usuario
    avatar_url VARCHAR(255),                       -- URL del avatar del usuario
    logo_url VARCHAR(255),                         -- URL del logo de la empresa del usuario
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,-- Fecha de registro
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Fecha de actualización
);

-- Tabla Clients
CREATE TABLE Clients (
    client_id SERIAL PRIMARY KEY,                  -- Identificador único para cada cliente
    name VARCHAR(100) NOT NULL,                    -- Nombre del cliente
    email VARCHAR(100),                            -- Correo electrónico del cliente
    image_url VARCHAR(255),                        -- URL de la imagen del cliente
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,-- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Fecha de actualización
);

-- Tabla Intermedia User_Client
CREATE TABLE User_Client (
    user_id INT NOT NULL,
    client_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, client_id),              -- Clave primaria compuesta para evitar duplicados
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES Clients(client_id) ON DELETE CASCADE
);

-- Tabla Costs
CREATE TABLE Costs (
    cost_id SERIAL PRIMARY KEY,                    -- Identificador único para cada coste
    user_id INT NOT NULL,                          -- Relación con el usuario
    description VARCHAR(255) NOT NULL,             -- Descripción del coste
    cost NUMERIC(10, 2) NOT NULL,                  -- Coste unitario
    unit VARCHAR(50) NOT NULL,                     -- Unidad de medida
    periodicity TEXT CHECK (periodicity IN ('one-time', 'daily', 'weekly', 'monthly', 'yearly')) DEFAULT 'one-time', -- Frecuencia
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,-- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,-- Fecha de actualización
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

-- Tabla Budgets
CREATE TABLE Budgets (
    budget_id SERIAL PRIMARY KEY,                  -- Identificador único para el presupuesto
    user_id INT NOT NULL,                          -- Relación con el usuario
    client_id INT,                                 -- Relación con el cliente
    content JSONB NOT NULL,                        -- Contenido del presupuesto en formato JSONB
    discount INT,
    taxes INT,
    state TEXT CHECK (state IN ('draft', 'approved', 'rejected','sent' )) DEFAULT 'draft', -- Estado del presupuesto
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,-- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,-- Fecha de actualización
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (client_id) REFERENCES Clients(client_id) ON DELETE CASCADE
);

-- Tabla Plans
CREATE TABLE Plans (
    plan_id SERIAL PRIMARY KEY,                    -- Identificador único de plan
    name VARCHAR(50) NOT NULL,                     -- Nombre del plan
    price NUMERIC(10, 2) NOT NULL,                 -- Precio
    duration_in_days INT NOT NULL,                 -- Duración en días
    features JSONB,                                -- Detalles adicionales en JSONB
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,-- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Fecha de actualización
);

-- Tabla Subscriptions
CREATE TABLE Subscriptions (
    subscription_id SERIAL PRIMARY KEY,            -- Identificador único de suscripción
    user_id INT NOT NULL,                          -- Relación con el usuario
    plan_id INT NOT NULL,                          -- Relación con el plan
    payment_number VARCHAR(50) NOT NULL,           -- Número de cuenta o tarjeta de pago
    active BOOLEAN DEFAULT TRUE,                   -- Estado de la suscripción
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,-- Inicio de la suscripción
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,-- Fecha de creación
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,-- Fecha de actualización
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (plan_id) REFERENCES Plans(plan_id) ON DELETE CASCADE
);


-- Función para actualizar la columna updated_at
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP; -- Actualiza el timestamp
    RETURN NEW; -- Devuelve la fila modificada
END;
$$ LANGUAGE plpgsql;

-- Trigger para la tabla Users
CREATE TRIGGER trg_update_timestamp_users
BEFORE UPDATE ON Users
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Trigger para la tabla Clients
CREATE TRIGGER trg_update_timestamp_clients
BEFORE UPDATE ON Clients
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Trigger para la tabla Costs
CREATE TRIGGER trg_update_timestamp_costs
BEFORE UPDATE ON Costs
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Trigger para la tabla Budgets
CREATE TRIGGER trg_update_timestamp_budgets
BEFORE UPDATE ON Budgets
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Trigger para la tabla Plans
CREATE TRIGGER trg_update_timestamp_plans
BEFORE UPDATE ON Plans
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();

-- Trigger para la tabla Subscriptions
CREATE TRIGGER trg_update_timestamp_subscriptions
BEFORE UPDATE ON Subscriptions
FOR EACH ROW
EXECUTE FUNCTION update_timestamp();



-- Datos de prueba para la tabla Users
INSERT INTO Users (name, email, password, active, avatar_url, logo_url)
VALUES 
('John Doe', 'johndoe@example.com', 'password123', TRUE, 'http://example.com/avatar.jpg', 'http://example.com/logo.jpg'),
('Jane Smith', 'janesmith@example.com', 'securepassword', TRUE, NULL, NULL);

-- Datos de prueba para la tabla Clients
INSERT INTO Clients (name, email, image_url)
VALUES
('Acme Corporation', 'contact@acme.com', 'http://example.com/client1.jpg'),
('Globex Inc.', 'info@globex.com', 'http://example.com/client2.jpg');

-- Datos de prueba para la tabla User_Client
INSERT INTO User_Client (user_id, client_id)
VALUES
(1, 1),
(1, 2),
(2, 1);

-- Datos de prueba para la tabla Costs
INSERT INTO Costs (user_id, description, cost, unit, periodicity)
VALUES
(1, 'Monthly subscription', 50.00, 'month', 'monthly'),
(2, 'Annual hosting fee', 200.00, 'year', 'yearly');

-- Datos de prueba para la tabla Budgets
INSERT INTO Budgets (user_id, client_id, content, discount, taxes, state)
VALUES
(1, 1, '[{"details": {"name": "Item 1", "price": 487.5}, "quantity": 1}]', 10, 21, 'draft'),
(2, 2, '[{"details": {"name": "Service A", "price": 300.0}, "quantity": 2}, {"details": {"name": "Service B", "price": 150.0}, "quantity": 1}]', 5, 15, 'approved');

-- Datos de prueba para la tabla Plans
INSERT INTO Plans (name, price, duration_in_days, features)
VALUES
('Basic Plan', 9.99, 30, '{"storage": "10GB", "support": "Email only"}'),
('Premium Plan', 29.99, 365, '{"storage": "100GB", "support": "24/7 Phone"}');

-- Datos de prueba para la tabla Subscriptions
INSERT INTO Subscriptions (user_id, plan_id, payment_number, active)
VALUES
(1, 1, '1234-5678-9012-3456', TRUE),
(2, 2, '9876-5432-1098-7654', TRUE);