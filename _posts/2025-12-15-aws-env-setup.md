---
layout: post
title: "AWS環境のリソース差分整備（S3 / CloudFront / Secrets Manager）"
---

Dev・Staging・Production間でAWSリソースの差分を洗い出し、Staging環境を本番相当に整備した。

## やったこと

- **S3**: Staging環境に不足していたバケットを3つ作成
- **CloudFront**: ランディングページ用のディストリビューションを作成
- **Secrets Manager**: Dev/Prodとの差分をStgに反映
- 利用規約・プライバシーポリシーのサポートページをS3 + CloudFrontで各環境にデプロイ

## 学び

- マルチ環境運用では「Devにはあるが、Stgにはない」リソースが意外と多い
- 環境別のサインインIDやポート番号の違いなど、ドキュメントに書いてあっても見落としがち
- SSMコマンドでのDB接続時、環境ごとにポート番号が異なるケースがあり要注意
