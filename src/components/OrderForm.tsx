"use client";

import { useActionState } from "react";
import Link from "next/link";
import { processOrder } from "@/lib/orderActions";
import { CartItem } from "@/types/cart";

interface OrderFormProps {
  cartItems: CartItem[];
  onOrderSuccess: (orderId: string) => void;
}

/**
 * 注文フォームコンポーネント
 * useActionStateを使用してサーバーアクションの状態を管理します
 *
 * @param cartItems - カート内の商品リスト
 * @param onOrderSuccess - 注文成功時のコールバック
 */
export function OrderForm({ cartItems, onOrderSuccess }: OrderFormProps) {
  // サーバーアクションとその状態を管理
  const [state, formAction, isPending] = useActionState(
    async (prevState: unknown, formData: FormData) => {
      const result = await processOrder(formData, cartItems);

      // 成功した場合、フォームをリセットして成功コールバックを実行
      if (result.success) {
        onOrderSuccess(result.orderId);
      }
      return result;
    },
    undefined
  );

  // カートの合計金額を計算
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">注文情報入力</h2>

      {/* カートが空の場合のメッセージ */}
      {(!cartItems || cartItems.length === 0) && (
        <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded">
          カートが空です。商品を追加してから注文してください。
        </div>
      )}

      {/* フォームエラーメッセージ表示 */}
      {state && !state.success && state.error && (
        <div className="mb-4 p-3 bg-red-100 text-red-800 rounded">
          {state.error}
        </div>
      )}

      {/* 注文フォーム */}
      <form action={formAction} className="space-y-4">
        {/* 氏名入力フィールド */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            氏名 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state?.fieldErrors?.name && (
            <p className="mt-1 text-sm text-red-600">
              {state.fieldErrors.name[0]}
            </p>
          )}
        </div>

        {/* メールアドレス入力フィールド */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            メールアドレス <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {state?.fieldErrors?.email && (
            <p className="mt-1 text-sm text-red-600">
              {state.fieldErrors.email[0]}
            </p>
          )}
        </div>

        {/* 注文内容の表示 */}
        <div className="mt-8">
          <h3 className="text-lg font-medium mb-2">注文内容</h3>
          <div className="border-t border-b py-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between py-1">
                <div>
                  <span>{item.title}</span>
                  <span className="text-gray-500 ml-1">× {item.quantity}</span>
                </div>
                <span>¥{(item.price * item.quantity).toFixed(0)}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-between font-bold mt-2">
            <span>合計</span>
            <span>¥{total.toFixed(0)}</span>
          </div>
        </div>

        {/* 操作ボタン */}
        <div className="flex gap-4 mt-6">
          <Link
            href="/"
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-center">
            キャンセル
          </Link>
          <button
            type="submit"
            disabled={cartItems.length === 0 || isPending}
            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed">
            注文確定
          </button>
        </div>
      </form>
    </div>
  );
}
