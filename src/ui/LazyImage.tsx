import { useState } from "react";
import { HiPhoto } from "react-icons/hi2";

interface LazyImageProps {
  src?: string | null;
  alt: string;
  className?: string;
  iconSize?: number;
}

const LazyImage = ({ src, alt, className, iconSize = 24 }: LazyImageProps) => {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-gray-100 text-gray-400 ${className}`}
      >
        <HiPhoto size={iconSize} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setError(true)}
    />
  );
};

export default LazyImage;
