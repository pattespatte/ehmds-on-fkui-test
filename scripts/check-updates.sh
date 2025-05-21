#!/usr/bin/env bash

# Define the source repository URL
SOURCE_REPO="https://github.com/Forsakringskassan/designsystem.git"

# Check if upstream remote exists, add it if not
if ! git remote | grep -q "upstream"; then
	echo "Adding upstream remote..."
	git remote add upstream $SOURCE_REPO
fi

# Check if review-updates branch exists
if git show-ref --verify --quiet refs/heads/review-updates; then
	echo "Branch 'review-updates' already exists, switching to it..."
	git checkout review-updates
else
	echo "Creating new 'review-updates' branch..."
	git checkout -b review-updates
fi

# Fetch upstream changes
git fetch upstream

# Try to merge with --allow-unrelated-histories flag
echo "Attempting to merge updates from upstream..."
git merge upstream/main --allow-unrelated-histories || {
	echo "⚠️ Merge failed. You may need to resolve conflicts manually."
	echo "Consider using 'git cherry-pick' for specific commits instead."
	exit 1
}

echo "✅ Updates from FKUI fetched and merged into 'review-updates' branch."
echo "Review changes and run tests before merging to your main branch."
