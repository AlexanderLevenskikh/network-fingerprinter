#!/bin/sh
# PostgreSQL owns schema initialization only. Analyst onModuleInit seeds the
# configured administrator using asynchronous scrypt after PostgreSQL is ready.
# This avoids creating any new MD5 password hashes in a clean Compose volume.
set -eu
echo "Network Fingerprinter: PostgreSQL schema ready; Analyst will seed administrator."
