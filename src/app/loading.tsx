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

// スケルトンローディングをグリッド表示するコンポーネント
export default function SkeletonProductCard() {
  const skeletons = Array.from({ length: 3 });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {skeletons.map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}
