#!/bin/bash

# Script to copy .env file to all SDK directories
set -e

# Source directory (where the main .env file is located)
SOURCE_FILE=".env"

# Check if source file exists
if [ ! -f "$SOURCE_FILE" ]; then
  echo "Error: $SOURCE_FILE not found in the current directory!"
  exit 1
fi

# List of target directories
TARGET_DIRS=(
  "sdks/dotnet/src/Voucherify.Test/.env"
  "sdks/java/.env"
  "sdks/php/.env"
  "sdks/python/.env"
  "sdks/ruby/.env"
)

# Copy .env to each target directory
for target in "${TARGET_DIRS[@]}"; do
  # Create directory if it doesn't exist
  mkdir -p "$(dirname "$target")"
  # Copy the file
  cp "$SOURCE_FILE" "$target"
  echo "Copied to: $target"
done

echo "\nAll .env files have been copied successfully!"
