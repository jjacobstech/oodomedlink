#!/bin/bash
echo 'Building Frontend Assets'
echo '======================='
npm run build
echo 'Building Complete'
echo '======================='

echo "Write your commit message here"
echo '==============================='

read -r -p "Commit Message:" message
echo '============================='

echo "$message"

echo "Adding changes to the repository"
echo '==============================='
git add .

git commit -m "$message"
echo "Committed changes"

echo "Pushing changes to remote repository"
echo '==================================='
git push

# This script is used to commit changes to the repository.
# It is executed automatically by the deployment process.

# Get the current branch name

