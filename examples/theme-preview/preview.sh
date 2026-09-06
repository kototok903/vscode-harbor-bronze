#!/usr/bin/env bash
# Visual sample: assignments, substitutions, tests, and heredocs.
set -euo pipefail

readonly HARBOR_NAME='Bronze'
berths=(North South "Outer Dock")
depth=3

describe() {
  local name="${1:-unknown}"
  printf '%s: %dm\n' "$name" "$((depth + 1))"
}

for berth in "${berths[@]}"; do
  if [[ "$berth" =~ ^[A-Z] && "$depth" -gt 0 ]]; then
    describe "$berth"
  fi
done

label="$(describe "${berths[0]}")"
case "$label" in
  North*) printf '%s\n' "${label^^}" ;;
  *) printf '%s\n' 'unknown harbor' ;;
esac

cat <<EOF
Harbor: ${HARBOR_NAME}
Depth: ${depth}
EOF

cat <<'LITERAL'
Literal $HARBOR_NAME and $(command) are not expanded.
LITERAL
