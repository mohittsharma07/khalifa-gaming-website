import React, { useState } from "react";
import { Gamepad2 } from "lucide-react";

interface ImageWithFallbackProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = "",
  fallbackTitle = "Khalifa Gaming Studio",
  onLoad,
  onError,
  ...props
}) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleLoad: React.ReactEventHandler<HTMLImageElement> = (event) => {
    setLoaded(true);
    onLoad?.(event);
  };

  const handleError: React.ReactEventHandler<HTMLImageElement> = (event) => {
    setError(true);
    onError?.(event);
  };

  if (error) {
    return (
      <div
        className={`flex flex-col items-center justify-center border border-slate-800 bg-slate-900 p-6 text-center ${className}`}
        role="img"
        aria-label={alt}
      >
        <Gamepad2
          className="mb-2 h-10 w-10 text-purple-400/50"
          aria-hidden="true"
        />
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
          {fallbackTitle}
        </span>
        <span className="mt-1 text-[11px] text-slate-400">
          Image unavailable
        </span>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-900">
      {!loaded && (
        <div
          className="pointer-events-none absolute inset-0 animate-pulse bg-slate-900/60"
          aria-hidden="true"
        />
      )}

      <img
        {...props}
        src={src}
        alt={alt}
        referrerPolicy="no-referrer"
        onLoad={handleLoad}
        onError={handleError}
        className={`block h-full w-full object-cover object-center transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          ...props.style,
          transform: "none",
        }}
      />
    </div>
  );
};
