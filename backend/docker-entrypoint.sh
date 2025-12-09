#!/bin/sh
set -e

echo "🚀 Starting Backend Initialization..."

# Aguardar PostgreSQL estar pronto
echo "⏳ Waiting for PostgreSQL to be ready..."
until pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USER; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 2
done

echo "✅ PostgreSQL is ready!"

# Executar migrations (aceita automaticamente em produção)
echo "📦 Running migrations..."
echo "y" | node build/bin/console.js migration:run

# Aguardar migrations completarem
sleep 2

# Executar seeders
echo "🌱 Running seeders..."
node build/bin/console.js db:seed

echo "🎉 Backend initialization complete!"

# Executar comando passado como argumento
exec "$@"
