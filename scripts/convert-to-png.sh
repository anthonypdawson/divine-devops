#!/usr/bin/env bash
# convert-to-png.sh
# Usage: ./convert-to-png.sh input_image output_image.png
# Converts any supported image format to PNG using ImageMagick's convert tool.

set -e

if [ "$#" -ne 2 ]; then
  echo "Usage: $0 input_image output_image.png"
  exit 1
fi

input="$1"
output="$2"

if ! command -v convert >/dev/null 2>&1; then
  echo "Error: ImageMagick 'convert' is not installed."
  exit 2
fi

convert "$input" "$output"
echo "Converted $input to $output"
