"use client"

import { useState } from "react"
import { LogOut, ChevronDown } from "lucide-react"
import { useWallet } from "@/contexts/wallet-context"
import { formatAddress } from "@/lib/wallet-mock"

export function WalletStatus() {
  const { wallet, disconnectWallet } = useWallet()
  const [isOpen, setIsOpen] = useState(false)

  if (!wallet) {
    return null
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-2 text-sm hover:bg-gray-700"
      >
        <span className="h-2 w-2 rounded-full bg-green-500"></span>
        <span>{formatAddress(wallet.address)}</span>
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md bg-gray-800 py-1 shadow-lg">
          <button
            onClick={() => {
              disconnectWallet()
              setIsOpen(false)
            }}
            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-white hover:bg-gray-700"
          >
            <LogOut size={16} />
            Disconnect
          </button>
        </div>
      )}
    </div>
  )
}
