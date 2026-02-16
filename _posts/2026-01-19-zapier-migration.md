---
layout: post
title: "Automation Workflow Migration (Zapier → Native)"
---

## What I Did

全てのアクティブなZapier自動化を分類・ドキュメント化し、ネイティブシステム機能への移行を計画。Zapクイックリファレンステーブルを作成し、Slack Workflowの動作を分析、移行の複雑度を特定した。シンプルな通知系Zapは即時移行可能と判定、複雑なもの（Googleフォームデータ処理、PDF操作）はより多くの工数が必要と判断。並行運用戦略を含む移行計画ドキュメントを作成。Claude for Chromeを使用して初期分析ドキュメントを生成した。

## Classification

- **Simple（即時移行可能）**: 通知系Zap（例：Slackへのドロップイン通知）
- **Medium**: Slack Workflow連携
- **Complex**: Googleフォームデータ処理、PDF操作
- **Strategy**: ゼロダウンタイム確保のための移行期間中の並行運用

## Technologies

Zapier, Slack Workflows, Google Forms, Claude for Chrome
