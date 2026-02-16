---
layout: post
title: "Integration Test Case Design with AI"
---

## What I Did

CS引継ぎ確認画面の結合テストケースを設計。既存のテストスプレッドシートをClaude AIに入力してテストケースのドラフトを生成し、配送ワークフローのテストケースをパイロットとして詳細に作成。テスト中にID表示エラー、検索UXの問題、フィルタリングの不整合、データ整合性の問題を含む6件のバグを発見した。

## Issues Found

- 問い合わせ完了モーダルで誤ったIDフィールドを表示（`prescription_id`ではなく`medical_id`が正しい）
- 電話番号検索UIに番号表示がなく、検索がハイフンに敏感
- 部分完了がフィルタで「全完了」と誤表示
- メッセージ履歴の日付が非表示
- 特定の操作後に配送CSV画面からデータが消失
- 保険確認ボタンが入力済みの値をクリア

## Technologies

Claude AI (test case generation), Manual Testing, Fincode (payment testing)
