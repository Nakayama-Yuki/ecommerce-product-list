import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "product-list",
  description: "練習のために作ったnext.js ecommerce product list",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
