"use client"

import { useState } from "react"
import Image, { type ImageProps } from "next/image"

interface ImageWithShimmerProps extends Omit<ImageProps, "src"> {
  src: string
}

export default function ImageWithShimmer({ src, alt, ...props }: ImageWithShimmerProps) {
  const [isLoading, setLoading] = useState(true)

  // Use placeholder if src is not available
  const imageSrc =
    src ||
    `/placeholder.svg?height=${props.height || 400}&width=${props.width || 600}&query=${encodeURIComponent(alt || "placeholder image")}`

  return (
    <div className="relative overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 animate-pulse">
          <span className="sr-only">Loading...</span>
        </div>
      )}
      <Image
        src={imageSrc || "/placeholder.svg"}
        alt={alt}
        quality={100}
        onLoadingComplete={() => setLoading(false)}
        className={`
          duration-700 ease-in-out
          ${isLoading ? "scale-110 blur-2xl grayscale" : "scale-100 blur-0 grayscale-0"}
          ${props.className || ""}
        `}
        {...props}
      />
    </div>
  )
}
