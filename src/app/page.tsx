/**
 * todo
 * データフェッチをNext.jsのものに書き換える
 * youtubeの動画を参考にする
 *
 * ローディング中の表示もloading.tsxに変える
 * 天気予報のデータフェッチも修正する？
 */
import Image from "next/image";

// 型の定義
type Products = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
};

// サーバーからデータを取得する関数
export default async function Home() {
  // データの取得 fetch関数を使ってデータを取得
  const res = await fetch("https://fakestoreapi.com/products?limit=5");
  // レスポンスがエラーの場合
  if (!res.ok) {
    throw new Error("データの取得に失敗しました");
  }
  // productsにデータを格納
  const products: Products[] = await res.json();

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-8">製品一覧</h1>
      {/* 製品１つを表すカード１つ分 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow-lg">
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
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              カートに追加
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
