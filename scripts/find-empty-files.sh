#!/bin/bash
# Usage: ./find-and-delete-untracked-empty-files.sh [--delete]

find . -type f -size 0 ! -path "./node_modules/*" ! -path "./_site/*" > empty_files.txt

echo "Untracked empty files:"
while read -r file; do
  if ! git ls-files --error-unmatch "$file" >/dev/null 2>&1; then
    echo "$file"
    echo "$file" >> untracked_empty_files.txt
  fi
done < empty_files.txt

if [[ "$1" == "--delete" ]]; then
  echo "Deleting untracked empty files..."
  xargs rm < untracked_empty_files.txt
  echo "Deleted."
else
  echo "Dry run: No files deleted."
fi

rm empty_files.txt untracked_empty_files.txt 2>/dev/null
