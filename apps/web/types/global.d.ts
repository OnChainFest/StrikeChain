interface Window {
  ethereum?: {
    isMetaMask?: boolean
    isCoinbaseWallet?: boolean
    isRainbow?: boolean
    isTrust?: boolean
    request?: (args: { method: string; params?: any[] }) => Promise<any>
  }
}
