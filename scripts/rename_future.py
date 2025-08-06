import os
import re

# Directory containing the files to rename
directory = "_future"

# Function to normalize file names by removing dates (e.g., YYYY-MM-DD at the beginning)
def normalize_filename(filename):
    return re.sub(r"^\d{4}-\d{2}-\d{2}-", "", filename)

# Function to update the `date:` line in the file content to have no value
def clear_date_in_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        content = file.readlines()
    
    # Update the 'date:' line to have no value
    updated_content = []
    for line in content:
        if line.startswith("date:"):
            updated_content.append("date: \n")  # Keep the line but clear the value
        else:
            updated_content.append(line)
    
    # Write the updated content back to the file
    with open(file_path, 'w', encoding='utf-8') as file:
        file.writelines(updated_content)

# Rename files and update their content
def rename_and_update_files(directory):
    for file in os.listdir(directory):
        old_path = os.path.join(directory, file)
        new_name = normalize_filename(file)
        new_path = os.path.join(directory, new_name)

        # Rename the file if necessary
        if new_name != file:
            os.rename(old_path, new_path)
            print(f"Renamed: {file} -> {new_name}")
        
        # Update the `date:` line in the file content
        clear_date_in_file(new_path)
        print(f"Cleared 'date' value in: {new_name}")

# Call the function to rename files and update their content
rename_and_update_files(directory)