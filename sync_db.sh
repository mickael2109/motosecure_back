#!/bin/bash

# Infos connexion Render (prod)
RENDER_DB_URL="postgresql://mc_bd_user:3TXfT8LVnAI50aEVdvinxOpRMAq98nJp@dpg-d23mksngi27c7384vtkg-a.oregon-postgres.render.com/mc_bd"

# Infos connexion local
LOCAL_DB_URL="postgresql://postgres:mickael210902@localhost:5432/motosecure"

# Sauvegarde
pg_dump "$RENDER_DB_URL" > backup_render.sql

# Nettoyer la base locale
psql "$LOCAL_DB_URL" -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"

# Créer l'utilisateur s’il n'existe pas
psql "$LOCAL_DB_URL" -c "DO \$\$
BEGIN
   IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'mc_bd_user') THEN
      CREATE ROLE mc_bd_user LOGIN;
   END IF;
END
\$\$;"

# Restauration
psql "$LOCAL_DB_URL" < backup_render.sql

echo "Synchronisation terminée."


echo "Synchronisation terminée."
