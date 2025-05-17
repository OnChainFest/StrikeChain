export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="h-16 w-16 rounded-full border-4 border-t-[#B3EFF5] border-r-[#B3EFF5] border-b-transparent border-l-transparent animate-spin"></div>
        <p className="mt-4 text-[#B3EFF5] text-lg">Loading dashboard...</p>
      </div>
    </div>
  )
}
