// useStateやuseEffectを使用していないので、"use client"は今のところ不要

import { Suspense } from "react";
import { ProductList } from "@/components/ProductList";
import SkeletonProductCard from "@/app/loading";

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold text-center mb-8">製品一覧</h1>
      <Suspense fallback={<SkeletonProductCard />}>
        <ProductList />
      </Suspense>
    </div>
  );
}
