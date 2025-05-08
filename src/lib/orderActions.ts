"use server";

import { z } from "zod";
import { orderSchema } from "@/schemas/orderSchema";
import { CartItem } from "@/types/cart";

/**
 * 注文処理のサーバーアクション
 * フォームデータとカート内商品を受け取り、バリデーション後に注文処理を行います
 *
 * @param formData - フォームから送信されたデータ
 * @param cartItems - カート内の商品リスト
 * @returns 処理結果とエラーメッセージ（存在する場合）
 */
export async function processOrder(formData: FormData, cartItems: CartItem[]) {
  try {
    // カートが空の場合はエラー
    if (!cartItems || cartItems.length === 0) {
      return {
        success: false,
        error: "カートが空です。商品を追加してください。",
      };
    }

    // フォームデータをオブジェクトに変換
    const rawFormData = {
      name: formData.get("name"),
      email: formData.get("email"),
    };

    // Zodを使用したバリデーション
    const validatedFields = orderSchema.safeParse(rawFormData);

    // バリデーションエラーがある場合
    if (!validatedFields.success) {
      const fieldErrors = validatedFields.error.flatten().fieldErrors;
      return {
        success: false,
        error: "入力内容に誤りがあります",
        fieldErrors,
      };
    }

    // 注文情報の作成
    const orderData = {
      id: `ORD-${Date.now()}`,
      ...validatedFields.data,
      items: cartItems,
      total: cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      ),
      date: new Date().toISOString(),
    };

    // 実際のアプリケーションではここでDBに保存やAPI呼び出しを行う
    // このサンプルでは簡略化のため、注文データをそのまま返す
    console.log("注文を受け付けました:", orderData);

    // 処理成功
    return {
      success: true,
      orderId: orderData.id,
      orderData,
    };
  } catch (error) {
    console.error("注文処理エラー:", error);
    return {
      success: false,
      error: "注文処理中にエラーが発生しました。後でやり直してください。",
    };
  }
}
