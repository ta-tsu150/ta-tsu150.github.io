---
layout: post
title: "AWS Cognito Authentication System"
---

## What I Did

AWS CognitoのHosted UIとOAuth 2.0 Authorization Code Grantを使用した認証システムを構築。Cognitoイベントをトリガーとするλ関数（Node.js）を作成し、RDS Proxy経由でPostgreSQLに認証データを同期。AWSインフラ全体を構成：Secrets Manager、RDS Proxyターゲットグループ、Security Groups、IAMロール、Lambda Layers、VPC設定。

## Problem

Lambda-RDS間の接続が約2週間失敗し続けた。原因：PythonのPostgreSQLライブラリがLambdaランタイムで互換性の問題を抱えていた。Node.jsへの切り替えで解決。

## Architecture

- **Auth**: AWS Cognito（Hosted UI + OAuth 2.0 Authorization Code Grant）
- **Backend**: AWS Lambda (Node.js) → RDS Proxy → PostgreSQL
- **Security**: Secrets Manager、IAMロール（`AWSLambdaBasicExecutionRole`、`AWSLambdaVPCAccessExecutionRole`）、VPC + Security Groups
- **Dual Auth Mode**: 開発環境はモック認証、本番はCognito（`NUXT_PUBLIC_AUTH_MODE`環境変数で制御）

## Technologies

AWS Cognito, Lambda (Node.js), RDS Proxy, PostgreSQL, Secrets Manager, IAM, VPC, pgAdmin4
