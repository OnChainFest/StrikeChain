"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ArrowRight, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useWallet } from "@/contexts/wallet-context"
import type { WalletType } from "@/lib/wallet-mock"
import WalletIcon from "./wallet-icon"

export default function WalletConnectModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [email, setEmail] = useState("")
  const { connectWallet, isConnecting, error, wallet, availableWallets } = useWallet()

  // Reset email when modal opens
  useEffect(() => {
    if (isOpen) {
      setEmail("")
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
      <div className="relative w-full max-w-md rounded-xl bg-gray-900 p-6 text-white shadow-xl">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-400 hover:text-white" aria-label="Close">
          <X size={24} />
        </button>

        <div className="mb-6 flex flex-col items-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-transparent">
            <Image src="/strikechain-logo.png" alt="Strikechain Logo" width={60} height={60} className="w-15 h-15" />
          </div>
          <h2 className="text-2xl font-bold">Connect with Strikechain</h2>
        </div>

        {error && (
          <div className="mb-4 rounded-lg bg-red-900/30 p-3 text-red-200 flex items-center gap-2">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <div className="mb-6 space-y-2">
          {availableWallets.map((wallet) => (
            <button
              key={wallet.id}
              className="flex w-full items-center justify-between rounded-lg border border-gray-700 p-3 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => handleConnectWallet(wallet.id)}
              disabled={isConnecting}
            >
              <div className="flex items-center">
                <div className="mr-4">
                  <WalletIcon src={wallet.logo || "/placeholder.svg"} alt={wallet.name} size={40} />
                </div>
                <span>{wallet.name}</span>
              </div>
            </button>
          ))}
        </div>

        <button
          className="mb-6 w-full rounded-lg border border-gray-700 p-3 text-center hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isConnecting}
        >
          More Wallet Options
        </button>

        <div className="mb-6 flex items-center">
          <div className="flex-grow border-t border-gray-700"></div>
          <span className="mx-4 text-sm text-gray-400">or continue with email</span>
          <div className="flex-grow border-t border-gray-700"></div>
        </div>

        <form onSubmit={handleEmailSubmit} className="mb-6">
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 pr-12 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              required
              disabled={isConnecting}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-blue-600 p-2 hover:bg-blue-700 disabled:opacity-50"
              disabled={isConnecting}
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </form>

        <p className="text-center text-xs text-gray-400">
          By connecting your wallet and using Strikechain, you agree to our{" "}
          <Link href="/terms" className="text-blue-400 hover:underline">
            Terms of Service
          </Link>{" "}
          &{" "}
          <Link href="/privacy" className="text-blue-400 hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  )
}
