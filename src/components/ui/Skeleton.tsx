"use client";

// Product Card Skeleton
export function ProductCardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-product-image" />
      <div className="p-4">
        <div className="skeleton skeleton-text w-16 h-3 mb-2" />
        <div className="skeleton skeleton-text w-full h-4 mb-1" />
        <div className="skeleton skeleton-text w-3/4 h-4 mb-3" />
        <div className="flex items-center gap-1 mb-3">
          <div className="skeleton w-4 h-4 rounded" />
          <div className="skeleton skeleton-text w-12 h-3" />
        </div>
        <div className="flex items-center justify-between">
          <div className="skeleton skeleton-text w-20 h-5" />
          <div className="skeleton w-9 h-9 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// Creator/Influencer Card Skeleton
export function CreatorCardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-creator-cover" />
      <div className="relative px-5 pb-5">
        <div className="relative -mt-8 mb-3">
          <div className="skeleton skeleton-avatar w-16 h-16 ring-4 ring-white" />
        </div>
        <div className="skeleton skeleton-text w-32 h-5 mb-2" />
        <div className="skeleton skeleton-text w-24 h-3 mb-3" />
        <div className="skeleton skeleton-text w-full h-4 mb-1" />
        <div className="skeleton skeleton-text w-3/4 h-4 mb-3" />
        <div className="flex gap-2">
          <div className="skeleton w-16 h-6 rounded-full" />
          <div className="skeleton w-20 h-6 rounded-full" />
          <div className="skeleton w-14 h-6 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// Compact Creator Card Skeleton
export function CreatorCardCompactSkeleton() {
  return (
    <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-[#e8e4de]">
      <div className="skeleton skeleton-avatar w-12 h-12 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <div className="skeleton skeleton-text w-24 h-4 mb-1" />
        <div className="skeleton skeleton-text w-16 h-3" />
      </div>
    </div>
  );
}

// Featured Creator Card Skeleton
export function CreatorCardFeaturedSkeleton() {
  return (
    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden skeleton-card">
      <div className="absolute inset-0 skeleton" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="skeleton skeleton-avatar w-12 h-12" />
          <div>
            <div className="skeleton skeleton-text w-24 h-5 mb-1" />
            <div className="skeleton skeleton-text w-20 h-3" />
          </div>
        </div>
        <div className="skeleton skeleton-text w-full h-4 mb-1" />
        <div className="skeleton skeleton-text w-3/4 h-4 mb-3" />
        <div className="flex gap-2">
          <div className="skeleton w-16 h-6 rounded-full" />
          <div className="skeleton w-20 h-6 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// Collection Card Skeleton
export function CollectionCardSkeleton() {
  return (
    <div className="skeleton-card">
      <div className="skeleton h-48 rounded-t-3xl" />
      <div className="p-5">
        <div className="skeleton skeleton-text w-32 h-5 mb-2" />
        <div className="skeleton skeleton-text w-full h-4 mb-1" />
        <div className="skeleton skeleton-text w-2/3 h-4 mb-3" />
        <div className="skeleton skeleton-text w-20 h-3" />
      </div>
    </div>
  );
}

// Grid of Product Card Skeletons
export function ProductGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Grid of Creator Card Skeletons
export function CreatorGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <CreatorCardSkeleton key={i} />
      ))}
    </div>
  );
}

// General purpose skeleton wrapper
export function Skeleton({
  className = "",
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return <div className={`skeleton ${className}`} style={style} />;
}
