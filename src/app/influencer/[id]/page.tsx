"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getInfluencer, getProductsByInfluencer, getCollectionsByInfluencer } from "@/data/mock";
import ProductCard from "@/components/ui/ProductCard";
import CollectionCard from "@/components/ui/CollectionCard";

type Tab = "products" | "routine" | "about";

export default function InfluencerStorePage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<Tab>("products");
  const influencer = getInfluencer(id as string);
  const products = getProductsByInfluencer(id as string);
  const collections = getCollectionsByInfluencer(id as string);

  if (!influencer) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#222222]">Creator not found</h1>
          <Link href="/discover" className="text-[#2D8B75] mt-4 inline-block hover:underline">
            Browse all creators →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      {/* Cover */}
      <div className="relative h-48 sm:h-64 lg:h-80">
        <Image
          src={influencer.coverImage}
          alt={influencer.name}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>

      {/* Profile */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="relative -mt-16 sm:-mt-20 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden ring-4 ring-white shadow-xl relative flex-shrink-0">
              <Image src={influencer.profileImage} alt={influencer.name} fill className="object-cover" sizes="144px" />
            </div>
            <div className="flex-1 pb-2">
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-2xl sm:text-3xl font-bold text-[#222222]">
                  {influencer.name} {influencer.flag}
                </h1>
                <span className="bg-[#EFF7F4] text-[#2D8B75] text-xs font-semibold px-3 py-1 rounded-full">
                  Verified Creator
                </span>
              </div>
              <p className="text-[#888888] mt-1">{influencer.nationality}</p>
              <p className="text-[#222222] mt-2 max-w-xl">{influencer.bio}</p>
              <div className="flex items-center gap-6 mt-4">
                <div>
                  <span className="font-bold text-[#222222]">{influencer.followers}</span>
                  <span className="text-[#888888] text-sm ml-1">followers</span>
                </div>
                <div>
                  <span className="font-bold text-[#222222]">{products.length}</span>
                  <span className="text-[#888888] text-sm ml-1">products</span>
                </div>
                <div>
                  <span className="font-bold text-[#222222]">{collections.length}</span>
                  <span className="text-[#888888] text-sm ml-1">collections</span>
                </div>
              </div>
            </div>
            <button className="self-start sm:self-end bg-[#2D8B75] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#247A65] transition-colors shadow-lg shadow-[#2D8B75]/20">
              Follow
            </button>
          </div>

          {/* Tags */}
          <div className="flex gap-2 mt-4 flex-wrap">
            {influencer.tags.map((tag) => (
              <span key={tag} className="bg-white text-[#222222] text-sm px-4 py-1.5 rounded-full border border-gray-100">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <div className="flex gap-8">
            {(["products", "routine", "about"] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-sm font-semibold capitalize transition-colors relative ${
                  activeTab === tab
                    ? "text-[#2D8B75]"
                    : "text-[#888888] hover:text-[#222222]"
                }`}
              >
                {tab === "products" ? `Products (${products.length})` : tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2D8B75] rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="pb-16">
          {activeTab === "products" && (
            <div>
              {/* My Picks */}
              <div className="mb-10">
                <h2 className="text-xl font-bold text-[#222222] mb-4">My Picks</h2>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>

              {/* Collections */}
              {collections.length > 0 && (
                <div>
                  <h2 className="text-xl font-bold text-[#222222] mb-4">Collections</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {collections.map((col) => (
                      <CollectionCard key={col.id} collection={col} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "routine" && (
            <div className="max-w-2xl">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-[#222222] mb-2">Daily Routine</h2>
                <p className="text-[#888888] mb-6">{influencer.routineDescription}</p>

                <div className="space-y-6">
                  {products.map((product, index) => (
                    <div key={product.id} className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-[#EFF7F4] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-[#2D8B75] font-bold text-sm">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <Link href={`/product/${product.id}`} className="flex items-center gap-3 group">
                          <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="56px" />
                          </div>
                          <div>
                            <p className="text-xs text-[#888888] uppercase">{product.brand}</p>
                            <p className="font-semibold text-[#222222] text-sm group-hover:text-[#2D8B75] transition-colors">
                              {product.name}
                            </p>
                            <p className="text-[#2D8B75] font-bold text-sm">${product.price.toFixed(2)}</p>
                          </div>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "about" && (
            <div className="max-w-2xl">
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm">
                <h2 className="text-xl font-bold text-[#222222] mb-4">About {influencer.name}</h2>
                <p className="text-[#222222] leading-relaxed whitespace-pre-line">{influencer.about}</p>

                <div className="mt-8 pt-6 border-t border-gray-100">
                  <h3 className="font-semibold text-[#222222] mb-3">Expertise</h3>
                  <div className="flex gap-2 flex-wrap">
                    {influencer.tags.map((tag) => (
                      <span key={tag} className="bg-[#EFF7F4] text-[#2D8B75] text-sm px-4 py-2 rounded-full font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="font-semibold text-[#222222] mb-3">Stats</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center bg-[#FAFAFA] rounded-2xl p-4">
                      <p className="text-2xl font-bold text-[#2D8B75]">{influencer.followers}</p>
                      <p className="text-xs text-[#888888] mt-1">Followers</p>
                    </div>
                    <div className="text-center bg-[#FAFAFA] rounded-2xl p-4">
                      <p className="text-2xl font-bold text-[#2D8B75]">{products.length}</p>
                      <p className="text-xs text-[#888888] mt-1">Products</p>
                    </div>
                    <div className="text-center bg-[#FAFAFA] rounded-2xl p-4">
                      <p className="text-2xl font-bold text-[#2D8B75]">4.9</p>
                      <p className="text-xs text-[#888888] mt-1">Avg Rating</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
