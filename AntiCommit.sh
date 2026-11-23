#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 || ! "$1" =~ ^([0-9]{2})/([0-9]{2})/([0-9]{4})$ ]]; then
  echo "Utilisation : ./AntiCommit.sh JJ/MM/AAAA [\"message du commit\"]" >&2
  exit 1
fi

# Conversion JJ/MM/AAAA en AAAA-MM-JJ.
iso_date="${BASH_REMATCH[3]}-${BASH_REMATCH[2]}-${BASH_REMATCH[1]}"
if ! normalized=$(TZ=Europe/Paris date -d "$iso_date" +%F 2>/dev/null) || [[ "$normalized" != "$iso_date" ]]; then
  echo "Date invalide : $1" >&2
  exit 1
fi

# Midi dans le fuseau Europe/Paris (décalage été/hiver automatique).
commit_date=$(TZ=Europe/Paris date -d "$iso_date 12:00:00" +'%Y-%m-%dT%H:%M:%S%:z')
message="${2:-Mise à jour du projet}"

cd "$(git rev-parse --show-toplevel)"

# Ajouter les changements, sauf ce script.
git add -A -- . ':(exclude)AntiCommit.sh'
# Retirer le script de l'index s'il y avait déjà été ajouté.
if git rev-parse --verify HEAD >/dev/null 2>&1; then
  git reset -q HEAD -- AntiCommit.sh
else
  git rm -q --cached --ignore-unmatch -- AntiCommit.sh
fi

if git diff --cached --quiet; then
  echo "Rien à committer (hors AntiCommit.sh)."
  exit 0
fi

GIT_AUTHOR_DATE="$commit_date" GIT_COMMITTER_DATE="$commit_date" \
  git commit -m "$message"

echo "Commit daté du $1 (12:00, Europe/Paris)."
