#!/bin/bash
set -e

# Verificar si la base de datos existe
if psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "postgres" -tc "SELECT 1 FROM pg_database WHERE datname = 'medical_appointments'" | grep -q 1; then
    echo "Database 'medical_appointments' already exists"
else
    psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "postgres" <<EOSQL
        CREATE DATABASE medical_appointments;
EOSQL
fi