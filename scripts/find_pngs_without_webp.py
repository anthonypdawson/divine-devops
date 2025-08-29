#!/usr/bin/env python3
"""
find_pngs_without_webp.py

Find all committed .png files in the project that do not have a .webp equivalent in the same directory.
Optionally, print suggested cwebp conversion commands for missing .webp files.

Usage:
    python scripts/find_pngs_without_webp.py [--convert]

If --convert is passed, print cwebp commands to convert each .png to .webp.
"""
import os
import sys
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

missing_webp = []

for dirpath, dirnames, filenames in os.walk(ROOT):
    for filename in filenames:
        if filename.lower().endswith('.png'):
            png_path = os.path.join(dirpath, filename)
            webp_path = os.path.splitext(png_path)[0] + '.webp'
            if not os.path.exists(webp_path):
                missing_webp.append((png_path, webp_path))

if not missing_webp:
    print("All .png files have .webp equivalents!")
    sys.exit(0)

print(".png files without .webp equivalents:")
for png, webp in missing_webp:
    print(f"- {os.path.relpath(png, ROOT)}")

if '--convert' in sys.argv:
    print("\nSuggested conversion commands:")
    for png, webp in missing_webp:
        print(f'cwebp -q 90 "{png}" -o "{webp}"')
    if '--run' in sys.argv:
        print("\nRunning cwebp conversions...")
        for png, webp in missing_webp:
            try:
                subprocess.run([
                    'cwebp', '-q', '90', png, '-o', webp
                ], check=True)
                print(f"Converted: {os.path.relpath(png, ROOT)} -> {os.path.relpath(webp, ROOT)}")
            except Exception as e:
                print(f"Failed to convert {png}: {e}")
