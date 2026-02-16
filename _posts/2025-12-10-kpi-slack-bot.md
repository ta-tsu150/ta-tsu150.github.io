---
layout: post
title: "KPI Slack Bot with AWS Lambda"
---

## What I Did

AWS Lambda上で動作するSlack Botを設計・実装し、プロジェクトチャンネルにKPIレポートを自動投稿。日次売上指標と週次AWSコストレポートを配信。開発環境でプロトタイプを構築し、複数環境にデプロイした。

## Architecture

- **Runtime**: AWS Lambda（サーバーレス関数）
- **Notification**: Slack Webhook連携によるチャンネル投稿
- **Reports**: 日次売上指標 + 週次AWSコストサマリー
- **Environments**: Dev / Staging / Productionへのデプロイ

## Technologies

AWS Lambda, Slack API (Webhooks), KPI Reporting
