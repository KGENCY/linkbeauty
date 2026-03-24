import Link from "next/link";
import Image from "next/image";
import { type Influencer } from "@/data/mock";

interface InfluencerCardProps {
  influencer: Influencer;
  variant?: "default" | "featured" | "compact";
}

export default function InfluencerCard({ influencer, variant = "default" }: InfluencerCardProps) {
  if (variant === "compact") {
    return (
      <Link href={`/influencer/${influencer.id}`} className="flex items-center gap-3 p-3 bg-white rounded-2xl hover:shadow-md transition-all group">
        <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[#EFF7F4]">
          <Image src={influencer.profileImage} alt={influencer.name} fill className="object-cover" sizes="48px" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold text-sm text-[#222222] group-hover:text-[#2D8B75] transition-colors">
            {influencer.name} {influencer.flag}
          </p>
          <p className="text-xs text-[#888888] truncate">{influencer.followers} followers</p>
        </div>
      </Link>
    );
  }

  if (variant === "featured") {
    return (
      <Link href={`/influencer/${influencer.id}`} className="group relative block">
        <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
          <Image
            src={influencer.coverImage}
            alt={influencer.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 80vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-white/50">
                <Image src={influencer.profileImage} alt={influencer.name} fill className="object-cover" sizes="48px" />
              </div>
              <div>
                <p className="text-white font-bold text-lg">{influencer.name} {influencer.flag}</p>
                <p className="text-white/70 text-sm">{influencer.followers} followers</p>
              </div>
            </div>
            <p className="text-white/90 text-sm line-clamp-2">{influencer.bio}</p>
            <div className="flex gap-2 mt-3 flex-wrap">
              {influencer.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="text-xs bg-white/20 text-white px-3 py-1 rounded-full backdrop-blur-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/influencer/${influencer.id}`} className="group block bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="relative h-36 sm:h-44">
        <Image src={influencer.coverImage} alt={influencer.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 100vw, 50vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
      <div className="relative px-5 pb-5">
        <div className="relative -mt-8 mb-3">
          <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-white relative">
            <Image src={influencer.profileImage} alt={influencer.name} fill className="object-cover" sizes="64px" />
          </div>
        </div>
        <h3 className="font-bold text-[#222222] text-lg group-hover:text-[#2D8B75] transition-colors">
          {influencer.name} {influencer.flag}
        </h3>
        <p className="text-[#888888] text-sm mt-1">{influencer.followers} followers</p>
        <p className="text-[#222222] text-sm mt-2 line-clamp-2">{influencer.bio}</p>
        <div className="flex gap-2 mt-3 flex-wrap">
          {influencer.tags.map((tag) => (
            <span key={tag} className="text-xs bg-[#EFF7F4] text-[#2D8B75] px-3 py-1 rounded-full font-medium">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
