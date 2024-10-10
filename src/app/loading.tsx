//スケルトンローディングのコンポーネント
export default function SkeletonProductCard() {
  return (
    <div className="border p-4 rounded-lg shadow-lg flex flex-col items-center">
      <div className="w-full h-48 bg-gray-300 mb-4 rounded animate-pulse"></div>
      <div className="w-3/4 h-6 bg-gray-300 mb-2 rounded animate-pulse"></div>
      <div className="w-full h-4 bg-gray-300 mb-2 rounded animate-pulse"></div>
      <div className="w-5/6 h-4 bg-gray-300 mb-4 rounded animate-pulse"></div>
      <div className="w-1/2 h-6 bg-gray-300 rounded animate-pulse"></div>
      <div className="mt-4 w-full h-10 bg-gray-300 rounded animate-pulse"></div>
    </div>
  );
}
