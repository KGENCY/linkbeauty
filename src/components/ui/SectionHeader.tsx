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
        <h2 className="text-h2 text-[#1a1a1a]">{title}</h2>
        {subtitle && <p className="text-[#6b6b6b] mt-2 text-sm sm:text-base">{subtitle}</p>}
      </div>
      {href && (
        <Link
          href={href}
          className="view-all-link text-[#3d7a5f] text-sm font-semibold flex-shrink-0 relative"
        >
          {linkText} →
        </Link>
      )}
    </div>
  );
}
