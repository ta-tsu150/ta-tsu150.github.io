---
layout: post
title: "Vue.js / Nuxt Frontend Development"
---

## What I Did

Vue.js/Nuxt + TypeScriptを使用して、Webアプリケーションのフィルタリング、ページネーション、更新機能を再実装。フリーテキスト検索とカテゴリ検索を分離してユーザビリティを向上させ、ページネーション矢印の位置ずれを修正。カラーコード付きUIチップを追加し、TypeScriptの`any`型禁止を含む厳格なESLintルールを適用した。

## Architecture

- **Framework**: Vue.js / Nuxt + TypeScript
- **Search**: デュアル検索システム — フリーテキスト（説明文）+ カテゴリフィルタ（タイトル）
- **Pagination**: `total-visible`と条件付きロジックによるカスタムページネーション
- **Code Quality**: ESLint strict mode（`no-console`、`no-return-assign`、`no-any`）、cspellによるスペルチェック

## Technologies

Vue.js, Nuxt, TypeScript, Vuetify, ESLint, cspell
