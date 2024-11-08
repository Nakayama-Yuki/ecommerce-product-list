/** @type {import('next').NextConfig} */
// Next.jsでは、外部の画像を使用する場合、そのホスト名を明示的に設定する必要がある
const nextConfig = {
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
