---
layout: post
title: "Logging System & AI-Powered Code Review"
---

## What I Did

Webアプリケーション全体にわたる包括的なロギングシステムを実装し、進捗管理スプレッドシートに対して約99%のカバレッジを達成。残りはSQS依存のログで、依存関係によりマージ不可だった。全プルリクエストにClaude AIとOpenAI Codexを使用した3層AIコードレビュープロセスを導入し、チーム全体のコード品質を向上させた。

## Architecture

- **Logging**: 全機能にわたるアプリケーション全体のロギング実装
- **Queue**: AWS SQSによる非同期ログ処理
- **Code Review**: 3層自動レビュー（Claude AI + OpenAI Codex + 手動）
- **Tracking**: ToDoスプレッドシートによる進捗管理（達成率約99%）

## Technologies

AWS SQS, Claude AI, OpenAI Codex, Git/GitHub (PR workflow)
