---
layout: post
title: "Import Batch QA with AWS Step Functions"
---

## What I Did

AWS Step Functionsで構築されたデータインポートバッチシステムの品質保証テストを実施。テスト仕様書を作成し、テスト実行環境を構築、単体・結合・シナリオテストを実行。重大なバリデーション欠陥を発見：Step FunctionsワークフローのPartitionerとFinalizerステップの間でLambda関数が呼び出されていなかったため、データフィールドの無効値やnull値がエラーなく受け入れられていた。

## Issues Found

- **Validation Defect**: フィールドの無効値/null値（例：`bloodRh`）がサイレントに受け入れられた
- **Root Cause**: PartitionerとFinalizerステップの間で`data_sender` Lambdaが実行されていなかった — データ問題にもかかわらずMap stateが「成功」で完了
- **Diagnosis**: CloudWatchログストリーム分析でLambdaが呼び出されていないことを確認

## Architecture

- **Orchestration**: AWS Step Functions（Partitioner → Map → Finalizerパターン）
- **Processing**: データバリデーション・送信用AWS Lambda関数
- **Storage**: バッチデータファイル用AWS S3
- **Testing**: 単体テスト（ローカル）+ 結合テスト（デプロイ済みインフラ）+ シナリオテスト
- **Security**: テストブランチでの`git-secret --scan`問題を解決

## Technologies

AWS Step Functions, Lambda, S3, CloudWatch, Git (git-secret)
