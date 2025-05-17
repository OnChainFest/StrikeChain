"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Trophy, Users, MapPin, Wallet, Upload, Plus, Minus, CheckCircle } from "lucide-react"

export default function CreateTournament() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    sport: "",
    startDate: "",
    endDate: "",
    location: "",
    maxParticipants: 32,
    entryFee: "50",
    prizePool: "1600",
    description: "",
    image: null,
    prizes: [
      { position: "1st Place", percentage: 60 },
      { position: "2nd Place", percentage: 30 },
      { position: "Semi-Finalists", percentage: 5 },
    ],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePrizeChange = (index: number, value: number) => {
    const newPrizes = [...formData.prizes]
    newPrizes[index].percentage = value
    setFormData((prev) => ({ ...prev, prizes: newPrizes }))
  }

  const addPrize = () => {
    setFormData((prev) => ({
      ...prev,
      prizes: [...prev.prizes, { position: "", percentage: 0 }],
    }))
  }

  const removePrize = (index: number) => {
    const newPrizes = [...formData.prizes]
    newPrizes.splice(index, 1)
    setFormData((prev) => ({ ...prev, prizes: newPrizes }))
  }

  const nextStep = () => {
    setStep((prev) => prev + 1)
  }

  const prevStep = () => {
    setStep((prev) => prev - 1)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would submit the form data to your API
    console.log("Form submitted:", formData)
    // Redirect to the dashboard
    window.location.href = "/organizer/dashboard"
  }

  // Calculate total percentage
  const totalPercentage = formData.prizes.reduce((sum, prize) => sum + prize.percentage, 0)

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <Link
          href="/organizer/dashboard"
          className="mb-6 flex items-center gap-2 text-sm text-gray-300 hover:text-white"
        >
          <ArrowLeft size={16} />
          <span>Back to Dashboard</span>
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold">Create Tournament</h1>
          <p className="text-gray-400">Set up a new tournament on the blockchain</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className={`h-2 rounded-l-full ${step >= 1 ? "bg-[#345D61]" : "bg-gray-700"}`}></div>
            </div>
            <div className="flex-1">
              <div className={`h-2 ${step >= 2 ? "bg-[#345D61]" : "bg-gray-700"}`}></div>
            </div>
            <div className="flex-1">
              <div className={`h-2 rounded-r-full ${step >= 3 ? "bg-[#345D61]" : "bg-gray-700"}`}></div>
            </div>
          </div>
          <div className="mt-2 flex justify-between text-sm">
            <div className={step >= 1 ? "text-[#B3EFF5]" : "text-gray-400"}>Basic Info</div>
            <div className={step >= 2 ? "text-[#B3EFF5]" : "text-gray-400"}>Prize Structure</div>
            <div className={step >= 3 ? "text-[#B3EFF5]" : "text-gray-400"}>Review & Deploy</div>
          </div>
        </div>

        {/* Form Steps */}
        <div className="rounded-xl border border-gray-800 bg-gradient-to-br from-[#101617] to-[#0a1415] p-6">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold mb-6">Basic Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Tournament Name*</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Summer Tennis Open"
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 px-3 text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Sport*</label>
                    <select
                      name="sport"
                      value={formData.sport}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 px-3 text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                      required
                    >
                      <option value="">Select a sport</option>
                      <option value="Fútbol">Fútbol</option>
                      <option value="Tennis">Tennis</option>
                      <option value="Golf">Golf</option>
                      <option value="Volleyball">Volleyball</option>
                      <option value="Basketball">Basketball</option>
                      <option value="Surfing">Surfing</option>
                      <option value="Cycling">Cycling</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Start Date*</label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 px-3 text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">End Date*</label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleChange}
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 px-3 text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Location*</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Bay Area Tennis Club, San Francisco, CA"
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 px-3 text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Maximum Participants*</label>
                    <input
                      type="number"
                      name="maxParticipants"
                      value={formData.maxParticipants}
                      onChange={handleChange}
                      min="2"
                      max="128"
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 px-3 text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Entry Fee (USDC)*</label>
                    <input
                      type="number"
                      name="entryFee"
                      value={formData.entryFee}
                      onChange={handleChange}
                      step="0.01"
                      min="0"
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 px-3 text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-gray-400 mb-2">Prize Pool (USDC)*</label>
                    <input
                      type="number"
                      name="prizePool"
                      value={formData.prizePool}
                      onChange={handleChange}
                      step="0.1"
                      min="0"
                      className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 px-3 text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm text-gray-400 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Describe your tournament..."
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 px-3 text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                  ></textarea>
                </div>

                <div className="mb-6">
                  <label className="block text-sm text-gray-400 mb-2">Tournament Image</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-700 border-dashed rounded-lg cursor-pointer bg-gray-800/50 hover:bg-gray-800">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-10 h-10 mb-3 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-400">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">SVG, PNG, JPG or GIF (MAX. 2MB)</p>
                      </div>
                      <input id="dropzone-file" type="file" className="hidden" />
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#191D1E] via-[#345D61] to-[#191D1E] px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition-all border border-white/30"
                  >
                    Next: Prize Structure
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Prize Structure */}
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold mb-6">Prize Structure</h2>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium">Prize Distribution</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">Total:</span>
                      <span
                        className={`text-sm font-medium ${totalPercentage === 100 ? "text-green-400" : "text-red-400"}`}
                      >
                        {totalPercentage}%
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {formData.prizes.map((prize, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="flex-1">
                          <label className="block text-sm text-gray-400 mb-2">Position</label>
                          <input
                            type="text"
                            value={prize.position}
                            onChange={(e) => {
                              const newPrizes = [...formData.prizes]
                              newPrizes[index].position = e.target.value
                              setFormData((prev) => ({ ...prev, prizes: newPrizes }))
                            }}
                            placeholder="e.g. 1st Place"
                            className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 px-3 text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                          />
                        </div>

                        <div className="flex-1">
                          <label className="block text-sm text-gray-400 mb-2">Percentage (%)</label>
                          <input
                            type="number"
                            value={prize.percentage}
                            onChange={(e) => handlePrizeChange(index, Number(e.target.value))}
                            min="0"
                            max="100"
                            className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 px-3 text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                          />
                        </div>

                        <div className="flex-1">
                          <label className="block text-sm text-gray-400 mb-2">Amount (USDC)</label>
                          <input
                            type="text"
                            value={((Number.parseFloat(formData.prizePool) * prize.percentage) / 100).toFixed(0)}
                            className="w-full rounded-lg border border-gray-700 bg-gray-800 py-2 px-3 text-white placeholder-gray-400 focus:border-[#345D61] focus:outline-none"
                            disabled
                          />
                        </div>

                        {index > 0 && (
                          <button
                            type="button"
                            onClick={() => removePrize(index)}
                            className="mt-8 flex h-10 w-10 items-center justify-center rounded-full bg-red-900/30 text-red-300 hover:bg-red-900/50"
                          >
                            <Minus size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addPrize}
                    className="mt-4 flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm hover:bg-gray-700"
                  >
                    <Plus size={16} />
                    <span>Add Prize Position</span>
                  </button>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-6 py-2 text-sm hover:bg-gray-700"
                  >
                    Back
                  </button>

                  <button
                    type="button"
                    onClick={nextStep}
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#191D1E] via-[#345D61] to-[#191D1E] px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition-all border border-white/30"
                    disabled={totalPercentage !== 100}
                  >
                    Next: Review
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Deploy */}
            {step === 3 && (
              <div>
                <h2 className="text-xl font-bold mb-6">Review & Deploy Tournament</h2>

                <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-6 mb-6">
                  <h3 className="text-lg font-medium mb-4">Tournament Details</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <Trophy className="text-[#B3EFF5] mt-1" size={20} />
                      <div>
                        <p className="text-sm text-gray-400">Tournament Name</p>
                        <p className="font-medium">{formData.name || "Not specified"}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="text-[#B3EFF5] mt-1">🏆</div>
                      <div>
                        <p className="text-sm text-gray-400">Sport</p>
                        <p className="font-medium">{formData.sport || "Not specified"}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="text-[#B3EFF5] mt-1" size={20} />
                      <div>
                        <p className="text-sm text-gray-400">Dates</p>
                        <p className="font-medium">
                          {formData.startDate ? new Date(formData.startDate).toLocaleDateString() : "Not specified"} -{" "}
                          {formData.endDate ? new Date(formData.endDate).toLocaleDateString() : "Not specified"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="text-[#B3EFF5] mt-1" size={20} />
                      <div>
                        <p className="text-sm text-gray-400">Location</p>
                        <p className="font-medium">{formData.location || "Not specified"}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="text-[#B3EFF5] mt-1" size={20} />
                      <div>
                        <p className="text-sm text-gray-400">Maximum Participants</p>
                        <p className="font-medium">{formData.maxParticipants}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Wallet className="text-[#B3EFF5] mt-1" size={20} />
                      <div>
                        <p className="text-sm text-gray-400">Entry Fee</p>
                        <p className="font-medium">{formData.entryFee} USDC</p>
                      </div>
                    </div>
                  </div>

                  {formData.description && (
                    <div className="mt-6">
                      <p className="text-sm text-gray-400 mb-2">Description</p>
                      <p className="text-sm">{formData.description}</p>
                    </div>
                  )}
                </div>

                <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-6 mb-6">
                  <h3 className="text-lg font-medium mb-4">Prize Structure</h3>

                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-800">
                          <th className="pb-2 text-left text-sm font-medium text-gray-400">Position</th>
                          <th className="pb-2 text-left text-sm font-medium text-gray-400">Percentage</th>
                          <th className="pb-2 text-left text-sm font-medium text-gray-400">Amount (USDC)</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.prizes.map((prize, index) => (
                          <tr key={index} className="border-b border-gray-800">
                            <td className="py-3">{prize.position}</td>
                            <td className="py-3">{prize.percentage}%</td>
                            <td className="py-3">
                              {((Number.parseFloat(formData.prizePool) * prize.percentage) / 100).toFixed(0)} USDC
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td className="py-3 font-medium">Total</td>
                          <td className="py-3 font-medium">{totalPercentage}%</td>
                          <td className="py-3 font-medium">{formData.prizePool} USDC</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-800 bg-gray-900/30 p-6 mb-6">
                  <h3 className="text-lg font-medium mb-4">Smart Contract Details</h3>

                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Contract Type</p>
                      <p className="font-medium">Tournament Contract</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400 mb-1">Network</p>
                      <p className="font-medium">Base Mainnet</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400 mb-1">Estimated Gas Fee</p>
                      <p className="font-medium">~0.50 USDC</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 px-6 py-2 text-sm hover:bg-gray-700"
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#191D1E] via-[#345D61] to-[#191D1E] px-6 py-2 text-sm font-medium text-white hover:opacity-90 transition-all border border-white/30"
                  >
                    <CheckCircle size={16} />
                    <span>Deploy Tournament</span>
                  </button>
                </div>
              </div>
            )}
          </form>
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
