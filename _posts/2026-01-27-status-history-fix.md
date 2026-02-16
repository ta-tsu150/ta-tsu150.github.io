---
layout: post
title: "Status History Tracking & Data Integrity Fix"
---

## What I Did

API経由のステータス変更が実際の操作者ではなく「システム」変更として誤記録されるデータ整合性バグを特定・修正。これにより、人為的ミスとシステムエラーの区別が不可能になっていた。DBマイグレーションでステータス履歴テーブルに`operator_id`カラムを追加し、ステータス変更ロジックを修正。2つのリストビュー間でモーダルUIを統一し、アコーディオン型の履歴ビューアを構築した。

## Problem

ステータス変更履歴に**誰が**変更したかが記録されていなかった。API経由の変更は全て「システム」として記録され、運用エラーの原因分析が不可能な状態だった。

## What I Changed

- **DB Migration**: `appointment_status_history`テーブルに`operator_id`カラムを追加
- **Backend**: 変更元（システム vs. 人間の操作者）を記録するようステータス変更ロジックを修正
- **Frontend**: 予約リストとリアルタイムリスト間でモーダルUIを統一、アコーディオン型ステータス履歴ビューアを構築
- **Code Quality**: `any`型の削除、コードレビューに基づくID取得パターンの更新

## Technologies

TypeScript, Database Migration, Vue.js / Nuxt.js, Git
