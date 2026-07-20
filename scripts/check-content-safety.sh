#!/usr/bin/env bash
# check-content-safety.sh - fails if any forbidden term appears in the given files.
set -euo pipefail

FORBIDDEN=(
  "SpyHawk"
  "\$5.5 million"
  "Azure Sentinel"
  "CODiE"
  "Hackathon Raptors"
  "Raptors Fellowship"
  "National Interest Waiver"
  "beneficiary"
  "100229187"
  "8143670"
)

if [ "$#" -eq 0 ]; then
  echo "Usage: $0 <file>..." >&2
  exit 2
fi

found=0
for file in "$@"; do
  [ -f "$file" ] || continue
  for term in "${FORBIDDEN[@]}"; do
    if grep -qiF -- "$term" "$file"; then
      echo "FORBIDDEN TERM FOUND: '$term' in $file"
      found=1
    fi
  done
done

if [ "$found" -eq 1 ]; then
  exit 1
fi
echo "OK: no forbidden terms found in: $*"
exit 0
