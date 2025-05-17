"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import { X, ArrowRight, Trophy, Calendar, Users, CheckCircle } from "lucide-react"
import Link from "next/link"
import { useWallet } from "@/contexts/wallet-context"

export default function OrganizerModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean
  onClose: () => void
}) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [signupSuccess, setSignupSuccess] = useState(false)
  const { wallet } = useWallet()

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setEmail("")
      setIsSubmitting(false)
      setSignupSuccess(false)
    }
  }, [isOpen])

  // REMOVED the auto-close effect when wallet is connected
  // We want to show the connected state instead

  if (!isOpen) return null

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false)
      setSignupSuccess(true)
      // In a real app, you would handle the actual signup logic here
    }, 1500)
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

          <h3 className="mb-2 text-2xl font-light text-white">Tournament Organizer</h3>
          <p className="mb-6 text-[#B3EFF5]/80">
            Create and manage tournaments with blockchain-powered security and transparency.
          </p>

          {wallet ? (
            <div className="w-full space-y-4">
              <div className="rounded-lg bg-[#0a1415]/80 border border-[#345D61] p-4 text-left">
                <div className="flex items-center gap-3 mb-2">
                  <Trophy size={20} className="text-[#B3EFF5]" />
                  <h4 className="text-white font-medium">Your Tournaments</h4>
                </div>
                <p className="text-sm text-gray-300">
                  You haven't created any tournaments yet. Start organizing your first event now.
                </p>
              </div>

              <Link
                href="/organizer/dashboard"
                className="block w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#191D1E] via-[#345D61] to-[#191D1E] border border-white/30 text-white hover:bg-opacity-90 transition-all hover:scale-105 text-center"
                onClick={onClose}
              >
                Go to Organizer Dashboard
              </Link>

              <Link
                href="/organizer/create"
                className="block w-full px-6 py-3 rounded-lg bg-[#345D61] text-white hover:bg-[#2B4B4F] transition-all text-center"
                onClick={onClose}
              >
                Create New Tournament
              </Link>
            </div>
          ) : signupSuccess ? (
            <div className="w-full space-y-4">
              <div className="flex flex-col items-center justify-center py-6">
                <div className="mb-4 h-16 w-16 rounded-full bg-[#345D61]/20 flex items-center justify-center">
                  <CheckCircle size={40} className="text-[#B3EFF5]" />
                </div>
                <h4 className="text-xl font-medium text-white mb-2">Account Created!</h4>
                <p className="text-[#B3EFF5]/80 mb-4">Your organizer account has been successfully created.</p>
                <Link
                  href="/organizer/dashboard"
                  className="block w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#191D1E] via-[#345D61] to-[#191D1E] border border-white/30 text-white hover:bg-opacity-90 transition-all hover:scale-105 text-center"
                  onClick={onClose}
                >
                  Continue to Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <div className="w-full space-y-4">
              <p className="text-sm text-gray-300 mb-4">
                Sign up or log in to start creating and managing tournaments on Strikechain.
              </p>

              <form onSubmit={handleEmailSubmit} className="w-full mb-4">
                <div className="relative mb-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 p-3 pr-12 text-white placeholder-gray-400 focus:border-[#B3EFF5] focus:outline-none"
                    required
                    disabled={isSubmitting}
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-[#345D61] p-2 hover:bg-[#2B4B4F] disabled:opacity-50"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    ) : (
                      <ArrowRight size={16} className="text-white" />
                    )}
                  </button>
                </div>
              </form>

              <div className="flex items-center my-4">
                <div className="flex-grow border-t border-gray-700"></div>
                <span className="mx-4 text-sm text-gray-400">or</span>
                <div className="flex-grow border-t border-gray-700"></div>
              </div>

              <Link
                href="/signup"
                className="block w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#191D1E] via-[#345D61] to-[#191D1E] border border-white/30 text-white hover:bg-opacity-90 transition-all hover:scale-105 text-center"
                onClick={onClose}
              >
                Connect Wallet
              </Link>
            </div>
          )}

          <div className="mt-6 flex flex-col gap-3 w-full">
            <div className="flex items-center gap-2 text-sm text-[#B3EFF5]/70">
              <Calendar size={16} />
              <span>Create tournaments with flexible schedules</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-[#B3EFF5]/70">
              <Users size={16} />
              <span>Manage participants and automate prize distribution</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
