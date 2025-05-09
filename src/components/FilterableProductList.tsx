"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Products } from "@/types/products";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";

type Props = {
  categories: string[];
  products: Products[];
};

/**
 * 商品リストコンポーネント
 * カテゴリーフィルタリングとカート管理機能を提供
 *
 * @param categories - 利用可能なカテゴリーのリスト
 * @param products - 表示する商品のリスト
 */
export function FilterableProductList({ categories, products }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const { items, addToCart, total } = useCart();

  // フィルタリングされた商品を取得
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="mb-4">
      {/* セレクトボタン */}
      <select
        className="border p-2 rounded-sm"
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
      <div className="mt-4 p-4 border rounded-sm">
        <h2 className="text-xl font-bold mb-2">商品カート</h2>
        {items.length === 0 ? (
          <p className="text-gray-500">カートに商品がありません</p>
        ) : (
          <>
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center mb-2">
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
            {/*  注文手続きボタン */}
            <Link
              href={items.length === 0 ? "#" : "/order"}
              onClick={(e) => items.length === 0 && e.preventDefault()}
              className={`mt-4 w-full py-2 text-white rounded-sm block text-center ${
                items.length === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              }`}>
              注文手続きへ進む
            </Link>
          </>
        )}
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
    </div>
  );
}
