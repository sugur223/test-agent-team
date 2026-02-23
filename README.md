This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 開発環境セットアップ

### 前提条件
- Docker / Docker Compose

### 起動方法
```bash
cp .env.example .env
make build
make up
make db-create
make db-migrate
make db-seed
```

### よく使うコマンド
```bash
make test    # テスト
make lint    # リント
make sh      # コンテナに入る
make logs    # ログ
make down    # 停止
```

## 自動開発パイプライン

GitHub × Claude Code × Codex による自動開発パイプラインを導入しています。

### 使い方
1. Issue を作成し `auto-dev` ラベルを付与
2. Claude Code が自動実装→PR作成
3. Codex が自動レビュー（修正ループ最大5回）
4. Approve 後、手動マージ→自動デプロイ

### 修正指示
- 正式レビュー（Request changes）→ 自動修正
- `/fix` コメント → 自動修正
