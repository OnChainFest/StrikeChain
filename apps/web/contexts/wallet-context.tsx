"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  type WalletType,
  type ConnectedWallet,
  connectWallet as connectWalletMock,
  disconnectWallet as disconnectWalletMock,
  isWalletInstalled,
  availableWallets,
} from "@/lib/wallet-mock"

interface WalletContextType {
  wallet: ConnectedWallet | null
  isConnecting: boolean
  error: string | null
  connectWallet: (walletId: WalletType) => Promise<void>
  disconnectWallet: () => void
  isWalletInstalled: (walletId: WalletType) => boolean
  availableWallets: typeof availableWallets
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<ConnectedWallet | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Check for saved wallet on mount
  useEffect(() => {
    const savedWallet = localStorage.getItem("connectedWallet")
    if (savedWallet) {
      try {
        setWallet(JSON.parse(savedWallet))
      } catch (e) {
        localStorage.removeItem("connectedWallet")
      }
    }
  }, [])

  // Connect to wallet
  const connectWallet = async (walletId: WalletType) => {
    setIsConnecting(true)
    setError(null)

    try {
      const connectedWallet = await connectWalletMock(walletId)
      setWallet(connectedWallet)
      localStorage.setItem("connectedWallet", JSON.stringify(connectedWallet))
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to connect wallet")
      console.error(e)
    } finally {
      setIsConnecting(false)
    }
  }

  // Disconnect wallet
  const disconnectWallet = () => {
    disconnectWalletMock()
    setWallet(null)
    localStorage.removeItem("connectedWallet")
  }

  return (
    <WalletContext.Provider
      value={{
        wallet,
        isConnecting,
        error,
        connectWallet,
        disconnectWallet,
        isWalletInstalled,
        availableWallets,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
