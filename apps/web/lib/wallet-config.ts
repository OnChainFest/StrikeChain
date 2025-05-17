import { http, createConfig } from "wagmi"
import { mainnet, sepolia } from "wagmi/chains"
import { injected, metaMask, coinbaseWallet } from "wagmi/connectors"

// Configuration that works without a WalletConnect Project ID
export const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
  connectors: [
    metaMask(),
    coinbaseWallet({
      appName: "Strikechain",
    }),
    injected(),
  ],
})
