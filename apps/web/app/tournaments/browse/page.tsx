"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  Filter,
  Trophy,
  Calendar,
  Users,
  MapPin,
  ArrowUpRight,
  Clock,
  Wallet,
  ArrowLeft,
  SlidersHorizontal,
} from "lucide-react"
import { useWallet } from "@/contexts/wallet-context"

// Tournament type definition
interface Tournament {
  id: number
  name: string
  organizer: string
  sport: string
  image: string
  startDate: string
  endDate: string
  location: string
  participants: {
    max: number
    current: number
  }
  entryFee: string
  prize: string
  registrationDeadline: string
  featured?: boolean
  tags?: string[]
}

export default function BrowseTournaments() {
  const { wallet } = useWallet()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSport, setSelectedSport] = useState<string | null>(null)
  const [showFilters, setShowFilters] = useState(false)

  // Mock tournament data
  const tournaments: Tournament[] = [
    {
      id: 1,
      name: "Summer Tennis Open",
      organizer: "Costa Rica Tennis Club",
      sport: "Tennis",
      image: "/tennis-stadium.jpg",
      startDate: "2025-06-15",
      endDate: "2025-06-22",
      location: "San José, Costa Rica",
      participants: {
        max: 32,
        current: 28,
      },
      entryFee: "50 USDC",
      prize: "2,500 USDC",
      registrationDeadline: "2025-06-10",
      featured: true,
      tags: ["Singles", "Professional"],
    },
    {
      id: 2,
      name: "Pro Golf Championship",
      organizer: "Reserva Conchal Golf Club",
      sport: "Golf",
      image: "/golf-sunset.jpg",
      startDate: "2025-06-10",
      endDate: "2025-06-20",
      location: "Guanacaste, Costa Rica",
      participants: {
        max: 64,
        current: 42,
      },
      entryFee: "100 USDC",
      prize: "5,000 USDC",
      registrationDeadline: "2025-06-05",
      tags: ["Professional", "18 Holes"],
    },
    {
      id: 3,
      name: "Summer Bowling League",
      organizer: "Bol Cariari",
      sport: "Bowling",
      image: "/bowling-alley.jpg",
      startDate: "2025-07-05",
      endDate: "2025-08-30",
      location: "Heredia, Costa Rica",
      participants: {
        max: 48,
        current: 32,
      },
      entryFee: "30 USDC",
      prize: "1,800 USDC",
      registrationDeadline: "2025-06-30",
      tags: ["Team", "Weekly"],
    },
    {
      id: 4,
      name: "Beach Volleyball Cup",
      organizer: "Jaco Beach Sports",
      sport: "Volleyball",
      image: "/tennis-court.png",
      startDate: "2025-07-15",
      endDate: "2025-07-17",
      location: "Jaco, Costa Rica",
      participants: {
        max: 24,
        current: 16,
      },
      entryFee: "20 USDC",
      prize: "1,200 USDC",
      registrationDeadline: "2025-07-10",
      tags: ["Beach", "Teams of 2"],
    },
    {
      id: 5,
      name: "Winter Golf Classic",
      organizer: "Los Sueños Golf Resort",
      sport: "Golf",
      image: "/golf-course-sunset.png",
      startDate: "2025-12-10",
      endDate: "2025-12-15",
      location: "Puntarenas, Costa Rica",
      participants: {
        max: 32,
        current: 12,
      },
      entryFee: "80 USDC",
      prize: "3,000 USDC",
      registrationDeadline: "2025-12-01",
      tags: ["Professional", "18 Holes"],
    },
    {
      id: 6,
      name: "Tennis Doubles Tournament",
      organizer: "Costa Rica Tennis Club",
      sport: "Tennis",
      image: "/tennis-stadium-full.jpg",
      startDate: "2025-08-05",
      endDate: "2025-08-07",
      location: "Escazú, Costa Rica",
      participants: {
        max: 16,
        current: 10,
      },
      entryFee: "40 USDC",
      prize: "1,500 USDC",
      registrationDeadline: "2025-07-30",
      tags: ["Doubles", "Amateur"],
    },
  ]

  // Available sports for filtering
  const sports = [...new Set(tournaments.map((t) => t.sport))]

  // Filter tournaments based on search query and selected sport
  const filteredTournaments = tournaments.filter((tournament) => {
    const matchesSearch =
      searchQuery === "" ||
      tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tournament.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tournament.location.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesSport = selectedSport === null || tournament.sport === selectedSport

    return matchesSearch && matchesSport
  })

  // Featured tournaments
  const featuredTournaments = tournaments.filter((t) => t.featured)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Back button and page title */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/participant/dashboard"
              className="mb-4 flex items-center gap-2 text-sm text-gray-300 hover:text-white"
            >
              <ArrowLeft size={16} />
              <span>Back to Dashboard</span>
            </Link>
            <h1 className="text-3xl font-bold">Browse Tournaments</h1>
            <p className="text-gray-400">Find and join tournaments in your favorite sports</p>
          </div>

          <div className="mt-4 flex items-center gap-4 md:mt-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search tournaments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-lg border border-gray-700 bg-gray-800 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none w-full md:w-64"
              />
            </div>

            <button
              className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm hover:bg-gray-700"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="mb-8 rounded-xl bg-gradient-to-br from-[#101617] to-[#0a1415] p-6 border border-gray-800">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Filters</h2>
              <button className="text-sm text-[#B3EFF5] hover:underline">Reset</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Sport</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`rounded-full px-3 py-1 text-xs ${selectedSport === null ? "bg-[#345D61] text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
                    onClick={() => setSelectedSport(null)}
                  >
                    All
                  </button>
                  {sports.map((sport) => (
                    <button
                      key={sport}
                      className={`rounded-full px-3 py-1 text-xs ${selectedSport === sport ? "bg-[#345D61] text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
                      onClick={() => setSelectedSport(sport)}
                    >
                      {sport}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Date Range</label>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    className="rounded-lg border border-gray-700 bg-gray-800 py-2 px-3 text-sm text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                  />
                  <span className="text-gray-400">to</span>
                  <input
                    type="date"
                    className="rounded-lg border border-gray-700 bg-gray-800 py-2 px-3 text-sm text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">Entry Fee</label>
                <div className="flex items-center gap-2">
                  <input type="range" min="0" max="200" step="10" className="w-full accent-[#345D61]" />
                  <span className="text-sm">200 USDC</span>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#191D1E] via-[#345D61] to-[#191D1E] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-all border border-white/30">
                <SlidersHorizontal size={16} />
                <span>Apply Filters</span>
              </button>
            </div>
          </div>
        )}

        {/* Featured Tournament */}
        {featuredTournaments.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl font-bold mb-6">Featured Tournament</h2>
            <div className="rounded-xl overflow-hidden border border-gray-800 bg-gradient-to-br from-[#101617] to-[#0a1415]">
              <div className="relative h-80">
                <Image
                  src={featuredTournaments[0].image || "/placeholder.svg"}
                  alt={featuredTournaments[0].name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <div className="flex justify-between items-end">
                    <div>
                      <div className="mb-2 flex flex-wrap gap-2">
                        <span className="rounded-full bg-blue-900/30 px-3 py-1 text-xs text-blue-300">
                          {featuredTournaments[0].sport}
                        </span>
                        <span className="rounded-full bg-green-900/30 px-3 py-1 text-xs text-green-300">Featured</span>
                      </div>
                      <h3 className="text-2xl font-bold">{featuredTournaments[0].name}</h3>
                      <p className="text-gray-300">{featuredTournaments[0].organizer}</p>
                    </div>
                    <Link
                      href={`/tournament/${featuredTournaments[0].id}`}
                      className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#191D1E] via-[#345D61] to-[#191D1E] px-6 py-3 text-sm font-medium text-white hover:opacity-90 transition-all border border-white/30"
                    >
                      View Details
                      <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6">
                <div>
                  <p className="text-xs text-gray-400">Dates</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar size={16} className="text-[#B3EFF5]" />
                    <p className="text-sm">
                      {new Date(featuredTournaments[0].startDate).toLocaleDateString()} -{" "}
                      {new Date(featuredTournaments[0].endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin size={16} className="text-[#B3EFF5]" />
                    <p className="text-sm">{featuredTournaments[0].location}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Prize Pool</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Trophy size={16} className="text-[#B3EFF5]" />
                    <p className="text-sm font-medium">{featuredTournaments[0].prize}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Registration Deadline</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Clock size={16} className="text-[#B3EFF5]" />
                    <p className="text-sm">
                      {new Date(featuredTournaments[0].registrationDeadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* All Tournaments */}
        <div>
          <h2 className="text-xl font-bold mb-6">All Tournaments</h2>

          {filteredTournaments.length === 0 ? (
            <div className="rounded-xl bg-gradient-to-br from-[#101617] to-[#0a1415] p-12 border border-gray-800 text-center">
              <div className="mb-4 h-16 w-16 mx-auto rounded-full bg-[#345D61]/20 flex items-center justify-center">
                <Search size={32} className="text-[#B3EFF5]" />
              </div>
              <h3 className="text-xl font-medium mb-2">No tournaments found</h3>
              <p className="text-gray-400 mb-6">Try adjusting your search or filters to find tournaments</p>
              <button
                onClick={() => {
                  setSearchQuery("")
                  setSelectedSport(null)
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-[#345D61] px-4 py-2 text-sm font-medium text-white hover:bg-[#2B4B4F] transition-all"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTournaments.map((tournament) => (
                <div
                  key={tournament.id}
                  className="overflow-hidden rounded-xl border border-gray-800 bg-gradient-to-br from-[#101617] to-[#0a1415] transition-all hover:border-gray-700 hover:shadow-lg"
                >
                  <div className="relative h-48">
                    <Image
                      src={tournament.image || "/placeholder.svg"}
                      alt={tournament.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="rounded-full bg-blue-900/30 px-3 py-1 text-xs text-blue-300">
                        {tournament.sport}
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 p-4">
                      <h3 className="text-xl font-bold">{tournament.name}</h3>
                      <p className="text-sm text-gray-300">{tournament.organizer}</p>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="mb-4 grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-400">Dates</p>
                        <div className="flex items-center gap-1">
                          <Calendar size={14} className="text-gray-400" />
                          <p className="text-sm">{new Date(tournament.startDate).toLocaleDateString()}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-gray-400">Location</p>
                        <div className="flex items-center gap-1">
                          <MapPin size={14} className="text-gray-400" />
                          <p className="text-sm truncate">{tournament.location}</p>
                        </div>
                      </div>

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
                        <p className="text-xs text-gray-400">Entry Fee</p>
                        <div className="flex items-center gap-1">
                          <Wallet size={14} className="text-gray-400" />
                          <p className="text-sm">{tournament.entryFee}</p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4 rounded-lg bg-gray-800/50 p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-gray-400">Prize Pool</p>
                          <div className="flex items-center gap-1">
                            <Trophy size={14} className="text-[#B3EFF5]" />
                            <p className="text-sm font-medium text-[#B3EFF5]">{tournament.prize}</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-400">Registration Deadline</p>
                          <div className="flex items-center gap-1">
                            <Clock size={14} className="text-[#B3EFF5]" />
                            <p className="text-sm text-[#B3EFF5]">
                              {new Date(tournament.registrationDeadline).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {tournament.tags && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {tournament.tags.map((tag, index) => (
                          <span key={index} className="rounded-full bg-gray-800 px-2 py-1 text-xs text-gray-300">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      href={`/tournament/${tournament.id}`}
                      className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#191D1E] via-[#345D61] to-[#191D1E] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-all border border-white/30"
                    >
                      View Tournament
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 bg-[#101617] py-6 mt-12">
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
