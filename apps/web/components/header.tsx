"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { WalletStatus } from "@/components/wallet-status"
import { useWallet } from "@/contexts/wallet-context"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { wallet } = useWallet()

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-[#101617] backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/strikechain-logo.png" alt="Strikechain Logo" width={40} height={40} className="w-10 h-10" />
            <span className="text-xl font-bold text-white">Strikechain</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/tournaments/browse" className="text-sm text-white hover:text-gray-300">
              Browse Tournaments
            </Link>
            <Link href="/organizer/dashboard" className="text-sm text-white hover:text-gray-300">
              Organizer Dashboard
            </Link>
            <Link href="/participant/dashboard" className="text-sm text-white hover:text-gray-300">
              Participant Dashboard
            </Link>

            {wallet ? (
              <WalletStatus />
            ) : (
              <Link href="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm">
                Sign Up
              </Link>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-gray-800 mt-4">
            <nav className="flex flex-col gap-4">
              <Link
                href="/tournaments/browse"
                className="text-sm text-white hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Tournaments
              </Link>
              <Link
                href="/organizer/dashboard"
                className="text-sm text-white hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Organizer Dashboard
              </Link>
              <Link
                href="/participant/dashboard"
                className="text-sm text-white hover:text-gray-300"
                onClick={() => setIsMenuOpen(false)}
              >
                Participant Dashboard
              </Link>

              {wallet ? (
                <div className="py-2">
                  <WalletStatus />
                </div>
              ) : (
                <Link
                  href="/signup"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm inline-block w-fit"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
