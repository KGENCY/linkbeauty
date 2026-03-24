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
      <div className="bg-[#EFF7F4] rounded-3xl p-8 sm:p-12 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#222222]">{title}</h2>
        <p className="text-[#888888] mt-3 max-w-md mx-auto">{subtitle}</p>
        <Link
          href={href}
          className="inline-block mt-6 bg-[#2D8B75] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#247A65] transition-colors"
        >
          {buttonText}
        </Link>
      </div>
    );
  }

  return (
    <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#2D8B75] to-[#4DAE95] p-8 sm:p-12">
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      <div className="relative text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white">{title}</h2>
        <p className="text-white/80 mt-3 max-w-md mx-auto">{subtitle}</p>
        <Link
          href={href}
          className="inline-block mt-6 bg-white text-[#2D8B75] px-8 py-3.5 rounded-full font-semibold hover:bg-white/90 transition-colors"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}
