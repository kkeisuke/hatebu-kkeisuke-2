# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## プロジェクト概要

任意アカウントの「はてなブックマーク」データを取得し、Markdown へ変換し、GitHub リポジトリへ push、または Algolia インデックスに追加する CLI ツール。

- コミット先リポジトリ: `kkeisuke/hatebu-kkeisuke-client`
- 公開ブログ: https://hatebu.kkeisuke.com/

## 主要コマンド

```bash
# 開発実行（ts-node 経由、.env を dotenvx でロード）
npm run cli:dev -- date [YYYYMMDD]
npm run cli:dev -- push [YYYYMMDD]
npm run cli:dev -- algolia [YYYYMMDD]

# ビルド（esbuild で dist/cli.js に bundle）
npm run build
node dist/cli.js date|push|algolia [YYYYMMDD]

# テスト
npm test                          # dotenvx + jest
npm run test:ci                   # silent モード
npx jest tests/path/to/file.spec.ts            # 単一ファイル
npx jest -t "テスト名の一部"                     # 名前で絞り込み

# Lint / 型チェック
npm run lint        # prettier --write + eslint --fix
npm run typecheck   # tsc --noEmit
```

CLI コマンド引数で日付を省略した場合は前日が対象。

## アーキテクチャ

レイヤード構成 (DDD ライク)：

```
src/
├── cli.ts                  # cac による CLI エントリ。3 サブコマンドを application へディスパッチ
├── application/            # ユースケース 1 ファイル = 1 コマンド
│   ├── HatebuToMarkdownApp.ts        # date: はてブ → Markdown 生成（ローカル）
│   ├── HatebuMarkdownToGitHubApp.ts  # push: Markdown → GitHub commit
│   └── HatebuMarkdownToAlgoliaApp.ts # algolia: Markdown → Algolia index
├── domain/
│   ├── entity/   HatebuData, HatebuMarkdown
│   ├── service/  HatebuService / MarkdownService / GitHubService / AlgoliaService
│   └── value/    HatebuDate（日付正規化、デフォルト=前日）
└── datasource/api/  HatebuApi / GitHubApi / AlgoliaApi  ← 外部 I/O はここに集約
```

データフロー: `HatebuApi` がはてブの search.data を取得 → `HatebuService` が日付フィルタした `HatebuData` を返す → `MarkdownService` が `HatebuMarkdown` に変換 → 用途に応じて GitHub / Algolia の各 Service & Api 経由で出力。

application 層はオーケストレーションのみ。ロジックは domain/service へ、外部通信は datasource/api へ置く。新コマンド追加時は `cli.ts` で command 登録 → `application/` にユースケース追加、の順で広げる。

## 設定 / 環境変数

- 環境変数は `.env` (`.env.copy` をコピー) に置き、`@dotenvx/dotenvx` 経由で読み込まれる。`npm run cli:dev` / `npm test` は `dotenvx run --` を内包しているので別途 source 不要。
- 必要なキー: `HATEB_ORIGIN`, `HATEB_PATH`, `GITHUB_API_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`, `GITHUB_REF`, `GITHUB_PATH`, `COMMIT_MSG`, `ALGOLIA_APPLICATION`, `ALGOLIA_API_KEY`, `ALGOLIA_INDEX`。
- Node バージョンは `.node-version` / `mise.toml` / `package.json#engines` で `24.15.0` 固定。esbuild の target も同バージョン。

## テスト

- Jest + ts-jest。`tests/` 配下、`*.spec.ts` のみ収集。`tests/jest.setup.ts` が共通セットアップ。
- 外部 API は `nock` でモック（`tests/mock/` にフィクスチャ）。新規 datasource を追加した際は実通信させずモック前提でテストすること。
