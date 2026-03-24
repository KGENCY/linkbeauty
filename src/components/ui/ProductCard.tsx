"use client";

import Link from "next/link";
import Image from "next/image";
import { type Product, getInfluencer } from "@/data/mock";
import { useCart } from "@/data/CartContext";
import { useWishlist } from "@/data/WishlistContext";

interface ProductCardProps {
  product: Product;
  showInfluencer?: boolean;
}

export default function ProductCard({ product, showInfluencer = false }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const influencer = showInfluencer ? getInfluencer(product.influencerId) : null;
  const wishlisted = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <Link href={`/product/${product.id}`} className="block relative aspect-square">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 50vw, 25vw"
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-[#2D8B75] text-white text-xs font-bold px-2.5 py-1 rounded-full">
            -{discount}%
          </span>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product.id);
          }}
          className="absolute top-3 right-3 w-9 h-9 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transition-colors ${wishlisted ? "text-[#2D8B75] fill-[#2D8B75]" : "text-[#888888]"}`}
            fill={wishlisted ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </Link>
      <div className="p-4">
        {influencer && (
          <Link href={`/influencer/${influencer.id}`} className="flex items-center gap-2 mb-2">
            <div className="relative w-5 h-5 rounded-full overflow-hidden">
              <Image src={influencer.profileImage} alt={influencer.name} fill className="object-cover" sizes="20px" />
            </div>
            <span className="text-xs text-[#2D8B75] font-medium">{influencer.name}&apos;s pick</span>
          </Link>
        )}
        <p className="text-xs text-[#888888] uppercase tracking-wide">{product.brand}</p>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-[#222222] text-sm mt-1 line-clamp-2 group-hover:text-[#2D8B75] transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mt-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-xs text-[#888888]">{product.rating} ({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#222222]">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-xs text-[#888888] line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(product.id)}
            className="w-9 h-9 bg-[#2D8B75] text-white rounded-full flex items-center justify-center hover:bg-[#247A65] transition-colors shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
