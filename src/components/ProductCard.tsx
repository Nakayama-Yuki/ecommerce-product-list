import Image from "next/image";
import { Products } from "@/types/products";
import { useState } from "react";

interface ProductCardProps {
  product: Products;
  onAddToCart: () => void;
}

/**
 * 商品カードコンポーネント
 * 商品情報を表示し、カートに追加する機能を提供します
 *
 * @param product - 表示する商品情報
 * @param onAddToCart - カートに追加するためのコールバック関数
 */
export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  // 商品の詳細表示状態を管理するstate
  const [isExpanded, setIsExpanded] = useState(false);
  // カートに追加時のアニメーション状態を管理するstate
  const [isAdding, setIsAdding] = useState(false);

  /**
   * カートに追加する処理
   * アニメーション表示と親コンポーネントへの通知を行います
   */
  const handleAddToCart = () => {
    setIsAdding(true);
    onAddToCart();

    // 0.7秒後にアニメーション状態をリセット
    setTimeout(() => {
      setIsAdding(false);
    }, 700);
  };

  // 説明文を短縮して表示（展開時は全文表示）
  const displayDescription = isExpanded
    ? product.description
    : product.description.length > 100
    ? `${product.description.substring(0, 100)}...`
    : product.description;

  return (
    <div className="border p-4 rounded-lg shadow-lg transition-all hover:shadow-xl">
      {/* 商品画像 */}
      <div className="relative overflow-hidden group">
        <Image
          src={product.image}
          alt={product.title}
          width={200}
          height={200}
          className="w-full h-auto transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
          {product.category}
        </div>
      </div>

      {/* 商品情報 */}
      <h2 className="text-xl font-bold mb-2 mt-3 line-clamp-1">
        {product.title}
      </h2>
      <p className="text-gray-700 mb-4 text-sm">
        {displayDescription}
        {product.description.length > 100 && (
          <button
            className="text-blue-500 ml-1 hover:underline"
            onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? "閉じる" : "続きを読む"}
          </button>
        )}
      </p>

      {/* 価格と評価 */}
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold text-blue-600">
          ¥{product.price.toFixed(0)}
        </p>
        <div className="flex items-center">
          <span className="text-yellow-500 mr-1">★</span>
          <span className="text-sm">{product.rating?.rate || "未評価"}</span>
        </div>
      </div>

      {/* カートに追加ボタン */}
      <button
        className={`mt-4 w-full py-2 rounded-sm transition-all duration-300 flex justify-center items-center ${
          isAdding
            ? "bg-green-500 text-white"
            : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        onClick={handleAddToCart}
        disabled={isAdding}>
        {isAdding ? "追加しました ✓" : "カートに追加"}
      </button>
    </div>
  );
}
