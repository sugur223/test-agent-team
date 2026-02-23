#!/bin/bash
set -e

echo "=== Docker 開発環境を起動 ==="
docker compose up -d

echo "=== セルフホストランナー起動 ==="
cd ~/github-runners/runner-1 && ./run.sh &
cd ~/github-runners/runner-2 && ./run.sh &

echo "起動完了。停止は Ctrl+C"
wait
