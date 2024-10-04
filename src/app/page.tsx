import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-8">製品一覧</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Tシャツ */}
        <div className="border p-4 rounded-lg shadow-lg">
          <Image
            src="/tshirt.png"
            alt="Tシャツ"
            width={200}
            height={200}
            className="w-full h-auto"
          />
          <h2 className="text-xl font-bold mb-2">Tシャツ</h2>
          <p className="text-gray-700 mb-4">コットン100%の快適なTシャツ。</p>
          <p className="text-lg font-bold text-blue-600">¥1500</p>
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            カートに追加
          </button>
        </div>
        {/* ジーンズ */}
        <div className="border p-4 rounded-lg shadow-lg">
          <Image
            src="/jeans.png"
            alt="ジーンズ"
            width={200}
            height={200}
            className="w-full h-auto"
          />
          <h2 className="text-xl font-bold mb-2">ジーンズ</h2>
          <p className="text-gray-700 mb-4">スリムフィットのデニムジーンズ。</p>
          <p className="text-lg font-bold text-blue-600">¥4000</p>
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            カートに追加
          </button>
        </div>
        {/* スニーカー */}
        <div className="border p-4 rounded-lg shadow-lg">
          <Image
            src="/sneaker.png"
            alt="スニーカー"
            width={200}
            height={200}
            className="w-full h-auto"
          />
          <h2 className="text-xl font-bold mb-2">スニーカー</h2>
          <p className="text-gray-700 mb-4">軽量スニーカー。</p>
          <p className="text-lg font-bold text-blue-600">¥8000</p>
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            カートに追加
          </button>
        </div>
        {/* バッグ */}
        <div className="border p-4 rounded-lg shadow-lg">
          <Image
            src="/ecobag.png"
            alt="バッグ"
            width={200}
            height={200}
            className="w-full h-auto"
          />
          <h2 className="text-xl font-bold mb-2">バッグ</h2>
          <p className="text-gray-700 mb-4">多機能なバックパック。</p>
          <p className="text-lg font-bold text-blue-600">¥6000</p>
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            カートに追加
          </button>
        </div>
        {/* キャップ */}
        <div className="border p-4 rounded-lg shadow-lg">
          <Image
            src="/mugiwarabouhi.png"
            alt="キャップ"
            width={200}
            height={200}
            className="w-full h-auto"
          />
          <h2 className="text-xl font-bold mb-2">キャップ</h2>
          <p className="text-gray-700 mb-4">スタイリッシュなキャップ。</p>
          <p className="text-lg font-bold text-blue-600">¥2000</p>
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            カートに追加
          </button>
        </div>
        {/* 腕時計 */}
        <div className="border p-4 rounded-lg shadow-lg">
          <Image
            src="/watch.png"
            alt="腕時計"
            width={200}
            height={200}
            className="w-full h-auto"
          />
          <h2 className="text-xl font-bold mb-2">腕時計</h2>
          <p className="text-gray-700 mb-4">エレガントなデザインの腕時計。</p>
          <p className="text-lg font-bold text-blue-600">¥10000</p>
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            カートに追加
          </button>
        </div>
      </div>
    </div>
  );
}
