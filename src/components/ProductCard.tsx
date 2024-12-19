import Image from "next/image";
import { Products } from "@/types/products";

interface ProductCardProps {
  product: Products;
  onAddToCart: () => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  return (
    <div className="border p-4 rounded-lg shadow-lg">
      <Image
        src={product.image}
        alt={product.title}
        width={200}
        height={200}
        className="w-full h-auto"
      />
      <h2 className="text-xl font-bold mb-2">{product.title}</h2>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-lg font-bold text-blue-600">¥{product.price}</p>
      <button
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        onClick={onAddToCart}>
        カートに追加
      </button>
    </div>
  );
}
