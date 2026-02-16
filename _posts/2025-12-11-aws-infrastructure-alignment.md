---
layout: post
title: "AWS Infrastructure Environment Alignment"
---

## What I Did

Dev・Staging・Production間のAWSインフラストラクチャの環境差異を解消。Stagingに不足していたS3バケットを作成し、静的ページ用のCloudFrontディストリビューションを設定。環境間でSecrets Managerのエントリを同期。また、アプリストア審査用の静的HTMLページ（利用規約、プライバシーポリシー）を構築し、S3/CloudFrontにデプロイした。

## What I Changed

- **S3**: Staging環境に不足していた3つのバケットを作成
- **CloudFront**: 全環境のランディングページ用ディストリビューションを設定
- **Secrets Manager**: 環境間でシークレットエントリを同期
- **Static Pages**: アプリストアコンプライアンス用の法的ページ（利用規約、プライバシーポリシー）を構築・デプロイ

## Technologies

AWS S3, CloudFront, Secrets Manager, HTML/CSS, App Store / Google Play deployment requirements
