"use client"

import { X } from "lucide-react"
import { useEffect, useRef } from "react"
import Image from "next/image"

interface MobileAppPopupProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileAppPopup({ isOpen, onClose }: MobileAppPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null)

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div
        ref={popupRef}
        className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-[#101617] to-[#0a1415] p-6 shadow-xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="mb-6 flex items-center justify-center">
            <div className="relative h-20 w-20">
              <Image src="/logo-transparent.png" alt="Strikechain Logo" fill className="object-contain" sizes="80px" />
              <div className="absolute inset-0 rounded-full bg-[#0a5d6b] opacity-30 blur-xl"></div>
            </div>
          </div>

          <h3 className="mb-2 text-2xl font-light text-white">Mobile App Coming Soon</h3>

          <p className="mb-6 text-[#B3EFF5]/80">
            Our mobile application is currently under development. We're working hard to bring you the best experience
            on your mobile devices.
          </p>

          <div className="flex items-center gap-4 mb-4">
            <div className="w-[100px] h-[100px] rounded-[11px] bg-white p-1">
              <Image src="/qr-code.png" alt="QR Code" width={92} height={92} className="w-full h-full object-contain" />
            </div>
            <div className="text-left">
              <p className="text-[#B3EFF5] text-lg font-light mb-2">Scan to join waitlist</p>
              <p className="text-[#B3EFF5]/70 text-sm">Be the first to know when our mobile app launches</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="mt-4 px-8 py-3 rounded-full bg-gradient-to-r from-[#191D1E] via-[#345D61] to-[#191D1E] border border-white/30 text-white hover:bg-opacity-90 transition-all hover:scale-105"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  )
}
