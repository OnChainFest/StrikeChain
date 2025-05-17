"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"
import {
  Trophy,
  Calendar,
  Clock,
  Users,
  Share2,
  MapPin,
  Wallet,
  MessageSquare,
  FileText,
  ArrowLeft,
} from "lucide-react"

export default function TournamentDetail() {
  const params = useParams()
  const tournamentId = params.id
  const [activeTab, setActiveTab] = useState<"overview" | "brackets" | "participants" | "rules">("overview")

  // Mock tournament data - in a real app, you would fetch this based on the ID
  const tournament = {
    id: tournamentId,
    name: "Summer Tennis Open",
    organizer: "Bay Area Tennis Club",
    sport: "Tennis",
    participants: 32,
    currentParticipants: 28,
    startDate: "2025-06-15",
    endDate: "2025-06-22",
    prize: "2.5 ETH",
    status: "In Progress",
    nextMatch: "Quarter Finals - June 18, 2:00 PM",
    location: "Bay Area Tennis Club, San Francisco, CA",
    description:
      "Join the premier summer tennis tournament in the Bay Area. This tournament features singles matches in a knockout format. Players of all skill levels are welcome to participate.",
    image: "/tennis-stadium.jpg",
    entryFee: "0.05 ETH",
    rules: [
      "All matches will be best of 3 sets",
      "Tie-breakers will be played at 6-6 in all sets",
      "Players must provide their own rackets",
      "Tournament officials will provide balls",
      "Players must arrive 15 minutes before scheduled match time",
      "No-shows will result in automatic forfeit",
      "Unsportsmanlike conduct may result in disqualification",
    ],
    schedule: [
      { round: "Round 1", date: "June 15, 2025", matches: 16 },
      { round: "Round 2", date: "June 16, 2025", matches: 8 },
      { round: "Quarter Finals", date: "June 18, 2025", matches: 4 },
      { round: "Semi Finals", date: "June 20, 2025", matches: 2 },
      { round: "Finals", date: "June 22, 2025", matches: 1 },
    ],
    prizes: [
      { position: "1st Place", amount: "1.5 ETH" },
      { position: "2nd Place", amount: "0.75 ETH" },
      { position: "Semi-Finalists", amount: "0.125 ETH each" },
    ],
    yourNextMatch: {
      round: "Quarter Finals",
      opponent: "Alex Johnson",
      time: "June 18, 2025, 2:00 PM",
      court: "Court 3",
    },
  }

  // Mock participants data
  const participants = Array.from({ length: 28 }, (_, i) => ({
    id: i + 1,
    name: `Player ${i + 1}`,
    avatar: `/placeholder.svg?height=40&width=40&query=avatar`,
    wins: Math.floor(Math.random() * 3),
    losses: Math.floor(Math.random() * 2),
  }))

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Tournament Hero */}
      <div className="relative h-64 md:h-80">
        <Image src={tournament.image || "/placeholder.svg"} alt={tournament.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <Link
            href="/participant/dashboard"
            className="mb-4 flex items-center gap-2 text-sm text-gray-300 hover:text-white"
          >
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold">{tournament.name}</h1>
          <p className="text-gray-300">{tournament.organizer}</p>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Tournament Status */}
        <div className="mb-8 flex flex-wrap gap-4 md:gap-8">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-900/20">
              <Calendar className="text-[#B3EFF5]" size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Dates</p>
              <p className="text-sm">
                {new Date(tournament.startDate).toLocaleDateString()} -{" "}
                {new Date(tournament.endDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-900/20">
              <Trophy className="text-[#B3EFF5]" size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Prize Pool</p>
              <p className="text-sm font-medium">{tournament.prize}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-900/20">
              <Users className="text-[#B3EFF5]" size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Participants</p>
              <p className="text-sm">
                {tournament.currentParticipants}/{tournament.participants}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-900/20">
              <MapPin className="text-[#B3EFF5]" size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Location</p>
              <p className="text-sm">{tournament.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-900/20">
              <Wallet className="text-[#B3EFF5]" size={20} />
            </div>
            <div>
              <p className="text-xs text-gray-400">Entry Fee</p>
              <p className="text-sm">{tournament.entryFee}</p>
            </div>
          </div>
        </div>

        {/* Your Next Match */}
        <div className="mb-8 rounded-xl border border-gray-800 bg-gradient-to-br from-[#101617] to-[#0a1415] p-6">
          <h2 className="mb-4 text-xl font-bold">Your Next Match</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs text-gray-400">Round</p>
              <p className="text-lg font-medium">{tournament.yourNextMatch.round}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Opponent</p>
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 rounded-full bg-gray-700"></div>
                <p className="text-lg font-medium">{tournament.yourNextMatch.opponent}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-400">Time</p>
              <div className="flex items-center gap-1">
                <Clock size={16} className="text-[#B3EFF5]" />
                <p className="text-lg font-medium">{tournament.yourNextMatch.time}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-gray-400">Location</p>
              <div className="flex items-center gap-1">
                <MapPin size={16} className="text-[#B3EFF5]" />
                <p className="text-lg font-medium">{tournament.yourNextMatch.court}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tournament Tabs */}
        <div className="mb-6 border-b border-gray-800">
          <div className="flex space-x-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`border-b-2 px-1 pb-4 text-sm font-medium ${
                activeTab === "overview"
                  ? "border-[#B3EFF5] text-[#B3EFF5]"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("brackets")}
              className={`border-b-2 px-1 pb-4 text-sm font-medium ${
                activeTab === "brackets"
                  ? "border-[#B3EFF5] text-[#B3EFF5]"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              Brackets
            </button>
            <button
              onClick={() => setActiveTab("participants")}
              className={`border-b-2 px-1 pb-4 text-sm font-medium ${
                activeTab === "participants"
                  ? "border-[#B3EFF5] text-[#B3EFF5]"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              Participants
            </button>
            <button
              onClick={() => setActiveTab("rules")}
              className={`border-b-2 px-1 pb-4 text-sm font-medium ${
                activeTab === "rules"
                  ? "border-[#B3EFF5] text-[#B3EFF5]"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              Rules
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="mb-8">
          {activeTab === "overview" && (
            <div>
              <div className="mb-8">
                <h2 className="mb-4 text-xl font-bold">Tournament Description</h2>
                <p className="text-gray-300">{tournament.description}</p>
              </div>

              <div className="mb-8">
                <h2 className="mb-4 text-xl font-bold">Schedule</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-800">
                        <th className="pb-2 text-left text-sm font-medium text-gray-400">Round</th>
                        <th className="pb-2 text-left text-sm font-medium text-gray-400">Date</th>
                        <th className="pb-2 text-left text-sm font-medium text-gray-400">Matches</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tournament.schedule.map((item, index) => (
                        <tr key={index} className="border-b border-gray-800">
                          <td className="py-3 text-sm">{item.round}</td>
                          <td className="py-3 text-sm">{item.date}</td>
                          <td className="py-3 text-sm">{item.matches}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h2 className="mb-4 text-xl font-bold">Prize Distribution</h2>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  {tournament.prizes.map((prize, index) => (
                    <div key={index} className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
                      <p className="text-sm text-gray-400">{prize.position}</p>
                      <p className="text-xl font-bold">{prize.amount}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "brackets" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Tournament Brackets</h2>
                <div className="flex items-center gap-2">
                  <button className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-1 text-sm hover:bg-gray-700">
                    Round 1
                  </button>
                  <button className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-1 text-sm hover:bg-gray-700">
                    Round 2
                  </button>
                  <button className="rounded-lg border border-[#B3EFF5] bg-gray-800 px-3 py-1 text-sm text-[#B3EFF5]">
                    Quarter Finals
                  </button>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="text-center p-8">
                  <p className="text-gray-400 mb-4">
                    Interactive tournament bracket visualization will be displayed here
                  </p>
                  <p className="text-sm text-gray-500">
                    The bracket shows the progression of matches from the first round through to the finals
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "participants" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">
                  Participants ({tournament.currentParticipants}/{tournament.participants})
                </h2>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search participants..."
                    className="rounded-lg border border-gray-700 bg-gray-800 py-2 pl-4 pr-4 text-sm text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none w-64"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {participants.map((participant) => (
                  <div
                    key={participant.id}
                    className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900/50 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gray-700 overflow-hidden">
                        <Image
                          src={participant.avatar || "/placeholder.svg"}
                          alt={participant.name}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium">{participant.name}</p>
                        <p className="text-xs text-gray-400">
                          {participant.wins} wins, {participant.losses} losses
                        </p>
                      </div>
                    </div>
                    <button className="text-sm text-[#B3EFF5] hover:underline">View</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "rules" && (
            <div>
              <h2 className="mb-4 text-xl font-bold">Tournament Rules</h2>
              <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-[#101617] to-[#0a1415] p-6">
                <ul className="list-disc pl-5 space-y-2">
                  {tournament.rules.map((rule, index) => (
                    <li key={index} className="text-gray-300">
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#191D1E] via-[#345D61] to-[#191D1E] px-6 py-3 font-medium text-white hover:opacity-90 transition-all">
            <MessageSquare size={18} />
            <span>Contact Organizer</span>
          </button>

          <button className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-6 py-3 font-medium text-white hover:bg-gray-700">
            <FileText size={18} />
            <span>Download Schedule</span>
          </button>

          <button className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-6 py-3 font-medium text-white hover:bg-gray-700">
            <Share2 size={18} />
            <span>Share Tournament</span>
          </button>
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
