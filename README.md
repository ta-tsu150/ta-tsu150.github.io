# ta-tsu150.github.io

市野 達也（Tatsuya Ichino）のポートフォリオサイトのソースコード。

https://ta-tsu150.github.io/

## 技術スタック

Nuxt 4（静的生成）/ TypeScript / `@nuxt/image` / `@nuxt/icon` / GitHub Actions → GitHub Pages

UI ライブラリも CSS フレームワークも使わず、素の CSS とスコープ付きスタイルで組んでいる。

## 設計で工夫した点

**初回表示の速さ** — 通信と CPU を絞ったモバイル環境で計測しながら改善した。

- グローバル CSS を HTML にインライン化し、描画をブロックする往復を1つ減らした（初回描画 1612ms → 936ms）
- 画面外のセクションに `content-visibility` を適用し、初回のレイアウト処理を約1.3秒 → 約0.5秒に短縮
- 低速回線では JS の先読み指定が本文の帯域を奪っていたため、`modulepreload` を外した

3つを合わせて、低速回線（400kbps / 遅延400ms）での初回描画が 1628ms → 668ms になった。

**アクセシビリティ** — スキップリンク、メニューのフォーカストラップと Esc 操作、絞り込み結果の
`aria-live` 通知、`prefers-reduced-motion` 対応。JS が無効なときはもちろん、JS は動くが
バンドルが届かないときも本文が読めるようにしてある。印刷すると全文が白地に出る。

**テーマ** — ライト / ダークの切り替え。描画前のインラインスクリプトで保存値と OS の設定から
決めるので、読み込み時にちらつかない。

**データと表示の分離** — 表示内容は `app/data/profile.ts` に集約。スキルタグから Works への
参照は union 型で定義してあり、存在しない Works を参照するとビルド時に落ちる。

## ディレクトリ構成

```
app/
  data/profile.ts       表示内容（プロフィール・スキル・Works・経歴）
  types/profile.ts      表示内容の型
  pages/index.vue       1ページ構成のセクション並び
  components/           セクションごとのコンポーネント
  composables/          テーマ、スクロール表示、フォーカストラップなど
  assets/css/main.css   デザイントークンと共通スタイル
```

## 開発

```bash
npm install
```

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバー（http://localhost:3000） |
| `npm run generate` | 静的サイトを `.output/public` に生成 |
| `npm run preview` | 生成物をローカルで確認 |
| `npm run typecheck` | 型チェック |

push する前に `npm run generate && npm run preview` で生成物を確認する。
描画をブロックする資産の扱いや `content-visibility` の挙動は、開発サーバーでは再現しない。

## デプロイ

`main` への push で `.github/workflows/deploy.yml` が動き、`nuxt generate` の結果を
GitHub Pages に公開する。リポジトリの **Settings → Pages → Source** は
**GitHub Actions** にしておく（"Deploy from a branch" ではない）。
