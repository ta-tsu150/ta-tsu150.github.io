---
layout: post
title: "モバイルアプリのUX機能を設計・実装した"
---

Expo / React Native でモバイルアプリの主要UX機能を担当。

## やったこと

- ユーザーが直感的に操作できるインタラクティブ機能の設計と実装
- Splash画面の調整やモーダルUIの追加
- HostedUI（AWS Cognito）の多言語対応（i18n）
- ExpoGoでのテスト環境構築、TestFlight / XcodeでのiOSビルド対応
- アプリ内課金（IAP）の回避記述を整理し、チームに共有

## 学び

- Expoのビルド周りはOS依存のハマりポイントが多い。Xcodeのビルドエラーは原因不明のまま再インストールで直ることもある
- Cognitoの Managed Login は多言語対応の設定がコンソール側にあり、コードだけでは完結しない
