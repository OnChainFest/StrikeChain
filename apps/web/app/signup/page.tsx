"use client"

import { useState } from "react"
import Link from "next/link"
import WalletConnectModal from "@/components/wallet-connect-modal"

export default function SignUp() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">

      <main className="flex flex-grow items-center justify-center">
        <div className="w-full max-w-md p-6 text-center">
          <h1 className="mb-8 text-4xl font-bold">Join Strikechain</h1>
          <p className="mb-8 text-gray-300">
            Connect your wallet or sign up with email to start organizing and participating in tournaments on the
            blockchain.
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700"
          >
            Connect Wallet
          </button>
        </div>
      </main>

      <WalletConnectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
