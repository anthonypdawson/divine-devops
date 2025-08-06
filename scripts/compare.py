#!/usr/bin/env python3
import os
import re
from filecmp import cmp
from difflib import SequenceMatcher

# Directories to compare
dir1 = "_future"
dir2 = "_posts"

# Function to normalize file names by removing dates (e.g., YYYY-MM-DD)
def normalize_filename(filename):
    return re.sub(r"\d{4}-\d{2}-\d{2}-", "", filename)

# Get normalized file mappings
def get_normalized_files(directory):
    files = {}
    for file in os.listdir(directory):
        normalized = normalize_filename(file)
        files[normalized] = os.path.join(directory, file)
    return files

# Function to calculate content similarity percentage
def calculate_similarity(file1, file2):
    with open(file1, 'r', encoding='utf-8') as f1, open(file2, 'r', encoding='utf-8') as f2:
        content1 = f1.read()
        content2 = f2.read()
    return SequenceMatcher(None, content1, content2).ratio() * 100

# Compare files
files1 = get_normalized_files(dir1)
files2 = get_normalized_files(dir2)

common_files = set(files1.keys()) & set(files2.keys())
matching_files = []
mismatched_files = []
similarity_results = {}

for file in common_files:
    if cmp(files1[file], files2[file], shallow=False):
        matching_files.append(file)
    else:
        mismatched_files.append(file)
        similarity = calculate_similarity(files1[file], files2[file])
        similarity_results[file] = similarity

unique_to_dir1 = set(files1.keys()) - set(files2.keys())
unique_to_dir2 = set(files2.keys()) - set(files1.keys())

# User option to show matching files or similarity percentages
show_option = input("Do you want to see (1) only matching files or (2) content similarity percentages? (1/2): ").strip()

if show_option == "1":
    print("\nMatching Files:")
    for file in matching_files:
        print(file)
elif show_option == "2":
    print("\nContent Similarity Percentages for Mismatched Files:")
    for file, similarity in similarity_results.items():
        print(f"{file}: {similarity:.2f}% similar")
else:
    print("\nInvalid option. Showing all details by default.")
    print("\nMatching Files:")
    for file in matching_files:
        print(file)

    print("\nMismatched Files:")
    for file in mismatched_files:
        print(file)

    print("\nUnique to Directory 1:", unique_to_dir1)
    print("Unique to Directory 2:", unique_to_dir2)