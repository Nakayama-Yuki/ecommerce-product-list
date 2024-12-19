// スケルトンローディングをグリッド表示するコンポーネント
export default function SkeletonProductCard() {
  const skeletons = Array.from({ length: 3 });

  return (
    <>
      <div className="flex justify-start mb-8">
        <SkeletonSelect />
      </div>
      <SkeletonCart />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {skeletons.map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </>
  );
}

// スケルトンカードを表すコンポーネント
function SkeletonCard() {
  return (
    <div className="border p-4 rounded-lg shadow-lg animate-pulse">
      <div className="bg-gray-300 h-48 w-full mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="mt-4 w-full bg-gray-300 h-10 rounded"></div>
    </div>
  );
}

function SkeletonSelect() {
  return (
    <div
      className="w-40 h-10 border rounded bg-gray-200 animate-pulse"
      aria-label="カテゴリー選択読み込み中"
    />
  );
}

function SkeletonCart() {
  return (
    <div className="mt-4 p-4 border rounded animate-pulse mb-4">
      <div className="h-7 bg-gray-300 w-32 rounded mb-4"></div>
      <div className="mt-4 flex justify-end">
        <div className="h-6 bg-gray-300 w-24 rounded"></div>
      </div>
    </div>
  );
}
