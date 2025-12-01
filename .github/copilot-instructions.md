# AI Coding Instructions

## 概要

このプロジェクトは Next.js 16 App Router を使用した E コマース製品一覧アプリです。Fake Store API から製品データを取得し、React Context によるカート管理、Zod バリデーション、Server Actions を活用しています。

## アーキテクチャの要点

### データフロー

1. **ProductList** (Server Component) → Fake Store API 呼び出し → **FilterableProductList** (Client Component)
2. **CartContext** が全アプリケーションでカート状態を管理（`addToCart`, `clearCart`, `total` を提供）
3. **OrderForm** → Server Actions (**processOrder**) → 疑似注文処理 → 成功時に `clearCart` 実行

### 主要パターン

```tsx
// Server Component での API 呼び出し
export async function ProductList() {
  const res = await fetch("https://fakestoreapi.com/products");
  const products: Products[] = await res.json();
  // ... Client Component へデータ渡し
}

// Context + useCallback パターン
const addToCart = useCallback((product: Products) => {
  setItems((prevItems) => {
    const existingItem = prevItems.find((item) => item.id === product.id);
    // ... 既存商品は数量増加、新規は追加
  });
}, []);
```

## 開発ワークフロー

### 重要なコマンド

- `pnpm dev --turbopack`: Turbopack で高速開発サーバー起動
- `pnpm build`: 本番ビルド

### 必須の依存関係管理

- **Dependabot** 設定済み:
- **pnpm**: パッケージマネージャー（npm ではない）

## プロジェクト固有の規約

### 型定義の拡張パターン

```typescript
// products.ts で基本型、cart.ts で拡張
export interface CartItem extends Products {
  quantity: number; // 既存の Products 型に数量を追加
}
```

### Context 使用のベストプラクティス

- `useCart()` フックは必ず `CartProvider` 内で使用
- エラーハンドリング: `throw new Error("useCart must be used within a CartProvider")`
- Context の値は `useCallback` で最適化

### Server Actions パターン

```typescript
"use server";
export async function processOrder(formData: FormData, cartItems: CartItem[]) {
  // 1. カートの空チェック
  // 2. Zod バリデーション
  // 3. 疑似処理（実際の DB 連携なし）
  // 4. 構造化されたレスポンス（success/error/fieldErrors）
}
```

#### useActionState パターン

OrderForm では React 19 の `useActionState` フックを使用して Server Action の状態を管理：

```tsx
const [state, formAction, isPending] = useActionState(
  submitAction,
  initialState
);
// state.fieldErrors でフィールドごとのバリデーションエラーを表示
```

### コンポーネント構造

- **Server Components**: データ取得（ProductList）
- **Client Components**: インタラクション（FilterableProductList, OrderForm）
- 日本語コメントが標準（JSDoc 形式）

#### ProductCard の UI 機能

- **説明文短縮/展開**: 100 文字で短縮し、「続きを読む」ボタンで展開（`isExpanded` state 管理）
- **カート追加アニメーション**: クリック時に 0.7 秒間ボタンが緑色に変わり「追加しました ✓」表示

#### FilterableProductList のフィルタリング UI

- `<select>` 要素でカテゴリー選択
- 「すべてのカテゴリー」オプション付き

#### OrderForm の UI 機能

- バリデーションエラー: `fieldErrors` で各フィールド下に表示
- 「キャンセル」ボタン: ホームページへのリンク

### スタイリング

- Tailwind CSS 4 使用
- レスポンシブデザイン重視
- 統一されたクラス命名: `border p-2 rounded-sm`

## 外部統合

### API エンドポイント

- **Fake Store API**: `https://fakestoreapi.com/products`
- レスポンス型: `Products[]` (types/products.ts)
- エラーハンドリング: `!res.ok` チェックで例外スロー

### 重要な制限

- バックエンド実装なし（注文は疑似処理）
- 認証機能なし
- 決済機能なし（フォーム送信のみ）

## デバッグとトラブルシューティング

### よくある問題

1. **Context エラー**: Provider の配置を確認（layout.tsx で全体をラップ）
2. **Hydration エラー**: Client/Server Component の境界を意識
3. **型エラー**: Products と CartItem の使い分けに注意

### デバッグポイント

- Server Actions は `console.log` でサーバーサイドログを確認
- Context の状態変化は React DevTools で追跡
- API エラーは Network タブと Error Boundary で確認
