#!/usr/bin/env bash
# Script de referencia para CloudRay (Liquid templates).
# Variables sugeridas en CloudRay:
#   website_dir  → /var/www/mecanicaseriols
#   your_domain  → mecanicaseriols.com
#   caddyfile    → /etc/caddy/Caddyfile

set -euo pipefail

cd "{{ website_dir }}"

echo "Actualizando repositorio..."
git fetch origin main
git reset --hard origin/main

echo "Instalando dependencias..."
npm ci

echo "Generando build de producción..."
npm run build:static

echo "Publicando archivos estáticos..."
sudo rsync -a --delete "{{ website_dir }}/static-output/" "{{ website_dir }}/public/"

echo "Configurando Caddy..."
sudo bash -c "cat > {{ caddyfile }}" <<EOF
{{ your_domain }} {
    root * {{ website_dir }}/public
    encode gzip
    file_server
    try_files {path} {path}/ /index.html
}
EOF

sudo systemctl reload caddy || sudo systemctl restart caddy

echo "Despliegue completado: https://{{ your_domain }}"
