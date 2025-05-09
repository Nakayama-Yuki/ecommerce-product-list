"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { OrderForm } from "@/components/OrderForm";
import { OrderCompletion } from "@/components/OrderCompletion";

/**
 * 注文ページコンポーネント
 * カートコンテキストから情報を読み込み、注文フローを管理します
 */
export default function OrderPage() {
  const { items: cartItems, clearCart } = useCart();
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const router = useRouter();

  // 注文成功時の処理
  const handleOrderSuccess = (newOrderId: string) => {
    setOrderId(newOrderId);
    setOrderCompleted(true);
    // カート情報をクリア
    clearCart();
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">注文ページ</h1>

      {orderCompleted ? (
        // 注文完了画面
        <OrderCompletion orderId={orderId} />
      ) : (
        // 注文フォーム
        <OrderForm cartItems={cartItems} onOrderSuccess={handleOrderSuccess} />
      )}
    </main>
  );
}
