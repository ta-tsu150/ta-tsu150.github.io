---
layout: post
title: "Full-Stack Contact / Inquiry Feature"
---

## What I Did

問い合わせ機能をエンドツーエンドで設計・実装。設計フェーズではPowerPointモックアップとフロー図を作成し、自動メール応答（ユーザーへの確認メール + 管理者への通知メール）付きバックエンドAPIを構築。モバイルアプリフロントエンドとAPIを統合した。

## Architecture

- **Design**: PowerPointモックアップ → フロー図 → 実装
- **Backend**: REST API（問い合わせ送信用POSTエンドポイント）
- **Email**: 自動デュアルメールシステム（ユーザー確認 + 管理者通知）
- **Frontend**: フォーム送信・バリデーション付きモバイルアプリUI

## Technologies

Node.js, REST API, Email (SES/SMTP), React Native, Expo
