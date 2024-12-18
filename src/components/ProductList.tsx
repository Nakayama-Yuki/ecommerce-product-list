import { SortSelect } from "@/components/SortSelect";
import { Products } from "@/types/products";

export async function ProductList() {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) {
    throw new Error("データの取得に失敗しました");
  }
  const products: Products[] = await res.json();

  // カテゴリーの一覧を取得
  const categories = [...new Set(products.map((product) => product.category))];

  return (
    <div className="mb-4">
      <SortSelect categories={categories} products={products} />
    </div>
  );
}
