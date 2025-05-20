#!/usr/bin/env bash

# Create a branch for reviewing updates
git checkout -b review-updates

# Fetch and merge upstream changes
git fetch upstream
git merge upstream/main

echo "Updates from FKUI fetched and merged into 'review-updates' branch."
echo "Review changes and run tests before merging to your main branch."