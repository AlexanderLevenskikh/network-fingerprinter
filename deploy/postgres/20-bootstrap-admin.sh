#!/bin/sh
# Official postgres entrypoint invokes this on a fresh data directory.
set -eu
: "${POSTGRES_USER:?}"
: "${POSTGRES_DB:?}"
: "${APP_ADMIN_USERNAME:?}"
: "${APP_ADMIN_PASSWORD:?}"

# The existing analyst-app code still compares an unsalted MD5 hash.
# Step 3 must migrate that authentication scheme. For now, do not seed root/root.
psql -v ON_ERROR_STOP=1 \
  --username "$POSTGRES_USER" \
  --dbname "$POSTGRES_DB" \
  -v "admin_username=$APP_ADMIN_USERNAME" \
  -v "admin_password=$APP_ADMIN_PASSWORD" <<'SQL'
INSERT INTO user_entity (userid, username, passwordhash, isadmin, firstname)
SELECT '00000000-0000-0000-0000-000000000000',
       :'admin_username', md5(:'admin_password'), true, 'Administrator'
WHERE NOT EXISTS (SELECT 1 FROM user_entity);
SQL
echo "Network Fingerprinter: bootstrap administrator created (fresh volume only)."
