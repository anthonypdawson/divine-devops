#!/usr/bin/env bash
# optimize-images.sh
# Converts all PNG images in assets/images/ (recursively) to WebP format if a .webp version does not already exist.

set -e

IMG_DIR="assets/images"
SCRIPT_DIR="$(dirname "$0")"
CONVERT_SCRIPT="$SCRIPT_DIR/convert-to-webp.sh"

find "$IMG_DIR" -type f -iname '*.png' | while read -r png; do
  webp="${png%.png}.webp"
  if [ ! -f "$webp" ]; then
    echo "Converting $png to $webp..."
    bash "$CONVERT_SCRIPT" "$png"
  else
    echo "Skipping $png (webp already exists)"
  fi
done
