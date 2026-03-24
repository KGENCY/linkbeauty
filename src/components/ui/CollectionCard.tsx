import Link from "next/link";
import Image from "next/image";
import { type Collection, getInfluencer } from "@/data/mock";

interface CollectionCardProps {
  collection: Collection;
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  const influencer = getInfluencer(collection.influencerId);

  return (
    <Link
      href={`/influencer/${collection.influencerId}`}
      className="group block relative rounded-3xl overflow-hidden aspect-[4/3]"
    >
      <Image
        src={collection.image}
        alt={collection.title}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        sizes="(max-width: 768px) 90vw, 33vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
        {influencer && (
          <div className="flex items-center gap-2 mb-2">
            <div className="relative w-6 h-6 rounded-full overflow-hidden ring-2 ring-white/50">
              <Image src={influencer.profileImage} alt={influencer.name} fill className="object-cover" sizes="24px" />
            </div>
            <span className="text-white/80 text-xs font-medium">by {influencer.name}</span>
          </div>
        )}
        <h3 className="text-white font-bold text-lg">{collection.title}</h3>
        <p className="text-white/70 text-sm mt-1">{collection.description}</p>
        <span className="inline-block mt-3 text-xs text-white/90 bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full font-medium">
          {collection.productIds.length} products →
        </span>
      </div>
    </Link>
  );
}
