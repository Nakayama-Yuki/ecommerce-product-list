/** @type {import('next').NextConfig} */

const nextConfig = {
  // Docker本番ビルド用のstandalone出力設定
  output: "standalone",
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
