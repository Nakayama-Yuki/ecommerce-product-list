# EC オンラインショップ - 製品一覧アプリケーション

このプロジェクトは、Next.js App Router を使用した E コマースの製品一覧表示とショッピングカート機能を備えたウェブアプリケーションです。ユーザーは製品をブラウズし、カートに追加し、注文プロセスを完了することができます。
注意点として、注文プロセスについてはバックエンドは実装していないので、疑似的な挙動をします。

## 機能

- **製品一覧表示**: カテゴリー別フィルタリング機能付き
- **製品詳細**: 製品の詳細情報と画像の表示
- **ショッピングカート**: 製品の追加と数量管理
- **注文プロセス**: ユーザー情報入力と注文完了フロー
- **レスポンシブデザイン**: モバイルからデスクトップまで対応

## 技術スタック

- **フロントエンド**:
  - Next.js 15 (App Router)
  - React 19
  - TypeScript 5
  - Tailwind CSS 4
- **状態管理**:
  - React Context API (カート管理)
- **API 連携**:
  - Fake Store API (製品データ取得)
- **バリデーション**:
  - Zod (フォームバリデーション)

## 開始方法

### 必要条件

- Node.js (LTS 版)
- pnpm

### インストール

```bash
# リポジトリのクローン
git clone <repository-url>
cd ecProductList

# 依存関係のインストール
pnpm install
```

### 開発サーバーの起動

```bash
pnpm dev
```

アプリケーションは http://localhost:3000 で実行されます。

### ビルドと本番環境での実行

```bash
# ビルド
pnpm build

# 本番環境での実行
pnpm start
```

## プロジェクト構造

```
src/
├── app/               # App Routerページ
│   ├── page.tsx       # ホームページ
│   └── order/         # 注文ページ
├── components/        # UIコンポーネント
│   ├── ProductList.tsx
│   ├── ProductCard.tsx
│   ├── FilterableProductList.tsx
│   ├── OrderForm.tsx
│   └── OrderCompletion.tsx
├── contexts/          # Reactコンテキスト
│   └── CartContext.tsx
├── lib/               # ユーティリティ関数
│   └── orderActions.ts
├── schemas/           # バリデーションスキーマ
│   └── orderSchema.ts
└── types/             # TypeScript型定義
    ├── products.ts
    └── cart.ts
```

## 主要コンポーネント

- **ProductList**: Fake Store API から製品データを取得
- **FilterableProductList**: カテゴリーフィルタリングとカート管理
- **ProductCard**: 個々の製品表示と「カートに追加」機能
- **CartContext**: アプリケーション全体でのカート状態管理
- **OrderForm**: ユーザー情報入力と注文処理
- **OrderCompletion**: 注文完了の確認画面

## データフロー

1. `ProductList`コンポーネントが API から製品データを取得
2. ユーザーが製品をカートに追加すると、`CartContext`が状態を更新
3. 注文プロセス中に`OrderForm`がユーザーデータを収集し、注文を作成
4. 注文完了後、`OrderCompletion`が確認画面を表示

## ライセンス

このプロジェクトは MIT ライセンスの下で公開されています。

## 謝辞

- 製品データ提供: [Fake Store API](https://fakestoreapi.com/)
