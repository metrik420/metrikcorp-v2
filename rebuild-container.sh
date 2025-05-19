#!/bin/bash

# ============================================================================
# Script: rebuild-container.sh
# Purpose: Cleanly rebuild and restart your Docker Compose environment
# Target: metrikcorp-v2 or any other compose stack in the current directory
# Author: MetrikCorp
# ============================================================================

# Exit on error, undefined variable, or failed pipe
set -euo pipefail

# Function: Print a bold header
print_section() {
  echo -e "\n\e[1;33m🔸 $1\e[0m"
}

# ----------------------------------------------------------------------------
print_section "Stopping and removing containers (including volumes and orphans)..."
docker-compose down --volumes --remove-orphans

# ----------------------------------------------------------------------------
print_section "Rebuilding containers from scratch (no cache)..."
docker-compose build --no-cache

# ----------------------------------------------------------------------------
print_section "Starting containers in detached mode..."
docker-compose up -d

# ----------------------------------------------------------------------------
print_section "Rebuild complete. Running containers:"
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
