/** @type {import('next').NextConfig} */

const nextConfig = {
  // 実験的な機能の設定
  experimental: {
    // Turbopackのファイルシステムキャッシュを開発環境で有効化
    turbopackFileSystemCacheForDev: true,
  },
  // キャッシュコンポーネントの有効化（完全なオプトイン）
  cacheComponents: true,
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
