#!/usr/bin/env bash
# One-command deploy from this Mac → Tencent Cloud, without the server touching GitHub.
#   npm run deploy
# Requires (one-time): the Mac's SSH key in the server's ~/.ssh/authorized_keys,
# `Host 01web` in ~/.ssh/config, git remote `server`, and on the server
# `git config receive.denyCurrentBranch updateInstead` (see CLAUDE.md).
set -euo pipefail
cd "$(dirname "$0")/.."

HOST="${DEPLOY_HOST:-01web}"
DIR="${DEPLOY_DIR:-/var/www/01web}"

if [ -n "$(git status --porcelain)" ]; then
  echo "✗ 工作区有未提交的改动，先 commit 再部署。"; git status --short; exit 1
fi
if [ "$(git branch --show-current)" != "main" ]; then
  echo "✗ 当前不在 main 分支。"; exit 1
fi

echo "▶ 推 GitHub（备份，失败不影响部署）"
git push origin main || echo "  ⚠ GitHub 推送失败，稍后再推一次：git push origin main"

echo "▶ 直推服务器工作区"
git push server main

echo "▶ 服务器：安装依赖（仅 lockfile 变化时）→ 构建 → 重启 → 通知搜索引擎"
# shellcheck disable=SC2029
ssh "$HOST" "set -e; cd $DIR
  if [ ! -f node_modules/.package-lock.json ] || [ package-lock.json -nt node_modules/.package-lock.json ]; then
    echo '  npm ci …'; npm ci --no-audit --no-fund
  else
    echo '  依赖未变，跳过 npm ci'
  fi
  npm run build
  pm2 restart 01web --update-env
  npm run notify || echo '  ⚠ 通知搜索引擎失败（不影响上线）'"

echo "▶ 线上自检"
sleep 2
code=$(curl -s -o /dev/null -m 30 -w '%{http_code}' https://www.01weichuang.com/zh)
[ "$code" = "200" ] && echo "✓ https://www.01weichuang.com/zh → 200" || { echo "✗ 首页返回 $code"; exit 1; }
