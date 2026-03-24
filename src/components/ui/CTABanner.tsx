import Link from "next/link";

interface CTABannerProps {
  title: string;
  subtitle: string;
  buttonText: string;
  href: string;
  variant?: "primary" | "secondary";
}

export default function CTABanner({ title, subtitle, buttonText, href, variant = "primary" }: CTABannerProps) {
  if (variant === "secondary") {
    return (
      <div className="bg-[#3d7a5f]/10 rounded-3xl p-8 sm:p-12 text-center">
        <h2 className="text-h2 text-[#1a1a1a]">{title}</h2>
        <p className="text-[#6b6b6b] mt-3 max-w-md mx-auto">{subtitle}</p>
        <Link
          href={href}
          className="inline-block mt-6 bg-[#3d7a5f] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#356b53] transition-colors"
        >
          {buttonText}
        </Link>
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl overflow-hidden cta-gradient-animated p-8 sm:p-12 lg:p-16">
      {/* Floating decorative circles */}
      <div className="cta-circle-1" />
      <div className="cta-circle-2" />
      <div className="cta-circle-3" />
      <div className="cta-circle-4" />

      <div className="relative text-center">
        <h2 className="cta-headline text-white">{title}</h2>
        <p className="cta-subtext text-white mt-4">{subtitle}</p>
        <Link
          href={href}
          className="cta-apply-btn mt-8 inline-flex"
        >
          {buttonText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
