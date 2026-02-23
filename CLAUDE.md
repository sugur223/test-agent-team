# CLAUDE.md - test-agent-team

## プロジェクト概要

Next.js ベースの Web アプリケーション。GitHub × Claude Code × Codex による自動開発パイプラインを備える。

## 技術スタック

- **言語**: TypeScript
- **フレームワーク**: Next.js 16 (App Router)
- **UI**: React 19 + Tailwind CSS 4
- **ORM**: Prisma 7 (prisma-client)
- **DB**: PostgreSQL 16
- **パッケージマネージャ**: npm
- **リント**: ESLint 9 (eslint-config-next)
- **コンテナ**: Docker + Docker Compose

## ディレクトリ構成

```
.
├── src/
│   ├── app/              # Next.js App Router (ページ・レイアウト)
│   │   ├── layout.tsx    # ルートレイアウト
│   │   ├── page.tsx      # トップページ
│   │   └── globals.css   # グローバルCSS (Tailwind)
│   ├── lib/
│   │   └── prisma.ts     # Prisma クライアント (シングルトン)
│   └── generated/
│       └── prisma/       # Prisma 自動生成コード (gitignore済み)
├── prisma/
│   └── schema.prisma     # Prisma スキーマ定義
├── prisma.config.ts      # Prisma 設定 (DB接続URL等)
├── public/               # 静的ファイル
├── .github/workflows/    # GitHub Actions ワークフロー
├── Dockerfile            # マルチステージビルド
├── docker-compose.yml    # 開発環境定義
├── Makefile              # 開発コマンド
└── .env.example          # 環境変数テンプレート
```

## Docker 開発環境

### 起動方法

```bash
cp .env.example .env
make build
make up
make db-create    # Prisma スキーマを DB に反映
```

### コマンド

| コマンド | 説明 |
|---------|------|
| `make up` | コンテナ起動 |
| `make down` | コンテナ停止 |
| `make build` | イメージビルド |
| `make logs` | ログ表示 |
| `make test` | テスト実行 |
| `make lint` | ESLint 実行 |
| `make db-create` | DB スキーマ反映 (prisma db push) |
| `make db-migrate` | マイグレーション作成・適用 |
| `make db-seed` | シードデータ投入 |
| `make sh` | コンテナに入る |

### ルール（必ず守ること）

1. **すべてのコマンドは Docker コンテナ内で実行する**（ホスト直接実行禁止）
   - `docker compose exec app <コマンド>` または `make` ターゲットを使う
   - 例: `docker compose exec app npm run lint` / `make lint`
2. **新しい依存パッケージを追加した場合は Dockerfile も更新する**
   - `npm install` 後、`make build` でイメージを再ビルド
3. **環境変数は `.env` で管理し、`.env.example` を常に最新に保つ**
4. **DB スキーマ変更時はマイグレーションファイルを作成する**
   - `prisma/schema.prisma` を編集後、`make db-migrate` を実行

### ポート

- アプリ: `http://localhost:3456` (ホスト) → `3000` (コンテナ)
- PostgreSQL: `localhost:5433` (ホスト) → `5432` (コンテナ)

## コーディング規約

- TypeScript を使用（`.ts` / `.tsx`）、`any` は禁止
- コンポーネントは `src/app/` 配下に App Router の規約に従って配置
- インポートエイリアスは `@/*` (`src/*` に対応)
- スタイリングは Tailwind CSS のユーティリティクラスを使用
- Prisma クライアントは `src/lib/prisma.ts` のシングルトンを使用
- ESLint (`eslint-config-next`) のルールに従う

## 実装時のルール

1. 新しいページを追加する場合は `src/app/<path>/page.tsx` を作成
2. API エンドポイントは `src/app/api/<path>/route.ts` に作成
3. DB モデル追加・変更時は `prisma/schema.prisma` を編集し、マイグレーションを作成
4. テストを書いた場合は `make test` で Docker 内で実行して確認
5. `make lint` が通ることを確認してからコミット
6. 共通ロジックは `src/lib/` に配置

## よくある作業パターン

### 新しい API エンドポイントの追加

1. `prisma/schema.prisma` にモデルを追加（必要な場合）
2. `make db-migrate` でマイグレーション作成
3. `src/app/api/<name>/route.ts` にハンドラを実装
4. `make lint` でリントチェック

### 新しいページの追加

1. `src/app/<path>/page.tsx` を作成
2. 必要に応じて `layout.tsx` も作成
3. API 呼び出しが必要なら Server Components または Route Handler を使用

### 依存パッケージの追加

1. `docker compose exec app npm install <package>`
2. `make build` でイメージ再ビルド
3. `.env.example` に環境変数が必要なら追加
