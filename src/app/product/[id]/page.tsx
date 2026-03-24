"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProduct, getInfluencer, getRelatedProducts, reviews } from "@/data/mock";
import { useCart } from "@/data/CartContext";
import { useWishlist } from "@/data/WishlistContext";
import ProductCard from "@/components/ui/ProductCard";

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = getProduct(id as string);
  const { addToCart, setIsCartOpen } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState<"description" | "how" | "reviews">("description");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#222222]">Product not found</h1>
          <Link href="/discover" className="text-[#2D8B75] mt-4 inline-block hover:underline">
            Browse creators →
          </Link>
        </div>
      </div>
    );
  }

  const influencer = getInfluencer(product.influencerId);
  const relatedProducts = getRelatedProducts(product.id);
  const wishlisted = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#888888] mb-6">
          <Link href="/" className="hover:text-[#2D8B75]">Home</Link>
          <span>/</span>
          {influencer && (
            <>
              <Link href={`/influencer/${influencer.id}`} className="hover:text-[#2D8B75]">{influencer.name}&apos;s Store</Link>
              <span>/</span>
            </>
          )}
          <span className="text-[#222222]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#FAFAFA]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-[#2D8B75] text-white text-sm font-bold px-3 py-1.5 rounded-full">
                -{discount}%
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${wishlisted ? "text-[#2D8B75] fill-[#2D8B75]" : "text-[#888888]"}`}
                fill={wishlisted ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Info */}
          <div>
            {/* Recommended by */}
            {influencer && (
              <Link href={`/influencer/${influencer.id}`} className="inline-flex items-center gap-2 bg-[#EFF7F4] rounded-full px-4 py-2 mb-4 hover:bg-[#fce0e4] transition-colors">
                <div className="relative w-6 h-6 rounded-full overflow-hidden">
                  <Image src={influencer.profileImage} alt={influencer.name} fill className="object-cover" sizes="24px" />
                </div>
                <span className="text-sm font-medium text-[#2D8B75]">Recommended by {influencer.name} {influencer.flag}</span>
              </Link>
            )}

            <p className="text-sm text-[#888888] uppercase tracking-wide">{product.brand}</p>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#222222] mt-1">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`} viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-[#888888]">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-3xl font-bold text-[#222222]">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-[#888888] line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Why I Love This */}
            {product.whyILoveThis && (
              <div className="mt-6 bg-[#EFF7F4]/50 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  {influencer && (
                    <div className="relative w-5 h-5 rounded-full overflow-hidden">
                      <Image src={influencer.profileImage} alt={influencer.name} fill className="object-cover" sizes="20px" />
                    </div>
                  )}
                  <span className="text-sm font-semibold text-[#2D8B75]">Why I Love This</span>
                </div>
                <p className="text-sm text-[#222222] leading-relaxed italic">&ldquo;{product.whyILoveThis}&rdquo;</p>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 flex items-center justify-center text-[#222222] hover:bg-gray-50 rounded-l-full transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center font-semibold text-[#222222]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 flex items-center justify-center text-[#222222] hover:bg-gray-50 rounded-r-full transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#2D8B75] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#247A65] transition-colors shadow-lg shadow-[#2D8B75]/25"
              >
                Add to Bag — ${(product.price * quantity).toFixed(2)}
              </button>
            </div>

            <p className="text-xs text-[#888888] mt-3 text-center">Free shipping on orders over $50</p>
          </div>
        </div>

        {/* Detail Tabs */}
        <div className="mt-12 border-t border-gray-100 pt-8">
          <div className="flex gap-6 border-b border-gray-200 mb-6">
            {([
              { key: "description", label: "Description" },
              { key: "how", label: "How to Use" },
              { key: "reviews", label: `Reviews (${reviews.length})` },
            ] as const).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveSection(tab.key)}
                className={`pb-3 text-sm font-semibold transition-colors relative ${
                  activeSection === tab.key
                    ? "text-[#2D8B75]"
                    : "text-[#888888] hover:text-[#222222]"
                }`}
              >
                {tab.label}
                {activeSection === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2D8B75] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {activeSection === "description" && (
            <p className="text-[#222222] leading-relaxed max-w-2xl">{product.description}</p>
          )}

          {activeSection === "how" && (
            <p className="text-[#222222] leading-relaxed max-w-2xl">{product.howToUse}</p>
          )}

          {activeSection === "reviews" && (
            <div className="space-y-4 max-w-2xl">
              {reviews.map((review) => (
                <div key={review.id} className="bg-[#FAFAFA] rounded-2xl p-5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#222222]">{review.userName}</span>
                      {review.verified && (
                        <span className="text-xs bg-green-50 text-green-600 px-2 py-0.5 rounded-full">Verified</span>
                      )}
                    </div>
                    <span className="text-xs text-[#888888]">{review.date}</span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`} viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-[#222222]">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#222222] mb-6">
              More from {influencer?.name}
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Buy Button (Mobile) */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-gray-100 z-40 md:bottom-0">
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#2D8B75] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#247A65] transition-colors shadow-lg"
        >
          Add to Bag — ${product.price.toFixed(2)}
        </button>
      </div>
    </div>
  );
}
