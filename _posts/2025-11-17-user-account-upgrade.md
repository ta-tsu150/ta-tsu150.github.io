---
layout: post
title: "User Account Upgrade Feature (Guest → Registered)"
---

## What I Did

ゲストユーザーを正規アカウントにアップグレードするための完全なUIフローを設計・実装。OTP（ワンタイムパスワード）入力付きメール認証画面、パスワード作成モーダル、セキュアなログインフロールーティングを構築。AWS Cognitoを使用したコード確認とパスワード更新のバックエンドAPIと統合した。

## Architecture

- **Auth Flow**: ゲスト → メール認証（OTP）→ パスワード作成 → 正規ユーザー
- **Backend APIs**: `confirm-code`（メールにOTP送信）、`update-cognito-password`（OTP + 新パスワード受付）
- **Frontend**: メール入力、OTP認証、パスワード作成のマルチステップモーダルフロー
- **Security**: アカウントアップグレード機能付きAWS Cognitoユーザープール

## Technologies

AWS Cognito, REST APIs, Vue.js / Nuxt.js, OTP Email Verification
