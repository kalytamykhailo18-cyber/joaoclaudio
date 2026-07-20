#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# Backup diário — Dr. João Cláudio Miranda
# Faz dump do banco PostgreSQL (CMS) + dos uploads de mídia, com retenção de 7 dias.
# Uso: rodar via cron (ver instruções no final). Idempotente e seguro.
#
#   Restauração: ver docs/BACKUP-RESTORE.md
# ---------------------------------------------------------------------------
set -euo pipefail

# --- Configuração (ajuste conforme o servidor) -----------------------------
APP_DIR="${APP_DIR:-/var/www/joaoclaudio}"          # raiz da app no VPS
BACKUP_DIR="${BACKUP_DIR:-/var/backups/joaoclaudio}" # destino dos backups
RETENTION_DAYS="${RETENTION_DAYS:-7}"                # manter >= 7 dias
MEDIA_DIR="${MEDIA_DIR:-$APP_DIR/media}"             # uploads do Payload

# Lê DATABASE_URI do .env da app (não versiona segredo no script).
if [[ -f "$APP_DIR/.env" ]]; then
  # shellcheck disable=SC1091
  DATABASE_URI="$(grep -E '^DATABASE_URI=' "$APP_DIR/.env" | head -1 | cut -d= -f2-)"
fi
DATABASE_URI="${DATABASE_URI:-}"
if [[ -z "$DATABASE_URI" ]]; then
  echo "ERRO: DATABASE_URI não encontrado (defina no ambiente ou em $APP_DIR/.env)" >&2
  exit 1
fi

STAMP="$(date +%Y-%m-%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"

# --- 1) Dump do banco (comprimido) -----------------------------------------
DB_FILE="$BACKUP_DIR/db_${STAMP}.sql.gz"
echo "→ Dump do banco em $DB_FILE"
pg_dump "$DATABASE_URI" | gzip > "$DB_FILE"

# --- 2) Uploads de mídia (se existirem) ------------------------------------
if [[ -d "$MEDIA_DIR" ]]; then
  MEDIA_FILE="$BACKUP_DIR/media_${STAMP}.tar.gz"
  echo "→ Arquivando mídia em $MEDIA_FILE"
  tar -czf "$MEDIA_FILE" -C "$(dirname "$MEDIA_DIR")" "$(basename "$MEDIA_DIR")"
fi

# --- 3) Rotação: remove backups mais antigos que RETENTION_DAYS -------------
echo "→ Removendo backups com mais de ${RETENTION_DAYS} dias"
find "$BACKUP_DIR" -type f -name 'db_*.sql.gz'   -mtime "+${RETENTION_DAYS}" -delete
find "$BACKUP_DIR" -type f -name 'media_*.tar.gz' -mtime "+${RETENTION_DAYS}" -delete

echo "✓ Backup concluído: $STAMP"

# ---------------------------------------------------------------------------
# Agendar no cron (todo dia às 03:15):
#   crontab -e
#   15 3 * * * APP_DIR=/var/www/joaoclaudio /var/www/joaoclaudio/scripts/backup.sh >> /var/log/jc-backup.log 2>&1
#
# Recomendado: copiar $BACKUP_DIR para armazenamento externo (S3/Spaces) e/ou
# habilitar snapshot diário do droplet no painel do provedor (retenção >= 7 dias).
# ---------------------------------------------------------------------------
