"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Trophy,
  Calendar,
  Clock,
  Users,
  Medal,
  Wallet,
  Search,
  ArrowUpRight,
  Plus,
  Edit,
  Trash2,
  BarChart3,
  Settings,
} from "lucide-react"
import { useWallet } from "@/contexts/wallet-context"

export default function OrganizerDashboard() {
  const { wallet } = useWallet()
  const [activeTab, setActiveTab] = useState<"active" | "upcoming" | "past">("active")

  // Mock data for tournaments
  const activeTournaments = [
    {
      id: 1,
      name: "Summer Tennis Open",
      sport: "Tennis",
      participants: {
        max: 32,
        current: 28,
      },
      startDate: "2025-06-15",
      endDate: "2025-06-22",
      prize: "2.5 USDC",
      status: "In Progress",
      currentRound: "Quarter Finals",
      registrations: 28,
      budget: "1.4 USDC",
      image: "/tennis-stadium.jpg",
    },
    {
      id: 2,
      name: "Pro Golf Championship",
      sport: "Golf",
      participants: {
        max: 64,
        current: 42,
      },
      startDate: "2025-06-10",
      endDate: "2025-06-20",
      prize: "5.0 USDC",
      status: "In Progress",
      currentRound: "Round 3",
      registrations: 42,
      budget: "4.2 USDC",
      image: "/golf-course-sunset.png",
    },
  ]

  const upcomingTournaments = [
    {
      id: 3,
      name: "Summer Bowling League",
      sport: "Bowling",
      participants: {
        max: 48,
        current: 12,
      },
      startDate: "2025-07-05",
      endDate: "2025-08-30",
      prize: "1.8 USDC",
      registrationDeadline: "2025-06-30",
      registrations: 12,
      budget: "0.36 USDC",
      image: "/bowling-alley.jpg",
    },
    {
      id: 4,
      name: "Beach Volleyball Cup",
      sport: "Volleyball",
      participants: {
        max: 24,
        current: 8,
      },
      startDate: "2025-07-15",
      endDate: "2025-07-17",
      prize: "1.2 USDC",
      registrationDeadline: "2025-07-10",
      registrations: 8,
      budget: "0.16 USDC",
      image: "/tennis-court.png",
    },
  ]

  const pastTournaments = [
    {
      id: 5,
      name: "Spring Tennis Tournament",
      sport: "Tennis",
      participants: {
        max: 16,
        current: 16,
      },
      startDate: "2025-04-10",
      endDate: "2025-04-12",
      prize: "1.0 USDC",
      winner: "Alex Johnson",
      registrations: 16,
      budget: "0.8 USDC",
      image: "/tennis-stadium-full.jpg",
    },
    {
      id: 6,
      name: "Winter Golf Classic",
      sport: "Golf",
      participants: {
        max: 32,
        current: 32,
      },
      startDate: "2025-01-15",
      endDate: "2025-01-20",
      prize: "3.0 USDC",
      winner: "Maria Rodriguez",
      registrations: 32,
      budget: "3.2 USDC",
      image: "/golf-course-sunset.png",
    },
  ]

  // Get tournaments based on active tab
  const getTournaments = () => {
    switch (activeTab) {
      case "active":
        return activeTournaments
      case "upcoming":
        return upcomingTournaments
      case "past":
        return pastTournaments
      default:
        return activeTournaments
    }
  }

  // Calculate total stats
  const totalTournaments = activeTournaments.length + upcomingTournaments.length + pastTournaments.length
  const totalParticipants = [...activeTournaments, ...upcomingTournaments, ...pastTournaments].reduce(
    (sum, tournament) => sum + tournament.participants.current,
    0,
  )

  const totalBudget = [...activeTournaments, ...upcomingTournaments, ...pastTournaments].reduce((sum, tournament) => {
    const budget = Number.parseFloat(tournament.budget.split(" ")[0])
    return sum + budget
  }, 0)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Organizer Dashboard</h1>
            <p className="text-gray-400">Manage your tournaments and track performance</p>
          </div>

          <div className="mt-4 flex items-center gap-4 md:mt-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search tournaments..."
                className="rounded-lg border border-gray-700 bg-gray-800 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none w-full md:w-64"
              />
            </div>

            <Link
              href="/organizer/create"
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#191D1E] via-[#345D61] to-[#191D1E] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-all border border-white/30"
            >
              <Plus size={16} />
              <span>Create Tournament</span>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-gradient-to-br from-[#101617] to-[#0a1415] p-6 border border-gray-800">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-900/20">
              <Trophy className="text-[#B3EFF5]" size={24} />
            </div>
            <h3 className="text-lg font-medium">Tournaments</h3>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-3xl font-bold">{totalTournaments}</p>
              <div className="flex items-center text-green-400 text-sm">
                <span>+2 this month</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-[#101617] to-[#0a1415] p-6 border border-gray-800">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-900/20">
              <Users className="text-[#B3EFF5]" size={24} />
            </div>
            <h3 className="text-lg font-medium">Participants</h3>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-3xl font-bold">{totalParticipants}</p>
              <div className="flex items-center text-green-400 text-sm">
                <span>+20 this month</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-[#101617] to-[#0a1415] p-6 border border-gray-800">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-900/20">
              <Wallet className="text-[#B3EFF5]" size={24} />
            </div>
            <h3 className="text-lg font-medium">Budget</h3>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-3xl font-bold">{totalBudget.toFixed(1)} USDC</p>
              <div className="flex items-center text-green-400 text-sm">
                <span>≈ ${totalBudget.toLocaleString()}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-gradient-to-br from-[#101617] to-[#0a1415] p-6 border border-gray-800">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-orange-900/20">
              <Calendar className="text-[#B3EFF5]" size={24} />
            </div>
            <h3 className="text-lg font-medium">Upcoming</h3>
            <div className="mt-2 flex items-end justify-between">
              <p className="text-3xl font-bold">{upcomingTournaments.length}</p>
              <div className="flex items-center text-blue-400 text-sm">
                <span>
                  Next:{" "}
                  {new Date(upcomingTournaments[0]?.startDate || Date.now()).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tournament Tabs */}
        <div className="mb-6 border-b border-gray-800">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("active")}
              className={`border-b-2 px-1 pb-4 text-sm font-medium ${
                activeTab === "active"
                  ? "border-[#B3EFF5] text-[#B3EFF5]"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              Active Tournaments
            </button>
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`border-b-2 px-1 pb-4 text-sm font-medium ${
                activeTab === "upcoming"
                  ? "border-[#B3EFF5] text-[#B3EFF5]"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              Upcoming Tournaments
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`border-b-2 px-1 pb-4 text-sm font-medium ${
                activeTab === "past"
                  ? "border-[#B3EFF5] text-[#B3EFF5]"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              Past Tournaments
            </button>
          </div>
        </div>

        {/* Tournament Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {getTournaments().map((tournament) => (
            <div
              key={tournament.id}
              className="overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-br from-[#101617] to-[#0a1415]"
            >
              <div className="relative h-48">
                <Image
                  src={tournament.image || "/placeholder.svg"}
                  alt={tournament.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-xl font-bold">{tournament.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="rounded-full bg-blue-900/30 px-3 py-1 text-xs text-blue-300">
                      {tournament.sport}
                    </span>
                    {activeTab === "active" && (
                      <span className="rounded-full bg-green-900/30 px-3 py-1 text-xs text-green-300">
                        {tournament.status}
                      </span>
                    )}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button className="rounded-full bg-gray-800/80 p-2 text-white hover:bg-gray-700/80 transition-colors">
                    <Edit size={16} />
                  </button>
                  {activeTab !== "past" && (
                    <button className="rounded-full bg-gray-800/80 p-2 text-white hover:bg-red-900/80 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-4">
                <div className="mb-4 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400">Participants</p>
                    <div className="flex items-center gap-1">
                      <Users size={14} className="text-gray-400" />
                      <p className="text-sm">
                        {tournament.participants.current}/{tournament.participants.max}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Prize Pool</p>
                    <p className="text-sm font-medium">{tournament.prize}</p>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Start Date</p>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-gray-400" />
                      <p className="text-sm">{new Date(tournament.startDate).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">End Date</p>
                    <div className="flex items-center gap-1">
                      <Calendar size={14} className="text-gray-400" />
                      <p className="text-sm">{new Date(tournament.endDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {activeTab === "active" && (
                  <div className="mb-4 rounded-lg bg-gray-800/50 p-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs text-gray-400">Current Round</p>
                        <div className="flex items-center gap-1">
                          <Trophy size={14} className="text-[#B3EFF5]" />
                          <p className="text-sm text-[#B3EFF5]">{tournament.currentRound}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Budget</p>
                        <div className="flex items-center gap-1">
                          <Wallet size={14} className="text-[#B3EFF5]" />
                          <p className="text-sm text-[#B3EFF5]">{tournament.budget}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "upcoming" && (
                  <div className="mb-4 rounded-lg bg-gray-800/50 p-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs text-gray-400">Registration Deadline</p>
                        <div className="flex items-center gap-1">
                          <Clock size={14} className="text-[#B3EFF5]" />
                          <p className="text-sm text-[#B3EFF5]">
                            {new Date(tournament.registrationDeadline!).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Current Budget</p>
                        <div className="flex items-center gap-1">
                          <Wallet size={14} className="text-[#B3EFF5]" />
                          <p className="text-sm text-[#B3EFF5]">{tournament.budget}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "past" && (
                  <div className="mb-4 rounded-lg bg-gray-800/50 p-3">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-xs text-gray-400">Winner</p>
                        <div className="flex items-center gap-1">
                          <Medal size={14} className="text-[#B3EFF5]" />
                          <p className="text-sm text-[#B3EFF5]">{tournament.winner}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Total Budget</p>
                        <div className="flex items-center gap-1">
                          <Wallet size={14} className="text-[#B3EFF5]" />
                          <p className="text-sm text-[#B3EFF5]">{tournament.budget}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Link
                    href={`/tournament/${tournament.id}/manage`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#191D1E] via-[#345D61] to-[#191D1E] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-all border border-white/30"
                  >
                    {activeTab === "active" ? (
                      <>Manage Tournament</>
                    ) : activeTab === "upcoming" ? (
                      <>Edit Tournament</>
                    ) : (
                      <>View Results</>
                    )}
                    <ArrowUpRight size={14} />
                  </Link>

                  {activeTab === "active" && (
                    <Link
                      href={`/tournament/${tournament.id}/analytics`}
                      className="flex items-center justify-center rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm hover:bg-gray-700"
                    >
                      <BarChart3 size={16} />
                    </Link>
                  )}

                  {activeTab === "upcoming" && (
                    <Link
                      href={`/tournament/${tournament.id}/settings`}
                      className="flex items-center justify-center rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm hover:bg-gray-700"
                    >
                      <Settings size={16} />
                    </Link>
                  )}

                  {activeTab === "past" && (
                    <Link
                      href={`/tournament/${tournament.id}/analytics`}
                      className="flex items-center justify-center rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm hover:bg-gray-700"
                    >
                      <BarChart3 size={16} />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-[#101617] py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <Image src="/strikechain-logo.png" alt="Strikechain Logo" width={24} height={24} className="w-6 h-6" />
              <span className="text-sm font-medium">Strikechain</span>
            </div>

            <div className="flex gap-6">
              <Link href="/terms" className="text-sm text-gray-400 hover:text-white">
                Terms
              </Link>
              <Link href="/privacy" className="text-sm text-gray-400 hover:text-white">
                Privacy
              </Link>
              <Link href="/support" className="text-sm text-gray-400 hover:text-white">
                Support
              </Link>
            </div>

            <div className="text-sm text-gray-400">© 2025 Strikechain. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
