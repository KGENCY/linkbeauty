"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getProduct, getInfluencer, getRelatedProducts, reviews } from "@/data/mock";
import { useCart } from "@/data/CartContext";
import { useWishlist } from "@/data/WishlistContext";
import { trackClick } from "@/lib/trackClick";
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
          <h1 className="text-h2 text-[#1a1a1a]">Product not found</h1>
          <Link href="/discover" className="text-[#3d7a5f] mt-4 inline-block hover:underline">
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

    trackClick(product.id, product.influencerId);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-[#6b6b6b] mb-6">
          <Link href="/" className="hover:text-[#3d7a5f]">Home</Link>
          <span>/</span>
          {influencer && (
            <>
              <Link href={`/influencer/${influencer.id}`} className="hover:text-[#3d7a5f]">{influencer.name}&apos;s Store</Link>
              <span>/</span>
            </>
          )}
          <span className="text-[#1a1a1a]">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#f9f9f7]">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
            {discount > 0 && (
              <span className="absolute top-4 left-4 bg-[#3d7a5f] text-white text-sm font-bold px-3 py-1.5 rounded-full">
                -{discount}%
              </span>
            )}
            <button
              onClick={() => toggleWishlist(product.id)}
              className="absolute top-4 right-4 w-11 h-11 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-6 w-6 ${wishlisted ? "text-[#3d7a5f] fill-[#3d7a5f]" : "text-[#6b6b6b]"}`}
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
              <Link href={`/influencer/${influencer.id}`} className="inline-flex items-center gap-2 bg-[#3d7a5f]/10 rounded-full px-4 py-2 mb-4 hover:bg-[#3d7a5f]/20 transition-colors">
                <div className="relative w-6 h-6 rounded-full overflow-hidden">
                  <Image src={influencer.profileImage} alt={influencer.name} fill className="object-cover" sizes="24px" />
                </div>
                <span className="text-sm font-medium text-[#3d7a5f]">Recommended by {influencer.name} {influencer.flag}</span>
              </Link>
            )}

            <p className="text-label text-[#6b6b6b]">{product.brand}</p>
            <h1 className="text-h2 text-[#1a1a1a] mt-1">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${i < Math.floor(product.rating) ? "text-amber-400 fill-amber-400" : "text-[#e8e4de] fill-[#e8e4de]"}`} viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-[#6b6b6b]">{product.rating} ({product.reviewCount} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mt-4">
              <span className="text-3xl font-bold text-[#1a1a1a]">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-lg text-[#6b6b6b] line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            {/* Why I Love This */}
            {product.whyILoveThis && (
              <div className="mt-6 bg-[#3d7a5f]/5 rounded-2xl p-5 border border-[#3d7a5f]/10">
                <div className="flex items-center gap-2 mb-2">
                  {influencer && (
                    <div className="relative w-5 h-5 rounded-full overflow-hidden">
                      <Image src={influencer.profileImage} alt={influencer.name} fill className="object-cover" sizes="20px" />
                    </div>
                  )}
                  <span className="text-sm font-semibold text-[#3d7a5f]">Why I Love This</span>
                </div>
                <p className="text-sm text-[#1a1a1a] leading-relaxed italic">&ldquo;{product.whyILoveThis}&rdquo;</p>
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex items-center border border-[#e8e4de] rounded-full">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-11 h-11 flex items-center justify-center text-[#1a1a1a] hover:bg-[#f9f9f7] rounded-l-full transition-colors"
                >
                  -
                </button>
                <span className="w-10 text-center font-semibold text-[#1a1a1a]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-11 h-11 flex items-center justify-center text-[#1a1a1a] hover:bg-[#f9f9f7] rounded-r-full transition-colors"
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-[#3d7a5f] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#356b53] transition-colors shadow-lg shadow-[#3d7a5f]/25"
              >
                Add to Bag — ${(product.price * quantity).toFixed(2)}
              </button>
            </div>

            <p className="text-xs text-[#6b6b6b] mt-3 text-center">Free shipping on orders over $50</p>
          </div>
        </div>

        {/* Detail Tabs */}
        <div className="mt-12 border-t border-[#e8e4de] pt-8">
          <div className="flex gap-6 border-b border-[#e8e4de] mb-6">
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
                    ? "text-[#3d7a5f]"
                    : "text-[#6b6b6b] hover:text-[#1a1a1a]"
                }`}
              >
                {tab.label}
                {activeSection === tab.key && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3d7a5f] rounded-full" />
                )}
              </button>
            ))}
          </div>

          {activeSection === "description" && (
            <p className="text-[#1a1a1a] leading-relaxed max-w-2xl">{product.description}</p>
          )}

          {activeSection === "how" && (
            <p className="text-[#1a1a1a] leading-relaxed max-w-2xl">{product.howToUse}</p>
          )}

          {activeSection === "reviews" && (
            <div className="space-y-4 max-w-2xl">
              {reviews.map((review) => (
                <div key={review.id} className="bg-[#f9f9f7] rounded-2xl p-5 border border-[#e8e4de]">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[#1a1a1a]">{review.userName}</span>
                      {review.verified && (
                        <span className="text-label bg-[#3d7a5f]/10 text-[#3d7a5f] px-2 py-0.5 rounded-full normal-case tracking-normal">Verified</span>
                      )}
                    </div>
                    <span className="text-xs text-[#6b6b6b]">{review.date}</span>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < review.rating ? "text-amber-400 fill-amber-400" : "text-[#e8e4de] fill-[#e8e4de]"}`} viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-sm text-[#1a1a1a]">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-h2 text-[#1a1a1a] mb-6">
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
      <div className="lg:hidden fixed bottom-16 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-[#e8e4de] z-40 md:bottom-0">
        <button
          onClick={handleAddToCart}
          className="w-full bg-[#3d7a5f] text-white py-4 rounded-full font-semibold text-lg hover:bg-[#356b53] transition-colors shadow-lg"
        >
          Add to Bag — ${product.price.toFixed(2)}
        </button>
      </div>
    </div>
  );
}
