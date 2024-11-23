BEGIN;

CREATE TABLE IF NOT EXISTS client (
    client_document VARCHAR(10) NOT NULL PRIMARY KEY,
    client_name VARCHAR(50) NOT NULL,
    client_mobile VARCHAR(10) NOT NULL,
    client_email VARCHAR(50) NOT NULL,
    client_password VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS barber (
    barber_document VARCHAR(10) NOT NULL PRIMARY KEY,
    barber_name VARCHAR(50) NOT NULL,
    barber_mobile VARCHAR(10) NOT NULL,
    barber_email VARCHAR(50) NOT NULL,
    barber_password VARCHAR(50) NOT NULL
);

CREATE TABLE IF NOT EXISTS appointment (
    appointment_id SERIAL PRIMARY KEY,
    client_document VARCHAR(10) NOT NULL,
    barber_document VARCHAR(10) NOT NULL,
    appointment_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL,
    FOREIGN KEY (client_document) REFERENCES client(client_document),
    FOREIGN KEY (barber_document) REFERENCES barber(barber_document)
);

CREATE TABLE IF NOT EXISTS service (
    service_id SERIAL PRIMARY KEY,
    service_name VARCHAR(50) NOT NULL,
    service_duration INTERVAL NOT NULL,
    service_price DECIMAL(10, 2) NOT NULL
);

CREATE TABLE IF NOT EXISTS appointment_service (
    appointment_id INT NOT NULL,
    service_id INT NOT NULL,
    PRIMARY KEY (appointment_id, service_id),
    FOREIGN KEY (appointment_id) REFERENCES appointment(appointment_id),
    FOREIGN KEY (service_id) REFERENCES service(service_id)
);

COMMIT;
