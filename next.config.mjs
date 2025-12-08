/** @type {import('next').NextConfig} */

const nextConfig = {
  // キャッシュコンポーネントの有効化（完全なオプトイン）
  cacheComponents: true,
  // Turbopackのファイルシステムキャッシュを開発環境で有効化
  turbopackFileSystemCacheForDev: true,
  // Next.jsでは、外部の画像を使用する場合、そのホスト名を明示的に設定する必要がある
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
        port: "",
        search: "",
      },
    ],
  },
};

export default nextConfig;
