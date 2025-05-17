// This is a simplified mock of wallet functionality for demonstration purposes
export type WalletType = "metamask" | "coinbase" | "injected" | "rainbow" | "trust"

export interface WalletInfo {
  id: WalletType
  name: string
  logo: string
  installed?: boolean
}

export interface ConnectedWallet {
  address: string
  walletType: WalletType
  chainId: number
}

// Mock function to check if a wallet is installed
export function isWalletInstalled(walletId: WalletType): boolean {
  if (typeof window === "undefined") return false

  switch (walletId) {
    case "metamask":
      return typeof window.ethereum?.isMetaMask === "boolean" ? window.ethereum.isMetaMask : false
    case "coinbase":
      return typeof window.ethereum?.isCoinbaseWallet === "boolean" ? window.ethereum.isCoinbaseWallet : false
    case "rainbow":
      return typeof window.ethereum?.isRainbow === "boolean" ? window.ethereum.isRainbow : false
    case "trust":
      return typeof window.ethereum?.isTrust === "boolean" ? window.ethereum.isTrust : false
    default:
      return typeof window.ethereum !== "undefined"
  }
}

// Mock available wallets - reordered to put Coinbase first
export const availableWallets: WalletInfo[] = [
  {
    id: "coinbase",
    name: "Coinbase Wallet",
    logo: "/wallets/coinbase-wallet.png",
  },
  {
    id: "metamask",
    name: "MetaMask",
    logo: "/wallets/metamask-fox.png",
  },
  {
    id: "trust",
    name: "Trust Wallet",
    logo: "/wallets/trust-wallet.png",
  },
  {
    id: "rainbow",
    name: "Rainbow Wallet",
    logo: "/wallets/rainbow-wallet.png",
  },
]

// Mock function to connect to a wallet
export async function connectWallet(walletId: WalletType): Promise<ConnectedWallet> {
  // In a real implementation, this would connect to the actual wallet
  // For demo purposes, we'll just return a mock wallet after a short delay
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simulate a 90% success rate
      if (Math.random() > 0.1) {
        resolve({
          address: `0x${Array.from({ length: 40 }, () => Math.floor(Math.random() * 16).toString(16)).join("")}`,
          walletType: walletId,
          chainId: 1, // Ethereum mainnet
        })
      } else {
        reject(new Error("Failed to connect to wallet"))
      }
    }, 1000) // Simulate network delay
  })
}

// Mock function to disconnect wallet
export function disconnectWallet(): void {
  // In a real implementation, this would disconnect from the actual wallet
  console.log("Wallet disconnected")
}

// Format address for display
export function formatAddress(address: string): string {
  if (!address) return ""
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}
