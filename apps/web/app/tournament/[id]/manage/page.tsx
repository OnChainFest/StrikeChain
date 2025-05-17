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
  Bell,
  Share2,
  MapPin,
  Wallet,
  MessageSquare,
  FileText,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Edit,
  BarChart3,
  UserPlus,
  RefreshCw,
  Search,
} from "lucide-react"

export default function TournamentManagement() {
  const params = useParams()
  const tournamentId = params.id
  const [activeTab, setActiveTab] = useState<"overview" | "matches" | "participants" | "settings">("matches")

  // Mock tournament data - in a real app, you would fetch this based on the ID
  const tournament = {
    id: tournamentId,
    name: "Summer Tennis Open",
    organizer: "Costa Rica Tennis Club",
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
    location: "Costa Rica Tennis Club, San José, Costa Rica",
    description:
      "Join the premier summer tennis tournament in the Bay Area. This tournament features singles matches in a knockout format. Players of all skill levels are welcome to participate.",
    image: "/tennis-stadium.jpg",
    entryFee: "0.05 USDC",
    budget: "1,400 USDC",
    matches: [
      {
        id: 1,
        round: "Quarter Finals",
        player1: "Carlos Rodríguez",
        player2: "Alejandro Chacón",
        scheduledTime: "June 18, 2025, 2:00 PM",
        court: "Court 3",
        status: "Scheduled",
        result: null,
      },
      {
        id: 2,
        round: "Quarter Finals",
        player1: "María Jiménez",
        player2: "Sofía Mora",
        scheduledTime: "June 18, 2025, 4:00 PM",
        court: "Court 1",
        status: "Scheduled",
        result: null,
      },
      {
        id: 3,
        round: "Quarter Finals",
        player1: "Diego Vargas",
        player2: "José Hernández",
        scheduledTime: "June 19, 2025, 1:00 PM",
        court: "Court 2",
        status: "Scheduled",
        result: null,
      },
      {
        id: 4,
        round: "Quarter Finals",
        player1: "Gabriela Castro",
        player2: "Ana Jiménez",
        scheduledTime: "June 19, 2025, 3:00 PM",
        court: "Court 1",
        status: "Scheduled",
        result: null,
      },
      {
        id: 5,
        round: "Round of 16",
        player1: "Carlos Rodríguez",
        player2: "Roberto Torres",
        scheduledTime: "June 16, 2025, 2:00 PM",
        court: "Court 2",
        status: "Completed",
        result: {
          winner: "Carlos Rodríguez",
          score: "6-4, 7-5",
        },
      },
      {
        id: 6,
        round: "Round of 16",
        player1: "Alejandro Chacón",
        player2: "Javier Solís",
        scheduledTime: "June 16, 2025, 4:00 PM",
        court: "Court 3",
        status: "Completed",
        result: {
          winner: "Alejandro Chacón",
          score: "6-3, 6-2",
        },
      },
    ],
    participants: [
      { id: 1, name: "Carlos Rodríguez", status: "Active", matches: 2, wins: 2 },
      { id: 2, name: "Alejandro Chacón", status: "Active", matches: 2, wins: 2 },
      { id: 3, name: "María Jiménez", status: "Active", matches: 1, wins: 1 },
      { id: 4, name: "Sofía Mora", status: "Active", matches: 1, wins: 1 },
      { id: 5, name: "Diego Vargas", status: "Active", matches: 1, wins: 1 },
      { id: 6, name: "José Hernández", status: "Active", matches: 1, wins: 1 },
      { id: 7, name: "Gabriela Castro", status: "Active", matches: 1, wins: 1 },
      { id: 8, name: "Ana Jiménez", status: "Active", matches: 1, wins: 1 },
      { id: 9, name: "Roberto Torres", status: "Eliminated", matches: 1, wins: 0 },
      { id: 10, name: "Javier Solís", status: "Eliminated", matches: 1, wins: 0 },
    ],
  }

  // Filter matches by status
  const upcomingMatches = tournament.matches.filter((match) => match.status === "Scheduled")
  const completedMatches = tournament.matches.filter((match) => match.status === "Completed")

  return (
    <div className="min-h-screen bg-black text-white">

      {/* Tournament Hero */}
      <div className="relative h-64 md:h-80">
        <Image src={tournament.image || "/placeholder.svg"} alt={tournament.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <Link
            href="/organizer/dashboard"
            className="mb-4 flex items-center gap-2 text-sm text-gray-300 hover:text-white"
          >
            <ArrowLeft size={16} />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-bold">{tournament.name}</h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="rounded-full bg-blue-900/30 px-3 py-1 text-xs text-blue-300">{tournament.sport}</span>
            <span className="rounded-full bg-green-900/30 px-3 py-1 text-xs text-green-300">{tournament.status}</span>
          </div>
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
                {tournament.participants.current}/{tournament.participants.max}
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
              <p className="text-xs text-gray-400">Budget</p>
              <p className="text-sm">{tournament.budget}</p>
            </div>
          </div>
        </div>

        {/* Tournament Status */}
        <div className="mb-8 rounded-xl border border-gray-800 bg-gradient-to-br from-[#101617] to-[#0a1415] p-6">
          <h2 className="mb-4 text-xl font-bold">Tournament Status</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs text-gray-400">Current Round</p>
              <p className="text-lg font-medium">{tournament.currentRound}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Upcoming Matches</p>
              <p className="text-lg font-medium">{upcomingMatches.length}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Completed Matches</p>
              <p className="text-lg font-medium">{completedMatches.length}</p>
            </div>

            <div>
              <p className="text-xs text-gray-400">Active Participants</p>
              <p className="text-lg font-medium">
                {tournament.participants.filter((p) => p.status === "Active").length}
              </p>
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
              onClick={() => setActiveTab("matches")}
              className={`border-b-2 px-1 pb-4 text-sm font-medium ${
                activeTab === "matches"
                  ? "border-[#B3EFF5] text-[#B3EFF5]"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              Matches
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
              onClick={() => setActiveTab("settings")}
              className={`border-b-2 px-1 pb-4 text-sm font-medium ${
                activeTab === "settings"
                  ? "border-[#B3EFF5] text-[#B3EFF5]"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              Settings
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
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Tournament Progress</h2>
                  <Link
                    href={`/tournament/${tournamentId}/analytics`}
                    className="flex items-center gap-2 text-sm text-[#B3EFF5] hover:underline"
                  >
                    <BarChart3 size={16} />
                    <span>View Analytics</span>
                  </Link>
                </div>
                <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-[#101617] to-[#0a1415] p-6">
                  <div className="mb-6">
                    <p className="text-sm text-gray-400 mb-2">Tournament Completion</p>
                    <div className="h-4 w-full rounded-full bg-gray-800">
                      <div
                        className="h-4 rounded-full bg-gradient-to-r from-[#191D1E] via-[#345D61] to-[#191D1E]"
                        style={{ width: "50%" }}
                      ></div>
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-gray-400">
                      <span>Start: {new Date(tournament.startDate).toLocaleDateString()}</span>
                      <span>End: {new Date(tournament.endDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="rounded-lg bg-gray-800/50 p-4">
                      <p className="text-xs text-gray-400 mb-1">Registrations</p>
                      <p className="text-xl font-bold">
                        {tournament.participants.current}/{tournament.participants.max}
                      </p>
                      <p className="text-xs text-green-400 mt-1">
                        {Math.round((tournament.participants.current / tournament.participants.max) * 100)}% filled
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-800/50 p-4">
                      <p className="text-xs text-gray-400 mb-1">Matches Completed</p>
                      <p className="text-xl font-bold">
                        {completedMatches.length}/{tournament.matches.length}
                      </p>
                      <p className="text-xs text-[#B3EFF5] mt-1">
                        {Math.round((completedMatches.length / tournament.matches.length) * 100)}% complete
                      </p>
                    </div>

                    <div className="rounded-lg bg-gray-800/50 p-4">
                      <p className="text-xs text-gray-400 mb-1">Budget</p>
                      <p className="text-xl font-bold">{tournament.budget}</p>
                      <p className="text-xs text-green-400 mt-1">
                        ≈ ${Number.parseFloat(tournament.budget.split(" ")[0].replace(",", ""))}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "matches" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Upcoming Matches</h2>
                <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#191D1E] via-[#345D61] to-[#191D1E] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-all border border-white/30">
                  <RefreshCw size={16} />
                  <span>Generate Next Round</span>
                </button>
              </div>

              {upcomingMatches.length === 0 ? (
                <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-[#101617] to-[#0a1415] p-8 text-center mb-8">
                  <p className="text-gray-400">No upcoming matches scheduled</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  {upcomingMatches.map((match) => (
                    <div
                      key={match.id}
                      className="rounded-xl border border-gray-800 bg-gradient-to-br from-[#101617] to-[#0a1415] p-4"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-[#B3EFF5]">{match.round}</span>
                        <span className="text-xs text-gray-400">{match.court}</span>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                            <span>{match.player1.charAt(0)}</span>
                          </div>
                          <span className="font-medium">{match.player1}</span>
                        </div>
                        <span className="text-sm">vs</span>
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{match.player2}</span>
                          <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                            <span>{match.player2.charAt(0)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                        <Clock size={14} />
                        <span>{match.scheduledTime}</span>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#191D1E] via-[#345D61] to-[#191D1E] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-all border border-white/30">
                          Record Result
                        </button>
                        <button className="flex items-center justify-center rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm hover:bg-gray-700">
                          <Edit size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <h2 className="text-xl font-bold mb-6">Completed Matches</h2>
              {completedMatches.length === 0 ? (
                <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-[#101617] to-[#0a1415] p-8 text-center">
                  <p className="text-gray-400">No completed matches yet</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {completedMatches.map((match) => (
                    <div
                      key={match.id}
                      className="rounded-xl border border-gray-800 bg-gradient-to-br from-[#101617] to-[#0a1415] p-4"
                    >
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-sm font-medium text-[#B3EFF5]">{match.round}</span>
                        <span className="text-xs text-gray-400">{match.court}</span>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`h-10 w-10 rounded-full ${match.result?.winner === match.player1 ? "bg-green-900/30" : "bg-gray-800"} flex items-center justify-center`}
                          >
                            <span>{match.player1.charAt(0)}</span>
                          </div>
                          <span
                            className={`font-medium ${match.result?.winner === match.player1 ? "text-green-400" : ""}`}
                          >
                            {match.player1}
                          </span>
                        </div>
                        <span className="text-sm">vs</span>
                        <div className="flex items-center gap-3">
                          <span
                            className={`font-medium ${match.result?.winner === match.player2 ? "text-green-400" : ""}`}
                          >
                            {match.player2}
                          </span>
                          <div
                            className={`h-10 w-10 rounded-full ${match.result?.winner === match.player2 ? "bg-green-900/30" : "bg-gray-800"} flex items-center justify-center`}
                          >
                            <span>{match.player2.charAt(0)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock size={14} />
                          <span>{match.scheduledTime}</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-[#B3EFF5] font-medium">Result: </span>
                          <span>{match.result?.score}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm hover:bg-gray-700">
                          View Details
                        </button>
                        <button className="flex items-center justify-center rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm hover:bg-gray-700">
                          <Edit size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === "participants" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Participants ({tournament.participants.length})</h2>
                <div className="flex gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="text"
                      placeholder="Search participants..."
                      className="rounded-lg border border-gray-700 bg-gray-800 py-2 pl-10 pr-4 text-sm text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none w-64"
                    />
                  </div>
                  <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#191D1E] via-[#345D61] to-[#191D1E] px-4 py-2 text-sm font-medium text-white hover:opacity-90 transition-all border border-white/30">
                    <UserPlus size={16} />
                    <span>Add Participant</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-800">
                      <th className="pb-4 text-left text-sm font-medium text-gray-400">Name</th>
                      <th className="pb-4 text-left text-sm font-medium text-gray-400">Status</th>
                      <th className="pb-4 text-left text-sm font-medium text-gray-400">Matches</th>
                      <th className="pb-4 text-left text-sm font-medium text-gray-400">Wins</th>
                      <th className="pb-4 text-left text-sm font-medium text-gray-400">Win Rate</th>
                      <th className="pb-4 text-right text-sm font-medium text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tournament.participants.map((participant) => (
                      <tr key={participant.id} className="border-b border-gray-800">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-800 flex items-center justify-center">
                              <span>{participant.name.charAt(0)}</span>
                            </div>
                            <span className="font-medium">{participant.name}</span>
                          </div>
                        </td>
                        <td className="py-4">
                          <span
                            className={`inline-flex rounded-full px-2 py-1 text-xs ${
                              participant.status === "Active"
                                ? "bg-green-900/30 text-green-300"
                                : "bg-red-900/30 text-red-300"
                            }`}
                          >
                            {participant.status}
                          </span>
                        </td>
                        <td className="py-4">{participant.matches}</td>
                        <td className="py-4">{participant.wins}</td>
                        <td className="py-4">
                          {participant.matches > 0
                            ? `${Math.round((participant.wins / participant.matches) * 100)}%`
                            : "N/A"}
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <button className="rounded-lg border border-gray-700 bg-gray-800 p-2 hover:bg-gray-700">
                              <Edit size={16} />
                            </button>
                            <button className="rounded-lg border border-gray-700 bg-gray-800 p-2 hover:bg-gray-700">
                              <MessageSquare size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "settings" && (
            <div>
              <h2 className="text-xl font-bold mb-6">Tournament Settings</h2>

              <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-[#101617] to-[#0a1415] p-6 mb-8">
                <h3 className="text-lg font-medium mb-4">General Information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Tournament Name</label>
                    <input
                      type="text"
                      value={tournament.name}
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 px-3 text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Sport</label>
                    <input
                      type="text"
                      value={tournament.sport}
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 px-3 text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={tournament.startDate}
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 px-3 text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">End Date</label>
                    <input
                      type="date"
                      value={tournament.endDate}
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 px-3 text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Location</label>
                    <input
                      type="text"
                      value={tournament.location}
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 px-3 text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Maximum Participants</label>
                    <input
                      type="number"
                      value={tournament.participants.max}
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 px-3 text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm text-gray-400 mb-2">Description</label>
                  <textarea
                    value={tournament.description}
                    rows={4}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 px-3 text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                  ></textarea>
                </div>

                <div className="flex justify-end">
                  <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#191D1E] via-[#345D61] to-[#191D1E] px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition-all border border-white/30">
                    <CheckCircle size={16} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-[#101617] to-[#0a1415] p-6 mb-8">
                <h3 className="text-lg font-medium mb-4">Prize Distribution</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Total Prize Pool</label>
                    <div className="flex">
                      <input
                        type="text"
                        value="2.5"
                        className="w-full rounded-l-lg border border-gray-700 bg-gray-800 py-2 px-3 text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                      />
                      <span className="inline-flex items-center rounded-r-lg border border-l-0 border-gray-700 bg-gray-700 px-3 text-gray-200">
                        USDC
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Entry Fee</label>
                    <div className="flex">
                      <input
                        type="text"
                        value="0.05"
                        className="w-full rounded-l-lg border border-gray-700 bg-gray-800 py-2 px-3 text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                      />
                      <span className="inline-flex items-center rounded-r-lg border border-l-0 border-gray-700 bg-gray-700 px-3 text-gray-200">
                        USDC
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm text-gray-400 mb-2">Prize Breakdown</label>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">1st Place:</span>
                      <div className="flex flex-1">
                        <input
                          type="text"
                          value="60"
                          className="w-20 rounded-l-lg border border-gray-700 bg-gray-800 py-2 px-3 text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                        />
                        <span className="inline-flex items-center rounded-r-lg border border-l-0 border-gray-700 bg-gray-700 px-3 text-gray-200">
                          %
                        </span>
                      </div>
                      <span className="text-sm text-gray-400">1.5 USDC</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">2nd Place:</span>
                      <div className="flex flex-1">
                        <input
                          type="text"
                          value="30"
                          className="w-20 rounded-l-lg border border-gray-700 bg-gray-800 py-2 px-3 text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                        />
                        <span className="inline-flex items-center rounded-r-lg border border-l-0 border-gray-700 bg-gray-700 px-3 text-gray-200">
                          %
                        </span>
                      </div>
                      <span className="text-sm text-gray-400">0.75 USDC</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium">Semi-Finalists:</span>
                      <div className="flex flex-1">
                        <input
                          type="text"
                          value="5"
                          className="w-20 rounded-l-lg border border-gray-700 bg-gray-800 py-2 px-3 text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                        />
                        <span className="inline-flex items-center rounded-r-lg border border-l-0 border-gray-700 bg-gray-700 px-3 text-gray-200">
                          %
                        </span>
                      </div>
                      <span className="text-sm text-gray-400">0.125 USDC each</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#191D1E] via-[#345D61] to-[#191D1E] px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition-all border border-white/30">
                    <CheckCircle size={16} />
                    <span>Save Changes</span>
                  </button>
                </div>
              </div>

              <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-[#101617] to-[#0a1415] p-6">
                <h3 className="text-lg font-medium mb-4 text-red-400">Danger Zone</h3>

                <div className="flex items-center justify-between p-4 border border-red-900/30 rounded-lg bg-red-900/10">
                  <div>
                    <h4 className="font-medium mb-1">Cancel Tournament</h4>
                    <p className="text-sm text-gray-400">
                      This will cancel the tournament and refund all participants.
                    </p>
                  </div>
                  <button className="flex items-center gap-2 rounded-lg bg-red-900/30 border border-red-900/50 px-4 py-2 text-sm font-medium text-red-300 hover:bg-red-900/50 transition-all">
                    <XCircle size={16} />
                    <span>Cancel Tournament</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <button className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#191D1E] via-[#345D61] to-[#191D1E] px-6 py-3 font-medium text-white hover:opacity-90 transition-all border border-white/30">
            <MessageSquare size={18} />
            <span>Message Participants</span>
          </button>

          <button className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-6 py-3 font-medium text-white hover:bg-gray-700">
            <FileText size={18} />
            <span>Export Tournament Data</span>
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
