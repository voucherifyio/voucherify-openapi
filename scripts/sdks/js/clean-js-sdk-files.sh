#!/bin/bash

# Script to remove files listed in sdks/js/.openapi-generator/FILES
# This is used to clean up generated files before regenerating the JS SDK

# Check if FILES exists
if [ ! -f "sdks/js/.openapi-generator/FILES" ]; then
    echo "File sdks/js/.openapi-generator/FILES does not exist"
    exit 1
fi

# Change to sdks/js directory
cd sdks/js

# Read FILES and remove each listed file/directory
while IFS= read -r file; do
    # Skip empty lines
    if [ -n "$file" ]; then
        if [ -f "$file" ]; then
            echo "Removing file: $file"
            rm "$file"
        elif [ -d "$file" ]; then
            echo "Removing directory: $file"
            rm -rf "$file"
        else
            echo "File/directory does not exist: $file"
        fi
    fi
done < .openapi-generator/FILES

echo "Finished removing files from FILES list"
