#!/usr/bin/env bash
# check-links.sh
# Uses lychee to check all links (internal and external) in the built _site/ directory.
# Requires lychee to be installed: https://github.com/lycheeverse/lychee
# Install with: cargo install lychee OR choco install lychee

set -e

SITE_DIR="_site"

if ! command -v lychee >/dev/null 2>&1; then
  echo "Error: lychee is not installed. Install it from https://github.com/lycheeverse/lychee, with 'cargo install lychee', or 'choco install lychee'."
  exit 2
fi

lychee --no-progress --max-concurrency 10 "$SITE_DIR/**/*.html"

echo "Link check complete."
