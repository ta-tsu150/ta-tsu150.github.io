---
layout: post
title: "Cloud Architecture Design — Document Sharing System"
---

## What I Did

Azure上にクラウドベースのドキュメント共有システムの全体アーキテクチャを設計。ネットワーク、セキュリティ、アプリケーション層、認証、データストレージ、検索、運用を網羅する包括的なアーキテクチャを構築した。

## Architecture

- **Networking / Security**: Azure CDN、Application Gateway + WAF、Virtual Network & NSGs、Private Endpoints
- **Application Layer**: Azure App Service (Web App)、Azure Functions (API App)
- **Authentication**: Azure Active Directory (Entra ID)、MFA対応、B2Bサポート
- **Data Storage**: Azure Blob Storage（バージョニング、SSE暗号化）、Azure SQL Database（TDE）
- **Search**: Azure Cognitive Search（ドキュメントの全文インデックス）
- **Operations**: Azure Monitor、Azure Backup、Azure Key Vault

## Technologies

Azure CDN, Application Gateway, WAF, Azure Functions, Entra ID, Blob Storage, SQL Database, Cognitive Search, Key Vault, KQL
