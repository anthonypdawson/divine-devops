#!/bin/bash

# Usage: ./publish-jekyll-post.sh path/to/file.md

set -e

SRC="$1"
if [[ ! -f "$SRC" ]]; then
  echo "File not found: $SRC"
  exit 1
fi

# Extract date from front matter (expects 'date: YYYY-MM-DD ...')
DATE=$(grep -m1 '^date:' "$SRC" | awk '{print $2}')
YEAR=$(echo "$DATE" | cut -d'-' -f1)
MONTH=$(echo "$DATE" | cut -d'-' -f2)

# Get filename without path
BASENAME=$(basename "$SRC")
# Remove any leading date if present
NAME=$(echo "$BASENAME" | sed -E 's/^[0-9]{4}-[0-9]{2}-[0-9]{2}-//')

# Build destination path
DEST_DIR="_posts/$YEAR/$MONTH"
DEST_FILE="$DEST_DIR/$DATE-$NAME"

# Create destination directory if needed
mkdir -p "$DEST_DIR"

# Move and rename
mv "$SRC" "$DEST_FILE"

echo "Moved to $DEST_FILE"
