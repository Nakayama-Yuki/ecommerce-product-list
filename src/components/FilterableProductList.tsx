// FilterableProductList.tsx
"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Products } from "@/types/products";

type Props = {
  categories: string[];
  products: Products[];
};

export function FilterableProductList({ categories, products }: Props) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // フィルタリングされた商品を取得
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
