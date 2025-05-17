"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { ChevronDown, Info, Users, Trophy, Clock, Search, Bell, Menu, User, HelpCircle, Lock } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function ParticipantDashboard() {
  const router = useRouter()
  const [timeFilter, setTimeFilter] = useState<"Last year" | "Last month" | "Last week">("Last year")
  const [activityTimeFilter, setActivityTimeFilter] = useState<"Last month" | "Last week" | "All time">("Last month")
  const [isTimeFilterOpen, setIsTimeFilterOpen] = useState(false)
  const [isActivityFilterOpen, setIsActivityFilterOpen] = useState(false)
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("home")
  const [hoveredTournament, setHoveredTournament] = useState<number | null>(null)
  const [hoveredActivity, setHoveredActivity] = useState<number | null>(null)

  // Animation for chart bars
  const [isChartVisible, setIsChartVisible] = useState(false)

  useEffect(() => {
    // Trigger chart animation after component mounts
    const timer = setTimeout(() => {
      setIsChartVisible(true)
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  // Mock data for monthly rewards
  const monthlyRewards = [
    { month: "Jan", value: 300 },
    { month: "Feb", value: 500 },
    { month: "Mar", value: 200 },
    { month: "Apr", value: 400 },
    { month: "May", value: 300 },
    { month: "Jun", value: 600 },
    { month: "Jul", value: 200 },
    { month: "Aug", value: 500 },
    { month: "Sep", value: 700 },
    { month: "Oct", value: 600 },
    { month: "Nov", value: 400 },
    { month: "Dec", value: 300 },
  ]

  // Find max value for scaling the chart
  const maxReward = Math.max(...monthlyRewards.map((item) => item.value))

  // Mock data for tournaments
  const tournaments = [
    {
      id: 1,
      title: "Tournament title",
      startDate: "11/07",
      firstPlaceReward: "700USDC",
      secondPlaceReward: "400USDC",
      thirdPlaceReward: "200USDC",
      participants: 28,
      daysLeft: 5,
      status: "active",
      available: true,
    },
    {
      id: 2,
      title: "Tournament title",
      startDate: "11/07",
      firstPlaceReward: "700USDC",
      secondPlaceReward: "400USDC",
      thirdPlaceReward: "200USDC",
      participants: 28,
      daysLeft: 1,
      status: "active",
      available: false,
    },
    {
      id: 3,
      title: "Tournament title",
      startDate: "11/07",
      firstPlaceReward: "700USDC",
      secondPlaceReward: "400USDC",
      thirdPlaceReward: "200USDC",
      participants: 28,
      daysLeft: 5,
      status: "active",
      available: true,
    },
  ]

  // Mock data for activity
  const activities = [
    {
      id: 1,
      title: "Tournament title",
      startDate: "11/07",
      duration: "7 days",
      isWinner: true,
      amount: "500 USDC",
      place: "First place",
    },
    {
      id: 2,
      title: "Tournament title",
      startDate: "11/07",
      duration: "7 days",
      isWinner: false,
      amount: "0 USDC",
      place: "-",
    },
    {
      id: 3,
      title: "Tournament title",
      startDate: "11/07",
      duration: "7 days",
      isWinner: true,
      amount: "500 USDC",
      place: "First place",
    },
    {
      id: 4,
      title: "Tournament title",
      startDate: "11/07",
      duration: "7 days",
      isWinner: false,
      amount: "0 USDC",
      place: "-",
    },
    {
      id: 5,
      title: "Tournament title",
      startDate: "11/07",
      duration: "7 days",
      isWinner: true,
      amount: "500 USDC",
      place: "First place",
    },
  ]

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: "New tournament available",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "You won 500 USDC!",
      time: "Yesterday",
      read: false,
    },
    {
      id: 3,
      title: "Tournament starts in 2 days",
      time: "2 days ago",
      read: true,
    },
  ]

  // Handle navigation
  const handleNavigation = (tab: string) => {
    setActiveTab(tab)
    // In a real app, this would navigate to different routes
    if (tab === "home") {
      router.push("/")
    }
  }

  return (
    <div className="h-screen overflow-hidden bg-[#15181C] text-white flex flex-col">
      {/* Navbar */}
      <header className="border-b border-gray-800 bg-[#181C20] py-3 px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <button
              onClick={() => handleNavigation("home")}
              className={`${activeTab === "home" ? "text-[#B3EFF5]" : "text-[#627E83]"} font-medium hover:text-[#B3EFF5] transition-colors relative group`}
            >
              Home
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B3EFF5] group-hover:w-full transition-all duration-300"
                animate={{ width: activeTab === "home" ? "100%" : "0%" }}
              />
            </button>
            <button
              onClick={() => handleNavigation("ranking")}
              className={`${activeTab === "ranking" ? "text-[#B3EFF5]" : "text-[#627E83]"} hover:text-[#B3EFF5] transition-colors relative group`}
            >
              Ranking
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B3EFF5] group-hover:w-full transition-all duration-300"
                animate={{ width: activeTab === "ranking" ? "100%" : "0%" }}
              />
            </button>
            <button
              onClick={() => handleNavigation("analytics")}
              className={`${activeTab === "analytics" ? "text-[#B3EFF5]" : "text-[#627E83]"} hover:text-[#B3EFF5] transition-colors relative group`}
            >
              Analytics
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B3EFF5] group-hover:w-full transition-all duration-300"
                animate={{ width: activeTab === "analytics" ? "100%" : "0%" }}
              />
            </button>
            <button
              onClick={() => handleNavigation("tournaments")}
              className={`${activeTab === "tournaments" ? "text-[#B3EFF5]" : "text-[#627E83]"} hover:text-[#B3EFF5] transition-colors relative group`}
            >
              Tournaments
              <motion.div
                className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B3EFF5] group-hover:w-full transition-all duration-300"
                animate={{ width: activeTab === "tournaments" ? "100%" : "0%" }}
              />
            </button>
          </div>

          <div className="flex items-center gap-6">
            <button className="text-[#B3EFF5] hover:text-white transition-colors relative" onClick={() => {}}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <svg width="24" height="24" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M14 28C21.732 28 28 21.732 28 14C28 6.26801 21.732 0 14 0C6.26801 0 0 6.26801 0 14C0 21.732 6.26801 28 14 28Z"
                    fill="#B3EFF5"
                    fillOpacity="0.15"
                  />
                  <path
                    d="M13.6364 22.9091C18.7282 22.9091 22.9091 18.7282 22.9091 13.6364C22.9091 8.54451 18.7282 4.36365 13.6364 4.36365C8.54451 4.36365 4.36365 8.54451 4.36365 13.6364C4.36365 18.7282 8.54451 22.9091 13.6364 22.9091Z"
                    stroke="#B3EFF5"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17.3073 9.96545C16.4991 9.15727 15.4 8.72729 14.2719 8.72729C13.1439 8.72729 12.0448 9.15727 11.2366 9.96545C10.4284 10.7736 9.99842 11.8728 9.99842 13.0008C9.99842 14.1288 10.4284 15.2279 11.2366 16.0361C12.0448 16.8443 13.1439 17.2743 14.2719 17.2743C15.4 17.2743 16.4991 16.8443 17.3073 16.0361C18.1155 15.2279 18.5455 14.1288 18.5455 13.0008C18.5455 11.8728 18.1155 10.7736 17.3073 9.96545Z"
                    fill="#B3EFF5"
                  />
                </svg>
              </motion.div>
            </button>

            <div className="relative">
              <button
                className="text-[#B3EFF5] hover:text-white transition-colors"
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              >
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="relative">
                  <Bell size={24} />
                  {notifications.filter((n) => !n.read).length > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                      {notifications.filter((n) => !n.read).length}
                    </span>
                  )}
                </motion.div>
              </button>

              <AnimatePresence>
                {isNotificationOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-64 rounded-md bg-[#232830] shadow-lg z-50"
                  >
                    <div className="p-3 border-b border-gray-700">
                      <div className="flex justify-between items-center">
                        <h3 className="font-medium text-sm">Notifications</h3>
                        <button className="text-xs text-[#B3EFF5] hover:text-white">Mark all as read</button>
                      </div>
                    </div>
                    <div className="max-h-60 overflow-y-auto">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-3 border-b border-gray-700 last:border-0 hover:bg-[#2A303A] transition-colors ${!notification.read ? "bg-[#1A2627]/30" : ""}`}
                        >
                          <div className="flex items-start gap-2">
                            {!notification.read && (
                              <div className="h-2 w-2 rounded-full bg-[#B3EFF5] mt-1.5 flex-shrink-0"></div>
                            )}
                            <div className={`${!notification.read ? "" : "ml-4"}`}>
                              <p className="text-sm">{notification.title}</p>
                              <p className="text-xs text-gray-400">{notification.time}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-2 border-t border-gray-700">
                      <button className="w-full text-center text-xs text-[#B3EFF5] hover:text-white py-1">
                        View all notifications
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button className="text-[#B3EFF5] hover:text-white transition-colors" onClick={() => {}}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <Menu size={24} />
              </motion.div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden p-4">
        <div className="h-full flex gap-3">
          {/* Left Content */}
          <div className="flex-1 flex flex-col gap-3 overflow-hidden">
            {/* First Grid: User Profile and Rewards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-[45%]">
              {/* User Profile */}
              <div className="bg-[#181C20] rounded-lg p-4 overflow-hidden relative">
                <div className="flex items-center gap-3 mb-3">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative h-12 w-12 rounded-full overflow-hidden cursor-pointer"
                  >
                    <Image src="/abstract-profile.png" alt="Profile" width={48} height={48} className="object-cover" />
                  </motion.div>
                  <div>
                    <h2 className="font-medium">Micaela Descotte</h2>
                    <p className="text-sm text-gray-400">@micaela-des</p>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <motion.button
                    whileHover={{ backgroundColor: "#2A303A" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left py-1.5 px-3 bg-[#232830] rounded-md transition-colors text-sm"
                  >
                    Edit Profile
                  </motion.button>
                  <motion.button
                    whileHover={{ backgroundColor: "#2A303A" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left py-1.5 px-3 bg-[#232830] rounded-md transition-colors text-sm"
                  >
                    My Wallet
                  </motion.button>
                  <motion.button
                    whileHover={{ backgroundColor: "#2A303A" }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full text-left py-1.5 px-3 bg-[#232830] rounded-md transition-colors text-sm"
                  >
                    Become an organizer
                  </motion.button>
                </div>

                <div className="space-y-1 absolute bottom-3 left-3">
                  <motion.div
                    whileHover={{ color: "#B3EFF5" }}
                    className="flex items-center gap-2 py-1 transition-colors cursor-pointer text-sm"
                  >
                    <User size={14} />
                    <span>General</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ color: "#B3EFF5" }}
                    className="flex items-center gap-2 py-1 transition-colors cursor-pointer text-sm"
                  >
                    <HelpCircle size={14} />
                    <span>Help & Support</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ color: "#B3EFF5" }}
                    className="flex items-center gap-2 py-1 transition-colors cursor-pointer text-sm"
                  >
                    <Lock size={14} />
                    <span>Privacy & Security</span>
                  </motion.div>
                </div>
              </div>

              {/* Rewards Chart */}
              <div className="md:col-span-2 bg-[#181C20] rounded-lg p-4 overflow-hidden relative flex flex-col">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#1A2627]">
                    <Trophy size={14} className="text-[#B3EFF5]" />
                  </div>
                  <h3 className="font-medium">Rewards</h3>
                </div>

                <div className="flex justify-between mb-2">
                  <div className="flex items-center gap-2 relative">
                    <button
                      className="flex items-center gap-1 text-xs text-gray-300 hover:text-white transition-colors"
                      onClick={() => setIsTimeFilterOpen(!isTimeFilterOpen)}
                    >
                      <span>{timeFilter}</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${isTimeFilterOpen ? "rotate-180" : ""}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isTimeFilterOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-6 left-0 w-32 bg-[#232830] rounded-md shadow-lg z-10"
                        >
                          {["Last year", "Last month", "Last week"].map((option) => (
                            <button
                              key={option}
                              className={`w-full text-left px-3 py-2 text-xs hover:bg-[#2A303A] transition-colors ${timeFilter === option ? "text-[#B3EFF5]" : "text-white"}`}
                              onClick={() => {
                                setTimeFilter(option as any)
                                setIsTimeFilterOpen(false)
                              }}
                            >
                              {option}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <div className="flex gap-6">
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <p className="text-xs text-gray-400">Total amount (USDC):</p>
                      <p className="text-sm font-medium">10,400.50</p>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.02 }}>
                      <p className="text-xs text-gray-400">Total Tournaments:</p>
                      <p className="text-sm font-medium">23</p>
                    </motion.div>
                  </div>
                </div>

                {/* Chart */}
                <div className="flex-1 flex flex-col justify-center">
                  <div className="bg-[#192225] rounded-xl p-5 h-44">
                    <div className="h-full flex items-end justify-between">
                      {monthlyRewards.map((item, index) => (
                        <div key={index} className="flex flex-col items-center group">
                          <motion.div
                            className="w-3 bg-[#B3EFF5] rounded-t group-hover:bg-[#8CDBEB] transition-colors"
                            initial={{ height: 0 }}
                            animate={{ height: isChartVisible ? `${(item.value / maxReward) * 100}px` : 0 }}
                            transition={{
                              duration: 0.8,
                              delay: index * 0.05,
                              ease: "easeOut",
                            }}
                            whileHover={{ scale: 1.1 }}
                          />
                          <motion.div
                            className="absolute -top-6 bg-[#232830] px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                          >
                            {item.value} USDC
                          </motion.div>
                          <span className="text-[10px] text-gray-400 mt-1 group-hover:text-white transition-colors">
                            {item.month}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between px-4 mt-1">
                  <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                    <div className="h-2 w-2 rounded-full bg-[#B3EFF5]"></div>
                    <span className="text-xs text-gray-400">Rewarded:</span>
                    <span className="text-xs">3400USDC</span>
                  </motion.div>
                  <motion.div className="flex items-center gap-2" whileHover={{ scale: 1.05 }}>
                    <div className="h-2 w-2 rounded-full bg-[#B3EFF5]"></div>
                    <span className="text-xs text-gray-400">Tournaments:</span>
                    <span className="text-xs">9</span>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Second Grid: Tournaments */}
            <div className="bg-[#181C20] rounded-lg p-4 h-[52%] overflow-hidden">
              {/* Current Tournaments Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-[#1A2627]">
                    <Trophy size={14} className="text-[#B3EFF5]" />
                  </div>
                  <span className="text-white text-sm">Current tournaments:</span>
                  <motion.span className="text-[#B3EFF5] text-sm" whileHover={{ scale: 1.1 }}>
                    17
                  </motion.span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Search size={14} className="text-[#627E83]" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-48 h-8 rounded-full border border-gray-700 bg-[#1A2627] py-1 pl-8 pr-3 text-xs text-white placeholder-gray-400 focus:outline-none focus:border-[#B3EFF5] transition-colors"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: "#8CDBEB" }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#B3EFF5] text-black px-4 py-1 rounded-full text-xs transition-colors"
                  >
                    View all
                  </motion.button>
                </div>
              </div>

              {/* Tournaments Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 h-[calc(100%-40px)] overflow-hidden">
                {tournaments.map((tournament) => (
                  <motion.div
                    key={tournament.id}
                    className="bg-[#1E2328] rounded-lg overflow-hidden flex flex-col h-full"
                    whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                    onHoverStart={() => setHoveredTournament(tournament.id)}
                    onHoverEnd={() => setHoveredTournament(null)}
                  >
                    <div className="p-3 flex-1 overflow-hidden">
                      <div className="flex items-center mb-2">
                        <motion.div
                          className="w-8 h-8 rounded-full bg-[#232830] flex items-center justify-center mr-3"
                          whileHover={{ scale: 1.1, backgroundColor: "#1A2627" }}
                        >
                          {tournament.id === 1 && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="12" cy="12" r="12" fill="#B3EFF5" fillOpacity="0.1" />
                              <path
                                d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z"
                                stroke="#B3EFF5"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                          {tournament.id === 2 && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="12" cy="12" r="12" fill="#B3EFF5" fillOpacity="0.1" />
                              <path
                                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                stroke="#B3EFF5"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                          {tournament.id === 3 && (
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <circle cx="12" cy="12" r="12" fill="#B3EFF5" fillOpacity="0.1" />
                              <path
                                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                                stroke="#B3EFF5"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <motion.div
                              className="h-2 w-2 rounded-full bg-[#B3EFF5]"
                              animate={{
                                scale: hoveredTournament === tournament.id ? [1, 1.2, 1] : 1,
                                opacity: hoveredTournament === tournament.id ? [1, 0.8, 1] : 1,
                              }}
                              transition={{
                                repeat: hoveredTournament === tournament.id ? Number.POSITIVE_INFINITY : 0,
                                duration: 1.5,
                              }}
                            />
                            <span className="text-xs text-gray-400">Left: {tournament.daysLeft} Days</span>
                          </div>
                        </div>
                      </div>

                      <h3 className="font-medium text-sm mb-1">{tournament.title}</h3>
                      <p className="text-xs text-gray-400 mb-2">Start date: {tournament.startDate}</p>

                      <div className="space-y-0.5">
                        <div className="flex justify-between text-xs">
                          <span>First Place reward:</span>
                          <span className="font-medium">{tournament.firstPlaceReward}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Second Place reward:</span>
                          <span className="font-medium">{tournament.secondPlaceReward}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Third Place reward:</span>
                          <span className="font-medium">{tournament.thirdPlaceReward}</span>
                        </div>
                      </div>

                      <div className="flex justify-between mt-2 pt-2 border-t border-gray-800">
                        <div className="flex items-center gap-1 text-xs">
                          <Users size={12} />
                          <span>Participants: {tournament.participants}</span>
                        </div>
                        <motion.button
                          className="flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Info size={12} />
                          <span>About</span>
                        </motion.button>
                      </div>
                    </div>

                    <motion.button
                      className={`w-full py-2 text-center text-xs font-medium ${
                        tournament.available
                          ? "bg-[#B3EFF5] text-black hover:bg-[#8CDBEB]"
                          : "bg-gray-700 text-gray-300 cursor-not-allowed"
                      }`}
                      whileHover={tournament.available ? { backgroundColor: "#8CDBEB" } : {}}
                      whileTap={tournament.available ? { scale: 0.98 } : {}}
                      disabled={!tournament.available}
                    >
                      {tournament.available ? "Join tournament" : "Not available"}
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Activity */}
          <div className="w-72 bg-[#181C20] rounded-lg overflow-hidden flex flex-col">
            {/* Bowling Image */}
            <motion.div className="w-full h-40 relative overflow-hidden" whileHover={{ scale: 1.05 }}>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dnCjOOYzW7vsQtfX61jQBBEMYdr8rt.png"
                alt="Bowling activity"
                fill
                className="object-cover transition-transform hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#181C20] to-transparent opacity-50" />
            </motion.div>

            {/* Activity Header */}
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#B3EFF5]" />
                <h3 className="font-medium text-sm">Activity</h3>
              </div>
              <div className="relative">
                <button
                  className="flex items-center gap-1 text-xs text-gray-300 hover:text-white transition-colors"
                  onClick={() => setIsActivityFilterOpen(!isActivityFilterOpen)}
                >
                  <span>{activityTimeFilter}</span>
                  <ChevronDown
                    size={14}
                    className={`transition-transform duration-200 ${isActivityFilterOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isActivityFilterOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-6 right-0 w-32 bg-[#232830] rounded-md shadow-lg z-10"
                    >
                      {["Last month", "Last week", "All time"].map((option) => (
                        <button
                          key={option}
                          className={`w-full text-left px-3 py-2 text-xs hover:bg-[#2A303A] transition-colors ${activityTimeFilter === option ? "text-[#B3EFF5]" : "text-white"}`}
                          onClick={() => {
                            setActivityTimeFilter(option as any)
                            setIsActivityFilterOpen(false)
                          }}
                        >
                          {option}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Activity List */}
            <div className="flex-1 overflow-y-auto px-4 pb-4">
              <div className="space-y-4">
                {activities.map((activity) => (
                  <motion.div
                    key={activity.id}
                    className="border-b border-gray-800 pb-4 last:border-0 p-3 -mx-3"
                    initial={{ x: 0, backgroundColor: "transparent", borderRadius: "0.25rem" }}
                    whileHover={{
                      backgroundColor: "#1E2328",
                      borderRadius: "0.5rem",
                      x: 0,
                      transition: {
                        duration: 0.2,
                        ease: "easeOut",
                      },
                    }}
                    whileTap={{ scale: 0.98 }}
                    onHoverStart={() => setHoveredActivity(activity.id)}
                    onHoverEnd={() => setHoveredActivity(null)}
                  >
                    <h4 className="font-medium text-sm mb-1">{activity.title}</h4>
                    <div className="text-xs text-gray-400 mb-2">
                      <p>Start date: {activity.startDate}</p>
                      <p>Duration: {activity.duration}</p>
                    </div>

                    <div className="flex justify-between items-center">
                      {activity.isWinner ? (
                        <motion.div
                          className="flex items-center text-green-400"
                          animate={{
                            scale: hoveredActivity === activity.id ? [1, 1.05, 1] : 1,
                          }}
                          transition={{
                            repeat: hoveredActivity === activity.id ? Number.POSITIVE_INFINITY : 0,
                            duration: 1.5,
                          }}
                        >
                          <Trophy size={12} className="mr-1" />
                          <span className="text-xs">Winner</span>
                        </motion.div>
                      ) : (
                        <span className="text-xs text-gray-400">Not winner</span>
                      )}
                      <div className="text-right">
                        <motion.div
                          className={`text-sm font-medium ${activity.isWinner ? "text-green-400" : "text-gray-400"}`}
                          whileHover={{ scale: 1.05 }}
                        >
                          {activity.amount}
                        </motion.div>
                        <div className="text-xs text-gray-400">{activity.place}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
