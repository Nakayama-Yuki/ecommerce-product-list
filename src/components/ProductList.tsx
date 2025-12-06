import { FilterableProductList } from "@/components/FilterableProductList";
import { Products } from "@/types/products";

/**
 * 製品一覧を取得して表示するサーバーコンポーネント
 * 常に最新のデータを取得するため、動的レンダリングを使用
 */
export async function ProductList() {
  // cache: 'no-store' で常に最新データを取得（動的レンダリング）
  const res = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("データの取得に失敗しました");
  }
  const products: Products[] = await res.json();

  // カテゴリーの一覧を取得
  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div className="mb-4">
      <FilterableProductList categories={categories} products={products} />
    </div>
  );
}
