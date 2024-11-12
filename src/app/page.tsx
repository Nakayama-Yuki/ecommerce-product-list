//  * usestaやuseEffectを使用していないので、useclientは今のところ不要
//  todo
//playwrightのテストを追加する？

import { Products } from "@/types/products"; // 追加
import ProductCard from "@/components/ProductCard"; // 追加
import { Suspense } from "react";
import SkeletonProductCard from "@/app/loading";

// RSCを使って関数コンポーネントを作成
export default async function Home() {
  // fetchAPIを使ってデータを取得
  const res = await fetch("https://fakestoreapi.com/products");
  // レスポンスがエラーの場合
  if (!res.ok) {
    throw new Error("データの取得に失敗しました");
  }
  // productsにデータを格納
  const products: Products[] = await res.json();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-8">製品一覧</h1>
      <Suspense fallback={<SkeletonProductCard />}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Suspense>
    </div>
  );
}
