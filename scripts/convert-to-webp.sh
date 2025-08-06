#!/usr/bin/env bash
# convert-to-webp.sh
# Usage: ./convert-to-webp.sh input_image
# Converts a given image (PNG, JPG, etc.) to WebP format using cwebp.
# The output .webp file will be created in the same directory as the input image.

set -e

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 input_image"
  exit 1
fi

input="$1"
dir="$(dirname "$input")"
base="$(basename "$input")"
name="${base%.*}"
output="$dir/$name.webp"

if ! command -v cwebp >/dev/null 2>&1; then
  echo "Error: cwebp is not installed. Please install it (e.g., 'brew install webp', 'apt install webp', or download for Windows)."
  exit 2
fi

cwebp -q 90 "$input" -o "$output"
echo "Converted $input to $output"
