# AI Coding Instructions

## 概要

Next.js 16 App Router + React 19 の E コマース製品一覧アプリ。Fake Store API → React Context カート管理 → Server Actions 注文処理の構成。

## アーキテクチャ

```
ProductList (Server) → fetch API → FilterableProductList (Client) → ProductCard
                                          ↓
                                    CartContext (useCart)
                                          ↓
                        OrderPage → OrderForm → processOrder (Server Action)
                                          ↓
                                   OrderCompletion
```

### Server/Client Component の境界

- **Server**: `ProductList.tsx` - API 呼び出しとデータ取得
- **Client**: `FilterableProductList`, `ProductCard`, `OrderForm`, `OrderPage` - 状態管理とインタラクション
- `layout.tsx` で `CartProvider` が全体をラップ

## 開発コマンド

```bash
pnpm dev          # 開発サーバー（Turbopack 対応）
pnpm build        # 本番ビルド
pnpm lint         # ESLint
```

**重要**: npm ではなく **pnpm** を使用

## 主要パターン

### 型定義の継承

```typescript
// types/products.ts - 基本型
export interface Products {
  id;
  title;
  price;
  description;
  category;
  image;
  rating;
}

// types/cart.ts - 拡張型
export interface CartItem extends Products {
  quantity: number;
}
```

### Context パターン (`contexts/CartContext.tsx`)

```tsx
// useCart() は必ず CartProvider 内で使用
const { items, addToCart, clearCart, total } = useCart();
// Provider 外で使用すると throw new Error
```

### Server Actions + useActionState (`lib/orderActions.ts`, `OrderForm.tsx`)

```tsx
// OrderForm.tsx - React 19 の useActionState
const [state, formAction, isPending] = useActionState(async (prev, formData) => {
  const result = await processOrder(formData, cartItems);
  if (result.success) onOrderSuccess(result.orderId);
  return result;
}, undefined);

// processOrder の戻り値構造
{ success: boolean, error?: string, fieldErrors?: Record<string, string[]>, orderId?: string }
```

### Zod バリデーション (`schemas/orderSchema.ts`)

```typescript
orderSchema.safeParse(data) → { success, data, error.flatten().fieldErrors }
```

## コンポーネント固有の実装

| コンポーネント          | 特徴                                                     |
| ----------------------- | -------------------------------------------------------- |
| `ProductCard`           | 説明文 100 文字で短縮、カート追加時 0.7 秒アニメーション |
| `FilterableProductList` | `<select>` でカテゴリーフィルタ、カート表示              |
| `OrderForm`             | `fieldErrors` でフィールド別エラー表示                   |
| `error.tsx`             | Error Boundary、`reset()` でリトライ                     |

## 外部依存

- **Fake Store API**: `https://fakestoreapi.com/products`
- **next.config.mjs**: `images.remotePatterns` に fakestoreapi.com を設定済み

## 制限事項

- バックエンド未実装（注文は `console.log` のみ）
- 認証・決済機能なし

## コーディング規約

- 日本語 JSDoc コメント
- Tailwind CSS 4（`border p-2 rounded-sm` 形式）
- `@/` パスエイリアス使用
