import Link from "next/link";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  href?: string;
  linkText?: string;
}

export default function SectionHeader({ title, subtitle, href, linkText = "View All" }: SectionHeaderProps) {
  return (
    <div className="flex items-end justify-between mb-6 sm:mb-8">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-[#222222]">{title}</h2>
        {subtitle && <p className="text-[#888888] mt-1 text-sm sm:text-base">{subtitle}</p>}
      </div>
      {href && (
        <Link href={href} className="text-[#2D8B75] text-sm font-semibold hover:underline flex-shrink-0">
          {linkText} →
        </Link>
      )}
    </div>
  );
}
