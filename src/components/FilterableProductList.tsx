"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Products } from "@/types/products";

type Props = {
  categories: string[];
  products: Products[];
};

interface CartItem extends Products {
  quantity: number;
}

export function FilterableProductList({ categories, products }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);

  // フィルタリングされた商品を取得
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  // カートに商品を追加する関数
  const addToCart = (product: Products) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // カートの合計金額を計算
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      {/* セレクトボタン */}
      <select
        className="border p-2 rounded"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="all">すべてのカテゴリー</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>

      {/* カートの表示 */}
      <div className="mt-4 p-4 border rounded">
        <h2 className="text-xl font-bold mb-2">商品カート</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-2">
            <div>
              <span className="font-normal">{item.title}</span>
              <span className="text-gray-500 ml-2">× {item.quantity}</span>
            </div>
            <span>¥{(item.price * item.quantity).toFixed(0)}</span>
          </div>
        ))}
        <div className="mt-4 font-bold flex justify-end">
          合計: ¥{total.toFixed(0)}
        </div>
      </div>

      {/* 商品一覧をグリッドで表示 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => addToCart(product)}
          />
        ))}
      </div>
    </>
  );
}
