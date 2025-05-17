"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useWallet } from "@/contexts/wallet-context"
import type { WalletType } from "@/lib/wallet-mock"
import WalletIcon from "./wallet-icon"

export default function AccountAccessModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [email, setEmail] = useState("")
  const [userType, setUserType] = useState<"organizer" | "participant">("participant")
  const [accessMethod, setAccessMethod] = useState<"email" | "wallet">("email")
  const { connectWallet, isConnecting, error, wallet, availableWallets } = useWallet()

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setEmail("")
      // Don't reset userType and accessMethod to preserve user's preference
    }
  }, [isOpen])

  // Use useEffect to close modal when wallet is connected
  useEffect(() => {
    if (wallet && isOpen) {
      onClose()
    }
  }, [wallet, isOpen, onClose])

  if (!isOpen) return null

  const handleConnectWallet = async (walletId: WalletType) => {
    try {
      await connectWallet(walletId)
    } catch (e) {
      // Error is handled in the context
    }
  }

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement email login/signup logic here
    console.log(`Continuing with email: ${email}`)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      onClick={(e) => {
        // Close modal when clicking on backdrop
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-[#101617] to-[#0a1415] p-6 shadow-xl">
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

          <h3 className="mb-4 text-2xl font-light text-white">
            {userType === "organizer" ? "Organizer Sign Up" : "Participant Sign Up"}
          </h3>

          {/* User Type Selection */}
          <div className="mb-6 grid grid-cols-2 gap-3 w-full">
            <button
              className={`rounded-lg border px-4 py-3 text-center transition-all ${
                userType === "participant"
                  ? "border-[#B3EFF5] bg-[#0a1415] text-[#B3EFF5]"
                  : "border-gray-700 text-gray-400 hover:bg-gray-900"
              }`}
              onClick={() => setUserType("participant")}
            >
              Participant
            </button>
            <button
              className={`rounded-lg border px-4 py-3 text-center transition-all ${
                userType === "organizer"
                  ? "border-[#B3EFF5] bg-[#0a1415] text-[#B3EFF5]"
                  : "border-gray-700 text-gray-400 hover:bg-gray-900"
              }`}
              onClick={() => setUserType("organizer")}
            >
              Organizer
            </button>
          </div>

          {/* Access Method Selection */}
          <div className="mb-6 grid grid-cols-2 gap-3 w-full">
            <button
              className={`rounded-lg border px-4 py-2 text-center text-sm transition-all ${
                accessMethod === "email"
                  ? "border-[#B3EFF5] bg-[#0a1415] text-[#B3EFF5]"
                  : "border-gray-700 text-gray-400 hover:bg-gray-900"
              }`}
              onClick={() => setAccessMethod("email")}
            >
              Email Login
            </button>
            <button
              className={`rounded-lg border px-4 py-2 text-center text-sm transition-all ${
                accessMethod === "wallet"
                  ? "border-[#B3EFF5] bg-[#0a1415] text-[#B3EFF5]"
                  : "border-gray-700 text-gray-400 hover:bg-gray-900"
              }`}
              onClick={() => setAccessMethod("wallet")}
            >
              Connect Wallet
            </button>
          </div>

          {accessMethod === "email" ? (
            <form onSubmit={handleEmailSubmit} className="w-full mb-6">
              <div className="relative mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 pr-12 text-white placeholder-gray-400 focus:border-[#B3EFF5] focus:outline-none"
                  required
                  disabled={isConnecting}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[#345D61] p-2 hover:bg-[#2B4B4F] disabled:opacity-50"
                  disabled={isConnecting}
                >
                  <ArrowRight size={16} className="text-white" />
                </button>
              </div>
            </form>
          ) : (
            <div className="w-full mb-6 space-y-3">
              {/* Base Wallet */}
              <button
                className="flex w-full items-center justify-between rounded-lg border border-gray-700 p-3 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleConnectWallet("coinbase")}
                disabled={isConnecting}
              >
                <div className="flex items-center">
                  <div className="mr-4">
                    <WalletIcon src="/wallets/coinbase-wallet.png" alt="Base Wallet" size={40} />
                  </div>
                  <span>Base Wallet</span>
                </div>
              </button>

              {/* Trust Wallet */}
              <button
                className="flex w-full items-center justify-between rounded-lg border border-gray-700 p-3 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleConnectWallet("trust")}
                disabled={isConnecting}
              >
                <div className="flex items-center">
                  <div className="mr-4">
                    <WalletIcon src="/wallets/trust-wallet.png" alt="Trust Wallet" size={40} />
                  </div>
                  <span>Trust Wallet</span>
                </div>
              </button>

              {/* MetaMask */}
              <button
                className="flex w-full items-center justify-between rounded-lg border border-gray-700 p-3 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleConnectWallet("metamask")}
                disabled={isConnecting}
              >
                <div className="flex items-center">
                  <div className="mr-4">
                    <WalletIcon src="/wallets/metamask-fox.png" alt="MetaMask" size={40} />
                  </div>
                  <span>MetaMask</span>
                </div>
              </button>

              {/* Rainbow */}
              <button
                className="flex w-full items-center justify-between rounded-lg border border-gray-700 p-3 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleConnectWallet("rainbow")}
                disabled={isConnecting}
              >
                <div className="flex items-center">
                  <div className="mr-4">
                    <WalletIcon src="/wallets/rainbow-wallet.png" alt="Rainbow" size={40} />
                  </div>
                  <span>Rainbow</span>
                </div>
              </button>

              {/* More Wallet Options */}
              <button
                className="w-full rounded-lg border border-gray-700 p-3 text-center hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isConnecting}
              >
                More Wallet Options
              </button>

              {error && <div className="mt-4 rounded-lg bg-red-900/30 p-3 text-sm text-red-200">{error}</div>}
            </div>
          )}

          <p className="text-center text-xs text-gray-400">
            By continuing, you agree to Strikechain's{" "}
            <Link href="/terms" className="text-[#B3EFF5] hover:underline">
              Terms of Service
            </Link>{" "}
            &{" "}
            <Link href="/privacy" className="text-[#B3EFF5] hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
