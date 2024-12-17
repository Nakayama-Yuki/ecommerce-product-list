import ProductCard from "@/components/ProductCard";
import { Products } from "@/types/products";

export async function ProductList() {
  const res = await fetch("https://fakestoreapi.com/products");
  if (!res.ok) {
    throw new Error("データの取得に失敗しました");
  }
  const products: Products[] = await res.json();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
