---
layout: post
title: "Spreadsheet-to-Web Migration — 13 UI Patterns"
---

## What I Did

スプレッドシートベースのワークフローからWebアプリケーションへの移行を主導。既存のWeb画面が運用に採用されなかった理由を分析し、データ不整合とUXの問題を特定。その後、最適なデザインを見つけるため複数のUIプロトタイプパターン（カードビュー、ダッシュボードなど）を構築。フロントエンド・バックエンド統合を実施し、DBカラムとAPIを追加、データ管理用の編集ダイアログを構築した。

## Architecture

- **Frontend**: Nuxt.jsで複数のUIパターンプロトタイプ
- **Backend**: 新規DBカラム付きAPI開発
- **Dev Environment**: Docker、WSL、TablePlus（DBクライアント）
- **Design Approach**: ワークフロー横断で再利用可能な多角的視点のリスト設計
- **Features**: SOAP、ロールベースアクセス制御

## Technologies

Nuxt.js, Docker, WSL, TablePlus, REST APIs, Claude AI (code generation)
