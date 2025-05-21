#!/usr/bin/env bash

# Ensure the script is executed from the repository root.
cd "$(dirname "$0")/.."

echo "Updating FKUI dependencies..."

# List the FKUI packages to update.
FKUI_PACKAGES=(
	"@fkui/theme-default"
	"@fkui/design"
	"@fkui/date"
	"@fkui/logic"
	"@fkui/vue"
)

# Loop though each package and install its latest version.
for pkg in "${FKUI_PACKAGES[@]}"; do
	echo "Updating $pkg to the latest version..."
	npm install "$pkg@latest" --save
done

echo "✅ FKUI dependencies have been updated."
