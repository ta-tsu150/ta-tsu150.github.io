---
layout: post
title: "TDD & Unit Testing with .NET"
---

## What I Did

.NETバックエンドプロジェクトにユニットテストとテスト駆動開発（TDD）を導入。MoqとFluentAssertionsでテストフレームワークを構築し、Red-Green-Refactorサイクルを実践。リファクタリングステップでは、重複するDTO-Entity変換ロジックを共通ヘルパーメソッドに抽出。全コントローラ・サービス・リポジトリにXMLコメントを付与し、Swagger/OpenAPIドキュメントを整備した。

## Architecture

- **Testing**: Moq（モック）+ FluentAssertions（アサーションライブラリ）
- **Methodology**: TDD Red-Green-Refactorサイクル、フェーズごとのコミット戦略
- **Documentation**: Swagger/OpenAPI + XMLコメント、`<inheritdoc/>`サポート
- **Deployment**: Azure App Service、環境別CORSポリシー

## Technologies

C#, .NET, Moq, FluentAssertions, Swagger/OpenAPI, Azure App Service
