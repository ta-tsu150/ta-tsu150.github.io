---
layout: post
title: "Backend API Refactoring with DDD"
---

## What I Did

バックエンドAPIを単純な直線的ワークフローから6ステータスの多段階処理システムに再設計。新規API 3本を作成、既存API 9本を修正、レガシーAPI 4本を削除。`prisma.$transaction`から`ITransactionManager.runInTransaction`パターンへの移行でトランザクション管理を統一。配列型チェックガードによる型安全性の向上とリポジトリメソッド名の明確化も実施した。

## What I Changed

- **新規API 3本**: 適切な状態遷移を持つ多段階処理エンドポイント
- **修正API 9本**: トランザクション管理と型安全性の改善
- **削除API 4本**: 認証システム移行に伴うレガシー認証エンドポイントの削除
- **Transaction Pattern**: `ITransactionManager.runInTransaction`への一貫性のある移行
- **Naming**: リポジトリメソッドの明確化（例：`findById` → `findByDarumaId` / `findByKiganId`）
- **Testing**: 変更した全usecaseの新規・更新ユニットテスト

## Technologies

TypeScript, Prisma ORM, DDD (Domain Entities, UseCases, Repositories), GitHub Actions
