"use client";

import { useState } from "react";
import Image, { ImageProps } from "next/image";

interface BlurImageProps extends Omit<ImageProps, "onLoad"> {
  wrapperClassName?: string;
}

export default function BlurImage({
  className = "",
  wrapperClassName = "",
  alt,
  ...props
}: BlurImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`overflow-hidden ${wrapperClassName}`}>
      <Image
        {...props}
        alt={alt}
        className={`${className} transition-all duration-400 ease-out ${
          isLoaded ? "image-blur-loaded" : "image-blur-loading"
        }`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
}
