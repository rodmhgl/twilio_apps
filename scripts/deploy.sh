#!/bin/bash

set -eo pipefail

CLONE_DIR="${CLONE_DIR:-$1}"
DEPLOY_DIR="${DEPLOY_DIR:-$2}"
REPO_URL="${REPO_URL:-$3}"

echo "::group::Deploying App"
echo "::debug::Cleaning up and cloning repo"
rm -rf "$CLONE_DIR"
git clone "$REPO_URL" "$CLONE_DIR"

echo "::debug::Creating hooks directory"
mkdir -p "$DEPLOY_DIR/.git/hooks"

echo "::debug::Copying new code to deployment folder"
rsync -ac --delete --exclude .git "$CLONE_DIR/" "$DEPLOY_DIR"
chown -R nodejs:nodejs "$DEPLOY_DIR"
echo "::endgroup::"