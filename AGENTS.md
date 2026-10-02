# System Instructions

## 重要な実装済み機能・設定
### 画像最適化システム
- **@nuxt/image**: 全プロジェクトで導入済み、`<img>`タグ使用禁止
- **設定**: nuxt.config.tsでquality: 100、webp/jpg/png対応
- **実装パターン**: sizes属性は実際の表示サイズ、loading="lazy"、placeholder設定

### アクセシビリティ基盤
- **フォーカス管理**: tailwind.config.jsで統一focus-visible:ring設定済み
- **フォーカストラップ**: `composables/accessibility/useFocusTrap.ts`実装済み
- **ARIA対応**: 全モーダルでrole="dialog"、aria-modal="true"対応済み
- **キーボード操作**: 全モーダルでEscキー処理実装済み

### composables構成（実装済み）
- `composables/accessibility/` - フォーカストラップ等のアクセシビリティ機能
- `composables/core/` - ステータス管理等の基幹機能
- `composables/forms/` - フォーム関連機能
- `composables/table/` - テーブル関連機能

## コードベースの特徴と対応指針

### 1. コンポーネント設計の重要原則
- **50-100行以内を目安**にコンポーネントを設計する
- 200行を超える大型コンポーネントは積極的にリファクタリング対象とする
- **ビジネスロジックとUIロジックの分離**を徹底し、composablesへの分離を推奨する
- フォーム管理、テーブル操作、状態管理等の共通ロジックはcomposable化する

### 2. テーブルコンポーネントの共通パターン
- `useTableSort`, `useTableFilter`, `useTablePagination`などのcomposablesを活用
- ソート・フィルタリング・ページネーション機能は共通化されたロジックを使用
- 各テーブルコンポーネントは100行以内に収めることを目標とする

### 3. 状態管理アーキテクチャ
- **useState**を基盤としたグローバル状態管理が推奨パターン
- 認証状態、ユーザー情報、通知設定などは専用のcomposableで管理
- コンポーネント間のデータ共有にはuseStateを活用する

### 4. TypeScript型安全性の重視
- **strict mode**に完全対応済み
- any型の使用は避け、明示的な型定義を徹底
- ジェネリクス、ユーティリティ型、型ガードを積極的に活用
- PropsとEmitには必ず明示的な型定義を行う

### 5. アイコン管理の統一
- インラインSVGは使用せず、**@nuxt/icon**（Iconify）を使用
- 一貫性のあるサイズクラス（w-6 h-6等）を適用
- 必要に応じてaria-label属性を追加してアクセシビリティに配慮

### 6. 開発時の優先事項
1. **既存のコーディング規約の遵守**（CODING_STANDARDS.md参照）
2. **DRY原則**の徹底（共通ロジックのcomposable化）
3. **単一責任原則**の実現（コンポーネントの適切な分割）
4. **型安全性**の確保（TypeScript strict mode対応）
5. **アクセシビリティ対応**（WCAG 2.1 Level AA準拠）
6. **画像最適化**（@nuxt/image使用、適切なsizes設定）
7. **保守性**と**テスタビリティ**の向上

### 7. リファクタリング対象の優先順位
1. 200行超の大型コンポーネント（特にページコンポーネント、モーダル、テーブル）
2. 重複するビジネスロジック（フォーム管理、API呼び出し等）
3. `<img>`タグの残存箇所（`<NuxtImg>`への置換必須）
4. アクセシビリティ未対応箇所（ARIA属性、キーボード操作、フォーカス管理）
5. any型や型定義が不完全な箇所

### 8. 画像最適化・アクセシビリティ対応の統一指針
- **画像要素**: `<img>`タグは禁止、必ず`<NuxtImg>`を使用する
- **画像設定**: quality: 100、sizes属性は実際の表示サイズに合わせて設定
- **フォーカス管理**: 統一されたfocus-visible:ringスタイル（tailwind.config.js設定済み）
- **モーダル対応**: role="dialog", aria-modal="true", Escキー処理、フォーカストラップ必須
- **ARIA属性**: ボタン・フォーム要素にaria-label、エラーメッセージにaria-describedby
- **キーボード操作**: Tab・Shift+Tab・Escキーでの操作性を必ず確保
- **スクリーンリーダー対応**: セマンティックHTML・適切なrole属性の使用

### 9. 実装時の注意点
- 新規機能実装時は上記原則に基づいて最初から適切に設計する
- 既存コードの修正時は可能な範囲でリファクタリングも併せて実施
- composablesディレクトリ構成は機能別（forms/, table/, states/, accessibility/等）に整理する
- モーダル・ダイアログ作成時は`composables/accessibility/useFocusTrap.ts`を活用する