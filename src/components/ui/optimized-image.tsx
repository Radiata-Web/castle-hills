import { cn } from "@/lib/utils";
import type { CSSProperties, ImgHTMLAttributes } from "react";

export type OptimizedImageProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "width" | "height"
> & {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  fill?: boolean;
  priority?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  sizes?: string;
  quality?: number;
};

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  fill,
  priority,
  fetchPriority,
  sizes,
  className,
  style,
  loading,
  ...rest
}: OptimizedImageProps) {
  const resolvedLoading = priority ? undefined : loading ?? "lazy";
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

  return (
    <img
      src={src}
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
