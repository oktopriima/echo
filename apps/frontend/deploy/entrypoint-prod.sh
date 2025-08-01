#!/bin/sh

# Print env (opsional untuk debug)
echo "Starting Nginx for Vue app..."
echo "API URL: $VITE_API_URL"

nginx -g "daemon off;"
