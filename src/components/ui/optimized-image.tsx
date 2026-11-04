import { cn } from "@/lib/utils";
import { photoSrc, photoSrcSet, type ImageVariant, toLogicalPhotoId } from "@/lib/images";
import type { CSSProperties, ImgHTMLAttributes } from "react";

export type OptimizedImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "width" | "height"> & {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
  quality?: number;
  /** Named delivery preset when using the Cloudflare R2 CDN. */
  variant?: ImageVariant;
};

function shouldResolvePhoto(src: string): boolean {
  if (src.startsWith("http://") || src.startsWith("https://")) return false;
  if (src.startsWith("/logos/") || src.startsWith("/favicon")) return false;
  if (src.endsWith(".svg")) return false;
  // Site photos: /photos legacy paths, or canonical painting/ / staining/ ids
  return (
    src.startsWith("/photos/") ||
    src.startsWith("photos/") ||
    src.startsWith("painting/") ||
    src.startsWith("staining/") ||
    (!src.startsWith("/") && !src.includes("://"))
  );
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  fetchPriority,
  sizes,
  quality: _quality,
  variant = "gallery",
  className,
  style,
  loading,
  srcSet: srcSetProp,
  ...rest
}: OptimizedImageProps) {
  const resolvedLoading = priority ? undefined : (loading ?? "lazy");
  const resolvedFetchPriority = fetchPriority ?? (priority ? "high" : undefined);

  const fillStyle: CSSProperties | undefined = fill
    ? {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        ...style,
      }
    : style;

  const resolvedSrc = shouldResolvePhoto(src) ? photoSrc(src, { variant }) : src;
  const resolvedSrcSet =
    srcSetProp ??
    (shouldResolvePhoto(src) ? photoSrcSet(toLogicalPhotoId(src), variant) : undefined);

  return (
    <img
      src={resolvedSrc}
      srcSet={resolvedSrcSet}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={resolvedLoading}
      fetchPriority={resolvedFetchPriority}
      sizes={sizes}
      decoding={priority ? "sync" : "async"}
      className={cn(fill && "object-cover", className)}
      style={fillStyle}
      {...rest}
    />
  );
}
