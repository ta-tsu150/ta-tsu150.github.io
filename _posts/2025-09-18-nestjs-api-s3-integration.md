---
layout: post
title: "NestJS Backend API & S3 Integration"
---

## What I Did

NestJS + Prisma ORMを使用して、Web管理画面向けの複数REST APIを開発。時間制限付き署名URL（1時間有効期限）によるS3画像管理を実装。一覧表示、CRUD操作、画像アップロード（S3 + DBを単一トランザクションで処理）、多段階処理ワークフローのAPIを構築した。

## Architecture

- **Backend**: NestJS + Prisma ORM、PostgreSQL
- **Storage**: AWS S3、署名URL生成（ControllerからUseCase層に移動）
- **API Docs**: Swagger/OpenAPIによるテスト・ドキュメント
- **Design**: Clean Architecture — 署名URL生成はUseCase層で実行（Controllerではなく）
- **Idempotency**: S3操作にべき等キーの必要性を特定（S3はネイティブトランザクション非対応）

## APIs Built

- リソース一覧・詳細エンドポイント
- S3アップロード付き画像テンプレートCRUD
- 多段階処理エンドポイント（準備 → 実行）
- ダッシュボード集計クエリ

## Technologies

NestJS, Prisma ORM, PostgreSQL, AWS S3, Swagger/OpenAPI, TypeScript
