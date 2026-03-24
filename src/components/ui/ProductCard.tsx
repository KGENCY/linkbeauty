"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { type Product, getInfluencer } from "@/data/mock";
import { useCart } from "@/data/CartContext";
import { useWishlist } from "@/data/WishlistContext";

interface ProductCardProps {
  product: Product;
  showInfluencer?: boolean;
  index?: number;
}

export default function ProductCard({ product, showInfluencer = false, index = 0 }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const influencer = showInfluencer ? getInfluencer(product.influencerId) : null;
  const wishlisted = isWishlisted(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;
  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    addToCart(product.id);
    setTimeout(() => setIsAddingToCart(false), 200);
  };

  return (
    <div
      ref={cardRef}
      className={`group bg-white rounded-2xl overflow-hidden border border-[#e8e4de] product-card-hover ${
        isVisible ? "product-card-visible" : "product-card-hidden"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link href={`/product/${product.id}`} className="block relative aspect-square overflow-hidden rounded-t-2xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className={`object-cover product-image-hover transition-all duration-400 ${
            imageLoaded ? "image-blur-loaded" : "image-blur-loading"
          }`}
          sizes="(max-width: 768px) 50vw, 25vw"
          onLoad={() => setImageLoaded(true)}
        />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-[#3d7a5f] text-white text-[11px] font-bold px-2 py-[3px] rounded-md">
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
            className={`h-5 w-5 transition-colors ${wishlisted ? "text-[#3d7a5f] fill-[#3d7a5f]" : "text-[#6b6b6b]"}`}
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
          <Link
            href={`/influencer/${influencer.id}`}
            className="inline-flex items-center gap-1.5 mb-2 bg-[#f9f9f7] border border-[#e8e4de] rounded-full py-[3px] pl-1 pr-2.5 hover:border-[#3d7a5f] transition-colors"
          >
            <div className="relative w-5 h-5 rounded-full overflow-hidden flex-shrink-0">
              <Image src={influencer.profileImage} alt={influencer.name} fill className="object-cover" sizes="20px" />
            </div>
            <span className="text-[12px] text-[#1a1a1a] font-medium">{influencer.name}&apos;s pick</span>
          </Link>
        )}
        <p className="text-label text-[#6b6b6b]">{product.brand}</p>
        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-[#1a1a1a] text-sm mt-1 line-clamp-2 group-hover:text-[#3d7a5f] transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1 mt-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-amber-400 fill-amber-400" viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
          <span className="text-xs text-[#6b6b6b]">{product.rating} ({product.reviewCount})</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[18px] font-semibold text-[#1a1a1a]">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-[#9a9a9a] line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            {savings > 0 && (
              <span className="text-[11px] text-[#3d7a5f] font-medium mt-0.5">Save ${savings.toFixed(2)}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className={`w-9 h-9 bg-[#3d7a5f] text-white rounded-full flex items-center justify-center transition-all add-to-cart-btn ${
              isAddingToCart ? "add-to-cart-pulse" : ""
            }`}
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
