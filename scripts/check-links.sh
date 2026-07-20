#!/usr/bin/env bash
# check-links.sh - extracts http(s) links from an HTML file and verifies each resolves.
set -uo pipefail

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 <html-file>" >&2
  exit 2
fi

file="$1"
urls=$(grep -oE 'href="https?://[^"]+"' "$file" | sed -E 's/^href="//;s/"$//' | sort -u)

if [ -z "$urls" ]; then
  echo "No external links found in $file"
  exit 0
fi

failed=0
while IFS= read -r url; do
  status=$(curl -s -o /dev/null -w "%{http_code}" -L --max-time 15 "$url")
  if [[ ! "$status" =~ ^[23] ]]; then
    echo "BROKEN LINK ($status): $url"
    failed=1
  else
    echo "OK ($status): $url"
  fi
done <<< "$urls"

exit "$failed"
