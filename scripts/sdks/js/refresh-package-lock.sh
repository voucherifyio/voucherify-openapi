#!/usr/bin/env bash
# Regenerates sdks/js/package-lock.json with Node.js 22.23.4.
# That release rejects TLS chains containing the compromised eMudhra
# intermediate CA keys. Older 22.x still trusts them.
set -euo pipefail

NODE_VERSION="22.23.4"
ROOT="$(cd "$(dirname "$0")/../../.." && pwd)"

DOCKERFILE="$ROOT/sdks/js/Dockerfile"
FIRST="$(head -n 1 "$DOCKERFILE")"
if [[ "$FIRST" != "FROM node:${NODE_VERSION}" ]]; then
  echo "sdks/js/Dockerfile must start with FROM node:${NODE_VERSION}" >&2
  echo "Found: ${FIRST}" >&2
  exit 1
fi

RELEASE_YML="$ROOT/sdks/js/.github/workflows/release.yml"
if ! grep -q "node-version: ${NODE_VERSION}" "$RELEASE_YML"; then
  echo "sdks/js/.github/workflows/release.yml must set node-version: ${NODE_VERSION}" >&2
  exit 1
fi

export NVM_DIR="${NVM_DIR:-$HOME/.nvm}"
if [[ ! -s "$NVM_DIR/nvm.sh" ]]; then
  echo "nvm is required at ${NVM_DIR}/nvm.sh to refresh the JS SDK lockfile with Node ${NODE_VERSION}" >&2
  exit 1
fi
# shellcheck disable=SC1090
. "$NVM_DIR/nvm.sh"

nvm install "$NODE_VERSION"

(
  cd "$ROOT/sdks/js"
  nvm exec "$NODE_VERSION" npm install
)

ACTUAL="$(nvm exec "$NODE_VERSION" node -p "process.version" 2>/dev/null | tail -n 1 | tr -d '[:space:]')"
if [[ "$ACTUAL" != "v${NODE_VERSION}" ]]; then
  echo "expected Node v${NODE_VERSION}, got ${ACTUAL:-<empty>}" >&2
  exit 1
fi

echo "Refreshed sdks/js/package-lock.json with Node ${ACTUAL}"
