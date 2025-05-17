import Image from "next/image"

interface WalletIconProps {
  src: string
  alt: string
  size?: number
}

export default function WalletIcon({ src, alt, size = 40 }: WalletIconProps) {
  return (
    <div className="flex items-center justify-center overflow-hidden rounded-md" style={{ width: size, height: size }}>
      <Image src={src || "/placeholder.svg"} alt={alt} width={size} height={size} className="object-contain" />
    </div>
  )
}
