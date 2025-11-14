#!/bin/bash

echo "Write your commit message here"

read -r -p "Commit Message:" message

echo "$message"

echo "Adding changes to the repository"
git add .

git commit -m "$message"
echo "Committed changes"

echo "Pushing changes to remote repository"
git push

# This script is used to commit changes to the repository.
# It is executed automatically by the deployment process.

# Get the current branch name
