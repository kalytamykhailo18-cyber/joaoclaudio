# Backup e Restauração

Estratégia de backup do site do Dr. João Cláudio Miranda. Dois níveis:

1. **Snapshot do servidor (VPS)** — habilite o snapshot diário no painel do provedor (DigitalOcean/Hetzner/etc.), com retenção de pelo menos 7 dias. Cobre o servidor inteiro.
2. **Dump da aplicação** — `scripts/backup.sh` faz dump do banco (CMS) + dos uploads de mídia, com retenção de 7 dias. É o que permite restaurar o conteúdo sem depender do snapshot.

## O que é feito backup

- **Banco PostgreSQL** (`db_AAAA-MM-DD_HHMMSS.sql.gz`) — todo o conteúdo editável: páginas, condições, tratamentos, posts do blog, redirecionamentos, usuários.
- **Mídia** (`media_AAAA-MM-DD_HHMMSS.tar.gz`) — imagens enviadas pelo CMS (foto do médico, imagens de apoio).
- **Código** — está no Git do cliente; não precisa de backup separado.

## Agendamento (cron)

```bash
crontab -e
# Todo dia às 03:15:
15 3 * * * APP_DIR=/var/www/joaoclaudio /var/www/joaoclaudio/scripts/backup.sh >> /var/log/jc-backup.log 2>&1
```

Ajuste `APP_DIR`, `BACKUP_DIR`, `MEDIA_DIR` e `RETENTION_DAYS` conforme o servidor (variáveis de ambiente no topo do script).

> Recomendado: replicar `BACKUP_DIR` para um armazenamento externo (S3 / DO Spaces) — assim um problema no VPS não leva junto os backups.

## Restauração

### Restaurar o banco

```bash
# 1. Descomprima o dump desejado
gunzip -k /var/backups/joaoclaudio/db_2026-01-15_031500.sql.gz

# 2. (Opcional, destrutivo) recriar o banco do zero
#    psql -c "DROP DATABASE joaoclaudio;" -c "CREATE DATABASE joaoclaudio;"

# 3. Restaurar
psql "$DATABASE_URI" < /var/backups/joaoclaudio/db_2026-01-15_031500.sql

# 4. Reinicie a app
pm2 restart joaoclaudio
```

### Restaurar a mídia

```bash
tar -xzf /var/backups/joaoclaudio/media_2026-01-15_031500.tar.gz -C /var/www/joaoclaudio/
pm2 restart joaoclaudio
```

### Teste de restauração (recomendado no handoff)

Faça um restore de teste em um banco temporário para confirmar que o dump é válido:

```bash
createdb jc_restore_test
psql jc_restore_test < db_AAAA-MM-DD.sql   # deve terminar sem erros
dropdb jc_restore_test
```

## Observação sobre migrações de schema

Ao adicionar uma nova coleção/campo no CMS (ex.: a coleção de **Redirecionamentos**), o
banco precisa do schema atualizado. Com o adaptador Postgres do Payload, rode a
sincronização de schema no deploy (`payload migrate` ou push, conforme a configuração)
antes de reiniciar a app.
