'use strict';

// Run only by an operator with explicit access to the Analyst container.
// Reads the new password from STDIN, not argv, logs or command history.
const fs = require('node:fs');
const { Client } = require('pg');
const { hashPassword } = require('../dist/src/Services/Auth/PasswordHash');

async function main() {
  const username = process.argv[2];
  if (!username || username.length > 100) throw new Error('Specify an existing administrator username');
  const incoming = fs.readFileSync(0, 'utf8').replace(/\r?\n$/, '');
  if (incoming.length < 12 || Buffer.byteLength(incoming) > 1024) {
    throw new Error('New password must contain 12-1024 UTF-8 bytes');
  }
  const passwordhash = await hashPassword(incoming);
  const client = new Client({
    host: process.env.POSTGRES_HOST, port: 5432,
    user: process.env.POSTGRES_USER, password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  });
  try {
    await client.connect();
    const result = await client.query(
      'UPDATE user_entity SET passwordhash = $1 WHERE username = $2 AND isadmin = true',
      [passwordhash, username],
    );
    if (result.rowCount !== 1) throw new Error('Exactly one existing admin row required; no update applied');
    process.stdout.write('PASS password reset for exactly one existing administrator\n');
  } finally {
    await client.end().catch(() => {});
  }
}

main().catch(() => { process.stderr.write('Admin reset failed; verify the account and database settings\n'); process.exitCode = 1; });
