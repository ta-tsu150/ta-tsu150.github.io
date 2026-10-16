# AGENTS.md

個人ポートフォリオ（https://ta-tsu150.github.io/）のリポジトリ。Nuxt 4 の静的生成で、GitHub Pages に配信している。

## コマンド

| コマンド | 内容 |
| --- | --- |
| `npm run dev` | 開発サーバー（http://localhost:3000） |
| `npm run generate` | 静的サイトを `.output/public` に生成 |
| `npm run preview` | 生成物をローカルで確認 |
| `npm run typecheck` | 型チェック（vue-tsc） |
| `npm run lint` | ESLint（`@nuxt/eslint`）。`--fix` 版は `npm run lint:fix` |

`npm run dev` だけで判断しない。描画をブロックする資産の扱いや `content-visibility` の挙動は
生成物でしか再現しないので、push 前に `npm run generate && npm run preview` を通す。

CI（`.github/workflows/deploy.yml`）は型チェックと Lint をビルドの前に走らせる。
どちらかが落ちるとデプロイされない。

`app/pages/` のページは単一ルートにする（複数ルートだと Nuxt が遷移や属性の
引き継ぎを当てる先を失う）。ルート直下のコメントもルート要素として数えられる。

## 構成

- 表示内容はすべて `app/data/profile.ts`（型は `app/types/profile.ts`）にある。文言の修正はここで完結する
- Works を追加したら、`app/types/profile.ts` の `WorkId` union にも id を足す。これを忘れると型チェックで落ちる
- `skillTags[].works` には、本文を読んで根拠が分かる Works だけを入れる。根拠がなければ空配列にすると、チップがボタンではなくただの文字として表示される
- セクションの順番は `app/pages/index.vue`・`SECTION_IDS`・`navGroups` の3か所で揃える

## スタイル

- Tailwind や UI ライブラリは使っていない。素の CSS とスコープ付き `<style>` だけ
- 色はすべて `app/assets/css/main.css` のトークンから取る（ダークが基準、`:root[data-theme='light']` で上書き）。コンポーネントに色を直書きしない
- グローバル CSS は `app/app.vue` の `<style>` から `@import` する。HTML にインライン化させるためなので、`nuxt.config.ts` の `css:` に戻さない
- `-webkit-backdrop-filter` と `backdrop-filter` を並べるときは、必ず prefixed を先に書く。ミニファイアが2つを1つに畳んで後ろだけを残し、現行 Chrome は prefixed を解釈しないため、逆順だと指定ごと消える
- スクロール表示の状態は class ではなく `data-revealed` 属性で持つ（理由は `app/utils/reveal.ts`）

## 計測にもとづく指定（変更したら測り直す）

- `#timeline`・`#skills`・`#works` の `contain-intrinsic-size` は**実測値**。古いままだとスクロールバーの長さが狂い、ページ内リンクが手前に着地する
- 測り直しは 390px と 1280px の2つの幅で行い、`.section` の上下 padding を除いた**コンテンツボックスの高さ**を使う。手順は `main.css` の該当コメントにある
- Works のトピックを折りたたむなど高さが大きく変わる変更をしたら、必ず最後に測り直す

## TypeScript と状態

- strict モード。`any` は使わず、props と emit には明示的な型を書く
- Works の id のように、取り違えをビルド時に落とせるものは union 型にする
  （`skillTags[].works` が存在しない Works を指すと型チェックで落ちる）
- コンポーネントをまたぐ状態は `useState` で持つ（例：`app/composables/useTheme.ts`）

## アクセシビリティ

- フォーカス表示は `main.css` の `:focus-visible` で統一している
- ダイアログやドロワーは `app/composables/accessibility/useFocusTrap.ts` を使い、Esc で閉じられるようにする
- アニメーションは `prefers-reduced-motion` で止める
- JS が無効でも、また JS は動くがバンドルが届かなくても、本文が読める状態を保つ（後者は head のインラインスクリプトのタイマーで担保している）
- 印刷でも本文が消えないこと。`main.css` の `@media print` を壊さない

## 画像・アイコン

- 画像は `<NuxtImg>` を使い、`width`・`height`・`densities` を明示する。元画像は `public/images/` に置く
- `public/` はそのまま公開される。使わなくなったファイルは必ず消す
- アイコンは `@nuxt/icon` の `lucide:*` を使う。インライン SVG は書かない
- `image.quality` は 90。200×200 のアバターで 18.6KB→9.9KB になり、差は平均1.67/255・
  PSNR 41dB で、描画サイズでは見えない（実寸と4倍拡大で確認済み）。変えるなら同様に測る
- `public/` の元画像は配信されるので、表示に必要な寸法より大きく置かない。アバターは短辺600。
  ただし元画像を縮めると2段階リサンプルになり、配信される画像が平均2/255ほど動く
- ファビコン一式は `app/assets/favicon-source.png` から生成する。手順は隣の `favicon-source.md`

## 公開してよい情報

- 顧客名・製品名・社内システム名・実績値は書かない。業種とシステム種別までにする
- 勤務先のシステムについて、セキュリティ上の不備の具体像は書かない（会社の承認を得たものを除く）
- 下書きは `Docs/`（gitignore 済み）に置く

> 補足：現在の `works` にある評価機能の権限不備と監査ログの記述は、この規則より前に書いたもので、
> 会社確認が未了。確認が取れるまでは記述を増やさない。

## コンポーネントの大きさ

- 目安は script と template で合計100行以内。スコープ付き CSS は行数に数えない
