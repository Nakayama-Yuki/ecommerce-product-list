"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { CartItem } from "@/types/cart";
import { Products } from "@/types/products";

/**
 * カートコンテキストの型定義
 */
interface CartContextType {
  items: CartItem[];
  addToCart: (product: Products) => void;
  clearCart: () => void;
  total: number;
}

/**
 * カートコンテキストの作成
 * デフォルト値はnullだが、実際には必ずProviderで値が提供される
 */
const CartContext = createContext<CartContextType | null>(null);

/**
 * カートコンテキストを使用するためのカスタムフック
 * @returns CartContextTypeの値
 */
export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

/**
 * CartProviderのプロパティ型
 */
interface CartProviderProps {
  children: ReactNode;
}

/**
 * カートコンテキストのプロバイダーコンポーネント
 * アプリケーション全体でカート状態を共有する
 *
 * @param children - 子コンポーネント
 */
export function CartProvider({ children }: CartProviderProps) {
  const [items, setItems] = useState<CartItem[]>([]);

  /**
   * カートに商品を追加する関数
   * 既に存在する商品は数量を増やし、新しい商品は追加する
   *
   * @param product - 追加する商品
   */
  const addToCart = useCallback((product: Products) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  }, []);

  /**
   * カートをクリアする関数
   */
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  /**
   * カートの合計金額の計算
   */
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // コンテキストの値
  const value = {
    items,
    addToCart,
    clearCart,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
