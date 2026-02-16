---
layout: post
title: "Spreadsheet-to-Web Migration — 13 UI Patterns"
---

## What I Did

スプレッドシートベースのワークフローからWebアプリケーションへの移行を主導。既存のWeb画面が運用に採用されなかった理由を分析し、データ不整合とUXの問題を特定。その後、最適なデザインを見つけるため13種類のUIプロトタイプパターン（カードビュー、ダッシュボード、タイムライン、カレンダー、2ペイン、展開型ミニマル、マスターリストなど）を構築。フロントエンド・バックエンド統合を実施し、DBカラムとAPIを追加、データ管理用の編集ダイアログを構築した。

## Architecture

- **Frontend**: Nuxt.jsで13種類のUIパターンプロトタイプ
- **Backend**: 新規DBカラム付きAPI開発
- **Dev Environment**: Docker、WSL、TablePlus（DBクライアント）
- **Design Approach**: ワークフロー横断で再利用可能な患者中心リスト設計
- **Features**: SOAPコピーボタン、ロールベースアクセス制御（管理者 vs. 薬剤師）

## Technologies

Nuxt.js, Docker, WSL, TablePlus, REST APIs, Claude AI (code generation)
