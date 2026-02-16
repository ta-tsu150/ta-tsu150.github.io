---
layout: post
title: "Large-Scale Frontend Refactoring (~2000 Lines)"
---

## What I Did

Vue.js/Nuxtコードベース約2000行にわたる大規模リファクタリングを実施。ブラウザDevToolsの「Initiator」トレースを使用して冗長なAPIコールを特定・排除。密結合のコンポーネントを分離し、エラーハンドリングを共通composable（`useAppError.ts`）に集約。不要なUI要素の削除と、絶対値ベースのソートロジック修正も行った。

## What I Changed

- **API Deduplication**: DevTools Networkタブで過剰なAPIコールをトレース・削除
- **Separation of Concerns**: 密結合のフロントエンドコンポーネントを分離
- **Error Handling**: `composables/useAppError.ts`にエラー状態を集約し、各コンポーネントの`watch`ベース監視を置換
- **Sort Fix**: 支出額ソートを絶対値ベースに修正
- **Conflict Resolution**: 新ブランチへのコミットリプレイによるGitマージコンフリクトの解消

## Technologies

Vue.js, Nuxt, TypeScript, Browser DevTools, Git (rebase, conflict resolution)
